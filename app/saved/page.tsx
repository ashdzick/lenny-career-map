"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import ReadingColumnShell from "@/components/ReadingColumnShell";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { roleGroups } from "@/lib/roleGroups";

interface SavedPath {
  from: string;
  to: string;
}

export default function SavedPathsPage() {
  const [savedPaths] = useLocalStorage<SavedPath[]>("lenny-saved-paths", []);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { bySource, allGroups, totalSaved } = useMemo(() => {
    const list = Array.isArray(savedPaths) ? savedPaths : [];
    const bySourceInner: Record<string, string[]> = {};
    const seenPair = new Set<string>();
    for (const { from, to } of list) {
      if (!from || !to) continue;
      const pair = `${from}|||${to}`;
      if (seenPair.has(pair)) continue;
      seenPair.add(pair);
      if (!bySourceInner[from]) bySourceInner[from] = [];
      bySourceInner[from].push(to);
    }
    for (const from of Object.keys(bySourceInner)) {
      bySourceInner[from].sort();
    }

    const assignedRoles = new Set(roleGroups.flatMap((g) => g.roles));
    const sourcesWithSaved = Object.keys(bySourceInner).sort();
    const otherSources = sourcesWithSaved.filter((r) => !assignedRoles.has(r));

    const groups = [
      ...roleGroups
        .map((g) => ({ ...g, roles: g.roles.filter((r) => bySourceInner[r]) }))
        .filter((g) => g.roles.length > 0),
      ...(otherSources.length > 0 ? [{ label: "Other", roles: otherSources }] : []),
    ];

    return { bySource: bySourceInner, allGroups: groups, totalSaved: seenPair.size };
  }, [savedPaths]);

  return (
    <main>
      <ReadingColumnShell>
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-brand-500" />
          <span className="text-xs font-medium text-brand-600 uppercase tracking-widest">
            Lenny&apos;s Podcast
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-brand-900 leading-tight">Saved paths</h1>
            <p className="mt-2 text-base text-gray-600 leading-relaxed">
              {mounted
                ? totalSaved === 0
                  ? "You haven’t saved any paths yet. Save one from the map with “Save path,” or browse all transitions."
                  : `${totalSaved} saved ${totalSaved === 1 ? "path" : "paths"}. Click a transition to open it.`
                : "Loading…"}
            </p>
          </div>
          <nav
            className="flex flex-shrink-0 flex-wrap items-center justify-end gap-x-4 gap-y-2 mt-1"
            aria-label="Site"
          >
            <Link
              href="/"
              className="text-sm text-brand-600 hover:text-brand-800 underline underline-offset-2 whitespace-nowrap"
              aria-label="Home"
              title="Return to home"
            >
              Home →
            </Link>
            <Link
              href="/explore"
              className="text-sm text-brand-600 hover:text-brand-800 underline underline-offset-2 whitespace-nowrap"
              aria-label="Browse all career transition paths"
              title="Open the full list of transitions"
            >
              Browse all paths →
            </Link>
          </nav>
        </div>
      </header>

      {mounted && totalSaved > 0 && (
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
      )}

      {mounted && totalSaved === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Open the map, pick a transition, and use <span className="font-medium text-gray-800">Save path</span>{" "}
            to add it here.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="text-sm text-brand-600 hover:text-brand-800 underline underline-offset-2 font-medium"
              aria-label="Home"
            >
              Home →
            </Link>
            <Link
              href="/explore"
              className="text-sm text-brand-600 hover:text-brand-800 underline underline-offset-2 font-medium"
            >
              Browse all paths →
            </Link>
          </div>
        </div>
      )}

      <footer className="mt-16 text-center text-xs text-gray-400">
        Built on Lenny&apos;s Newsletter podcast transcripts.
      </footer>
      </ReadingColumnShell>
    </main>
  );
}
