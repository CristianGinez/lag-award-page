# VIP Self-Edit & Account Linking — Spec

## Objetivo

Permitir que los VIPs editen su propio perfil público (bio, avatar, juegos, links) desde su cuenta, y que el admin pueda vincular/desvincular cuentas de Google a perfiles VIP desde el dashboard.

---

## Tres piezas

### 1. Admin — Vincular cuenta Google a VIP

**Ubicación:** nueva sección en `/admin`, visible solo para admins.

**UI:**
- Tabla con todos los VIPs: nombre, slug, estado de vinculación ("Vinculado · email@gmail.com" o "Sin cuenta")
- Por cada VIP sin vincular: input de email → busca en `auth.users` → preview del usuario → botón "Vincular"
- Por cada VIP vinculado: botón "Desvincular" que pone `user_id = NULL`

**API route:** `POST /api/admin/vip-link`
- Body: `{ vip_id, user_email }` para vincular o `{ vip_id, unlink: true }` para desvincular
- Verifica que el requester sea admin (email en lista de admins o `is_admin` en app_metadata)
- Busca el usuario por email en `auth.users` via Supabase service role
- Ejecuta `UPDATE vips SET user_id = $user_id WHERE id = $vip_id`

---

### 2. Reconocimiento automático como VIP

**Mecanismo principal:** Custom Access Token hook en Supabase Auth.
- El hook lee `vips.user_id` y si coincide con `auth.uid()`, inyecta `is_vip: true` y `vip_slug: slug` en `app_metadata`
- El navbar lee `user.app_metadata.is_vip` para mostrar el badge `★ VIP`
- El hook ya existe como Edge Function; solo falta activarlo en Authentication → Hooks en el dashboard

**Fallback (mientras el hook no esté activo):**
- `perfil.astro` ya llama a `getVipForUser(ssrUser.id)` en el server
- El badge y el link "Editar perfil VIP" se derivan de ese resultado

---

### 3. Página `/perfil/editar`

**Archivo:** `src/pages/perfil/editar.astro`

**Acceso:**
- SSR: si no hay sesión → redirect `/login`
- SSR: si hay sesión pero `getVipForUser()` retorna null → redirect `/perfil`

**Componente React:** `src/features/profile/components/VipEditForm.tsx` (`client:load`)

**Campos editables:**

| Campo | Tipo de input | Restricciones |
|---|---|---|
| Avatar | Upload de imagen → Cloudinary | Max 2MB, jpg/png/webp |
| Bio | Textarea | Max 500 chars |
| Juegos favoritos | Tags: input + Enter para agregar, × para eliminar | Max 10 juegos |
| Música | Input texto | Max 100 chars |
| Origin | Input texto | Max 80 chars |
| Links sociales | Lista dinámica (ver abajo) | Max 6 links |

**Links sociales (dinámicos):**
- Botón "Agregar link" agrega una fila con: dropdown de plataforma (YouTube, Twitch, Twitter/X, Instagram, TikTok, Web) + input URL + input label opcional
- Botón × por fila para eliminar
- Sin límite forzado por UI pero máximo 6 (validado en server)

**Avatar upload:**
- Cliente hace `POST` a Cloudinary con `FormData` usando unsigned upload preset
- Cloudinary retorna `secure_url` → se guarda en estado del form, no en DB hasta el submit
- Preview inmediata de la imagen seleccionada

**Submit:**
- `POST /api/vip/update` con JSON: `{ bio, favorite_games, music, origin, avatar, links[] }`
- Server valida JWT, verifica `vips.user_id = auth.uid()`, actualiza la fila
- Para links: `DELETE vip_links WHERE vip_id = $id` + `INSERT` de los links nuevos
- Éxito → redirect a `/vips/[slug]`

---

## RLS policies a crear

```sql
-- vips: el VIP puede actualizar su propia fila
CREATE POLICY "vip_self_update" ON vips
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- vip_links: el VIP puede gestionar sus propios links
CREATE POLICY "vip_links_self_manage" ON vip_links
  FOR ALL USING (
    vip_id IN (SELECT id FROM vips WHERE user_id = auth.uid())
  );
```

---

## Archivos a crear/modificar

| Archivo | Acción |
|---|---|
| `src/pages/perfil/editar.astro` | Nuevo — página SSR con guard de auth + VIP |
| `src/features/profile/components/VipEditForm.tsx` | Nuevo — form React completo |
| `src/pages/api/vip/update.ts` | Nuevo — API route de actualización |
| `src/pages/api/admin/vip-link.ts` | Nuevo — API route de vinculación admin |
| `src/pages/admin.astro` | Modificar — agregar sección de vinculación VIPs |
| `src/pages/perfil.astro` | Modificar — agregar link "Editar perfil VIP" si el usuario es VIP |
| Supabase RLS | Aplicar 2 policies nuevas |

---

## Fuera de scope

- Editar `name`, `slug`, `color`, `role`, `aliases`, `display_order` — solo admins
- Editar datos de la Parsec League
- Historial de cambios / auditoría
