import React from 'react';
import { useStore } from '@nanostores/react';
import { $playerState } from '../../stores/playerStore';
import { VideoPlayer } from './VideoPlayer';
import { AudioPlayer } from './AudioPlayer';

export const MediaDisplay = () => {
  const state = useStore($playerState);

  if (state.type === 'none') {
    return null; // O un placeholder
  }

  if (state.type === 'video') {
    return (
      <div className="relative rounded-xl overflow-hidden border-4 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-black transition-all duration-300">
         <VideoPlayer src={state.src} poster={state.poster} autoPlay={true} />
      </div>
    );
  }

  if (state.type === 'audio') {
    return <AudioPlayer src={state.src} image={state.poster} autoPlay={true} />;
  }

  if (state.type === 'youtube') {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden border-4 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-black">
        <iframe
            className="w-full h-full absolute inset-0 z-20"
            src={`https://www.youtube.com/embed/${state.youtubeId}?autoplay=1&rel=0&modestbranding=1&loop=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Fallback para imágenes estáticas (Categorías de arte)
  return (
    <div className="relative aspect-square rounded-xl overflow-hidden border-4 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-black group">
        <img 
            src={state.poster || "/img/lag_uconstr_placeholder.png"} 
            alt="Detalle" 
            className="w-full h-full object-contain cursor-zoom-in"
            // Aquí podrías reintegrar la lógica del lightbox si lo deseas, 
            // o simplemente usar una librería de React lightbox
        />
    </div>
  );
};