import { Redis } from '@upstash/redis';

// Falla silenciosamente en dev si no hay variables configuradas
export const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL ?? '',
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN ?? '',
});
