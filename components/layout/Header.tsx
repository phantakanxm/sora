"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useNavTheme } from "@/hooks/useNavTheme";
import { selectCount, useCart } from "@/store/cart";
import { MobileMenu } from "./MobileMenu";
import { navigation } from "./navigation";

export function Header() {
  const pathname = usePathname();
  const { theme, scrolled } = useNavTheme();
  const count = useCart(selectCount);
  const hydrated = useCart((s) => s.hasHydrated);
  const openBag = useCart((s) => s.open);
  const [menuOpen, setMenuOpen] = useState(false);

  const onDark = theme === "dark";
  const surface = scrolled
    ? onDark
      ? "bg-obsidian/92 border-line-dark"
      : "bg-ivory/94 border-line"
    : "bg-transparent border-transparent";

  return (
    <>
      <header
        data-site-header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-700 ease-silk ${surface} ${
          onDark ? "text-ivory" : "text-espresso"
        }`}
      >
        <div className="shell flex h-header items-center justify-between gap-6">
          <Link href="/" className="display flex min-h-11 items-center text-[1.65rem] leading-none tracking-[0.42em]" aria-label="SORA, home">
            SORA
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {navigation.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="eyebrow group relative inline-flex min-h-11 items-center gap-2"
                    >
                      <span
                        aria-hidden
                        className={`h-1 w-1 rounded-full bg-current transition-opacity duration-500 ${
                          active ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                        }`}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-0">
            <button
              type="button"
              onClick={openBag}
              aria-haspopup="dialog"
              className="eyebrow flex min-h-11 items-center gap-2 px-2 transition-opacity hover:opacity-60"
            >
              <span>Bag</span>
              <span
                key={hydrated ? count : "pending"}
                className={`inline-grid h-6 min-w-6 place-items-center rounded-full border border-current px-1.5 text-[0.65rem] tabular-nums tracking-normal ${
                  hydrated && count > 0 ? "animate-[badge-bump_700ms_var(--ease-silk)]" : ""
                }`}
              >
                {hydrated ? count : 0}
              </span>
              {/* Accessible name reads "Bag 2 items", starting with the visible text */}
              <span className="sr-only">{count === 1 ? "item" : "items"}</span>
            </button>
            <button
              type="button"
              className="eyebrow flex min-h-11 items-center px-2 md:hidden"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
