"use client";

export interface PodcastRec {
  title: string;
  guest: string;
  url?: string;
}

interface Props {
  recs: PodcastRec[];
  /** `embedded`: list only inside Go deeper (parent supplies title + shell). */
  variant?: "card" | "embedded";
}

export default function PodcastRecs({ recs, variant = "card" }: Props) {
  if (!recs || recs.length === 0) return null;

  const list = (
    <ol className="space-y-3">
        {recs.map(({ title, guest, url }, i) => {
          // Strip the "| Guest Name (Company)" suffix from the display title
          const displayTitle = title.split(" | ")[0].trim();

          return (
            <li key={title} className="flex items-start gap-3 text-sm">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-gray-200 text-gray-500 text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="min-w-0">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-800 hover:text-brand-700 hover:underline underline-offset-2 transition-colors"
                  >
                    {displayTitle}
                  </a>
                ) : (
                  <span className="font-medium text-gray-800">{displayTitle}</span>
                )}
                <p className="text-xs text-gray-400 mt-0.5">{guest}</p>
              </div>
            </li>
          );
        })}
      </ol>
  );

  if (variant === "embedded") {
    return list;
  }

  return (
    <div className="mt-4 rounded-2xl bg-gray-50 border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
        <svg
          className="w-4 h-4 flex-shrink-0 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
        Podcast episodes to listen to
      </h3>
      {list}
    </div>
  );
}
