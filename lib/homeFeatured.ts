/** Editorial starters; only pairs present in `paths` are shown. */
export const HOME_STARTER_CURATION: { from: string; to: string }[] = [
  { from: "Software Engineer", to: "Product Manager" },
  { from: "Product Manager", to: "Founder / CEO" },
  { from: "Product Designer", to: "Product Manager" },
  { from: "Data Analyst", to: "Product Manager" },
];

export function pickHomeStarterPaths(
  paths: Record<string, unknown>,
  max = 4
): { from: string; to: string }[] {
  const keys = new Set(Object.keys(paths));
  const out: { from: string; to: string }[] = [];
  for (const pair of HOME_STARTER_CURATION) {
    if (keys.has(`${pair.from}|||${pair.to}`)) {
      out.push(pair);
      if (out.length >= max) return out;
    }
  }
  if (out.length >= max) return out;

  const rest = Object.keys(paths)
    .map((k) => {
      const [from, to] = k.split("|||");
      return from && to ? { from, to } : null;
    })
    .filter((p): p is { from: string; to: string } => p != null)
    .filter((p) => !out.some((o) => o.from === p.from && o.to === p.to))
    .sort((a, b) => `${a.from} ${a.to}`.localeCompare(`${b.from} ${b.to}`));

  for (const pair of rest) {
    out.push(pair);
    if (out.length >= max) break;
  }
  return out;
}
