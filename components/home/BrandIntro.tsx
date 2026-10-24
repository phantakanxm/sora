import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function BrandIntro() {
  return (
    <section data-nav-theme="light" aria-labelledby="intro-title" className="bg-ivory py-section">
      <div className="shell grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p data-reveal className="eyebrow text-ink-soft">
            <span className="mr-3 text-amber-deep">01</span>The house
          </p>
        </Reveal>

        <div className="md:col-span-8 md:col-start-5">
          <SplitHeading id="intro-title" className="display text-h2 text-balance">
            Some things are felt,
            <br />
            not seen.
          </SplitHeading>

          <Reveal className="mt-14 grid gap-10 md:mt-20 md:grid-cols-8" stagger={0.15}>
            <p data-reveal className="text-lead md:col-span-5">
              SORA is a small house of scent built around restraint. We compose fragrances the way light falls
              into a room: slowly, softly, leaving more than it shows.
            </p>
            <div data-reveal className="space-y-8 md:col-span-3 md:pt-2">
              <p className="text-ink-soft">
                Three compositions. Natural materials. No noise. Each one is a memory held just beneath the skin.
              </p>
              <ArrowLink href="/philosophy" label="Our philosophy" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
