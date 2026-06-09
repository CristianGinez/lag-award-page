import type { BadgeProgress } from '../types';
import { RARITY_STYLES, rarityHint } from '../lib/rarity';

export function BadgeCard({ badge }: { badge: BadgeProgress }) {
  const r = RARITY_STYLES[badge.rarity];
  const u = badge.ui;
  const locked = !badge.unlocked;
  const hidden = badge.is_secret && locked;

  // Custom ui styles from DB (only when unlocked)
  const customStyle = u && !locked ? {
    borderColor: u.borderColor,
    background: u.background,
    boxShadow: u.glow,
  } : undefined;

  const labelColor = u && !locked ? u.labelColor : undefined;
  const imgGlow = u && !locked ? u.imgGlow : undefined;

  return (
    <div
      className={`relative p-5 rounded-2xl border transition-all hover:scale-[1.03] cursor-default overflow-hidden
        ${locked
          ? `border-white/5 opacity-60 bg-gradient-to-br ${r.gradient}`
          : u ? '' : `${r.border} ${r.glow} bg-gradient-to-br ${r.gradient}`
        }`}
      style={customStyle}
    >
      {/* Shimmer top line */}
      {u?.shimmerColor && !locked && (
        <span className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${u.shimmerColor}, transparent)` }} />
      )}
      {/* Pulse overlay */}
      {u?.pulse && !locked && (
        <span className="absolute inset-0 rounded-2xl animate-pulse pointer-events-none"
          style={{ background: u.pulseColor ?? u.borderColor, opacity: 0.1 }} />
      )}

      {/* Imagen o icono */}
      <div className={`w-12 h-12 mb-3 flex items-center justify-center shrink-0 ${locked ? 'grayscale opacity-40' : ''}`}>
        {hidden ? (
          <span className="text-3xl leading-none">❓</span>
        ) : badge.image ? (
          <img
            src={badge.image}
            alt={badge.name}
            className="w-full h-full rounded-lg object-contain"
            style={{ filter: imgGlow ? `drop-shadow(0 0 7px ${imgGlow})` : undefined }}
          />
        ) : (
          <span className="text-3xl leading-none">{badge.icon ?? '🏅'}</span>
        )}
      </div>

      {/* Rareza */}
      <span
        className={`text-[10px] font-bold uppercase tracking-widest font-mono ${locked ? 'text-gray-600' : u ? '' : r.text}`}
        style={labelColor ? { color: labelColor } : undefined}
      >
        {u?.label ?? r.label}
      </span>

      {/* Nombre */}
      <h3 className="font-bold font-orbitron text-white text-sm mt-1 leading-tight">
        {hidden ? 'Logro secreto' : badge.name}
      </h3>

      {/* Descripción / criteria */}
      <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">
        {hidden
          ? 'Seguí explorando para descubrirlo.'
          : locked
          ? (badge.criteria ?? badge.description)
          : badge.description}
      </p>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] gap-2">
        <span className="text-gray-500 truncate">{rarityHint(badge.rarity_pct)}</span>
        {badge.unlocked && badge.unlocked_at && (
          <span className="text-gray-500 shrink-0">
            {new Date(badge.unlocked_at).toLocaleDateString('es-AR')}
          </span>
        )}
      </div>

      {/* Check desbloqueado */}
      {badge.unlocked && (
        <span className="absolute top-3 right-3 text-green-400 text-base">✓</span>
      )}
    </div>
  );
}
