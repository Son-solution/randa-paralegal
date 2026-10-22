import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * Open Graph defaults shared by every page.
 *
 * Next.js does not merge `openGraph` from the layout into a page: a page that sets
 * its own `openGraph` (for url/title/description) replaces it completely. Every
 * page therefore spreads these defaults, so the share image, site name and locale
 * are never lost.
 */
export const baseOpenGraph = {
  type: "website",
  locale: "de_CH",
  siteName: site.name,
  images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Randa Paralegal Services, Zürich (Symbolbild)" }],
} satisfies NonNullable<Metadata["openGraph"]>;
