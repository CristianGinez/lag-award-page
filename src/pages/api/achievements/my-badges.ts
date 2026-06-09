import type { APIRoute } from 'astro';
import { getSupabase } from '@/features/auth/lib/supabase';
import { getBadges } from '@/features/achievements/lib/achievementsData';

export const GET: APIRoute = async (context) => {
  const ssrSupabase = getSupabase(context);
  const { data: { user } } = await ssrSupabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });
  }
  const badges = await getBadges(user.id);
  return new Response(JSON.stringify(badges), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
