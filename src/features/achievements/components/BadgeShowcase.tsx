import { useState, useEffect } from 'react';
import type { BadgeProgress } from '../types';
import { BadgeItem } from './BadgeItem';
import { supabase } from '@/features/auth/lib/supabase';

const RARITY_ORDER: Record<string, number> = { legendary: 0, epic: 1, rare: 2, common: 3 };

export function BadgeShowcase(_props: { badges?: BadgeProgress[]; totalCount?: number }) {
  const [badges, setBadges] = useState<BadgeProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data } = await supabase.rpc('get_badges_with_progress', { target_user_id: user.id });
      setBadges((data as BadgeProgress[]) ?? []);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  const showcase = badges
    .filter((b) => b.unlocked)
    .sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])
    .slice(0, 6);

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  if (showcase.length === 0) {
    return (
      <div className="rounded-xl border border-white/5 bg-white/2 p-4 text-center">
        <p className="text-gray-500 text-sm">Todavía no tenés logros.</p>
        <a href="/logros" className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-block transition-colors">
          Ver todos los logros →
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Vitrina de logros</span>
        <a href="/logros" className="text-[10px] text-gray-500 hover:text-white transition-colors font-mono">
          Ver todos ({unlockedCount}) →
        </a>
      </div>
      <div className="flex flex-wrap gap-2">
        {showcase.map((badge) => <BadgeItem key={badge.id} badge={badge} />)}
      </div>
    </div>
  );
}
