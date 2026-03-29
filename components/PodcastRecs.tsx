"use client";

import type { ReactNode } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

export interface PodcastRec {
  title: string;
  guest: string;
  url?: string;
}

function recStorageId(title: string, guest: string): string {
  return `${title}\x1e${guest}`;
}

interface Props {
  recs: PodcastRec[];
  /** `embedded`: list inside Your learning plan; pass `embeddedTitle` for heading + progress row. */
  variant?: "card" | "embedded";
  /** Scopes persisted checkbox state per path (use with `embedded`). */
  pathKey?: string;
  /** Shown left of the x/y completed line (embedded only). */
  embeddedTitle?: ReactNode;
}

export default function PodcastRecs({
  recs,
  variant = "card",
  pathKey = "",
  embeddedTitle,
}: Props) {
  const [heard, setHeard] = useLocalStorage<string[]>(
    `lenny-podcast-heard-${pathKey || "default"}`,
    []
  );

  if (!recs || recs.length === 0) return null;

  function toggleHeard(id: string) {
    setHeard((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      return list.includes(id) ? list.filter((t) => t !== id) : [...list, id];
    });
  }

  const heardCount = recs.filter((r) => heard.includes(recStorageId(r.title, r.guest))).length;

  const list = (
    <ol className="space-y-2.5">
      {recs.map(({ title, guest, url }) => {
        const displayTitle = title.split(" | ")[0].trim();
        const id = recStorageId(title, guest);
        const done = heard.includes(id);
        const guestLine = guest.trim();

        return (
          <li key={id} className="flex items-start gap-3 text-sm">
            <button
              type="button"
              onClick={() => toggleHeard(id)}
              aria-label={
                done
                  ? `Mark episode as not completed: ${displayTitle}`
                  : `Mark episode as completed: ${displayTitle}`
              }
              className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                done
                  ? "bg-brand-500 border-brand-500"
                  : "border-brand-300 hover:border-brand-500 bg-white"
              }`}
            >
              {done && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            <div className="min-w-0">
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block leading-relaxed transition-colors ${
                    done
                      ? "line-through text-gray-600"
                      : "text-brand-700 hover:text-brand-900 hover:underline underline-offset-2"
                  }`}
                >
                  {displayTitle}
                </a>
              ) : (
                <span
                  className={`block leading-relaxed ${done ? "line-through text-gray-600" : "text-gray-700"}`}
                >
                  {displayTitle}
                </span>
              )}
              {guestLine.length > 0 && (
                <p className={`text-xs mt-0.5 leading-relaxed ${done ? "text-gray-500" : "text-gray-600"}`}>
                  {guestLine}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "embedded") {
    return (
      <div>
        {embeddedTitle != null && (
          <div className="flex items-center justify-between gap-3 mb-3 min-h-[1.25rem]">
            <div className="min-w-0">{embeddedTitle}</div>
            <span className="text-xs text-brand-700 font-medium tabular-nums shrink-0">
              {heardCount}/{recs.length} completed
            </span>
          </div>
        )}
        {list}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl bg-brand-50 border border-brand-100 p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold text-brand-800 flex items-center gap-2 min-w-0">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          Episodes &mdash; {recs.length} recommended
        </h3>
        <span className="text-xs text-brand-700 font-medium tabular-nums shrink-0">
          {heardCount}/{recs.length} completed
        </span>
      </div>
      {list}
    </div>
  );
}
