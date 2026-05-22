export type VipLinkPlatform =
  | 'youtube' | 'twitch' | 'steam' | 'instagram' | 'tiktok'
  | 'twitter' | 'kick' | 'spotify' | 'discord' | 'custom';

export interface VipLink {
  id: string;
  platform: VipLinkPlatform;
  url: string;
  label: string | null;
  display_order: number;
}

export interface Vip {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  role: string;
  origin: string | null;
  bio: string | null;
  favorite_games: string[];
  music: string | null;
  color: string;
  color_name: string | null;
  avatar: string | null;
  youtube_channel_id: string | null;
  user_id: string | null;
  discord_id: string | null;
  display_order: number;
  links: VipLink[];
}
