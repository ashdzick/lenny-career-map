/**
 * Shown only on the home map before the user picks a “from” role — not after any
 * role selection, shared URL, or loaded path.
 */
export default function HomeBuildYourOwnLinks({ className = "" }: { className?: string }) {
  return (
    <p
      className={["text-xs text-gray-600 leading-relaxed max-w-2xl", className].filter(Boolean).join(" ")}
    >
      Want to build something like this yourself?{" "}
      <a
        href="https://github.com/ashdzick/lenny-career-map"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-700 hover:text-brand-900 underline underline-offset-2 font-medium"
      >
        Open-source code on GitHub
      </a>
      {" · "}
      <a
        href="https://lennysdata.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-700 hover:text-brand-900 underline underline-offset-2 font-medium"
      >
        Lenny&apos;s Data
      </a>{" "}
      for podcast and newsletter data access.
    </p>
  );
}
