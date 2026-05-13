import type { APIRoute } from 'astro';
import { ConvexHttpClient } from 'convex/browser';
import { requireBotAdmin, json } from '@/features/bot-admin/lib/botApiAuth';

export const prerender = false;

const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL as string;
const CONVEX_DEPLOY_KEY = import.meta.env.CONVEX_DEPLOY_KEY as string;

export const POST: APIRoute = async (context) => {
  const auth = await requireBotAdmin(context);
  if (!auth.ok) return auth.response;

  const convex = new ConvexHttpClient(CONVEX_URL);
  (convex as any).setAdminAuth(CONVEX_DEPLOY_KEY);

  try {
    // learnNow puede tardar 30-60s (corre LLM)
    const result = await convex.action('personality:learnNow' as any, {});
    return json({ ok: true, result });
  } catch (err: any) {
    return json({ error: err.message }, 500);
  }
};
