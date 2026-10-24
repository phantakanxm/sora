import { asset } from "@/lib/images";
import type { Ingredient } from "@/types/product";

export const ingredients: readonly Ingredient[] = [
  {
    id: "cedar-vetiver",
    title: "Cedar & Vetiver",
    fragrance: "dusk",
    verse: "Roots pulled from dark earth. Wood that remembers the forest.",
    detail:
      "Dry cedarwood and smoky vetiver root form the quiet spine of DUSK: grounded, mineral, unhurried.",
    image: asset("15-sora-cedar-vetiver.webp", "Weathered cedar wood, vetiver roots and volcanic stone in raking light"),
  },
  {
    id: "iris-linen",
    title: "Iris & Linen",
    fragrance: "dawn",
    verse: "A petal opening in the first light. The softness of washed cloth.",
    detail:
      "Powdery iris and clean white musk give DAWN its luminous calm, close to the skin like morning linen.",
    image: asset("16-sora-iris-linen.webp", "A cream iris resting on folded linen against warm limestone"),
  },
  {
    id: "amber-incense",
    title: "Amber & Incense",
    fragrance: "ember",
    verse: "Resin warmed by the sun. Smoke that lingers in the air.",
    detail:
      "Golden labdanum resin and curling incense are the slow-burning heart of EMBER, warm, deep and lasting.",
    image: asset("17-sora-amber-incense.webp", "Raw amber resin beside a smoking incense bowl on terracotta"),
  },
];
