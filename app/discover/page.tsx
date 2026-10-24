import type { Metadata } from "next";
import { ScentQuiz } from "@/components/discovery/ScentQuiz";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Discover your scent",
  description: "A short, rule-based fragrance consultation that maps your answers to DUSK, DAWN or EMBER.",
};

export default function DiscoverPage() {
  return (
    <PageTransition>
      <section data-nav-theme="light" className="min-h-[100svh] bg-ivory pt-[calc(var(--spacing-header)+2rem)] pb-section">
        <div className="shell">
          <ScentQuiz />
        </div>
      </section>
    </PageTransition>
  );
}
