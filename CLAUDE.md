# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (port 4321)
npm run build      # Production build
npm run preview    # Preview production build
npx astro check    # TypeScript type-check all .astro files
```

No test suite is configured. Type-checking with `astro check` is the primary static verification.

## Architecture

**Stack:** Astro 5 SSR + React 19 + Tailwind v4 + Supabase + Vercel adapter

All output is server-rendered (`output: 'server'`). Pages are routing-only — business logic lives in features.

### Feature structure

```
src/
  features/
    awards/       - LAG AWARDS voting: categories data, nominees, VoteButton/VoteContainer
    parsec-league/ - football league: tables, fixtures, scorers, editions
    chatbot/      - LAG BOT (Gemini 2.0 Flash), rate-limited via Upstash
    auth/         - Supabase client + nanostores authStore
    admin/        - admin stats + Supabase Edge Function calls
    profile/      - user profile display
  shared/
    lib/          - events catalog, Redis/cache helpers, OG image utils
    ui/           - generic React components (AudioPlayer, VideoPlayer, MediaDisplay)
    components/   - Astro components (Hero, TlagImage, EventNavbar)
    stores/       - nanostores (playerStore, uiStore)
  layouts/        - Layout.astro (base shell), Navbar.astro, Footer.astro
  pages/          - thin routing layer only; API routes under pages/api/
  content/        - Astro content collections: history (JSON), faq (MDX), legal (MDX)
```

### Path aliases (tsconfig.json)

- `@/*` → `src/*`
- `@/features/*` → `src/features/*`
- `@/shared/*` → `src/shared/*`
- `@/layouts/*` → `src/layouts/*`

### Key data flows

**Voting:** `VoteButton` (React) → `features/awards/lib/voting.ts` → Supabase Edge Function `vote` (requires user JWT). Vote counts come from Supabase RPC functions (`get_vote_counts`, `get_category_vote_counts`, `get_event_winners`).

**Auth:** Two Supabase clients in `features/auth/lib/supabase.ts`:
- `supabase` — browser client (CSR, used by authStore and React components)
- `getSupabase(context)` — SSR client that passes request cookies (used in Astro frontmatter)

Auth state is held in nanostores `$currentUser` atom; React components read it with `@nanostores/react`.

**Chatbot:** `POST /api/chat` → thin shim → `features/chatbot/api/chat.ts` → Google Gemini API. Rate-limited at 10 req/min per IP via Upstash Redis.

**Cache:** `shared/lib/cache.ts` wraps Upstash Redis (`getCached`, `invalidateCache`). Cache invalidation is exposed at `POST /api/internal/invalidate` (protected by `INTERNAL_INVALIDATE_SECRET` header).

**OG images:** Dynamic PNG endpoints at `/og/default.png`, `/og/categoria/[id].png`, `/og/evento/[slug].png` using `@vercel/og`. Helpers in `shared/lib/og.ts` and `shared/lib/ogFonts.ts`.

**Events catalog:** `shared/lib/events.ts` is the single source of truth for event IDs, slugs, and status. Add new events here first.

**Content collections:** `history` (JSON timeline entries), `faq` (MDX), `legal` (MDX). Schema defined in `src/content/config.ts`.

### Required environment variables

```
PUBLIC_SUPABASE_URL
PUBLIC_SUPABASE_ANON_KEY
GEMINI_API_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
INTERNAL_INVALIDATE_SECRET
```

Redis/rate-limit silently degrades in dev if Upstash vars are missing.

### Supabase Edge Functions

Called directly from the client/server with a user Bearer token:
- `vote` — casts a vote (checks `is_voting_open` on the event row)
- `admin-reset-votes` — archives and clears all votes (admin-only)

To open/close voting: set `is_voting_open = true/false` on the relevant row in the `events` table. The current awards event ID is `856a7c16-5436-4776-a844-04dcaafb4656`.
