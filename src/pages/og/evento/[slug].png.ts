import type { APIRoute } from 'astro';
import { ImageResponse } from '@vercel/og';
import { getEventBySlug } from '../../../shared/lib/events';
import { loadOrbitronFont } from '../../../shared/lib/ogFonts';

export const prerender = false;

export const GET: APIRoute = async ({ params, site }) => {
  const event = getEventBySlug(params.slug);
  if (!event) return new Response('Not found', { status: 404 });

  const siteUrl = site?.toString() ?? 'https://www.tlag.online';
  const fontData = await loadOrbitronFont(siteUrl);

  const statusLabel = event.status === 'active' ? 'EN CURSO' : event.status === 'upcoming' ? 'PRÓXIMAMENTE' : 'FINALIZADO';

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #050505 0%, #0d0d2b 100%)',
          fontFamily: 'Orbitron',
          color: 'white',
          gap: '24px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: 20,
                letterSpacing: '0.4em',
                opacity: 0.5,
              },
              children: 'TEAMLAG · ' + statusLabel,
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' },
              children: event.title,
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 28, opacity: 0.6, maxWidth: '900px' },
              children: event.description,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 22,
                opacity: 0.4,
                marginTop: '16px',
                letterSpacing: '0.2em',
              },
              children: String(event.year) + ' · tlag.online',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Orbitron', data: fontData, style: 'normal', weight: 900 }],
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  );
};
