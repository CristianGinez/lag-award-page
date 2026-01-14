// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      // En lugar de true, usamos una lista con el dominio
      allowedHosts: ['.tunnelmole.net'],
    },
  },

  adapter: vercel(),
  output: 'server',
  integrations: [react()],
});