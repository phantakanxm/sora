"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useState } from "react";
import { resolveLines, subtotalOf, useCart, type ResolvedLine } from "@/store/cart";
import { shippingMethods, type ShippingMethod } from "@/lib/checkout";
import { CheckoutForm, type SubmittedOrder } from "./CheckoutForm";
import { OrderConfirmation } from "./OrderConfirmation";
import { OrderSummary } from "./OrderSummary";

export interface ConfirmedOrder extends SubmittedOrder {
  lines: ResolvedLine[];
  subtotal: number;
  shippingCost: number;
  total: number;
}

export function CheckoutView() {
  const hydrated = useCart((s) => s.hasHydrated);
  const rawLines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const lines = useMemo(() => resolveLines(rawLines), [rawLines]);
  const [shipping, setShipping] = useState<ShippingMethod>("standard");
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null);

  // A confirmation is a moment, not a place: clear it when the page is hidden.
  useLayoutEffect(() => () => setConfirmed(null), []);

  const subtotal = subtotalOf(lines);
  const shippingCost = shippingMethods[shipping].price;

  if (confirmed) return <OrderConfirmation order={confirmed} />;

  if (!hydrated) {
    return (
      <div>
        <h1 className="display text-h2">Checkout</h1>
        <p role="status" className="py-24 text-ink-soft">
          Preparing your bag…
        </p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-xl py-20">
        <h1 className="display text-h2">Your bag is empty.</h1>
        <p className="mt-6 text-lead text-ink-soft">
          There is nothing to check out yet. Explore the collection, or let a few questions guide you.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/collection" className="btn btn-dark">
            Explore the collection
          </Link>
          <Link href="/discover" className="eyebrow link-line">
            Discover your scent
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <h1 className="display text-h2">Checkout</h1>
        <CheckoutForm
          shipping={shipping}
          onShippingChange={setShipping}
          onSubmitted={(order) => {
            setConfirmed({ ...order, lines, subtotal, shippingCost, total: subtotal + shippingCost });
            clear();
            window.scrollTo({ top: 0 });
          }}
        />
      </div>
      <aside aria-label="Order summary" className="lg:col-span-5 lg:col-start-8">
        <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
          <OrderSummary lines={lines} subtotal={subtotal} shippingCost={shippingCost} editable />
        </div>
      </aside>
    </div>
  );
}
