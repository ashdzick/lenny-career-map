import type { ReactNode } from "react";

/**
 * Aligns page content with the home map: centered `max-w-3xl` on small screens,
 * and on `lg+` the same 10rem gutter + 48rem reading column as `CareerMapApp`.
 */
export default function ReadingColumnShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-[10rem_minmax(0,48rem)_minmax(0,1fr)] lg:gap-x-8 lg:items-start">
      <div className="hidden lg:block lg:col-start-1 min-h-0" aria-hidden />
      <div className="min-w-0 lg:col-start-2">{children}</div>
    </div>
  );
}
