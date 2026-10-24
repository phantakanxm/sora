import type { FragranceSlug } from "./product";

export interface CartLine {
  slug: FragranceSlug;
  variantId: string;
  quantity: number;
}

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10;
