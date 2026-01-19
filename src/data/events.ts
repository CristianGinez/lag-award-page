// src/data/events.ts

export interface EventData {
  id: string;
  slug: string;
  title: string;
  year: string;
  status: 'active' | 'finished' | 'upcoming';
  type: 'awards' | 'league'; // <--- NUEVO CAMPO
  banner: string;
  logo?: string;
  description: string;
}

export const events: EventData[] = [
  {
    id: 'lag2025',
    slug: 'LagAwards2025',
    title: 'LAG AWARDS',
    year: '2025',
    status: 'finished',
    type: 'awards', // Es de premios
    banner: '/img/banner-actualizacion.jpg', 
    logo: 'https://res.cloudinary.com/dkjaq3i9p/image/upload/v1768411742/LOGO_LAGAWARDS_xen8va.png',
    description: 'El evento más grande de la comunidad. Vota por tus creadores favoritos.',
  },
  {
    id: 'parsec-league',
    slug: 'ParsecLeague',
    title: 'PARSEC LEAGUE',
    year: '2026',
    status: 'upcoming',
    type: 'league', // Es de liga/fútbol
    banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2693&auto=format&fit=crop', // Banner de fútbol (Placeholder)
    logo: '/img/tl_logo.png', // Puedes cambiar esto por un balón o logo de la liga
    description: 'La liga de fútbol parsecqueada. Inscríbete, demuestra tu nivel y sé seleccionado para el mambo.',
  },
];

export const getEventBySlug = (slug: string) => {
  return events.find(e => e.slug === slug);
};