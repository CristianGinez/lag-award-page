import type { APIRoute } from 'astro';
import { ImageResponse } from '@vercel/og';
import categories from '../../../features/awards/data/categories';
import { loadOrbitronFont } from '../../../shared/lib/ogFonts';

export const prerender = false;

export const GET: APIRoute = async ({ params, site }) => {
  const category = categories.find(c => String(c.id) === params.id);
  if (!category) return new Response('Not found', { status: 404 });

  const siteUrl = site?.toString() ?? 'https://www.tlag.online';
  const fontData = await loadOrbitronFont(siteUrl);

  const nominees = category.nominees.slice(0, 5);

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 100%)',
          padding: '60px',
          fontFamily: 'Orbitron',
          color: 'white',
          gap: '40px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: '16px' },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: 22, opacity: 0.5, letterSpacing: '0.3em' },
                          children: 'LAG AWARDS 2025',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: 72, fontWeight: 900, lineHeight: 1 },
                          children: category.title,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: 26, opacity: 0.65, maxWidth: '700px' },
                          children: category.description,
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
                    children: nominees.map((n: any) => ({
                      type: 'div',
                      props: {
                        style: {
                          padding: '10px 20px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '999px',
                          fontSize: 20,
                          border: '1px solid rgba(255,255,255,0.2)',
                        },
                        children: n.name,
                      },
                    })),
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '260px',
                flexShrink: 0,
              },
              children: category.icon,
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
