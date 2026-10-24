import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { Picture } from "@/components/ui/Picture";
import type { Fragrance } from "@/types/product";

/** Editorial chapter beneath the purchase area, set in the fragrance's own atmosphere. */
export function ProductStory({ fragrance }: { fragrance: Fragrance }) {
  const { atmosphere, notes, wear } = fragrance;
  const tiers = [
    { key: "top", label: "Top", hint: "The first impression", notes: notes.top },
    { key: "heart", label: "Heart", hint: "The body of the scent", notes: notes.heart },
    { key: "base", label: "Base", hint: "What remains", notes: notes.base },
  ];
  const facts = [
    { label: "Intensity", value: wear.intensity },
    { label: "Moment", value: wear.moment },
    { label: "Longevity", value: wear.longevity },
    { label: "Bottle", value: fragrance.bottle },
  ];

  return (
    <section
      data-nav-theme={atmosphere.tone}
      aria-labelledby="story-title"
      style={{ backgroundColor: atmosphere.surface, color: atmosphere.ink }}
      className="py-section"
    >
      <div className="shell">
        <ImageReveal className="relative">
          <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
            <Picture image={fragrance.images.campaign} fill focus sizes="100vw" className="object-cover" />
          </div>
        </ImageReveal>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p data-reveal className="eyebrow" style={{ color: atmosphere.muted }}>
              The composition
            </p>
          </Reveal>
          <div className="md:col-span-8 md:col-start-5">
            <SplitHeading id="story-title" className="display text-h2 text-balance">
              {fragrance.tagline}
            </SplitHeading>
            <Reveal className="mt-10 grid gap-6 md:grid-cols-2 md:gap-10" stagger={0.15}>
              {fragrance.story.map((paragraph) => (
                <p key={paragraph} data-reveal style={{ color: atmosphere.muted }}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        <Reveal as="dl" className="mt-24 md:mt-32" stagger={0.12}>
          {tiers.map((tier) => (
            <div
              key={tier.key}
              data-reveal
              className="grid gap-2 border-t py-8 md:grid-cols-12 md:items-baseline md:gap-8"
              style={{ borderColor: `${atmosphere.muted}33` }}
            >
              <dt className="md:col-span-4">
                <span className="eyebrow">{tier.label} notes</span>
                <span className="mt-1 block text-ui" style={{ color: atmosphere.muted }}>
                  {tier.hint}
                </span>
              </dt>
              <dd className="display text-h3 md:col-span-8">{tier.notes.join(" · ")}</dd>
            </div>
          ))}
        </Reveal>

        <Reveal as="dl" className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4" stagger={0.08}>
          {facts.map((fact) => (
            <div key={fact.label} data-reveal>
              <dt className="eyebrow" style={{ color: atmosphere.muted }}>
                {fact.label}
              </dt>
              <dd className="mt-3">{fact.value}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
