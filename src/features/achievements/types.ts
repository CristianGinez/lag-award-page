export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface BadgeProgress {
  id: string;
  slug: string;
  name: string;
  description: string;
  criteria: string | null;
  icon: string | null;
  image: string | null;
  rarity: Rarity;
  color: string;
  is_secret: boolean;
  display_order: number;
  unlocked: boolean;
  unlocked_at: string | null;
  owners_count: number;
  total_users: number;
  rarity_pct: number;
  ui: {
    borderColor?: string;
    background?: string;
    glow?: string;
    pulse?: boolean;
    pulseColor?: string;
    hoverBorderColor?: string;
    shimmerColor?: string;
    label?: string;
    labelColor?: string;
    imgGlow?: string;
  } | null;
}
