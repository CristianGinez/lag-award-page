import { supabase } from '@/features/auth/lib/supabase';
import { getCached } from '@/shared/lib/cache';
import type { Vip } from '../types';

function mapVip(v: any): Vip {
  return {
    ...v,
    links: ((v.vip_links ?? []) as any[]).sort(
      (a, b) => a.display_order - b.display_order,
    ),
  } as Vip;
}

export async function getVips(): Promise<Vip[]> {
  return getCached({ key: 'vips:all', ttl: 300 }, async () => {
    const { data, error } = await supabase
      .from('vips')
      .select('*, vip_links(*)')
      .eq('is_active', true)
      .order('display_order');
    if (error) { console.error('[vipsData]', error); return []; }
    return (data ?? []).map(mapVip);
  });
}

export async function getAllVips(): Promise<Vip[]> {
  const { data, error } = await supabase
    .from('vips')
    .select('*, vip_links(*)')
    .order('display_order');
  if (error) { console.error('[vipsData]', error); return []; }
  return (data ?? []).map(mapVip);
}

export async function getVipBySlug(slug: string): Promise<Vip | null> {
  const { data } = await supabase
    .from('vips')
    .select('*, vip_links(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (!data) return null;
  return mapVip(data);
}

/** Devuelve el perfil VIP si ese usuario es VIP. */
export async function getVipForUser(userId: string): Promise<Vip | null> {
  const { data } = await supabase.rpc('get_vip_for_user', { target_user_id: userId });
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;
  // RPC no incluye vip_links; fetch completo por slug
  if ((row as any).slug) return getVipBySlug((row as any).slug);
  return (row as Vip) ?? null;
}
