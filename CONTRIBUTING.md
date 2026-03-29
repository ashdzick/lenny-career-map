# Contributing

Thanks for your interest in this project.

## Before you open a PR

1. **Run the app locally:** `npm install` and `npm run dev`.
2. **Lint:** `npm run lint`
3. **Production build (optional but recommended):** `npm run build` — requires `data/paths.json` to exist.

## Where things live

- **UI:** `components/` (start with `CareerMapApp.tsx`).
- **Routes:** `app/` (`page.tsx`, `explore/`, `saved/`).
- **Static path data:** `data/*.json` (see `README.md` for regeneration).
- **Maintainer-oriented notes:** `docs/internal/` (product context, UX principles, handoff). Optional reading for contributors.

## Regenerating content

Path text is **not** generated in the web request. Rebuilding `paths.json` needs a corpus build and API keys — see **Regenerating data** in `README.md`. PRs that only change the Next.js app usually do not need to rerun the full pipeline.

## Style

- Match existing TypeScript, React, and Tailwind patterns in nearby files.
- Prefer focused changes over drive-by refactors unless agreed in an issue.

## Questions

Open an issue in this repository’s issue tracker, or discuss in a fork if you are experimenting before upstreaming.
