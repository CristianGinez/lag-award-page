import { optimizeUrl, srcset } from '../lib/imageOptimizer';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  responsive?: number[];
  priority?: boolean;
  className?: string;
}

export function TlagImage({
  src,
  alt,
  width = 800,
  height,
  responsive,
  priority = false,
  className = '',
}: Props) {
  const optimized = optimizeUrl(src, { width, height });
  const srcsetValue = responsive ? srcset(src, responsive) : undefined;

  return (
    <img
      src={optimized}
      srcSet={srcsetValue}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/img/lag_uconstr_placeholder.png';
      }}
    />
  );
}
