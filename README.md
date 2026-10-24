# SORA — What remains, unseen.

A creative e-commerce experience for **SORA**, a *fictional* contemporary niche fragrance house.
Portfolio project: products, prices and checkout are demonstrations. No payment is collected and no order is placed.

## Stack

Next.js 16 (App Router, Cache Components, Turbopack) · React 19.3 · TypeScript · Tailwind CSS 4 ·
GSAP 3.15 + ScrollTrigger + SplitText · Lenis · Zustand · React Hook Form + Zod · next/image · Lucide.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm test           # Vitest: quiz scoring and bag store
npx playwright install chromium   # once
npm run test:e2e   # Playwright against a production build, desktop + Pixel 7
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` when deploying so metadata, the sitemap and robots use the real origin.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Cinematic hero, brand intro, pinned fragrance showcase, art of scent, DAWN campaign, discovery teaser, philosophy teaser |
| `/collection` | Editorial header, fragrance-family filter, product grid with quick add |
| `/fragrance/[slug]` | Gallery carousel, size + quantity, add to bag, notes, story, related (statically generated for `dusk`, `dawn`, `ember`) |
| `/philosophy` | Long-form brand story |
| `/discover` | Five-question, rule-based scent consultation |
| `/checkout` | Validated demo checkout and confirmation |
| any other | Custom 404 |

## Structure

```
app/                 routes, layout, global CSS (design tokens in @theme)
components/
  animations/        Reveal, SplitHeading, ImageReveal, Parallax (GSAP, reduced-motion aware)
  cart/              Bag drawer, line item, add-to-bag button
  checkout/          Form, summary, confirmation
  collection/        Product card, filterable browser
  discovery/         Quiz flow, question, result
  home/              Home page sections
  layout/            Header, mobile menu, footer, Lenis, page transition
  product/           Gallery, purchase panel, story, skeleton
  ui/                Picture (next/image wrapper), stepper, links, notices
data/                products, ingredients, quiz, generated image metadata
hooks/               useModalDialog, useNavTheme
lib/                 gsap setup, scroll lock, quiz scoring, checkout schema, formatting
store/               Zustand bag (persisted to localStorage)
types/               Product and cart types
scripts/             generate-image-meta.py (dimensions + blur placeholders)
tests/unit/          Vitest specs
tests/e2e/           Playwright specs (shopping, accessibility, motion)
source-assets/       Original generated images, untouched
```

## Image assets

The supplied images had descriptive names. They were matched by content to the proposed convention and copied
into `public/images` as WebP. Cutouts were trimmed onto a shared transparent canvas so all three bottles align.
The three full-bleed images (04, 05, 18) were upscaled 2× with Lanczos and light sharpening, because the
originals are only 1672 px wide. The untouched originals are kept locally in `source-assets/` (not committed).

| Convention | Source file |
| --- | --- |
| 01-sora-dusk-master.webp | Sora Dusk 01 Perfume Bottle.png |
| 02-sora-dawn-master.webp | SORA Dawn 02 Perfume Bottle.png |
| 03-sora-ember-master.webp | SORA Amber Perfume Bottle0.png |
| 04-sora-dusk-hero.webp | Sora Dusk Perfume on Stone.png |
| 05-sora-dawn-campaign.webp | Sora Dawn Perfume in Golden Light.png |
| 06-sora-dusk-stone.webp | Sora Dusk Perfume Still Life.png |
| 07-sora-dusk-detail.webp | Sora Dusk Perfume Bottle.png |
| 08-sora-dusk-atmosphere.webp | SORA Dusk Perfume Among Wood and Stone.png |
| 09-sora-dawn-stone.webp | Sora Dawn Perfume in Warm Light.png |
| 10-sora-dawn-detail.webp | Sora Dawn Perfume Bottle in Sunlight.png |
| 11-sora-dawn-atmosphere.webp | Sunlit SORA Dawn Perfume Still Life.png |
| 12-sora-ember-resin.webp | Amber SORA Perfume Still Life.png |
| 13-sora-ember-detail.webp | SORA Amber Perfume Bottle.png |
| 14-sora-ember-atmosphere.webp | Amber Smoke Perfume Still Life.png |
| 15-sora-cedar-vetiver.webp | Earthy Wood, Roots, and Stone.png |
| 16-sora-iris-linen.webp | Sunlit Cream Iris on Linen and Stone.png |
| 17-sora-amber-incense.webp | Warm Amber Resin and Incense Still Life.png |
| 18-sora-philosophy.webp | Sunlit Drapery in a Shadowed Space.png |
| 19-sora-dusk-transparent.webp | Sora Dusk 01 Perfume Bottle โปร่งใส.png |
| 20-sora-dawn-transparent.webp | SORA Dawn 02 Perfume Bottle โปร่งใส.png |
| 21-sora-ember-transparent.webp | Luxury Amber Perfume Bottle โปร่งใส.png |

After changing images, regenerate metadata: `python3 scripts/generate-image-meta.py`.

## Notes

- Scent discovery is a deterministic points system (see `lib/quiz.ts`); ties are settled by the "material" answer.
- Bag prices are always resolved from `data/products.ts`; stored lines only hold slug, variant and quantity.
- Motion respects `prefers-reduced-motion`: Lenis is not started, GSAP effects are skipped, reveal content is visible (covered by `tests/e2e/motion.spec.ts`).
- Product pages use `ensureStatic = "navigation"`: unknown slugs return a real HTTP 404, and the collection
  bottle morphs into the product gallery through a shared `<ViewTransition name>`.
- Favicon and Open Graph text are drawn from Cormorant Garamond glyph outlines, so they do not depend on installed fonts.
