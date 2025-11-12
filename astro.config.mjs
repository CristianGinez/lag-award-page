// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      // En lugar de true, usamos una lista con el dominio
      allowedHosts: ['.tunnelmole.net'],
    },
  },
});