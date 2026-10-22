import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import SiteShell from "@/components/layout/SiteShell";
import ContactValue from "@/components/ui/ContactValue";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { routes } from "@/config/navigation";
import { site, whatsappHref } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

// Only confirmed facts: phone, e-mail, WhatsApp and address show "[folgt]" until set in src/config/site.ts.
export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt zu Randa Paralegal Services in Zürich: Online-Anfrage mit Terminwahl, Telefon, E-Mail und WhatsApp. Termine online über Google Meet oder persönlich in Zürich und Umgebung.",
  alternates: { canonical: routes.contact },
  openGraph: { ...baseOpenGraph, url: routes.contact, title: "Kontakt" },
};

export default function ContactPage() {
  return (
    <SiteShell page="contact">
      <main>
        <section aria-labelledby="page-title" style={{ padding: "clamp(36px, 5vw, 56px) 0 clamp(80px, 10vw, 130px)" }}>
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
                  <Link className="btn btn-navy" href={routes.intake} aria-describedby={site.demoMode ? "contact-proto" : undefined}>Jetzt Erstgespräch vereinbaren <span className="arr" aria-hidden="true">→</span></Link>
                  <WhatsAppCta className="btn btn-line" describedBy={site.demoMode ? "contact-proto" : undefined} />
                </div>
                {site.demoMode ? (
                  <p id="contact-proto" style={{ margin: "0", fontSize: "12px", color: "#4A5563" }}>Prototyp: Das Anfrageformular ist eine Demo ohne Datenübermittlung; WhatsApp wird später verbunden.</p>
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
                    <dd>{whatsappHref() ? <a href={whatsappHref() ?? undefined} target="_blank" rel="noopener noreferrer">{site.contact.whatsapp}</a> : <span style={{ color: "#8A6508" }}>[folgt]</span>}</dd>
                  </div>
                  <div className="kv">
                    <dt>Sprachen</dt>
                    <dd>{site.languages.join(" · ")}</dd>
                  </div>
                  <div className="kv">
                    <dt>Termine</dt>
                    <dd>Online über Google Meet oder persönlich in Zürich und Umgebung. Den genauen Treffpunkt vereinbaren wir individuell nach Ihrer Anfrage.</dd>
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
                <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 600, color: "#163A5F" }}>Adresse</h3>
                <p style={{ margin: 0, fontSize: "15.5px", color: "#2B3644" }}><span style={{ color: "#8A6508" }}>[Adresse folgt]</span></p>
              </div>
              <div>
                <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 600, color: "#163A5F" }}>Anfahrt</h3>
                <p style={{ margin: 0, fontSize: "15.5px", color: "#2B3644" }}><span style={{ color: "#8A6508" }}>[Anfahrtsbeschreibung folgt]</span></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
