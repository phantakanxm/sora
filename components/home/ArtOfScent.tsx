import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Picture } from "@/components/ui/Picture";
import { ingredients } from "@/data/ingredients";
import { getFragranceOrThrow } from "@/data/products";

// Deliberately asymmetric placements for each ingredient row.
const layouts = [
  { image: "md:col-span-5 md:col-start-1", text: "md:col-span-4 md:col-start-8 md:self-end", from: "bottom" },
  { image: "md:col-span-4 md:col-start-8 md:order-2", text: "md:col-span-4 md:col-start-2 md:order-1 md:self-center", from: "right" },
  { image: "md:col-span-7 md:col-start-2", text: "md:col-span-3 md:col-start-10 md:self-start md:pt-24", from: "left" },
] as const;

export function ArtOfScent() {
  return (
    <section data-nav-theme="light" aria-labelledby="art-title" className="bg-ivory py-section">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p data-reveal className="eyebrow text-ink-soft">
              <span className="mr-3 text-amber-deep">03</span>The art of scent
            </p>
          </Reveal>
          <div className="md:col-span-7 md:col-start-5">
            <SplitHeading id="art-title" className="display text-h2 text-balance">
              Raw materials, held in quiet light.
            </SplitHeading>
            <Reveal>
              <p data-reveal className="mt-10 max-w-lg text-ink-soft">
                Every SORA fragrance begins with a handful of materials, chosen for their character rather than
                their volume. Wood, petal, resin: each one given room to speak.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-24 space-y-28 md:mt-36 md:space-y-44">
          {ingredients.map((ingredient, i) => {
            const layout = layouts[i % layouts.length];
            const fragrance = getFragranceOrThrow(ingredient.fragrance);
            return (
              <li key={ingredient.id} className="grid gap-10 md:grid-cols-12 md:gap-8">
                <ImageReveal from={layout.from} className={`relative ${layout.image}`}>
                  <div className="relative" style={{ aspectRatio: `${ingredient.image.width} / ${ingredient.image.height}` }}>
                    <Picture
                      image={ingredient.image}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </ImageReveal>
                <Reveal className={layout.text} stagger={0.1}>
                  <p data-reveal className="eyebrow text-ink-soft">
                    {String(i + 1).padStart(2, "0")} — {fragrance.name}
                  </p>
                  <h3 data-reveal className="display mt-5 text-h3">
                    {ingredient.title}
                  </h3>
                  <p data-reveal className="display mt-6 text-[1.45rem] italic leading-snug text-espresso/85">
                    {ingredient.verse}
                  </p>
                  <p data-reveal className="mt-6 text-ink-soft">
                    {ingredient.detail}
                  </p>
                  <div data-reveal className="mt-8">
                    <ArrowLink href={`/fragrance/${fragrance.slug}`} label={`Discover ${fragrance.name}`} />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
