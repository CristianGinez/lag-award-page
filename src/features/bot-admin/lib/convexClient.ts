import { ConvexHttpClient } from 'convex/browser';

const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL as string;

if (!CONVEX_URL) {
  console.warn('[bot-admin] PUBLIC_CONVEX_URL no configurado — Convex desactivado');
}

/** Cliente HTTP de Convex sin auth. Usado en SSR para fetch inicial; null si PUBLIC_CONVEX_URL no está configurado. */
export const convex = CONVEX_URL ? new ConvexHttpClient(CONVEX_URL) : null;
