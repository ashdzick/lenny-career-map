"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";

interface Props {
  markdown: string;
  citationUrls: Record<string, string>;
  pathKey: string; // "From|||To" — scopes listened state to each path
  /** `embedded`: list only (parent supplies section title + outer card). */
  variant?: "card" | "embedded";
}

/** Whether markdown contains at least one citation `[like this]`. */
export function hasMarkdownCitations(markdown: string): boolean {
  return /\[[^\]]+\]/.test(markdown);
}

export default function EpisodePlaylist({
  markdown,
  citationUrls,
  pathKey,
  variant = "card",
}: Props) {
  // Extract all [citation] matches from markdown, preserving order, de-duplicating
  const seen = new Set<string>();
  const episodes: { text: string; url?: string }[] = [];

  const regex = /\[([^\]]+)\]/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const text = match[1];
    if (!seen.has(text)) {
      seen.add(text);
      episodes.push({ text, url: citationUrls[text] });
    }
  }

  // Persisted set of listened episode titles, scoped to this path
  const [listened, setListened] = useLocalStorage<string[]>(
    `lenny-listened-${pathKey}`,
    []
  );

  if (episodes.length === 0) return null;

  function toggleListened(title: string) {
    setListened((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  }

  const listenedCount = episodes.filter((e) => listened.includes(e.text)).length;

  const list = (
    <ol className="space-y-2.5">
        {episodes.map(({ text, url }) => {
          const done = listened.includes(text);
          return (
            <li key={text} className="flex items-start gap-3 text-sm">
              {/* Checkbox */}
              <button
                onClick={() => toggleListened(text)}
                aria-label={done ? "Mark as not listened" : "Mark as listened"}
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

              {/* Episode link */}
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`leading-relaxed transition-colors ${
                    done
                      ? "line-through text-gray-400"
                      : "text-brand-700 hover:text-brand-900 hover:underline underline-offset-2"
                  }`}
                >
                  {text}
                </a>
              ) : (
                <span className={`leading-relaxed ${done ? "line-through text-gray-400" : "text-gray-600"}`}>
                  {text}
                </span>
              )}
            </li>
          );
        })}
      </ol>
  );

  if (variant === "embedded") {
    return (
      <div className="space-y-2">
        {listenedCount > 0 && (
          <div className="flex justify-end">
            <span className="text-xs text-brand-600 font-medium">
              {listenedCount}/{episodes.length} listened
            </span>
          </div>
        )}
        {list}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl bg-brand-50 border border-brand-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-brand-800 flex items-center gap-2">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          Articles &mdash; {episodes.length} cited
        </h3>
        {listenedCount > 0 && (
          <span className="text-xs text-brand-600 font-medium">
            {listenedCount}/{episodes.length} listened
          </span>
        )}
      </div>
      {list}
    </div>
  );
}
