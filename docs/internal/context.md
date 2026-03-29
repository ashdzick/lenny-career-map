# Internal product context

**Who this doc is for:** people building or maintaining this repo — not the polished, public-facing description (that lives in `README.md` and can be refined separately).

## End-user audience & goals

- **Primary audience:** Tech-savvy **job seekers** who are **likely familiar with Lenny’s Newsletter** (or Lenny’s brand). They arrive to **explore what specific career transitions can look like** — concrete paths, not generic advice.
- **Primary success action:** **Exploring the site and reading the content** on each path (overview, gaps, skills, mindset, sources, and supporting podcast material). Design and IA should optimize for **scannable reading**, **trust** that content is grounded in Lenny’s work, and **natural continuation** (related paths, browse-all) — not for a single “export” moment.
- **Secondary action:** **PDF download** is useful but **not** the main job-to-be-done; keep it available without treating it as equal priority to reading and discovery in layout or prominence.

## What this app does

This is a web app built on Lenny’s **Newsletter** and **Podcast** data. Content is ingested and analyzed (including **AI** for predefined career routes — e.g. Director of UX → Director of Product).

For each route, generated output is structured around things like:

- **Career Transition Overview**
- **Gaps to Close**
- **Skills to Build**
- **Mindset Shifts**
- **Sources** drawn from the newsletter (and related corpus)

It also **recommends podcasts** per route. Podcast associations were partly filled **manually per route**, so **not every route will have podcast recommendations**.

## Product behavior (current)

- **Save routes** and **add notes** on a route (client-side persistence).
- **Download a route as a PDF** (secondary to reading; see *End-user audience & goals* above).
- Each route can surface **other routes to explore** (recommendations).
- **Browse all routes/paths** (explore view) in addition to picking from → to on the home experience.

## Implementation notes (high level)

- Paths are **pre-generated** for fixed role pairs and shipped as JSON (`data/paths.json`), not generated on each page load.
- Corpus / transcript pipeline is separate from the Next.js UI; see `README.md` for commands and env vars.
- Planned UI work (UX audit → phased tasks): [`ui-improvement-plan.md`](./ui-improvement-plan.md).
- **Continuing in a new chat:** read [`handoff.md`](./handoff.md) first (code map, gotchas, next steps).
