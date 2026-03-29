# Internal todos / backlog

Small follow-ups that are easy to lose while you’re focused on UI or other work.  
(Check items off when done; add new bullets as needed.)

## Data & content

- [ ] **Podcast recs — one empty path:** `Director of UX → Principal PM` (`Director of UX|||Principal PM` in `data/podcast-recs.json`) currently has `[]`. The other **45** paths each have **3** scored episodes with URLs. To fix: re-run `node scripts/generate-podcast-recs.js` after corpus/scoring tweaks, or manually add three objects matching `{ "title", "guest", "url" }` like the other entries.

## UI — done (kept for history)

- [x] **Load path behavior:** **Auto-load** when both role selects are valid (~320ms debounce), URL stays in sync. Removed **Map My Path** submit. Primary file: `components/CareerMapApp.tsx`.
- [x] **Save affordance polish:** **Bookmark** `title` + clearer `aria-label`s; **Browse all** / **Saved N paths** links get `title` + `aria-label`. Primary file: `CareerMapApp.tsx`.
- [x] **Explore parity:** `/explore` and `/saved` use the same header nav rhythm as home (`nav` + `gap-x-4` + link styles); **Home →** (and **Browse all paths →** on saved). Files: `app/explore/page.tsx`, `app/saved/page.tsx`.

## UI — optional polish

- [ ] **Tabs** (Overview / Listen / Notes) — only if “Your learning plan” block still feels heavy.
- [ ] **Sticky subheader** on scroll (path title + save + jump links) after TOC exists.
- [ ] **Empty state** for listen section when both article + episode lists are empty (one line of copy instead of hiding the section).
- [ ] **Analytics** (if you add tooling): time on path, citation clicks, explore clicks.
