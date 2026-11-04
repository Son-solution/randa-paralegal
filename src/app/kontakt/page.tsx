import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import SiteShell from "@/components/layout/SiteShell";
import LuxuryOrnaments from "@/components/ui/LuxuryOrnaments";
import ContactValue from "@/components/ui/ContactValue";
import CallCta from "@/components/ui/CallCta";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import MapEmbed from "@/components/ui/MapEmbed";
import { routes } from "@/config/navigation";
import { site, whatsappHref } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

// Only confirmed facts: phone, e-mail, WhatsApp and address show "[folgt]" until set in src/config/site.ts.
// Anfahrt and the Google Maps links come from the client briefing.
export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt zu Randa Paralegal Services in Zürich: Online-Anfrage mit Terminwahl, Telefon, E-Mail und WhatsApp. Termine online über Google Meet oder persönlich in Zürich und Umgebung.",
  alternates: { canonical: routes.contact },
  openGraph: { ...baseOpenGraph, url: routes.contact, title: "Kontakt" },
};

const subStyle = { margin: "0 0 6px", fontSize: "16px", fontWeight: 600, color: "#163A5F" } as const;
const textStyle = { margin: 0, fontSize: "15.5px", color: "#2B3644" } as const;

export default function ContactPage() {
  const address = site.contact.address;
  const waHref = whatsappHref();
  const routeHref = address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.join(", "))}` : null;
  return (
    <SiteShell page="contact">
      <main>
        <section className="lux-host" aria-labelledby="page-title" style={{ padding: "clamp(36px, 5vw, 56px) 0 clamp(80px, 10vw, 130px)" }}>
          <LuxuryOrnaments />
          <div className="wrap">
            <nav aria-label="Brotkrümelnavigation" style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}>
              <ol className="crumb">
                <li>
                  <Link href="/">Startseite</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: "#163A5F" }}>Kontakt</li>
              </ol>
            </nav>
            <div className="split">
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                <div className="in eyebrow" style={{ "--d": ".05s", color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" } as CSSProperties}><span className="hair" aria-hidden="true" style={{ "--d": ".15s", display: "inline-block", width: "40px", height: "1px", background: "#D4A017" } as CSSProperties}></span>Kontakt</div>
                <h1 id="page-title" className="in serif" style={{ "--d": ".15s", margin: "0", fontSize: "clamp(44px, 5.6vw, 78px)", lineHeight: "1.02", fontWeight: "500", color: "#163A5F" } as CSSProperties}>So erreichen Sie <span style={{ fontStyle: "italic", color: "#0E1A28" }}>mich.</span></h1>
                <p className="in" style={{ "--d": ".3s", margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em" } as CSSProperties}>Beschreiben Sie Ihr Anliegen in der Online-Anfrage – auf Wunsch direkt mit Terminwahl. Oder kontaktieren Sie mich per Telefon, E-Mail oder WhatsApp.</p>
                <div className="in" style={{ "--d": ".4s", display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "6px" } as CSSProperties}>
                  <Link className="btn btn-navy" href={routes.intake} aria-describedby={site.showDemoNotices ? "contact-proto" : undefined}>Jetzt Erstgespräch vereinbaren <span className="arr" aria-hidden="true">→</span></Link>
                  <CallCta className="btn btn-line" describedBy={site.showDemoNotices ? "contact-proto" : undefined} />
                  <WhatsAppCta className="btn btn-line" describedBy={site.showDemoNotices ? "contact-proto" : undefined} />
                </div>
                {site.showDemoNotices ? (
                  <p id="contact-proto" style={{ margin: "0", fontSize: "12px", color: "#4A5563" }}>Prototyp: Das Anfrageformular ist eine Demo ohne Datenübermittlung.</p>
                ) : null}
              </div>
              <div className="in" style={{ "--d": ".45s" } as CSSProperties}>
                <dl style={{ margin: "0", borderTop: "1px solid #D9CFBB" }}>
                  <div className="kv">
                    <dt>Telefon</dt>
                    <dd><ContactValue kind="phone" /></dd>
                  </div>
                  <div className="kv">
                    <dt>E-Mail</dt>
                    <dd><ContactValue kind="email" /></dd>
                  </div>
                  <div className="kv">
                    <dt>WhatsApp</dt>
                    <dd>{waHref ? <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ color: "#8A6508" }}>{site.contact.whatsapp}</a> : <span style={{ color: "#8A6508" }}>[folgt]</span>}</dd>
                  </div>
                  <div className="kv">
                    <dt>Sprachen</dt>
                    <dd>{site.languages.join(" · ")}</dd>
                  </div>
                  <div className="kv">
                    <dt>Termine</dt>
                    <dd>Online über Google Meet oder persönlich in Zürich und Umgebung. Den genauen Treffpunkt vereinbaren wir individuell nach Ihrer Anfrage.</dd>
                  </div>
                  <div className="kv">
                    <dt>Preise</dt>
                    <dd>Nach Absprache. Kostenfreie Absage bis 24 Stunden vor dem Termin – siehe <Link href={`${routes.legal}#stornierung`} style={{ color: "#8A6508" }}>AGB</Link>.</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="standort-title" style={{ background: "#F3EEE4", padding: "clamp(72px, 9vw, 120px) 0", borderTop: "1px solid #E4DCCB" }}>
          <div className="wrap split" style={{ alignItems: "start" }}>
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Standort</div>
              <h2 id="standort-title" className="serif" style={{ margin: "0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>{site.region}</h2>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <h3 style={subStyle}>Adresse</h3>
                <p style={textStyle}>{address ? address.map((line, i) => <Fragment key={line}>{i > 0 ? <br /> : null}{line}</Fragment>) : <span style={{ color: "#8A6508" }}>[Adresse folgt]</span>}</p>
              </div>
              {address && routeHref ? (
                <>
                  <div>
                    <a className="btn btn-navy" href={routeHref} target="_blank" rel="noopener noreferrer" style={{ whiteSpace: "normal", textAlign: "center" }}>Route auf Google Maps planen <span className="arr" aria-hidden="true">→</span></a>
                  </div>
                  <MapEmbed query={address.join(", ")} />
                </>
              ) : null}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <h3 style={{ ...subStyle, margin: 0 }}>Anfahrt</h3>
                <div>
                  <h4 style={{ ...subStyle, fontSize: "15px" }}>Öffentlicher Verkehr (ÖV)</h4>
                  <p style={textStyle}>S-Bahn / Tram: Bis Bahnhof Glattbrugg (S9 / S15) oder Haltestelle Glattbrugg, Post (Tram 10 &amp; 12 / Bus 759 &amp; 768). Von dort sind es nur wenige Gehminuten an der Schaffhauserstrasse.</p>
                </div>
                <div>
                  <h4 style={{ ...subStyle, fontSize: "15px" }}>Mit dem Auto</h4>
                  <p style={textStyle}>Gute Anbindung über die Autobahn A51 (Ausfahrt Opfikon/Glattbrugg). Öffentliche Parkplätze (Blaue Zone / gebührenpflichtige Parkplätze) befinden sich in der näheren Umgebung.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
