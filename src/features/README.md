# Features

Cada subcarpeta es una **feature autónoma** del sitio TeamLag.

## Estructura típica

```
features/<nombre>/
├── components/   Astro y React específicos
├── data/         Datos hardcoded (antes de migrar a Supabase)
├── lib/          Lógica de dominio (queries, helpers)
├── stores/       Nanostores específicos
├── types.ts      Interfaces TS del dominio
└── index.ts      Barrel export
```

## Reglas

1. Una feature **puede** importar de `@/shared/*`.
2. Una feature **NO debe** importar directamente de otra feature.
3. `@/shared/*` **NO debe** importar de ninguna feature.
4. `@/pages/*` solo orquesta — no contiene lógica de negocio.

## Features actuales

- **awards** — LAG Awards (categorías, nominados, votación, ganadores)
- **parsec-league** — Liga de fútbol/parsec (equipos, fixture, posiciones, goleadores)
- **historia** — Timeline de la comunidad
- **chatbot** — LAG BOT con Gemini
- **auth** — Login Google OAuth + sesión
- **admin** — Panel de control + changelog Discord
- **profile** — Perfil de usuario + badges/achievements
