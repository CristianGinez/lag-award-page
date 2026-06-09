import React, { useState } from 'react';
import type { Round } from '../types';
import { supabase } from '@/features/auth/lib/supabase';

interface LeagueFixtureManagerProps {
  initialFixture: Round[];
}

async function adminFetch(action: string, payload: Record<string, any>) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch('/api/admin/league', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token ?? ''}`,
    },
    body: JSON.stringify({ action, ...payload }),
  });
  return res.json();
}

export const LeagueFixtureManager: React.FC<LeagueFixtureManagerProps> = ({ initialFixture }) => {
  const [fixture, setFixture] = useState<Round[]>(initialFixture);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const updateMatch = async (matchId: string, fields: Record<string, any>) => {
    setSaving(true);
    const res = await adminFetch('update_match', { id: matchId, ...fields });
    setSaving(false);
    if (res.ok) flash('✓ Partido actualizado');
    else flash(`✗ ${res.error}`);
  };

  return (
    <div className="space-y-6">
      {msg && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-lg font-bold text-sm shadow-xl ${msg.startsWith('✓') ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {msg}
        </div>
      )}
      {saving && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/80 px-4 py-2 rounded-full text-white text-sm">
          Guardando...
        </div>
      )}

      {fixture.map((round, ri) => (
        <div key={ri} className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-5 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
            <h3 className="font-bold text-white font-orbitron text-sm uppercase">{round.name}</h3>
          </div>
          <div className="divide-y divide-white/5">
            {round.matches.map((match: any) => (
              <div key={match.id} className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                <span className="text-white font-bold text-sm text-right col-span-1 md:col-span-1">{match.homeTeam}</span>

                <div className="flex items-center justify-center gap-2 col-span-1 md:col-span-1">
                  <input
                    type="number"
                    min="0"
                    defaultValue={match.homeScore ?? ''}
                    placeholder="–"
                    className="w-14 text-center bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-sm font-mono focus:outline-none focus:border-blue-500"
                    onBlur={e => {
                      const v = e.target.value === '' ? null : Number(e.target.value);
                      setFixture(prev => prev.map((r, i) => i === ri ? {
                        ...r,
                        matches: r.matches.map((m: any) => m.id === match.id ? { ...m, homeScore: v } : m)
                      } : r));
                    }}
                  />
                  <span className="text-gray-500">–</span>
                  <input
                    type="number"
                    min="0"
                    defaultValue={match.awayScore ?? ''}
                    placeholder="–"
                    className="w-14 text-center bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-sm font-mono focus:outline-none focus:border-blue-500"
                    onBlur={e => {
                      const v = e.target.value === '' ? null : Number(e.target.value);
                      setFixture(prev => prev.map((r, i) => i === ri ? {
                        ...r,
                        matches: r.matches.map((m: any) => m.id === match.id ? { ...m, awayScore: v } : m)
                      } : r));
                    }}
                  />
                </div>

                <span className="text-white font-bold text-sm col-span-1">{match.awayTeam}</span>

                <select
                  defaultValue={match.status}
                  className="bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-blue-500 col-span-1"
                  onChange={e => {
                    setFixture(prev => prev.map((r, i) => i === ri ? {
                      ...r,
                      matches: r.matches.map((m: any) => m.id === match.id ? { ...m, status: e.target.value } : m)
                    } : r));
                  }}
                >
                  <option value="scheduled">Programado</option>
                  <option value="played">Finalizado</option>
                  <option value="live">En vivo</option>
                </select>

                <button
                  onClick={() => {
                    const current = fixture[ri].matches.find((m: any) => m.id === match.id) as any;
                    updateMatch(match.id, {
                      home_score: current.homeScore,
                      away_score: current.awayScore,
                      status: current.status,
                      match_date: current.status === 'played' ? 'Finalizado' : current.date,
                    });
                  }}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors col-span-1"
                >
                  Guardar
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
