import type { APIRoute } from 'astro';
import { getSupabase, createServiceClient } from '@/features/auth/lib/supabase';
import { invalidateCache } from '@/shared/lib/cache';

async function requireAdmin(context: Parameters<APIRoute>[0]) {
  const ssrSupabase = getSupabase(context);
  const { data: { user } } = await ssrSupabase.auth.getUser();
  if (!user) return null;

  const serviceSupabase = createServiceClient();
  const { data } = await serviceSupabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  return data ? user : null;
}

export const GET: APIRoute = async (context) => {
  const user = await requireAdmin(context);
  if (!user) return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403 });

  const serviceSupabase = createServiceClient();
  const { data, error } = await serviceSupabase
    .from('vips')
    .select('*, vip_links(*)')
    .order('display_order');

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const POST: APIRoute = async (context) => {
  const user = await requireAdmin(context);
  if (!user) return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403 });

  const body = await context.request.json();
  const serviceSupabase = createServiceClient();

  const { data, error } = await serviceSupabase
    .from('vips')
    .upsert({ ...body, updated_at: new Date().toISOString() }, { onConflict: 'slug' })
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  await invalidateCache('vips:all');
  return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const DELETE: APIRoute = async (context) => {
  const user = await requireAdmin(context);
  if (!user) return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403 });

  const { slug } = await context.request.json() as { slug: string };
  if (!slug) return new Response(JSON.stringify({ error: 'slug requerido' }), { status: 400 });

  const serviceSupabase = createServiceClient();
  const { error } = await serviceSupabase
    .from('vips')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('slug', slug);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  await invalidateCache('vips:all');
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
