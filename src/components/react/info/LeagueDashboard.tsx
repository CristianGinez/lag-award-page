import React from 'react';
import type { LeagueTeam, Round, GoalScorer } from '../../../data/parsecLeague';

interface LeagueDashboardProps {
  data: {
    standings: LeagueTeam[];
    fixture: Round[];
    goalscorers: GoalScorer[];
  };
}

export const LeagueDashboard: React.FC<LeagueDashboardProps> = ({ data }) => {
  const { standings, fixture, goalscorers } = data;

  return (
    <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto p-4 text-white">
      
      {/* --- SECCIÓN 1: TABLA DE POSICIONES --- */}
      <section className="animate-fade-in-up">
        <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">
          <span className="text-4xl">🏆</span> Tabla de Posiciones
        </h2>
        
        <div className="overflow-x-auto bg-gray-900/60 rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 uppercase text-xs font-bold tracking-wider text-gray-300">
              <tr>
                <th className="p-4 text-center w-16">Pos</th>
                <th className="p-4">Club</th>
                <th className="p-4 text-center">PJ</th>
                <th className="p-4 text-center hidden sm:table-cell">G</th>
                <th className="p-4 text-center hidden sm:table-cell">E</th>
                <th className="p-4 text-center hidden sm:table-cell">P</th>
                <th className="p-4 text-center hidden md:table-cell">DG</th>
                <th className="p-4 text-center font-black text-yellow-400">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {standings.map((team) => (
                <tr key={team.name} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-center font-bold text-gray-400">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full ${team.position <= 4 ? 'bg-green-500/20 text-green-400' : ''}`}>
                      {team.position}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-base">{team.name}</td>
                  <td className="p-4 text-center">{team.played}</td>
                  <td className="p-4 text-center hidden sm:table-cell text-gray-400">{team.won}</td>
                  <td className="p-4 text-center hidden sm:table-cell text-gray-400">{team.drawn}</td>
                  <td className="p-4 text-center hidden sm:table-cell text-gray-400">{team.lost}</td>
                  <td className="p-4 text-center hidden md:table-cell text-gray-500">{team.gd > 0 ? `+${team.gd}` : team.gd}</td>
                  <td className="p-4 text-center font-black text-xl text-yellow-500">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- SECCIÓN 2: FIXTURE (Partidos) --- */}
      <section className="animate-fade-in-up [animation-delay:200ms]">
        <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-blue-400">
          <span className="text-4xl">📅</span> Fixture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fixture.map((round, idx) => (
            <div key={idx} className="bg-gray-900/40 rounded-xl border border-white/10 p-5">
              <h3 className="text-lg font-bold text-blue-300 mb-4 border-b border-white/10 pb-2">{round.name}</h3>
              <div className="flex flex-col gap-3">
                {round.matches.map((match) => (
                  <div key={match.id} className="flex items-center justify-between bg-black/20 p-3 rounded-lg text-sm">
                    {/* Equipo Local */}
                    <div className={`flex-1 text-right font-medium ${match.homeScore != null && (match.homeScore > (match.awayScore||0)) ? 'text-green-400' : 'text-gray-300'}`}>
                      {match.homeTeam}
                    </div>
                    
                    {/* Marcador / Hora */}
                    <div className="mx-4 flex flex-col items-center min-w-[60px]">
                      {match.status === 'played' ? (
                         <span className="bg-gray-800 px-2 py-1 rounded text-white font-mono font-bold border border-white/10">
                           {match.homeScore} - {match.awayScore}
                         </span>
                      ) : (
                        <div className="flex flex-col items-center text-xs text-gray-500">
                          <span className="font-bold text-gray-400">{match.time}</span>
                          <span>{match.date}</span>
                        </div>
                      )}
                    </div>

                    {/* Equipo Visitante */}
                    <div className={`flex-1 text-left font-medium ${match.awayScore != null && (match.awayScore > (match.homeScore||0)) ? 'text-green-400' : 'text-gray-300'}`}>
                      {match.awayTeam}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN 3: GOLEADORES --- */}
      <section className="animate-fade-in-up [animation-delay:400ms]">
        <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-red-500">
          <span className="text-4xl">⚽</span> Goleadores
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {goalscorers.map((player) => (
                <div key={player.rank} className="bg-gray-900/60 p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:bg-gray-800/60 transition-colors">
                    <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full font-black text-lg shadow-lg
                        ${player.rank === 1 ? 'bg-yellow-500 text-black' : 
                          player.rank === 2 ? 'bg-gray-400 text-black' : 
                          player.rank === 3 ? 'bg-orange-700 text-white' : 'bg-gray-800 text-gray-400'}
                    `}>
                        {player.rank}
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-white">{player.name}</div>
                        <div className="text-xs text-gray-400">{player.team}</div>
                    </div>
                    <div className="font-mono font-black text-2xl text-red-400">
                        {player.goals}
                    </div>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};