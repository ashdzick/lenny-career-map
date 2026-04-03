# How Career Transition Paths Are Generated

This document explains exactly how the learning path content on this site is produced — what sources it draws from, what tools are involved, and how quality is maintained. It is intended as both an internal design reference and source material for a public-facing FAQ.

---

## The Short Version

Every career transition path is authored by a human + AI process that reads actual Lenny's Newsletter content in context and writes grounded guidance. Nothing is fabricated. No path is generated at request time — all paths are pre-computed and stored as static content.

---

## The Corpus

The source material is **Lenny's Newsletter private archive** — a dataset of 642 entries:

- **345 newsletter articles** — deep-dives, how-tos, and frameworks written by Lenny Rachitsky and guest contributors. These are dense, structured, and highly relevant to specific skills and transitions.
- **297 podcast transcripts** — full conversation transcripts from Lenny's Podcast, with guest names and timestamps. These are conversational and rich in personal experience and career advice.

**Building the file:** Run `npm run build:corpus` (`scripts/build-corpus.js`). It clones the markdown archive with `GITHUB_TOKEN` (default repo `LennysNewsletter/lennys-newsletterpodcastdata-all`; override with `TRANSCRIPT_REPO_OWNER` / `TRANSCRIPT_REPO_NAME`), parses every `.md` file, and writes `data/corpus.json` (~28MB, **gitignored**, not shipped in the public app repo).

Each corpus entry has `id`, `title`, `text` (cleaned plain text), optional `guest`, and `sparse` (true when the body is very short after cleaning).

---

## Which transitions exist (curated, not “scored into existence”)

The **set of role pairs** on the site is a **curated** list. It was chosen by **exploring the archive** (including with Claude) to see which careers and moves show up often enough to warrant a full path — not by running the keyword scorer once and promoting “whatever scored highest” as the product grid.

The shipped paths live in `data/paths.json`. **`scripts/generate-paths.js`** also contains a `TRANSITIONS` array: the automated generator only processes pairs listed there. If `paths.json` includes transitions that are missing from `TRANSITIONS`, they were authored or merged separately; add them to `TRANSITIONS` if you want the script to regenerate them in the loop.

---

## Step 1: Finding the Right Content (Scoring)

When a path is being authored, the first step is surfacing the most relevant corpus entries for that **fixed** from/to pair.

**Script**: `scripts/get-chunks.js "From Role" "To Role"`

**How it scores**:
1. Extracts keywords from both role names (lowercased, stopwords removed, suffix-stemmed — e.g. "engineering" → "engineer")
2. Expands role terms using a static lookup map (e.g. `product` → also matches `pm`, `roadmap`, `prioriti`, `strateg`)
3. Scores each corpus entry by term frequency: how many times do the role keywords appear in the text?
4. Applies a 1.5× weight to target-role terms vs. 1.0× for source-role terms
5. Applies a 5× multiplier for keyword matches in the title or guest name
6. Prints the top **12** entries to stdout as plain text

**Important:** This step does **not** apply the roundup / “best of” junk filter. The same is true of the scoring inside **`scripts/generate-paths.js`**, which takes the top **15** excerpts per transition. A compilation-style episode can still rank highly if it is keyword-dense. **Excluding** those from the **written guide** is a **curation / QA** choice when authoring, unless you add an explicit filter to excerpt selection in code.

**Limitation:** The TF-based algorithm favors keyword-dense structured articles over conversational transcripts. That's why inline citations in paths tend to be articles — they score higher. Podcast recommendations are handled separately (see below).

---

## Step 2: Authoring the Path (In-Context Writing)

The top corpus chunks are read by **Claude** (e.g. Sonnet), which writes path markdown grounded in what those chunks actually say.

**Two ways this repo supports authoring:**

1. **Interactive (original quality bar):** Run `get-chunks.js` for a pair, paste the top chunks into a Claude session, and write or revise the path in context. Paths were often done in **batches of 6–7** transitions per session to stay within context limits, with the corpus refreshed between batches to limit citation drift.
2. **Automated loop:** `npm run generate:paths` (`scripts/generate-paths.js`) loads `data/corpus.json`, scores the top **15** entries per transition, sends truncated excerpts to the Anthropic API **one transition per request** (with a short delay between calls), and appends to `data/paths.json` (skipping keys that already exist). Model id is defined in that script (e.g. `claude-sonnet-4-20250514` — update there when bumping API versions).

**What "grounded" means:**
- Every claim in the path traces to something a specific article or transcript says
- Inline citations use the exact title of the source: `[Article or Episode Title]`
- If a topic isn't covered in the available chunks, it's either omitted or flagged as general knowledge rather than invented

**What this is not:**
- Not generated at request time from a prompt
- Not produced by asking a model to "write a career guide for X to Y" from scratch
- Not hallucinated citations to articles that don't exist

**Output structure** for every path:
1. **Career Transition Overview** — what makes this move natural or hard, and realistic timeline
2. **Gaps to Close** — the specific capability delta between the two roles, cited to sources
3. **Skills to Build** — prioritized list, each grounded in a specific episode or article
4. **Mindset Shifts** — 2–4 "From X → To Y" reframes, drawn from what sources actually say

---

## Step 3: Inline Citations → URLs

Every `[Title]` in the path markdown is matched against `data/citation-urls.json` — a hand-maintained map of article/episode titles to their Lenny's Newsletter URLs. When a path is rendered, each citation becomes a clickable external link.

If a citation title isn't in the URL map, it renders as plain text without a link. New citations are added to the map as new paths are authored.

---

## Step 4: Podcast Recommendations (Separate Track)

Because the scoring algorithm favors articles over transcripts, podcast episodes get their own recommendation track.

**Script**: `npm run generate:podcast-recs` (or `node scripts/generate-podcast-recs.js`)

**How it works**:
1. Filters the corpus to podcast-only entries (entries with a `guest` field)
2. Applies a **junk filter** (excludes roundups, year-in-reviews, sponsor posts, admin-style titles, etc.) — **this filter applies here only**, not to Step 1 excerpt selection
3. Scores the filtered list using the same TF-style algorithm (with a two-pass strategy: up to 4 episodes weighted for both roles, then up to 2 more from-role-focused picks)
4. Writes results per path key to `data/podcast-recs.json` (typically **up to six** episodes per path)

These recommendations appear in the grey "Podcast episodes to listen to" panel below the Sources checklist. They are distinct from the inline citations — they represent the best podcast conversations to accompany the path, not necessarily the same sources the path prose was drawn from.

---

## Market signals (UI only)

`data/market-signals.json` holds short copy about **market / role outlook** keyed by **target role**. The Next.js app merges it into the path view when present. **No script under `scripts/` reads this file for generation** — it is not passed into Claude by the automated path pipeline unless you paste it manually during authoring.

---

## Delivery

All paths are stored as pre-generated markdown in `data/paths.json`. The app reads this file at request time — there are no LLM API calls when a user views a path. This means:

- Fast load times
- No per-request cost
- Content is stable and reviewable
- Paths can be manually edited or corrected without re-running the generation pipeline

---

## Quality Bar

Each path in the current dataset was authored by reading actual corpus chunks and grounding every claim in what those sources say. The intended workflow is:

1. Run `get-chunks.js` for the path (or rely on the same scoring inside `generate-paths.js`)
2. Review excerpts; drop or replace poor sources (e.g. roundup episodes) when shipping polished copy
3. Write or regenerate the path markdown in context with Claude, citing only what the chunks support
4. Commit the result to `data/paths.json` and keep `citation-urls.json` / `podcast-recs.json` in sync as needed

---

## Frequently Asked Questions

**Are these paths generated by AI?**
Yes — Claude writes the text. But the process is closer to "AI with a research assistant" than "AI making things up." Claude reads actual Lenny's Newsletter content before writing, and every claim is grounded in something a specific article or episode says.

**Do the citations link to real articles?**
Yes. Every bracketed citation in a path is a real Lenny's Newsletter article or episode. Titles are matched to live URLs in a hand-maintained map. If you click a citation and it doesn't load, the URL may have changed — please report it.

**Are podcast recommendations related to the path content?**
They're the top-scoring podcast episodes for that career transition (after the junk filter), based on keyword relevance to both roles. They're curated from the same corpus but scored separately from the inline citations.

**Is content generated on demand when I load a path?**
No. All paths are pre-generated and stored as static content. Loading a path makes no AI API calls.

**How often is the content updated?**
The corpus is periodically refreshed as new Lenny's Newsletter content is published. Paths are regenerated when the corpus is significantly updated or when content quality improvements are made.

**Can I request a path that doesn't exist?**
Not currently — the paths are a **curated** set based on what the maintainers chose to cover after exploring the archive and product scope. If you have a suggestion, reach out.
