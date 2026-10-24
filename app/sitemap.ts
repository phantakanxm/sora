import type { MetadataRoute } from "next";
import { fragrances } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/collection", "/philosophy", "/discover"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const products = fragrances.map((f) => ({
    url: `${siteUrl}/fragrance/${f.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    images: [`${siteUrl}${f.images.campaign.src}`],
  }));
  return [...pages, ...products];
}
