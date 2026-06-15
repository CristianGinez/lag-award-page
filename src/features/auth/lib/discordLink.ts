import { supabase } from './supabase';

/**
 * Inicia el flujo de vinculación de Discord a la cuenta actual.
 * El usuario debe estar logueado (con Google). Redirige a Discord OAuth.
 */
export async function startDiscordLink() {
  const { data, error } = await supabase.auth.linkIdentity({
    provider: 'discord',
    options: { redirectTo: `${window.location.origin}/perfil?linked=discord` },
  });
  if (error) {
    console.error('[discordLink] error:', error);
  }
  return { data, error };
}

/**
 * Tras el callback, usa el endpoint server-side para leer la identidad
 * de Discord (vía admin API) y guardar el discord_id en profiles.
 * Llamar en /perfil cuando ?linked=discord.
 */
export async function syncDiscordIdToProfile(): Promise<
  { ok: boolean; discordId?: string; reason?: string; error?: unknown }
> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { ok: false, reason: 'no-session' };

  // Use server-side endpoint: browser getUser() doesn't reliably return identities
  const res = await fetch('/api/auth/sync-discord', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${session.access_token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 409 || data.error === 'already-linked-to-another')
      return { ok: false, reason: 'already-linked-to-another' };
    if (data.error === 'no-discord-identity')
      return { ok: false, reason: 'no-discord-identity' };
    return { ok: false, reason: 'db-error', error: data.error };
  }

  // Otorgar badge "Discord Conectado"
  try {
    const grantRes = await fetch('/api/achievements/grant-badge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ badge_slug: 'discord-conectado' }),
    });
    if (grantRes.ok) {
      const { badge } = await grantRes.json();
      if (badge) {
        window.dispatchEvent(new CustomEvent('achievement:unlocked', { detail: badge }));
      }
    }
  } catch { /* no bloquear el flujo */ }

  return { ok: true, discordId: data.discordId };
}

/** Desvincular Discord de la cuenta actual. */
export async function unlinkDiscord(): Promise<{ ok: boolean; error?: unknown }> {
  const { data: { user } } = await supabase.auth.getUser();
  const identity = user?.identities?.find((i) => i.provider === 'discord');
  if (!identity) return { ok: false };

  const { error } = await supabase.auth.unlinkIdentity(identity);
  if (!error) {
    await supabase
      .from('profiles')
      .update({ discord_id: null, updated_at: new Date().toISOString() })
      .eq('id', user!.id);
  }
  return { ok: !error, error };
}
