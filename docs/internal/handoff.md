# Handoff notes (for the next session)

Short map of the repo, sharp edges, and where to continue. Pair with [`context.md`](./context.md) (product, audience, **UX principles**). Optional local log: `design-decisions-log.md` (gitignored).

## What this is

Next.js 14 app: **pre-generated** career transition paths from Lenny podcast/newsletter corpus. Live: [lenny-career-map.vercel.app](https://lenny-career-map.vercel.app/). Public overview: [`README.md`](../../README.md).

## Main code paths

| Area | File(s) |
|------|---------|
| Home UI | `components/CareerMapApp.tsx` — role pickers, path output, save/notes/PDF, “Also explore” |
| Path markdown + citations | `components/LearningPathOutput.tsx` |
| **Go deeper** block | `components/GoDeeperSection.tsx` — **Articles cited in this path** (newsletter citations) + **More episodes to consider** (podcasts) |
| Citation checklist | `components/EpisodePlaylist.tsx` (embedded inside Go deeper) |
| Explore index | `app/explore/page.tsx` |
| Data load | `app/page.tsx` — `loadPathsData()`, passes JSON into `CareerMapApp` |
| Static data | `data/paths.json`, `citation-urls.json`, `market-signals.json`, `podcast-recs.json` |
| Regenerate paths | `npm run generate:paths` (needs corpus + `ANTHROPIC_API_KEY`); corpus: `npm run build:corpus` + `GITHUB_TOKEN` |

## Reliability / Next.js gotchas (don’t regress)

1. **Never add a raw `<head>` in `app/layout.tsx`.** Next injects stylesheet `<link>`s into the generated head; a manual `<head>` replaced it and **dropped Tailwind** (broken styling). Put extra global rules in `app/globals.css`.
2. **Home is dynamic:** `app/page.tsx` exports `dynamic = "force-dynamic"` so first HTML isn’t an empty `BAILOUT_TO_CLIENT_SIDE_RENDERING` shell for cold visitors. `CareerMapApp` uses `Suspense` with **`CareerMapLoading`** (inline-styled fallback), not `null`.
3. **`lib/useLocalStorage.ts`:** State initializes to defaults, then **syncs from `localStorage` in `useEffect`** so SSR and first client paint match (avoids hydration errors). Don’t read `localStorage` in `useState`’s initializer on the client.
4. **Role `<select>`s** use **`suppressHydrationWarning`** — URL-driven values can differ from prerender.
5. **PDF:** `dynamic(..., { ssr: false })`; only render after **`mounted`** in `CareerMapApp` to avoid hydration mismatch.
6. **ChevronDown** SVG has explicit **`width`/`height`/inline size** so icons don’t blow up if CSS is late.

## UX / copy conventions

- **Browse all paths** link: **header only** (removed duplicate next to PDF).
- **Go deeper:** first list = **articles** (citations in path copy); second = **podcast** recs (coverage uneven — some routes empty).

## Suggested next work

- Optional UX ideas not yet built: market signal **sidebar / collapsible** on wide screens; **inline “see all transitions”** after related chips; rename `localStorage` keys if completion semantics change further (UI copy already uses “completed”).

## Quick commands

```bash
npm run dev          # local dev
npm run build && npm start   # production locally
npm run preview      # same as build && start (one command)
```
