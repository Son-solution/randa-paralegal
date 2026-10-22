import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

// Fonts are self-hosted (no requests to Google servers – privacy friendly).
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "./globals.css";

import { site } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Randa Paralegal Services – Administrative Unterstützung, Jugendcoaching & Dolmetschen in Zürich",
    template: "%s | Randa Paralegal Services Zürich",
  },
  description:
    "Administrative Unterstützung, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch in Zürich und Umgebung – verständlich, nahbar und strukturiert. Keine Rechtsberatung.",
  applicationName: site.name,
  authors: [{ name: site.owner }],
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: baseOpenGraph,
  twitter: { card: "summary_large_image" },
  // While the site is a prototype, search engines are asked not to index it (see `site.allowIndexing`).
  robots: site.allowIndexing ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de-CH">
      <body>{children}</body>
    </html>
  );
}
