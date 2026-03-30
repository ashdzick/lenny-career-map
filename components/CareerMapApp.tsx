"use client";

import { useRef, useState, useEffect, useLayoutEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import LearningPathOutput, { extractPathTocFromMarkdown } from "@/components/LearningPathOutput";
import GoDeeperSection from "@/components/GoDeeperSection";
import { PathReadingNavMobile, PathReadingNavGutter } from "@/components/PathReadingNav";
import { hasMarkdownCitations } from "@/components/EpisodePlaylist";
import CareerMapLoading from "@/components/CareerMapLoading";
import HomeBuildYourOwnLinks from "@/components/HomeBuildYourOwnLinks";
import { HomeHowItWorks, HomeTryTransitions } from "@/components/HomeEmptyFeatured";
import ReadingColumnShell from "@/components/ReadingColumnShell";
import MarketSignal from "@/components/MarketSignal";
import type { PathsData } from "@/app/page";
import { pickHomeStarterPaths } from "@/lib/homeFeatured";
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

  const urlFrom = searchParams.get("from") ?? "";
  const urlTo = searchParams.get("to") ?? "";

  /** URL is source of truth; initial empty avoids SSR/hydration mismatch with query string. */
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const pathScrollRef = useRef<HTMLDivElement>(null);
  /** Last path key we scrolled to — avoids duplicate scroll on URL + debounce both loading same pair. */
  const pathScrollKeyRef = useRef<string | null>(null);
  /** While editing “from” with a path open: keep article until ?from&to resolves again (avoid wiping the page). */
  const preserveArticleForPartialUrlRef = useRef(false);
  /** Pair key for notes/save/headline when target row is cleared during that edit (`from|||target`). */
  const [pathStuckKey, setPathStuckKey] = useState<string | null>(null);
  /** Pair key for the markdown currently on screen (may differ from URL while a new pair is loading). */
  const [contentPathKey, setContentPathKey] = useState<string | null>(null);
  /** Latest paths map — do not put `paths` in URL-sync effect deps (RSC can pass a new object ref after each router.replace). */
  const pathsRef = useRef(paths);
  pathsRef.current = paths;

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
  const pathKey =
    currentRole && targetRole
      ? `${currentRole}|||${targetRole}`
      : pathStuckKey ?? "";
  /** Notes, save, headline, podcast recs: tie to rendered article, not draft URL pair. */
  const storagePathKey =
    markdown && contentPathKey && contentPathKey.includes("|||")
      ? contentPathKey
      : pathKey.includes("|||")
        ? pathKey
        : "";
  const savedPathsSafe = Array.isArray(savedPaths) ? savedPaths : [];
  const isSaved = Boolean(
    storagePathKey &&
      savedPathsSafe.some((p) => `${p.from}|||${p.to}` === storagePathKey)
  );
  const notesSafe: Record<string, string> =
    notes != null && typeof notes === "object" && !Array.isArray(notes)
      ? (notes as Record<string, string>)
      : {};

  function toggleSaved() {
    if (!storagePathKey) return;
    const [from, to] = storagePathKey.split("|||");
    if (!from || !to) return;
    setSavedPaths((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      return isSaved
        ? list.filter((p) => !(p.from === from && p.to === to))
        : [...list, { from, to }];
    });
  }

  function updateNote(value: string) {
    if (!storagePathKey) return;
    notesEditRef.current = true;
    setNotes((prev) => {
      const base =
        prev != null && typeof prev === "object" && !Array.isArray(prev)
          ? (prev as Record<string, string>)
          : {};
      return { ...base, [storagePathKey]: value };
    });
  }

  /** Only reset note UI when the user actually switches paths (not on first mount). */
  useEffect(() => {
    const prev = prevPathKeyForNotes.current;
    prevPathKeyForNotes.current = storagePathKey;
    if (prev === null || prev === storagePathKey) return;
    notesEditRef.current = false;
    setNoteStatus("idle");
    const { t1, t2 } = noteStatusTimers.current;
    if (t1) clearTimeout(t1);
    if (t2) clearTimeout(t2);
  }, [storagePathKey]);

  const currentNoteText = notesSafe[storagePathKey];

  useEffect(() => {
    if (!storagePathKey || !notesEditRef.current) return;
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
  }, [storagePathKey, currentNoteText]);

  // Apply URL → state + path content (deep links, back/forward, logo home, partial ?from=)
  useLayoutEffect(() => {
    const pathsMap = pathsRef.current;
    setCurrentRole(urlFrom);
    setTargetRole(urlTo);

    if (urlFrom && urlTo) {
      preserveArticleForPartialUrlRef.current = false;
      setPathStuckKey(null);
      const key = `${urlFrom}|||${urlTo}`;
      const entry = pathsMap[key];
      if (entry) {
        setMarkdown(entry.markdown);
        setContentPathKey(key);
        setError(null);
        pathScrollKeyRef.current = key;
        window.setTimeout(() => {
          pathScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      } else {
        setMarkdown("");
        setContentPathKey(null);
        pathScrollKeyRef.current = null;
        setError("No path found for this combination. Try a different pair.");
      }
    } else if (urlFrom && !urlTo && preserveArticleForPartialUrlRef.current) {
      /* User changed “from” while reading; URL is ?from= only — keep article until they pick a new target. */
      return;
    } else {
      preserveArticleForPartialUrlRef.current = false;
      setPathStuckKey(null);
      setMarkdown("");
      setContentPathKey(null);
      pathScrollKeyRef.current = null;
      setError(null);
    }
  }, [urlFrom, urlTo]);

  // Debounced URL write when the user changes roles (keeps ?from / ?from&to shareable and aligned with selects)
  useEffect(() => {
    if (!currentRole) return;

    const t = window.setTimeout(() => {
      const params = new URLSearchParams();
      params.set("from", currentRole);
      if (targetRole) params.set("to", targetRole);
      const desired = params.toString();
      const cur = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search.slice(1) : ""
      );
      const curTo = cur.get("to") ?? "";
      if (cur.get("from") === currentRole && curTo === (targetRole ?? "")) return;
      router.replace(`?${desired}`, { scroll: false });
    }, 320);

    return () => window.clearTimeout(t);
  }, [currentRole, targetRole, router]);

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

  const [relFrom, relTo] = storagePathKey
    ? storagePathKey.split("|||")
    : [currentRole, targetRole];

  // Related paths: same source OR same target, different pair, max 4
  const relatedPaths = markdown
    ? Object.keys(paths)
        .filter((key) => {
          const [from, to] = key.split("|||");
          return (
            (from === relFrom || to === relTo) &&
            !(from === relFrom && to === relTo)
          );
        })
        .slice(0, 4)
        .map((key) => {
          const [from, to] = key.split("|||");
          return { from, to, key };
        })
    : [];

  const timeline = markdown ? extractTimeline(markdown) : null;
  const marketTargetRole =
    storagePathKey && storagePathKey.includes("|||")
      ? (storagePathKey.split("|||")[1] ?? "")
      : "";
  const pathMarketSignal =
    markdown && marketTargetRole ? data.marketSignals[marketTargetRole] : undefined;
  const pathTocItems = useMemo(() => extractPathTocFromMarkdown(markdown), [markdown]);
  const hasGoDeeperContent =
    !!markdown &&
    (hasMarkdownCitations(markdown) ||
      ((data.podcastRecs?.[storagePathKey]?.length ?? 0) > 0));

  const navSectionIds = useMemo(() => {
    const ids = pathTocItems.map((item) => item.id);
    if (hasGoDeeperContent) ids.push("your-learning-plan");
    ids.push("my-notes");
    return ids;
  }, [pathTocItems, hasGoDeeperContent]);

  const activeSectionId = useActiveScrollSection(navSectionIds, Boolean(markdown));

  function handleCurrentRoleChange(value: string) {
    if (!value) {
      preserveArticleForPartialUrlRef.current = false;
      setPathStuckKey(null);
      setCurrentRole("");
      setTargetRole("");
      setMarkdown("");
      setContentPathKey(null);
      setError(null);
      pathScrollKeyRef.current = null;
      router.replace("?", { scroll: false });
      return;
    }

    if (markdown && pathScrollKeyRef.current) {
      preserveArticleForPartialUrlRef.current = true;
      setPathStuckKey(pathScrollKeyRef.current);
    } else {
      preserveArticleForPartialUrlRef.current = false;
      setPathStuckKey(null);
      setMarkdown("");
      setContentPathKey(null);
      setError(null);
      pathScrollKeyRef.current = null;
    }

    setCurrentRole(value);
    setTargetRole("");

    const params = new URLSearchParams();
    params.set("from", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  /** Logo-style home: clear path UI (soft nav to `/` alone would keep stale client state). */
  function resetToHome() {
    preserveArticleForPartialUrlRef.current = false;
    setPathStuckKey(null);
    setCurrentRole("");
    setTargetRole("");
    setMarkdown("");
    setContentPathKey(null);
    setError(null);
    pathScrollKeyRef.current = null;
    router.replace("/", { scroll: true });
  }

  function loadPath(from: string, to: string) {
    preserveArticleForPartialUrlRef.current = false;
    setPathStuckKey(null);
    const key = `${from}|||${to}`;
    const entry = paths[key];
    if (!entry) return;
    setCurrentRole(from);
    setTargetRole(to);
    setMarkdown(entry.markdown);
    setContentPathKey(key);
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

  const inFeaturedHero = !markdown && !notReady;
  const starterPaths = useMemo(() => pickHomeStarterPaths(paths, 2), [paths]);
  const homeHeader = (
    <header
      className={
        markdown ? "mb-6" : inFeaturedHero ? "mb-6" : "mb-10"
      }
    >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-brand-500" />
          <span className="text-xs font-medium text-brand-800 uppercase tracking-widest">
            Lenny&apos;s Podcast
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              resetToHome();
            }}
            className="min-w-0 inline-block rounded-sm text-brand-900 no-underline decoration-transparent outline-none transition-opacity hover:opacity-90 hover:no-underline focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50"
            aria-label="Career Transition Map — Home"
          >
            <h1 className="text-3xl font-bold text-brand-900 leading-tight">
              Career Transition Map
            </h1>
          </Link>
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
  );

  const selectClassBase =
    "w-full appearance-none px-4 py-3 pr-10 rounded-xl text-gray-900 " +
    "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 " +
    "transition-colors text-sm cursor-pointer " +
    "disabled:bg-gray-100 disabled:border-gray-200 disabled:hover:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed";
  /** Homepage hero card only — tinted so they stand out on white. */
  const selectClassHome =
    `${selectClassBase} border border-brand-200/90 bg-brand-50 hover:bg-brand-100/60 focus:border-brand-400`;
  /** When a path is open or outside hero — white so they don’t blend into tinted page chrome. */
  const selectClassPlain =
    `${selectClassBase} border border-gray-200 bg-white hover:bg-gray-50/90 focus:border-brand-300`;

  const rolePickersPlain = (
    <div className="space-y-4 mb-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="py-2">
          <label
            htmlFor="current-role"
            className="block text-sm font-bold text-gray-700 mb-2.5"
          >
            I currently work as a
          </label>
          <div className="relative">
            <select
              id="current-role"
              suppressHydrationWarning
              value={currentRole}
              onChange={(e) => handleCurrentRoleChange(e.target.value)}
              className={selectClassPlain}
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

        <div className="py-2">
          <label
            htmlFor="target-role"
            className="block text-sm font-bold text-gray-700 mb-2.5"
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
              className={selectClassPlain}
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
  );

  const heroPickerModule = (
    <div className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 mb-8 shadow-sm ring-1 ring-gray-100/80">
      <h2 className="text-xl font-bold text-brand-900 mt-0 mb-3 scroll-mt-24">
        Build Your Transition Map
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Model a tech career transition. Receive market insights, time horizons and learning
        recommendations (from Lenny&apos;s Podcast and Newsletter) to help you make the switch
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-end sm:gap-4">
        <div className="py-2">
          <label
            htmlFor="current-role"
            className="block text-sm font-bold text-gray-700 mb-2.5"
          >
            I currently work as a
          </label>
          <div className="relative">
            <select
              id="current-role"
              suppressHydrationWarning
              value={currentRole}
              onChange={(e) => handleCurrentRoleChange(e.target.value)}
              className={selectClassHome}
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

        <div
          className="hidden sm:flex items-end justify-center pb-3 text-brand-500"
          aria-hidden
        >
          <svg
            className="w-9 h-9 shrink-0"
            width={36}
            height={36}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>

        <div className="py-2">
          <label
            htmlFor="target-role"
            className="block text-sm font-bold text-gray-700 mb-2.5"
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
              className={selectClassHome}
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

      {!currentRole && (
        <HomeTryTransitions paths={starterPaths} onTry={loadPath} embedded />
      )}
    </div>
  );

  return (
    <main id="main-content" tabIndex={-1}>
      <ReadingColumnShell>
      {inFeaturedHero ? (
        <div className="border-b border-gray-100 pb-8 mb-6">
          {homeHeader}
          {heroPickerModule}
          <HomeHowItWorks />
          {!currentRole && (
            <HomeBuildYourOwnLinks className="mt-4 mb-0" />
          )}
        </div>
      ) : (
        <>
          {homeHeader}
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
          {!notReady && rolePickersPlain}
        </>
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

      {!currentRole && !inFeaturedHero && (
        <HomeBuildYourOwnLinks className="mt-2 mb-6" />
      )}
      </ReadingColumnShell>

      {/* Output — separated from header + pickers for clearer “content” band */}
      {markdown && (
        <div className="mt-8 border-t border-gray-100 pt-7">
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
              {/* Path title (caption = timeline) + save */}
              <div className="mb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <h2 className="text-2xl sm:text-[1.65rem] font-bold text-brand-900 leading-snug tracking-tight">
                      <span className="text-gray-600 font-semibold">{relFrom}</span>
                      <span className="mx-2 text-gray-500 font-normal" aria-hidden>
                        →
                      </span>
                      <span>{relTo}</span>
                    </h2>
                    {timeline && (
                      <p className="mt-1.5 text-sm text-gray-600 leading-snug flex items-start gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 mt-0.5"
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
                        <span>
                          Estimated timeline:{" "}
                          <span className="font-medium text-gray-800 tabular-nums">{timeline}</span>
                        </span>
                      </p>
                    )}
                  </div>
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
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 self-start sm:mt-0.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
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
                        targetRole={marketTargetRole}
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
                pathKey={storagePathKey}
                recs={data.podcastRecs[storagePathKey] ?? []}
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
                  value={notesSafe[storagePathKey] ?? ""}
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
                    currentRole={relFrom}
                    targetRole={relTo}
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
        </div>
      )}
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
