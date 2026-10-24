import { beforeEach, describe, expect, it } from "vitest";
import { resolveLines, selectCount, subtotalOf, useCart } from "@/store/cart";
import { MAX_QUANTITY } from "@/types/cart";
import type { FragranceSlug } from "@/types/product";

const state = () => useCart.getState();

beforeEach(() => {
  localStorage.clear();
  useCart.setState({ lines: [], notice: null, isOpen: false });
});

describe("cart store", () => {
  it("merges repeated adds of the same variant and keeps variants separate", () => {
    state().add("dusk", "dusk-50");
    state().add("dusk", "dusk-50", 2);
    state().add("dusk", "dusk-100");
    expect(state().lines).toEqual([
      { slug: "dusk", variantId: "dusk-50", quantity: 3 },
      { slug: "dusk", variantId: "dusk-100", quantity: 1 },
    ]);
    expect(selectCount(state())).toBe(4);
  });

  it("clamps quantities to the allowed range", () => {
    state().add("dawn", "dawn-50", 50);
    expect(state().lines[0].quantity).toBe(MAX_QUANTITY);
    state().setQuantity("dawn", "dawn-50", 0);
    expect(state().lines[0].quantity).toBe(1);
    state().setQuantity("dawn", "dawn-50", Number.NaN);
    expect(state().lines[0].quantity).toBe(1);
    state().setQuantity("dawn", "dawn-50", 2.6);
    expect(state().lines[0].quantity).toBe(3);
  });

  it("ignores products or variants that do not exist", () => {
    state().add("dusk", "dawn-50");
    state().add("nope" as FragranceSlug, "nope-50");
    expect(state().lines).toEqual([]);
  });

  it("removes a single line", () => {
    state().add("dusk", "dusk-50");
    state().add("ember", "ember-50");
    state().remove("dusk", "dusk-50");
    expect(state().lines.map((l) => l.slug)).toEqual(["ember"]);
  });

  it("prices lines from the catalogue", () => {
    state().add("dawn", "dawn-100", 2);
    state().add("ember", "ember-50");
    const lines = resolveLines(state().lines);
    expect(lines.map((l) => l.lineTotal)).toEqual([500, 195]);
    expect(subtotalOf(lines)).toBe(695);
  });

  it("raises a new notice for every add, and clears it when the bag opens", () => {
    state().add("dusk", "dusk-50");
    const first = state().notice?.id ?? 0;
    state().add("dusk", "dusk-50");
    expect(state().notice).toMatchObject({ slug: "dusk", variantId: "dusk-50", quantity: 1 });
    expect(state().notice?.id).toBe(first + 1);
    state().open();
    expect(state().notice).toBeNull();
  });
});

describe("cart persistence", () => {
  it("stores only lines, never prices or UI state", () => {
    state().add("ember", "ember-100");
    state().open();
    const stored = JSON.parse(localStorage.getItem("sora-bag") ?? "{}");
    expect(stored.state).toEqual({ lines: [{ slug: "ember", variantId: "ember-100", quantity: 1 }] });
  });

  it("drops invalid stored lines and repairs quantities on rehydrate", async () => {
    localStorage.setItem(
      "sora-bag",
      JSON.stringify({
        version: 1,
        state: {
          lines: [
            { slug: "dusk", variantId: "dusk-50", quantity: 99 },
            { slug: "dusk", variantId: "missing", quantity: 1 },
            { slug: "ghost", variantId: "ghost-50", quantity: 1 },
          ],
        },
      }),
    );
    await useCart.persist.rehydrate();
    expect(state().lines).toEqual([{ slug: "dusk", variantId: "dusk-50", quantity: MAX_QUANTITY }]);
    expect(state().hasHydrated).toBe(true);
  });
});
