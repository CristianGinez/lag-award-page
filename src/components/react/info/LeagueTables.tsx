import React from 'react';

interface LeagueTablesProps {
  event: any;
}

export const LeagueTables: React.FC<LeagueTablesProps> = ({ event }) => {
  return (
    <div className="animate-fade-in text-white max-w-7xl mx-auto min-h-screen">
      
      {/* HEADER */}
      <div className="text-center mb-10 md:mb-14 pt-8">
        <span className="inline-block bg-green-400/10 border border-green-400/20 text-green-400 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Temporada {event.year}
        </span>
        <h1 className="text-4xl md:text-7xl font-black font-orbitron mb-4">
          TABLAS Y <span className="bg-linear-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">DEFINICIÓN</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto italic">
            "Así se define el campeón y las clasificaciones a Copas."
        </p>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="bg-[#111] rounded-3xl border border-white/5 p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
         
         {/* Decoración de fondo */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="space-y-12 relative z-10">
            
            {/* Modelo Liga Regular */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
                <div className="bg-linear-to-r from-blue-900/40 to-blue-800/20 p-4 flex justify-between items-center flex-wrap gap-2">
                    <h3 className="font-bold font-orbitron text-white text-lg">LIGA REGULAR</h3>
                    <div className="flex gap-2 text-xs font-bold">
                        <span className="bg-green-500 text-black px-2 py-1 rounded">+3 Gana</span>
                        <span className="bg-gray-500 text-white px-2 py-1 rounded">+1 Empata</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead className="bg-black/40 text-gray-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Pos</th>
                                <th className="p-4">Consecuencia / Premio</th>
                                <th className="p-4">Cartas (Próx. Torneo)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            <tr className="bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors">
                                <td className="p-4 font-bold text-yellow-400">1º Campeón</td>
                                <td className="p-4 text-white">🏆 Título + Final Supercopa + Inmunidad</td>
                                <td className="p-4 text-gray-400">Ninguna (Inmune)</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="p-4 font-bold text-blue-400">2º Subcampeón</td>
                                <td className="p-4 text-gray-300">Clasifica a Semis de Supercopa</td>
                                <td className="p-4 text-gray-500">Ninguna</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="p-4 font-bold text-blue-400">3º Lugar</td>
                                <td className="p-4 text-gray-300">Clasifica a Semis de Supercopa</td>
                                <td className="p-4 text-gray-500">Ninguna</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="p-4 text-gray-400">4º Lugar</td>
                                <td className="p-4 text-gray-500">Zona Media</td>
                                <td className="p-4 text-blue-300">1 Carta Menor</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="p-4 text-gray-400">5º Lugar</td>
                                <td className="p-4 text-gray-500">Zona Media</td>
                                <td className="p-4 text-green-300">1 Carta Normal</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="p-4 text-gray-400">6º Lugar</td>
                                <td className="p-4 text-gray-500">Zona Baja</td>
                                <td className="p-4 text-green-300">1 Carta Normal</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="p-4 text-red-400">7º Lugar</td>
                                <td className="p-4 text-gray-500">Zona de Peligro</td>
                                <td className="p-4 text-red-300">1 Carta Fuerte</td>
                            </tr>
                            <tr className="bg-red-900/10 hover:bg-red-900/20 transition-colors">
                                <td className="p-4 font-bold text-red-500">8º Último</td>
                                <td className="p-4 text-red-200">1er Pick del Draft</td>
                                <td className="p-4 text-red-300">2 Cartas (1 Fuerte + 1 Random)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modelo Supercopa Bracket */}
            <div>
                <h3 className="text-xl font-bold font-orbitron text-white mb-6 pl-2 border-l-4 border-purple-500">
                    FORMATO SUPERCOPA
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 bg-black/20 p-8 rounded-xl border border-white/5">
                    
                    {/* Semifinal */}
                    <div className="w-full md:w-64 bg-black/40 border border-white/10 rounded-xl p-6 text-center relative group">
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 text-xs px-2 py-0.5 rounded text-white uppercase">Semifinal</span>
                        <div className="space-y-2 mt-2">
                            <div className="p-3 bg-white/5 rounded font-bold text-blue-400">2º Tabla</div>
                            <div className="text-xs text-gray-500">VS</div>
                            <div className="p-3 bg-white/5 rounded font-bold text-blue-400">3º Tabla</div>
                        </div>
                        <div className="mt-4 text-xs text-gray-400">Partido Único<br/>Alargue/Penales</div>
                    </div>

                    {/* Conector */}
                    <div className="hidden md:block h-0.5 w-16 bg-gray-700 relative">
                        <div className="absolute right-0 -top-1.5 text-gray-700">►</div>
                    </div>
                    <div className="md:hidden text-2xl text-gray-600">⬇</div>

                    {/* Final */}
                    <div className="w-full md:w-72 bg-linear-to-b from-purple-900/20 to-black border border-purple-500/50 rounded-xl p-6 text-center relative shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-xs px-3 py-0.5 rounded text-white font-bold uppercase shadow-lg">GRAN FINAL</span>
                        <div className="space-y-4 mt-2">
                            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded font-black text-xl text-white">
                                1º Campeón
                            </div>
                            <div className="text-xs text-purple-400 font-bold">VS</div>
                            <div className="p-3 bg-white/5 border border-white/10 rounded font-bold text-gray-300">
                                Ganador Semis
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 text-xs text-green-400 font-bold">
                            Premio: +1 Punto (Próx. Torneo)
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
};