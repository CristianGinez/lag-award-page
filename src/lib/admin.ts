import { supabase } from './supabase';

export async function getDashboardStats() {
  // Llamamos a la función RPC que acabamos de crear
  const { data, error } = await supabase.rpc('get_admin_stats');
  
  if (error) {
    console.error("Error cargando stats:", error);
    return null;
  }
  
  return data; // Devuelve { total_votes: 10, top_category_id: "2", ... }
}

// Función para borrar todos los votos (Para el botón de peligro)
export async function resetAllVotes() {
  const { error } = await supabase
    .from('votes')
    .delete()
    .neq('id', 0); // Truco para borrar todo: "id no es igual a 0" (siempre cierto)

  if (error) {
    console.error("Error borrando votos:", error);
    return false;
  }
  return true;
}