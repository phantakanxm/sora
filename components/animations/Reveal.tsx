"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Vertical travel in px */
  y?: number;
  stagger?: number;
  delay?: number;
  start?: string;
};

/**
 * Fades and lifts every descendant marked `data-reveal` (or the wrapper itself)
 * once it enters the viewport. Content is fully visible with reduced motion.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 28,
  stagger = 0.12,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const nested = root.querySelectorAll<HTMLElement>("[data-reveal]");
        const targets = nested.length ? Array.from(nested) : [root];
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.4,
            ease: "expo.out",
            stagger,
            delay,
            scrollTrigger: { trigger: root, start, once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
