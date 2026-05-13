import { useState, useMemo } from 'react';
import type { BotMember } from '../types';

interface Props {
  initialMembers: BotMember[];
}

export default function MembersTable({ initialMembers }: Props) {
  const [search, setSearch] = useState('');
  const [onlyOptOut, setOnlyOptOut] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'username'>('recent');

  const filtered = useMemo(() => {
    let list = [...initialMembers];
    if (onlyOptOut) list = list.filter(m => m.optedOut);
    if (search) list = list.filter(m =>
      m.username.toLowerCase().includes(search.toLowerCase()) ||
      (m.displayName?.toLowerCase().includes(search.toLowerCase()))
    );
    if (sortBy === 'recent') list.sort((a, b) => (b.joinedAt ?? 0) - (a.joinedAt ?? 0));
    else list.sort((a, b) => a.username.localeCompare(b.username));
    return list;
  }, [initialMembers, search, onlyOptOut, sortBy]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por username..."
          className="flex-1 min-w-[200px] bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm"
        />
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={onlyOptOut}
            onChange={e => setOnlyOptOut(e.target.checked)}
            className="accent-red-500"
          />
          Solo opt-out
        </label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'recent' | 'username')}
          className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          <option value="recent">Más recientes</option>
          <option value="username">Username A-Z</option>
        </select>
      </div>

      <p className="text-xs text-gray-500">{filtered.length} miembros</p>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase text-gray-500 font-mono">
            <tr>
              <th className="p-4 text-left">Miembro</th>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Discord ID</th>
              <th className="p-4 text-left">Opt-out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(m => (
              <tr key={m._id} className="hover:bg-white/3 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {m.avatar ? (
                      <img
                        src={`https://cdn.discordapp.com/avatars/${m.discordUserId}/${m.avatar}.webp?size=32`}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">
                        {m.username[0]?.toUpperCase()}
                      </div>
                    )}
                    <span className="font-bold">{m.displayName || m.username}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-400 font-mono text-xs">@{m.username}</td>
                <td className="p-4 text-gray-500 font-mono text-xs">{m.discordUserId}</td>
                <td className="p-4">
                  {m.optedOut ? (
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs font-bold">Sí</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-gray-500/10 text-gray-600 rounded text-xs">No</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500 italic">Sin resultados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
