"use client";

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import LearningPathOutput from "@/components/LearningPathOutput";
import EpisodePlaylist from "@/components/EpisodePlaylist";
import MarketSignal from "@/components/MarketSignal";
import PodcastRecs from "@/components/PodcastRecs";
import type { PathsData } from "@/app/page";
import { roleGroups } from "@/lib/roleGroups";
import { useLocalStorage } from "@/lib/useLocalStorage";

const PDFDownloader = dynamic(() => import("@/components/PDFDownloader"), {
  ssr: false,
});

interface Props {
  data: PathsData;
}

interface SavedPath {
  from: string;
  to: string;
}

/** Pull the first recognisable timeframe out of a markdown string. */
function extractTimeline(md: string): string | null {
  const match = md.match(
    /\b(\d+[–\-]\d+\s*(?:months?|years?)|\d+\+?\s*(?:months?|years?))/i
  );
  return match ? match[1] : null;
}

// ─── Inner component (needs useSearchParams) ─────────────────────────────────

function CareerMapInner({ data }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { roles, paths } = data;

  const initialFrom = searchParams.get("from") ?? "";
  const initialTo = searchParams.get("to") ?? "";

  const [currentRole, setCurrentRole] = useState(initialFrom);
  const [targetRole, setTargetRole] = useState(initialTo);
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // ── Persistent state ──────────────────────────────────────────────────────
  const [savedPaths, setSavedPaths] = useLocalStorage<SavedPath[]>(
    "lenny-saved-paths",
    []
  );
  const [notes, setNotes] = useLocalStorage<Record<string, string>>(
    "lenny-notes",
    {}
  );

  // Prevent hydration mismatch: don't render localStorage-dependent UI until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Notes save state
  const [notesSaved, setNotesSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notReady = roles.length === 0;
  const totalPaths = Object.keys(paths).length;
  const pathKey = currentRole && targetRole ? `${currentRole}|||${targetRole}` : "";
  const isSaved = savedPaths.some((p) => p.from === currentRole && p.to === targetRole);

  function toggleSaved() {
    if (!currentRole || !targetRole) return;
    setSavedPaths((prev) =>
      isSaved
        ? prev.filter((p) => !(p.from === currentRole && p.to === targetRole))
        : [...prev, { from: currentRole, to: targetRole }]
    );
  }

  function updateNote(value: string) {
    if (!pathKey) return;
    setNotes((prev) => ({ ...prev, [pathKey]: value }));
    setNotesSaved(false);
  }

  const saveNote = useCallback(() => {
    // Notes are already persisted on every keystroke via updateNote;
    // this just gives the user visual confirmation.
    setNotesSaved(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setNotesSaved(false), 2500);
  }, []);

  // Auto-load path when URL params are present on mount
  useEffect(() => {
    if (initialFrom && initialTo) {
      const entry = paths[`${initialFrom}|||${initialTo}`];
      if (entry) {
        setMarkdown(entry.markdown);
      } else if (initialFrom || initialTo) {
        setError("No path found for this combination. Try a different pair.");
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Only show roles that have at least one outbound path in the left dropdown
  const sourceRoles = roles.filter((r) =>
    Object.keys(paths).some((key) => key.startsWith(`${r}|||`))
  );

  // Build grouped source roles
  const groupedSourceRoles = roleGroups
    .map((g) => ({ ...g, roles: g.roles.filter((r) => sourceRoles.includes(r)) }))
    .filter((g) => g.roles.length > 0);

  const assignedRoles = new Set(roleGroups.flatMap((g) => g.roles));
  const otherRoles = sourceRoles.filter((r) => !assignedRoles.has(r));
  if (otherRoles.length > 0) {
    groupedSourceRoles.push({ label: "Other", roles: otherRoles });
  }

  // Available target roles
  const availableTargets = currentRole
    ? roles.filter(
        (r) => r !== currentRole && paths[`${currentRole}|||${r}`] !== undefined
      )
    : [];

  // Related paths: same source OR same target, different pair, max 4
  const relatedPaths = markdown
    ? Object.keys(paths)
        .filter((key) => {
          const [from, to] = key.split("|||");
          return (
            (from === currentRole || to === targetRole) &&
            !(from === currentRole && to === targetRole)
          );
        })
        .slice(0, 4)
        .map((key) => {
          const [from, to] = key.split("|||");
          return { from, to, key };
        })
    : [];

  const timeline = markdown ? extractTimeline(markdown) : null;

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMarkdown("");
    if (!currentRole || !targetRole) return;

    const key = `${currentRole}|||${targetRole}`;
    const entry = paths[key];
    if (!entry) {
      setError("No path found for this combination. Try a different pair.");
      return;
    }

    setMarkdown(entry.markdown);
    const params = new URLSearchParams();
    params.set("from", currentRole);
    params.set("to", targetRole);
    router.replace(`?${params.toString()}`, { scroll: false });
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function handleCurrentRoleChange(value: string) {
    setCurrentRole(value);
    setTargetRole("");
    setMarkdown("");
    setError(null);
    router.replace("?", { scroll: false });
  }

  function loadPath(from: string, to: string) {
    const key = `${from}|||${to}`;
    const entry = paths[key];
    if (!entry) return;
    setCurrentRole(from);
    setTargetRole(to);
    setMarkdown(entry.markdown);
    setError(null);
    const params = new URLSearchParams();
    params.set("from", from);
    params.set("to", to);
    router.replace(`?${params.toString()}`, { scroll: false });
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

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
              Career Transition Map
            </h1>
            <p className="mt-2 text-base text-gray-600 leading-relaxed">
              Choose your current and target role. Every insight is grounded in
              Lenny&apos;s podcast interviews — no fabricated advice.
            </p>
          </div>
          {totalPaths > 0 && (
            <Link
              href="/explore"
              className="flex-shrink-0 text-sm text-brand-600 hover:text-brand-800 underline underline-offset-2 mt-1 whitespace-nowrap"
            >
              Browse all {totalPaths} paths →
            </Link>
          )}
        </div>
      </header>

      {/* Not ready state */}
      {notReady && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-800">
          <p className="font-medium mb-1">Paths not generated yet.</p>
          <p>
            Run{" "}
            <code className="px-1.5 py-0.5 rounded bg-amber-100 font-mono text-xs">
              ANTHROPIC_API_KEY=sk-ant-xxx node scripts/generate-paths.js
            </code>{" "}
            to build the static path library.
          </p>
        </div>
      )}

      {/* Form */}
      {!notReady && (
        <form onSubmit={handleGenerate} className="space-y-4 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Current role */}
            <div>
              <label
                htmlFor="current-role"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                I currently work as a
              </label>
              <div className="relative">
                <select
                  id="current-role"
                  value={currentRole}
                  onChange={(e) => handleCurrentRoleChange(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 pr-9 rounded-xl border border-gray-200 bg-white
                             text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-400
                             focus:border-transparent transition-shadow text-sm cursor-pointer"
                >
                  <option value="">Select a role…</option>
                  {groupedSourceRoles.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.roles.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>

            {/* Target role */}
            <div>
              <label
                htmlFor="target-role"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                I want to become a
              </label>
              <div className="relative">
                <select
                  id="target-role"
                  value={targetRole}
                  onChange={(e) => {
                    setTargetRole(e.target.value);
                    setMarkdown("");
                    setError(null);
                  }}
                  disabled={!currentRole}
                  className="w-full appearance-none px-4 py-2.5 pr-9 rounded-xl border border-gray-200 bg-white
                             text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-400
                             focus:border-transparent disabled:opacity-40 disabled:cursor-not-allowed
                             transition-shadow text-sm cursor-pointer"
                >
                  <option value="">
                    {currentRole ? "Select a target role…" : "Select current role first"}
                  </option>
                  {availableTargets.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!currentRole || !targetRole}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 text-white font-medium text-sm
                       hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2
                       disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Map My Path
          </button>
        </form>
      )}

      {/* Saved paths panel — mounted guard prevents SSR/CSR hydration mismatch */}
      {mounted && savedPaths.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2.5">
            Saved paths
          </p>
          <div className="flex flex-wrap gap-2">
            {savedPaths.map(({ from, to }) => {
              const active = from === currentRole && to === targetRole;
              return (
                <button
                  key={`${from}|||${to}`}
                  onClick={() => loadPath(from, to)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? "border-brand-400 bg-brand-50 text-brand-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50"
                  }`}
                >
                  <svg className="w-3 h-3 text-brand-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="text-gray-400">{from}</span>
                  <span className="text-gray-300">→</span>
                  <span className={active ? "text-brand-700" : "text-gray-700"}>{to}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Output */}
      {markdown && (
        <>
          {/* Market signal — full width block */}
          {data.marketSignals[targetRole] && (
            <MarketSignal
              targetRole={targetRole}
              signal={data.marketSignals[targetRole]}
              sourceUrl={data.marketSignalSourceUrl}
            />
          )}

          {/* Timeline badge + bookmark — inline row */}
          <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
            {timeline ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Estimated timeline: {timeline}
              </span>
            ) : (
              <span />
            )}

            {/* Bookmark toggle */}
            <button
              onClick={toggleSaved}
              aria-label={isSaved ? "Remove from saved paths" : "Save this path"}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                isSaved
                  ? "border-brand-400 bg-brand-50 text-brand-700 hover:bg-brand-100"
                  : "border-gray-200 bg-white text-gray-500 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50"
              }`}
            >
              <svg
                className="w-3.5 h-3.5"
                fill={isSaved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {isSaved ? "Saved" : "Save path"}
            </button>
          </div>

          <LearningPathOutput
            ref={outputRef}
            markdown={markdown}
            citationUrls={data.citationUrls}
          />

          {/* Episode playlist with checkboxes */}
          <EpisodePlaylist
            markdown={markdown}
            citationUrls={data.citationUrls}
            pathKey={pathKey}
          />

          {/* Podcast recommendations from corpus */}
          <PodcastRecs recs={data.podcastRecs[pathKey] ?? []} />

          {/* Personal notes */}
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="path-notes"
                className="block text-xs font-semibold text-gray-400 uppercase tracking-widest"
              >
                My notes
              </label>
              <div className="flex items-center gap-2">
                {notesSaved && (
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Saved
                  </span>
                )}
                <button
                  onClick={saveNote}
                  className="text-xs font-medium text-brand-600 hover:text-brand-800 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
            <textarea
              id="path-notes"
              value={notes[pathKey] ?? ""}
              onChange={(e) => updateNote(e.target.value)}
              placeholder="What resonated? Which episodes are priorities? What do you want to action first?"
              rows={4}
              className="w-full text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none leading-relaxed"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <PDFDownloader
              outputRef={outputRef}
              currentRole={currentRole}
              targetRole={targetRole}
            />
          </div>

          {/* Related paths */}
          {relatedPaths.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                Also explore
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedPaths.map(({ from, to, key }) => (
                  <button
                    key={key}
                    onClick={() => loadPath(from, to)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200
                               bg-white text-xs font-medium hover:border-brand-300 hover:text-brand-700
                               hover:bg-brand-50 transition-colors cursor-pointer"
                  >
                    <span className="text-gray-400">{from}</span>
                    <span className="text-gray-300 mx-0.5">→</span>
                    <span className="text-gray-700">{to}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-400">
        Built on Lenny&apos;s Newsletter podcast transcripts.
      </footer>
    </main>
  );
}

// ─── Public export wrapped in Suspense (required for useSearchParams) ─────────

export default function CareerMapApp({ data }: Props) {
  return (
    <Suspense>
      <CareerMapInner data={data} />
    </Suspense>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ChevronDown() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
