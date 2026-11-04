import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { listStyle, pStyle } from "@/components/legal/LegalDocument";
import { routes } from "@/config/navigation";
import { baseOpenGraph } from "@/lib/seo";

// Reflects the current build: Google Analytics only after consent (src/components/consent),
// the choice itself in localStorage, fonts self-hosted, no other cookies or tracking.
export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description: "Cookie-Richtlinie von Randa Paralegal Services: Google Analytics nur mit Ihrer Einwilligung, keine Werbe-Cookies.",
  alternates: { canonical: routes.cookies },
  openGraph: { ...baseOpenGraph, url: routes.cookies, title: "Cookie-Richtlinie" },
};

export default function CookiePage() {
  return (
    <LegalDocument
      title="Cookie-Richtlinie"
      intro={<p style={{ margin: 0 }}>Kurz gesagt: Cookies werden nur gesetzt, wenn Sie Google Analytics zustimmen. Ohne Ihre Zustimmung verfolgt diese Website Ihr Verhalten nicht.</p>}
      updated="November 2026"
      sections={[
        {
          title: "Was sind Cookies?",
          body: <p style={pStyle}>Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät gespeichert werden. Sie können zum Beispiel Einstellungen speichern oder das Nutzungsverhalten auswerten.</p>,
        },
        {
          title: "Google Analytics (nur mit Einwilligung)",
          body: (
            <>
              <p style={pStyle}>Wenn Sie im Cookie-Hinweis «Akzeptieren» wählen, verwende ich Google Analytics 4 der Google Ireland Limited (Irland) bzw. Google LLC (USA). Damit erhalte ich Statistiken darüber, welche Seiten besucht werden, wie Besucherinnen und Besucher auf die Website gelangen und welche Geräte sie nutzen. Dabei werden folgende Cookies gesetzt:</p>
              <ul style={listStyle}>
                <li><b>_ga</b> – unterscheidet Besucherinnen und Besucher, Speicherdauer bis zu 2 Jahre,</li>
                <li><b>_ga_K3SSXVV1JJ</b> – speichert den Sitzungsstatus, Speicherdauer bis zu 2 Jahre.</li>
              </ul>
              <p style={pStyle}>Google kürzt die IP-Adresse; Daten können dennoch in die USA übermittelt werden. Wählen Sie «Ablehnen» oder treffen Sie keine Wahl, wird Google Analytics nicht geladen und es werden keine Daten an Google gesendet.</p>
            </>
          ),
        },
        {
          title: "Ihre Auswahl speichern",
          body: <p style={pStyle}>Damit der Hinweis nicht bei jedem Besuch erscheint, wird Ihre Entscheidung («akzeptiert» oder «abgelehnt») im lokalen Speicher Ihres Browsers abgelegt. Dieser Eintrag enthält keine persönlichen Daten und wird nicht an mich oder Dritte übertragen.</p>,
        },
        {
          title: "Einwilligung ändern oder widerrufen",
          body: <p style={pStyle}>Über den Link «Cookie-Einstellungen» in der Fusszeile jeder Seite können Sie Ihre Entscheidung jederzeit ändern. Beim Widerruf werden die Google-Analytics-Cookies gelöscht.</p>,
        },
        {
          title: "Keine weiteren Cookies",
          body: (
            <>
              <p style={pStyle}>Darüber hinaus setzt diese Website ein:</p>
              <ul style={listStyle}>
                <li>keine Werbe- oder Marketing-Cookies,</li>
                <li>keine Social-Media-Plugins, die beim Seitenaufruf Daten übertragen.</li>
              </ul>
              <p style={pStyle}>Die verwendeten Schriftarten werden direkt von unserem Server geladen, nicht von externen Anbietern.</p>
            </>
          ),
        },
        {
          title: "Externe Dienste",
          body: <p style={pStyle}>Wenn Sie einen Link zu einem externen Dienst anklicken, zum Beispiel Google Meet, verlassen Sie diese Website. Für die dort eingesetzten Cookies gelten die Datenschutz- und Cookie-Bestimmungen des jeweiligen Anbieters.</p>,
        },
        {
          title: "Cookies im Browser verwalten",
          body: <p style={pStyle}>Sie können in den Einstellungen Ihres Browsers zudem jederzeit festlegen, ob Cookies gespeichert werden dürfen, und bereits gespeicherte Cookies löschen.</p>,
        },
        {
          title: "Änderungen",
          body: (
            <p style={pStyle}>
              Sollten wir weitere Cookies einsetzen, passen wir diese Richtlinie an und holen – soweit erforderlich – vorher Ihre Einwilligung ein. Weitere Informationen finden Sie in der{" "}
              <Link href={routes.datenschutz} style={{ color: "#8A6508" }}>Datenschutzerklärung</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
