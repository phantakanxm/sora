import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { BagToast } from "@/components/cart/BagToast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SORA — What remains, unseen.",
    template: "%s — SORA",
  },
  description:
    "SORA is a fictional contemporary niche fragrance house: a quiet expression of scent, memory and emotion. A creative frontend portfolio project.",
  applicationName: "SORA",
  metadataBase: new URL(siteUrl),
  openGraph: { type: "website", siteName: "SORA", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#151311",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint so reveal targets can start hidden without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="eyebrow fixed top-3 left-3 z-[100] flex min-h-11 -translate-y-24 items-center bg-ivory px-4 text-espresso focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <BagToast />
      </body>
    </html>
  );
}
