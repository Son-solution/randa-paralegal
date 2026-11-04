import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import SiteShell from "@/components/layout/SiteShell";
import LuxuryOrnaments from "@/components/ui/LuxuryOrnaments";
import { routes } from "@/config/navigation";
import { baseOpenGraph } from "@/lib/seo";

// Texts taken verbatim from the client briefing ("Rechtliche Hinweise & AGB (Auszug)" and
// "Ergänzung für die AGB: Zahlung & Terminabsage"), in Swiss spelling.
export const metadata: Metadata = {
  title: "Rechtliche Hinweise & AGB",
  description: "Rechtliche Hinweise und AGB von Randa Paralegal Services in Zürich: Dolmetschen, Coaching, administrative Unterstützung, Zahlungsbedingungen und Terminabsage.",
  alternates: { canonical: routes.legal },
  openGraph: { ...baseOpenGraph, url: routes.legal, title: "Rechtliche Hinweise & AGB" },
};

type Section = { num: string; id?: string; title: string; text?: string; items?: ReactNode[] };

const sections: Section[] = [
  {
    num: "I.",
    title: "Dolmetsch-Dienstleistungen",
    text: "Die Übersetzung/Mundart-Übertragung erfolgt nach bestem Wissen und Gewissen. Die Anbieterin übernimmt keine Haftung für Entscheidungen Dritter oder Folgewirkungen auf Basis der Übersetzung. Eine behördliche/rechtliche Vertretung ist ausgeschlossen.",
  },
  {
    num: "II.",
    title: "Coaching-Dienstleistungen",
    text: "Coaching ist ein unterstützender Prozess und ersetzt keine psychologische, therapeutische oder medizinische Behandlung. Der Erfolg hängt massgeblich von der Eigeninitiative des Teilnehmenden ab.",
  },
  {
    num: "III.",
    title: "Administrative Unterstützung",
    text: "Die Dienstleistung ersetzt keine Anwaltskonsultation und beinhaltet keine Rechtsberatung im Sinne des Gesetzes.",
  },
  {
    num: "IV.",
    id: "zahlung",
    title: "Zahlungsbedingungen",
    items: [
      "Die Preise für die Dienstleistungen werden nach Absprache festgelegt.",
      "Die Bezahlung der Dienstleistungen (Administrative Unterstützung, Coaching oder Dolmetschen) erfolgt – sofern nicht ausdrücklich anders vereinbart – im Voraus per Twint, Banküberweisung oder gemäss Rechnungsstellung direkt nach der erbrachten Leistung.",
      "Bei grösseren Mandaten oder Coachingpaketen kann eine Anzahlung oder Ratenzahlung vereinbart werden. Rechnungen sind innert 14 Tagen ab Rechnungsdatum ohne Abzug zahlbar.",
    ],
  },
  {
    num: "V.",
    id: "stornierung",
    title: "Terminabsage & Stornierungsbedingungen",
    items: [
      "Vereinbarte Termine (egal ob persönlich oder online) sind verbindlich.",
      <><b>Kostenfreie Absage/Verschiebung:</b> Eine Absage oder Umbuchung des Termins ist bis spätestens 24 Stunden vor Terminbeginn kostenlos möglich (per E-Mail oder Telefon).</>,
      <><b>Kurzfristige Absagen:</b> Bei Absagen weniger als 24 Stunden vor dem Termin oder bei Nichterscheinen (No-Show) wird das Honorar für den vereinbarten Termin vollumfänglich in Rechnung gestellt, da die Zeit exklusiv für Sie reserviert war. Ausnahmen gelten in nachweisbaren Notfällen (z. B. plötzlicher Krankheits- oder Unfallfall mit ärztlichem Zeugnis).</>,
      <><b>Absage durch die Anbieterin:</b> Sollte die Anbieterin (Randa Paralegal Services) aus unvorhergesehenen Gründen (z. B. Krankheit) einen Termin absagen müssen, wird dieser so rasch wie möglich nachgeholt. Ein Schadenersatzanspruch ist ausgeschlossen.</>,
    ],
  },
];

export default function LegalPage() {
  return (
    <SiteShell page="legal">
      <main>
        <section className="lux-host" aria-labelledby="page-title" style={{ padding: "clamp(36px, 5vw, 56px) 0 clamp(80px, 10vw, 130px)" }}>
          <LuxuryOrnaments />
          <div className="wrap" style={{ maxWidth: "980px" }}>
            <nav aria-label="Brotkrümelnavigation" style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}>
              <ol className="crumb">
                <li>
                  <Link href="/">Startseite</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: "#163A5F" }}>Rechtliche Hinweise &amp; AGB</li>
              </ol>
            </nav>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div className="in eyebrow" style={{ "--d": ".05s", color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" } as CSSProperties}><span className="hair" aria-hidden="true" style={{ "--d": ".15s", display: "inline-block", width: "40px", height: "1px", background: "#D4A017" } as CSSProperties}></span>Transparenz</div>
              <h1 id="page-title" className="in serif" style={{ "--d": ".15s", margin: "0", fontSize: "clamp(44px, 5.6vw, 76px)", lineHeight: "1.02", fontWeight: "500", color: "#163A5F" } as CSSProperties}>Rechtliche Hinweise &amp; AGB</h1>
              <p className="in" style={{ "--d": ".3s", margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "36em" } as CSSProperties}>Auszug aus den Allgemeinen Geschäftsbedingungen. <span style={{ color: "#8A6508" }}>[Die vollständigen AGB folgen.]</span></p>
            </div>
            <div style={{ marginTop: "clamp(40px, 6vw, 64px)", borderTop: "1px solid #D9CFBB" }}>
              {sections.map((s) => (
                <section key={s.num} id={s.id} className="rv" aria-labelledby={`agb-${s.num}`} style={{ display: "grid", gridTemplateColumns: "56px minmax(0, 1fr)", gap: "8px 20px", padding: "32px 0", borderBottom: "1px solid #D9CFBB", scrollMarginTop: "120px" }}>
                  <span className="serif" aria-hidden="true" style={{ fontSize: "24px", fontStyle: "italic", color: "#8A6508", lineHeight: "1.3" }}>{s.num}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h2 id={`agb-${s.num}`} className="serif" style={{ margin: "0", fontSize: "clamp(26px, 2.6vw, 32px)", fontWeight: "600", lineHeight: "1.2", color: "#163A5F" }}>{s.title}</h2>
                    {s.text ? <p style={{ margin: "0", fontSize: "16px", color: "#2B3644", maxWidth: "40em" }}>{s.text}</p> : null}
                    {s.items ? (
                      <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "16px", color: "#2B3644", maxWidth: "40em", display: "flex", flexDirection: "column", gap: "8px" }}>
                        {s.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "clamp(40px, 5vw, 56px)" }}>
              <Link className="btn btn-navy" href={routes.contact}>Kontakt <span className="arr" aria-hidden="true">→</span></Link>
              <Link className="btn btn-line" href={routes.home}>Zur Startseite</Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
