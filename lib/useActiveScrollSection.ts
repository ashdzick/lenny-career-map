import { useEffect, useRef, useState } from "react";

/** ~`top-28` (7rem) — align with sticky nav / `scroll-mt` anchors. */
const DEFAULT_OFFSET_PX = 112;

/**
 * Tracks which section id is active while the user scrolls the window.
 * Picks the last section whose top edge has crossed the offset line (top-down order).
 */
export function useActiveScrollSection(
  sectionIds: readonly string[],
  enabled: boolean,
  offsetPx: number = DEFAULT_OFFSET_PX
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = sectionIds.join("\0");
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  useEffect(() => {
    const ids = idsRef.current;
    if (!enabled || ids.length === 0) {
      setActiveId(null);
      return;
    }

    const compute = () => {
      const list = idsRef.current;
      let current: string | null = null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= offsetPx) current = id;
      }
      const next = current ?? list[0];
      setActiveId((prev) => (prev === next ? prev : next));
    };

    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, idsKey, offsetPx]);

  return activeId;
}
