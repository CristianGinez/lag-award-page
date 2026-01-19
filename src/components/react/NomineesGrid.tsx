import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $selectedCategory, selectNominee } from '../../stores/uiStore';
import { getUserVotes } from '../../lib/voting';
import { $currentUser } from '../../stores/authStore';

export const NomineesGrid = () => {
  const category = useStore($selectedCategory);
  const user = useStore($currentUser);
  const [userVote, setUserVote] = useState<string | null>(null);

  // Cargar voto del usuario para mostrar el "check" verde en la miniatura
  useEffect(() => {
    if (category) {
        getUserVotes().then(votes => {
            if (votes && votes[category.id]) {
                setUserVote(votes[category.id]);
            } else {
                setUserVote(null);
            }
        });
    }
  }, [category, user]);

  if (!category) return null;

  return (
    <>
      {category.nominees.map((nominee: any) => {
        // Lógica de imagen (igual que tenías)
        let thumbSrc = nominee.image;
        if (!thumbSrc && nominee.youtubeId) thumbSrc = `https://img.youtube.com/vi/${nominee.youtubeId}/hqdefault.jpg`;
        else if (!thumbSrc && nominee.video?.includes("cloudinary")) thumbSrc = nominee.video.replace(/\.[^/.]+$/, ".jpg");
        if (!thumbSrc) thumbSrc = "/img/lag_uconstr_placeholder.png";
        if (thumbSrc.includes("imagekit")) thumbSrc += "?tr=w-400,q-80,f-auto";

        const isMyPick = userVote === nominee.name;
        
        // Clases de texto dinámicas
        const nameLength = nominee.name.length;
        const hasSpaces = nominee.name.includes(" ");
        let largeNameClass = "text-3xl sm:text-5xl break-words";
        if (!hasSpaces && nameLength > 10) largeNameClass = "text-xl sm:text-2xl break-all leading-none";
        else if (nameLength > 25) largeNameClass = "text-xl sm:text-2xl break-words leading-tight";
        else if (nameLength > 15) largeNameClass = "text-2xl sm:text-3xl break-words leading-tight";

        return (
          <div 
            key={nominee.name}
            onClick={() => selectNominee(nominee)} // Acción que dispara el store
            className="relative aspect-square overflow-hidden rounded-lg border-4 border-amber-400 transition-transform transform hover:scale-105 group shadow-lg cursor-pointer basis-1/2 md:basis-1/3 lg:basis-1/4 max-w-xs"
          >
            {/* Indicador de Voto */}
            {isMyPick && (
                <div className="nominee-vote-status absolute top-2 right-2 z-30 p-2 bg-green-600 rounded-full shadow-lg text-sm transition-all transform group-hover:scale-110" title="Tu voto!">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
            )}

            <img src={thumbSrc} alt={nominee.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" decoding="async" />
            
            <div className="absolute bottom-0 left-0 right-0 w-full p-4 text-center bg-linear-to-t from-black/90 via-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-0 z-10">
                <h4 className="font-bold text-2xl text-white drop-shadow-md wrap-break-word truncate">{nominee.name}</h4>
            </div>

            <div className="absolute inset-0 flex flex-col justify-center items-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 z-20">
                <h4 className={`w-full text-center font-extrabold text-white stroke-text-white drop-shadow-lg ${largeNameClass}`}>{nominee.name}</h4>
                <span className="mt-2 text-purple-300 font-bold tracking-wider text-xs sm:text-sm uppercase">Ver Detalles</span>
            </div>
          </div>
        );
      })}
    </>
  );
};