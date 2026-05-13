import { useState } from 'react';
import type { ChannelConfig, ConversationalMode } from '../types';

const MODES: { value: ConversationalMode; label: string; desc: string }[] = [
  { value: 'off',      label: 'Off',      desc: 'Bot silenciado' },
  { value: 'passive',  label: 'Pasivo',   desc: 'Solo responde si lo mencionan' },
  { value: 'helpful',  label: 'Útil',     desc: 'Responde cuando puede agregar valor' },
  { value: 'chatty',   label: 'Charlatán',desc: 'Responde frecuentemente' },
];

interface Props {
  initialChannels: ChannelConfig[];
}

export default function ChannelsManager({ initialChannels }: Props) {
  const [channels, setChannels] = useState(initialChannels);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [personalityEdits, setPersonalityEdits] = useState<Record<string, string>>({});

  async function callApi(action: string, args: Record<string, unknown>) {
    const res = await fetch('/api/bot/channels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...args }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error');
    return data.result;
  }

  async function handleSetMode(channelId: string, mode: ConversationalMode) {
    setSaving(channelId);
    setError(null);
    try {
      await callApi('setMode', { channelId, mode });
      setChannels(prev => prev.map(c => c.channelId === channelId ? { ...c, mode } : c));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(null);
    }
  }

  async function handleSetCooldown(channelId: string, cooldownMin: number) {
    setSaving(channelId + '-cd');
    setError(null);
    try {
      await callApi('setCooldown', { channelId, cooldownMin });
      setChannels(prev => prev.map(c => c.channelId === channelId ? { ...c, cooldownMin } : c));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(null);
    }
  }

  async function handleSetPersonality(channelId: string) {
    const personality = personalityEdits[channelId] ?? '';
    setSaving(channelId + '-p');
    setError(null);
    try {
      await callApi('setPersonality', { channelId, personality: personality || null });
      setChannels(prev => prev.map(c => c.channelId === channelId ? { ...c, personality } : c));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
      )}

      {channels.length === 0 && (
        <p className="text-gray-500 italic">No hay canales configurados. El bot aprende de los canales en la whitelist.</p>
      )}

      {channels.map(ch => (
        <article key={ch._id} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-mono">{ch.channelId}</p>
              <p className="font-bold font-orbitron text-sm">Canal Discord</p>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-bold ${
              ch.mode === 'off'     ? 'bg-gray-500/20 text-gray-400' :
              ch.mode === 'passive' ? 'bg-blue-500/20 text-blue-400' :
              ch.mode === 'helpful' ? 'bg-green-500/20 text-green-400' :
                                     'bg-orange-500/20 text-orange-400'
            }`}>
              {ch.mode}
            </span>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Modo conversacional</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {MODES.map(m => (
                <button
                  key={m.value}
                  onClick={() => handleSetMode(ch.channelId, m.value)}
                  disabled={saving === ch.channelId}
                  className={`p-3 rounded-lg text-left border transition-all disabled:opacity-50 ${
                    ch.mode === m.value
                      ? 'border-white bg-white/10 text-white'
                      : 'border-white/10 bg-black/20 text-gray-400 hover:border-white/30'
                  }`}
                >
                  <p className="font-bold text-xs">{m.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
                Cooldown (minutos)
              </label>
              <input
                type="number"
                min={0}
                max={120}
                defaultValue={ch.cooldownMin}
                onBlur={e => handleSetCooldown(ch.channelId, Number(e.target.value))}
                disabled={saving === ch.channelId + '-cd'}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
              Personalidad custom (vacío = global)
            </label>
            <textarea
              rows={3}
              value={personalityEdits[ch.channelId] ?? ch.personality ?? ''}
              onChange={e => setPersonalityEdits(prev => ({ ...prev, [ch.channelId]: e.target.value }))}
              placeholder="Ej: En este canal el bot es más técnico y habla sobre partidos..."
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm resize-none"
            />
            <button
              onClick={() => handleSetPersonality(ch.channelId)}
              disabled={saving === ch.channelId + '-p'}
              className="mt-2 px-4 py-1.5 text-xs font-bold bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {saving === ch.channelId + '-p' ? 'Guardando…' : 'Guardar personalidad'}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
