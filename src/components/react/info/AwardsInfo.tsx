import React, { useEffect, useState } from 'react';

interface AwardsInfoProps {
  event: any;
  totalCategories: number;
  totalNominees: number;
  voteCount: number; // Pasaremos el total calculado desde el servidor
}

export const AwardsInfo: React.FC<AwardsInfoProps> = ({ event, totalCategories, totalNominees, voteCount }) => {
  const [animatedVotes, setAnimatedVotes] = useState(0);

  // Efecto de conteo para los votos
  useEffect(() => {
    let start = 0;
    const end = voteCount;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(start + (end - start) * easeOutQuart);
      setAnimatedVotes(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedVotes(end);
      }
    };

    requestAnimationFrame(animate);
  }, [voteCount]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-bold px-4 py-1 rounded-full mb-4">
          Guía del Evento
        </span>
        <h1 className="text-5xl md:text-7xl font-bold font-orbitron mb-6">
          Información <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">General</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Todo lo que necesitas saber sobre los {event.title}: fechas, reglas y cómo participar en la fiesta del año.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#111] backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500"></div>
            
            <h2 className="text-2xl font-bold font-orbitron mb-4 relative z-10">Sobre los {event.title}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed relative z-10">
              {event.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-center">
              <div className="bg-white/5 border border-white/10 rounded-xl py-4 px-2 hover:border-purple-500/50 transition-colors">
                <div className="text-2xl font-bold text-white mb-1">{totalCategories}</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Categorías</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl py-4 px-2 hover:border-blue-500/50 transition-colors">
                <div className="text-2xl font-bold text-white mb-1">20+</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Creadores</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl py-4 px-2 hover:border-green-500/50 transition-colors">
                <div className="text-2xl font-bold text-white mb-1">Global</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Comunidad</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl py-4 px-2 hover:border-red-500/50 transition-colors">
                <div className="text-2xl font-bold text-white mb-1">En Vivo</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Gala Final</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center border-t border-white/5 pt-8">
              <div>
                <div className="text-5xl font-black text-yellow-400 font-orbitron tracking-tighter">
                  {animatedVotes.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400 font-bold mt-2 uppercase tracking-widest">Votos Emitidos</div>
              </div>
              <div>
                <div className="text-5xl font-black text-orange-400 font-orbitron tracking-tighter">{totalNominees}</div>
                <div className="text-sm text-gray-400 font-bold mt-2 uppercase tracking-widest">Nominaciones</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#111] backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-6">
            <h3 className="text-xl font-bold font-orbitron mb-6 text-white flex items-center gap-2">
                <span className="text-red-500">📅</span> Fechas Clave
            </h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex justify-between items-center pb-3 border-b border-white/5">
                <span>Apertura</span> 
                <span className="font-mono text-red-400 bg-red-900/20 px-2 py-1 rounded">3 Diciembre</span>
              </li>
              <li className="flex justify-between items-center pb-3 border-b border-white/5">
                <span>Votación Público</span> 
                <span className="font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded"> Hasta 12 Diciembre</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-yellow-400 font-bold">Gala Final</span> 
                <span className="font-mono text-black bg-yellow-400 px-2 py-1 rounded font-bold">12 Diciembre</span>
              </li>
            </ul>
          </div>
        
          <div className="bg-[#111] backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-6">
            <h3 className="text-xl font-bold font-orbitron mb-4 text-white">Sistema de Votación</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Utilizamos tecnología segura para garantizar un voto justo por usuario.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono bg-black/30 p-3 rounded border border-white/5">
                <span className="text-green-500">✔</span> Un voto por categoría
                <br />
                <span className="text-green-500">✔</span> Login verificado
            </div>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="max-w-4xl mx-auto space-y-16 pb-20">
        <section className="relative pl-8 border-l-2 border-red-500/50">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500 shadow-[0_0_15px_#ef4444]"></div>
          <h2 className="text-3xl font-bold font-orbitron mb-4 text-white">¿Qué son los {event.title}?</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Evento anual dedicado a celebrar y premiar la creatividad, el talento y los momentos más memorables de la comunidad.
          </p>
        </section>

        <section className="relative pl-8 border-l-2 border-yellow-500/50">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_15px_#eab308]"></div>
          <h2 className="text-3xl font-bold font-orbitron mb-4 text-white">Proceso de Votación</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            El proceso es impulsado por la comunidad. Vota por tus favoritos en cada categoría.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a href={`/eventos/${event.slug}`} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Ir a Votar Ahora
          </a>
      </div>
      
      {/* Dev Team Section */}
      <section className="mt-32 pt-20 border-t border-white/5 relative">
        <div className="text-center mb-20">
          <span className="text-purple-400 font-mono text-xs uppercase tracking-[0.3em] mb-2 block">Equipo de Desarrollo</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-orbitron">Arquitectura & Desarrollo</h2>
        </div>
        
        {/* Aquí va el grid de desarrolladores original (resumido para no alargar) */}
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
            Diseñado y desarrollado por la comunidad de LAG.
        </div>
      </section>
    </div>
  );
};