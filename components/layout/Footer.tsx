import Link from "next/link";
import { fragrances } from "@/data/products";
import { NewsletterForm } from "./NewsletterForm";
import { navigation } from "./navigation";

export function Footer() {
  return (
    <footer data-nav-theme="dark" className="bg-obsidian text-ivory">
      <div className="shell grid gap-16 pt-28 pb-12 md:grid-cols-12 md:gap-8 md:pt-36">
        <div className="md:col-span-5">
          <p className="display text-h3 max-w-sm text-balance">What remains, unseen.</p>
          <div className="mt-12">
            <NewsletterForm />
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:col-span-4 md:col-start-7">
          <div>
            <h2 className="eyebrow text-sand/75">Explore</h2>
            <ul className="mt-5 space-y-3">
              {[{ href: "/", label: "Home" }, ...navigation, { href: "/checkout", label: "Checkout" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line link-quiet min-h-8 text-ui">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-sand/75">Fragrances</h2>
            <ul className="mt-5 space-y-3">
              {fragrances.map((f) => (
                <li key={f.slug}>
                  <Link href={`/fragrance/${f.slug}`} className="link-line link-quiet min-h-8 text-ui">
                    {f.name} <span className="text-sand/75">/ {f.number}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="md:col-span-2 md:col-start-11">
          <h2 className="eyebrow text-sand/75">About this site</h2>
          <p className="mt-5 text-ui leading-relaxed text-sand/80">
            SORA is a fictional fragrance house, created as a creative frontend portfolio project. Products, prices
            and checkout are demonstrations. No orders are placed, and there are no social channels to follow.
          </p>
        </div>
      </div>

      <div className="shell overflow-hidden">
        {/* Decorative wordmark drawn with a pseudo-element so it is not read or audited as text */}
        <div
          aria-hidden
          className="display select-none text-mega tracking-[0.18em] text-sand/[0.09] -mb-[0.06em] before:content-['SORA']"
        />
      </div>
      <div className="shell flex flex-col gap-2 border-t border-line-dark py-6 text-[0.7rem] tracking-[0.12em] text-sand/75 uppercase sm:flex-row sm:justify-between">
        <p>© 2026 SORA — Portfolio demonstration</p>
        <p>Imagery generated for this project</p>
      </div>
    </footer>
  );
}
