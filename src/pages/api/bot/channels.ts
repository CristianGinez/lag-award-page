import type { APIRoute } from 'astro';
import { ConvexHttpClient } from 'convex/browser';
import { requireBotAdmin, json } from '@/features/bot-admin/lib/botApiAuth';

export const prerender = false;

const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL as string;
const CONVEX_DEPLOY_KEY = import.meta.env.CONVEX_DEPLOY_KEY as string;

export const GET: APIRoute = async (context) => {
  const auth = await requireBotAdmin(context);
  if (!auth.ok) return auth.response;

  const convex = new ConvexHttpClient(CONVEX_URL);
  (convex as any).setAdminAuth(CONVEX_DEPLOY_KEY);
  try {
    const result = await convex.query('channelConfig:listAll' as any, {});
    return json({ ok: true, result });
  } catch (err: any) {
    return json({ error: err.message }, 500);
  }
};

export const POST: APIRoute = async (context) => {
  const auth = await requireBotAdmin(context);
  if (!auth.ok) return auth.response;

  const body = await context.request.json();
  const { action: actionName, ...args } = body;

  const convex = new ConvexHttpClient(CONVEX_URL);
  (convex as any).setAdminAuth(CONVEX_DEPLOY_KEY);

  try {
    let result;
    switch (actionName) {
      case 'setMode':
        result = await convex.mutation('channelConfig:setMode' as any, args);
        break;
      case 'setCooldown':
        result = await convex.mutation('channelConfig:setCooldown' as any, args);
        break;
      case 'setPersonality':
        result = await convex.mutation('channelConfig:setPersonality' as any, args);
        break;
      default:
        return json({ error: 'Unknown action' }, 400);
    }
    return json({ ok: true, result });
  } catch (err: any) {
    return json({ error: err.message }, 500);
  }
};
