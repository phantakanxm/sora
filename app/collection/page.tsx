import type { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { CollectionBrowser } from "@/components/collection/CollectionBrowser";
import { PageTransition } from "@/components/layout/PageTransition";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { DemoNotice } from "@/components/ui/DemoNotice";

export const metadata: Metadata = {
  title: "The Collection",
  description: "DUSK, DAWN and EMBER: three eaux de parfum from SORA, a fictional niche fragrance house.",
};

export default function CollectionPage() {
  return (
    <PageTransition>
      <section data-nav-theme="light" className="bg-ivory pt-[calc(var(--spacing-header)+clamp(4rem,10vw,9rem))] pb-section">
        <div className="shell">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <p data-reveal className="eyebrow text-ink-soft">
                The collection — 03 eaux de parfum
              </p>
            </Reveal>
            <div className="md:col-span-8 md:col-start-5">
              <SplitHeading as="h1" immediate delay={0.2} className="display text-h1 text-balance">
                Three quiet compositions.
              </SplitHeading>
              <Reveal delay={0.5} className="mt-10 grid gap-8 md:grid-cols-8">
                <p data-reveal className="text-lead md:col-span-5">
                  Woods at dusk, petals at dawn, resin by firelight. Each fragrance is a single mood, composed with
                  very few materials.
                </p>
                <DemoNotice className="text-ink-soft md:col-span-3 md:pt-2">
                  Portfolio storefront: prices are illustrative and nothing is charged.
                </DemoNotice>
              </Reveal>
            </div>
          </div>

          <div className="mt-20 md:mt-28">
            <CollectionBrowser />
          </div>

          <Reveal className="mt-32 flex flex-col items-start justify-between gap-8 border-t border-line pt-12 md:flex-row md:items-end">
            <div data-reveal>
              <p className="eyebrow text-ink-soft">Not sure where to begin?</p>
              <p className="display mt-4 text-h3">Let a few questions guide you.</p>
            </div>
            <div data-reveal>
              <ArrowLink href="/discover" label="Discover your scent" />
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
