import { supabase } from '../../auth/lib/supabase';

export async function getDashboardStats() {
  // Llamamos a la función RPC que acabamos de crear
  const { data, error } = await supabase.rpc('get_admin_stats');
  
  if (error) {
    console.error("Error cargando stats:", error);
    return null;
  }
  
  return data; // Devuelve { total_votes: 10, top_category_id: "2", ... }
}

const EDGE_RESET_URL = `${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/admin-reset-votes`;

// Función para borrar todos los votos — requiere JWT de admin, hace backup automático
export async function resetAllVotes() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.error("No hay sesión activa");
    return false;
  }

  try {
    const res = await fetch(EDGE_RESET_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error reseteando votos:", data.error);
      return false;
    }

    console.log(`Votos reseteados. Archivados: ${data.archived}`);
    return true;
  } catch (err) {
    console.error("Error de red al resetear votos:", err);
    return false;
  }
}