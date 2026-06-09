import { useState, useEffect } from 'react';
import type { BadgeProgress } from '../types';
import { RARITY_STYLES } from '../lib/rarity';

const DISMISS_AFTER_MS = 6000;

export function UnlockToast() {
  const [queue, setQueue] = useState<BadgeProgress[]>([]);
  const [current, setCurrent] = useState<BadgeProgress | null>(null);
  const [visible, setVisible] = useState(false);

  // Listen for achievement:unlocked events dispatched globally
  useEffect(() => {
    const handler = (e: Event) => {
      const badge = (e as CustomEvent<BadgeProgress>).detail;
      if (!badge) return;
      // Skip if already shown this session
      const shownKey = `achievement_shown_${badge.slug}`;
      if (sessionStorage.getItem(shownKey)) return;
      sessionStorage.setItem(shownKey, '1');
      setQueue((q) => [...q, badge]);
    };
    window.addEventListener('achievement:unlocked', handler);
    return () => window.removeEventListener('achievement:unlocked', handler);
  }, []);

  // Dequeue one at a time
  useEffect(() => {
    if (current || queue.length === 0) return;
    const [next, ...rest] = queue;
    setQueue(rest);
    setCurrent(next);
    setVisible(true);

    // Confetti for legendary
    if (next.rarity === 'legendary') {
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.85 }, colors: ['#f59e0b', '#fbbf24', '#fcd34d'] });
      });
    }

    const timer = setTimeout(() => setVisible(false), DISMISS_AFTER_MS);
    return () => clearTimeout(timer);
  }, [queue, current]);

  // After fade-out, clear current so next can show
  const handleTransitionEnd = () => {
    if (!visible) setCurrent(null);
  };

  if (!current) return null;

  const r = RARITY_STYLES[current.rarity];

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={`fixed bottom-6 right-6 z-50 max-w-xs w-full transition-all duration-500
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      <div className={`flex items-start gap-3 p-4 rounded-2xl border ${r.border} bg-[#0d0d0d] ${r.glow} backdrop-blur-sm`}>
        <div className="text-4xl leading-none shrink-0">{current.icon ?? '🏅'}</div>
        <div className="min-w-0">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${r.text} font-mono`}>
            🏆 Logro desbloqueado
          </p>
          <p className="text-white font-bold font-orbitron text-sm mt-0.5 leading-tight">{current.name}</p>
          <p className="text-gray-400 text-xs mt-1 line-clamp-1">{current.description}</p>
          <p className={`text-[10px] font-bold mt-1 ${r.text}`}>{r.label}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 text-gray-600 hover:text-white transition-colors text-lg leading-none mt-0.5 cursor-pointer"
          aria-label="Cerrar"
        >×</button>
      </div>
    </div>
  );
}
