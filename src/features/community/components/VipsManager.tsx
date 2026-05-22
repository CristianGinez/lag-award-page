import { useState } from 'react';
import type { Vip, VipLink, VipLinkPlatform } from '../types';

const PLATFORMS: VipLinkPlatform[] = [
  'youtube', 'twitch', 'steam', 'instagram', 'tiktok',
  'twitter', 'kick', 'spotify', 'discord', 'custom',
];

const EMPTY_VIP: Omit<Vip, 'id' | 'links'> = {
  slug: '', name: '', aliases: [], role: '', origin: null, bio: null,
  favorite_games: [], music: null, color: '#dc2626', color_name: null,
  avatar: null, youtube_channel_id: null, user_id: null, discord_id: null,
  display_order: 99,
};

function TagInput({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('');

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput('');
    }
  };

  return (
    <div>
      <label className="block text-xs text-gray-400 font-mono mb-1 uppercase tracking-wider">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 border border-white/10 text-xs text-white font-mono">
            {tag}
            <button onClick={() => onChange(value.filter((t) => t !== tag))} className="text-gray-500 hover:text-red-400 cursor-pointer">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder="Escribí y Enter"
          className="flex-1 bg-black border border-gray-700 rounded px-2 py-1.5 text-white text-xs font-mono focus:border-white/40 outline-none"
        />
        <button onClick={add} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs text-white transition-colors cursor-pointer">+</button>
      </div>
    </div>
  );
}

function LinksEditor({
  vipId,
  links,
  onChange,
}: {
  vipId: string | undefined;
  links: VipLink[];
  onChange: (links: VipLink[]) => void;
}) {
  const addLink = () => {
    const newLink: VipLink = {
      id: crypto.randomUUID(),
      platform: 'youtube',
      url: '',
      label: null,
      display_order: links.length,
    };
    onChange([...links, newLink]);
  };

  const updateLink = (id: string, patch: Partial<VipLink>) => {
    onChange(links.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const removeLink = (id: string) => {
    onChange(links.filter((l) => l.id !== id));
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs text-gray-400 font-mono uppercase tracking-wider">Links sociales</label>
        <button
          onClick={addLink}
          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white transition-colors cursor-pointer"
        >
          + Agregar link
        </button>
      </div>

      {links.length === 0 && (
        <p className="text-gray-600 text-xs font-mono italic py-2">Sin links aún.</p>
      )}

      <div className="space-y-3">
        {links.map((link, idx) => (
          <div key={link.id} className="flex flex-col gap-2 p-3 rounded-xl border border-white/8 bg-white/3">
            <div className="flex gap-2 items-center">
              <select
                value={link.platform}
                onChange={(e) => updateLink(link.id, { platform: e.target.value as VipLinkPlatform })}
                className="bg-black border border-gray-700 rounded px-2 py-1.5 text-white text-xs font-mono focus:border-white/40 outline-none"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <input
                type="number"
                value={link.display_order}
                onChange={(e) => updateLink(link.id, { display_order: Number(e.target.value) })}
                className="w-14 bg-black border border-gray-700 rounded px-2 py-1.5 text-white text-xs font-mono focus:border-white/40 outline-none"
                title="Orden"
              />
              <button
                onClick={() => removeLink(link.id)}
                className="ml-auto text-red-500 hover:text-red-400 text-xs cursor-pointer px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
              >
                ✕
              </button>
            </div>
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateLink(link.id, { url: e.target.value })}
              placeholder="https://..."
              className="w-full bg-black border border-gray-700 rounded px-2 py-1.5 text-white text-xs font-mono focus:border-white/40 outline-none"
            />
            <input
              type="text"
              value={link.label ?? ''}
              onChange={(e) => updateLink(link.id, { label: e.target.value || null })}
              placeholder="Etiqueta visible (opcional)"
              className="w-full bg-black border border-gray-700 rounded px-2 py-1.5 text-white text-xs font-mono focus:border-white/40 outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function VipsManager({ initialVips }: { initialVips: Vip[] }) {
  const [vips, setVips] = useState<Vip[]>(initialVips);
  const [editing, setEditing] = useState<Partial<Vip> | null>(null);
  const [editLinks, setEditLinks] = useState<VipLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  function openNew() {
    setEditing({ ...EMPTY_VIP, links: [] } as any);
    setEditLinks([]);
    setMsg('');
  }

  function openEdit(vip: Vip) {
    setEditing({ ...vip });
    setEditLinks([...(vip.links ?? [])]);
    setMsg('');
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setMsg('');
    try {
      // 1. Guardar el VIP
      const vipPayload = { ...editing };
      delete (vipPayload as any).links;
      delete (vipPayload as any).vip_links;

      const res = await fetch('/api/admin/vips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vipPayload),
      });
      const data = await res.json();
      if (!res.ok) { setMsg('Error: ' + (data.error || 'desconocido')); return; }

      const savedVip: Vip = { ...data, links: [] };

      // 2. Sincronizar vip_links
      const vipId = savedVip.id;
      const savedLinks: VipLink[] = [];

      for (const link of editLinks) {
        const linkRes = await fetch('/api/admin/vips/links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...link, vip_id: vipId }),
        });
        if (linkRes.ok) {
          const linkData = await linkRes.json();
          savedLinks.push(linkData);
        }
      }

      // 3. Eliminar links que ya no están
      const prevLinks = vips.find((v) => v.slug === data.slug)?.links ?? [];
      const editLinkIds = new Set(editLinks.map((l) => l.id));
      for (const prev of prevLinks) {
        if (!editLinkIds.has(prev.id)) {
          await fetch('/api/admin/vips/links', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: prev.id }),
          });
        }
      }

      savedVip.links = savedLinks.sort((a, b) => a.display_order - b.display_order);

      setVips((prev) => {
        const idx = prev.findIndex((v) => v.slug === savedVip.slug);
        if (idx >= 0) { const next = [...prev]; next[idx] = savedVip; return next; }
        return [...prev, savedVip];
      });
      setEditing(null);
      setEditLinks([]);
      setMsg('✓ Guardado');
    } catch { setMsg('Error de red.'); }
    finally { setSaving(false); }
  }

  async function toggleActive(vip: Vip) {
    const payload = { ...vip, is_active: !(vip as any).is_active };
    delete (payload as any).links;
    delete (payload as any).vip_links;
    const res = await fetch('/api/admin/vips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      setVips((prev) => prev.map((v) => v.slug === data.slug ? { ...v, ...(data as Vip), links: v.links } : v));
    }
  }

  const field = (key: keyof typeof EMPTY_VIP, label: string, type: string = 'text', placeholder = '') => (
    <div key={key}>
      <label className="block text-xs text-gray-400 font-mono mb-1 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={(editing as any)?.[key] ?? ''}
        onChange={(e) => setEditing((prev) => ({ ...prev, [key]: e.target.value || null }))}
        placeholder={placeholder}
        className="w-full bg-black border border-gray-700 rounded px-2.5 py-1.5 text-white text-sm font-mono focus:border-white/40 outline-none"
      />
    </div>
  );

  return (
    <div>
      {/* List */}
      {!editing && (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-400">{vips.length} VIPs</p>
            <button onClick={openNew} className="px-4 py-2 bg-white text-black font-bold text-xs rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
              + Añadir VIP
            </button>
          </div>
          {msg && <p className="text-green-400 text-xs font-mono mb-4">{msg}</p>}
          <div className="space-y-3">
            {vips.map((vip) => (
              <div key={vip.slug} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/3 hover:bg-white/5 transition-all">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black font-orbitron shrink-0 border-2"
                  style={{ background: `${vip.color}20`, borderColor: `${vip.color}50`, color: vip.color }}
                >
                  {vip.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm flex items-center gap-2">
                    {vip.name}
                    {vip.user_id && <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-mono">verificado</span>}
                  </p>
                  <p className="text-gray-500 text-xs font-mono">{vip.slug} · {vip.role} · {(vip.links ?? []).length} links</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${(vip as any).is_active !== false ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                    {(vip as any).is_active !== false ? 'Activo' : 'Inactivo'}
                  </span>
                  <button onClick={() => toggleActive(vip)} className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded hover:bg-white/5">
                    Toggle
                  </button>
                  <button onClick={() => openEdit(vip)} className="text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-blue-500/10">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit form */}
      {editing && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-orbitron text-white">
              {(editing as Vip).id ? `Editar: ${(editing as Vip).name}` : 'Nuevo VIP'}
            </h3>
            <button onClick={() => { setEditing(null); setEditLinks([]); }} className="text-gray-500 hover:text-white text-sm cursor-pointer">← Cancelar</button>
          </div>

          {/* Read-only: cuenta vinculada */}
          {(editing as Vip).user_id && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
              ✓ Cuenta vinculada (user_id: {(editing as Vip).user_id})
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {field('name', 'Nombre', 'text', 'LAG')}
            {field('slug', 'Slug (URL)', 'text', 'lag')}
            {field('role', 'Rol', 'text', 'Líder del TeamLAG')}
            {field('origin', 'Origen', 'text', 'Neuquén, Argentina')}
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-1 uppercase tracking-wider">Color (hex)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={(editing as any).color ?? '#dc2626'}
                  onChange={(e) => setEditing((prev) => ({ ...prev, color: e.target.value }))}
                  className="w-10 h-9 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={(editing as any).color ?? ''}
                  onChange={(e) => setEditing((prev) => ({ ...prev, color: e.target.value }))}
                  className="flex-1 bg-black border border-gray-700 rounded px-2.5 py-1.5 text-white text-sm font-mono focus:border-white/40 outline-none"
                />
              </div>
            </div>
            {field('color_name', 'Nombre del color', 'text', 'rojo')}
            {field('avatar', 'Avatar URL', 'url', 'https://...')}
            {field('youtube_channel_id', 'YouTube Channel ID', 'text', 'UCxxxx')}
            {field('discord_id', 'Discord ID', 'text', '123456789012345678')}
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-1 uppercase tracking-wider">Orden de display</label>
              <input
                type="number"
                value={(editing as any).display_order ?? 99}
                onChange={(e) => setEditing((prev) => ({ ...prev, display_order: Number(e.target.value) }))}
                className="w-full bg-black border border-gray-700 rounded px-2.5 py-1.5 text-white text-sm font-mono focus:border-white/40 outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-400 font-mono mb-1 uppercase tracking-wider">Bio</label>
            <textarea
              rows={6}
              value={(editing as any).bio ?? ''}
              onChange={(e) => setEditing((prev) => ({ ...prev, bio: e.target.value || null }))}
              placeholder="Biografía completa..."
              className="w-full bg-black border border-gray-700 rounded px-2.5 py-2 text-white text-sm font-mono focus:border-white/40 outline-none resize-y"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-400 font-mono mb-1 uppercase tracking-wider">Música</label>
            <textarea
              rows={2}
              value={(editing as any).music ?? ''}
              onChange={(e) => setEditing((prev) => ({ ...prev, music: e.target.value || null }))}
              placeholder="Gustos musicales..."
              className="w-full bg-black border border-gray-700 rounded px-2.5 py-2 text-white text-sm font-mono focus:border-white/40 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TagInput
              label="Aliases"
              value={(editing as any).aliases ?? []}
              onChange={(v) => setEditing((prev) => ({ ...prev, aliases: v }))}
            />
            <TagInput
              label="Juegos favoritos"
              value={(editing as any).favorite_games ?? []}
              onChange={(v) => setEditing((prev) => ({ ...prev, favorite_games: v }))}
            />
          </div>

          <LinksEditor
            vipId={(editing as Vip).id}
            links={editLinks}
            onChange={setEditLinks}
          />

          {msg && (
            <p className={`text-xs font-mono my-4 ${msg.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{msg}</p>
          )}

          <button
            onClick={save}
            disabled={saving}
            className="w-full mt-6 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            {saving ? 'Guardando…' : 'Guardar VIP'}
          </button>
        </div>
      )}
    </div>
  );
}
