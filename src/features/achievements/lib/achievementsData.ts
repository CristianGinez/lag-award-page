import { supabase } from '@/features/auth/lib/supabase';
import { getCached } from '@/shared/lib/cache';
import type { BadgeProgress } from '../types';

/** Catálogo completo con progreso del usuario (o null para solo rareza). */
export async function getBadges(userId: string | null): Promise<BadgeProgress[]> {
  const { data, error } = await supabase.rpc('get_badges_with_progress', {
    target_user_id: userId,
  });
  if (error) {
    console.error('[achievements] error:', error);
    return [];
  }
  return (data ?? []) as BadgeProgress[];
}

/** Solo el catálogo (sin usuario) — cacheado 5 min, para páginas públicas. */
export async function getBadgeCatalog(): Promise<BadgeProgress[]> {
  return getCached({ key: 'badges:catalog', ttl: 300 }, () => getBadges(null));
}
