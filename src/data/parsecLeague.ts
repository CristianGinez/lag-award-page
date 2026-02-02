// src/data/parsecLeague.ts

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
  videoId: string; // El ID del video de YouTube (ej: dQw4w9WgXcQ)
  description?: string;
}

export const parsecLeagueData = {
  // --- TABLA DE POSICIONES (Inicializada en 0) ---
  standings: [
    { position: 1, name: 'LAG', logo: 'https://yt3.googleusercontent.com/aDag2YmW8AmgtxcN_jdZMdsiP0q_t3vlKUi_o-0NHXraeIQ4MITmDBzyG2oNBJk_H27LY1MH=s900-c-k-c0x00ffffff-no-rj', played: 2, won: 2, drawn: 0, lost: 0, points: 6, gf: 8, ga: 1, gd: 7, form: ['W', 'W'] },
    { position: 2, name: 'GTALOCO', logo: 'https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/felipe.webp', played: 2, won: 1, drawn: 1, lost: 0, points: 4, gf: 4, ga: 1, gd: 3, form: ['D', 'W'] },
    { position: 3, name: 'Doge', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrsl_jL8niccfssY5I1r3sb8eRepnqlgSODQ&s', played: 2, won: 1, drawn: 1, lost: 0, points: 4, gf: 3, ga: 1, gd: 2, form: ['W', 'D'] },
    { position: 4, name: 'Moonlight', logo: 'https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/user_02.webp', played: 2, won: 1, drawn: 0, lost: 1, points: 3, gf: 3, ga: 2, gd: 1, form: ['L', 'W'] },
    { position: 5, name: 'ElSanto', logo: 'https://cdn.discordapp.com/avatars/482337903343566849/9b27425ea603f3f28c143b5bb3ed7191.webp', played: 2, won: 1, drawn: 0, lost: 1, points: 3, gf: 3, ga: 4, gd: -1, form: ['W', 'L'] },
    { position: 6, name: 'CristianTuVieja', logo: 'https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/ctv.webp', played: 2, won: 1, drawn: 0, lost: 1, points: 3, gf: 2, ga: 3, gd: -1, form: ['W', 'L'] },
    { position: 7, name: 'KZ', logo: 'https://zgfpsqsbthjpejqyuhcx.supabase.co/storage/v1/object/public/tlag/nominados/img/kz.webp', played: 2, won: 0, drawn: 0, lost: 2, points: 0, gf: 1, ga: 4, gd: -3, form: ['L', 'L'] },
    { position: 8, name: 'NotaKboo', logo: 'https://cdn.discordapp.com/avatars/414306483388547072/35faa7199c7cd1eefdba3239af8776b3.webp', played: 2, won: 0, drawn: 0, lost: 2, points: 0, gf: 0, ga: 8, gd: -8, form: ['L', 'L'] },
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
        { id: 'f1-m1', homeTeam: 'NotaKboo', awayTeam: 'GTALOCO', homeScore: '0', awayScore: '3', date: 'Finalizado', time: '20:00', status: 'played' },
        { id: 'f1-m2', homeTeam: 'Moonlight', awayTeam: 'Doge', homeScore: '0', awayScore: '2', date: 'Finalizado', time: '21:00', status: 'played' },
        { id: 'f1-m3', homeTeam: 'LAG', awayTeam: 'ElSanto', homeScore: '3', awayScore: '1', date: 'Finalizado', time: '22:00', status: 'played' },
        { id: 'f1-m4', homeTeam: 'KZ', awayTeam: 'CristianTuVieja', homeScore: '0', awayScore: '2', date: 'Finalizado', time: '23:00', status: 'played' },
      ]
    },
    {
      name: "Fecha 2",
      matches: [
        { id: 'f2-m1', homeTeam: 'GTALOCO', awayTeam: 'Doge', homeScore: '1', awayScore: '1', date: 'Finalizado', time: '20:00', status: 'played' },
        { id: 'f2-m2', homeTeam: 'NotaKboo', awayTeam: 'LAG', homeScore: '0', awayScore: '5', date: 'Finalizado', time: '21:00', status: 'played' },
        { id: 'f2-m3', homeTeam: 'CristianTuVieja', awayTeam: 'Moonlight', homeScore: '0', awayScore: '3', date: 'Finalizado', time: '22:00', status: 'played' },
        { id: 'f2-m4', homeTeam: 'ElSanto', awayTeam: 'KZ', homeScore: '2', awayScore: '1', date: 'Finalizado', time: '23:00', status: 'played' },
      ]
    },
    {
      name: "Fecha 3",
      matches: [
        { id: 'f3-m1', homeTeam: 'LAG', awayTeam: 'GTALOCO', homeScore: null, awayScore: null, date: 'En Vivo', time: '20:00', status: 'live' },
        { id: 'f3-m2', homeTeam: 'Doge', awayTeam: 'CristianTuVieja', homeScore: null, awayScore: null, date: 'Por definir', time: '21:00', status: 'scheduled' },
        { id: 'f3-m3', homeTeam: 'KZ', awayTeam: 'NotaKboo', homeScore: null, awayScore: null, date: 'Por definir', time: '22:00', status: 'scheduled' },
        { id: 'f3-m4', homeTeam: 'Moonlight', awayTeam: 'ElSanto', homeScore: '0', awayScore: '3', date: 'Por definir', time: '23:00', status: 'scheduled' },
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
  goalscorers: [
    { rank: 1, name: 'LAG', team: 'LAG', goals: 8 },
    { rank: 2, name: 'GTALOCO', team: 'GTALOCO', goals: 4 },
    { rank: 3, name: 'Doge', team: 'Doge', goals: 3 },
    { rank: 4, name: 'ElSanto', team: 'ElSanto', goals: 3 },
    { rank: 5, name: 'Moonlight', team: 'Moonlight', goals: 3 },
    { rank: 6, name: 'CristianTuVieja', team: 'CristianTuVieja', goals: 2 },
    { rank: 7, name: 'KZ', team: 'KZ', goals: 1 },
    { rank: 8, name: 'NotaKboo', team: 'NotaKboo', goals: 0 },
  ] as GoalScorer[]
};