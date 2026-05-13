import { redis } from './redis';

type CacheOptions = {
  ttl?: number; // segundos
  key: string;
};

export async function getCached<T>(
  options: CacheOptions,
  fetcher: () => Promise<T>
): Promise<T> {
  const { key, ttl = 60 } = options;

  try {
    const cached = await redis.get<T>(key);
    if (cached !== null) return cached;
  } catch (err) {
    console.warn(`KV get failed for ${key}:`, err);
  }

  const fresh = await fetcher();

  try {
    await redis.set(key, fresh, { ex: ttl });
  } catch (err) {
    console.warn(`KV set failed for ${key}:`, err);
  }

  return fresh;
}

export async function invalidateCache(key: string) {
  try {
    await redis.del(key);
  } catch (err) {
    console.warn(`KV del failed for ${key}:`, err);
  }
}
