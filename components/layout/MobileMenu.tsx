"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useModalDialog } from "@/hooks/useModalDialog";
import { useCart } from "@/store/cart";
import { navigation } from "./navigation";

type MobileMenuProps = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { dialogRef, visible, onCancel, onNativeClose } = useModalDialog(open, onClose);
  const openBag = useCart((s) => s.open);
  const links = [{ href: "/", label: "Home" }, ...navigation];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Menu"
      onCancel={onCancel}
      onClose={onNativeClose}
      className="sora-dialog text-ivory"
    >
      <div
        className={`flex h-full flex-col bg-obsidian transition-opacity duration-500 ease-silk ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="shell flex h-header items-center justify-between">
          <span className="display text-[1.65rem] leading-none tracking-[0.42em]" aria-hidden>
            SORA
          </span>
          <button
            type="button"
            onClick={onClose}
            className="eyebrow flex min-h-11 items-center gap-2 px-2"
            aria-label="Close menu"
          >
            Close <X size={16} strokeWidth={1.25} aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
          <ul className="space-y-3">
            {links.map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-700 ease-silk ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: visible ? `${120 + i * 70}ms` : "0ms" }}
              >
                <Link href={item.href} onNavigate={onClose} className="display flex items-baseline gap-4 text-h2">
                  <span className="eyebrow text-sand/70">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shell flex items-center justify-between border-t border-line-dark py-6">
          <button
            type="button"
            className="eyebrow min-h-11"
            onClick={() => {
              onClose();
              window.setTimeout(openBag, 560);
            }}
          >
            Open bag
          </button>
          <p className="eyebrow text-sand/70">Portfolio demo</p>
        </div>
      </div>
    </dialog>
  );
}
