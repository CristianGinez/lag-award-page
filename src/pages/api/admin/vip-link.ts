import type { APIRoute } from 'astro';
import { createServiceClient } from '@/features/auth/lib/supabase';
import { invalidateCache } from '@/shared/lib/cache';

export const prerender = false;

// PKCE sessions live in localStorage, not cookies — read the Bearer token from the Authorization header
async function requireAdmin(context: Parameters<APIRoute>[0]) {
  const authHeader = context.request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const service = createServiceClient();
  const { data: { user } } = await service.auth.getUser(authHeader.slice(7));
  if (!user) return null;
  const { data } = await service.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle();
  return data ? user : null;
}

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST /api/admin/vip-link  { vip_id, email }  → vincular
// DELETE /api/admin/vip-link  { vip_id }        → desvincular
export const POST: APIRoute = async (context) => {
  const admin = await requireAdmin(context);
  if (!admin) return json({ error: 'No autorizado' }, 403);

  const { vip_id, email } = await context.request.json();
  if (!vip_id || !email) return json({ error: 'vip_id y email requeridos' }, 400);

  const service = createServiceClient();

  // Buscar usuario por email en auth.users via service role
  const { data: users, error: searchErr } = await service.auth.admin.listUsers();
  if (searchErr) return json({ error: searchErr.message }, 500);

  const target = users.users.find((u) => u.email?.toLowerCase() === email.toLowerCase().trim());
  if (!target) return json({ error: `No existe ningún usuario con el email "${email}"` }, 404);

  // Verificar que ese user_id no esté ya vinculado a otro VIP
  const { data: existing } = await service
    .from('vips')
    .select('id, slug, name')
    .eq('user_id', target.id)
    .maybeSingle();

  if (existing && existing.id !== vip_id)
    return json({ error: `Ese usuario ya está vinculado a ${existing.name}` }, 409);

  const { error: updateErr } = await service
    .from('vips')
    .update({ user_id: target.id, updated_at: new Date().toISOString() })
    .eq('id', vip_id);

  if (updateErr) return json({ error: updateErr.message }, 500);

  await invalidateCache('vips:all');
  return json({ ok: true, linked_email: target.email, user_id: target.id });
};

export const DELETE: APIRoute = async (context) => {
  const admin = await requireAdmin(context);
  if (!admin) return json({ error: 'No autorizado' }, 403);

  const { vip_id } = await context.request.json();
  if (!vip_id) return json({ error: 'vip_id requerido' }, 400);

  const service = createServiceClient();
  const { error } = await service
    .from('vips')
    .update({ user_id: null, updated_at: new Date().toISOString() })
    .eq('id', vip_id);

  if (error) return json({ error: error.message }, 500);

  await invalidateCache('vips:all');
  return json({ ok: true });
};
