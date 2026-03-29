# UI improvement plan

Plan derived from the UX review of the home path experience (`CareerMapApp`) and aligned with [End-user audience & goals](./context.md#end-user-audience--goals): **explore and read** first; **PDF secondary**; audience is tech-savvy and likely Lenny-aware.

## Design principles (for this pass)

1. **Reading is the hero** — Path markdown should feel like the focal column; supporting blocks should read as clearly *secondary* or *grouped*.
2. **One mental model for audio** — Citations vs curated recs stay distinct in *labeling* and *grouping*; avoid two unrelated “podcast” cards.
3. **Discovery without scrolling fatigue** — Related paths and browse affordances should appear where people still have momentum (not only after everything else).
4. **Honest affordances** — If state saves automatically (notes), the UI should not imply a separate “commit” step unless it does something extra.
5. **PDF stays quiet** — Available and discoverable for those who want it; not competing with the read flow in hierarchy.

## Problem summary (from audit)

| Issue | User impact |
|--------|-------------|
| Long single-column stack | Hard to see structure; everything feels same weight |
| Two episode-style lists (`EpisodePlaylist` vs `PodcastRecs`) | Unclear which to use first; possible duplicate feel |
| “Map My Path” after both selects | Extra step; may or may not be worth keeping |
| Save in chips + bookmark control | Two metaphors for one feature |
| Notes + explicit Save | Mismatch with auto-persist via `localStorage` |
| Related paths at bottom | Easy to miss after long read |
| No in-page navigation for long markdown | Harder to scan long paths |

---

## Phase 1 — Quick wins (copy, grouping, light layout)

**Status:** Implemented in the app (grouped Go deeper, path header, notes auto-save UX, quiet PDF). Related paths appear **once** at the end of the path (no duplicate block above the article).

**Goal:** Reduce confusion and scroll fatigue without a full component re-architecture.

| # | Task | Details | Primary files |
|---|------|---------|-----------------|
| 1.1 | **Group “Listen” content** | Wrap `EpisodePlaylist` + `PodcastRecs` in one parent section with a single heading (e.g. “Go deeper”) and **two subheads**: “Articles cited in this path” vs “More episodes to consider”. If only one block exists, show one subhead or omit the wrapper’s dual structure. | `GoDeeperSection.tsx` |
| 1.2 | **Clarify primary path block** | Add a compact **path header** above `LearningPathOutput`: e.g. `From → To` as title line + optional timeline pill. Makes the markdown feel like “the article” not another card. | `CareerMapApp.tsx` or small `PathHeader.tsx` |
| 1.3 | **Notes: auto-save UX** | Remove or demote the **Save** button; use debounced “Saved” / “Saving…” near the label, or only show confirmation on blur. Document that persistence is automatic. | `CareerMapApp.tsx`, `useLocalStorage` usage |
| 1.4 | **PDF demotion** | Style `PDFDownloader` as **tertiary** (text link or outline button), move **below** the grouped Listen section + notes, or into a “More” row. Avoid large centered primary styling. | `CareerMapApp.tsx`, `PDFDownloader.tsx` |
| 1.5 | **Related paths** | **Single** “Also explore” block **after** the main read (end of path). Skipped the earlier experiment with a duplicate strip above the article — it pushed content below the fold. | `CareerMapApp.tsx` |

**Exit criteria:** Users can name what the two listen lists are for; PDF doesn’t read as co-equal to the path; notes don’t imply unsaved work; related paths remain discoverable **after** the article without duplicating that block above the fold.

---

## Phase 2 — Reading ergonomics

**Goal:** Support long paths and Lenny-aware users who want to skim then deep-read.

| # | Task | Details | Primary files |
|---|------|---------|-----------------|
| 2.1 | **Table of contents / anchors** | Generate anchors from markdown `h2`s (extend `LearningPathOutput` renderers with `id`s) + a slim **sticky or inline “On this page”** list on `md+` breakpoints. Hide or collapse on small screens if cluttered. | `LearningPathOutput.tsx`, CSS in `globals.css` or Tailwind |
| 2.2 | **Market signal placement** | Option A: keep above path as “context.” Option B: move into a labeled **sidebar** on wide screens or collapsible “Market context” above the fold. Decide per visual balance after 1.2. | `CareerMapApp.tsx`, `MarketSignal.tsx` |
| 2.3 | **Explore entry point** | Ensure header **Browse all paths** remains visible; optionally add **inline** “See all transitions” after related chips for repeat explorers. | `CareerMapApp.tsx` |

**Exit criteria:** Long sample path is navigable without endless scroll; market signal doesn’t drown out the path title.

---

## Phase 3 — Interaction model cleanup

**Goal:** Fewer redundant actions; clearer save/discover flow.

| # | Task | Details | Primary files |
|---|------|---------|-----------------|
| 3.1 | **Unify save affordance** | Single pattern: e.g. **bookmark in path header** + **saved chips** as history; or chips only + remove duplicate bookmark. Align `aria-label`s and tooltips. | `CareerMapApp.tsx` |
| 3.2 | **Map My Path vs auto-load** | Prototype **auto-load** when both selects are valid (with debounce), **or** keep submit but rename to **“Show path”** and add helper text (“Pick both roles to load”). Measure preference / complexity. | `CareerMapApp.tsx` |
| 3.3 | **Explore page parity** | Match any new typography/header patterns from home so `/explore` feels like the same product. | `app/explore/page.tsx` |

**Exit criteria:** One obvious way to save; path loading behavior matches copy and expectations.

---

## Phase 4 — Optional polish (if needed)

- **Tabs** (“Overview” vs “Listen” vs “Notes”) — only if Phase 1 grouping still feels heavy.
- **Sticky subheader** on scroll (path title + save + jump links) — after TOC exists.
- **Empty states** for Listen section when both lists empty (single line: “No extra episodes linked for this path yet”).
- **Analytics** (if you add tooling): time on path, clicks to citations, explore clicks — to validate Phase 2–3.

---

## Suggested order of execution

1. Phase 1.2 + 1.1 (path reads as primary; listen confusion reduced)  
2. Phase 1.3 + 1.4 (honest persistence; PDF secondary)  
3. Phase 2.1 (TOC / scan — related paths stay end-of-page only)  
4. Phase 2.2–2.3 and Phase 3 as bandwidth allows  

---

## Files likely touched (checklist)

- `components/CareerMapApp.tsx` — layout, order, headers, save/PDF/related  
- `components/LearningPathOutput.tsx` — heading `id`s, TOC hook  
- `components/EpisodePlaylist.tsx` / `PodcastRecs.tsx` — headings only if not wrapped by parent  
- `components/PDFDownloader.tsx` — visual weight  
- `components/MarketSignal.tsx` — optional layout class props  
- `app/explore/page.tsx` — visual parity  
- `app/globals.css` — sticky TOC / anchor offset if needed  

---

## Out of scope (for this plan)

- Changing path **generation** or JSON schema  
- New routes or corpus work  
- Auth / server-side saved paths  

---

## Reference

- Product context: [`context.md`](./context.md)  
- Live app: [lenny-career-map.vercel.app](https://lenny-career-map.vercel.app/)
