# How Career Transition Paths Are Generated

This document explains exactly how the learning path content on this site is produced — what sources it draws from, what tools are involved, and how quality is maintained. It is intended as both an internal design reference and source material for a public-facing FAQ.

---

## The Short Version

Every career transition path is authored by a human + AI process that reads actual Lenny's Newsletter content in context and writes grounded guidance. Nothing is fabricated. No path is generated at request time — all 46 are pre-computed and stored as static content.

---

## The Corpus

The source material is **Lenny's Newsletter private archive** — a dataset of 642 entries:

- **345 newsletter articles** — deep-dives, how-tos, and frameworks written by Lenny Rachitsky and guest contributors. These are dense, structured, and highly relevant to specific skills and transitions.
- **297 podcast transcripts** — full conversation transcripts from Lenny's Podcast, with guest names and timestamps. These are conversational and rich in personal experience and career advice.

The corpus is stored as `data/corpus.json` (28MB, excluded from the public repo). Each entry has a `title`, `text` (cleaned plain text), optional `guest` name, and a `date`.

---

## Step 1: Finding the Right Content (Scoring)

When a career transition path is being authored, the first step is surfacing the most relevant corpus entries.

**Script**: `scripts/get-chunks.js "From Role" "To Role"`

**How it scores**:
1. Extracts keywords from both role names (lowercased, stopwords removed, suffix-stemmed — e.g. "engineering" → "engineer")
2. Expands role terms using a static lookup map (e.g. `product` → also matches `pm`, `roadmap`, `prioriti`, `strateg`)
3. Scores each corpus entry by term frequency: how many times do the role keywords appear in the text?
4. Applies a 1.5× weight to target-role terms vs. 1.0× for source-role terms
5. Applies a 5× multiplier for keyword matches in the title or guest name
6. Returns the top 12 entries, printed to stdout as full text

**Limitation**: The TF-based algorithm favors keyword-dense structured articles over conversational transcripts. That's why inline citations in paths tend to be articles — they score higher. Podcast recommendations are handled separately (see below).

---

## Step 2: Authoring the Path (In-Context Writing)

The top 12 corpus chunks are read in full by Claude (Sonnet 4.6). Claude then writes the path markdown grounded in what those chunks actually say.

**What "grounded" means**:
- Every claim in the path traces to something a specific article or transcript says
- Inline citations use the exact title of the source: `[Article or Episode Title]`
- If a topic isn't covered in the available chunks, it's either omitted or flagged as general knowledge rather than invented

**What this is not**:
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

**Script**: `scripts/generate-podcast-recs.js`

**How it works**:
1. Filters the corpus to podcast-only entries (entries with a `guest` field)
2. Applies a junk filter (excludes roundups, year-in-reviews, sponsor posts, admin content)
3. Scores the filtered list using the same TF algorithm
4. Writes the top 3 episodes per path to `data/podcast-recs.json`

These recommendations appear in the grey "Podcast episodes to listen to" panel below the Sources checklist. They are distinct from the inline citations — they represent the best podcast conversations to accompany the path, not the sources the path text was drawn from.

---

## Delivery

All 46 paths are stored as pre-generated markdown in `data/paths.json`. The app reads this file at request time — there are no LLM API calls when a user views a path. This means:

- Fast load times
- No per-request cost
- Content is stable and reviewable
- Paths can be manually edited or corrected without re-running the generation pipeline

---

## Quality Bar

Each path in the current dataset was authored by reading actual corpus chunks and grounding every claim in what those sources say. The generation process was:

1. Run `get-chunks.js` for the path
2. Read the top 12 chunks in a Claude Code session
3. Write the path markdown in-context, citing only what the chunks support
4. Commit the result to `data/paths.json`

Paths were generated in batches of 6–7, committed after each batch, with the corpus read fresh for each batch to avoid citation drift.

---

## Frequently Asked Questions

**Are these paths generated by AI?**
Yes — Claude (Sonnet 4.6) writes the text. But the process is closer to "AI with a research assistant" than "AI making things up." Claude reads actual Lenny's Newsletter content before writing, and every claim is grounded in something a specific article or episode says.

**Do the citations link to real articles?**
Yes. Every bracketed citation in a path is a real Lenny's Newsletter article or episode. Titles are matched to live URLs in a hand-maintained map. If you click a citation and it doesn't load, the URL may have changed — please report it.

**Are podcast recommendations related to the path content?**
They're the top-scoring podcast episodes for that career transition, based on keyword relevance to both roles. They're curated from the same corpus but scored separately from the inline citations.

**Is content generated on demand when I load a path?**
No. All paths are pre-generated and stored as static content. Loading a path makes no AI API calls.

**How often is the content updated?**
The corpus is periodically refreshed as new Lenny's Newsletter content is published. Paths are regenerated when the corpus is significantly updated or when content quality improvements are made.

**Can I request a path that doesn't exist?**
Not currently — the 46 paths are curated based on the most common career transitions Lenny's audience makes. If you have a suggestion, reach out.
