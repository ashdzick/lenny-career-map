import fs from "fs";
import path from "path";
import Link from "next/link";
import type { PathEntry } from "@/app/page";
import { roleGroups } from "@/lib/roleGroups";

function loadPaths(): Record<string, PathEntry> {
  const pathsFile = path.join(process.cwd(), "data", "paths.json");
  if (!fs.existsSync(pathsFile)) return {};
  return JSON.parse(fs.readFileSync(pathsFile, "utf-8")) as Record<string, PathEntry>;
}

export default function ExplorePage() {
  const paths = loadPaths();

  // Build a map of source role → sorted list of target roles
  const bySource: Record<string, string[]> = {};
  for (const key of Object.keys(paths)) {
    const [from, to] = key.split("|||");
    if (!bySource[from]) bySource[from] = [];
    bySource[from].push(to);
  }
  for (const from of Object.keys(bySource)) {
    bySource[from].sort();
  }

  const assignedRoles = new Set(roleGroups.flatMap((g) => g.roles));
  const otherSources = Object.keys(bySource)
    .filter((r) => !assignedRoles.has(r))
    .sort();

  const allGroups = [
    ...roleGroups
      .map((g) => ({ ...g, roles: g.roles.filter((r) => bySource[r]) }))
      .filter((g) => g.roles.length > 0),
    ...(otherSources.length > 0 ? [{ label: "Other", roles: otherSources }] : []),
  ];

  const totalPaths = Object.keys(paths).length;

  return (
    <main>
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-brand-500" />
          <span className="text-xs font-medium text-brand-600 uppercase tracking-widest">
            Lenny&apos;s Podcast
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-brand-900 leading-tight">
              All Career Transitions
            </h1>
            <p className="mt-2 text-base text-gray-600 leading-relaxed">
              {totalPaths} paths grounded in Lenny&apos;s podcast interviews. Click any
              transition to explore it.
            </p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 text-sm text-brand-600 hover:text-brand-800 underline underline-offset-2 mt-1"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Grouped grid */}
      <div className="space-y-10">
        {allGroups.map((group) => (
          <section key={group.label}>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
              {group.label}
            </h2>
            <div className="space-y-5">
              {group.roles.map((from) => (
                <div key={from} className="flex flex-wrap items-start gap-x-4 gap-y-2">
                  <span className="text-sm font-medium text-gray-700 w-44 flex-shrink-0 pt-0.5">
                    {from}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {bySource[from].map((to) => (
                      <Link
                        key={to}
                        href={`/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full
                                   bg-white border border-gray-200 text-gray-600 text-xs font-medium
                                   hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50
                                   transition-colors"
                      >
                        <span className="text-gray-300 mr-0.5">→</span>
                        {to}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-400">
        Built on Lenny&apos;s Newsletter podcast transcripts.
      </footer>
    </main>
  );
}
