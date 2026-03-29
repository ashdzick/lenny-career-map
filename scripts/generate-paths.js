#!/usr/bin/env node
// generate-paths.js
// Pre-generates career transition learning paths for all defined role pairs.
// Writes results to data/paths.json as a static asset.
//
// Run: ANTHROPIC_API_KEY=sk-ant-xxx node scripts/generate-paths.js
// Requires corpus to already exist: npm run build:corpus

"use strict";

const fs = require("fs");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

// ---------------------------------------------------------------------------
// Role transitions to pre-generate
// ---------------------------------------------------------------------------
const TRANSITIONS = [
  // From Engineering
  { from: "Software Engineer", to: "Product Manager" },
  { from: "Software Engineer", to: "Engineering Manager" },
  { from: "Software Engineer", to: "Founder / CEO" },
  { from: "Software Engineer", to: "Data Scientist" },
  { from: "Software Engineer", to: "Product Designer" },

  // From Engineering Management
  { from: "Engineering Manager", to: "VP of Engineering / CTO" },
  { from: "Engineering Manager", to: "Product Manager" },
  { from: "Engineering Manager", to: "Founder / CEO" },

  // From Product Management
  { from: "Product Manager", to: "Founder / CEO" },
  { from: "Product Manager", to: "Chief Product Officer" },
  { from: "Product Manager", to: "Growth Manager" },
  { from: "Product Manager", to: "Engineering Manager" },

  // From Design
  { from: "Product Designer", to: "Product Manager" },
  { from: "Product Designer", to: "UX Researcher" },
  { from: "UX Researcher", to: "Product Designer" },
  { from: "UX Researcher", to: "Product Manager" },

  // From Data
  { from: "Data Analyst", to: "Product Manager" },
  { from: "Data Analyst", to: "Data Scientist" },
  { from: "Data Analyst", to: "Growth Manager" },
  { from: "Data Scientist", to: "Product Manager" },
  { from: "Data Scientist", to: "Engineering Manager" },

  // From Marketing / Growth
  { from: "Marketing Manager", to: "Growth Manager" },
  { from: "Marketing Manager", to: "Product Manager" },
  { from: "Marketing Manager", to: "Founder / CEO" },
  { from: "Growth Manager", to: "Chief Marketing Officer" },
  { from: "Growth Manager", to: "Product Manager" },

  // From Sales
  { from: "Account Executive", to: "Product Manager" },
  { from: "Account Executive", to: "Founder / CEO" },
  { from: "Account Executive", to: "Marketing Manager" },

  // From Consulting / Strategy
  { from: "Management Consultant", to: "Product Manager" },
  { from: "Management Consultant", to: "Founder / CEO" },
  { from: "Management Consultant", to: "Chief of Staff" },
  { from: "Business Analyst", to: "Product Manager" },
  { from: "Business Analyst", to: "Data Analyst" },
  { from: "Chief of Staff", to: "Product Manager" },
  { from: "Chief of Staff", to: "Founder / CEO" },

  // Into / From Founder
  { from: "Chief Product Officer", to: "Founder / CEO" },
];

// ---------------------------------------------------------------------------
// System prompt (same as runtime version)
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are a career transition advisor with deep knowledge of how successful professionals change roles. You have been given a set of transcript excerpts from Lenny Rachitsky's podcast. Your job is to produce a structured, honest learning path for a specific career transition.

GROUND RULES — READ CAREFULLY:
- Every claim you make about skills, gaps, or mindset must be traceable to the provided transcript excerpts.
- When you cite an episode, use this exact format: [Episode Title — Guest Name]
- If the transcripts do not cover a particular skill or topic well, say so plainly. Do not fabricate advice or pretend a topic was covered if it wasn't.
- Be honest about timelines. Career transitions are usually multi-year journeys. Name realistic timeframes.
- Write in plain, direct prose. No filler phrases like "In today's competitive landscape" or "It's important to note that". No hype. No excessive encouragement. Just the useful information.
- Avoid bullet-point-only responses. Use prose paragraphs with embedded citations. Section headers are fine.
- If the Guest field is empty for an episode, cite only the episode title.

STRUCTURE YOUR RESPONSE EXACTLY AS FOLLOWS:

## Career Transition Overview
One or two sentences explaining whether this is a lateral move, a stretch, or a significant pivot. If the roles are far apart, name 1–2 realistic stepping-stone roles and explain why they are useful waypoints. If the roles are adjacent, skip this section or keep it very brief.

## Gaps to Close
The specific things the person is likely missing for this transition — not generic advice, but gaps implied by what the target role actually requires versus what the current role builds. Ground each gap in what the transcripts reveal about what the target role actually demands. Write in prose.

## Skills to Build
A prioritized list (most important first) of concrete, buildable skills. For each skill:
- **Skill name**: 2–3 sentences on why it matters for this specific transition. Cite the episode(s): [Episode Title — Guest Name]. Then 1–2 sentences of the specific insight from that episode.

## Mindset Shifts
2–4 fundamental shifts in thinking required for this transition. Use the **same list format as Skills to Build**: each item must be one markdown list line, `- **From X → To Y**:`, immediately followed by your paragraph (same line is fine) explaining why this reframe matters. Cite the episode(s) that illuminate it.

---
If the provided transcripts do not contain enough relevant material to fill a section, write: "The provided transcripts do not cover this directly."`;

// ---------------------------------------------------------------------------
// Keyword matching (inlined — avoids TypeScript compilation)
// ---------------------------------------------------------------------------
const STOP_WORDS = new Set([
  "a","an","the","and","or","of","in","at","by","for","with","on","as","it",
  "is","be","do","to","this","that","was","are","from","has","had","have",
  "will","would","could","should","may","can","not","but","i","my","we",
  "you","he","she","they",
]);
const TITLE_NOISE = new Set([
  "senior","junior","lead","staff","principal","head","director","vp",
  "associate","manager","executive","chief","svp","evp","founding","interim",
  "global","regional",
]);
const EXPANSION_MAP = {
  product: ["pm","roadmap","prioriti","strateg","stakeholder","discovery"],
  engineer: ["technolog","architect","system","infrastructur","code","softwar"],
  software: ["engineer","code","technolog","developer","backend","frontend"],
  market: ["growth","acqui","brand","channel","funnel","campaign","demand"],
  data: ["analyt","metric","insight","sql","experiment","dashboard"],
  founder: ["startup","ventur","fundrais","cofound","pitch","investor","compani"],
  design: ["ux","research","usabl","user","wireframe","prototype"],
  sales: ["revenue","close","pipeline","quota","crm","prospect","deal"],
  oper: ["process","effici","scale","execut","workflow","ops"],
  consult: ["client","strateg","framework","deliverable","advise"],
  manag: ["team","hire","lead","report","perform","1on1"],
  financ: ["cfo","budget","forecast","investor","model"],
  growth: ["acqui","retent","activ","conver","funnel","experiment","market"],
  content: ["writing","editorial","blog","seo","media","creat"],
  ux: ["design","research","usabl","user","interview"],
  cto: ["technolog","engineer","architect","system","infrastructur"],
  ceo: ["founder","strateg","compani","leadership","vision"],
  analyt: ["data","metric","sql","insight","experiment"],
  research: ["user","interview","insight","data","qualit"],
  strateg: ["product","compani","market","vision","roadmap"],
};

function stem(word) {
  if (word.length > 6 && word.endsWith("ment")) return word.slice(0,-4);
  if (word.length > 6 && word.endsWith("tion")) return word.slice(0,-4);
  if (word.length > 6 && word.endsWith("ing"))  return word.slice(0,-3);
  if (word.length > 5 && word.endsWith("ers"))  return word.slice(0,-3);
  if (word.length > 5 && word.endsWith("ies"))  return word.slice(0,-3)+"y";
  if (word.length > 5 && word.endsWith("er"))   return word.slice(0,-2);
  if (word.length > 4 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0,-1);
  return word;
}

function extractKeywords(role) {
  const words = role.toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(w=>w.length>=3);
  const stems = new Set();
  for (const word of words) {
    if (STOP_WORDS.has(word) || TITLE_NOISE.has(word)) continue;
    stems.add(stem(word));
  }
  return Array.from(stems);
}

function expandRoleTerms(stems) {
  const expanded = new Set(stems);
  for (const s of stems) {
    for (const [key, related] of Object.entries(EXPANSION_MAP)) {
      if (key.startsWith(s) || s.startsWith(key)) {
        for (const r of related) expanded.add(r);
      }
    }
  }
  return Array.from(expanded);
}

function scoreEpisodes(corpus, currentRole, targetRole, topN = 15) {
  const currentStems = expandRoleTerms(extractKeywords(currentRole));
  const targetStems  = expandRoleTerms(extractKeywords(targetRole));
  const weights = new Map();
  for (const s of currentStems) weights.set(s, Math.max(weights.get(s)||0, 1.0));
  for (const s of targetStems)  weights.set(s, Math.max(weights.get(s)||0, 1.5));

  return corpus
    .map(entry => {
      const tokens = entry.text.toLowerCase().split(/[^a-z0-9]+/).filter(t=>t.length>=3);
      if (!tokens.length) return { ...entry, score: 0 };
      const freq = new Map();
      for (const t of tokens) freq.set(t, (freq.get(t)||0)+1);

      let textScore=0, currentHits=0, targetHits=0;
      for (const [term, weight] of weights.entries()) {
        let count=0;
        for (const [token, c] of freq.entries()) if (token.startsWith(term)) count+=c;
        if (count>0) {
          textScore += (count/tokens.length)*weight;
          if (currentStems.includes(term)) currentHits++;
          if (targetStems.includes(term))  targetHits++;
        }
      }
      // Title bonus
      const titleTokens = `${entry.title} ${entry.guest}`.toLowerCase().split(/[^a-z0-9]+/).filter(t=>t.length>=3);
      const titleFreq = new Map();
      for (const t of titleTokens) titleFreq.set(t, (titleFreq.get(t)||0)+1);
      let titleScore=0;
      for (const [term, weight] of weights.entries()) {
        let count=0;
        for (const [token, c] of titleFreq.entries()) if (token.startsWith(term)) count+=c;
        if (count>0) titleScore += (count/Math.max(titleTokens.length,1))*weight*5;
      }
      let score = textScore + titleScore;
      if (currentHits>0 && targetHits>0) score *= 1.4;
      if (entry.sparse) score *= 0.5;
      return { ...entry, score };
    })
    .filter(e => e.score >= 0.001)
    .sort((a,b) => b.score - a.score)
    .slice(0, topN);
}

// ---------------------------------------------------------------------------
// Normalize Mindset Shifts to list items (matches Skills to Build rendering)
// ---------------------------------------------------------------------------
function normalizeMindsetShiftsToListFormat(markdown) {
  const marker = "## Mindset Shifts\n\n";
  const idx = markdown.indexOf(marker);
  if (idx === -1) return markdown;

  const after = idx + marker.length;
  const rest = markdown.slice(after);
  const m = rest.match(/\n## /);
  const end = m ? m.index : rest.length;
  const mindsetBody = rest.slice(0, end);
  const tail = rest.slice(end);

  const paras = mindsetBody.trim().split(/\n\n+/).filter(Boolean);
  if (paras.some((p) => !p.trimStart().startsWith("**"))) return markdown;

  const converted = paras.map((p) => "- " + p.trim()).join("\n\n");
  return markdown.slice(0, after) + converted + tail;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("Error: ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  const corpusPath = path.resolve(__dirname, "../data/corpus.json");
  if (!fs.existsSync(corpusPath)) {
    console.error("Error: data/corpus.json not found. Run: npm run build:corpus first.");
    process.exit(1);
  }

  const outputPath = path.resolve(__dirname, "../data/paths.json");

  // Load existing paths so we can resume interrupted runs
  let existing = {};
  if (fs.existsSync(outputPath)) {
    existing = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    console.log(`Resuming — ${Object.keys(existing).length} paths already generated.`);
  }

  console.log("Loading corpus...");
  const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf-8"));
  console.log(`Corpus loaded: ${corpus.length} episodes.`);

  const client = new Anthropic.default({ apiKey });
  const results = { ...existing };
  const MAX_CHARS_PER_EPISODE = 4000;

  for (let i = 0; i < TRANSITIONS.length; i++) {
    const { from, to } = TRANSITIONS[i];
    const key = `${from}|||${to}`;

    if (results[key]) {
      console.log(`  [${i+1}/${TRANSITIONS.length}] Skipping (cached): ${from} → ${to}`);
      continue;
    }

    console.log(`  [${i+1}/${TRANSITIONS.length}] Generating: ${from} → ${to}`);

    const topEpisodes = scoreEpisodes(corpus, from, to, 15);
    if (!topEpisodes.length) {
      console.warn(`    Warning: no relevant episodes found for ${from} → ${to}`);
      results[key] = { from, to, markdown: "No relevant transcript coverage found for this transition.", generatedAt: new Date().toISOString() };
      continue;
    }

    const contextChunks = topEpisodes.map(ep => {
      const text = ep.text.length > MAX_CHARS_PER_EPISODE
        ? ep.text.slice(0, MAX_CHARS_PER_EPISODE) + "..."
        : ep.text;
      return `=== Episode: ${ep.title}${ep.guest ? ` | Guest: ${ep.guest}` : ""} ===\n${text}`;
    });

    const userMessage = `I am currently a ${from} and want to transition to become a ${to}.

Here are ${topEpisodes.length} relevant transcript excerpts from Lenny's podcast:

${contextChunks.join("\n\n")}

---
Please generate my career transition learning path following the structure in your instructions. Every skill and mindset shift must be grounded in the excerpts above.`;

    try {
      const message = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2500,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      });

      let markdown = message.content[0].type === "text" ? message.content[0].text : "";
      markdown = normalizeMindsetShiftsToListFormat(markdown);
      results[key] = { from, to, markdown, generatedAt: new Date().toISOString() };

      // Save after each generation so we can resume on interruption
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
      console.log(`    ✓ Done (${markdown.length} chars)`);
    } catch (err) {
      console.error(`    ✗ Failed: ${err.message}`);
      // Don't crash — continue with remaining transitions
    }

    // Rate limit buffer between calls
    if (i < TRANSITIONS.length - 1) {
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  const total = Object.keys(results).length;
  console.log(`\nDone. ${total} paths saved to data/paths.json`);
}

main().catch(err => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
