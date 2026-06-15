import type { APIRoute } from 'astro';
import { createServiceClient } from '@/features/auth/lib/supabase';
import { invalidateCache } from '@/shared/lib/cache';

// PKCE sessions live in localStorage, not cookies — read the Bearer token from the Authorization header
async function requireAdmin(context: Parameters<APIRoute>[0]) {
  const authHeader = context.request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);
  const serviceSupabase = createServiceClient();
  const { data: { user } } = await serviceSupabase.auth.getUser(token);
  if (!user) return null;

  const { data } = await serviceSupabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  return data ? user : null;
}

/** GET /api/admin/vips/links?vip_id=xxx — lista links de un VIP */
export const GET: APIRoute = async (context) => {
  const user = await requireAdmin(context);
  if (!user) return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403 });

  const vipId = context.url.searchParams.get('vip_id');
  if (!vipId) return new Response(JSON.stringify({ error: 'vip_id requerido' }), { status: 400 });

  const serviceSupabase = createServiceClient();
  const { data, error } = await serviceSupabase
    .from('vip_links')
    .select('*')
    .eq('vip_id', vipId)
    .order('display_order');

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

/** POST /api/admin/vips/links — upsert de un link */
export const POST: APIRoute = async (context) => {
  const user = await requireAdmin(context);
  if (!user) return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403 });

  const body = await context.request.json();
  const serviceSupabase = createServiceClient();

  const { data, error } = await serviceSupabase
    .from('vip_links')
    .upsert(body, { onConflict: 'id' })
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  await invalidateCache('vips:all');
  return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

/** DELETE /api/admin/vips/links — elimina un link por id */
export const DELETE: APIRoute = async (context) => {
  const user = await requireAdmin(context);
  if (!user) return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403 });

  const { id } = await context.request.json() as { id: string };
  if (!id) return new Response(JSON.stringify({ error: 'id requerido' }), { status: 400 });

  const serviceSupabase = createServiceClient();
  const { error } = await serviceSupabase
    .from('vip_links')
    .delete()
    .eq('id', id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  await invalidateCache('vips:all');
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
