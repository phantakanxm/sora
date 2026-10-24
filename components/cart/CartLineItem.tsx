"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useCart, type ResolvedLine } from "@/store/cart";
import { Picture } from "@/components/ui/Picture";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function CartLineItem({ line }: { line: ResolvedLine }) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const close = useCart((s) => s.close);
  const { fragrance, variant } = line;

  return (
    <li className="flex gap-5 py-6">
      <div
        className="relative aspect-[3/4] w-24 shrink-0"
        style={{ backgroundColor: fragrance.atmosphere.surface }}
      >
        <Picture image={fragrance.images.cutout} fill sizes="96px" className="object-contain p-2" alt="" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/fragrance/${fragrance.slug}`}
              onNavigate={close}
              className="display text-[1.6rem] leading-none tracking-[0.12em] hover:opacity-70"
            >
              {fragrance.name}
            </Link>
            <p className="eyebrow mt-2 text-ink-soft">
              {fragrance.number} · {variant.label} · Eau de parfum
            </p>
          </div>
          <p className="tabular-nums">{formatPrice(line.lineTotal)}</p>
        </div>
        <div className="flex items-center justify-between">
          <QuantityStepper
            size="sm"
            value={line.quantity}
            onChange={(q) => setQuantity(line.slug, line.variantId, q)}
            label={`Quantity of ${fragrance.name} ${variant.label}`}
          />
          <button
            type="button"
            onClick={() => remove(line.slug, line.variantId)}
            className="eyebrow link-line min-h-11 text-ink-soft"
            aria-label={`Remove ${fragrance.name} ${variant.label} from bag`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
