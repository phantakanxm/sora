"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

type SplitHeadingProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
  /** Animate on mount instead of on scroll */
  immediate?: boolean;
};

/** Editorial headline that rises line by line from behind a mask. */
export function SplitHeading({ children, as: Tag = "h2", className, id, delay = 0, immediate }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(el, { autoAlpha: 1 });
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.5,
              ease: "expo.out",
              stagger: 0.11,
              delay,
              scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
            }),
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} data-reveal>
      {children}
    </Tag>
  );
}
