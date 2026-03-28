"use client";

interface Props {
  markdown: string;
  citationUrls: Record<string, string>;
}

export default function EpisodePlaylist({ markdown, citationUrls }: Props) {
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

  if (episodes.length === 0) return null;

  return (
    <div className="mt-6 rounded-2xl bg-brand-50 border border-brand-100 p-6">
      <h3 className="text-sm font-semibold text-brand-800 mb-4 flex items-center gap-2">
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
      <ol className="space-y-2.5">
        {episodes.map(({ text, url }, i) => (
          <li key={text} className="flex items-start gap-3 text-sm">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-200 text-brand-700 text-xs font-bold flex items-center justify-center mt-0.5 leading-none">
              {i + 1}
            </span>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-900 hover:underline underline-offset-2 transition-colors leading-relaxed"
              >
                {text}
              </a>
            ) : (
              <span className="text-gray-600 leading-relaxed">{text}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
