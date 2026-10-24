import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Checkout (demo)",
  description: "A demonstration checkout for SORA, a fictional fragrance house. No payment is taken.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <PageTransition>
      <section data-nav-theme="light" className="min-h-[100svh] bg-ivory pt-[calc(var(--spacing-header)+3rem)] pb-section">
        <div className="shell">
          <CheckoutView />
        </div>
      </section>
    </PageTransition>
  );
}
