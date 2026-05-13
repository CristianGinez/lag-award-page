type CDN = 'cloudinary' | 'supabase' | 'youtube' | 'discord' | 'google' | 'imagekit' | 'unknown';

function detectCDN(url: string): CDN {
  if (url.includes('cloudinary.com')) return 'cloudinary';
  if (url.includes('supabase.co/storage')) return 'supabase';
  if (url.includes('ytimg.com') || url.includes('img.youtube.com')) return 'youtube';
  if (url.includes('discordapp.com') || url.includes('discordapp.net')) return 'discord';
  if (url.includes('googleusercontent.com') || url.includes('gstatic.com')) return 'google';
  if (url.includes('imagekit.io')) return 'imagekit';
  return 'unknown';
}

export type OptimizeOptions = {
  width?: number;
  height?: number;
  format?: 'auto' | 'webp' | 'avif';
  quality?: 'auto' | number;
};

export function optimizeUrl(url: string, options: OptimizeOptions = {}): string {
  if (!url) return '/img/lag_uconstr_placeholder.png';

  const { width, height, format = 'auto', quality = 'auto' } = options;
  const cdn = detectCDN(url);

  switch (cdn) {
    case 'cloudinary': {
      const params: string[] = [];
      if (width) params.push(`w_${width}`);
      if (height) params.push(`h_${height}`);
      params.push(`f_${format}`);
      params.push(`q_${quality}`);
      return url.replace('/upload/', `/upload/${params.join(',')}/`);
    }

    case 'imagekit': {
      const transforms: string[] = [];
      if (width) transforms.push(`w-${width}`);
      if (height) transforms.push(`h-${height}`);
      transforms.push(`q-${quality === 'auto' ? 80 : quality}`);
      transforms.push('f-auto');
      const sep = url.includes('?') ? '&' : '?';
      return `${url}${sep}tr=${transforms.join(',')}`;
    }

    case 'supabase': {
      const u = new URL(url);
      if (width) u.searchParams.set('width', String(width));
      if (height) u.searchParams.set('height', String(height));
      if (quality !== 'auto') u.searchParams.set('quality', String(quality));
      return u.toString();
    }

    case 'youtube': {
      if (!width) return url;
      if (width <= 120) return url.replace(/\/[a-z]+default\./, '/default.');
      if (width <= 320) return url.replace(/\/[a-z]+default\./, '/mqdefault.');
      if (width <= 480) return url.replace(/\/[a-z]+default\./, '/hqdefault.');
      if (width <= 640) return url.replace(/\/[a-z]+default\./, '/sddefault.');
      return url.replace(/\/[a-z]+default\./, '/maxresdefault.');
    }

    case 'discord': {
      const u = new URL(url);
      if (width) u.searchParams.set('size', String(Math.min(4096, width)));
      return u.toString();
    }

    default:
      return url;
  }
}

export function srcset(url: string, widths: number[]): string {
  return widths
    .map(w => `${optimizeUrl(url, { width: w })} ${w}w`)
    .join(', ');
}
