import { useState, useEffect, useMemo } from 'react';
import type { BadgeProgress, Rarity } from '../types';
import { BadgeCard } from './BadgeCard';
import { supabase } from '@/features/auth/lib/supabase';

type Filter = 'all' | 'unlocked' | 'locked' | Rarity;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all',      label: 'Todos' },
  { id: 'unlocked', label: 'Desbloqueados' },
  { id: 'locked',   label: 'Bloqueados' },
  { id: 'legendary',label: 'Legendario' },
  { id: 'epic',     label: 'Épico' },
  { id: 'rare',     label: 'Raro' },
  { id: 'common',   label: 'Común' },
];

export function BadgeGallery(_props: { badges?: BadgeProgress[] }) {
  const [badges, setBadges] = useState<BadgeProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.rpc('get_badges_with_progress', { target_user_id: user?.id ?? null });
      setBadges((data as BadgeProgress[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const unlocked = badges.filter((b) => b.unlocked).length;
  const total = badges.length;
  const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  const filtered = useMemo(() => {
    const base = badges.filter((b) => {
      if (filter === 'unlocked') return b.unlocked;
      if (filter === 'locked')   return !b.unlocked;
      if (filter === 'all')      return true;
      return b.rarity === filter;
    });
    // Desbloqueados primero, luego por display_order
    return [...base].sort((a, b) => {
      if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
      return a.display_order - b.display_order;
    });
  }, [badges, filter]);

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 rounded-full border-2 border-t-amber-400 border-white/10 animate-spin" />
    </div>
  );

  return (
    <div>
      {/* Progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400 font-mono">
            <span className="text-white font-bold">{unlocked}</span> / {total} logros desbloqueados
          </span>
          <span className="text-sm font-bold text-white">{pct}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer
              ${filter === f.id
                ? 'bg-white text-black'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-12">No hay logros en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      )}
    </div>
  );
}
