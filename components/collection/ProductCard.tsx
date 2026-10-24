import Link from "next/link";
import { ViewTransition } from "react";
import { AddToBagButton } from "@/components/cart/AddToBagButton";
import { Picture } from "@/components/ui/Picture";
import { startingPrice } from "@/data/products";
import { formatPrice } from "@/lib/format";
import type { Fragrance } from "@/types/product";

type ProductCardProps = { fragrance: Fragrance; headingLevel?: "h2" | "h3"; sizes?: string };

export function ProductCard({ fragrance, headingLevel: Heading = "h2", sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" }: ProductCardProps) {
  const base = fragrance.variants[0];
  const href = `/fragrance/${fragrance.slug}`;
  const sizesLabel = fragrance.variants.map((v) => v.label).join(" / ");

  return (
    <article className="group">
      {/* prefetch={true} loads the full page so the bottle can morph into the gallery */}
      <Link href={href} prefetch tabIndex={-1} aria-hidden className="block">
        <ViewTransition name={`bottle-${fragrance.slug}`} share="sora-morph" default="none">
          <div
            className="relative aspect-[4/5] overflow-hidden"
            style={{ backgroundColor: fragrance.atmosphere.surface }}
          >
            <Picture
              image={fragrance.images.atmosphere}
              fill
              focus
              sizes={sizes}
              alt=""
              className="scale-[1.04] object-cover opacity-0 transition-[opacity,transform] duration-[1200ms] ease-silk group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100"
            />
            <Picture
              image={fragrance.images.cutout}
              fill
              sizes={sizes}
              alt=""
              className="object-contain p-[12%] transition-[opacity,transform] duration-[1200ms] ease-silk group-focus-within:opacity-0 group-hover:-translate-y-2 group-hover:opacity-0"
            />
            <span
              className="eyebrow absolute top-5 left-5"
              style={{ color: fragrance.atmosphere.muted }}
            >
              {fragrance.number}
            </span>
          </div>
        </ViewTransition>
      </Link>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <Heading className="display text-[2rem] leading-none tracking-[0.12em]">
            <Link href={href} prefetch className="transition-opacity hover:opacity-70">
              {fragrance.name}
            </Link>
          </Heading>
          <p className="eyebrow mt-3 text-ink-soft">{fragrance.family.label}</p>
          <p className="mt-3 text-ui text-ink-soft">
            {sizesLabel} · from <span className="text-espresso">{formatPrice(startingPrice(fragrance))}</span>
          </p>
        </div>
        <AddToBagButton
          slug={fragrance.slug}
          variantId={base.id}
          className="eyebrow link-line min-h-11 shrink-0"
          context={`${fragrance.name} ${base.label}, ${formatPrice(base.price)}`}
        >
          Quick add
        </AddToBagButton>
      </div>
    </article>
  );
}
