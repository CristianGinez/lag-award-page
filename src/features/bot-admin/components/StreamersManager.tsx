import { useState } from 'react';
import type { TrackedStreamer, Platform } from '../types';
import { supabase } from '@/features/auth/lib/supabase';

interface Props {
  initialStreamers: TrackedStreamer[];
}

export default function StreamersManager({ initialStreamers }: Props) {
  const [streamers, setStreamers] = useState(initialStreamers);
  const [platform, setPlatform] = useState<Platform>('twitch');
  const [login, setLogin] = useState('');
  const [channelId, setChannelId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [accentColor, setAccentColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function callApi(action: string, args: Record<string, unknown>) {
    setLoading(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/bot/streamers', {
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

  async function refreshList() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/bot/streamers', {
        headers: session ? { Authorization: `Bearer ${session.access_token}` } : {},
      });
      const data = await res.json();
      if (data.ok) setStreamers(data.result || []);
    } catch (_) {}
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (platform === 'twitch' && !login) return setError('Falta el login de Twitch');
    if (platform === 'youtube' && !channelId) return setError('Falta el channelId de YouTube');

    const action = platform === 'twitch' ? 'addTwitch' : 'addYoutube';
    const args: Record<string, string | undefined> = {
      displayName: displayName || undefined,
      accentColor: accentColor || undefined,
    };
    if (platform === 'twitch') args.login = login;
    else args.channelId = channelId;

    try {
      await callApi(action, args);
      await refreshList();
      setLogin('');
      setChannelId('');
      setDisplayName('');
      setAccentColor('');
    } catch (_) {}
  }

  async function handleToggle(streamerId: string, enabled: boolean) {
    try {
      await callApi('setEnabled', { streamerId, enabled: !enabled });
      setStreamers(prev => prev.map(s => s._id === streamerId ? { ...s, enabled: !enabled } : s));
    } catch (_) {}
  }

  async function handleDelete(streamerId: string) {
    if (!confirm('¿Borrar este streamer? Esto desuscribe el webhook.')) return;
    try {
      await callApi('remove', { streamerId });
      setStreamers(prev => prev.filter(s => s._id !== streamerId));
    } catch (_) {}
  }

  return (
    <div className="space-y-8">
      <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold font-orbitron mb-4">Agregar streamer</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Plataforma</label>
            <select
              value={platform}
              onChange={e => setPlatform(e.target.value as Platform)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
            >
              <option value="twitch">Twitch</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>

          {platform === 'twitch' ? (
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Login (usuario)</label>
              <input
                type="text"
                value={login}
                onChange={e => setLogin(e.target.value)}
                placeholder="lagartovich"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Channel ID (UC...)</label>
              <input
                type="text"
                value={channelId}
                onChange={e => setChannelId(e.target.value)}
                placeholder="UCabc123..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
              />
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Display name (opcional)</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="LAG"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Color hex (opcional)</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={accentColor || '#dc2626'}
                onChange={e => setAccentColor(e.target.value)}
                className="h-10 w-10 rounded-lg cursor-pointer border border-white/10 bg-transparent p-0.5 shrink-0"
                title="Seleccionar color"
              />
              <input
                type="text"
                value={accentColor}
                onChange={e => setAccentColor(e.target.value)}
                placeholder="#dc2626"
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 font-mono text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg font-bold transition-colors"
          >
            {loading ? 'Procesando…' : 'Agregar streamer'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold font-orbitron mb-4">Streamers ({streamers.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {streamers.map(s => (
            <article
              key={s._id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
              style={{
                borderLeftColor: s.accentColor || (s.platform === 'twitch' ? '#9146FF' : '#FF0000'),
                borderLeftWidth: 4,
              }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">{s.platform}</p>
                <p className="font-bold">{s.displayName || s.platformLogin}</p>
                <p className="text-xs text-gray-400">@{s.platformLogin}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(s._id, s.enabled)}
                  disabled={loading}
                  className={`px-3 py-1 rounded text-xs font-bold disabled:opacity-50 ${
                    s.enabled
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                  }`}
                >
                  {s.enabled ? 'Activo' : 'Pausado'}
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  disabled={loading}
                  className="px-3 py-1 rounded text-xs font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:opacity-50"
                >
                  Borrar
                </button>
              </div>
            </article>
          ))}

          {streamers.length === 0 && (
            <p className="text-gray-500 italic">No hay streamers configurados todavía.</p>
          )}
        </div>
      </section>
    </div>
  );
}
