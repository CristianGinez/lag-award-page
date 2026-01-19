// src/data/parsecLeague.ts

export interface LeagueTeam {
  position: number;
  name: string;
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
  videoId: string; // El ID del video de YouTube (ej: dQw4w9WgXcQ)
  description?: string;
}

export const parsecLeagueData = {
  // --- TABLA DE POSICIONES (Inicializada en 0) ---
  standings: [
    { position: 1, name: 'CristianTuVieja', played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0, gd: 0, form: [] },
    { position: 2, name: 'Doge',            played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0, gd: 0, form: [] },
    { position: 3, name: 'ElSanto',         played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0, gd: 0, form: [] },
    { position: 4, name: 'GTALOCO',         played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0, gd: 0, form: [] },
    { position: 5, name: 'KZ',              played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0, gd: 0, form: [] },
    { position: 6, name: 'LAG',             played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0, gd: 0, form: [] },
    { position: 7, name: 'Moonlight',       played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0, gd: 0, form: [] },
    { position: 8, name: 'NotaKboo',        played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0, gd: 0, form: [] },
  ] as LeagueTeam[],

  previousEditions: [
    { 
      title: "Parsec League TL - T1", 
      year: "2023", 
      videoId: "_KPmGEvj0k8", // Reemplazar con ID real
      description: "Un torneo de FIFA22 con los muchachos, con reglas nuevas y grandes partidos. Disfruten de como jornada a jornada el rigor irá aumentando y vean atajadas, patadas, erradas y muchos GOOOOLES!!!" 
    },
    { 
      title: "Parsec League TL - T2", 
      year: "2023", 
      videoId: "TELc5zxyLI4", 
      description: "Los mejores momentos del torneo corto." 
    },
    
  ] as Edition[]
,
  // --- FIXTURE COMPLETO (7 FECHAS) ---
  fixture: [
    {
      name: "Fecha 1",
      matches: [
        { id: 'f1-m1', homeTeam: 'NotaKboo', awayTeam: 'GTALOCO', homeScore: null, awayScore: null, date: 'Por definir', time: '20:00', status: 'scheduled' },
        { id: 'f1-m2', homeTeam: 'Moonlight', awayTeam: 'Doge', homeScore: null, awayScore: null, date: 'Por definir', time: '21:00', status: 'scheduled' },
        { id: 'f1-m3', homeTeam: 'LAG', awayTeam: 'ElSanto', homeScore: null, awayScore: null, date: 'Por definir', time: '22:00', status: 'scheduled' },
        { id: 'f1-m4', homeTeam: 'KZ', awayTeam: 'CristianTuVieja', homeScore: null, awayScore: null, date: 'Por definir', time: '23:00', status: 'scheduled' },
      ]
    },
    {
      name: "Fecha 2",
      matches: [
        { id: 'f2-m1', homeTeam: 'GTALOCO', awayTeam: 'Doge', homeScore: null, awayScore: null, date: 'Por definir', time: '20:00', status: 'scheduled' },
        { id: 'f2-m2', homeTeam: 'NotaKboo', awayTeam: 'LAG', homeScore: null, awayScore: null, date: 'Por definir', time: '21:00', status: 'scheduled' },
        { id: 'f2-m3', homeTeam: 'CristianTuVieja', awayTeam: 'Moonlight', homeScore: null, awayScore: null, date: 'Por definir', time: '22:00', status: 'scheduled' },
        { id: 'f2-m4', homeTeam: 'ElSanto', awayTeam: 'KZ', homeScore: null, awayScore: null, date: 'Por definir', time: '23:00', status: 'scheduled' },
      ]
    },
    {
      name: "Fecha 3",
      matches: [
        { id: 'f3-m1', homeTeam: 'LAG', awayTeam: 'GTALOCO', homeScore: null, awayScore: null, date: 'Por definir', time: '20:00', status: 'scheduled' },
        { id: 'f3-m2', homeTeam: 'Doge', awayTeam: 'CristianTuVieja', homeScore: null, awayScore: null, date: 'Por definir', time: '21:00', status: 'scheduled' },
        { id: 'f3-m3', homeTeam: 'KZ', awayTeam: 'NotaKboo', homeScore: null, awayScore: null, date: 'Por definir', time: '22:00', status: 'scheduled' },
        { id: 'f3-m4', homeTeam: 'Moonlight', awayTeam: 'ElSanto', homeScore: null, awayScore: null, date: 'Por definir', time: '23:00', status: 'scheduled' },
      ]
    },
    {
      name: "Fecha 4",
      matches: [
        { id: 'f4-m1', homeTeam: 'GTALOCO', awayTeam: 'CristianTuVieja', homeScore: null, awayScore: null, date: 'Por definir', time: '20:00', status: 'scheduled' },
        { id: 'f4-m2', homeTeam: 'LAG', awayTeam: 'KZ', homeScore: null, awayScore: null, date: 'Por definir', time: '21:00', status: 'scheduled' },
        { id: 'f4-m3', homeTeam: 'ElSanto', awayTeam: 'Doge', homeScore: null, awayScore: null, date: 'Por definir', time: '22:00', status: 'scheduled' },
        { id: 'f4-m4', homeTeam: 'NotaKboo', awayTeam: 'Moonlight', homeScore: null, awayScore: null, date: 'Por definir', time: '23:00', status: 'scheduled' },
      ]
    },
    {
      name: "Fecha 5",
      matches: [
        { id: 'f5-m1', homeTeam: 'KZ', awayTeam: 'GTALOCO', homeScore: null, awayScore: null, date: 'Por definir', time: '20:00', status: 'scheduled' },
        { id: 'f5-m2', homeTeam: 'CristianTuVieja', awayTeam: 'ElSanto', homeScore: null, awayScore: null, date: 'Por definir', time: '21:00', status: 'scheduled' },
        { id: 'f5-m3', homeTeam: 'Moonlight', awayTeam: 'LAG', homeScore: null, awayScore: null, date: 'Por definir', time: '22:00', status: 'scheduled' },
        { id: 'f5-m4', homeTeam: 'Doge', awayTeam: 'NotaKboo', homeScore: null, awayScore: null, date: 'Por definir', time: '23:00', status: 'scheduled' },
      ]
    },
    {
      name: "Fecha 6",
      matches: [
        { id: 'f6-m1', homeTeam: 'GTALOCO', awayTeam: 'ElSanto', homeScore: null, awayScore: null, date: 'Por definir', time: '20:00', status: 'scheduled' },
        { id: 'f6-m2', homeTeam: 'KZ', awayTeam: 'Moonlight', homeScore: null, awayScore: null, date: 'Por definir', time: '21:00', status: 'scheduled' },
        { id: 'f6-m3', homeTeam: 'NotaKboo', awayTeam: 'CristianTuVieja', homeScore: null, awayScore: null, date: 'Por definir', time: '22:00', status: 'scheduled' },
        { id: 'f6-m4', homeTeam: 'LAG', awayTeam: 'Doge', homeScore: null, awayScore: null, date: 'Por definir', time: '23:00', status: 'scheduled' },
      ]
    },
    {
      name: "Fecha 7",
      matches: [
        { id: 'f7-m1', homeTeam: 'Moonlight', awayTeam: 'GTALOCO', homeScore: null, awayScore: null, date: 'Por definir', time: '20:00', status: 'scheduled' },
        { id: 'f7-m2', homeTeam: 'ElSanto', awayTeam: 'NotaKboo', homeScore: null, awayScore: null, date: 'Por definir', time: '21:00', status: 'scheduled' },
        { id: 'f7-m3', homeTeam: 'Doge', awayTeam: 'KZ', homeScore: null, awayScore: null, date: 'Por definir', time: '22:00', status: 'scheduled' },
        { id: 'f7-m4', homeTeam: 'CristianTuVieja', awayTeam: 'LAG', homeScore: null, awayScore: null, date: 'Por definir', time: '23:00', status: 'scheduled' },
      ]
    }
  ] as Round[],

  // --- GOLEADORES (Vacío por ahora) ---
  goalscorers: [] as GoalScorer[]
};