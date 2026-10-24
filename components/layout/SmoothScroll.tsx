"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";
import { useCart } from "@/store/cart";

/**
 * Owns the single Lenis instance and drives it from GSAP's ticker so
 * ScrollTrigger and Lenis read the same frame. Disabled for reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (query.matches || lenis) return;
      lenis = new Lenis({ autoRaf: false, lerp: 0.085, anchors: { offset: -80 } });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    };
    const stop = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };
    const onChange = () => (query.matches ? stop() : start());

    start();
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  // Next.js handles scroll position on navigation (including back/forward restoration);
  // re-measure once the new route has painted so pinned sections line up.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
