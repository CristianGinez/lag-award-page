import type { APIRoute } from 'astro';
import { requireBotAdmin, json } from '@/features/bot-admin/lib/botApiAuth';
import { createClient } from '@supabase/supabase-js';
import { invalidateCache } from '@/shared/lib/cache';
import { EVENT_ID_2025 } from '@/features/awards/lib/awardsData';

export const prerender = false;

function getAdminClient(token: string) {
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

export const POST: APIRoute = async (context) => {
  const auth = await requireBotAdmin(context);
  if (!auth.ok) return auth.response;

  const supabase = getAdminClient(auth.token);
  const body = await context.request.json();
  const { action, ...payload } = body;

  try {
    if (action === 'upsert_category') {
      const { error } = await supabase
        .from('award_categories')
        .upsert({ ...payload, event_id: EVENT_ID_2025 });
      if (error) return json({ error: error.message }, 500);
      await invalidateCache(`award_categories:${EVENT_ID_2025}`);
      return json({ ok: true });
    }

    if (action === 'upsert_nominee') {
      const { error } = await supabase
        .from('award_nominees')
        .upsert(payload, { onConflict: 'category_id,name' });
      if (error) return json({ error: error.message }, 500);
      await invalidateCache(`award_categories:${EVENT_ID_2025}`);
      return json({ ok: true });
    }

    if (action === 'delete_nominee') {
      const { id } = payload;
      const { error } = await supabase.from('award_nominees').delete().eq('id', id);
      if (error) return json({ error: error.message }, 500);
      await invalidateCache(`award_categories:${EVENT_ID_2025}`);
      return json({ ok: true });
    }

    return json({ error: 'Unknown action' }, 400);
  } catch (err: any) {
    console.error('[api/admin/awards]', err);
    return json({ error: err.message ?? String(err) }, 500);
  }
};
