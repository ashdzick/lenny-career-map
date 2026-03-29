"use client";

import { forwardRef, useMemo, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import {
  extractPathTocFromMarkdown,
  hastElementToPlainText,
  bodyHeadingPlainToIdMap,
  headingPlainMatchKey,
  slugifyHeading,
  type PathTocItem,
} from "@/lib/pathMarkdownToc";

export type { PathTocItem };
export { extractPathTocFromMarkdown };

/** When the file opens with `## …`, return the first TOC entry and markdown after that line (for slots before body). */
function splitLeadingH2Block(markdown: string, tocItems: PathTocItem[]): { first: PathTocItem | null; rest: string } {
  if (tocItems.length === 0) return { first: null, rest: markdown };
  const text = markdown.replace(/^\uFEFF/, "");
  const lineMatch = text.match(/^##\s+[^\r\n]+\r?\n?/);
  if (!lineMatch) return { first: null, rest: markdown };
  return { first: tocItems[0], rest: text.slice(lineMatch[0].length) };
}

interface Props {
  markdown: string;
  isStreaming?: boolean;
  citationUrls?: Record<string, string>;
  /** Inserted before the first `##` heading (e.g. market context above “Career Transition Overview”). */
  afterFirstH2?: ReactNode;
}

// Custom renderers for polished styling (h2 ids come from makeCitationComponents when TOC is provided)
const components: Components = {
  h2({ children }) {
    return (
      <h2 className="text-xl font-bold text-brand-900 mt-8 mb-3 first:mt-0 scroll-mt-24">
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="text-base font-semibold text-brand-800 mt-5 mb-1.5">{children}</h3>
    );
  },
  p({ children }) {
    return <p className="text-gray-700 leading-relaxed mb-3">{children}</p>;
  },
  ul({ children }) {
    return <ul className="space-y-2 mb-4 pl-1">{children}</ul>;
  },
  li({ children }) {
    return (
      <li className="flex items-start gap-2 text-gray-700 leading-relaxed">
        <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-400" />
        <span>{children}</span>
      </li>
    );
  },
  strong({ children }) {
    return <strong className="font-semibold text-gray-900">{children}</strong>;
  },
  em({ children }) {
    return <em className="italic text-gray-600">{children}</em>;
  },
  // Render inline code as styled citation badges
  code({ children, className }) {
    if (!className) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 text-xs font-medium">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-brand-300 pl-4 my-3 text-gray-600 italic">
        {children}
      </blockquote>
    );
  },
  hr() {
    return <hr className="my-6 border-gray-200" />;
  },
};

function CitationBadge({ text, url }: { text: string; url?: string }) {
  const inner = (
    <>
      <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      {text}
    </>
  );

  const baseClass = "not-italic inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs font-medium mx-0.5";

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} hover:bg-brand-200 transition-colors cursor-pointer underline-offset-2`}
      >
        {inner}
      </a>
    );
  }

  return <cite className={baseClass}>{inner}</cite>;
}

function ProcessCitations({
  children,
  citationUrls,
}: {
  children: React.ReactNode;
  citationUrls: Record<string, string>;
}): React.ReactNode {
  if (typeof children === "string") {
    const parts = children.split(/(\[[^\]]+\])/g);
    if (parts.length === 1) return children;
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith("[") && part.endsWith("]")) {
            const text = part.slice(1, -1);
            const url = citationUrls[text];
            return <CitationBadge key={i} text={text} url={url} />;
          }
          return part;
        })}
      </>
    );
  }

  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, i) => (
          <ProcessCitations key={i} citationUrls={citationUrls}>
            {child}
          </ProcessCitations>
        ))}
      </>
    );
  }

  return <>{children}</>;
}

function makeCitationComponents(
  citationUrls: Record<string, string>,
  bodyPlainToId: Map<string, string>
): Components {
  return {
    ...components,
    h2({ node, children }) {
      const plain = hastElementToPlainText(node).replace(/\s+/g, " ").trim();
      const key = headingPlainMatchKey(plain);
      const fromMap = bodyPlainToId.get(key);
      const id = fromMap ?? slugifyHeading(plain || "section");
      return (
        <h2
          id={id}
          className="text-xl font-bold text-brand-900 mt-8 mb-3 first:mt-0 scroll-mt-24"
        >
          {children}
        </h2>
      );
    },
    p({ children }) {
      return (
        <p className="text-gray-700 leading-relaxed mb-3">
          <ProcessCitations citationUrls={citationUrls}>{children}</ProcessCitations>
        </p>
      );
    },
    li({ children }) {
      return (
        <li className="flex items-start gap-2 text-gray-700 leading-relaxed">
          <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-400" />
          <span>
            <ProcessCitations citationUrls={citationUrls}>{children}</ProcessCitations>
          </span>
        </li>
      );
    },
  };
}

const LearningPathOutput = forwardRef<HTMLDivElement, Props>(
  ({ markdown, isStreaming = false, citationUrls = {}, afterFirstH2 }, ref) => {
    const tocItems = useMemo(() => extractPathTocFromMarkdown(markdown), [markdown]);
    const { first: leadingH2, rest: bodyAfterFirstH2 } = useMemo(
      () => splitLeadingH2Block(markdown, tocItems),
      [markdown, tocItems]
    );

    const splitFirstHeadingForMarket = Boolean(afterFirstH2 && leadingH2);
    const markdownForParser = splitFirstHeadingForMarket ? bodyAfterFirstH2 : markdown;
    const bodyTocForParser = useMemo(
      () => extractPathTocFromMarkdown(markdownForParser),
      [markdownForParser]
    );
    const bodyPlainToId = useMemo(() => bodyHeadingPlainToIdMap(bodyTocForParser), [bodyTocForParser]);
    const resolvedComponents = useMemo(() => {
      void markdown; // bust cache when path body changes (citationUrls object often reused)
      return makeCitationComponents(citationUrls, bodyPlainToId);
    }, [citationUrls, markdown, bodyPlainToId]);

    return (
      <div
        ref={ref}
        className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-8 sm:p-10"
      >
        <div className={isStreaming ? "streaming-cursor" : ""}>
          {splitFirstHeadingForMarket && leadingH2 && (
            <>
              {afterFirstH2}
              <h2
                id={leadingH2.id}
                className="text-xl font-bold text-brand-900 mt-0 mb-3 scroll-mt-24"
              >
                {leadingH2.label}
              </h2>
            </>
          )}
          {afterFirstH2 && !leadingH2 && <div className="mb-4">{afterFirstH2}</div>}
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={resolvedComponents}>
            {markdownForParser}
          </ReactMarkdown>
        </div>
      </div>
    );
  }
);

LearningPathOutput.displayName = "LearningPathOutput";

export default LearningPathOutput;
