"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { useModalDialog } from "@/hooks/useModalDialog";
import { formatPrice } from "@/lib/format";
import { resolveLines, subtotalOf, useCart } from "@/store/cart";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { CartLineItem } from "./CartLineItem";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const rawLines = useCart((s) => s.lines);
  const lines = useMemo(() => resolveLines(rawLines), [rawLines]);
  const subtotal = subtotalOf(lines);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  const { dialogRef, visible, onCancel, onNativeClose, onBackdropClick } = useModalDialog(isOpen, close);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const emptyLinkRef = useRef<HTMLAnchorElement>(null);
  const lineCount = useRef(lines.length);

  // Removing a line unmounts the focused button; keep focus inside the drawer.
  useEffect(() => {
    const removed = lines.length < lineCount.current;
    lineCount.current = lines.length;
    if (!isOpen || !removed) return;
    (lines.length === 0 ? emptyLinkRef.current : headingRef.current)?.focus();
  }, [lines.length, isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="bag-title"
      onCancel={onCancel}
      onClose={onNativeClose}
      onClick={onBackdropClick}
      className={`sora-dialog transition-[background-color] duration-500 ease-silk ${
        visible ? "bg-obsidian/55" : "bg-obsidian/0"
      }`}
    >
      <div
        className={`ml-auto flex h-full w-full max-w-[30rem] flex-col bg-ivory text-espresso shadow-[0_0_80px_rgb(21_19_17/0.25)] transition-[transform,opacity] duration-500 ease-silk ${
          visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-8">
          <h2 id="bag-title" ref={headingRef} tabIndex={-1} className="eyebrow outline-none">
            Your bag <span className="tabular-nums">({count})</span>
          </h2>
          <button
            type="button"
            onClick={close}
            data-autofocus
            className="eyebrow -mr-2 flex min-h-11 items-center gap-2 px-2 transition-opacity hover:opacity-60"
            aria-label="Close bag"
          >
            Close <X size={16} strokeWidth={1.25} aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6 sm:px-8">
            <p className="display text-h3">Your bag is empty.</p>
            <p className="max-w-xs text-ink-soft">
              Every scent begins with a single moment. Find the one that stays with you.
            </p>
            <Link ref={emptyLinkRef} href="/collection" onNavigate={close} className="btn btn-dark mt-2">
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-6 sm:px-8" data-lenis-prevent>
              {lines.map((line) => (
                <CartLineItem key={`${line.slug}-${line.variantId}`} line={line} />
              ))}
            </ul>
            <div className="space-y-5 border-t border-line px-6 py-6 sm:px-8">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="display text-[1.75rem] tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <DemoNotice className="text-ink-soft">
                Shipping is calculated at checkout. SORA is a fictional brand and no payment is ever taken.
              </DemoNotice>
              <Link href="/checkout" onNavigate={close} className="btn btn-solid w-full">
                Continue to checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
