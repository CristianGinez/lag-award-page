import React, { useState, useEffect } from 'react';

interface LeagueInfoProps {
  event: any;
}

export const LeagueInfo: React.FC<LeagueInfoProps> = ({ event }) => {
  // Estado para las pestañas (Eliminada 'tablas')
  const [activeTab, setActiveTab] = useState<'general' | 'reglas' | 'caos'>('general');

  // Efecto para leer la URL
  useEffect(() => {
    const handleUrlChange = () => {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        if (tabParam && ['general', 'reglas', 'caos'].includes(tabParam)) {
            setActiveTab(tabParam as any);
        }
    };
    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const switchTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
  };

  const TabButton = ({ id, label, icon }: { id: typeof activeTab, label: string, icon?: string }) => (
    <button
      onClick={() => switchTab(id)}
      className={`px-3 py-2 md:px-6 md:py-3 rounded-t-xl font-bold font-orbitron transition-all border-t border-x border-transparent flex items-center gap-2 text-sm md:text-base
        ${activeTab === id 
          ? 'bg-[#111] text-green-400 border-green-500/30 border-b-[#111]' 
          : 'bg-[#050505] text-gray-500 hover:text-green-300 hover:bg-[#0a0a0a]'}`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );

  return (
    <div className="animate-fade-in text-white max-w-7xl mx-auto min-h-screen">
      
      {/* HEADER */}
      <div className="text-center mb-10 md:mb-14 pt-8">
        <span className="inline-block bg-green-400/10 border border-green-400/20 text-green-400 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Temporada {event.year}
        </span>
        <h1 className="text-4xl md:text-7xl font-black font-orbitron mb-4">
          <span className="bg-linear-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">PARSEC</span> LEAGUE
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto italic">
          "Priorizar la risa y momentos divertidos generando un balance entre los jugadores."
        </p>
      </div>

      {/* TABS NAVEGACIÓN (Sin Tablas) */}
      <div className="flex flex-wrap justify-center border-b border-white/10 mb-0 gap-1 px-2">
        <TabButton id="general" label="General" icon="⚽" />
        <TabButton id="reglas" label="Reglas" icon="📜" />
        {/* 'Tablas' eliminado de aquí, ahora tiene su propia página */}
        <TabButton id="caos" label="Cartas Caos" icon="🃏" />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="bg-[#111] rounded-b-3xl rounded-tr-3xl md:rounded-tr-none border border-white/5 p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[600px]">
        
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* --- TAB: GENERAL --- */}
        {activeTab === 'general' && (
            <div className="space-y-10 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold font-orbitron text-white">Formato General</h2>
                        <p className="text-gray-400 leading-relaxed">
                            La Parsec League es una liga de 8 jugadores diseñada para la diversión y el equilibrio. Todos contra todos en partidos con clima aleatorio.
                        </p>
                        <ul className="grid grid-cols-1 gap-3">
                            <li className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-green-500 font-bold">👤</span> 8 Jugadores
                            </li>
                            <li className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-green-500 font-bold">🎮</span> Modalidad Online (7 partidos c/u)
                            </li>
                            <li className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="text-green-500 font-bold">🌦️</span> Clima Siempre Aleatorio
                            </li>
                        </ul>
                    </div>
                    <div className="bg-linear-to-br from-green-900/20 to-black border border-green-500/20 p-8 rounded-2xl relative">
                        <div className="absolute top-4 right-4 text-4xl opacity-20">👻</div>
                        <h3 className="text-xl font-bold font-orbitron text-green-400 mb-4">Espíritu del Torneo</h3>
                        <blockquote className="text-gray-300 italic border-l-4 border-green-500 pl-4 mb-4">
                            "La idea es no hacer un torneo simple sin más y que hasta el último partido todos tengan algo porqué jugar."
                        </blockquote>
                        <p className="text-xs text-gray-500">
                            Cualquier situación no contemplada se resuelve por votación de grupo.
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold font-orbitron text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span> Resumen Rápido
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'Equipo', desc: '1 por torneo (Liga + Supercopa)' },
                            { title: 'Draft', desc: 'El último elige primero.' },
                            { title: 'Supercopa', desc: '2º vs 3º Semis. Ganador vs 1º.' },
                            { title: 'Premios', desc: '+1 Punto próximo torneo.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-black/40 p-5 rounded-xl border border-white/10 hover:border-green-500/30 transition-all">
                                <h4 className="text-green-400 font-bold mb-1 text-sm uppercase tracking-wider">{item.title}</h4>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* --- TAB: REGLAS --- */}
        {activeTab === 'reglas' && (
            <div className="space-y-12 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold font-orbitron text-white border-b border-green-500/30 pb-3">
                            1. Reglas de Equipos
                        </h2>
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-400 mt-1">★</span>
                                    <span><strong>Jugadores Experimentados:</strong> Equipos de máx. 4.5 estrellas.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gray-400 mt-1">★</span>
                                    <span><strong>Jugadores Menos Exp:</strong> Equipos de hasta 5 estrellas.</span>
                                </li>
                                <li className="flex items-start gap-3 text-red-400">
                                    <span className="mt-1">✖</span>
                                    <span><strong>Prohibido:</strong> Selecciones Nacionales.</span>
                                </li>
                                <li className="flex items-start gap-3 text-red-400">
                                    <span className="mt-1">✖</span>
                                    <span><strong>Prohibido:</strong> Cambios de equipo a mitad de torneo.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex gap-4 p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-xl">
                            <span className="text-2xl">👑</span>
                            <div>
                                <h4 className="font-bold text-yellow-500">Privilegio del Campeón</h4>
                                <p className="text-sm text-gray-400">El campeón mantiene su equipo para el próximo torneo (si quiere) y es inmune a cartas.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden">
                        <div className="bg-green-900/20 p-4 border-b border-white/5">
                            <h3 className="font-bold font-orbitron text-green-400 text-center">Orden de Draft</h3>
                        </div>
                        <div className="p-4">
                            <table className="w-full text-sm">
                                <tbody className="divide-y divide-white/5 text-gray-300">
                                    {[
                                        { pos: '8º Lugar', turn: '1º Turno', highlight: true },
                                        { pos: '7º Lugar', turn: '2º Turno' },
                                        { pos: '6º Lugar', turn: '3º Turno' },
                                        { pos: '5º Lugar', turn: '4º Turno' },
                                        { pos: '4º Lugar', turn: '5º Turno' },
                                        { pos: '3º Lugar', turn: '6º Turno' },
                                        { pos: '2º Lugar', turn: 'Último Turno' },
                                        { pos: '1º Lugar', turn: 'Mantiene Equipo' },
                                    ].map((row, i) => (
                                        <tr key={i} className={row.highlight ? 'text-green-400 font-bold bg-green-900/10' : ''}>
                                            <td className="py-3 px-2">{row.pos}</td>
                                            <td className="py-3 px-2 text-right">{row.turn}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3 bg-black/40 text-xs text-gray-500 text-center">
                            * El orden puede variar por cartas "Orden Manipulado".
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- TAB: CARTAS DEL CAOS --- */}
        {activeTab === 'caos' && (
            <div className="space-y-12 animate-fade-in">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-black font-orbitron text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 mb-2">
                        CAOS & CARTAS
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Elementos diseñados para romper la monotonía y equilibrar la liga.
                    </p>
                </div>
                <div className="bg-[#151120] border border-purple-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-600/20 blur-[50px] rounded-full"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">Fecha 3</span>
                            <h3 className="text-2xl font-bold font-orbitron text-white">La Fecha Caos</h3>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-2xl">
                            Un modo especial que se juega solo en la fecha 3 para romper el hielo. Se sortea uno de los dos modos antes de empezar.
                            <span className="block mt-2 text-xs text-red-400 font-bold uppercase">🚫 No se pueden activar cartas en esta fecha.</span>
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex gap-4 items-start">
                                <span className="text-3xl">👊</span>
                                <div>
                                    <h4 className="font-bold text-white">Sin Infracciones</h4>
                                    <p className="text-xs text-gray-400 mt-1">No hay árbitros. Vale todo. Sin faltas, tarjetas ni offside.</p>
                                </div>
                            </div>
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex gap-4 items-start">
                                <span className="text-3xl">🎲</span>
                                <div>
                                    <h4 className="font-bold text-white">Bola Misteriosa</h4>
                                    <p className="text-xs text-gray-400 mt-1">Efectos aleatorios, goles con bonus y física alterada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold font-orbitron text-white mb-6 border-b border-white/10 pb-2">Clasificación de Cartas</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <h4 className="font-bold text-blue-400">Cartas Menores</h4>
                            </div>
                            {[
                                { name: 'Estadio Fantasma', desc: 'Jugar todo el torneo en cancha de entrenamiento.', type: 'Psicológico' },
                                { name: 'Orden Manipulado', desc: 'Subís o bajás 2 puestos en el draft.', type: 'Draft' },
                                { name: 'Blindaje', desc: 'Inmunidad a cartas este torneo.', type: 'Defensa' }
                            ].map((c,i) => (
                                <div key={i} className="bg-[#121212] p-4 rounded-lg border-l-2 border-blue-500/50 hover:bg-[#1a1a1a] transition-colors">
                                    <div className="font-bold text-white text-sm">{c.name}</div>
                                    <div className="text-xs text-gray-400 mt-1">{c.desc}</div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <h4 className="font-bold text-green-400">Cartas Normales</h4>
                            </div>
                            {[
                                { name: 'Once Retocado', desc: 'Un titular obligado a salir por suplente o jugador menor.', type: 'Táctico' },
                                { name: 'Veto Dorado', desc: 'Un club no puede ser usado por nadie (salvo campeón).', type: 'Global' }
                            ].map((c,i) => (
                                <div key={i} className="bg-[#121212] p-4 rounded-lg border-l-2 border-green-500/50 hover:bg-[#1a1a1a] transition-colors">
                                    <div className="font-bold text-white text-sm">{c.name}</div>
                                    <div className="text-xs text-gray-400 mt-1">{c.desc}</div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <h4 className="font-bold text-red-500">Cartas Fuertes</h4>
                            </div>
                            {[
                                { name: 'Gol Prestado', desc: 'El rival debe dejarte meter un gol.', type: 'Directo' },
                                { name: 'Estrella Bloqueada', desc: 'El mejor jugador al banco por 2 fechas.', type: 'Sanción' },
                                { name: 'Intercambio Forzado', desc: 'Dos jugadores intercambian equipos.', type: 'Caos' }
                            ].map((c,i) => (
                                <div key={i} className="bg-[#121212] p-4 rounded-lg border-l-2 border-red-500/50 hover:bg-[#1a1a1a] transition-colors shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                                    <div className="font-bold text-white text-sm">{c.name}</div>
                                    <div className="text-xs text-gray-400 mt-1">{c.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white/5 p-6 rounded-xl text-sm text-gray-300 border border-white/10">
                    <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider">Reglas de Equilibrio:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>"Gol Prestado" y "Estrella Bloqueada" no se pueden combinar.</li>
                        <li>"Blindaje" anula cualquier carta (salvo Intercambio Forzado si ya se ejecutó).</li>
                        <li>No se pueden usar cartas dos torneos seguidos sobre el mismo jugador.</li>
                        <li>Nunca se usan cartas contra el 1º del torneo anterior (Campeón).</li>
                    </ul>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};