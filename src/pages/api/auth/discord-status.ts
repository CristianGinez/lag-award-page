import type { APIRoute } from 'astro';
import { createServiceClient } from '@/features/auth/lib/supabase';

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const authHeader = context.request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer '))
    return json({ linked: false }, 200);

  const service = createServiceClient();
  const { data: { user } } = await service.auth.getUser(authHeader.slice(7));
  if (!user) return json({ linked: false }, 200);

  const { data: profile } = await service
    .from('profiles')
    .select('discord_id')
    .eq('id', user.id)
    .maybeSingle();

  const discordId = profile?.discord_id as string | null;

  // Also try to get username from admin identities
  let discordUsername: string | undefined;
  try {
    const { data: adminUser } = await service.auth.admin.getUserById(user.id);
    const identity = adminUser?.user?.identities?.find((i) => i.provider === 'discord');
    discordUsername =
      (identity?.identity_data?.['full_name'] as string | undefined) ??
      (identity?.identity_data?.['name'] as string | undefined);
  } catch { /* best-effort */ }

  return json({ linked: Boolean(discordId), discordUsername });
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
