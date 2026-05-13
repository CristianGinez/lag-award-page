import { useState } from 'react';
import type { ServerPersonality } from '../types';
import { supabase } from '@/features/auth/lib/supabase';

interface Props {
  initialPersonality: ServerPersonality | null;
}

export default function PersonalityView({ initialPersonality }: Props) {
  const [personality, setPersonality] = useState(initialPersonality);
  const [learning, setLearning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleLearnNow() {
    if (!confirm('¿Re-aprender ahora? Esto puede tardar 30-60 segundos.')) return;
    setLearning(true);
    setError(null);
    setSuccess(false);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/bot/personality', {
        method: 'POST',
        headers: session ? { Authorization: `Bearer ${session.access_token}` } : {},
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setSuccess(true);
      // Optimistic update — la UI se actualiza en el próximo load
      if (data.result) setPersonality(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLearning(false);
    }
  }

  if (!personality) {
    return (
      <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10">
        <p className="text-gray-400 mb-4">No hay personalidad aprendida todavía.</p>
        <button
          onClick={handleLearnNow}
          disabled={learning}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg font-bold transition-colors"
        >
          {learning ? 'Aprendiendo… (puede tardar ~60s)' : 'Aprender ahora'}
        </button>
        {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
      </div>
    );
  }

  const lastLearned = personality.lastLearnedAt
    ? new Date(personality.lastLearnedAt).toLocaleString('es-AR')
    : 'Nunca';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs text-gray-500 font-mono">Última actualización: {lastLearned}</p>
          <p className="text-xs text-gray-500">{personality.sampleSize} mensajes muestreados</p>
        </div>
        <button
          onClick={handleLearnNow}
          disabled={learning}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-sm font-bold transition-colors"
        >
          {learning ? 'Aprendiendo… (~60s)' : 'Re-aprender ahora'}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
      )}
      {success && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
          Aprendizaje completado. Recargá la página para ver los cambios.
        </div>
      )}

      <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-sm font-bold font-orbitron uppercase tracking-widest text-gray-400 mb-3">Style Notes</h2>
        <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{personality.styleNotes}</p>
      </section>

      {personality.communityFacts && (
        <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-sm font-bold font-orbitron uppercase tracking-widest text-gray-400 mb-3">Community Facts</h2>
          <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{personality.communityFacts}</p>
        </section>
      )}

      <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-sm font-bold font-orbitron uppercase tracking-widest text-gray-400 mb-3">
          Léxico ({personality.lexicon?.length ?? 0} términos)
        </h2>
        <div className="flex flex-wrap gap-2">
          {(personality.lexicon || []).map((term: string) => (
            <span key={term} className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-gray-300">
              {term}
            </span>
          ))}
        </div>
      </section>

      <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-sm font-bold font-orbitron uppercase tracking-widest text-gray-400 mb-3">
          Mensajes de ejemplo ({personality.exampleMessages?.length ?? 0})
        </h2>
        <div className="space-y-3">
          {(personality.exampleMessages || []).map((msg: string, i: number) => (
            <blockquote key={i} className="border-l-2 border-white/20 pl-4 text-gray-300 text-sm italic">
              {msg}
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
