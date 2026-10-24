import { asset } from "@/lib/images";
import type { FamilyKey, Fragrance, FragranceSlug, Variant } from "@/types/product";

export const fragrances: readonly Fragrance[] = [
  {
    slug: "dusk",
    name: "DUSK",
    number: "01",
    tagline: "The stillness after light.",
    personality: ["Mysterious", "Intimate", "Woody"],
    family: { key: "woody", label: "Woody / Smoky / Amber" },
    description:
      "A quiet depth of woods and warmth. DUSK captures the stillness that arrives when daylight fades.",
    story: [
      "DUSK opens with the dry spark of black pepper, the moment a match is struck in a darkened room.",
      "Cedarwood settles in slowly, grounded and unhurried, before amber and vetiver close around the skin like the last warmth held in stone.",
    ],
    notes: {
      top: ["Black Pepper"],
      heart: ["Cedarwood"],
      base: ["Amber", "Vetiver"],
    },
    bottle: "Smoky charcoal glass",
    wear: { intensity: "Deep", moment: "Evening", longevity: "8–10 hours" },
    ritual: {
      where: "Two touches at the base of the throat and the inner wrists. Let it settle on its own rather than rubbing it in.",
      when: "Evenings, cooler weather and quiet rooms, when there is time for the woods to open slowly.",
      layering: { with: "ember", text: "Worn beneath EMBER, the woods turn smokier and the trail lasts deep into the night." },
    },
    variants: [
      { id: "dusk-50", label: "50 ml", volumeMl: 50, price: 185 },
      { id: "dusk-100", label: "100 ml", volumeMl: 100, price: 265 },
    ],
    atmosphere: { surface: "#151311", ink: "#F3EEE7", muted: "#D8C7B0", tone: "dark" },
    images: {
      cutout: asset("19-sora-dusk-transparent.webp", "DUSK 01 eau de parfum in smoky charcoal glass"),
      studio: asset("01-sora-dusk-master.webp", "DUSK 01 bottle photographed against a soft grey studio backdrop"),
      campaign: asset(
        "04-sora-dusk-hero.webp",
        "DUSK bottle resting on dark stone as a shaft of light cuts through the shadows",
      ),
      atmosphere: asset(
        "08-sora-dusk-atmosphere.webp",
        "DUSK bottle among weathered wood and stone, wrapped in drifting smoke",
      ),
      gallery: [
        asset("01-sora-dusk-master.webp", "DUSK 01 bottle, front view in the studio"),
        asset("07-sora-dusk-detail.webp", "Close detail of the DUSK label and charcoal glass in low light"),
        asset("06-sora-dusk-stone.webp", "DUSK bottle beside a rough black stone in raking light", "36% 50%"),
        asset("08-sora-dusk-atmosphere.webp", "DUSK bottle among wood and stone in smoke", "63% 50%"),
      ],
    },
  },
  {
    slug: "dawn",
    name: "DAWN",
    number: "02",
    tagline: "The softness of morning.",
    personality: ["Soft", "Luminous", "Serene"],
    family: { key: "floral", label: "Floral / Musk / Light" },
    description: "A gentle beginning. DAWN is the softness of morning light, translated into scent.",
    story: [
      "Bergamot arrives first, bright and fleeting, like light finding the edge of a curtain.",
      "Iris unfolds into powdered petals and clean linen, while white musk and sandalwood hold the warmth of a room slowly waking.",
    ],
    notes: {
      top: ["Bergamot"],
      heart: ["Iris"],
      base: ["White Musk", "Sandalwood"],
    },
    bottle: "Pale champagne glass",
    wear: { intensity: "Soft", moment: "Morning", longevity: "6–8 hours" },
    ritual: {
      where: "A single veil across the collarbone, or mist the air and step through it for the lightest trace.",
      when: "Mornings, warm days and close company. It is a scent for being near someone.",
      layering: { with: "dusk", text: "Beneath DUSK, its white musk softens the cedar into something clean and quiet." },
    },
    variants: [
      { id: "dawn-50", label: "50 ml", volumeMl: 50, price: 175 },
      { id: "dawn-100", label: "100 ml", volumeMl: 100, price: 250 },
    ],
    atmosphere: { surface: "#E9DFD1", ink: "#3B302B", muted: "#6A5C53", tone: "light" },
    images: {
      cutout: asset("20-sora-dawn-transparent.webp", "DAWN 02 eau de parfum in pale champagne glass"),
      studio: asset("02-sora-dawn-master.webp", "DAWN 02 bottle photographed against a soft grey studio backdrop"),
      campaign: asset(
        "05-sora-dawn-campaign.webp",
        "DAWN bottle on pale limestone in warm morning light with leaf shadows on the wall",
      ),
      atmosphere: asset(
        "11-sora-dawn-atmosphere.webp",
        "DAWN bottle beside sheer linen curtains, dried flowers and porous stone in sunlight",
      ),
      gallery: [
        asset("02-sora-dawn-master.webp", "DAWN 02 bottle, front view in the studio"),
        asset("10-sora-dawn-detail.webp", "DAWN bottle in sunlight with soft shadows across linen"),
        asset("09-sora-dawn-stone.webp", "DAWN bottle on limestone beside dried flowers in warm light", "37% 50%"),
        asset("11-sora-dawn-atmosphere.webp", "DAWN bottle among sheer linen and stone in morning light", "62% 50%"),
      ],
    },
  },
  {
    slug: "ember",
    name: "EMBER",
    number: "03",
    tagline: "A warmth that lingers.",
    personality: ["Warm", "Expressive", "Lingering"],
    family: { key: "spicy", label: "Spicy / Resinous / Earthy" },
    description:
      "An intimate warmth that lingers. EMBER leaves a trace long after the moment has passed.",
    story: [
      "Saffron glows at the opening, honeyed and faintly metallic, like heat rising from a stone.",
      "Incense curls through the heart before patchouli and labdanum leave a resinous trace that stays long after you have gone.",
    ],
    notes: {
      top: ["Saffron"],
      heart: ["Incense"],
      base: ["Patchouli", "Labdanum"],
    },
    bottle: "Burnt amber glass",
    wear: { intensity: "Rich", moment: "Night", longevity: "10–12 hours" },
    ritual: {
      where: "Behind the ears and at the nape of the neck, where the body's warmth slowly lifts the resin.",
      when: "Night, colder months and long dinners. One application carries through the evening.",
      layering: { with: "dawn", text: "Over DAWN, the iris turns honeyed and the incense glows a little brighter." },
    },
    variants: [
      { id: "ember-50", label: "50 ml", volumeMl: 50, price: 195 },
      { id: "ember-100", label: "100 ml", volumeMl: 100, price: 280 },
    ],
    atmosphere: { surface: "#3B302B", ink: "#F3EEE7", muted: "#D8C7B0", tone: "dark" },
    images: {
      cutout: asset("21-sora-ember-transparent.webp", "EMBER 03 eau de parfum in burnt amber glass"),
      studio: asset("03-sora-ember-master.webp", "EMBER 03 bottle photographed against a soft grey studio backdrop"),
      campaign: asset(
        "12-sora-ember-resin.webp",
        "EMBER bottle on rough terracotta stone beside raw amber resin in low sun",
      ),
      atmosphere: asset(
        "14-sora-ember-atmosphere.webp",
        "EMBER bottle beside dark wood and a smoking incense bowl",
      ),
      gallery: [
        asset("03-sora-ember-master.webp", "EMBER 03 bottle, front view in the studio"),
        asset("13-sora-ember-detail.webp", "EMBER bottle glowing amber in raking golden light"),
        asset("12-sora-ember-resin.webp", "EMBER bottle beside raw amber resin on terracotta stone", "62% 50%"),
        asset("14-sora-ember-atmosphere.webp", "EMBER bottle with dark wood and rising incense smoke", "60% 50%"),
      ],
    },
  },
];

export const families: readonly { key: FamilyKey; label: string }[] = [
  { key: "woody", label: "Woody" },
  { key: "floral", label: "Floral" },
  { key: "spicy", label: "Spicy" },
];

export function getFragrance(slug: string): Fragrance | undefined {
  return fragrances.find((f) => f.slug === slug);
}

export function getFragranceOrThrow(slug: FragranceSlug): Fragrance {
  const fragrance = getFragrance(slug);
  if (!fragrance) throw new Error(`Unknown fragrance: ${slug}`);
  return fragrance;
}

export function getVariant(fragrance: Fragrance, variantId: string): Variant | undefined {
  return fragrance.variants.find((v) => v.id === variantId);
}

export function getRelated(slug: FragranceSlug): Fragrance[] {
  return fragrances.filter((f) => f.slug !== slug);
}

export function startingPrice(fragrance: Fragrance): number {
  return Math.min(...fragrance.variants.map((v) => v.price));
}
