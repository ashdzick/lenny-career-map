"use client";

import EpisodePlaylist, { hasMarkdownCitations } from "@/components/EpisodePlaylist";
import PodcastRecs from "@/components/PodcastRecs";
import type { PodcastRec } from "@/components/PodcastRecs";

interface Props {
  markdown: string;
  citationUrls: Record<string, string>;
  pathKey: string;
  recs: PodcastRec[];
}

export default function GoDeeperSection({ markdown, citationUrls, pathKey, recs }: Props) {
  const hasCited = hasMarkdownCitations(markdown);
  const hasRecs = recs && recs.length > 0;

  if (!hasCited && !hasRecs) return null;

  return (
    <section
      id="your-learning-plan"
      className="mt-8 scroll-mt-24 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100"
      aria-label="Your learning plan"
    >
      <p className="text-xs font-medium text-gray-600 uppercase tracking-widest">Your learning plan</p>

      {hasCited && (
        <div className="mt-5">
          <EpisodePlaylist
            markdown={markdown}
            citationUrls={citationUrls}
            pathKey={pathKey}
            variant="embedded"
            embeddedTitle={
              <h3 className="text-sm font-semibold text-gray-800">Articles cited in this path</h3>
            }
          />
        </div>
      )}

      {hasRecs && (
        <div
          className={
            hasCited ? "mt-8 pt-6 border-t border-gray-100" : "mt-5"
          }
        >
          <PodcastRecs
            recs={recs}
            pathKey={pathKey}
            variant="embedded"
            embeddedTitle={
              <h3 className="text-sm font-semibold text-gray-800">More episodes to consider</h3>
            }
          />
        </div>
      )}
    </section>
  );
}
