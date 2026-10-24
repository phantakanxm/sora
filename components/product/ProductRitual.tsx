import Link from "next/link";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Picture } from "@/components/ui/Picture";
import { ingredients } from "@/data/ingredients";
import { getFragranceOrThrow } from "@/data/products";
import type { Fragrance } from "@/types/product";

/** How to wear the fragrance, set beside the raw material at its heart. */
export function ProductRitual({ fragrance }: { fragrance: Fragrance }) {
  const ingredient = ingredients.find((i) => i.fragrance === fragrance.slug);
  const partner = getFragranceOrThrow(fragrance.ritual.layering.with);
  const steps = [
    { label: "Where", text: fragrance.ritual.where },
    { label: "When", text: fragrance.ritual.when },
    { label: "Layering", text: fragrance.ritual.layering.text },
  ];

  return (
    <section data-nav-theme="light" aria-labelledby="ritual-title" className="bg-ivory pt-section">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
        {ingredient && (
          <figure className="md:col-span-5">
            <ImageReveal className="relative">
              <div className="relative" style={{ aspectRatio: `${ingredient.image.width} / ${ingredient.image.height}` }}>
                <Picture image={ingredient.image} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
            </ImageReveal>
            <figcaption className="mt-5 flex items-baseline justify-between gap-6">
              <span className="eyebrow text-ink-soft">At its heart — {ingredient.title}</span>
              <span className="display hidden text-[1.15rem] italic text-ink-soft sm:block">{ingredient.verse.split(".")[0]}.</span>
            </figcaption>
          </figure>
        )}

        <div className="md:col-span-6 md:col-start-7 md:self-center">
          <Reveal>
            <p data-reveal className="eyebrow text-ink-soft">
              <span className="mr-3 text-amber-deep">—</span>The ritual
            </p>
          </Reveal>
          <SplitHeading id="ritual-title" className="display mt-6 text-h2 text-balance">
            How to wear {fragrance.name}.
          </SplitHeading>

          <Reveal as="ol" className="mt-12 border-t border-line" stagger={0.12}>
            {steps.map((step, i) => (
              <li key={step.label} data-reveal className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-7 sm:grid-cols-[2.5rem_8rem_1fr]">
                <span className="eyebrow pt-1 tabular-nums text-ink-soft">0{i + 1}</span>
                <h3 className="eyebrow pt-1">{step.label}</h3>
                <p className="col-start-2 mt-2 text-ink-soft sm:col-start-3 sm:mt-0">{step.text}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div data-reveal className="flex items-center gap-4">
              <Link
                href={`/fragrance/${partner.slug}`}
                className="relative block aspect-[3/4] w-12 shrink-0"
                style={{ backgroundColor: partner.atmosphere.surface }}
                tabIndex={-1}
                aria-hidden
              >
                <Picture image={partner.images.cutout} fill sizes="48px" alt="" className="object-contain p-1" />
              </Link>
              <ArrowLink href={`/fragrance/${partner.slug}`} label={`Pair with ${partner.name}`} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
