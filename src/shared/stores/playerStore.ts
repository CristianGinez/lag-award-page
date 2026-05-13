import { atom } from 'nanostores';

export type MediaType = 'video' | 'audio' | 'youtube' | 'image' | 'none';

export interface PlayerState {
  type: MediaType;
  src: string; // URL del video o audio
  poster?: string; // Imagen de fondo/miniatura
  youtubeId?: string;
  autoPlay?: boolean;
}

export const $playerState = atom<PlayerState>({
  type: 'none',
  src: '',
  poster: '',
  autoPlay: false
});

// Helper para resetear
export const stopMedia = () => {
  $playerState.set({ type: 'none', src: '', poster: '' });
};

// Helper para reproducir
export const playMedia = (state: PlayerState) => {
  $playerState.set(state);
};