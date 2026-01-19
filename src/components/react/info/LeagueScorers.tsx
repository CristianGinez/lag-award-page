import React from 'react';
import type { GoalScorer } from '../../../data/parsecLeague';

export const LeagueScorers: React.FC<{ goalscorers: GoalScorer[] }> = ({ goalscorers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {goalscorers.map((player, idx) => (
            <div key={player.rank} className="bg-gray-900/60 p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:bg-gray-800/60 transition-colors animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full font-black text-xl shadow-lg border-2
                    ${player.rank === 1 ? 'bg-yellow-500 text-black border-yellow-300' : 
                      player.rank === 2 ? 'bg-gray-300 text-black border-gray-100' : 
                      player.rank === 3 ? 'bg-orange-700 text-white border-orange-500' : 'bg-gray-800 text-gray-400 border-gray-700'}
                `}>
                    {player.rank}
                </div>
                <div className="flex-1">
                    <div className="font-bold text-white text-lg">{player.name}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">{player.team}</div>
                </div>
                <div className="text-right">
                    <span className="block font-mono font-black text-3xl text-red-500 leading-none">
                        {player.goals}
                    </span>
                    <span className="text-[10px] text-red-400/70 uppercase font-bold">Goles</span>
                </div>
            </div>
        ))}
    </div>
  );
};