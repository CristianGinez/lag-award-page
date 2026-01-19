
import React from 'react';
import type { Edition } from '../../../data/parsecLeague';

export const LeagueEditions: React.FC<{ editions: Edition[] }> = ({ editions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {editions.map((edition, idx) => (
        <div 
          key={idx} 
          className="bg-gray-900/40 rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all group animate-fade-in-up"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Contenedor del Video (Aspect Ratio 16:9) */}
          <div className="relative w-full aspect-video bg-black">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${edition.videoId}`} 
              title={edition.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0"
              loading="lazy"
            ></iframe>
          </div>

          {/* Info */}
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                {edition.title}
              </h3>
              <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-gray-300">
                {edition.year}
              </span>
            </div>
            {edition.description && (
              <p className="text-sm text-gray-400 line-clamp-3">
                {edition.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};