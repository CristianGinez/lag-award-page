import type { APIRoute } from 'astro';
import { ConvexHttpClient } from 'convex/browser';
import { requireBotAdmin, json } from '@/features/bot-admin/lib/botApiAuth';

export const prerender = false;

const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL as string;

// Solo lectura — el opt-out se gestiona desde Discord con /olvidame
export const GET: APIRoute = async (context) => {
  const auth = await requireBotAdmin(context);
  if (!auth.ok) return auth.response;

  const convex = new ConvexHttpClient(CONVEX_URL);
  convex.setAuth(auth.token);
  try {
    const result = await convex.query('members:listMembers' as any, {});
    return json({ ok: true, result });
  } catch (err: any) {
    return json({ error: err.message }, 500);
  }
};
