import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import IntakeForm from "@/components/intake/IntakeForm";
import { baseOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Anfrage & Termin",
  description:
    "Anfrage für administrative Unterstützung, Jugendcoaching oder Dolmetschen in Zürich – Schritt für Schritt, auf Wunsch mit Termin für ein Erstgespräch.",
  alternates: { canonical: "/anfrage" },
  openGraph: { ...baseOpenGraph, url: "/anfrage", title: "Anfrage & Termin" },
};

export default function AnfragePage() {
  return (
    <SiteShell page="intake" showWhatsApp={false}>
      <IntakeForm />
    </SiteShell>
  );
}
