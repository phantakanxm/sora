import { ArtOfScent } from "@/components/home/ArtOfScent";
import { BrandIntro } from "@/components/home/BrandIntro";
import { DawnCampaign } from "@/components/home/DawnCampaign";
import { DiscoveryInvite } from "@/components/home/DiscoveryInvite";
import { FeaturedFragrances } from "@/components/home/FeaturedFragrances";
import { Hero } from "@/components/home/Hero";
import { PhilosophyTeaser } from "@/components/home/PhilosophyTeaser";
import { PageTransition } from "@/components/layout/PageTransition";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <BrandIntro />
      <FeaturedFragrances />
      <ArtOfScent />
      <DawnCampaign />
      <DiscoveryInvite />
      <PhilosophyTeaser />
    </PageTransition>
  );
}
