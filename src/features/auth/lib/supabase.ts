// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js';
import type { APIContext } from 'astro';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// 🚨 ESTA CONFIGURACIÓN ES CRÍTICA PARA QUE EL NAVEGADOR LEA LA SESIÓN 🚨
const authConfig = {
    auth: {
        persistSession: true, 
        detectSessionInUrl: true, 
        flowType: 'pkce' as 'pkce', // Asegura el flujo PKCE
    }
};

/**
 * [Cliente SSR] Utilizado para obtener la sesión en el servidor (Frontmatter).
 * (Debería usar getSupabase(Astro) en el Frontmatter)
 */
export function getSupabase(context: APIContext) {
    if (!context || !context.request) {
        return createClient(supabaseUrl, supabaseAnonKey, authConfig);
    }

    return createClient(
        supabaseUrl, 
        supabaseAnonKey, 
        {
            ...authConfig, // Incluye la configuración PKCE
            global: {
                // Pasa las cookies para que el servidor pueda leer la sesión
                headers: {
                    cookie: context.request.headers.get('cookie') || '',
                }
            }
        }
    );
}

/**
 * [Cliente CSR] Cliente Simple para uso en el lado del cliente (navegador).
 * (Utilizado por el authStore y el bloque <script> de perfil.astro)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, authConfig);