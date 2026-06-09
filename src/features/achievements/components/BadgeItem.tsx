import { useRef } from 'react';
import type { BadgeProgress } from '../types';
import { RARITY_STYLES } from '../lib/rarity';

const TOOLTIP_W = 224;
const GAP = 12;

export function BadgeItem({ badge }: { badge: BadgeProgress }) {
  const r = RARITY_STYLES[badge.rarity];
  const u = badge.ui;
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (!ref.current || !tooltipRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const el = tooltipRef.current;
    const elH = el.offsetHeight || 140;
    const vw = window.innerWidth;

    const top = rect.top - elH - GAP > 0
      ? rect.top - elH - GAP
      : rect.bottom + GAP;

    let left = rect.left + rect.width / 2 - TOOLTIP_W / 2;
    left = Math.max(8, Math.min(left, vw - TOOLTIP_W - 8));

    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.opacity = '1';
  };

  const hideTooltip = () => {
    if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
  };

  const borderColor = u?.borderColor ?? 'rgba(255,255,255,0.12)';

  return (
    <div ref={ref} className="relative" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>

      {/* Tooltip — fixed, calcula posición en JS */}
      <div
        ref={tooltipRef}
        style={{ position: 'fixed', width: TOOLTIP_W, zIndex: 9999, opacity: 0, pointerEvents: 'none', transition: 'opacity 0.15s' }}
      >
        <div className="rounded-xl border bg-[#1a1a1a] p-3 shadow-2xl relative overflow-hidden"
          style={{ borderColor, boxShadow: u?.glow ? `${u.glow}, 0 20px 40px rgba(0,0,0,0.7)` : '0 20px 40px rgba(0,0,0,0.7)' }}
        >
          {u?.shimmerColor && (
            <span className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${u.shimmerColor}, transparent)` }}
            />
          )}
          <div className="flex items-center gap-2.5 mb-2">
            {badge.image
              ? <img src={badge.image} alt={badge.name} className="w-10 h-10 rounded-lg object-contain shrink-0"
                  style={{ filter: u?.imgGlow ? `drop-shadow(0 0 5px ${u.imgGlow})` : undefined }} />
              : <span className="text-2xl shrink-0">{badge.icon ?? '🏅'}</span>
            }
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: u?.labelColor }}>{u?.label ?? r.label}</p>
              <p className="text-sm font-bold text-white font-orbitron leading-tight">{badge.name}</p>
            </div>
          </div>
          {badge.description && (
            <p className="text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-2">{badge.description}</p>
          )}
          {badge.unlocked_at && (
            <p className="text-[10px] text-gray-600 mt-2 font-mono">
              Desbloqueado el {new Date(badge.unlocked_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>

      {/* Badge */}
      {u ? (
        <a
          href="/logros"
          className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all hover:scale-105 overflow-hidden w-[185px]"
          style={{ borderColor: u.borderColor, background: u.background, boxShadow: u.glow }}
          onMouseEnter={(e) => { if (u.hoverBorderColor) e.currentTarget.style.borderColor = u.hoverBorderColor; }}
          onMouseLeave={(e) => { if (u.hoverBorderColor) e.currentTarget.style.borderColor = u.borderColor ?? ''; }}
        >
          {u.pulse && <span className="absolute inset-0 rounded-xl animate-pulse pointer-events-none" style={{ background: u.pulseColor ?? u.borderColor, opacity: 0.2 }} />}
          {u.shimmerColor && <span className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${u.shimmerColor}, transparent)` }} />}
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            {badge.image
              ? <img src={badge.image} alt={badge.name} className="w-full h-full rounded-lg object-contain"
                  style={{ filter: u.imgGlow ? `drop-shadow(0 0 6px ${u.imgGlow})` : undefined }} />
              : <span className="text-2xl leading-none">{badge.icon ?? '🏅'}</span>
            }
          </div>
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-widest leading-none font-mono" style={{ color: u.labelColor }}>{u.label ?? r.label}</p>
            <p className="text-xs text-white font-orbitron leading-tight mt-0.5">{badge.name}</p>
          </div>
        </a>
      ) : (
        <a
          href="/logros"
          className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border ${r.border} bg-gradient-to-br ${r.gradient} ${r.glow} transition-all hover:scale-105 w-[185px]`}
        >
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            {badge.image
              ? <img src={badge.image} alt={badge.name} className="w-full h-full rounded object-contain" />
              : <span className="text-xl leading-none">{badge.icon ?? '🏅'}</span>
            }
          </div>
          <div>
            <p className={`text-[10px] font-bold ${r.text} uppercase tracking-wider leading-none`}>{r.label}</p>
            <p className="text-xs text-white font-orbitron leading-tight mt-0.5">{badge.name}</p>
          </div>
        </a>
      )}
    </div>
  );
}
