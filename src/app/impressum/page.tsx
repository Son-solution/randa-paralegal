import type { Metadata } from "next";
import LegalDocument, { pStyle } from "@/components/legal/LegalDocument";
import ContactValue from "@/components/ui/ContactValue";
import { routes } from "@/config/navigation";
import { site } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

// Draft based on Swiss requirements (Art. 3 Abs. 1 lit. s UWG) – to be legally reviewed before launch.
export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Randa Paralegal Services, Zürich: Angaben zur Anbieterin und Kontakt.",
  alternates: { canonical: routes.impressum },
  openGraph: { ...baseOpenGraph, url: routes.impressum, title: "Impressum" },
};

const pending = <span style={{ color: "#8A6508" }}>[folgt]</span>;

export default function ImpressumPage() {
  return (
    <LegalDocument
      title="Impressum"
      intro={<p style={{ margin: 0 }}>Angaben zur Anbieterin dieser Website.</p>}
      updated="Oktober 2026"
      sections={[
        {
          title: "Verantwortlich für den Inhalt",
          body: (
            <p style={pStyle}>
              {site.owner}
              <br />
              {site.name}
              <br />
              {site.contact.address
                ? site.contact.address.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))
                : <>Adresse: {pending}<br /></>}
              Schweiz
            </p>
          ),
        },
        {
          title: "Kontakt",
          body: (
            <p style={pStyle}>
              E-Mail: <ContactValue kind="email" />
              <br />
              Telefon: <ContactValue kind="phone" />
            </p>
          ),
        },
        {
          title: "Unternehmensangaben",
          body: (
            <p style={pStyle}>
              Rechtsform: Einzelunternehmen
              {site.uid ? <><br />UID: {site.uid}</> : null}
            </p>
          ),
        },
        {
          title: "Haftungsausschluss",
          body: (
            <>
              <p style={pStyle}>Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen. Die Informationen auf dieser Website stellen keine Rechtsberatung dar.</p>
              <p style={pStyle}>Haftungsansprüche wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff auf oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstanden sind, werden ausgeschlossen, soweit gesetzlich zulässig.</p>
            </>
          ),
        },
        {
          title: "Haftung für Links",
          body: <p style={pStyle}>Verweise und Links auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Für deren Inhalte sind ausschliesslich die jeweiligen Betreiber verantwortlich. Der Zugriff und die Nutzung solcher Websites erfolgen auf eigene Gefahr.</p>,
        },
        {
          title: "Urheberrechte",
          body: <p style={pStyle}>Die Texte, das Logo und die Gestaltung dieser Website gehören {site.owner} bzw. {site.name} oder den ausdrücklich genannten Rechteinhabern. Für die Verwendung von Inhalten ist die vorherige schriftliche Zustimmung erforderlich. Abgebildete Personen und Räume sind Symbolbilder.</p>,
        },
      ]}
    />
  );
}
