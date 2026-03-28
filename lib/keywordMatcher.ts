export interface CorpusEntry {
  id: string;
  title: string;
  guest: string;
  text: string;
  sparse?: boolean;
}

export interface ScoredEntry extends CorpusEntry {
  score: number;
}

export interface ScoringOptions {
  topN?: number;
  minScore?: number;
}

// ---------------------------------------------------------------------------
// Stop words to strip from role inputs
// ---------------------------------------------------------------------------
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "of", "in", "at", "by", "for", "with",
  "on", "as", "it", "is", "be", "do", "to", "this", "that", "was", "are",
  "from", "has", "had", "have", "will", "would", "could", "should", "may",
  "can", "not", "but", "i", "my", "we", "you", "he", "she", "they",
]);

// Title hierarchy noise — these words don't help distinguish relevant episodes
const TITLE_NOISE = new Set([
  "senior", "junior", "lead", "staff", "principal", "head", "director",
  "vp", "associate", "manager", "executive", "chief", "svp", "evp",
  "founding", "interim", "global", "regional",
]);

// ---------------------------------------------------------------------------
// Lightweight suffix stemmer (no external library)
// Converts: "managers" → "manag", "managing" → "manag", "management" → "manag"
// ---------------------------------------------------------------------------
function stem(word: string): string {
  if (word.length > 6 && word.endsWith("ment")) return word.slice(0, -4);
  if (word.length > 6 && word.endsWith("tion")) return word.slice(0, -4);
  if (word.length > 6 && word.endsWith("ing")) return word.slice(0, -3);
  if (word.length > 5 && word.endsWith("ers")) return word.slice(0, -3);
  if (word.length > 5 && word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.length > 5 && word.endsWith("er")) return word.slice(0, -2);
  if (word.length > 4 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

// ---------------------------------------------------------------------------
// Role expansion map: common role keywords → related stems
// ---------------------------------------------------------------------------
const EXPANSION_MAP: Record<string, string[]> = {
  product: ["pm", "roadmap", "prioriti", "strateg", "stakeholder", "discovery"],
  engineer: ["technolog", "architect", "system", "infrastructur", "code", "softwar"],
  software: ["engineer", "code", "technolog", "developer", "backend", "frontend"],
  market: ["growth", "acqui", "brand", "channel", "funnel", "campaign", "demand"],
  data: ["analyt", "metric", "insight", "sql", "experiment", "dashboard"],
  founder: ["startup", "ventur", "fundrais", "cofound", "pitch", "investor", "compani"],
  design: ["ux", "research", "usabl", "user", "wireframe", "prototype"],
  sales: ["revenue", "close", "pipeline", "quota", "crm", "prospect", "deal"],
  oper: ["process", "effici", "scale", "execut", "workflow", "ops"],
  consult: ["client", "strateg", "framework", "deliverable", "advise"],
  manag: ["team", "hire", "lead", "report", "perform", "1on1"],
  financ: ["cfo", "budget", "forecast", "investor", "model", "p&l"],
  growth: ["acqui", "retent", "activ", "conver", "funnel", "experiment", "market"],
  content: ["writing", "editorial", "blog", "seo", "media", "creat"],
  ux: ["design", "research", "usabl", "user", "interview"],
  cto: ["technolog", "engineer", "architect", "system", "infrastructur"],
  ceo: ["founder", "strateg", "compani", "leadership", "vision"],
  analyt: ["data", "metric", "sql", "dashboad", "insight", "experiment"],
  research: ["user", "interview", "insight", "data", "qualit"],
  strateg: ["product", "compani", "market", "vision", "roadmap"],
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Extract stems from a role string, removing noise words.
 */
export function extractKeywords(role: string): string[] {
  const words = role
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3);

  const stems = new Set<string>();
  for (const word of words) {
    if (STOP_WORDS.has(word) || TITLE_NOISE.has(word)) continue;
    stems.add(stem(word));
  }
  return Array.from(stems);
}

/**
 * Expand stems using the domain lookup map.
 */
export function expandRoleTerms(stems: string[]): string[] {
  const expanded = new Set(stems);
  for (const s of stems) {
    // Check if this stem is a prefix of any expansion key
    for (const [key, related] of Object.entries(EXPANSION_MAP)) {
      if (key.startsWith(s) || s.startsWith(key)) {
        for (const r of related) expanded.add(r);
      }
    }
  }
  return Array.from(expanded);
}

/**
 * Score and rank corpus entries against a career transition query.
 *
 * @param corpus      All corpus entries
 * @param currentRole User's current role string
 * @param targetRole  User's target role string
 * @param options     topN (default 15), minScore (default 0.001)
 */
export function scoreEpisodes(
  corpus: CorpusEntry[],
  currentRole: string,
  targetRole: string,
  options: ScoringOptions = {}
): ScoredEntry[] {
  const { topN = 15, minScore = 0.001 } = options;

  const currentStems = expandRoleTerms(extractKeywords(currentRole));
  const targetStems = expandRoleTerms(extractKeywords(targetRole));

  // Build weighted term map: target terms weighted 1.5x, current terms 1.0x
  const weights = new Map<string, number>();
  for (const s of currentStems) weights.set(s, Math.max(weights.get(s) ?? 0, 1.0));
  for (const s of targetStems) weights.set(s, Math.max(weights.get(s) ?? 0, 1.5));

  const allTerms = Array.from(weights.keys());
  if (allTerms.length === 0) return [];

  const scored: ScoredEntry[] = corpus.map((entry) => {
    // Tokenize full text (lowercase, split on non-alpha)
    const tokens = entry.text.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length >= 3);
    const totalTokens = tokens.length;

    if (totalTokens === 0) return { ...entry, score: 0 };

    // Build frequency map
    const freq = new Map<string, number>();
    for (const token of tokens) {
      freq.set(token, (freq.get(token) ?? 0) + 1);
    }

    // Score against query terms (startsWith matching for stemming)
    let textScore = 0;
    let currentHits = 0;
    let targetHits = 0;

    for (const [term, weight] of weights.entries()) {
      let termCount = 0;
      for (const [token, count] of freq.entries()) {
        if (token.startsWith(term)) termCount += count;
      }
      if (termCount > 0) {
        const tf = termCount / totalTokens;
        textScore += tf * weight;
        if (currentStems.includes(term)) currentHits++;
        if (targetStems.includes(term)) targetHits++;
      }
    }

    // Title + guest bonus (5x weight) — run same scoring on short text
    const titleText = `${entry.title} ${entry.guest}`.toLowerCase();
    const titleTokens = titleText.split(/[^a-z0-9]+/).filter((t) => t.length >= 3);
    const titleFreq = new Map<string, number>();
    for (const token of titleTokens) {
      titleFreq.set(token, (titleFreq.get(token) ?? 0) + 1);
    }
    let titleScore = 0;
    for (const [term, weight] of weights.entries()) {
      let termCount = 0;
      for (const [token, count] of titleFreq.entries()) {
        if (token.startsWith(term)) termCount += count;
      }
      if (termCount > 0) {
        const tf = termCount / Math.max(titleTokens.length, 1);
        titleScore += tf * weight * 5;
      }
    }

    let score = textScore + titleScore;

    // Dual-role bonus: episode bridges both roles → more valuable
    if (currentHits > 0 && targetHits > 0) score *= 1.4;

    // Penalize sparse entries
    if (entry.sparse) score *= 0.5;

    return { ...entry, score };
  });

  return scored
    .filter((e) => e.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}
