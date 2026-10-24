import Link from "next/link";
import { Picture } from "@/components/ui/Picture";
import { asset } from "@/lib/images";

const smoke = asset("08-sora-dusk-atmosphere.webp", "", "63% 50%");

export default function NotFound() {
  return (
    <section
      data-nav-theme="dark"
      aria-labelledby="not-found-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-obsidian text-ivory"
    >
      <div className="absolute inset-0 opacity-35">
        <Picture image={smoke} fill focus alt="" sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgb(21_19_17/0.95),rgb(21_19_17/0.4))]" />
      <div className="shell relative py-section">
        <p className="eyebrow text-sand">Error 404</p>
        <h1 id="not-found-title" className="display mt-8 max-w-3xl text-h1 text-balance">
          Some things remain unseen.
        </h1>
        <p className="mt-8 max-w-md text-lead text-sand">
          This page has drifted away like the last note of a fragrance. Let us guide you back.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/collection" className="btn btn-light">
            Explore the collection
          </Link>
          <Link href="/" className="eyebrow link-line text-sand">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
