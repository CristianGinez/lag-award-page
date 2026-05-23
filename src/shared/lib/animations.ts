import { gsap, ScrollTrigger } from './gsap';

export { gsap, ScrollTrigger };

/** Fade-in + slide-up con stagger, disparado por ScrollTrigger. */
export function staggerReveal(
  targets: string,
  trigger: string | Element,
  options: { stagger?: number; y?: number; duration?: number; start?: string } = {},
) {
  const { stagger = 0.08, y = 28, duration = 0.6, start = 'top 88%' } = options;
  gsap.from(targets, {
    opacity: 0,
    y,
    stagger,
    duration,
    ease: 'power2.out',
    scrollTrigger: { trigger, start },
  });
}

/** Fade-in + slide-up simple (sin ScrollTrigger). */
export function fadeInUp(
  target: string | Element,
  options: { delay?: number; duration?: number; y?: number } = {},
) {
  const { delay = 0, duration = 0.6, y = 28 } = options;
  gsap.from(target, { opacity: 0, y, duration, delay, ease: 'power3.out' });
}

/** Timeline secuencial para heroes: recibe array de selectores en orden. */
export function heroTimeline(
  steps: { target: string; duration?: number; offset?: string }[],
) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  steps.forEach(({ target, duration = 0.6, offset = '-=0.35' }, i) => {
    tl.from(target, { opacity: 0, y: 28, duration }, i === 0 ? undefined : offset);
  });
  return tl;
}
