import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { ProductCard } from "@/components/collection/ProductCard";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { getRelated } from "@/data/products";
import type { Fragrance } from "@/types/product";
import { ProductGallery } from "./ProductGallery";
import { ProductPurchase } from "./ProductPurchase";
import { ProductRitual } from "./ProductRitual";
import { ProductStory } from "./ProductStory";

export function ProductView({ fragrance }: { fragrance: Fragrance }) {
  const related = getRelated(fragrance.slug);
  const shipping = [
    "Complimentary shipping on every order",
    "Two samples of your choice, wrapped by hand",
    "Thirty days to return unopened bottles",
  ];

  return (
    <>
      <section data-nav-theme="light" className="bg-ivory pt-[calc(var(--spacing-header)+2rem)] pb-section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ProductGallery
              images={fragrance.images.gallery}
              name={fragrance.name}
              slug={fragrance.slug}
              surface={fragrance.atmosphere.surface}
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
              <nav aria-label="Breadcrumb">
                <ol className="eyebrow flex items-center gap-2 text-ink-soft">
                  <li>
                    <Link href="/collection" className="link-line link-quiet">
                      Collection
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li aria-current="page" className="py-[0.35rem] text-espresso">
                    {fragrance.name}
                  </li>
                </ol>
              </nav>

              <Reveal className="mt-8" stagger={0.08} y={18}>
                <p data-reveal className="eyebrow text-ink-soft">
                  {fragrance.number} — {fragrance.family.label}
                </p>
                <h1 data-reveal className="display mt-5 text-h1 tracking-[0.06em]">
                  {fragrance.name}
                </h1>
                <p data-reveal className="display mt-3 text-[1.6rem] italic text-espresso/80">
                  {fragrance.tagline}
                </p>
                <p data-reveal className="mt-8 max-w-md text-lead">
                  {fragrance.description}
                </p>
                <ul data-reveal className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Character">
                  {fragrance.personality.map((p) => (
                    <li key={p} className="eyebrow text-ink-soft">
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <div className="mt-10 border-t border-line pt-8">
                <ProductPurchase fragrance={fragrance} />
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {(["top", "heart", "base"] as const).map((tier) => (
                  <div key={tier}>
                    <dt className="eyebrow text-ink-soft">{tier}</dt>
                    <dd className="mt-2 text-ui">{fragrance.notes[tier].join(", ")}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 space-y-3 border-t border-line pt-6 text-ui">
                <ul className="space-y-2">
                  {shipping.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span aria-hidden className="text-amber-deep">—</span>
                      {line}
                    </li>
                  ))}
                </ul>
                <DemoNotice className="pt-3 text-ink-soft">
                  These services are illustrative. SORA is a fictional brand and this is a portfolio demonstration.
                </DemoNotice>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductStory fragrance={fragrance} />

      <ProductRitual fragrance={fragrance} />

      <section data-nav-theme="light" aria-labelledby="related-title" className="bg-ivory py-section">
        <div className="shell">
          <div className="flex items-end justify-between gap-6 border-b border-line pb-8">
            <h2 id="related-title" className="display text-h3">
              Also in the collection
            </h2>
            <Link href="/collection" className="eyebrow link-line hidden sm:inline-flex">
              View all
            </Link>
          </div>
          <ul className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:w-2/3">
            {related.map((f) => (
              <li key={f.slug}>
                <ProductCard fragrance={f} headingLevel="h3" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
