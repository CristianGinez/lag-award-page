# Feature: bot-admin

Dashboard para gestionar el TeamLag Discord Bot desde la web, sin SSH ni `convex run`.

## Propósito

Permite a los admins (LAG, Cristian) configurar el bot de Discord a través de `/admin/bot`.

## Conexión con el bot

El bot corre en Oracle Cloud y usa **Convex** (`exciting-cow-134.convex.cloud`) como backend.
Esta feature consume la API HTTP de Convex:

- **Queries** (lectura): `ConvexHttpClient.query()` — no requieren auth
- **Mutations/actions** (escritura): pasan por endpoints propios de Astro (`/api/bot/*`)
  que verifican `user.app_metadata.is_admin` antes de forwarding a Convex con `CONVEX_DEPLOY_KEY`

`CONVEX_DEPLOY_KEY` **nunca llega al bundle del cliente** — solo existe en SSR.

## Variables de entorno requeridas

```
PUBLIC_CONVEX_URL=https://exciting-cow-134.convex.cloud
CONVEX_DEPLOY_KEY=<obtener con `npx convex auth` en el repo tlag-discord-bot>
```

## Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/admin/bot` | `index.astro` | Overview: stats rápidas |
| `/admin/bot/streamers` | `StreamersManager.tsx` | CRUD streamers Twitch/YouTube |
| `/admin/bot/canales` | `ChannelsManager.tsx` | Modo, cooldown, personalidad por canal |
| `/admin/bot/miembros` | `MembersTable.tsx` | Lista de miembros (solo lectura) |
| `/admin/bot/reaction-roles` | `ReactionRolesManager.tsx` | CRUD reaction roles |
| `/admin/bot/personalidad` | `PersonalityView.tsx` | Ver personalidad + re-aprender |
| `/admin/bot/auditoria` | `auditoria.astro` | Últimas 50 intervenciones del bot |

## Agregar una nueva sección

1. Identificar la tabla Convex y sus funciones (`query`/`mutation`/`action`)
2. Si necesita escritura: agregar un endpoint en `src/pages/api/bot/<nombre>.ts`
   - Copiar el patrón de `streamers.ts` (GET para lectura, POST para mutaciones)
   - Usar `requireAdmin()` en ambos
3. Crear componente React en `src/features/bot-admin/components/`
4. Crear página en `src/pages/admin/bot/<nombre>.astro`
5. Agregar el tab en `BotAdminLayout.astro` (array `tabs`)

## Seguridad

- Todas las páginas `/admin/bot/**` hacen `getSupabase(Astro).auth.getUser()` server-side
- Si `user.app_metadata.is_admin !== true` → redirect a `/`
- Las mutaciones requieren además el `CONVEX_DEPLOY_KEY` (server-only)
