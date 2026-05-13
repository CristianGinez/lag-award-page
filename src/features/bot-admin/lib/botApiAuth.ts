/**
 * Helper compartido para endpoints `/api/bot/*` (mutaciones del bot).
 *
 * Flujo:
 *   1. Verifica que el usuario tiene sesión válida en Supabase.
 *   2. Verifica que es admin (lee `admin_users` en DB, fallback en JWT claim).
 *   3. Devuelve el `access_token` del usuario para que el endpoint
 *      lo pase a `ConvexHttpClient.setAuth()` — Convex valida el JWT
 *      contra el JWKS público de Supabase y aplica `requireAdmin`.
 *
 * Defensa en profundidad:
 *   - Astro chequea admin (acá).
 *   - Convex chequea admin (en `convex/lib/auth.ts → requireAdmin`).
 *
 * Si Astro o Convex fallan, el otro frena la operación.
 */

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;

type AuthResult =
  | { ok: true; token: string; userId: string }
  | { ok: false; response: Response };

export async function requireBotAdmin(
  context: Parameters<APIRoute>[0],
): Promise<AuthResult> {
  // Read token from Authorization: Bearer <token> header (sent by client-side components).
  // Supabase uses localStorage (not cookies), so cookie-based SSR auth never works here.
  const authHeader = context.request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    };
  }

  // Source of truth: tabla admin_users (con RLS, solo ve su propia fila).
  const { data: adminRow } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  // Fallback al claim si el hook está habilitado y la DB falla.
  const isAdmin = Boolean(adminRow) || user.app_metadata?.is_admin === true;

  if (!isAdmin) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }),
    };
  }

  return { ok: true, token, userId: user.id };
}

/**
 * Helper para responder con JSON consistente.
 */
export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
