import React, { useRef, useState, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  image?: string; 
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, image, autoPlay = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay prevent", e));
    }
  }, [src, autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full h-full flex flex-col relative group">
      {/* Contenedor cuadrado con la imagen */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden border-4 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-black">
        <img 
          src={image || "/img/lag_uconstr_placeholder.png"} 
          alt="Audio Artwork" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Play Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors z-20">
          <button 
            onClick={togglePlay}
            className="cursor-pointer bg-white/90 hover:bg-white text-purple-600 rounded-full p-6 w-24 h-24 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-transform hover:scale-110 active:scale-95"
          >
             {isPlaying ? (
               <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
             ) : (
               <svg className="w-12 h-12 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
             )}
          </button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={src} 
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Controles de volumen externos (como en tu diseño original debajo de la imagen) */}
      <div className="mt-6 flex bg-purple-900/30 p-4 rounded-lg border border-purple-500/20 items-center gap-4">
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
        </svg>
        <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (audioRef.current) audioRef.current.volume = val;
            }}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>
    </div>
  );
};