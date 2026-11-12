import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import HomeContent from "@/components/home/HomeContent";
import JsonLd from "@/components/seo/JsonLd";
import { baseOpenGraph } from "@/lib/seo";

// Content ported 1:1 from the approved prototype (Main).
export const metadata: Metadata = {
  description: "Administrative Unterstützung, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch in Zürich und Umgebung – verständlich, nahbar und strukturiert. Keine Rechtsberatung.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    ...baseOpenGraph,
    url: "/",
    description: "Administrative Unterstützung, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch in Zürich und Umgebung – verständlich, nahbar und strukturiert. Keine Rechtsberatung."
  }
};

export default function HomePage() {
  return (
    <SiteShell page="home">
      <JsonLd page="home" />
      <HomeContent />
    </SiteShell>
  );
}
