import { supabase } from '@/features/auth/lib/supabase';
import { getVipForUser } from './vipsData';
import type { Vip } from '../types';

/** Devuelve el perfil VIP del usuario logueado, o null. */
export async function getCurrentUserVip(): Promise<Vip | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return getVipForUser(user.id);
}
