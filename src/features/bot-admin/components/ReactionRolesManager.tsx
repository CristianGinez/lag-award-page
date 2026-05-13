import { useState } from 'react';
import type { ReactionRole } from '../types';
import { supabase } from '@/features/auth/lib/supabase';

interface Props {
  initialRoles: ReactionRole[];
}

export default function ReactionRolesManager({ initialRoles }: Props) {
  const [roles, setRoles] = useState(initialRoles);
  const [form, setForm] = useState({
    messageId: '',
    channelId: '',
    emoji: '',
    roleId: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField(key: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function callApi(action: string, args: Record<string, unknown>) {
    setLoading(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/bot/reaction-roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ action, ...args }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      return data.result;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.messageId || !form.channelId || !form.emoji || !form.roleId) {
      return setError('Completá todos los campos requeridos (messageId, channelId, emoji, roleId)');
    }
    try {
      const result = await callApi('add', {
        messageId: form.messageId,
        channelId: form.channelId,
        emoji: form.emoji,
        roleId: form.roleId,
        description: form.description || undefined,
      });
      // Refresh list
      const { data: { session: s2 } } = await supabase.auth.getSession();
      const refreshRes = await fetch('/api/bot/reaction-roles', {
        headers: s2 ? { Authorization: `Bearer ${s2.access_token}` } : {},
      });
      const refreshData = await refreshRes.json();
      if (refreshData.ok) setRoles(refreshData.result || []);
      setForm({ messageId: '', channelId: '', emoji: '', roleId: '', description: '' });
    } catch (_) {}
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este reaction role?')) return;
    try {
      await callApi('remove', { reactionRoleId: id });
      setRoles(prev => prev.filter(r => r._id !== id));
    } catch (_) {}
  }

  const fields: { key: keyof typeof form; label: string; placeholder: string; required?: boolean }[] = [
    { key: 'messageId', label: 'Message ID', placeholder: '123456789012345678', required: true },
    { key: 'channelId', label: 'Channel ID', placeholder: '123456789012345678', required: true },
    { key: 'emoji',     label: 'Emoji',      placeholder: '🎮 o nombre custom', required: true },
    { key: 'roleId',    label: 'Role ID',    placeholder: '123456789012345678', required: true },
    { key: 'description', label: 'Descripción (opcional)', placeholder: 'Rol para jugadores de FIFA' },
  ];

  return (
    <div className="space-y-8">
      <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold font-orbitron mb-4">Agregar Reaction Role</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key} className={f.key === 'description' ? 'md:col-span-2' : ''}>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
                {f.label}
              </label>
              <input
                type="text"
                value={form[f.key]}
                onChange={e => setField(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg font-bold transition-colors"
          >
            {loading ? 'Procesando…' : 'Agregar reaction role'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold font-orbitron mb-4">Reaction Roles ({roles.length})</h2>
        <div className="space-y-3">
          {roles.map(r => (
            <article key={r._id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{r.emoji}</span>
                <div>
                  <p className="font-bold text-sm">{r.description || 'Sin descripción'}</p>
                  <p className="text-xs text-gray-500 font-mono">
                    msg:{r.messageId.slice(-6)} · ch:{r.channelId.slice(-6)} · role:{r.roleId.slice(-6)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(r._id)}
                disabled={loading}
                className="px-3 py-1 rounded text-xs font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:opacity-50"
              >
                Borrar
              </button>
            </article>
          ))}
          {roles.length === 0 && (
            <p className="text-gray-500 italic">No hay reaction roles configurados.</p>
          )}
        </div>
      </section>
    </div>
  );
}
