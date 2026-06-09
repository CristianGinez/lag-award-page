import { useState, useRef } from 'react';
import type { Vip, VipLinkPlatform } from '@/features/community/types';

const PLATFORMS: { value: VipLinkPlatform; label: string }[] = [
  { value: 'youtube',   label: 'YouTube' },
  { value: 'twitch',    label: 'Twitch' },
  { value: 'twitter',   label: 'Twitter / X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok',    label: 'TikTok' },
  { value: 'kick',      label: 'Kick' },
  { value: 'steam',     label: 'Steam' },
  { value: 'spotify',   label: 'Spotify' },
  { value: 'discord',   label: 'Discord' },
  { value: 'custom',    label: 'Otro (custom)' },
];

interface LinkRow { platform: VipLinkPlatform; url: string; label: string; }
interface Props { vip: Vip; }

export function VipEditForm({ vip }: Props) {
  const [bio, setBio]         = useState(vip.bio ?? '');
  const [games, setGames]     = useState<string[]>(vip.favorite_games ?? []);
  const [music, setMusic]     = useState(vip.music ?? '');
  const [origin, setOrigin]   = useState(vip.origin ?? '');
  const [avatarUrl]           = useState(vip.avatar ?? '');
  const [links, setLinks]     = useState<LinkRow[]>(
    vip.links.map((l) => ({ platform: l.platform, url: l.url, label: l.label ?? '' }))
  );
  const [gameInput, setGameInput]     = useState('');
  const [avatarFile, setAvatarFile]   = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(vip.avatar ?? '');
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Avatar ──────────────────────────────────────────────────────
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError('La imagen no puede superar 2MB'); return; }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setError('');
  }

  async function uploadToCloudinary(file: File): Promise<string> {
    const preset = (import.meta as any).env.PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', preset);
    fd.append('folder', 'tlag/vips');
    const res = await fetch('https://api.cloudinary.com/v1_1/dmml18kkb/image/upload', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Error al subir la imagen a Cloudinary');
    const data = await res.json();
    return data.secure_url as string;
  }

  // ── Games ────────────────────────────────────────────────────────
  function addGame() {
    const g = gameInput.trim();
    if (!g || games.includes(g) || games.length >= 10) return;
    setGames([...games, g]);
    setGameInput('');
  }
  function removeGame(i: number) { setGames(games.filter((_, idx) => idx !== i)); }

  // ── Links ────────────────────────────────────────────────────────
  function addLink() {
    if (links.length >= 6) return;
    setLinks([...links, { platform: 'youtube', url: '', label: '' }]);
  }
  function removeLink(i: number) { setLinks(links.filter((_, idx) => idx !== i)); }
  function updateLink(i: number, field: keyof LinkRow, val: string) {
    setLinks(links.map((l, idx) => idx === i ? { ...l, [field]: val } : l));
  }

  // ── Submit ───────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      let finalAvatar = avatarUrl;
      if (avatarFile) finalAvatar = await uploadToCloudinary(avatarFile);

      const res = await fetch('/api/vip/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio, favorite_games: games, music, origin, avatar: finalAvatar, links }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Error desconocido'); return; }
      window.location.href = `/vips/${data.slug}`;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors';
  const labelCls = 'block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 font-mono mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Avatar */}
      <div>
        <p className={labelCls}>Avatar</p>
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            {avatarPreview
              ? <img src={avatarPreview} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-white/10" />
              : <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-black text-white">{vip.name[0]}</div>
            }
          </div>
          <div className="space-y-2">
            <button type="button" onClick={() => fileRef.current?.click()}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 transition-colors cursor-pointer">
              Cambiar foto
            </button>
            <p className="text-[11px] text-gray-600">JPG, PNG o WEBP · Máx 2MB</p>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className={labelCls}>Bio <span className="normal-case">(máx. 500 chars)</span></label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)}
          maxLength={500} rows={4} placeholder="Contá algo sobre vos..."
          className={`${inputCls} resize-none`} />
        <p className="text-right text-[11px] text-gray-600 mt-1">{bio.length}/500</p>
      </div>

      {/* Juegos favoritos */}
      <div>
        <label className={labelCls}>Juegos favoritos <span className="normal-case">(máx. 10)</span></label>
        <div className="flex gap-2 mb-3">
          <input value={gameInput} onChange={(e) => setGameInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addGame(); } }}
            placeholder="Resident Evil 4..." className={`${inputCls} flex-1`} />
          <button type="button" onClick={addGame} disabled={games.length >= 10}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 rounded-xl text-sm font-bold transition-colors cursor-pointer">
            +
          </button>
        </div>
        {games.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {games.map((g, i) => (
              <span key={g} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                {g}
                <button type="button" onClick={() => removeGame(i)} className="text-gray-500 hover:text-red-400 transition-colors text-xs leading-none cursor-pointer">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Música */}
      <div>
        <label className={labelCls}>Música</label>
        <input value={music} onChange={(e) => setMusic(e.target.value)}
          maxLength={100} placeholder="Metal, indie, lo que sea..." className={inputCls} />
      </div>

      {/* Origin */}
      <div>
        <label className={labelCls}>Origen</label>
        <input value={origin} onChange={(e) => setOrigin(e.target.value)}
          maxLength={80} placeholder="Argentina, Uruguay..." className={inputCls} />
      </div>

      {/* Links */}
      <div>
        <label className={labelCls}>Links sociales <span className="normal-case">(máx. 6)</span></label>
        <div className="space-y-3">
          {links.map((l, i) => (
            <div key={i} className="flex gap-2 items-start">
              <select value={l.platform} onChange={(e) => updateLink(i, 'platform', e.target.value)}
                className={`${inputCls} w-36 shrink-0`}>
                {PLATFORMS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
              <input value={l.url} onChange={(e) => updateLink(i, 'url', e.target.value)}
                placeholder="https://..." className={`${inputCls} flex-1`} />
              <input value={l.label} onChange={(e) => updateLink(i, 'label', e.target.value)}
                placeholder="Label (opcional)" className={`${inputCls} w-32 shrink-0`} />
              <button type="button" onClick={() => removeLink(i)}
                className="shrink-0 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/10 rounded-xl transition-colors text-lg cursor-pointer">
                ×
              </button>
            </div>
          ))}
          {links.length < 6 && (
            <button type="button" onClick={addLink}
              className="w-full py-2.5 border border-dashed border-white/15 hover:border-purple-500/50 rounded-xl text-sm text-gray-500 hover:text-purple-400 transition-colors cursor-pointer">
              + Agregar link
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <a href="/perfil"
          className="flex-1 text-center py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-gray-300 transition-colors">
          Cancelar
        </a>
        <button type="submit" disabled={saving}
          className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl text-sm font-black text-white uppercase tracking-wider transition-colors cursor-pointer">
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

    </form>
  );
}
