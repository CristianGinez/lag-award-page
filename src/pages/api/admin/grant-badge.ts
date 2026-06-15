import type { APIRoute } from 'astro';
import { createServiceClient } from '@/features/auth/lib/supabase';

export const POST: APIRoute = async (context) => {
  try {
    // 1. Verificar que el solicitante es admin (PKCE sessions use Bearer token, not cookies)
    const authHeader = context.request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });
    }

    const serviceSupabase = createServiceClient();
    const { data: { user } } = await serviceSupabase.auth.getUser(authHeader.slice(7));
    if (!user) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });
    }

    // Check admin_users table
    const { data: adminRow } = await serviceSupabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!adminRow) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403 });
    }

    const body = await context.request.json() as { target_email: string; badge_slug: string };
    const { target_email, badge_slug } = body;
    if (!target_email || !badge_slug) {
      return new Response(JSON.stringify({ error: 'target_email y badge_slug requeridos' }), { status: 400 });
    }

    // 2. Buscar el usuario por email en profiles
    const { data: profile } = await serviceSupabase
      .from('profiles')
      .select('id')
      .eq('email', target_email)
      .maybeSingle();

    if (!profile) {
      return new Response(JSON.stringify({ error: `No se encontró usuario con email ${target_email}` }), { status: 404 });
    }

    // 3. Otorgar el badge
    const { error: grantError } = await serviceSupabase.rpc('grant_badge', {
      target_user_id: profile.id,
      badge_slug,
      target_event_id: null,
    });

    if (grantError) {
      console.error('[admin/grant-badge] RPC error:', grantError);
      return new Response(JSON.stringify({ error: grantError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true, granted_to: target_email, badge_slug }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[admin/grant-badge] unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
};
