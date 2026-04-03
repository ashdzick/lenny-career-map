#!/usr/bin/env node
/**
 * Verifies HTTP URLs in data/*.json (citations, podcast recs, market signal source).
 * Uses slow sequential GETs to avoid Substack rate limits (429).
 *
 *   node scripts/check-external-links.js
 *   node scripts/check-external-links.js --delay-ms=4000
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const delayMs = (() => {
  const a = process.argv.find((x) => x.startsWith("--delay-ms="));
  return a ? Math.max(500, parseInt(a.split("=")[1], 10) || 2500) : 2500;
})();

const urls = new Set();
function add(u) {
  if (typeof u === "string" && /^https?:\/\//i.test(u)) urls.add(u.trim());
}

const cite = JSON.parse(fs.readFileSync(path.join(ROOT, "data/citation-urls.json"), "utf8"));
Object.values(cite).forEach(add);

const recs = JSON.parse(fs.readFileSync(path.join(ROOT, "data/podcast-recs.json"), "utf8"));
for (const arr of Object.values(recs)) {
  for (const e of arr) add(e.url);
}

const sig = JSON.parse(fs.readFileSync(path.join(ROOT, "data/market-signals.json"), "utf8"));
if (sig._sourceUrl) add(sig._sourceUrl);

const list = [...urls].sort();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function checkOne(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  const headers = {
    "user-agent": "LennyCareerMapLinkCheck/1.0 (+https://github.com/ashdzick/lenny-career-map)",
  };
  try {
    const r = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: ctrl.signal,
      headers,
    });
    clearTimeout(t);
    if (r.status >= 200 && r.status < 400) return r.status;
    if (r.status === 405 || r.status === 403 || r.status === 404) {
      const r2 = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(25000),
        headers,
      });
      return r2.status;
    }
    return r.status;
  } catch (e) {
    clearTimeout(t);
    return 0;
  }
}

(async () => {
  const bad = [];
  let i = 0;
  for (const url of list) {
    i++;
    let status = await checkOne(url);
    if (status === 429) {
      await sleep(delayMs * 2);
      status = await checkOne(url);
    }
    const ok = status >= 200 && status < 400;
    if (!ok) {
      bad.push({ url, status });
      process.stderr.write(`\nFAIL ${status} ${url}\n`);
    }
    process.stderr.write(`\r[${i}/${list.length}] ${ok ? "ok" : "FAIL"} ${status}  `);
    await sleep(delayMs);
  }
  process.stderr.write("\n");
  if (bad.length === 0) {
    console.log(`All ${list.length} URLs returned 2xx/3xx.`);
    process.exit(0);
  }
  console.error(`Failed (${bad.length}):`);
  for (const b of bad) console.error(b.status, b.url);
  process.exit(1);
})();
