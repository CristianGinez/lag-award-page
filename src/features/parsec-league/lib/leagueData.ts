import { supabase } from '@/features/auth/lib/supabase';
import { getCached } from '@/shared/lib/cache';
import type { LeagueTeam, Round, GoalScorer, Edition } from '../types';

export async function getStandings(): Promise<LeagueTeam[]> {
  return getCached({ key: 'league_standings', ttl: 60 }, async () => {
    const { data, error } = await supabase
      .from('league_teams')
      .select('*')
      .order('position');
    if (error) { console.error('[leagueData] standings:', error); return []; }
    return (data ?? []).map((t: any) => ({
      position: t.position,
      name: t.name,
      logo: t.logo ?? undefined,
      played: t.played,
      won: t.won,
      drawn: t.drawn,
      lost: t.lost,
      points: t.points,
      gf: t.gf,
      ga: t.ga,
      gd: t.gd,
      form: t.form ?? [],
    }));
  });
}

export async function getFixture(): Promise<Round[]> {
  return getCached({ key: 'league_fixture', ttl: 60 }, async () => {
    const { data: rounds, error } = await supabase
      .from('league_rounds')
      .select('*, league_matches(*)')
      .order('display_order');
    if (error) { console.error('[leagueData] fixture:', error); return []; }
    return (rounds ?? []).map((r: any) => ({
      name: r.name,
      matches: (r.league_matches ?? [])
        .sort((a: any, b: any) => a.display_order - b.display_order)
        .map((m: any) => ({
          id: m.id,
          homeTeam: m.home_team,
          awayTeam: m.away_team,
          homeScore: m.home_score,
          awayScore: m.away_score,
          date: m.match_date,
          time: m.match_time,
          status: m.status,
        })),
    }));
  });
}

export async function getEditions(): Promise<Edition[]> {
  return getCached({ key: 'league_editions', ttl: 300 }, async () => {
    const { data, error } = await supabase
      .from('league_editions')
      .select('*')
      .order('display_order');
    if (error) { console.error('[leagueData] editions:', error); return []; }
    return (data ?? []).map((e: any) => ({
      title: e.title,
      year: e.year,
      videoId: e.video_id,
      description: e.description ?? undefined,
    }));
  });
}

export async function getScorers(): Promise<GoalScorer[]> {
  return getCached({ key: 'league_scorers', ttl: 60 }, async () => {
    const { data, error } = await supabase
      .from('league_scorers')
      .select('*')
      .order('rank');
    if (error) { console.error('[leagueData] scorers:', error); return []; }
    return (data ?? []).map((s: any) => ({
      rank: s.rank,
      name: s.name,
      team: s.team,
      goals: s.goals,
      image: s.image ?? undefined,
    }));
  });
}

export async function getSeason() {
  return getCached({ key: 'league_season', ttl: 120 }, async () => {
    const { data } = await supabase
      .from('league_season')
      .select('*, champion:champion_team_id(*)')
      .eq('id', 'current')
      .single();
    return data as {
      id: string;
      name: string;
      status: 'upcoming' | 'active' | 'finished';
      finished_at: string | null;
      champion: Record<string, any> | null;
    } | null;
  });
}

export async function getLeagueData() {
  const [standings, fixture, previousEditions, goalscorers] = await Promise.all([
    getStandings(),
    getFixture(),
    getEditions(),
    getScorers(),
  ]);
  return { standings, fixture, previousEditions, goalscorers };
}
