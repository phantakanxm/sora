"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { Picture } from "@/components/ui/Picture";
import { fragrances } from "@/data/products";
import type { FragranceSlug } from "@/types/product";

const moods: readonly { word: string; slug: FragranceSlug; whisper: string }[] = [
  { word: "Stillness", slug: "dusk", whisper: "woods, smoke and the hour after light" },
  { word: "Light", slug: "dawn", whisper: "petals, linen and a room slowly waking" },
  { word: "Warmth", slug: "ember", whisper: "resin, spice and a trace that stays" },
];

/** A small taste of the consultation: choosing a feeling previews a fragrance. */
export function DiscoveryInvite() {
  const [selected, setSelected] = useState<FragranceSlug>("dusk");
  const current = moods.find((m) => m.slug === selected) ?? moods[0];
  const fragrance = fragrances.find((f) => f.slug === selected) ?? fragrances[0];

  return (
    <section data-nav-theme="dark" aria-labelledby="discover-invite-title" className="bg-obsidian py-section text-ivory">
      <div className="shell grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Reveal>
            <p data-reveal className="eyebrow text-sand/75">
              <span className="mr-3 text-amber">05</span>Scent consultation
            </p>
          </Reveal>
          <SplitHeading id="discover-invite-title" className="display mt-8 text-h2 text-balance">
            Find the scent
            <br />
            that feels like you.
          </SplitHeading>

          <Reveal className="mt-12" stagger={0.1}>
            <p data-reveal id="mood-prompt" className="text-sand/80">
              Begin with a feeling.
            </p>
            <div data-reveal role="group" aria-labelledby="mood-prompt" className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              {moods.map((mood) => {
                const active = mood.slug === selected;
                return (
                  <button
                    key={mood.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(mood.slug)}
                    onMouseEnter={() => setSelected(mood.slug)}
                    onFocus={() => setSelected(mood.slug)}
                    className={`display min-h-11 text-[clamp(2rem,1.4rem+2vw,3.25rem)] italic transition-opacity duration-500 ${
                      active ? "opacity-100" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    {mood.word}
                  </button>
                );
              })}
            </div>
            <p data-reveal aria-live="polite" className="mt-8 min-h-[3.4em] max-w-sm text-sand/80">
              Perhaps <span className="text-ivory">{fragrance.name}</span>: {current.whisper}.
            </p>
            <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/discover" className="btn btn-light">
                Discover your scent
              </Link>
              <Link href={`/fragrance/${fragrance.slug}`} className="eyebrow link-line text-sand">
                View {fragrance.name}
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto aspect-[3/4] w-[70%] max-w-md lg:w-full">
            <div
              aria-hidden
              className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgb(164_122_84/0.32),transparent)] blur-2xl"
            />
            {fragrances.map((f) => (
              <div
                key={f.slug}
                className={`absolute inset-0 transition-[opacity,transform] duration-1000 ease-silk ${
                  f.slug === selected ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                aria-hidden={f.slug !== selected}
              >
                <Picture image={f.images.cutout} fill sizes="(min-width: 1024px) 36vw, 70vw" className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
