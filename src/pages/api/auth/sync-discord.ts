import type { APIRoute } from 'astro';
import { createServiceClient } from '@/features/auth/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const authHeader = context.request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer '))
    return json({ error: 'No autorizado' }, 401);

  const service = createServiceClient();

  // Verify token and get user id
  const { data: { user } } = await service.auth.getUser(authHeader.slice(7));
  if (!user) return json({ error: 'No autorizado' }, 401);

  // Admin API returns full identity list reliably
  const { data: adminUser, error: adminErr } = await service.auth.admin.getUserById(user.id);
  if (adminErr || !adminUser.user) return json({ error: 'No se pudo obtener el usuario' }, 500);

  const discordIdentity = adminUser.user.identities?.find((i) => i.provider === 'discord');
  if (!discordIdentity) return json({ error: 'no-discord-identity' }, 400);

  const discordId =
    (discordIdentity.identity_data as Record<string, unknown>)?.provider_id as string | undefined ??
    (discordIdentity.identity_data as Record<string, unknown>)?.sub as string | undefined ??
    discordIdentity.id;

  const { error: updateErr } = await service
    .from('profiles')
    .update({ discord_id: String(discordId), updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (updateErr) {
    if ((updateErr as { code?: string }).code === '23505')
      return json({ error: 'already-linked-to-another' }, 409);
    return json({ error: updateErr.message }, 500);
  }

  // Claim VIP status if discord_id matches a VIP
  try {
    await service.rpc('claim_vip_status', { target_user_id: user.id });
  } catch { /* no-op */ }

  return json({ ok: true, discordId: String(discordId) });
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
