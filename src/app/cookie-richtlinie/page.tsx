import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { listStyle, pStyle } from "@/components/legal/LegalDocument";
import { routes } from "@/config/navigation";
import { baseOpenGraph } from "@/lib/seo";

// Reflects the current build: no cookies, no analytics, fonts self-hosted, no localStorage.
// Update this page (and add a consent banner) before introducing any cookies or tracking.
export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description: "Cookie-Richtlinie von Randa Paralegal Services: Diese Website verwendet keine Cookies und keine Tracking-Tools.",
  alternates: { canonical: routes.cookies },
  openGraph: { ...baseOpenGraph, url: routes.cookies, title: "Cookie-Richtlinie" },
};

export default function CookiePage() {
  return (
    <LegalDocument
      title="Cookie-Richtlinie"
      intro={<p style={{ margin: 0 }}>Kurz gesagt: Diese Website setzt keine Cookies und verfolgt Ihr Verhalten nicht.</p>}
      updated="Oktober 2026"
      sections={[
        {
          title: "Was sind Cookies?",
          body: <p style={pStyle}>Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät gespeichert werden. Sie können zum Beispiel Einstellungen speichern oder das Nutzungsverhalten auswerten.</p>,
        },
        {
          title: "Cookies auf dieser Website",
          body: (
            <>
              <p style={pStyle}>Diese Website verwendet derzeit keine Cookies. Insbesondere setzen wir ein:</p>
              <ul style={listStyle}>
                <li>keine Analyse- oder Statistik-Tools (z. B. Google Analytics),</li>
                <li>keine Werbe- oder Marketing-Cookies,</li>
                <li>keine Social-Media-Plugins, die beim Seitenaufruf Daten übertragen.</li>
              </ul>
              <p style={pStyle}>Die verwendeten Schriftarten werden direkt von unserem Server geladen, nicht von externen Anbietern. Deshalb ist auch kein Cookie-Banner nötig.</p>
            </>
          ),
        },
        {
          title: "Externe Dienste",
          body: <p style={pStyle}>Wenn Sie einen Link zu einem externen Dienst anklicken, zum Beispiel WhatsApp oder Google Meet, verlassen Sie diese Website. Für die dort eingesetzten Cookies gelten die Datenschutz- und Cookie-Bestimmungen des jeweiligen Anbieters.</p>,
        },
        {
          title: "Cookies im Browser verwalten",
          body: <p style={pStyle}>Sie können in den Einstellungen Ihres Browsers jederzeit festlegen, ob Cookies gespeichert werden dürfen, und bereits gespeicherte Cookies löschen.</p>,
        },
        {
          title: "Änderungen",
          body: (
            <p style={pStyle}>
              Sollten wir künftig Cookies einsetzen, passen wir diese Richtlinie an und holen – soweit erforderlich – vorher Ihre Einwilligung ein. Weitere Informationen finden Sie in der{" "}
              <Link href={routes.datenschutz} style={{ color: "#8A6508" }}>Datenschutzerklärung</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
