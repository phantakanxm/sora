/** Canonical origin for metadata, sitemap and robots. Set NEXT_PUBLIC_SITE_URL when deploying. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
