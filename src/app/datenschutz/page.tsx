import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { listStyle, pStyle } from "@/components/legal/LegalDocument";
import ContactValue from "@/components/ui/ContactValue";
import { routes } from "@/config/navigation";
import { site } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

// Draft based on the Swiss Data Protection Act (DSG, in force since 1.9.2023) – to be legally reviewed before launch.
// Hosting is assumed to be Vercel (see site.ts); update section 3 if the site moves elsewhere.
export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Randa Paralegal Services, Zürich: wie Personendaten bei Anfragen, Terminen und beim Besuch der Website bearbeitet werden.",
  alternates: { canonical: routes.datenschutz },
  openGraph: { ...baseOpenGraph, url: routes.datenschutz, title: "Datenschutzerklärung" },
};

const pending = <span style={{ color: "#8A6508" }}>[folgt]</span>;

export default function DatenschutzPage() {
  return (
    <LegalDocument
      title="Datenschutzerklärung"
      intro={<p style={{ margin: 0 }}>Der vertrauliche Umgang mit Ihren Daten ist für meine Arbeit zentral. Hier erfahren Sie, welche Personendaten ich bearbeite, wofür und welche Rechte Sie haben.</p>}
      updated="Oktober 2026"
      sections={[
        {
          title: "Verantwortliche Stelle",
          body: (
            <>
              <p style={pStyle}>
                Verantwortlich für die Bearbeitung Ihrer Personendaten im Sinne des Schweizer Datenschutzgesetzes (DSG) ist:
              </p>
              <p style={pStyle}>
                {site.owner}, {site.name}
                <br />
                {site.contact.address ? site.contact.address.join(", ") : <>Adresse: {pending}</>}
                <br />
                E-Mail: <ContactValue kind="email" />
              </p>
            </>
          ),
        },
        {
          title: "Welche Daten ich bearbeite",
          body: (
            <>
              <p style={pStyle}>Ich bearbeite nur die Daten, die für Ihr Anliegen nötig sind. Dazu können gehören:</p>
              <ul style={listStyle}>
                <li>Kontaktangaben wie Name, E-Mail-Adresse und Telefonnummer,</li>
                <li>Angaben zu Ihrem Anliegen und gewünschte Termine,</li>
                <li>Dokumente, die Sie mir zur Verfügung stellen (z. B. behördliche Schreiben, Formulare, Bewerbungsunterlagen).</li>
              </ul>
              <p style={pStyle}>Je nach Anliegen können darunter besonders schützenswerte Personendaten sein, etwa Angaben zum Aufenthaltsstatus, zur Gesundheit (z. B. beim Dolmetschen im Spital), zu Sozialhilfe oder zu familiären Angelegenheiten. Diese Daten bearbeite ich mit besonderer Sorgfalt, vertraulich und ausschliesslich für den vereinbarten Zweck.</p>
            </>
          ),
        },
        {
          title: "Besuch der Website und Hosting",
          body: (
            <>
              <p style={pStyle}>Beim Aufruf der Website werden technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browsertyp in Server-Logfiles erfasst. Diese Daten dienen dem sicheren und stabilen Betrieb der Website und werden nicht mit anderen Daten zusammengeführt.</p>
              <p style={pStyle}>Die Website wird bei Vercel Inc. (USA) gehostet. Dabei können Daten in die USA übermittelt werden. Vercel ist unter dem Swiss-U.S. Data Privacy Framework zertifiziert; zusätzlich gelten die Standardvertragsklauseln.</p>
            </>
          ),
        },
        {
          title: "Cookies und Tracking",
          body: (
            <p style={pStyle}>
              Diese Website verwendet keine Cookies und keine Analyse- oder Tracking-Tools. Die Schriftarten werden von unserem eigenen Server geladen. Details finden Sie in der{" "}
              <Link href={routes.cookies} style={{ color: "#8A6508" }}>Cookie-Richtlinie</Link>.
            </p>
          ),
        },
        {
          title: "Anfrage und Kontaktaufnahme",
          body: (
            <>
              <p style={pStyle}>Wenn Sie mich über das Anfrageformular, per E-Mail, Telefon oder WhatsApp kontaktieren, bearbeite ich Ihre Angaben und allfällige Dokumente, um Ihre Anfrage zu beantworten, einen Termin zu vereinbaren und Sie bei Ihrem Anliegen zu unterstützen.</p>
              <p style={pStyle}>Bitte senden Sie nur Unterlagen, die für Ihr Anliegen nötig sind.</p>
            </>
          ),
        },
        {
          title: "WhatsApp und Google Meet",
          body: (
            <>
              <p style={pStyle}>Wenn Sie mich über WhatsApp kontaktieren, werden Ihre Daten auch von WhatsApp (Meta Platforms) bearbeitet, unter Umständen in den USA. Wenn Ihnen das nicht recht ist, wählen Sie bitte E-Mail oder Telefon.</p>
              <p style={pStyle}>Online-Termine finden über Google Meet (Google) statt. Dabei bearbeitet Google technische Verbindungsdaten. Gespräche werden nicht aufgezeichnet.</p>
            </>
          ),
        },
        {
          title: "Weitergabe an Dritte",
          body: <p style={pStyle}>Ich gebe Ihre Daten nicht an Dritte weiter und verkaufe sie nicht. Eine Weitergabe, zum Beispiel an eine Behörde, eine Schule, einen Anwalt oder einen Mediator, erfolgt nur, wenn Sie dies ausdrücklich wünschen oder wenn eine gesetzliche Pflicht besteht.</p>,
        },
        {
          title: "Aufbewahrung",
          body: <p style={pStyle}>Ich bewahre Ihre Daten nur so lange auf, wie es für Ihr Anliegen nötig ist oder gesetzliche Aufbewahrungspflichten es verlangen. Danach werden sie gelöscht oder Ihnen zurückgegeben.</p>,
        },
        {
          title: "Datensicherheit",
          body: <p style={pStyle}>Ich treffe angemessene technische und organisatorische Massnahmen, um Ihre Daten vor Verlust, unbefugtem Zugriff und Missbrauch zu schützen. Die Website wird verschlüsselt (HTTPS) übertragen.</p>,
        },
        {
          title: "Ihre Rechte",
          body: (
            <>
              <p style={pStyle}>Sie haben im Rahmen des DSG insbesondere das Recht:</p>
              <ul style={listStyle}>
                <li>Auskunft über Ihre bearbeiteten Personendaten zu verlangen,</li>
                <li>unrichtige Daten berichtigen zu lassen,</li>
                <li>die Löschung Ihrer Daten zu verlangen,</li>
                <li>Ihre Daten in einem gängigen Format herauszuverlangen,</li>
                <li>einer Bearbeitung zu widersprechen oder eine Einwilligung zu widerrufen.</li>
              </ul>
              <p style={pStyle}>Für Anliegen zum Datenschutz genügt eine E-Mail an <ContactValue kind="email" />. Sie können sich zudem beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) beschweren.</p>
            </>
          ),
        },
        {
          title: "Änderungen",
          body: <p style={pStyle}>Diese Datenschutzerklärung kann angepasst werden, zum Beispiel wenn sich die Website oder meine Abläufe ändern. Es gilt die jeweils hier veröffentlichte Fassung.</p>,
        },
      ]}
    />
  );
}
