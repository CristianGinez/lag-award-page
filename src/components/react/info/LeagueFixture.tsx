import React from 'react';
import type { Round } from '../../../data/parsecLeague';

export const LeagueFixture: React.FC<{ fixture: Round[] }> = ({ fixture }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {fixture.map((round, idx) => (
        <div key={idx} className="bg-gray-900/40 rounded-xl border border-white/10 p-5 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
          <h3 className="text-lg font-bold text-blue-400 mb-4 border-b border-white/10 pb-2">{round.name}</h3>
          <div className="flex flex-col gap-3">
            {round.matches.map((match) => (
              <div key={match.id} className="flex items-center justify-between bg-black/20 p-3 rounded-lg text-sm hover:bg-white/5 transition-colors">
                <div className={`flex-1 text-right font-medium ${match.homeScore != null && (match.homeScore > (match.awayScore||0)) ? 'text-green-400' : 'text-gray-300'}`}>
                  {match.homeTeam}
                </div>
                
                <div className="mx-4 flex flex-col items-center min-w-[60px]">
                  {match.status === 'played' ? (
                     <span className="bg-gray-800 px-3 py-1 rounded text-white font-mono font-bold border border-white/10 shadow-lg">
                       {match.homeScore} - {match.awayScore}
                     </span>
                  ) : (
                    <div className="flex flex-col items-center text-xs text-gray-500">
                      <span className="font-bold text-gray-400">{match.time}</span>
                      <span>{match.date}</span>
                    </div>
                  )}
                </div>

                <div className={`flex-1 text-left font-medium ${match.awayScore != null && (match.awayScore > (match.homeScore||0)) ? 'text-green-400' : 'text-gray-300'}`}>
                  {match.awayTeam}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};