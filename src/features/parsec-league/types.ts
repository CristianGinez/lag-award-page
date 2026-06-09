export interface LeagueTeam {
  position: number;
  name: string;
  logo?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  gf: number;
  ga: number;
  gd: number;
  form?: string[];
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  time: string;
  status: 'played' | 'scheduled' | 'live';
}

export interface Round {
  name: string;
  matches: Match[];
}

export interface GoalScorer {
  rank: number;
  name: string;
  team: string;
  goals: number;
  image?: string;
}

export interface Edition {
  title: string;
  year: string;
  videoId: string;
  description?: string;
}
