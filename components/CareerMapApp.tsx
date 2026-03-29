"use client";

import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import LearningPathOutput, { extractPathTocFromMarkdown } from "@/components/LearningPathOutput";
import GoDeeperSection from "@/components/GoDeeperSection";
import { PathReadingNavMobile, PathReadingNavGutter } from "@/components/PathReadingNav";
import { hasMarkdownCitations } from "@/components/EpisodePlaylist";
import CareerMapLoading from "@/components/CareerMapLoading";
import ReadingColumnShell from "@/components/ReadingColumnShell";
import MarketSignal from "@/components/MarketSignal";
import type { PathsData } from "@/app/page";
import { roleGroups } from "@/lib/roleGroups";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useActiveScrollSection } from "@/lib/useActiveScrollSection";

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
  const pathScrollRef = useRef<HTMLDivElement>(null);
  /** Last path key we scrolled to — avoids duplicate scroll on URL + debounce both loading same pair. */
  const pathScrollKeyRef = useRef<string | null>(null);

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

  /** idle | saving | saved — notes persist on every change; this is feedback only */
  const [noteStatus, setNoteStatus] = useState<"idle" | "saving" | "saved">("idle");
  const notesEditRef = useRef(false);
  const noteStatusTimers = useRef<{ t1?: ReturnType<typeof setTimeout>; t2?: ReturnType<typeof setTimeout> }>(
    {}
  );
  const prevPathKeyForNotes = useRef<string | null>(null);

  const notReady = roles.length === 0;
  const totalPaths = Object.keys(paths).length;
  const pathKey = currentRole && targetRole ? `${currentRole}|||${targetRole}` : "";
  const savedPathsSafe = Array.isArray(savedPaths) ? savedPaths : [];
  const isSaved = savedPathsSafe.some((p) => p.from === currentRole && p.to === targetRole);
  const notesSafe: Record<string, string> =
    notes != null && typeof notes === "object" && !Array.isArray(notes)
      ? (notes as Record<string, string>)
      : {};

  function toggleSaved() {
    if (!currentRole || !targetRole) return;
    setSavedPaths((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      return isSaved
        ? list.filter((p) => !(p.from === currentRole && p.to === targetRole))
        : [...list, { from: currentRole, to: targetRole }];
    });
  }

  function updateNote(value: string) {
    if (!pathKey) return;
    notesEditRef.current = true;
    setNotes((prev) => {
      const base =
        prev != null && typeof prev === "object" && !Array.isArray(prev)
          ? (prev as Record<string, string>)
          : {};
      return { ...base, [pathKey]: value };
    });
  }

  /** Only reset note UI when the user actually switches paths (not on first mount). */
  useEffect(() => {
    const prev = prevPathKeyForNotes.current;
    prevPathKeyForNotes.current = pathKey;
    if (prev === null || prev === pathKey) return;
    notesEditRef.current = false;
    setNoteStatus("idle");
    const { t1, t2 } = noteStatusTimers.current;
    if (t1) clearTimeout(t1);
    if (t2) clearTimeout(t2);
  }, [pathKey]);

  const currentNoteText = notesSafe[pathKey];

  useEffect(() => {
    if (!pathKey || !notesEditRef.current) return;
    setNoteStatus("saving");
    const { t1: prev1, t2: prev2 } = noteStatusTimers.current;
    if (prev1) clearTimeout(prev1);
    if (prev2) clearTimeout(prev2);
    const t1 = setTimeout(() => setNoteStatus("saved"), 450);
    const t2 = setTimeout(() => setNoteStatus("idle"), 3200);
    noteStatusTimers.current = { t1, t2 };
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathKey, currentNoteText]);

  // Auto-load path when URL params are present on mount
  useEffect(() => {
    if (initialFrom && initialTo) {
      const key = `${initialFrom}|||${initialTo}`;
      const entry = paths[key];
      if (entry) {
        setMarkdown(entry.markdown);
        pathScrollKeyRef.current = key;
      } else if (initialFrom || initialTo) {
        setError("No path found for this combination. Try a different pair.");
        pathScrollKeyRef.current = null;
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced auto-load when both roles are selected (keeps URL in sync)
  useEffect(() => {
    if (!currentRole || !targetRole) return;

    const key = `${currentRole}|||${targetRole}`;
    const t = window.setTimeout(() => {
      const entry = paths[key];
      setError(null);
      if (entry) {
        setMarkdown(entry.markdown);
        const params = new URLSearchParams();
        params.set("from", currentRole);
        params.set("to", targetRole);
        router.replace(`?${params.toString()}`, { scroll: false });
        if (pathScrollKeyRef.current !== key) {
          pathScrollKeyRef.current = key;
          window.setTimeout(() => {
            pathScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }
      } else {
        setMarkdown("");
        pathScrollKeyRef.current = null;
        setError("No path found for this combination. Try a different pair.");
      }
    }, 320);

    return () => window.clearTimeout(t);
  }, [currentRole, targetRole, paths, router]);

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
  const pathMarketSignal =
    markdown && targetRole ? data.marketSignals[targetRole] : undefined;
  const pathTocItems = useMemo(() => extractPathTocFromMarkdown(markdown), [markdown]);
  const hasGoDeeperContent =
    !!markdown &&
    (hasMarkdownCitations(markdown) ||
      ((data.podcastRecs?.[pathKey]?.length ?? 0) > 0));

  const navSectionIds = useMemo(() => {
    const ids = pathTocItems.map((item) => item.id);
    if (hasGoDeeperContent) ids.push("your-learning-plan");
    ids.push("my-notes");
    return ids;
  }, [pathTocItems, hasGoDeeperContent]);

  const activeSectionId = useActiveScrollSection(navSectionIds, Boolean(markdown));

  function handleCurrentRoleChange(value: string) {
    setCurrentRole(value);
    setTargetRole("");
    setMarkdown("");
    setError(null);
    pathScrollKeyRef.current = null;
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
    pathScrollKeyRef.current = key;
    window.setTimeout(() => {
      pathScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <ReadingColumnShell>
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-brand-500" />
          <span className="text-xs font-medium text-brand-800 uppercase tracking-widest">
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
          {(totalPaths > 0 || (mounted && savedPathsSafe.length > 0)) && (
            <nav
              className="flex flex-shrink-0 flex-wrap items-center justify-end gap-x-4 gap-y-2 mt-1"
              aria-label="Path shortcuts"
            >
              {totalPaths > 0 && (
                <Link
                  href="/explore"
                  className="text-sm text-brand-700 hover:text-brand-900 underline underline-offset-2 whitespace-nowrap"
                  aria-label={`Browse all ${totalPaths} career transition paths`}
                  title="Open the full list of transitions"
                >
                  Browse all {totalPaths} paths →
                </Link>
              )}
              {mounted && savedPathsSafe.length > 0 && (
                <Link
                  href="/saved"
                  className="text-sm text-brand-700 hover:text-brand-900 underline underline-offset-2 whitespace-nowrap"
                  aria-label={`View ${savedPathsSafe.length} saved ${savedPathsSafe.length === 1 ? "path" : "paths"}`}
                  title="Open paths you saved on this device"
                >
                  Saved {savedPathsSafe.length} {savedPathsSafe.length === 1 ? "path" : "paths"} →
                </Link>
              )}
            </nav>
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
              ANTHROPIC_API_KEY=sk-ant-xxx npm run generate:paths
            </code>{" "}
            to build the static path library.
          </p>
        </div>
      )}

      {/* Form */}
      {!notReady && (
        <div className="space-y-4 mb-6">
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
                  suppressHydrationWarning
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
                  suppressHydrationWarning
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
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
          role="alert"
        >
          {error}
        </div>
      )}
      </ReadingColumnShell>

      {/* Output */}
      {markdown && (
        <>
          <PathReadingNavMobile
            tocItems={pathTocItems}
            showGoDeeper={hasGoDeeperContent}
            activeSectionId={activeSectionId}
          />

          <div className="lg:grid lg:grid-cols-[10rem_minmax(0,48rem)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:items-start">
            <div className="hidden lg:block lg:col-start-1 lg:row-start-1 min-h-0" aria-hidden />

            <div
              ref={pathScrollRef}
              className="min-w-0 scroll-mt-28 lg:col-start-2 lg:row-start-1"
            >
              {/* Path title + timeline + save */}
              <div className="mb-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h2 className="text-2xl sm:text-[1.65rem] font-bold text-brand-900 leading-snug tracking-tight">
                    <span className="text-gray-600 font-semibold">{currentRole}</span>
                    <span className="mx-2 text-gray-500 font-normal" aria-hidden>
                      →
                    </span>
                    <span>{targetRole}</span>
                  </h2>
                  <button
                    type="button"
                    onClick={toggleSaved}
                    aria-label={
                      isSaved
                        ? "Remove this transition from saved paths"
                        : "Save this transition to your saved paths on this device"
                    }
                    title={
                      isSaved
                        ? "Remove from your saved list (this device only)"
                        : "Add to your saved list to reopen later (this device only)"
                    }
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                      isSaved
                        ? "border-brand-400 bg-brand-50 text-brand-700 hover:bg-brand-100"
                        : "border-gray-200 bg-white text-gray-500 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill={isSaved ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    {isSaved ? "Saved" : "Save path"}
                  </button>
                </div>
                {timeline && (
                  <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Estimated timeline: {timeline}
                  </span>
                )}
              </div>
            </div>

            <PathReadingNavGutter
              tocItems={pathTocItems}
              showGoDeeper={hasGoDeeperContent}
              activeSectionId={activeSectionId}
              className="lg:col-start-1 lg:row-start-2"
            />

            <div className="min-w-0 lg:col-start-2 lg:row-start-2">
              <LearningPathOutput
                ref={outputRef}
                markdown={markdown}
                citationUrls={data.citationUrls}
                afterFirstH2={
                  pathMarketSignal ? (
                    <div className="mb-4">
                      <MarketSignal
                        targetRole={targetRole}
                        signal={pathMarketSignal}
                        sourceUrl={data.marketSignalSourceUrl}
                        compact
                        className="mb-0 shadow-none"
                      />
                    </div>
                  ) : undefined
                }
              />

              <GoDeeperSection
                markdown={markdown}
                citationUrls={data.citationUrls}
                pathKey={pathKey}
                recs={data.podcastRecs[pathKey] ?? []}
              />

              {/* Personal notes */}
              <div
                id="my-notes"
                className="scroll-mt-24 mt-6 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-gray-100"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <label
                      htmlFor="path-notes"
                      className="block text-xs font-semibold text-gray-600 uppercase tracking-widest"
                    >
                      My notes
                    </label>
                    <p className="mt-1 text-xs text-gray-600 leading-snug">
                      Saved automatically in this browser.
                    </p>
                  </div>
                  <div
                    className="flex-shrink-0 min-h-[1.25rem] flex items-center"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {noteStatus === "saving" && (
                      <span className="text-xs text-gray-600 font-medium">Saving…</span>
                    )}
                    {noteStatus === "saved" && (
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Saved
                      </span>
                    )}
                  </div>
                </div>
                <textarea
                  id="path-notes"
                  value={notesSafe[pathKey] ?? ""}
                  onChange={(e) => updateNote(e.target.value)}
                  placeholder="What resonated? Which episodes are priorities? What do you want to action first?"
                  rows={4}
                  className="w-full text-sm text-gray-700 placeholder-gray-500 resize-none focus:outline-none leading-relaxed"
                />
              </div>

              {mounted && (
                <div className="mt-5">
                  <PDFDownloader
                    outputRef={outputRef}
                    currentRole={currentRole}
                    targetRole={targetRole}
                    variant="link"
                  />
                </div>
              )}

              {/* Related paths — after long read */}
              {relatedPaths.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-widest mb-3">
                    Also explore
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {relatedPaths.map(({ from, to, key }) => (
                      <button
                        key={`end-${key}`}
                        type="button"
                        onClick={() => loadPath(from, to)}
                        aria-label={`Open career path from ${from} to ${to}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200
                                   bg-white text-xs font-medium hover:border-brand-300 hover:text-brand-700
                                   hover:bg-brand-50 transition-colors cursor-pointer"
                      >
                        <span className="text-gray-600">{from}</span>
                        <span className="text-gray-500 mx-0.5" aria-hidden>
                          →
                        </span>
                        <span className="text-gray-700">{to}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-600">
        Built on Lenny&apos;s Newsletter podcast transcripts.
      </footer>
    </main>
  );
}

// ─── Public export wrapped in Suspense (required for useSearchParams) ─────────

export default function CareerMapApp({ data }: Props) {
  return (
    <Suspense fallback={<CareerMapLoading />}>
      <CareerMapInner data={data} />
    </Suspense>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ChevronDown() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      {/* width/height + inline size: if Tailwind CSS fails to load, SVGs otherwise fill the viewport */}
      <svg
        className="h-4 w-4 text-gray-600"
        width={16}
        height={16}
        style={{ width: 16, height: 16, flexShrink: 0 }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
