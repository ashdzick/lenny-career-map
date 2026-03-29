import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Heading, Root } from "mdast";

export interface PathTocItem {
  id: string;
  label: string;
}

/** Match legacy path anchors: lowercase slug, dedupe with -2, -3, … */
export function slugifyHeading(text: string): string {
  const s = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "section";
}

function normalizeHeadingLabel(raw: string): string {
  return raw.replace(/\*/g, "").replace(/\s+/g, " ").trim();
}

/** Match hast-derived heading text to TOC `label` (duplicate h2 renders share the same key). */
export function headingPlainMatchKey(raw: string): string {
  return normalizeHeadingLabel(raw.replace(/\s+/g, " ").trim()).toLowerCase();
}

/** Map normalized heading text → nav id; first TOC entry wins per key. */
export function bodyHeadingPlainToIdMap(items: PathTocItem[]): Map<string, string> {
  const m = new Map<string, string>();
  for (const item of items) {
    const k = headingPlainMatchKey(item.label);
    if (!m.has(k)) m.set(k, item.id);
  }
  return m;
}

/** Build stable ids in order (same algorithm as rendered h2 ids). */
export function buildTocItemsFromH2Labels(labels: string[]): PathTocItem[] {
  const used = new Set<string>();
  return labels.map((raw) => {
    const clean = normalizeHeadingLabel(raw);
    const display = clean || "Section";
    let base = slugifyHeading(clean || "section");
    let id = base;
    let n = 2;
    while (used.has(id)) {
      id = `${base}-${n++}`;
    }
    used.add(id);
    return { id, label: display };
  });
}

function collectH2PlainLabels(markdown: string): string[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown) as Root;
  const labels: string[] = [];
  visit(tree, "heading", (node: Heading) => {
    if (node.depth === 2) {
      labels.push(toString(node).replace(/\s+/g, " ").trim());
    }
  });
  return labels;
}

/** TOC + nav ids aligned with react-markdown + remark-gfm (not raw-line regex). */
export function extractPathTocFromMarkdown(markdown: string): PathTocItem[] {
  return buildTocItemsFromH2Labels(collectH2PlainLabels(markdown));
}

/** Plain text from a hast node tree (react-markdown passes the h2 element as `node`). */
export function hastElementToPlainText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { type?: string; value?: unknown; children?: unknown[] };
  if (n.type === "text" && typeof n.value === "string") return n.value;
  if (Array.isArray(n.children)) {
    return n.children.map(hastElementToPlainText).join("");
  }
  return "";
}

/** Assigns ids in encounter order; call once per markdown body passed to ReactMarkdown. */
export function createHeadingIdAssigner(): (plainFromHast: string) => string {
  const used = new Set<string>();
  return (plainFromHast: string) => {
    const clean = normalizeHeadingLabel(plainFromHast);
    let base = slugifyHeading(clean || "section");
    let id = base;
    let n = 2;
    while (used.has(id)) {
      id = `${base}-${n++}`;
    }
    used.add(id);
    return id;
  };
}
