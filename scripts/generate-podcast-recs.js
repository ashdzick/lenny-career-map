#!/usr/bin/env node
// Scores the corpus podcast-only entries for every path and writes
// data/podcast-recs.json  —  { "From|||To": [{title, guest, url?}, ...] }
"use strict";
const fs = require("fs");
const path = require("path");

const corpus      = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/corpus.json")));
const paths       = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/paths.json")));
const citationUrls= JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/citation-urls.json")));

// ── Junk filter: roundups, announcements, admin posts ───────────────────────
const JUNK = /best of|year in review|announcing|taking a sick|favorite reads|survey of|applications open|summit|friends summit|podcast feed|jobs board|talent collective|this week #|issue \d+|open roles/i;

const podcasts = corpus.filter(e =>
  e.guest &&
  e.guest.trim() !== "" &&
  !e.guest.startsWith("contributor") &&
  !JUNK.test(e.title)
);

// ── Scoring helpers (same as get-chunks.js) ──────────────────────────────────
const STOP  = new Set(["a","an","the","and","or","of","in","at","by","for","with","on","as","it","is","be","do","to","this","that","was","are","from","has","had","have","will","would","could","should","may","can","not","but","i","my","we","you","he","she","they"]);
const NOISE = new Set(["senior","junior","lead","staff","principal","head","director","vp","associate","manager","executive","chief","svp","evp","founding","interim","global","regional"]);
const EXP   = {
  product:  ["pm","roadmap","prioriti","strateg","stakeholder","discovery"],
  engineer: ["technolog","architect","system","code","softwar"],
  software: ["engineer","code","technolog","developer","backend","frontend"],
  design:   ["ux","research","usabl","user","wireframe","prototype"],
  ux:       ["design","research","usabl","user","interview"],
  market:   ["growth","acqui","brand","channel","campaign","demand"],
  data:     ["analyt","metric","insight","sql","experiment","dashboard"],
  founder:  ["startup","ventur","fundrais","cofound","pitch","investor"],
  growth:   ["acqui","retent","activ","conver","funnel","experiment","market"],
  manag:    ["team","hire","lead","report","perform"],
  sales:    ["revenue","close","pipeline","quota","crm","prospect"],
};

function stem(w) {
  if (w.length > 6 && w.endsWith("ment")) return w.slice(0, -4);
  if (w.length > 6 && w.endsWith("tion")) return w.slice(0, -4);
  if (w.length > 6 && w.endsWith("ing"))  return w.slice(0, -3);
  if (w.length > 5 && w.endsWith("ers"))  return w.slice(0, -3);
  if (w.length > 5 && w.endsWith("ies"))  return w.slice(0, -3) + "y";
  if (w.length > 5 && w.endsWith("er"))   return w.slice(0, -2);
  if (w.length > 4 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}
function kw(role) {
  const s = new Set();
  for (const w of role.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length >= 3)) {
    if (!STOP.has(w) && !NOISE.has(w)) s.add(stem(w));
  }
  return [...s];
}
function expand(stems) {
  const e = new Set(stems);
  for (const s of stems)
    for (const [k, v] of Object.entries(EXP))
      if (k.startsWith(s) || s.startsWith(k))
        for (const r of v) e.add(r);
  return [...e];
}

function scorePodcasts(from, to, topN = 3) {
  const cs = expand(kw(from));
  const ts = expand(kw(to));
  const wm = new Map();
  for (const s of cs) wm.set(s, Math.max(wm.get(s) || 0, 1.0));
  for (const s of ts) wm.set(s, Math.max(wm.get(s) || 0, 1.5));

  return podcasts
    .map(e => {
      const toks = e.text.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length >= 3);
      if (!toks.length) return { ...e, score: 0 };
      const freq = new Map();
      for (const t of toks) freq.set(t, (freq.get(t) || 0) + 1);

      let sc = 0, ch = 0, th = 0;
      for (const [term, w] of wm.entries()) {
        let c = 0;
        for (const [tok, n] of freq.entries()) if (tok.startsWith(term)) c += n;
        if (c > 0) {
          sc += (c / toks.length) * w;
          if (cs.includes(term)) ch++;
          if (ts.includes(term)) th++;
        }
      }
      // Title/guest bonus (5×)
      const ttoks = (e.title + " " + e.guest).toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length >= 3);
      const tf = new Map();
      for (const t of ttoks) tf.set(t, (tf.get(t) || 0) + 1);
      let ts2 = 0;
      for (const [term, w] of wm.entries()) {
        let c = 0;
        for (const [tok, n] of tf.entries()) if (tok.startsWith(term)) c += n;
        if (c > 0) ts2 += (c / Math.max(ttoks.length, 1)) * w * 5;
      }

      let score = sc + ts2;
      if (ch > 0 && th > 0) score *= 1.4;
      if (e.sparse) score *= 0.5;
      return { ...e, score };
    })
    .filter(e => e.score > 0.01)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(e => ({
      title: e.title,
      guest: e.guest,
      ...(citationUrls[e.title] ? { url: citationUrls[e.title] } : {}),
    }));
}

// ── Generate recs for every path ─────────────────────────────────────────────
const recs = {};
for (const key of Object.keys(paths)) {
  const [from, to] = key.split("|||");
  recs[key] = scorePodcasts(from, to, 3);
}

const outPath = path.resolve(__dirname, "../data/podcast-recs.json");
fs.writeFileSync(outPath, JSON.stringify(recs, null, 2));
console.log(`Written ${outPath}`);
console.log(`Paths covered: ${Object.keys(recs).length}`);
