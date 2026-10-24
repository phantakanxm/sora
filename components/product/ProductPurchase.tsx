"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/store/cart";
import type { Fragrance } from "@/types/product";

export function ProductPurchase({ fragrance }: { fragrance: Fragrance }) {
  const [variantId, setVariantId] = useState(fragrance.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(timer);
  }, [added]);

  const variant = fragrance.variants.find((v) => v.id === variantId) ?? fragrance.variants[0];

  const onAdd = () => {
    add(fragrance.slug, variant.id, quantity);
    setQuantity(1);
    setAdded(true);
  };

  return (
    <div className="space-y-8">
      <p className="flex items-baseline gap-3">
        <span className="display text-[2.25rem] leading-none tabular-nums">{formatPrice(variant.price)}</span>
        <span className="eyebrow text-ink-soft">Demo price · {variant.label}</span>
      </p>

      {fragrance.variants.length > 1 && (
        <fieldset>
          <legend className="eyebrow text-ink-soft">
            Size
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {fragrance.variants.map((v) => {
              const checked = v.id === variant.id;
              return (
                <label
                  key={v.id}
                  className={`relative flex min-h-14 cursor-pointer items-center justify-between border px-4 transition-colors duration-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-4 ${
                    checked ? "border-espresso" : "border-line hover:border-espresso/40"
                  }`}
                >
                  <input
                    type="radio"
                    name={`size-${fragrance.slug}`}
                    value={v.id}
                    checked={checked}
                    onChange={() => setVariantId(v.id)}
                    className="sr-only"
                  />
                  <span className="flex items-center gap-2">
                    {checked && <Check size={14} strokeWidth={1.5} aria-hidden />}
                    <span>{v.label}</span>
                  </span>
                  <span className="text-ui tabular-nums text-ink-soft">{formatPrice(v.price)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-stretch gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} label={`Quantity of ${fragrance.name}`} />
        <button type="button" onClick={onAdd} className="btn btn-solid min-w-[14rem] flex-1">
          {added ? (
            <>
              <Check size={14} strokeWidth={1.5} aria-hidden /> Added to bag
            </>
          ) : (
            <>Add to bag · {formatPrice(variant.price * quantity)}</>
          )}
        </button>
      </div>
    </div>
  );
}
