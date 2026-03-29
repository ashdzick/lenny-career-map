# Lenny’s Career Map

A Next.js app that serves **pre-generated career transition learning paths** (from role A → role B). Paths are grounded in transcript excerpts from [Lenny Rachitsky’s podcast](https://www.lennysnewsletter.com/) and ship as static JSON so the site stays fast and cheap to host.

**Live site:** [lenny-career-map.vercel.app](https://lenny-career-map.vercel.app/)  
**Source:** [github.com/ashdzick/lenny-career-map](https://github.com/ashdzick/lenny-career-map)

## License

The **code in this repository** is licensed under [MIT-0](LICENSE) (MIT No Attribution): use it freely; no copyright notice is required in copies.

This is a **community / independent** project. **Path text, citations, and recommendations in `data/`** are derived from Lenny’s podcast and related public material (plus tooling such as AI-assisted generation). That content is **not** claimed as personal intellectual property by the maintainers; it remains subject to the underlying sources and sites. See below for trademarks.

## Trademarks and content

“Lenny’s Newsletter,” podcast names, and related branding are properties of their respective owners. This project is **not** affiliated with or endorsed by Lenny Rachitsky or his newsletter unless explicitly stated elsewhere by those parties.

Third-party URLs and episode metadata remain subject to their original sites’ terms.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security-sensitive reports: see [SECURITY.md](SECURITY.md).

## Requirements

- **Node.js** (LTS recommended)
- **npm**

Running the **data pipeline** (optional for UI-only work) also needs:

- **`GITHUB_TOKEN`** — for cloning the private transcript repository (see [Regenerating data](#regenerating-data))
- **`ANTHROPIC_API_KEY`** — for regenerating paths with Claude

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page reads `data/paths.json` and related JSON files at build/request time.

```bash
npm run build   # production build
npm start       # run production server locally
```

**Production builds** expect `data/paths.json` to exist. If it is missing, `next.config.mjs` throws so you do not deploy without paths.

## Regenerating data

Paths are **not** generated at request time. The route under `app/api/generate` returns a short JSON message only; content is produced **offline** and committed (or deployed) with the repo.

### 1. Build the corpus

Clones the configured GitHub repo of podcast transcripts into `.tmp/transcripts` and writes `data/corpus.json` (gitignored; large).

```bash
GITHUB_TOKEN=ghp_xxx npm run build:corpus
```

Optional overrides (defaults match `scripts/build-corpus.js`):

- `TRANSCRIPT_REPO_OWNER` (default: `LennysNewsletter`)
- `TRANSCRIPT_REPO_NAME` (default: `lennys-newsletterpodcastdata-all`)

The token must have access to that repository.

### 2. Generate paths

Uses the corpus and Anthropic’s API to fill `data/paths.json` for every transition listed in `scripts/generate-paths.js`.

```bash
ANTHROPIC_API_KEY=sk-ant-xxx npm run generate:paths
```

Requires a successful corpus build first.

### Other scripts

The `scripts/` folder includes additional one-off and batch writers (`write-paths-*.js`, `dump-all-contexts.js`, etc.) used while iterating on data. Prefer `npm run generate:paths` for the full pipeline unless you know you need a specific script.

## Data files (`data/`)

| File | Purpose |
|------|---------|
| `paths.json` | Role-pair keys (`from|||to`) → markdown path + metadata |
| `citation-urls.json` | Citation URL map for the UI |
| `market-signals.json` | Market signal copy (+ optional `_sourceUrl`) |
| `podcast-recs.json` | Podcast recommendations by key |
| `corpus.json` | Built transcript corpus (large; from `build:corpus`; **gitignored**) |

Smaller or auxiliary files (e.g. `all-contexts.json`) may be used by scripts during generation.

## Maintainer docs

Product context, UX phases, and handoff notes live under [`docs/internal/`](docs/internal/README.md). They are not required to run the app.

## App layout

| Path | Role |
|------|------|
| `app/page.tsx` | Home: loads JSON, renders `CareerMapApp` |
| `app/explore/page.tsx` | Browse transitions by source role |
| `components/CareerMapApp.tsx` | Main UI: role pickers, path output, saved paths, notes |
| `components/LearningPathOutput.tsx` | Renders path markdown |
| `components/PDFDownloader.tsx` | Client-only PDF export |
| `lib/roleGroups.ts` | Role grouping for navigation |
| `next.config.mjs` | Production guard + trace includes for `data/*.json` |

## Tech stack

- Next.js 14, React 18, TypeScript, Tailwind CSS
- `react-markdown` + `remark-gfm` for path rendering
- `html2canvas` + `jspdf` for PDF
- `@anthropic-ai/sdk` for offline path generation
- `simple-git` + `gray-matter` for corpus build

Dependencies are subject to their own licenses (see each package in `node_modules`).

## Repo maintenance (maintainers)

1. In **Settings → General**, tune description and topics; consider **Private vulnerability reporting** (see [SECURITY.md](SECURITY.md)).
2. Confirm **no secrets** are in history (`git log -p`, search for tokens). Rotate any keys that ever leaked.
3. Optional: issue/PR templates under `.github/` when outside contributors show up.
4. Run `npm audit` and address or document any findings you accept as risk.
5. `package.json` keeps `"private": true` so `npm publish` is blocked; that is intentional for an app repo.
