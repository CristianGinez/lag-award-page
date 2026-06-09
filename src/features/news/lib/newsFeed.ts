import { ConvexHttpClient } from 'convex/browser';
import { supabase } from '@/features/auth/lib/supabase';
import { getCached } from '@/shared/lib/cache';

const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL as string;

export type FeedItem = {
  kind: 'live_stream' | 'changelog';
  timestamp: number;
  title: string;
  body?: string;
  image?: string;
  url?: string;
  meta?: Record<string, unknown>;
};

/** Streams en vivo desde Convex (cache corto: 30s, cambian rápido). */
export async function getLiveStreams(): Promise<FeedItem[]> {
  return getCached({ key: 'feed:live_streams', ttl: 30 }, async () => {
    try {
      if (!CONVEX_URL) return [];
      const convex = new ConvexHttpClient(CONVEX_URL);
      const lives: any[] = await convex.query('streamAnnouncer:listActive' as any, {});
      return lives.map((s) => ({
        kind: 'live_stream' as const,
        timestamp: s.startedAt,
        title: `${s.displayName} está en vivo`,
        body: s.title,
        image: s.thumbnailUrl ?? s.streamerAvatarUrl ?? undefined,
        url: s.streamUrl,
        meta: {
          platform: s.platform,
          category: s.category,
          accentColor: s.accentColor,
          displayName: s.displayName,
        },
      }));
    } catch (err) {
      console.error('[newsFeed] live streams error:', err);
      return [];
    }
  });
}

/** Últimas entradas del changelog desde Supabase (cache 120s). */
export async function getChangelog(limit = 5): Promise<FeedItem[]> {
  return getCached({ key: `feed:changelog:${limit}`, ttl: 120 }, async () => {
    const { data, error } = await supabase
      .from('site_changelog')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) { console.error('[newsFeed] changelog error:', error); return []; }
    return (data ?? []).map((c) => ({
      kind: 'changelog' as const,
      timestamp: new Date(c.created_at).getTime(),
      title: c.title,
      body: c.body ?? undefined,
      image: c.image ?? undefined,
      url: '/desarrollo',
      meta: { version: c.version, type: c.type },
    }));
  });
}

/** Feed combinado, ordenado por fecha desc. */
export async function getNewsFeed(): Promise<FeedItem[]> {
  const [streams, changelog] = await Promise.all([getLiveStreams(), getChangelog()]);
  return [...streams, ...changelog].sort((a, b) => b.timestamp - a.timestamp);
}
