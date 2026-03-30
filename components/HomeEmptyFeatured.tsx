interface PathPair {
  from: string;
  to: string;
}

const steps = [
  { title: "Pick your transition", detail: "Choose where you are today and the role you want next." },
  { title: "Read a grounded plan", detail: "Get milestones and skills tied to Lenny's interviews." },
  { title: "Save notes & episodes", detail: "Jot takeaways and dig into cited episodes in one place." },
];

function HowItWorksSteps() {
  return (
    <ol className="grid list-none gap-3 p-0 m-0 sm:grid-cols-3 sm:gap-4">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm ring-1 ring-gray-100/80"
        >
          <span className="text-[10px] font-bold text-brand-700 tabular-nums uppercase tracking-wider">
            Step {i + 1}
          </span>
          <p className="mt-1.5 text-sm font-semibold text-brand-900 leading-snug">{s.title}</p>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}

/** Full-width under the hero picker card; same column width as siblings. */
export function HomeHowItWorks() {
  return (
    <section className="mb-0 w-full" aria-labelledby="home-how-heading">
      <h2 id="home-how-heading" className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
        How it works
      </h2>
      <HowItWorksSteps />
    </section>
  );
}

export function HomeTryTransitions({
  paths,
  onTry,
  className = "",
  embedded = false,
}: {
  paths: PathPair[];
  onTry: (from: string, to: string) => void;
  className?: string;
  embedded?: boolean;
}) {
  if (paths.length === 0) return null;
  return (
    <section
      className={[
        embedded ? "mt-0 mb-0 pt-8" : "mb-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="home-try-heading"
    >
      <h2
        id="home-try-heading"
        className={[
          "font-semibold text-gray-500 uppercase tracking-widest",
          embedded ? "text-[10px] mb-2" : "text-xs mb-2",
        ].join(" ")}
      >
        Examples
      </h2>
      <div className="flex flex-wrap gap-2">
        {paths.map(({ from, to }) => (
          <button
            key={`${from}|||${to}`}
            type="button"
            onClick={() => onTry(from, to)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-800 hover:border-brand-400 hover:bg-brand-50/80 transition-colors"
            aria-label={`Open sample path from ${from} to ${to}`}
          >
            <span className="text-gray-600 max-w-[8rem] truncate sm:max-w-none">{from}</span>
            <span className="text-gray-400 shrink-0" aria-hidden>
              →
            </span>
            <span className="text-brand-900 max-w-[8rem] truncate sm:max-w-none">{to}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
