# VIP Self-Edit & Account Linking — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** VIPs editan su propio perfil (bio, avatar, juegos, links) desde /perfil/editar; admins vinculan cuentas Google a VIPs desde el dashboard.

**Architecture:** RLS en Supabase controla quién puede actualizar qué. API routes server-side validan JWT antes de escribir. VipEditForm React client:load maneja el estado del form + upload a Cloudinary via preset unsigned. Admin dashboard agrega sección de vinculación con vanilla JS.

**Tech Stack:** Astro 5 SSR, React 19, Supabase (service_role para admin, anon+RLS para VIPs), Cloudinary unsigned upload, Tailwind v4.

---

### Task 1: RLS Supabase

**Files:**
- Supabase migration via MCP

- [ ] Aplicar política UPDATE en vips para que el VIP actualice su propia fila
- [ ] Aplicar política ALL en vip_links para que el VIP gestione sus links

### Task 2: `/api/vip/update.ts`

**Files:**
- Create: `src/pages/api/vip/update.ts`

- [ ] Validar JWT con `getSupabase(context).auth.getUser()`
- [ ] Verificar que user_id coincida con el VIP
- [ ] UPDATE vips + DELETE+INSERT vip_links

### Task 3: `/api/admin/vip-link.ts`

**Files:**
- Create: `src/pages/api/admin/vip-link.ts`

- [ ] requireAdmin check
- [ ] POST: buscar user por email, UPDATE vips.user_id
- [ ] DELETE: poner user_id = NULL

### Task 4: `VipEditForm.tsx`

**Files:**
- Create: `src/features/profile/components/VipEditForm.tsx`

- [ ] Estado: bio, games (array), music, origin, avatar (URL actual + File nuevo), links (array)
- [ ] Cloudinary unsigned upload en submit si hay nuevo archivo
- [ ] POST /api/vip/update, redirect a /vips/[slug]

### Task 5: `/perfil/editar.astro`

**Files:**
- Create: `src/pages/perfil/editar.astro`

- [ ] SSR guard: sin sesión → /login, sin VIP → /perfil
- [ ] Pasar vipProfile como prop a VipEditForm

### Task 6: Modificar `perfil.astro`

**Files:**
- Modify: `src/pages/perfil.astro`

- [ ] Si vipProfile existe, mostrar botón "Editar perfil VIP" → /perfil/editar

### Task 7: Admin VIP linking en `admin.astro`

**Files:**
- Modify: `src/pages/admin.astro`

- [ ] HTML: tabla de VIPs con estado de vinculación
- [ ] JS: fetch GET /api/admin/vips, renderizar tabla, acciones de vincular/desvincular
