"use client";

import type { PathTocItem } from "@/components/LearningPathOutput";

const linkClassInline =
  "block text-xs text-gray-600 hover:text-brand-700 leading-snug py-1 pl-2 -ml-px border-l-2 border-transparent hover:border-brand-400 transition-colors";

/** Right-aligned in left gutter; accent bar toward the article (Substack-style gutter). */
const linkClassGutter =
  "block text-right text-xs text-gray-600 hover:text-brand-700 leading-snug pt-1 pb-1 first:pt-0 pr-2 -mr-px border-r-2 border-transparent hover:border-brand-400 transition-colors";

interface Props {
  tocItems: PathTocItem[];
  showGoDeeper: boolean;
}

function renderNavLinks(tocItems: PathTocItem[], showGoDeeper: boolean, gutter: boolean) {
  const c = gutter ? linkClassGutter : linkClassInline;
  return (
    <>
      {tocItems.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={c}>
          {item.label}
        </a>
      ))}
      {showGoDeeper && (
        <a href="#your-learning-plan" className={c}>
          Your learning plan
        </a>
      )}
      <a href="#my-notes" className={c}>
        My notes
      </a>
    </>
  );
}

/** Collapsible TOC for small screens (placed above the path grid). */
export function PathReadingNavMobile({ tocItems, showGoDeeper }: Props) {
  const linkCount =
    tocItems.length + (showGoDeeper ? 1 : 0) + 1; /* My notes always */

  return (
    <div className="mx-auto w-full max-w-3xl lg:hidden mb-6">
      <details className="group rounded-xl border border-gray-100 bg-brand-50/50 px-3 py-2.5 open:pb-3">
        <summary className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden flex items-center gap-2">
          On this page
          <span className="text-gray-300 font-normal normal-case">·</span>
          <span className="text-xs font-medium text-brand-700 normal-case">
            {linkCount} {linkCount === 1 ? "place" : "places"}
          </span>
        </summary>
        <nav
          className="mt-3 flex flex-col gap-0.5 border-t border-gray-100/80 pt-3"
          aria-label="On this page"
        >
          {renderNavLinks(tocItems, showGoDeeper, false)}
        </nav>
      </details>
    </div>
  );
}

/** Sticky gutter nav; use `className` for grid placement (e.g. row 2 / col 1). */
export function PathReadingNavGutter({
  tocItems,
  showGoDeeper,
  className = "",
}: Props & { className?: string }) {
  return (
    <nav
      className={`hidden lg:block lg:sticky lg:top-28 lg:self-start w-full shrink-0 border-r border-gray-100 pr-4 text-right pt-10 ${className}`.trim()}
      aria-label="On this page"
    >
      {/* Visible label lives in mobile <details>; desktop matches card inner padding (LearningPathOutput sm:p-10). */}
      <span className="sr-only">On this page</span>
      <div className="flex flex-col gap-0.5">{renderNavLinks(tocItems, showGoDeeper, true)}</div>
    </nav>
  );
}
