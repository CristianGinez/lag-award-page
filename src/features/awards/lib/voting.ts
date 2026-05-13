// src/lib/voting.ts
import { supabase } from '../../auth/lib/supabase';
import { $currentUser } from '../../auth/stores/authStore';



interface Achievement {
    badge_name: string;
    awarded_at: string;
    // La unión (join) nos devuelve los datos del evento anidados
    event_id: {
        name: string;
        year: number;
    } | null; 
}

/**
 * Obtiene todos los logros/insignias de un usuario específico.
 * Se une (JOIN) a la tabla 'events' para obtener el nombre y año del evento.
 * @param userId - El ID del usuario.
 */
export async function getUserAchievements(userId: string): Promise<Achievement[]> {
    const { data, error } = await supabase
        .from('user_achievements')
        .select(`
            badge_name,
            awarded_at,
            event_id (
                name,
                year
            )
        `)
        .eq('user_id', userId);

    if (error) {
        console.error('Error al obtener logros del usuario:', error);
        return [];
    }

    return (data as Achievement[]) || [];
}

const EDGE_VOTE_URL = `${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/vote`;
const EVENT_ID_2025 = '856a7c16-5436-4776-a844-04dcaafb4656';

// Función para VOTAR — llama a la Edge Function server-side
export async function voteForNominee(categoryId: string, nomineeName: string) {
  const user = $currentUser.get();
  if (!user) {
    alert("⚠️ Debes iniciar sesión para votar.");
    return false;
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    alert("⚠️ Sesión expirada. Iniciá sesión de nuevo.");
    return false;
  }

  try {
    const res = await fetch(EDGE_VOTE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryId, nomineeName, eventId: EVENT_ID_2025 }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 409) alert("🚫 Ya has votado en esta categoría.");
      else if (res.status === 403) alert("⚠️ La votación está cerrada.");
      else alert(`Error: ${data.error || 'Algo salió mal'}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Vote network error:', err);
    alert('Error de red. Intentá de nuevo.');
    return false;
  }
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
export async function getWinners(eventId: string) {
    const { data, error } = await supabase
        .rpc('get_event_winners', { target_event_id: eventId });

    if (error) {
        console.error("Error calculando ganadores:", error);
        return [];
    }
    
    // Retorna un array: [{ category_id: "1", nominee_name: "Grox", vote_count: 50 }, ...]
    return data;
}
