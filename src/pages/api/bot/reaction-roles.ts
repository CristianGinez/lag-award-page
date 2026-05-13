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

export const GET: APIRoute = async (context) => {
  const denied = await requireAdmin(context);
  if (denied) return denied;

  const convex = new ConvexHttpClient(CONVEX_URL);
  try {
    const result = await convex.query('reactionRoles:listAll' as any, {});
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

export const POST: APIRoute = async (context) => {
  const denied = await requireAdmin(context);
  if (denied) return denied;

  const body = await context.request.json();
  const { action: actionName, ...args } = body;

  const convex = new ConvexHttpClient(CONVEX_URL);
  convex.setAuth(DEPLOY_KEY);

  try {
    let result;
    switch (actionName) {
      case 'add':
        result = await convex.mutation('reactionRoles:addReactionRole' as any, args);
        break;
      case 'remove':
        result = await convex.mutation('reactionRoles:removeReactionRole' as any, args);
        break;
      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }
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
