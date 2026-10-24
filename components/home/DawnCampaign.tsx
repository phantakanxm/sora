import Link from "next/link";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { Picture } from "@/components/ui/Picture";
import { getFragranceOrThrow } from "@/data/products";

const dawn = getFragranceOrThrow("dawn");

export function DawnCampaign() {
  return (
    <section
      data-nav-theme="light"
      aria-labelledby="dawn-campaign-title"
      className="relative overflow-hidden text-espresso"
      style={{ backgroundColor: dawn.atmosphere.surface }}
    >
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto">
        <Parallax amount={10} className="absolute -inset-y-[6%] inset-x-0">
          <Picture
            image={dawn.images.campaign}
            fill
            quality={85}
            sizes="100vw"
            className="object-cover object-[22%_50%]"
          />
        </Parallax>
      </div>

      <div className="shell relative grid py-20 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:py-0">
        <div className="lg:col-span-4 lg:col-start-8">
          <Reveal>
            <p data-reveal className="eyebrow text-espresso/75">
              <span className="mr-3 text-amber-deep">04</span>Campaign — {dawn.name} / {dawn.number}
            </p>
          </Reveal>
          <SplitHeading id="dawn-campaign-title" className="display mt-8 text-h2 uppercase tracking-[0.02em]">
            The softness
            <br />
            of morning.
          </SplitHeading>
          <Reveal stagger={0.12}>
            <p data-reveal className="mt-8 max-w-sm text-espresso/80">
              {dawn.description} Bergamot and iris open into white musk and sandalwood, warm as a sunlit wall.
            </p>
            <div data-reveal className="mt-10">
              <Link href="/fragrance/dawn" className="btn btn-dark">
                Discover DAWN
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
