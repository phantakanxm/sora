"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { shippingMethods } from "@/lib/checkout";
import type { ConfirmedOrder } from "./CheckoutView";
import { OrderSummary } from "./OrderSummary";

export function OrderConfirmation({ order }: { order: ConfirmedOrder }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const method = shippingMethods[order.shipping];

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <p className="eyebrow text-ink-soft">Demo reference · {order.reference}</p>
        <h1 ref={headingRef} tabIndex={-1} className="display mt-8 text-h1 text-balance outline-none">
          Thank you, {order.firstName}.
        </h1>
        <p className="mt-8 max-w-lg text-lead">
          This is where your order would be confirmed. Because SORA is a portfolio demonstration, no order has been
          placed, nothing has been charged, and no details have left your browser.
        </p>

        <dl className="mt-14 grid max-w-lg gap-6 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <dt className="eyebrow text-ink-soft">Confirmation would go to</dt>
            <dd className="mt-2 break-all">{order.email}</dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Delivery</dt>
            <dd className="mt-2">
              {method.label}, {method.detail.toLowerCase()} to {order.city}, {order.country}
            </dd>
          </div>
        </dl>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/collection" className="btn btn-dark">
            Return to the collection
          </Link>
          <Link href="/" className="eyebrow link-line">
            Back to home
          </Link>
        </div>
      </div>
      <aside aria-label="Demo order summary" className="lg:col-span-5 lg:col-start-8">
        <OrderSummary lines={order.lines} subtotal={order.subtotal} shippingCost={order.shippingCost} />
      </aside>
    </div>
  );
}
