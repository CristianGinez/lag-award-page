import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Kill all ScrollTriggers before View Transitions swaps the DOM to prevent
// orphaned triggers from previous pages firing on new page elements.
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});

export { gsap, ScrollTrigger };
