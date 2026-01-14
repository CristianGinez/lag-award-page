import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $currentUser } from '../../stores/authStore';
import { voteForNominee, getUserVotes } from '../../lib/voting';

interface VoteButtonProps {
  category: any;
  nominee: any;
  streamerMode?: boolean;
}

export const VoteButton: React.FC<VoteButtonProps> = ({ category, nominee }) => {
  const user = useStore($currentUser);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // --- CONFIGURACIÓN: CERRAR VOTACIONES ---
  const VOTING_CLOSED = true; // Cambia a false si quieres reabrir
  // ----------------------------------------
  
  // Cargar votos al montar
  useEffect(() => {
    loadVotes();
  }, [user]);

  const loadVotes = async () => {
    const v = await getUserVotes();
    setVotes(v || {});
  };

  const handleVote = async () => {
    if (VOTING_CLOSED) return; // Seguridad extra
    
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setLoading(true);
    try {
      const success = await voteForNominee(category.id, nominee.name);
      if (success) {
        setVotes({ ...votes, [category.id]: nominee.name });
        if ((window as any).confetti) (window as any).confetti();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const currentVote = votes[category.id];
  const hasVoted = !!currentVote;
  const isMyPick = currentVote === nominee.name;

  // CASO 1: EL USUARIO YA VOTÓ (Mantenemos esto visible siempre)
  if (hasVoted) {
    if (isMyPick) {
      return (
        <button disabled className="w-full md:w-auto px-8 py-4 bg-green-600/90 text-white rounded-lg text-xl font-bold cursor-default shadow-inner border border-green-500/50 flex items-center justify-center gap-2 transition-all opacity-100">
           ✅ Tu Voto: {nominee.name}
        </button>
      );
    } else {
      return (
        <button disabled className="w-full md:w-auto px-8 py-4 bg-gray-800 text-gray-500 rounded-lg text-lg font-bold cursor-not-allowed border border-gray-700 opacity-75">
          🔒 Ya votaste en esta categoría
        </button>
      );
    }
  }

  // CASO 2: VOTACIONES CERRADAS (Para quien NO ha votado aún)
  if (VOTING_CLOSED) {
    return (
        <button disabled className="w-full md:w-auto px-8 py-4 bg-gray-900/80 text-gray-400 rounded-lg text-lg font-bold cursor-not-allowed border border-gray-700 shadow-none flex items-center justify-center gap-2">
            <span>⛔</span> Votaciones Cerradas
        </button>
    );
  }

  // CASO 3: BOTÓN NORMAL DE VOTAR (Solo si VOTING_CLOSED es false)
  return (
    <button
      onClick={handleVote}
      disabled={loading}
      className={`w-full md:w-auto px-8 py-4 rounded-lg text-xl font-bold text-white shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3
        ${loading ? 'bg-gray-600 cursor-wait' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500'}
      `}
    >
      {loading ? (
        <span>Procesando...</span>
      ) : (
        <>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path></svg>
          Votar Ahora
        </>
      )}
    </button>
  );
};