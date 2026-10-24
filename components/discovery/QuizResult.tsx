"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import type { RefObject } from "react";
import { AddToBagButton } from "@/components/cart/AddToBagButton";
import { Picture } from "@/components/ui/Picture";
import { fragrances, getFragranceOrThrow } from "@/data/products";
import { formatPrice } from "@/lib/format";
import type { QuizResult as Result } from "@/lib/quiz";

type QuizResultProps = {
  result: Result;
  onRestart: () => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
};

function joinReasons(reasons: string[]): string {
  if (reasons.length <= 1) return reasons[0] ?? "";
  return `${reasons.slice(0, -1).join(", ")} and ${reasons[reasons.length - 1]}`;
}

export function QuizResult({ result, onRestart, headingRef }: QuizResultProps) {
  const fragrance = getFragranceOrThrow(result.winner);
  const { atmosphere } = fragrance;
  const variant = fragrance.variants[0];
  const dark = atmosphere.tone === "dark";
  const topScore = Math.max(...Object.values(result.scores), 1);

  return (
    <div
      className="grid overflow-hidden lg:grid-cols-12"
      style={{ backgroundColor: atmosphere.surface, color: atmosphere.ink }}
      data-nav-theme={atmosphere.tone}
    >
      <div data-step-item className="relative aspect-[4/5] lg:col-span-5 lg:aspect-auto lg:min-h-[44rem]">
        <Picture image={fragrance.images.atmosphere} fill focus sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </div>

      <div className="px-6 py-14 sm:px-12 lg:col-span-7 lg:px-16 lg:py-20">
        <p data-step-item className="eyebrow" style={{ color: atmosphere.muted }}>
          Your consultation
        </p>
        <h1 ref={headingRef} tabIndex={-1} data-step-item className="display mt-6 text-h2 outline-none">
          Your scent is <span className="tracking-[0.08em]">{fragrance.name}</span>.
        </h1>
        <p data-step-item className="display mt-3 text-[1.6rem] italic" style={{ color: atmosphere.muted }}>
          {fragrance.tagline}
        </p>

        <p data-step-item className="mt-8 max-w-lg text-lead">
          We suggest {fragrance.name} because {joinReasons(result.reasons.slice(0, 3))}.
        </p>
        <p data-step-item className="mt-4 max-w-lg" style={{ color: atmosphere.muted }}>
          {fragrance.description}
        </p>

        <div data-step-item className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={`/fragrance/${fragrance.slug}`} className={`btn ${dark ? "btn-light" : "btn-dark"}`}>
            Discover {fragrance.name}
          </Link>
          <AddToBagButton
            slug={fragrance.slug}
            variantId={variant.id}
            className="eyebrow link-line min-h-11"
            context={fragrance.name}
          >
            Add {variant.label} · {formatPrice(variant.price)}
          </AddToBagButton>
        </div>

        <section
          data-step-item
          aria-labelledby="score-title"
          className="mt-14 border-t pt-8"
          style={{ borderColor: `${atmosphere.muted}40` }}
        >
          <h2 id="score-title" className="eyebrow" style={{ color: atmosphere.muted }}>
            How we got here
          </h2>
          <p className="mt-3 max-w-lg text-ui" style={{ color: atmosphere.muted }}>
            Each answer adds points to the fragrances it resembles. The highest total wins
            {result.tieBroken ? "; this time two were level, so your choice of material decided" : ""}. This is a
            simple, transparent rule set, not AI, and nothing is stored.
          </p>
          <dl className="mt-6 space-y-4">
            {fragrances.map((f) => {
              const score = result.scores[f.slug];
              return (
                <div key={f.slug} className="grid grid-cols-[5rem_1fr_3rem] items-center gap-4">
                  <dt className="eyebrow">{f.name}</dt>
                  <dd className="h-px" style={{ backgroundColor: `${atmosphere.muted}40` }}>
                    <div
                      className="h-px origin-left"
                      style={{
                        backgroundColor: atmosphere.ink,
                        transform: `scaleX(${score / topScore})`,
                        opacity: f.slug === fragrance.slug ? 1 : 0.5,
                      }}
                    />
                  </dd>
                  <dd className="text-right text-ui tabular-nums">{score} pts</dd>
                </div>
              );
            })}
          </dl>
        </section>

        <div data-step-item className="mt-12">
          <button type="button" onClick={onRestart} className="eyebrow link-line min-h-11">
            <RotateCcw size={13} strokeWidth={1.25} aria-hidden /> Start again
          </button>
        </div>
      </div>
    </div>
  );
}
