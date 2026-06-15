import type { APIRoute } from 'astro';
import { createServiceClient } from '@/features/auth/lib/supabase';

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const authHeader = context.request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer '))
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });

  const service = createServiceClient();
  const { data: { user } } = await service.auth.getUser(authHeader.slice(7));
  if (!user) return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });

  const { data: vip, error } = await service
    .from('vips')
    .select('*, links:vip_links(*)')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  if (!vip) return new Response(JSON.stringify({ error: 'No sos un VIP vinculado' }), { status: 403 });

  return new Response(JSON.stringify(vip), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
