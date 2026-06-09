import type { APIRoute } from 'astro';
import { requireBotAdmin, json } from '@/features/bot-admin/lib/botApiAuth';
import { createClient } from '@supabase/supabase-js';
import { invalidateCache } from '@/shared/lib/cache';

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

  const invalidateAll = () => Promise.all([
    invalidateCache('league_standings'),
    invalidateCache('league_fixture'),
    invalidateCache('league_scorers'),
    invalidateCache('league_editions'),
  ]);

  try {
    if (action === 'update_match') {
      const { id, home_score, away_score, status, match_date } = payload;
      const { error } = await supabase
        .from('league_matches')
        .update({ home_score, away_score, status, match_date })
        .eq('id', id);
      if (error) return json({ error: error.message }, 500);
      await invalidateCache('league_fixture');
      return json({ ok: true });
    }

    if (action === 'update_team') {
      const { id, ...fields } = payload;
      const { error } = await supabase.from('league_teams').update(fields).eq('id', id);
      if (error) return json({ error: error.message }, 500);
      await invalidateCache('league_standings');
      return json({ ok: true });
    }

    if (action === 'update_scorer') {
      const { id, ...fields } = payload;
      const { error } = await supabase.from('league_scorers').update(fields).eq('id', id);
      if (error) return json({ error: error.message }, 500);
      await invalidateCache('league_scorers');
      return json({ ok: true });
    }

    if (action === 'upsert_edition') {
      const { error } = await supabase.from('league_editions').upsert(payload);
      if (error) return json({ error: error.message }, 500);
      await invalidateCache('league_editions');
      return json({ ok: true });
    }

    return json({ error: 'Unknown action' }, 400);
  } catch (err: any) {
    console.error('[api/admin/league]', err);
    return json({ error: err.message ?? String(err) }, 500);
  }
};
