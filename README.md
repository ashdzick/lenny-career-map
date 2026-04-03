# Lenny's Career Map

Get a personalized career transition roadmap — grounded in real advice from [Lenny Rachitsky's podcast](https://www.lennysnewsletter.com/) — for free, instantly.

**Live site:** [lenny-career-map.vercel.app](https://lenny-career-map.vercel.app/)
**Source:** [github.com/ashdzick/lenny-career-map](https://github.com/ashdzick/lenny-career-map)

---

## Using the site

No sign-up or setup needed. Just visit the [live site](https://lenny-career-map.vercel.app/) and:

1. **Pick your current role** from the "From" dropdown
2. **Pick your target role** from the "To" dropdown
3. **Read your path** — a detailed guide covering skill gaps to close, practical steps, timelines, and podcast episodes to listen to
4. **Save paths** you want to revisit (stored in your browser)
5. **Add notes** to any path, or **download it as a PDF**

## What's covered

46 transitions across five role categories:

| Category | Roles |
|----------|-------|
| **Business** | Account Executive, Business Analyst, Chief of Staff, Chief Marketing Officer, Management Consultant, Marketing Manager |
| **Data** | Data Analyst, Data Scientist |
| **Design & Research** | Director of UX, Product Designer, UX Lead, UX Researcher |
| **Engineering** | AI Engineer, Engineering Manager, Software Engineer, Staff Engineer |
| **Product** | AI PM, Chief Product Officer, Founder / CEO, Growth Manager, Product Manager |

Example paths: Software Engineer → Product Manager, Data Scientist → Growth Manager, Management Consultant → Founder / CEO, Product Designer → Product Manager.

Use the [Explore page](https://lenny-career-map.vercel.app/explore) to browse all available transitions by source role.

## How it works

Each learning path is grounded in transcript excerpts from Lenny's podcast, then generated offline using Claude. Paths ship as static JSON files so the site is fast and has no AI cost at runtime — what you see was carefully produced ahead of time, not improvised on demand.

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build (requires data/paths.json)
npm start          # run production server locally
```

Production builds require `data/paths.json` to exist. If it's missing, `next.config.mjs` throws an error so you can't accidentally deploy without content.

**Requirements:** Node.js (LTS), npm.

For offline regeneration, copy [`.env.local.example`](.env.local.example) to `.env.local` and fill in tokens (see **Regenerating data**). `.env.local` is gitignored.

## Regenerating data

Paths are produced offline and committed to the repo — the API route under `app/api/generate` is a stub only (see **Generating paths on demand** below if you want a real endpoint). To regenerate:

### 1. Build the corpus

Clones the podcast transcript repository and writes `data/corpus.json` (gitignored; large).

```bash
GITHUB_TOKEN=ghp_xxx npm run build:corpus
```

Optional env overrides (defaults in `scripts/build-corpus.js`):
- `TRANSCRIPT_REPO_OWNER` (default: `LennysNewsletter`)
- `TRANSCRIPT_REPO_NAME` (default: `lennys-newsletterpodcastdata-all`)

### 2. Generate paths

Uses the corpus and Claude to write `data/paths.json` for every transition.

```bash
ANTHROPIC_API_KEY=sk-ant-xxx npm run generate:paths
```

Requires a successful corpus build first. For podcast recommendations, run `npm run generate:podcast-recs` (requires `data/corpus.json` and `data/paths.json`; see [`docs/HOW_PATHS_ARE_GENERATED.md`](docs/HOW_PATHS_ARE_GENERATED.md)). Optional helpers in `scripts/` for debugging the corpus: `get-chunks.js`, `dump-all-contexts.js`.

## Generating paths on demand (API hookup)

This app **does not** call an LLM in production. Everything in [`data/paths.json`](data/paths.json) is precomputed. If you want **live** generation instead (or as a fallback for new role pairs), the rough shape is:

1. **Server-only API key** — Put `ANTHROPIC_API_KEY` (or another provider) in **server** env (e.g. Vercel project settings). Never expose it to the browser.
2. **Reuse the offline pipeline logic** — [`scripts/generate-paths.js`](scripts/generate-paths.js) already scores episodes from `corpus.json`, builds a prompt, and calls the Anthropic SDK. Extract the “score excerpts → build messages → call API → return markdown” steps into a **shared module** you can import from a **Next.js Route Handler** (e.g. replace or extend the stub at [`app/api/generate/route.ts`](app/api/generate/route.ts)).
3. **Corpus on the server** — The generator expects transcript data. Either keep `corpus.json` on the server (not in the client bundle), load it inside the route, or swap in your own RAG/source.
4. **Wire the UI** — [`app/page.tsx`](app/page.tsx) currently reads static JSON and passes `PathsData` into [`CareerMapApp`](components/CareerMapApp.tsx). For on-demand paths, add a client `fetch` to your route when the user picks a pair that isn’t in `paths`, then set the returned markdown (and any citation URLs) into the same props shape the component already expects.

Expect **latency, cost, and rate limits** per request; consider caching responses by `from|||to` if you open this up publicly.

## Project structure

| Path | Role |
|------|------|
| `app/page.tsx` | Home: loads JSON, renders `CareerMapApp` |
| `app/explore/page.tsx` | Browse transitions by source role |
| `components/CareerMapApp.tsx` | Main UI: role pickers, path output, saved paths, notes |
| `components/LearningPathOutput.tsx` | Renders path markdown |
| `components/PDFDownloader.tsx` | Client-only PDF export |
| `lib/roleGroups.ts` | Role grouping for navigation |
| `next.config.mjs` | Production guard + trace includes for `data/*.json` |

## Data files

| File | Purpose |
|------|---------|
| `paths.json` | Role-pair keys (`from\|\|\|to`) → markdown path + metadata |
| `citation-urls.json` | Citation URL map for the UI |
| `market-signals.json` | Market signal copy (+ optional `_sourceUrl`) |
| `podcast-recs.json` | Podcast recommendations by key |
| `corpus.json` | Built transcript corpus (large; **gitignored**) |

## Tech stack

- Next.js 14, React 18, TypeScript, Tailwind CSS
- `react-markdown` + `remark-gfm` for path rendering
- `html2canvas` + `jspdf` for PDF export
- `@anthropic-ai/sdk` for offline path generation
- `simple-git` + `gray-matter` for corpus build

For security issues, see [SECURITY.md](SECURITY.md).

Internal product context and handoff notes live under [`docs/internal/`](docs/internal/README.md).

## License & trademarks

The **code** is licensed under [MIT-0](LICENSE) (MIT No Attribution) — use freely, no copyright notice required.

**Path content** in `data/` is derived from Lenny's podcast and AI-assisted generation. It is not claimed as personal intellectual property by the maintainers; it remains subject to the underlying sources.

"Lenny's Newsletter," podcast names, and related branding are properties of their respective owners. This project is **not** affiliated with or endorsed by Lenny Rachitsky or his newsletter unless explicitly stated by those parties. Third-party URLs and episode metadata remain subject to their original sites' terms.
