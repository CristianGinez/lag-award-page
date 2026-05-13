import type { AstroGlobal } from 'astro';
import { getSupabase } from '@/features/auth/lib/supabase';

/**
 * Verifica si el usuario actual es admin para usarlo en frontmatter de páginas.
 * Usa DB como source of truth; JWT claim como fast-path cuando el hook está habilitado.
 */
export async function isAdminPage(Astro: AstroGlobal): Promise<boolean> {
  const supabase = getSupabase(Astro);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  // Fast path: claim del JWT (requiere Custom Access Token Hook habilitado)
  if (user.app_metadata?.is_admin === true) return true;

  // Fallback: tabla admin_users (RLS garantiza que solo ve su propia fila)
  const { data } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  return Boolean(data);
}
