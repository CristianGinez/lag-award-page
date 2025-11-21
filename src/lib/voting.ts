// src/lib/voting.ts
import { supabase } from './supabase';
import { $currentUser } from '../stores/authStore';

// Función para VOTAR (Ya la tenías, sin cambios)
export async function voteForNominee(categoryId: string, nomineeName: string) {
  const user = $currentUser.get();
  if (!user) {
    alert("⚠️ Debes iniciar sesión para votar.");
    return false;
  }

  const { error } = await supabase
    .from('votes')
    .insert([{ user_id: user.id, category_id: categoryId, nominee_name: nomineeName }]);

  if (error) {
    if (error.code === '23505') alert("🚫 Ya has votado en esta categoría.");
    else console.error("Error:", error);
    return false;
  }
  return true;
}

// 👇 NUEVA FUNCIÓN: Obtener votos del usuario actual
export async function getUserVotes() {
  const user = $currentUser.get();
  if (!user) return {}; // Si no hay usuario, devuelve objeto vacío

  const { data, error } = await supabase
    .from('votes')
    .select('category_id, nominee_name')
    .eq('user_id', user.id);

  if (error) {
    console.error("Error cargando votos:", error);
    return {};
  }

  // Convertimos el array de Supabase en un objeto fácil de leer:
  // { "1": "Grox", "2": "excitado" }
  const votesMap: Record<string, string> = {};
  data.forEach((vote: any) => {
    votesMap[vote.category_id] = vote.nominee_name;
  });
  
  return votesMap;
}

export async function getVoteCounts() {
  const { data, error } = await supabase.rpc('get_vote_counts');
  
  if (error) {
    console.error("Error obteniendo conteos:", error);
    return {};
  }

  // Transformamos el array en un objeto fácil de usar:
  // { "categoria1_nominadoA": 150, "categoria1_nominadoB": 20 }
  const countsMap: Record<string, number> = {};
  
  data.forEach((item: any) => {
    // Creamos una clave única combinando categoría y nombre
    const key = `${item.category_id}_${item.nominee_name}`;
    countsMap[key] = item.vote_count;
  });

  return countsMap;
}

export async function getCategoryTotalVotes() {
  const { data, error } = await supabase.rpc('get_category_vote_counts');
  
  if (error) {
    console.error("Error obteniendo totales de categoría:", error);
    return {};
  }

  // Mapeamos: { "id_categoria": total_votos }
  // Ejemplo: { "1": 500, "2": 120 }
  const countsMap: Record<string, number> = {};
  
  data.forEach((item: any) => {
    countsMap[item.category_id] = item.vote_count;
  });

  return countsMap;
}