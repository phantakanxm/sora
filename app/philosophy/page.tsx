import type { Metadata } from "next";
import Link from "next/link";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { philosophyImage } from "@/components/home/PhilosophyTeaser";
import { PageTransition } from "@/components/layout/PageTransition";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Picture } from "@/components/ui/Picture";
import { ingredients } from "@/data/ingredients";
import { getFragranceOrThrow } from "@/data/products";

export const metadata: Metadata = {
  title: "Philosophy",
  description: "Scent, memory and invisible presence: the quiet principles behind SORA.",
};

const principles = [
  {
    title: "Restraint",
    text: "We remove until only what matters remains. A SORA fragrance is built from a handful of materials, never a crowd.",
  },
  {
    title: "Material honesty",
    text: "Woods, resins and petals are chosen for character, not fashion. Each is allowed to sound like itself.",
  },
  {
    title: "Time",
    text: "A scent unfolds over hours. We compose for the whole arc: the first breath, the long middle, and what is left behind.",
  },
];

const dusk = getFragranceOrThrow("dusk");
const ember = getFragranceOrThrow("ember");
const iris = ingredients.find((i) => i.id === "iris-linen") ?? ingredients[0];

export default function PhilosophyPage() {
  return (
    <PageTransition>
      <section
        data-nav-theme="dark"
        aria-labelledby="philosophy-title"
        className="relative flex min-h-[100svh] items-end overflow-hidden bg-obsidian text-ivory"
      >
        <Parallax amount={8} className="absolute -inset-y-[5%] inset-x-0">
          <Picture image={philosophyImage} fill preload quality={85} sizes="100vw" className="object-cover object-[30%_50%]" />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(21_19_17/0.9),rgb(21_19_17/0.2)_55%,transparent)] md:bg-[linear-gradient(to_left,rgb(21_19_17/0.85),rgb(21_19_17/0.15)_55%,transparent)]"
        />
        <div className="shell relative grid pb-[12svh] md:grid-cols-12 md:pb-0 md:self-center">
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={0.2}>
              <p data-reveal className="eyebrow text-sand">
                Philosophy
              </p>
            </Reveal>
            <SplitHeading as="h1" id="philosophy-title" immediate delay={0.35} className="display mt-8 text-h1">
              The art of what remains.
            </SplitHeading>
            <Reveal delay={0.9}>
              <p data-reveal className="mt-8 max-w-sm text-lead text-sand">
                Scent, memory, and the invisible presence we leave behind.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" aria-labelledby="memory-title" className="bg-ivory py-section">
        <div className="shell grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p data-reveal className="eyebrow text-ink-soft">
              <span className="mr-3 text-amber-deep">I</span>Memory
            </p>
          </Reveal>
          <div className="md:col-span-8 md:col-start-5">
            <SplitHeading id="memory-title" className="display text-h2 text-balance">
              A scent is a room you can return to.
            </SplitHeading>
            <Reveal className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12" stagger={0.15}>
              <p data-reveal className="text-lead">
                Of all the senses, smell travels closest to memory. A trace of cedar can return a winter; a breath of
                iris, a morning you thought was gone.
              </p>
              <p data-reveal className="text-ink-soft">
                SORA, meaning sky, began with that idea: that the most lasting things are often the ones we cannot
                see. We make fragrances for those moments: present, unseen, remembered long after the details fade.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" aria-label="Materials" className="bg-ivory pb-section">
        <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
          <ImageReveal className="relative md:col-span-5">
            <div className="relative aspect-[4/5]">
              <Picture image={iris.image} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          </ImageReveal>
          <div className="flex flex-col justify-between gap-10 md:col-span-6 md:col-start-7">
            <ImageReveal from="right" className="relative">
              <div className="relative aspect-[3/2]">
                <Picture image={dusk.images.gallery[2]} fill focus sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            </ImageReveal>
            <Reveal>
              <blockquote data-reveal className="display max-w-md text-h3 italic text-espresso/90">
                “We compose fragrances the way light falls into a room: slowly, and leaving more than it shows.”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-nav-theme="dark" aria-labelledby="principles-title" className="bg-obsidian py-section text-ivory">
        <div className="shell">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <p data-reveal className="eyebrow text-sand/75">
                <span className="mr-3 text-amber">II</span>Principles
              </p>
            </Reveal>
            <SplitHeading id="principles-title" className="display text-h2 md:col-span-8 md:col-start-5">
              Three quiet rules.
            </SplitHeading>
          </div>
          <Reveal as="ol" className="mt-20 md:mt-28" stagger={0.14}>
            {principles.map((principle, i) => (
              <li
                key={principle.title}
                data-reveal
                className="grid gap-4 border-t border-line-dark py-10 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="eyebrow text-sand/75 md:col-span-1">0{i + 1}</span>
                <h3 className="display text-h3 md:col-span-4 md:col-start-2">{principle.title}</h3>
                <p className="max-w-lg text-sand/85 md:col-span-6 md:col-start-7">{principle.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        data-nav-theme="dark"
        aria-labelledby="presence-title"
        className="relative overflow-hidden bg-espresso text-ivory"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[90svh]">
            <Picture image={ember.images.atmosphere} fill focus sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="shell flex flex-col justify-center py-section lg:px-[clamp(3rem,6vw,8rem)]">
            <Reveal>
              <p data-reveal className="eyebrow text-sand/75">
                <span className="mr-3 text-sand">III</span>Presence
              </p>
            </Reveal>
            <SplitHeading id="presence-title" className="display mt-8 text-h2 text-balance">
              Felt in passing. Remembered after.
            </SplitHeading>
            <Reveal stagger={0.12}>
              <p data-reveal className="mt-8 max-w-md text-sand/85">
                We do not make fragrances to announce you. We make them to stay with you, close to the skin, and
                with whoever stood near.
              </p>
              <div data-reveal className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
                <Link href="/collection" className="btn btn-light">
                  Explore the collection
                </Link>
                <Link href="/discover" className="eyebrow link-line self-center text-sand">
                  Find your scent
                </Link>
              </div>
              <DemoNotice className="mt-14 max-w-md text-sand/80">
                SORA is a fictional house created for a frontend portfolio. The brand story is written for this
                demonstration.
              </DemoNotice>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
