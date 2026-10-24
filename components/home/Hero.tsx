"use client";

import Link from "next/link";
import { useRef } from "react";
import { getFragranceOrThrow } from "@/data/products";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { Picture } from "@/components/ui/Picture";

const dusk = getFragranceOrThrow("dusk");

// The entrance plays once per visit; returning to the page shows it settled.
let introPlayed = false;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const media = q("[data-hero-media]")[0] as HTMLElement;
        const heading = q("[data-hero-heading]")[0] as HTMLElement;
        const supporting = q("[data-hero-fade]");

        gsap.set([heading, ...supporting], { autoAlpha: 1 });
        const split = SplitText.create(heading, { type: "lines", mask: "lines" });

        if (introPlayed) {
          gsap.set(media, { "--reveal": "160%", opacity: 1 });
        } else {
          introPlayed = true;
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.fromTo(media, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out" }, 0)
            .fromTo(media, { "--reveal": "0%" }, { "--reveal": "160%", duration: 2.3, ease: "power2.inOut" }, 0)
            .fromTo(q("[data-hero-image]"), { scale: 1.06 }, { scale: 1, duration: 2.9 }, 0)
            .from(split.lines, { yPercent: 115, duration: 1.45, stagger: 0.14 }, 0.75)
            .from(supporting, { autoAlpha: 0, y: 18, duration: 1.1, stagger: 0.12 }, 1.55);
        }

        // Quiet exit as the hero scrolls away.
        gsap.to(q("[data-hero-content]"), {
          yPercent: -10,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q("[data-hero-image]"), {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-nav-theme="dark"
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[38rem] overflow-hidden bg-obsidian text-ivory"
    >
      <div data-hero-media className="hero-media absolute inset-x-0 top-0 h-[66%] md:inset-0 md:h-auto">
        <div data-hero-image className="absolute inset-0 will-change-transform">
          <Picture
            image={dusk.images.campaign}
            fill
            preload
            quality={85}
            sizes="100vw"
            className="object-cover object-[76%_50%]"
          />
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-obsidian md:hidden" />
      </div>

      {/* Scrims keep the copy legible where it overlaps the photograph */}
      <div
        aria-hidden
        className="absolute inset-0 hidden md:block md:bg-[linear-gradient(to_right,rgb(21_19_17/0.78)_0%,rgb(21_19_17/0.25)_45%,transparent_62%)]"
      />

      <div
        data-hero-content
        className="shell relative z-10 flex h-full flex-col justify-end pb-[9svh] md:justify-center md:pt-header md:pb-0"
      >
        <p data-hero-fade data-reveal className="eyebrow mb-8 text-sand">
          {dusk.name} / {dusk.number} — Eau de parfum
        </p>
        <h1
          id="hero-title"
          data-hero-heading
          data-reveal
          className="display text-h1 max-w-[11ch] uppercase tracking-[0.02em]"
        >
          What remains,
          <br />
          unseen.
        </h1>
        <p data-hero-fade data-reveal className="mt-8 max-w-[24rem] text-lead text-sand md:mt-10">
          An exploration of scent, memory, and the moments that stay with us.
        </p>
        <div data-hero-fade data-reveal className="mt-10">
          <Link href="/collection" className="btn btn-light">
            Explore the collection
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        data-hero-fade
        data-reveal
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-sand/70 md:flex"
      >
        <span className="eyebrow">Scroll</span>
        <span className="h-10 w-px bg-current" />
      </div>
    </section>
  );
}
