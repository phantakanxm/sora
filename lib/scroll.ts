"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;
let locks = 0;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Reference-counted scroll lock shared by the bag drawer and the mobile menu. */
export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  if (scrollbar > 0) document.documentElement.style.paddingRight = `${scrollbar}px`;
  lenis?.stop();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.documentElement.style.overflow = "";
  document.documentElement.style.paddingRight = "";
  lenis?.start();
}

export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const y =
    typeof target === "number"
      ? target
      : ((typeof target === "string" ? document.querySelector(target) : target)?.getBoundingClientRect().top ?? 0) +
        window.scrollY;
  window.scrollTo({ top: y + offset, behavior: reduce ? "auto" : "smooth" });
}
