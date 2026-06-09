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
 * Tras el callback, lee la identidad de Discord vinculada y guarda
 * el discord_id en profiles. Llamar en /perfil cuando ?linked=discord.
 */
export async function syncDiscordIdToProfile(): Promise<
  { ok: boolean; discordId?: string; reason?: string; error?: unknown }
> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, reason: 'no-session' };

  const discordIdentity = user.identities?.find((i) => i.provider === 'discord');
  if (!discordIdentity) return { ok: false, reason: 'no-discord-identity' };

  // Discord snowflake puede venir en provider_id o sub según la versión del SDK
  const discordId =
    (discordIdentity.identity_data as Record<string, unknown>)?.provider_id as string |undefined ??
    (discordIdentity.identity_data as Record<string, unknown>)?.sub as string | undefined ??
    discordIdentity.id;

  const { error } = await supabase
    .from('profiles')
    .update({ discord_id: String(discordId), updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (error) {
    console.error('[discordLink] no se pudo guardar discord_id:', error);
    // 23505 = unique_violation: ese Discord ya está vinculado a otro perfil
    if ((error as { code?: string }).code === '23505') {
      return { ok: false, reason: 'already-linked-to-another', error };
    }
    return { ok: false, reason: 'db-error', error };
  }
  // Reconocer VIP si el discord_id matchea
  try {
    await supabase.rpc('claim_vip_status', { target_user_id: user.id });
  } catch { /* no bloquear el flujo */ }

  // Otorgar badge "Discord Conectado"
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const grantRes = await fetch('/api/achievements/grant-badge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {}),
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

  return { ok: true, discordId: String(discordId) };
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
