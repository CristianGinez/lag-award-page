import type { Rarity } from '../types';

export const RARITY_STYLES: Record<Rarity, {
  label: string;
  gradient: string;
  text: string;
  glow: string;
  border: string;
}> = {
  common:    { label: 'Común',      gradient: 'from-gray-500/30 to-gray-600/5',     text: 'text-gray-300',   glow: 'shadow-[0_0_20px_rgba(156,163,175,0.15)]',  border: 'border-gray-500/30' },
  rare:      { label: 'Raro',       gradient: 'from-blue-500/30 to-blue-600/5',     text: 'text-blue-300',   glow: 'shadow-[0_0_25px_rgba(59,130,246,0.25)]',   border: 'border-blue-500/30' },
  epic:      { label: 'Épico',      gradient: 'from-purple-500/30 to-purple-600/5', text: 'text-purple-300', glow: 'shadow-[0_0_30px_rgba(168,85,247,0.35)]',   border: 'border-purple-500/30' },
  legendary: { label: 'Legendario', gradient: 'from-amber-400/40 to-orange-600/5',  text: 'text-amber-300',  glow: 'shadow-[0_0_40px_rgba(251,191,36,0.45)]',   border: 'border-amber-400/40' },
};

export function rarityHint(pct: number): string {
  if (pct === 0) return 'Nadie lo tiene todavía';
  if (pct < 5)  return `Solo el ${pct}% lo tiene · ultra raro`;
  if (pct < 20) return `${pct}% de la comunidad lo tiene`;
  if (pct < 50) return `${pct}% de la comunidad lo tiene`;
  return `${pct}% de la comunidad lo tiene · común`;
}
