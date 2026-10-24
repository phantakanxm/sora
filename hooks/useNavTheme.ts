"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavTheme = "dark" | "light";

/**
 * Reads the `data-nav-theme` of whatever section sits beneath the header,
 * so the navigation keeps contrast over both obsidian and ivory sections.
 */
export function useNavTheme(probeY = 36) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<NavTheme>("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let trailing = 0;
    const read = () => {
      frame = 0;
      const x = window.innerWidth / 2;
      const stack = document.elementsFromPoint(x, probeY);
      const section = stack
        .find((el) => !el.closest("[data-site-header]") && el.closest("[data-nav-theme]"))
        ?.closest<HTMLElement>("[data-nav-theme]");
      setTheme((section?.dataset.navTheme as NavTheme | undefined) ?? "light");
      setScrolled(window.scrollY > 24);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
      // Scrubbed animations (the pinned showcase) keep moving briefly after scrolling stops.
      window.clearTimeout(trailing);
      trailing = window.setTimeout(read, 1000);
    };
    read();
    const settle = window.setTimeout(read, 120);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.clearTimeout(settle);
      window.clearTimeout(trailing);
      cancelAnimationFrame(frame);
    };
  }, [pathname, probeY]);

  return { theme, scrolled };
}
