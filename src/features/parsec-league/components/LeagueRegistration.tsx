import React, { useState } from 'react';

export const LeagueRegistration = () => {
  const [formData, setFormData] = useState({
    ign: '',
    discord: '',
    position: 'delantero',
    rank: '',
    clips: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // SIMULACIÓN DE ENVÍO A BASE DE DATOS
    setTimeout(() => {
      setStatus('success');
      console.log("Datos enviados:", formData);
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-900/20 border border-green-500/30 p-8 rounded-2xl text-center animate-fade-in">
        <div className="text-6xl mb-4">⚽✅</div>
        <h2 className="text-3xl font-bold text-white font-orbitron mb-2">¡Inscripción Recibida!</h2>
        <p className="text-gray-300">Tu perfil ha sido enviado a los ojeadores de la Parsec League.</p>
        <p className="text-sm text-green-400 mt-4">Mantente atento a Discord para los resultados del draft.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-gray-500 hover:text-white underline">Enviar otra inscripción</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Decoración */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] rounded-full pointer-events-none"></div>

      <h2 className="text-3xl font-bold font-orbitron text-white mb-6 flex items-center gap-3">
        <span className="text-green-500">📋</span> Ficha de Jugador
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nombre de Usuario (IGN)</label>
            <input 
              required
              type="text" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
              placeholder="Ej: CR7_Parsec"
              value={formData.ign}
              onChange={e => setFormData({...formData, ign: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Discord ID</label>
            <input 
              required
              type="text" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
              placeholder="Ej: user#1234"
              value={formData.discord}
              onChange={e => setFormData({...formData, discord: e.target.value})}
            />
          </div>
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Genero favorito</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['misionero', '7', 'DOS', 'XD'].map(pos => (
                    <button
                        key={pos}
                        type="button"
                        onClick={() => setFormData({...formData, position: pos})}
                        className={`p-3 rounded-lg border text-sm font-bold transition-all ${formData.position === pos ? 'bg-green-600 border-green-500 text-white' : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/30'}`}
                    >
                        {pos}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Rango / Elo Actual</label>
            <input 
              required
              type="text" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
              placeholder="Ej: Diamante II / 1500 MMR"
              value={formData.rank}
              onChange={e => setFormData({...formData, rank: e.target.value})}
            />
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Link a Highlights (Opcional)</label>
            <input 
              type="url" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
              placeholder="https://youtube.com/..."
              value={formData.clips}
              onChange={e => setFormData({...formData, clips: e.target.value})}
            />
            <p className="text-xs text-gray-500 mt-2">Sube tus mejores jugadas para tener más chances de ser seleccionado.</p>
        </div>

        <div className="pt-4">
            <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {status === 'submitting' ? 'Enviando...' : 'ENVIAR INSCRIPCIÓN'}
            </button>
        </div>

      </form>
    </div>
  );
};