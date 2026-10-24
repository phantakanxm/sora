"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { fragrances, getFragrance, getVariant } from "@/data/products";
import { clamp } from "@/lib/format";
import { MAX_QUANTITY, MIN_QUANTITY, type CartLine } from "@/types/cart";
import type { Fragrance, FragranceSlug, Variant } from "@/types/product";

export interface AddedNotice {
  /** Increments on every add so repeated adds of the same line re-announce */
  id: number;
  slug: FragranceSlug;
  variantId: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  notice: AddedNotice | null;
  hasHydrated: boolean;
  add: (slug: FragranceSlug, variantId: string, quantity?: number) => void;
  remove: (slug: FragranceSlug, variantId: string) => void;
  setQuantity: (slug: FragranceSlug, variantId: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  dismissNotice: () => void;
}

const sameLine = (line: CartLine, slug: FragranceSlug, variantId: string) =>
  line.slug === slug && line.variantId === variantId;

const isValidLine = (line: CartLine) => {
  const fragrance = getFragrance(line.slug);
  return Boolean(fragrance && getVariant(fragrance, line.variantId));
};

const toQuantity = (value: number) =>
  Number.isFinite(value) ? clamp(Math.round(value), MIN_QUANTITY, MAX_QUANTITY) : MIN_QUANTITY;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      notice: null,
      hasHydrated: false,
      add: (slug, variantId, quantity = 1) => {
        const candidate = { slug, variantId, quantity: toQuantity(quantity) };
        if (!isValidLine(candidate)) return;
        set((state) => {
          const existing = state.lines.find((l) => sameLine(l, slug, variantId));
          const lines = existing
            ? state.lines.map((l) =>
                sameLine(l, slug, variantId) ? { ...l, quantity: toQuantity(l.quantity + candidate.quantity) } : l,
              )
            : [...state.lines, candidate];
          const notice = { id: (state.notice?.id ?? 0) + 1, ...candidate };
          return { lines, notice };
        });
      },
      remove: (slug, variantId) =>
        set((state) => ({ lines: state.lines.filter((l) => !sameLine(l, slug, variantId)) })),
      setQuantity: (slug, variantId, quantity) =>
        set((state) => ({
          lines: state.lines.map((l) => (sameLine(l, slug, variantId) ? { ...l, quantity: toQuantity(quantity) } : l)),
        })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true, notice: null }),
      close: () => set({ isOpen: false }),
      dismissNotice: () => set({ notice: null }),
    }),
    {
      name: "sora-bag",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ lines: state.lines }),
      merge: (persisted, current) => {
        const stored = (persisted as Partial<CartState> | undefined)?.lines;
        const lines = Array.isArray(stored)
          ? stored.filter(isValidLine).map((l) => ({ ...l, quantity: toQuantity(l.quantity) }))
          : [];
        return { ...current, lines };
      },
      onRehydrateStorage: () => () => {
        useCart.setState({ hasHydrated: true });
      },
    },
  ),
);

export interface ResolvedLine extends CartLine {
  fragrance: Fragrance;
  variant: Variant;
  lineTotal: number;
}

/** Joins stored lines with product data so prices always come from the catalogue. */
export function resolveLines(lines: readonly CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const fragrance = fragrances.find((f) => f.slug === line.slug);
    const variant = fragrance && getVariant(fragrance, line.variantId);
    if (!fragrance || !variant) return [];
    return [{ ...line, fragrance, variant, lineTotal: variant.price * line.quantity }];
  });
}

export const selectCount = (state: CartState) => state.lines.reduce((sum, l) => sum + l.quantity, 0);

export function subtotalOf(lines: readonly ResolvedLine[]): number {
  return lines.reduce((sum, l) => sum + l.lineTotal, 0);
}
