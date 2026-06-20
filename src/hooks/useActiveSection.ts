"use client";

import { useEffect } from "react";
import { useGuide } from "@/store/useGuide";

/** Tracks which [data-section] is most in view and stores its id (drives the avatar). */
export function useActiveSection() {
  const setActive = useGuide((s) => s.setActive);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!els.length) return;

    const ratios = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target, e.intersectionRatio);
        let best: Element | null = null;
        let max = 0;
        ratios.forEach((r, el) => {
          if (r > max) { max = r; best = el; }
        });
        if (best && max > 0.15) setActive((best as HTMLElement).dataset.section!);
      },
      { threshold: [0.15, 0.4, 0.7, 1], rootMargin: "-10% 0px -25% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [setActive]);
}
