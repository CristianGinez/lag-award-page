import React from 'react';

interface LeagueInfoProps {
  event: any;
}

export const LeagueInfo: React.FC<LeagueInfoProps> = ({ event }) => {
  return (
    <div className="animate-fade-in text-white">
      
      <div className="text-center mb-16">
        <span className="inline-block bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-bold px-4 py-1 rounded-full mb-4">
          Reglamento & Formato
        </span>
        <h1 className="text-5xl md:text-7xl font-bold font-orbitron mb-6">
          <span className="bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">PARSEC</span> LEAGUE
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Bienvenido a la liga de fútbol definitiva. Aquí nacen las leyendas.
        </p>
      </div>

      {/* Stats Grid - Estilo Fútbol */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
        {[
            { label: 'Formato', val: '7 vs 7' },
            { label: 'Equipos', val: '8' },
            { label: 'Duración', val: '6 Semanas' },
            { label: 'Prize Pool', val: '$500 USD' }
        ].map((stat, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-green-500/20 p-6 rounded-2xl text-center hover:border-green-500/50 transition-all">
                <div className="text-3xl font-black text-white font-orbitron mb-1">{stat.val}</div>
                <div className="text-xs text-green-500 uppercase font-bold tracking-widest">{stat.label}</div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
        
        {/* Columna Izquierda: Detalles */}
        <div className="space-y-8">
            <div className="bg-[#111] border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-600/10 blur-[60px] rounded-full"></div>
                <h3 className="text-2xl font-bold font-orbitron mb-4 text-white">El Draft</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                    No eliges tu equipo, tu talento te elige a ti. Los capitanes seleccionarán a sus jugadores en una ceremonia de Draft en vivo basándose en el rango y clips enviados durante la inscripción.
                </p>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-black/40 rounded-lg border border-white/5 text-sm">
                        <span className="text-green-400 font-bold block">Fase 1</span>
                        Inscripción Abierta
                    </div>
                    <div className="px-4 py-2 bg-black/40 rounded-lg border border-white/5 text-sm">
                        <span className="text-green-400 font-bold block">Fase 2</span>
                        Tryouts (Pruebas)
                    </div>
                </div>
            </div>

            <div className="bg-[#111] border border-white/10 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold font-orbitron mb-4 text-white">Requisitos</h3>
                <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Disponibilidad los fines de semana.
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Buena conexión a internet (Ping estable).
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Comportamiento deportivo (Fair Play).
                    </li>
                </ul>
            </div>
        </div>

        {/* Columna Derecha: Calendario */}
        <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-3xl relative">
            <h3 className="text-xl font-bold font-orbitron mb-6 text-white flex items-center gap-2">
                <span className="text-green-500">📅</span> Calendario Oficial
            </h3>
            
            <div className="space-y-0 relative">
                {/* Línea conectora */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/10"></div>

                {[
                    { date: '1 Mar', title: 'Apertura de Inscripciones', status: 'done' },
                    { date: '10 Mar', title: 'Cierre de Inscripciones', status: 'current' },
                    { date: '12 Mar', title: 'Draft Day', status: 'upcoming' },
                    { date: '15 Mar', title: 'Jornada 1 - Kickoff', status: 'upcoming' },
                    { date: '20 Abr', title: 'Gran Final', status: 'upcoming' }
                ].map((item, i) => (
                    <div key={i} className="flex gap-6 relative z-10 pb-8 last:pb-0">
                        <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center bg-[#0f0f0f] shrink-0 
                            ${item.status === 'done' ? 'border-green-600 text-green-600' : 
                              item.status === 'current' ? 'border-white text-white animate-pulse' : 'border-white/20 text-gray-600'}`}>
                            <div className={`w-2 h-2 rounded-full ${item.status === 'upcoming' ? 'bg-gray-600' : 'bg-current'}`}></div>
                        </div>
                        <div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${item.status === 'current' ? 'text-green-400' : 'text-gray-500'}`}>
                                {item.date}
                            </span>
                            <h4 className={`text-lg font-bold ${item.status === 'upcoming' ? 'text-gray-400' : 'text-white'}`}>
                                {item.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

      <div className="flex justify-center">
        <a href={`/eventos/${event.slug}`} className="px-10 py-4 bg-green-600 hover:bg-green-500 text-white font-black font-orbitron rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all transform hover:scale-105 hover:-translate-y-1">
            INSCRIBIRSE AHORA
        </a>
      </div>

    </div>
  );
};