import { ConvexHttpClient } from 'convex/browser';

const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL as string;
const CONVEX_DEPLOY_KEY = import.meta.env.CONVEX_DEPLOY_KEY as string;

if (!CONVEX_URL) {
  console.warn('[bot-admin] PUBLIC_CONVEX_URL no configurado — Convex desactivado');
}

/** Cliente HTTP de Convex con credenciales de admin (deploy key). Null si PUBLIC_CONVEX_URL no está configurado. */
export const convex = CONVEX_URL ? new ConvexHttpClient(CONVEX_URL) : null;
if (convex && CONVEX_DEPLOY_KEY) {
  (convex as any).setAdminAuth(CONVEX_DEPLOY_KEY);
}
