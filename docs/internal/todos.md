# Internal todos / backlog

Small follow-ups that are easy to lose while you’re focused on UI or other work.  
(Check items off when done; add new bullets as needed.)

## Data & content

- [x] **Podcast recs — one empty path:** `Director of UX → Principal PM` had `[]` because `kw()` dropped every token (`director`/`principal` = noise; `ux`/`pm` below the old 3-character minimum). Fixed by allowing a small `SHORT_ROLE` set (`ux`, `pm`, …) in `kw()` in `scripts/generate-podcast-recs.js`, `get-chunks.js`, and `dump-all-contexts.js`, then re-running `npm run generate:podcast-recs`.

## UI — done (kept for history)

- [x] **Load path behavior:** **Auto-load** when both role selects are valid (~320ms debounce), URL stays in sync. Removed **Map My Path** submit. Primary file: `components/CareerMapApp.tsx`.
- [x] **Save affordance polish:** **Bookmark** `title` + clearer `aria-label`s; **Browse all** / **Saved N paths** links get `title` + `aria-label`. Primary file: `CareerMapApp.tsx`.
- [x] **Explore parity:** `/explore` and `/saved` use the same header nav rhythm as home (`nav` + `gap-x-4` + link styles); **Home →** (and **Browse all paths →** on saved). Files: `app/explore/page.tsx`, `app/saved/page.tsx`.
