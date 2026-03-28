import fs from "fs";
import path from "path";
import CareerMapApp from "@/components/CareerMapApp";
import type { MarketSignalEntry } from "@/components/MarketSignal";
import type { PodcastRec } from "@/components/PodcastRecs";

export interface PathEntry {
  from: string;
  to: string;
  markdown: string;
  generatedAt: string;
}

export interface PathsData {
  roles: string[];
  paths: Record<string, PathEntry>;
  citationUrls: Record<string, string>;
  marketSignals: Record<string, MarketSignalEntry>;
  marketSignalSourceUrl: string;
  podcastRecs: Record<string, PodcastRec[]>;
}

function loadPathsData(): PathsData {
  const pathsFile = path.join(process.cwd(), "data", "paths.json");
  const citationFile = path.join(process.cwd(), "data", "citation-urls.json");
  const signalsFile = path.join(process.cwd(), "data", "market-signals.json");
  const podcastRecsFile = path.join(process.cwd(), "data", "podcast-recs.json");

  if (!fs.existsSync(pathsFile)) {
    return { roles: [], paths: {}, citationUrls: {}, marketSignals: {}, marketSignalSourceUrl: "", podcastRecs: {} };
  }

  const raw = JSON.parse(fs.readFileSync(pathsFile, "utf-8")) as Record<string, PathEntry>;
  const citationUrls: Record<string, string> = fs.existsSync(citationFile)
    ? JSON.parse(fs.readFileSync(citationFile, "utf-8"))
    : {};

  // Load market signals — strip internal _comment/_source keys
  const rawSignals = fs.existsSync(signalsFile)
    ? JSON.parse(fs.readFileSync(signalsFile, "utf-8"))
    : {};
  const marketSignalSourceUrl: string = rawSignals._sourceUrl ?? "";
  const marketSignals: Record<string, MarketSignalEntry> = Object.fromEntries(
    Object.entries(rawSignals).filter(([k]) => !k.startsWith("_"))
  ) as Record<string, MarketSignalEntry>;

  // Collect unique roles from all transitions
  const roleSet = new Set<string>();
  for (const entry of Object.values(raw)) {
    roleSet.add(entry.from);
    roleSet.add(entry.to);
  }

  const podcastRecs: Record<string, PodcastRec[]> = fs.existsSync(podcastRecsFile)
    ? JSON.parse(fs.readFileSync(podcastRecsFile, "utf-8"))
    : {};

  return {
    roles: Array.from(roleSet).sort(),
    paths: raw,
    citationUrls,
    marketSignals,
    marketSignalSourceUrl,
    podcastRecs,
  };
}

export default function Home() {
  const data = loadPathsData();
  return <CareerMapApp data={data} />;
}
