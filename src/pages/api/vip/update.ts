import type { APIRoute } from 'astro';
import { createServiceClient } from '@/features/auth/lib/supabase';
import { invalidateCache } from '@/shared/lib/cache';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  // PKCE sessions live in localStorage, not cookies — read Bearer token from Authorization header
  const authHeader = context.request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return json({ error: 'No autorizado' }, 401);

  const supabase = createServiceClient();
  const { data: { user } } = await supabase.auth.getUser(authHeader.slice(7));
  if (!user) return json({ error: 'No autorizado' }, 401);

  let body: any;
  try { body = await context.request.json(); }
  catch { return json({ error: 'JSON inválido' }, 400); }

  const { bio, favorite_games, music, origin, avatar, links } = body;

  // Verificar que el usuario es VIP y obtener su vip_id
  const { data: vip, error: vipErr } = await supabase
    .from('vips')
    .select('id, slug')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (vipErr || !vip) return json({ error: 'No sos un VIP vinculado' }, 403);

  // Validaciones básicas
  if (bio !== undefined && typeof bio === 'string' && bio.length > 500)
    return json({ error: 'Bio demasiado larga (máx. 500 chars)' }, 400);
  if (Array.isArray(favorite_games) && favorite_games.length > 10)
    return json({ error: 'Máximo 10 juegos favoritos' }, 400);
  if (Array.isArray(links) && links.length > 6)
    return json({ error: 'Máximo 6 links' }, 400);

  // UPDATE vips — solo campos editables por el VIP
  const updatePayload: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (bio !== undefined)            updatePayload.bio = bio || null;
  if (favorite_games !== undefined) updatePayload.favorite_games = Array.isArray(favorite_games) ? favorite_games : [];
  if (music !== undefined)          updatePayload.music = music || null;
  if (origin !== undefined)         updatePayload.origin = origin || null;
  if (avatar !== undefined)         updatePayload.avatar = avatar || null;

  const { error: updateErr } = await supabase
    .from('vips')
    .update(updatePayload)
    .eq('id', vip.id);

  if (updateErr) return json({ error: updateErr.message }, 500);

  // Reemplazar links: borrar los existentes e insertar los nuevos
  if (Array.isArray(links)) {
    const { error: delErr } = await supabase
      .from('vip_links')
      .delete()
      .eq('vip_id', vip.id);
    if (delErr) return json({ error: delErr.message }, 500);

    if (links.length > 0) {
      const rows = links.map((l: any, i: number) => ({
        vip_id: vip.id,
        platform: l.platform ?? 'custom',
        url: l.url ?? '',
        label: l.label || null,
        display_order: i,
      })).filter((l) => l.url.trim() !== '');

      if (rows.length > 0) {
        const { error: insErr } = await supabase.from('vip_links').insert(rows);
        if (insErr) return json({ error: insErr.message }, 500);
      }
    }
  }

  await invalidateCache('vips:all');
  return json({ ok: true, slug: vip.slug });
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
