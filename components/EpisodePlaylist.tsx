"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";

interface Props {
  markdown: string;
  citationUrls: Record<string, string>;
  pathKey: string; // "From|||To" — scopes listened state to each path
}

export default function EpisodePlaylist({ markdown, citationUrls, pathKey }: Props) {
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
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          Episode Playlist &mdash; {episodes.length} episode{episodes.length !== 1 ? "s" : ""} cited
        </h3>
        {listenedCount > 0 && (
          <span className="text-xs text-brand-600 font-medium">
            {listenedCount}/{episodes.length} listened
          </span>
        )}
      </div>
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
    </div>
  );
}
