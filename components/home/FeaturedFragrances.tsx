"use client";

import { useRef, useState } from "react";
import { fragrances } from "@/data/products";
import { DESKTOP_MOTION, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { FeaturedPanel } from "./FeaturedPanel";

/**
 * Desktop with motion: the section pins and the three fragrances travel
 * horizontally. Everywhere else they stack as plain vertical sections.
 */
export function FeaturedFragrances() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const last = fragrances.length - 1;
  const navOnDark = fragrances[active].atmosphere.tone === "dark";

  useGSAP(
    () => {
      const section = root.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION, () => {
        section.dataset.horizontal = "true";
        const distance = () => track.scrollWidth - window.innerWidth;

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() * 0.9}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActive(Math.round(self.progress * last));
              progressRef.current?.style.setProperty("transform", `scaleX(${self.progress})`);
            },
          },
        });
        triggerRef.current = travel.scrollTrigger ?? null;

        // Each bottle drifts slightly against the travel for depth.
        gsap.utils.toArray<HTMLElement>("[data-panel]", section).forEach((panel) => {
          const bottle = panel.querySelector("[data-panel-bottle]");
          const copy = panel.querySelector("[data-panel-copy]");
          const st = { containerAnimation: travel, trigger: panel, start: "left right", end: "right left", scrub: true };
          gsap.fromTo(bottle, { xPercent: 14 }, { xPercent: -14, ease: "none", scrollTrigger: st });
          gsap.fromTo(copy, { xPercent: 6, opacity: 0.4 }, { xPercent: -4, opacity: 1, ease: "none", scrollTrigger: { ...st, end: "center center" } });
        });

        return () => {
          delete section.dataset.horizontal;
          triggerRef.current = null;
        };
      });

      // Stacked layout: track which panel is in view for the index.
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>("[data-panel]", section).forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const goTo = (index: number) => {
    const st = triggerRef.current;
    if (st) {
      scrollToTarget(st.start + ((st.end - st.start) * index) / last);
      return;
    }
    const panel = root.current?.querySelectorAll<HTMLElement>("[data-panel]")[index];
    if (panel) scrollToTarget(panel);
  };

  // Keep keyboard users oriented: focusing into an off-screen panel scrolls to it.
  const onFocusCapture = (event: React.FocusEvent<HTMLElement>) => {
    if (!triggerRef.current) return;
    const panel = (event.target as HTMLElement).closest<HTMLElement>("[data-panel]");
    const index = Number(panel?.dataset.index ?? -1);
    if (index >= 0 && index !== active) goTo(index);
  };

  return (
    <section
      ref={root}
      aria-labelledby="featured-title"
      onFocusCapture={onFocusCapture}
      className="group/featured relative overflow-hidden data-[horizontal=true]:h-[100svh]"
    >
      <h2 id="featured-title" className="sr-only">
        The collection: DUSK, DAWN and EMBER
      </h2>

      <div
        ref={trackRef}
        className="flex flex-col group-data-[horizontal=true]/featured:h-full group-data-[horizontal=true]/featured:w-max group-data-[horizontal=true]/featured:flex-row"
      >
        {fragrances.map((fragrance, i) => (
          <FeaturedPanel key={fragrance.slug} fragrance={fragrance} index={i} total={fragrances.length} />
        ))}
      </div>

      <nav
        aria-label="Fragrances in this showcase"
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden transition-colors duration-700 group-data-[horizontal=true]/featured:block ${
          navOnDark ? "text-ivory" : "text-espresso"
        }`}
      >
        <div className="shell pointer-events-auto pb-10">
          <div aria-hidden className="relative mb-5 h-px w-full max-w-md bg-current/20">
            <div
              ref={progressRef}
              className="absolute inset-0 origin-left bg-current"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <ol className="flex gap-10">
            {fragrances.map((fragrance, i) => (
              <li key={fragrance.slug}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={`eyebrow flex min-h-11 items-center gap-3 transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-px bg-current transition-[width] duration-700 ease-silk ${i === active ? "w-10" : "w-4"}`}
                  />
                  {fragrance.number} {fragrance.name}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </section>
  );
}
