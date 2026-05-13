import type { APIRoute } from 'astro';
import { ImageResponse } from '@vercel/og';
import { loadOrbitronFont } from '../../shared/lib/ogFonts';

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() ?? 'https://www.tlag.online';
  const fontData = await loadOrbitronFont(siteUrl);

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #dc2626 0%, #050505 50%, #9333ea 100%)',
          fontFamily: 'Orbitron',
          color: 'white',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { fontSize: 40, fontWeight: 400, opacity: 0.6, letterSpacing: '0.3em', marginBottom: 16 },
              children: 'LA COMUNIDAD OFICIAL DE',
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 120, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 },
              children: 'TeamLag',
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 32, opacity: 0.6, marginTop: 24, letterSpacing: '0.2em' },
              children: 'LAGartovich · LAG Awards · Parsec League',
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
