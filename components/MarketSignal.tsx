"use client";

export interface MarketSignalEntry {
  type: "tailwind" | "headwind" | "neutral";
  headline: string;
  detail: string;
}

interface Props {
  targetRole: string;
  signal: MarketSignalEntry;
  sourceUrl: string;
}

const config = {
  tailwind: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    headlineColor: "text-emerald-800",
    detailColor: "text-emerald-700",
    label: "Market tailwind",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  headwind: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    headlineColor: "text-amber-800",
    detailColor: "text-amber-700",
    label: "Market headwind",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
  },
  neutral: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    headlineColor: "text-gray-700",
    detailColor: "text-gray-600",
    label: "Market context",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

export default function MarketSignal({ targetRole, signal, sourceUrl }: Props) {
  const c = config[signal.type];

  return (
    <div className={`rounded-xl border ${c.bg} ${c.border} px-4 py-3 mb-4`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-7 h-7 rounded-full ${c.iconBg} ${c.iconColor} flex items-center justify-center mt-0.5`}>
          {c.icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={`text-xs font-semibold uppercase tracking-wider ${c.headlineColor}`}>
              {c.label}
            </span>
            <span className={`text-xs font-medium ${c.headlineColor}`}>
              · {targetRole} · {signal.headline}
            </span>
          </div>
          <p className={`text-sm ${c.detailColor} leading-relaxed`}>
            {signal.detail}{" "}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity`}
            >
              2026 job market report ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
