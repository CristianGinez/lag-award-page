// Define la estructura de un evento
export interface EventData {
  id: string;        // ID interno (ej: 'lag-awards-2025')
  slug: string;      // URL amigable (ej: 'LagAwards2025')
  title: string;     // Título visible
  year: string;
  status: 'active' | 'finished' | 'upcoming';
  banner: string;    // Imagen de fondo para la card
  description: string;
}

// Lista maestra de eventos
export const events: EventData[] = [
  {
    id: 'lag2025',
    slug: 'LagAwards2025',
    title: 'LAG AWARDS 2025',
    year: '2025',
    status: 'active',
    banner: '/img/banner-actualizacion.jpg', 
    description: 'El evento más grande de la comunidad. Vota por tus creadores favoritos.',
  },
  // Aquí podrás agregar { id: 'lag2024', slug: 'LagAwards2024', ... } en el futuro
];

export const getEventBySlug = (slug: string) => {
  return events.find(e => e.slug === slug);
};