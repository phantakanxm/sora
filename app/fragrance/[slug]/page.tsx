import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProductView } from "@/components/product/ProductView";
import { fragrances, getFragrance } from "@/data/products";

/**
 * The whole route must be static. Unknown slugs wait for their complete render instead of
 * receiving the fallback shell, so notFound() answers with a real HTTP 404, and the
 * collection bottle can morph straight into the gallery on navigation.
 */
export const ensureStatic = "navigation";
/** Navigations render the complete static page rather than streaming behind a fallback. */
export const instant = false;

export function generateStaticParams() {
  return fragrances.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/fragrance/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const fragrance = getFragrance(slug);
  if (!fragrance) return { title: "Fragrance not found" };
  return {
    title: `${fragrance.name} ${fragrance.number}`,
    description: fragrance.description,
    openGraph: { images: [{ url: fragrance.images.campaign.src, alt: fragrance.images.campaign.alt }] },
    twitter: { card: "summary_large_image", images: [fragrance.images.campaign.src] },
  };
}

export default async function FragrancePage({ params }: PageProps<"/fragrance/[slug]">) {
  const { slug } = await params;
  const fragrance = getFragrance(slug);
  if (!fragrance) notFound();

  return (
    <PageTransition>
      <ProductView fragrance={fragrance} />
    </PageTransition>
  );
}
