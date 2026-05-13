import { ConvexHttpClient } from 'convex/browser';

const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL as string;

if (!CONVEX_URL) {
  throw new Error('PUBLIC_CONVEX_URL no configurado');
}

/**
 * Cliente HTTP de Convex para lecturas (queries públicas).
 * Usable tanto en frontmatter SSR como en el cliente.
 */
export const convex = new ConvexHttpClient(CONVEX_URL);
