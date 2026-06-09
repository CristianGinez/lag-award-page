import { supabase } from '@/features/auth/lib/supabase';
import { getCached } from '@/shared/lib/cache';
import type { Category } from '../types';

export const EVENT_ID_2025 = '856a7c16-5436-4776-a844-04dcaafb4656';

/** Trae categorías + nominados de un evento desde Supabase, con cache de 60s. */
export async function getCategories(eventId: string = EVENT_ID_2025): Promise<Category[]> {
  return getCached({ key: `award_categories:${eventId}`, ttl: 60 }, async () => {
    const { data: cats, error } = await supabase
      .from('award_categories')
      .select('*, award_nominees(*)')
      .eq('event_id', eventId)
      .order('display_order');

    if (error) {
      console.error('[awardsData] error:', error);
      return [];
    }

    return (cats ?? []).map((c: any) => ({
      id: c.id,
      icon: c.icon,
      title: c.title,
      description: c.description,
      image: c.image,
      color: c.color,
      tvBackground: c.tv_background,
      nominees: (c.award_nominees ?? [])
        .sort((a: any, b: any) => a.display_order - b.display_order)
        .map((n: any) => ({
          name: n.name,
          creator: n.creator ?? undefined,
          image: n.image,
          description: n.description,
          youtubeId: n.youtube_id ?? undefined,
          video: n.video ?? undefined,
        })),
    }));
  });
}
