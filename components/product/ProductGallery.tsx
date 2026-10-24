"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, ViewTransition } from "react";
import { Picture } from "@/components/ui/Picture";
import type { ImageAsset } from "@/types/product";

type ProductGalleryProps = { images: readonly ImageAsset[]; name: string; slug: string; surface: string };

/**
 * Scroll-snap carousel: native swipe on touch, arrow keys when focused,
 * previous/next controls and thumbnails. Position is announced politely.
 */
export function ProductGallery({ images, name, slug, surface }: ProductGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const last = images.length - 1;

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = Math.max(0, Math.min(last, next));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: target * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
    },
    [last],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(Math.round(track.scrollLeft / track.clientWidth)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: last };
    if (event.key in keys) {
      event.preventDefault();
      goTo(keys[event.key]);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${name} images`}
      className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-6"
    >
      <ol className="flex gap-3 lg:flex-col" aria-label="Choose an image">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === index ? "true" : undefined}
              className={`relative block aspect-[4/5] w-14 overflow-hidden transition-opacity duration-500 sm:w-16 ${
                i === index ? "opacity-100" : "opacity-45 hover:opacity-80"
              }`}
              style={{ backgroundColor: surface }}
            >
              <Picture image={image} fill focus sizes="64px" alt="" className="object-cover" />
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px bg-espresso transition-transform duration-500 ${
                  i === index ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          </li>
        ))}
      </ol>

      <div className="relative min-w-0 flex-1 lg:max-w-[calc((100svh-var(--spacing-header)-3rem)*0.8)]">
        <div
          ref={trackRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label="Use the left and right arrow keys to browse images"
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus-visible:outline-offset-[-1px]"
        >
          {images.map((image, i) => {
            const slide = (
              <div
                key={image.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${images.length}`}
                className="relative aspect-[4/5] w-full shrink-0 snap-center snap-always"
                style={{ backgroundColor: surface }}
              >
                <Picture
                  image={image}
                  fill
                  focus
                  quality={85}
                  preload={i === 0}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            );
            // The first slide shares its name with the product card, so the bottle morphs between pages.
            return i === 0 ? (
              <ViewTransition key={image.src} name={`bottle-${slug}`} share="sora-morph" default="none">
                {slide}
              </ViewTransition>
            ) : (
              slide
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p aria-live="polite" className="eyebrow tabular-nums text-ink-soft">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            <span className="sr-only">: {images[index]?.alt}</span>
          </p>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous image"
              className="grid h-11 w-11 place-items-center transition-opacity hover:opacity-60 disabled:opacity-25"
            >
              <ArrowLeft size={16} strokeWidth={1.25} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === last}
              aria-label="Next image"
              className="grid h-11 w-11 place-items-center transition-opacity hover:opacity-60 disabled:opacity-25"
            >
              <ArrowRight size={16} strokeWidth={1.25} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
