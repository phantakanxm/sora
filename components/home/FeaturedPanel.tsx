import Link from "next/link";
import { AddToBagButton } from "@/components/cart/AddToBagButton";
import { Picture } from "@/components/ui/Picture";
import { formatPrice } from "@/lib/format";
import type { Fragrance } from "@/types/product";

type FeaturedPanelProps = { fragrance: Fragrance; index: number; total: number };

export function FeaturedPanel({ fragrance, index, total }: FeaturedPanelProps) {
  const { atmosphere, images, notes } = fragrance;
  const variant = fragrance.variants[0];
  const dark = atmosphere.tone === "dark";

  return (
    <article
      data-panel
      data-index={index}
      data-nav-theme={atmosphere.tone}
      aria-labelledby={`featured-${fragrance.slug}`}
      style={{ backgroundColor: atmosphere.surface, color: atmosphere.ink }}
      className={`relative flex w-full shrink-0 items-center overflow-hidden group-data-[horizontal=true]/featured:h-full group-data-[horizontal=true]/featured:w-screen`}
    >
      <span
        aria-hidden
        className="display pointer-events-none absolute -bottom-[0.18em] -left-[0.05em] select-none text-[clamp(14rem,34vw,34rem)] leading-none opacity-[0.06]"
      >
        {fragrance.number}
      </span>

      <div className={`shell relative grid w-full items-center gap-10 py-24 lg:grid-cols-12 lg:gap-8 group-data-[horizontal=true]/featured:py-0`}>
        <div data-panel-copy className="order-2 lg:order-1 lg:col-span-4">
          <p className="eyebrow" style={{ color: atmosphere.muted }}>
            {fragrance.number} / {String(total).padStart(2, "0")} — {fragrance.family.label}
          </p>
          <h3 id={`featured-${fragrance.slug}`} className="display mt-6 text-h2 tracking-[0.08em]">
            {fragrance.name}
          </h3>
          <p className="display mt-3 text-[1.6rem] italic leading-snug" style={{ color: atmosphere.muted }}>
            {fragrance.tagline}
          </p>
          <p className="mt-8 max-w-sm" style={{ color: atmosphere.muted }}>
            {fragrance.description}
          </p>

          <dl className="mt-10 grid max-w-sm grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: `${atmosphere.muted}40` }}>
            {(["top", "heart", "base"] as const).map((tier) => (
              <div key={tier}>
                <dt className="eyebrow" style={{ color: atmosphere.muted }}>
                  {tier}
                </dt>
                <dd className="mt-2 text-ui">{notes[tier].join(", ")}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={`/fragrance/${fragrance.slug}`} className={`btn ${dark ? "btn-light" : "btn-dark"}`}>
              Discover {fragrance.name}
            </Link>
            <AddToBagButton
              slug={fragrance.slug}
              variantId={variant.id}
              className="eyebrow link-line min-h-11"
              context={`${fragrance.name} ${variant.label}`}
            >
              Add to bag · {formatPrice(variant.price)}
            </AddToBagButton>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 lg:col-span-5 lg:col-start-6">
          <div data-panel-bottle className={`relative mx-auto aspect-[3/4] w-[72%] max-w-[30rem] lg:w-full group-data-[horizontal=true]/featured:max-h-[78svh] group-data-[horizontal=true]/featured:w-auto`}>
            <Picture
              image={images.cutout}
              fill
              sizes="(min-width: 1024px) 36vw, 72vw"
              className="object-contain drop-shadow-[0_40px_60px_rgb(0_0_0/0.28)]"
            />
          </div>
        </div>

        <figure className="hidden lg:order-3 lg:col-span-2 lg:col-start-11 lg:block">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Picture image={images.atmosphere} fill sizes="16vw" className="object-cover" />
          </div>
          <figcaption className="eyebrow mt-4" style={{ color: atmosphere.muted }}>
            Fig. {fragrance.number} — {fragrance.bottle}
          </figcaption>
        </figure>
      </div>
    </article>
  );
}
