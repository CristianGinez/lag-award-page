import React, { useState } from 'react';
import type { LeagueTeam } from '../types';
import { supabase } from '@/features/auth/lib/supabase';

interface LeagueTeamsManagerProps {
  initialTeams: (LeagueTeam & { id: string })[];
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

const STAT_FIELDS = ['position', 'played', 'won', 'drawn', 'lost', 'points', 'gf', 'ga', 'gd'] as const;

export const LeagueTeamsManager: React.FC<LeagueTeamsManagerProps> = ({ initialTeams }) => {
  const [teams, setTeams] = useState(initialTeams);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const saveTeam = async (team: typeof teams[0]) => {
    setSaving(true);
    const res = await adminFetch('update_team', {
      id: team.id,
      position: team.position,
      played: team.played,
      won: team.won,
      drawn: team.drawn,
      lost: team.lost,
      points: team.points,
      gf: team.gf,
      ga: team.ga,
      gd: team.gd,
      form: team.form ?? [],
    });
    setSaving(false);
    if (res.ok) flash('✓ Equipo guardado');
    else flash(`✗ ${res.error}`);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
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

      <table className="w-full text-left border-collapse">
        <thead className="bg-[#0a0a0a] text-xs uppercase text-gray-500 font-mono border-b border-white/10">
          <tr>
            <th className="px-4 py-3">Equipo</th>
            {STAT_FIELDS.map(f => <th key={f} className="px-3 py-3 text-center">{f}</th>)}
            <th className="px-3 py-3">Forma</th>
            <th className="px-3 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {teams.map((team, ti) => (
            <tr key={team.id} className="hover:bg-white/2 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {team.logo && <img src={team.logo} alt={team.name} className="w-6 h-6 rounded-full object-contain" />}
                  <span className="text-white text-sm font-semibold">{team.name}</span>
                </div>
              </td>
              {STAT_FIELDS.map(f => (
                <td key={f} className="px-3 py-3 text-center">
                  <input
                    type="number"
                    defaultValue={(team as any)[f]}
                    className="w-12 text-center bg-black/50 border border-white/10 rounded px-1 py-1 text-white text-xs font-mono focus:outline-none focus:border-green-500"
                    onBlur={e => {
                      const v = Number(e.target.value);
                      setTeams(prev => prev.map((t, i) => i === ti ? { ...t, [f]: v } : t));
                    }}
                  />
                </td>
              ))}
              <td className="px-3 py-3">
                <input
                  type="text"
                  defaultValue={(team.form ?? []).join(',')}
                  placeholder="W,L,D"
                  className="w-24 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-xs font-mono focus:outline-none focus:border-green-500"
                  onBlur={e => {
                    const form = e.target.value.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
                    setTeams(prev => prev.map((t, i) => i === ti ? { ...t, form } : t));
                  }}
                />
              </td>
              <td className="px-3 py-3">
                <button
                  onClick={() => saveTeam(team)}
                  className="px-3 py-1.5 bg-green-700 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
