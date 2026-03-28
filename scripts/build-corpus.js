#!/usr/bin/env node
// build-corpus.js
// Clones the private Lenny's transcript repo and builds data/corpus.json.
// Run: GITHUB_TOKEN=ghp_xxx node scripts/build-corpus.js
// Requires: npm install (simple-git and gray-matter must be available)

"use strict";

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const simpleGit = require("simple-git");

// ---------------------------------------------------------------------------
// Configuration — update REPO_OWNER and REPO_NAME to match your private repo
// ---------------------------------------------------------------------------
const REPO_OWNER = process.env.TRANSCRIPT_REPO_OWNER || "LennysNewsletter";
const REPO_NAME = process.env.TRANSCRIPT_REPO_NAME || "lennys-newsletterpodcastdata-all";
const CLONE_DIR = path.resolve(__dirname, "../.tmp/transcripts");
const OUTPUT_FILE = path.resolve(__dirname, "../data/corpus.json");
const DATA_DIR = path.resolve(__dirname, "../data");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(str) {
  return str
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Recursively collect all .md file paths under a directory. */
function findMarkdownFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMarkdownFiles(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Extract episode title from (in priority order):
 *   1. frontmatter.title
 *   2. First H1 heading in body
 *   3. De-slugged filename
 */
function extractTitle(frontmatter, body, filePath) {
  if (frontmatter.title && typeof frontmatter.title === "string") {
    return frontmatter.title.trim();
  }
  const h1Match = body.match(/^#\s+(.+)/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  const base = path.basename(filePath, ".md");
  // Strip leading episode number: "123-guest-name" → "guest name"
  const withoutNumber = base.replace(/^\d+[-_]/, "");
  return titleCase(withoutNumber);
}

/**
 * Extract guest name from (in priority order):
 *   1. frontmatter.guest
 *   2. frontmatter.speaker
 *   3. Filename pattern: number-first-last → "First Last"
 *   4. Scan first 600 chars of body for "Guest: NAME" or "with First Last"
 *   5. Empty string
 */
function extractGuest(frontmatter, body, filePath) {
  if (frontmatter.guest && typeof frontmatter.guest === "string") {
    return frontmatter.guest.trim();
  }
  if (frontmatter.speaker && typeof frontmatter.speaker === "string") {
    return frontmatter.speaker.trim();
  }

  // Filename heuristic: "123-firstname-lastname" → "Firstname Lastname"
  const base = path.basename(filePath, ".md");
  const numMatch = base.match(/^\d+[-_](.+)/);
  if (numMatch) {
    const namePart = numMatch[1];
    // If it looks like a name (2-4 hyphenated words, all lowercase alpha)
    const words = namePart.split(/[-_]/);
    if (words.length >= 2 && words.length <= 4 && words.every((w) => /^[a-z]+$/.test(w))) {
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
  }

  // Scan first 600 chars of body
  const head = body.slice(0, 600);
  const guestLineMatch = head.match(/guest[:\s]+([A-Z][a-z]+(?: [A-Z][a-z]+)+)/i);
  if (guestLineMatch) return guestLineMatch[1].trim();

  const withMatch = head.match(/with\s+([A-Z][a-z]+(?: [A-Z][a-z]+)+)/);
  if (withMatch) return withMatch[1].trim();

  return "";
}

/**
 * Clean markdown body into plain text suitable for keyword matching.
 * Does NOT truncate — full text is kept; truncation happens at query time.
 */
function cleanText(raw) {
  return raw
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // unwrap links → text
    .replace(/^#{1,6}\s+/gm, "") // strip heading markers
    .replace(/<[^>]+>/g, " ") // strip HTML tags
    .replace(/`{1,3}[^`]*`{1,3}/g, " ") // strip inline/block code
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1") // strip bold/italic markers
    .replace(/_{1,2}([^_]+)_{1,2}/g, "$1")
    .replace(/\n{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error(
      "Error: GITHUB_TOKEN environment variable is not set.\n" +
        "Usage: GITHUB_TOKEN=ghp_xxx node scripts/build-corpus.js"
    );
    process.exit(1);
  }

  const repoUrl = `https://x-access-token:${token}@github.com/${REPO_OWNER}/${REPO_NAME}.git`;

  // Ensure output directory exists
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(CLONE_DIR), { recursive: true });

  // Clone or pull
  const git = simpleGit();
  if (fs.existsSync(CLONE_DIR) && fs.existsSync(path.join(CLONE_DIR, ".git"))) {
    console.log("Repo already cloned — pulling latest...");
    await simpleGit(CLONE_DIR).pull();
  } else {
    console.log(`Cloning ${REPO_OWNER}/${REPO_NAME} (shallow)...`);
    await git.clone(repoUrl, CLONE_DIR, ["--depth", "1"]);
  }

  // Discover all markdown files
  console.log("Scanning for .md files...");
  const mdFiles = findMarkdownFiles(CLONE_DIR);
  console.log(`Found ${mdFiles.length} markdown files.`);

  // Parse each file
  const corpus = [];
  let parseErrors = 0;

  for (const filePath of mdFiles) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");

      let parsed;
      try {
        parsed = matter(raw);
      } catch {
        // Malformed frontmatter — treat whole file as body
        parsed = { data: {}, content: raw };
      }

      const { data: frontmatter, content: body } = parsed;
      const title = extractTitle(frontmatter, body, filePath);
      const guest = extractGuest(frontmatter, body, filePath);
      const text = cleanText(body);
      const id = slugify(path.basename(filePath, ".md"));

      corpus.push({
        id,
        title,
        guest,
        text,
        sparse: text.length < 200,
      });
    } catch (err) {
      parseErrors++;
      console.warn(`  Warning: could not parse ${path.relative(CLONE_DIR, filePath)}: ${err.message}`);
    }
  }

  // Sort for deterministic output
  corpus.sort((a, b) => a.id.localeCompare(b.id));

  // Write corpus
  const json = JSON.stringify(corpus);
  fs.writeFileSync(OUTPUT_FILE, json, "utf-8");

  const sizeMB = (Buffer.byteLength(json, "utf-8") / 1024 / 1024).toFixed(1);
  const sparseCount = corpus.filter((e) => e.sparse).length;
  const guestMissing = corpus.filter((e) => !e.guest).length;

  console.log("\n--- Corpus build complete ---");
  console.log(`  Episodes:        ${corpus.length}`);
  console.log(`  Sparse (<200ch): ${sparseCount}`);
  console.log(`  Guest missing:   ${guestMissing}`);
  console.log(`  Parse errors:    ${parseErrors}`);
  console.log(`  Output size:     ${sizeMB} MB`);
  console.log(`  Written to:      ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
