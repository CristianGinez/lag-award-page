import type { APIRoute } from 'astro';
import { invalidateCache } from '../../../shared/lib/cache';

const INTERNAL_SECRET = import.meta.env.INTERNAL_INVALIDATE_SECRET;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const secret = request.headers.get('x-internal-secret');
  if (!INTERNAL_SECRET || secret !== INTERNAL_SECRET) {
    return new Response('Forbidden', { status: 403 });
  }

  let body: { keys?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  if (!Array.isArray(body.keys)) {
    return new Response('Bad request: keys must be an array', { status: 400 });
  }

  await Promise.all((body.keys as string[]).map(invalidateCache));
  return new Response('ok', { status: 200 });
};
