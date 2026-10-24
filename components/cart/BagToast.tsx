"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Picture } from "@/components/ui/Picture";
import { getFragrance, getVariant } from "@/data/products";
import { useCart } from "@/store/cart";

const VISIBLE_MS = 5000;

/**
 * Quiet confirmation after adding to the bag. The live region is always mounted
 * so every addition is announced; it pauses while hovered or focused.
 */
export function BagToast() {
  const notice = useCart((s) => s.notice);
  const dismiss = useCart((s) => s.dismissNotice);
  const openBag = useCart((s) => s.open);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const fragrance = notice ? getFragrance(notice.slug) : undefined;
  const variant = fragrance && notice ? getVariant(fragrance, notice.variantId) : undefined;
  const visible = Boolean(notice && fragrance && variant);

  useEffect(() => {
    if (!notice || paused) return;
    const timer = window.setTimeout(dismiss, VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [notice, paused, dismiss]);

  return (
    <div
      ref={regionRef}
      role="status"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      className={`fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[23rem] ${
        visible ? "" : "pointer-events-none"
      }`}
    >
      {notice && fragrance && variant && (
        <div
          key={notice.id}
          className="flex animate-[toast-in_700ms_var(--ease-silk)_both] items-center gap-4 bg-obsidian p-3 pr-4 text-ivory shadow-[0_24px_60px_rgb(21_19_17/0.35)]"
        >
          <div className="relative aspect-[3/4] w-14 shrink-0" style={{ backgroundColor: fragrance.atmosphere.surface }}>
            <Picture image={fragrance.images.cutout} fill sizes="56px" alt="" className="object-contain p-1" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-sand">Added to your bag</p>
            <p className="mt-1 truncate text-ui">
              {fragrance.name} · {variant.label} × {notice.quantity}
            </p>
            <button type="button" onClick={openBag} className="eyebrow link-line mt-1 min-h-9 text-ivory">
              View bag
            </button>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss notification"
            className="grid h-10 w-10 shrink-0 place-items-center self-start text-sand transition-opacity hover:opacity-60"
          >
            <X size={15} strokeWidth={1.25} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
