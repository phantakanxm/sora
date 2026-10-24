export type FragranceSlug = "dusk" | "dawn" | "ember";

export type FamilyKey = "woody" | "floral" | "spicy";

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
  /** CSS object-position that keeps the bottle in frame when cropped */
  focus: string;
}

export interface Variant {
  id: string;
  label: string;
  volumeMl: number;
  /** Price in whole US dollars. Demo pricing only. */
  price: number;
}

export interface NotePyramid {
  top: readonly string[];
  heart: readonly string[];
  base: readonly string[];
}

export interface Atmosphere {
  /** Background colour of immersive sections for this fragrance */
  surface: string;
  /** Primary text colour on that surface */
  ink: string;
  /** Muted text colour on that surface */
  muted: string;
  /** Whether the surface is dark (drives nav contrast and button styles) */
  tone: "dark" | "light";
}

export interface Ritual {
  /** Where on the body to apply */
  where: string;
  /** Moments and seasons it suits */
  when: string;
  /** A pairing with another fragrance in the collection */
  layering: { with: FragranceSlug; text: string };
}

export interface Fragrance {
  slug: FragranceSlug;
  name: string;
  number: string;
  tagline: string;
  personality: readonly string[];
  family: { key: FamilyKey; label: string };
  description: string;
  story: readonly string[];
  notes: NotePyramid;
  bottle: string;
  wear: { intensity: string; moment: string; longevity: string };
  ritual: Ritual;
  variants: readonly Variant[];
  atmosphere: Atmosphere;
  images: {
    cutout: ImageAsset;
    studio: ImageAsset;
    campaign: ImageAsset;
    atmosphere: ImageAsset;
    gallery: readonly ImageAsset[];
  };
}

export interface Ingredient {
  id: string;
  title: string;
  fragrance: FragranceSlug;
  verse: string;
  detail: string;
  image: ImageAsset;
}
