"use client";

import { Check } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useCart } from "@/store/cart";
import type { FragranceSlug } from "@/types/product";

type AddToBagButtonProps = {
  slug: FragranceSlug;
  variantId: string;
  quantity?: number;
  className?: string;
  children: ReactNode;
  /** Appended for screen readers so the accessible name still begins with the visible text */
  context?: string;
};

/** Adds a variant to the bag; confirmation comes from the button state and the bag toast. */
export function AddToBagButton({ slug, variantId, quantity = 1, className, children, context }: AddToBagButtonProps) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(timer);
  }, [added]);

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        add(slug, variantId, quantity);
        setAdded(true);
      }}
    >
      {added ? (
        <span className="inline-flex items-center gap-2">
          <Check size={13} strokeWidth={1.5} aria-hidden /> Added
        </span>
      ) : (
        children
      )}
      {context && <span className="sr-only"> for {context}</span>}
    </button>
  );
}
