import type { APIRoute } from 'astro';
import { ConvexHttpClient } from 'convex/browser';
import { getSupabase } from '@/features/auth/lib/supabase';

export const prerender = false;

const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL as string;
const DEPLOY_KEY = import.meta.env.CONVEX_DEPLOY_KEY as string;

async function requireAdmin(context: Parameters<APIRoute>[0]) {
  const supabase = getSupabase(context);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.app_metadata?.is_admin) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null;
}

export const POST: APIRoute = async (context) => {
  const denied = await requireAdmin(context);
  if (denied) return denied;

  const convex = new ConvexHttpClient(CONVEX_URL);
  convex.setAuth(DEPLOY_KEY);

  try {
    // learnNow puede tardar 30-60s (corre LLM)
    const result = await convex.action('personality:learnNow' as any, {});
    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
