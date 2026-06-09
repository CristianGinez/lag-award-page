import React, { useState } from 'react';
import type { Category, Nominee } from '../types';
import { supabase } from '@/features/auth/lib/supabase';

interface AwardsManagerProps {
  initialCategories: Category[];
}

async function adminFetch(action: string, payload: Record<string, any>) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch('/api/admin/awards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token ?? ''}`,
    },
    body: JSON.stringify({ action, ...payload }),
  });
  return res.json();
}

export const AwardsManager: React.FC<AwardsManagerProps> = ({ initialCategories }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [openCatId, setOpenCatId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const saveCategory = async (cat: Category) => {
    setSaving(true);
    const res = await adminFetch('upsert_category', {
      id: cat.id,
      icon: cat.icon,
      title: cat.title,
      description: cat.description,
      color: cat.color,
      tv_background: cat.tvBackground,
      display_order: initialCategories.findIndex(c => c.id === cat.id),
    });
    setSaving(false);
    if (res.ok) flash('✓ Categoría guardada');
    else flash(`✗ ${res.error}`);
  };

  const saveNominee = async (catId: string, nom: Nominee & { id?: string }, order: number) => {
    setSaving(true);
    const res = await adminFetch('upsert_nominee', {
      ...(nom.id ? { id: nom.id } : {}),
      category_id: catId,
      name: nom.name,
      creator: nom.creator ?? null,
      image: nom.image,
      description: nom.description,
      display_order: order,
    });
    setSaving(false);
    if (res.ok) flash('✓ Nominado guardado');
    else flash(`✗ ${res.error}`);
  };

  const deleteNominee = async (id: string, catId: string, nomName: string) => {
    if (!confirm(`¿Borrar nominado "${nomName}"?`)) return;
    setSaving(true);
    const res = await adminFetch('delete_nominee', { id });
    setSaving(false);
    if (res.ok) {
      setCategories(prev => prev.map(c =>
        c.id === catId ? { ...c, nominees: c.nominees.filter((n: any) => n.id !== id) } : c
      ));
      flash('✓ Nominado eliminado');
    } else flash(`✗ ${res.error}`);
  };

  return (
    <div className="space-y-3">
      {msg && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-lg font-bold text-sm shadow-xl ${msg.startsWith('✓') ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {msg}
        </div>
      )}

      {saving && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/80 px-4 py-2 rounded-full text-white text-sm">
          Guardando...
        </div>
      )}

      {categories.map((cat) => (
        <div key={cat.id} className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenCatId(openCatId === cat.id ? null : cat.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{cat.icon}</span>
              <span className="font-bold font-orbitron text-white text-sm uppercase">{cat.title}</span>
              <span className="text-xs text-gray-500 font-mono">ID: {cat.id}</span>
            </div>
            <span className="text-gray-400 text-xs">{openCatId === cat.id ? '▲' : '▼'}</span>
          </button>

          {openCatId === cat.id && (
            <div className="border-t border-white/5 p-5 space-y-6">
              {/* Editar campos de categoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['title', 'description', 'icon', 'color', 'tvBackground'] as const).map(field => (
                  <label key={field} className="block">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{field}</span>
                    <input
                      className="mt-1 w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                      defaultValue={(cat as any)[field] ?? ''}
                      onBlur={e => {
                        const updated = { ...cat, [field]: e.target.value };
                        setCategories(prev => prev.map(c => c.id === cat.id ? updated : c));
                      }}
                    />
                  </label>
                ))}
              </div>
              <button
                onClick={() => saveCategory(cat)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Guardar Categoría
              </button>

              {/* Nominados */}
              <div>
                <h4 className="text-xs text-gray-400 uppercase font-bold mb-3">Nominados ({cat.nominees.length})</h4>
                <div className="space-y-2">
                  {cat.nominees.map((nom: any, idx) => (
                    <div key={nom.id ?? nom.name} className="bg-black/30 border border-white/5 rounded-lg p-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                        {(['name', 'creator', 'image', 'description'] as const).map(f => (
                          <label key={f} className="block">
                            <span className="text-[9px] text-gray-600 uppercase font-bold">{f}</span>
                            <input
                              className="mt-0.5 w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-purple-500"
                              defaultValue={(nom as any)[f] ?? ''}
                              onBlur={e => {
                                const updated = { ...nom, [f]: e.target.value };
                                setCategories(prev => prev.map(c =>
                                  c.id === cat.id
                                    ? { ...c, nominees: c.nominees.map((n: any, i) => i === idx ? updated : n) }
                                    : c
                                ));
                              }}
                            />
                          </label>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveNominee(cat.id, nom, idx)}
                          className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white text-[10px] font-bold rounded transition-colors"
                        >
                          Guardar
                        </button>
                        {nom.id && (
                          <button
                            onClick={() => deleteNominee(nom.id, cat.id, nom.name)}
                            className="px-3 py-1 bg-red-900/50 hover:bg-red-700 text-red-400 hover:text-white text-[10px] font-bold rounded transition-colors"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
