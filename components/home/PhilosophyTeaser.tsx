import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Picture } from "@/components/ui/Picture";
import { asset } from "@/lib/images";

export const philosophyImage = asset(
  "18-sora-philosophy.webp",
  "Sheer linen drapery lifting in a breeze inside a shadowed room, touched by warm light",
  "30% 50%",
);

export function PhilosophyTeaser() {
  return (
    <section data-nav-theme="light" aria-labelledby="philosophy-teaser-title" className="bg-ivory py-section">
      <div className="shell grid items-end gap-12 md:grid-cols-12 md:gap-8">
        <ImageReveal from="left" className="relative md:col-span-8">
          <div className="relative aspect-[16/9]">
            <Picture image={philosophyImage} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
          </div>
        </ImageReveal>
        <Reveal className="md:col-span-3 md:col-start-10" stagger={0.12}>
          <p data-reveal className="eyebrow text-ink-soft">
            <span className="mr-3 text-amber-deep">06</span>Philosophy
          </p>
          <h2 id="philosophy-teaser-title" data-reveal className="display mt-6 text-h3 text-balance">
            Scent is the most invisible of our senses, and the most faithful.
          </h2>
          <p data-reveal className="mt-6 text-ink-soft">
            A fragrance can return a room, a season, a person, long after the details have faded. We make scents
            for those moments: present, unseen, remembered.
          </p>
          <div data-reveal className="mt-8">
            <ArrowLink href="/philosophy" label="Read our philosophy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
