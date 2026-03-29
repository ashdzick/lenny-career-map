# Internal todos / backlog

Small follow-ups that are easy to lose while you’re focused on UI or other work.  
(Check items off when done; add new bullets as needed.)

## Data & content

- [ ] **Podcast recs — one empty path:** `Director of UX → Principal PM` (`Director of UX|||Principal PM` in `data/podcast-recs.json`) currently has `[]`. The other **45** paths each have **3** scored episodes with URLs. To fix: re-run `node scripts/generate-podcast-recs.js` after corpus/scoring tweaks, or manually add three objects matching `{ "title", "guest", "url" }` like the other entries.

## UI — Phase 3 remainder ([`ui-improvement-plan.md`](./ui-improvement-plan.md))

- [ ] **3.2 — Load path behavior:** Either **auto-load** when both role selects are valid (debounced), **or** keep submit but rename (e.g. **Show path**) and add short helper copy (“Pick both roles to load”). Primary file: `components/CareerMapApp.tsx`.
- [ ] **3.1 — Save affordance polish:** Quick pass on **bookmark** + **Saved paths →** link: `aria-label`s / tooltips so “save toggle” vs “open saved list” stays obvious. Primary file: `CareerMapApp.tsx`.
- [ ] **3.3 — Explore parity:** Optional spacing/typography pass so `/explore` (and `/saved` if desired) match home header rhythm beyond `ReadingColumnShell`. Files: `app/explore/page.tsx`, `app/saved/page.tsx`.

## UI — Phase 4 optional ([`ui-improvement-plan.md`](./ui-improvement-plan.md))

- [ ] **Tabs** (Overview / Listen / Notes) — only if “Your learning plan” block still feels heavy.
- [ ] **Sticky subheader** on scroll (path title + save + jump links) after TOC exists.
- [ ] **Empty state** for listen section when both article + episode lists are empty (one line of copy instead of hiding the section).
- [ ] **Analytics** (if you add tooling): time on path, citation clicks, explore clicks.
