"use client";

import { Picture } from "@/components/ui/Picture";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatPrice } from "@/lib/format";
import { useCart, type ResolvedLine } from "@/store/cart";

type OrderSummaryProps = {
  lines: readonly ResolvedLine[];
  subtotal: number;
  shippingCost: number;
  /** Allow quantity changes (checkout) or show a fixed record (confirmation). */
  editable?: boolean;
};

export function OrderSummary({ lines, subtotal, shippingCost, editable }: OrderSummaryProps) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <div className="bg-sand/30 p-6 sm:p-8">
      <h2 className="eyebrow">
        Order summary <span className="text-ink-soft">({count} {count === 1 ? "item" : "items"})</span>
      </h2>
      <ul className="mt-6 divide-y divide-line">
        {lines.map((line) => (
          <li key={`${line.slug}-${line.variantId}`} className="flex gap-4 py-5">
            <div className="relative aspect-[3/4] w-16 shrink-0" style={{ backgroundColor: line.fragrance.atmosphere.surface }}>
              <Picture image={line.fragrance.images.cutout} fill sizes="64px" alt="" className="object-contain p-1.5" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="display text-[1.4rem] leading-none tracking-[0.12em]">{line.fragrance.name}</p>
                  <p className="eyebrow mt-2 text-ink-soft">
                    {line.variant.label} · {formatPrice(line.variant.price)}
                    {!editable && ` · Qty ${line.quantity}`}
                  </p>
                </div>
                <p className="tabular-nums">{formatPrice(line.lineTotal)}</p>
              </div>
              {editable && (
                <div className="flex items-center justify-between">
                  <QuantityStepper
                    size="sm"
                    value={line.quantity}
                    onChange={(q) => setQuantity(line.slug, line.variantId, q)}
                    label={`Quantity of ${line.fragrance.name} ${line.variant.label}`}
                  />
                  <button
                    type="button"
                    className="eyebrow link-line link-quiet min-h-11 text-ink-soft"
                    onClick={() => remove(line.slug, line.variantId)}
                    aria-label={`Remove ${line.fragrance.name} ${line.variant.label}`}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-2 space-y-3 border-t border-line pt-6 text-ui">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd className="tabular-nums">{shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}</dd>
        </div>
        <div className="flex justify-between text-ink-soft">
          <dt>Taxes</dt>
          <dd>Not applicable (demo)</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <dt className="eyebrow">Total</dt>
          <dd className="display text-[2rem] leading-none tabular-nums" aria-live="polite">
            {formatPrice(subtotal + shippingCost)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
