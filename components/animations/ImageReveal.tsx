"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction the mask opens towards */
  from?: "bottom" | "left" | "right";
  delay?: number;
};

const CLOSED = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/** Opens a clip-path mask over an image while the image settles from a slight scale. */
export function ImageReveal({ children, className = "", from = "bottom", delay = 0 }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const inner = el.querySelector("[data-reveal-inner]");
        const tl = gsap.timeline({
          delay,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
        tl.set(el, { autoAlpha: 1 })
          .fromTo(el, { clipPath: CLOSED[from] }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
          .fromTo(inner, { scale: 1.14 }, { scale: 1, duration: 2.2, ease: "expo.out" }, 0.1);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} data-reveal>
      <div data-reveal-inner className="relative h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
