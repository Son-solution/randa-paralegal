import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import SiteShell from "@/components/layout/SiteShell";
import LuxuryOrnaments from "@/components/ui/LuxuryOrnaments";
import ServiceIllustration from "@/components/ui/ServiceIllustration";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { site } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

// Content ported 1:1 from the approved prototype (Administrative-Unterstuetzung).
export const metadata: Metadata = {
  description: "Hilfe bei Formularen, Anträgen, behördlichen Briefen und Schriftverkehr in Zürich – administrative und organisatorische Unterstützung, ohne Rechtsberatung.",
  alternates: {
    canonical: "/administrative-unterstuetzung"
  },
  openGraph: {
    ...baseOpenGraph,
    url: "/administrative-unterstuetzung",
    description: "Hilfe bei Formularen, Anträgen, behördlichen Briefen und Schriftverkehr in Zürich – administrative und organisatorische Unterstützung, ohne Rechtsberatung.",
    title: "Administrative Unterstützung in Zürich"
  },
  title: "Administrative Unterstützung in Zürich"
};

export default function AdminPage() {
  return (
    <SiteShell page="admin">
      <main>
        <section className="lux-host" aria-labelledby="page-title" style={{ padding: "clamp(28px, 4vw, 44px) 0 clamp(72px, 9vw, 120px)" }}>
          <LuxuryOrnaments />
          <div className="wrap">
            <nav aria-label="Brotkrümelnavigation" style={{ marginBottom: "24px" }}>
              <ol className="crumb">
                <li>
                  <Link href="/">Startseite</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#leistungen">Leistungen</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: "#163A5F" }}>Administrative Unterstützung</li>
              </ol>
            </nav>
            <div className="unveil heroimg" style={{ position: "relative", overflow: "hidden", aspectRatio: "21 / 8.5", background: "#E8E1D2" }}>
              <Image src="/images/administrative.jpg" alt="Hände füllen am Schreibtisch ein Formular aus (Symbolbild)" fill sizes="(max-width: 980px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "55% 45%" }} priority />
              {" "}
              <span style={{ position: "absolute", right: "14px", top: "12px", fontSize: "10.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "3px 8px" }}>Symbolbild</span>
            </div>
            <div className="panel in" style={{ "--d": ".5s", position: "relative", zIndex: "2", maxWidth: "760px", background: "#FAF9F5", padding: "clamp(28px, 4vw, 56px) clamp(24px, 4vw, 56px) 0 0", display: "flex", flexDirection: "column", gap: "22px" } as CSSProperties}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span className="hair" aria-hidden="true" style={{ "--d": ".7s", display: "inline-block", width: "40px", height: "1px", background: "#D4A017" } as CSSProperties}></span>Leistung I</div>
              <h1 id="page-title" className="serif" style={{ margin: "0", fontSize: "clamp(44px, 5.8vw, 80px)", lineHeight: "1.02", fontWeight: "500", color: "#163A5F" }}>Administrative &amp; organisatorische <span style={{ fontStyle: "italic", color: "#0E1A28" }}>Unterstützung</span></h1>
              <p style={{ margin: "0", fontSize: "18px", fontWeight: "300", color: "#2B3644", maxWidth: "34em", textWrap: "pretty" }}>Der Schweizer Alltag und bürokratische Prozesse können komplex sein. Ich helfe Ihnen dabei, den Überblick zu behalten und Ihren Schriftverkehr korrekt zu erledigen.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "6px" }}>
                <Link className="btn btn-navy" href="/anfrage">Anfrage stellen <span className="arr" aria-hidden="true">→</span></Link>
                <a className="btn btn-line" href="#situationen">Typische Anliegen</a>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px", paddingTop: "18px", borderTop: "1px solid #E4DCCB", fontSize: "13px", color: "#4A5563" }}>
                <span>Ohne Rechtsberatung</span>
                <span className="sep" aria-hidden="true" style={{ color: "#D4A017" }}>·</span>
                <span>Deutsch, Arabisch, Aramäisch</span>
                <span className="sep" aria-hidden="true" style={{ color: "#D4A017" }}>·</span>
                <span>Online oder in Zürich und Umgebung</span>
              </div>
            </div>
          </div>
        </section>
        <section id="situationen" aria-labelledby="sit-title" style={{ background: "#F3EEE4", padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap">
            <div className="rv split" style={{ alignItems: "end", marginBottom: "clamp(44px, 5vw, 72px)" }}>
              <div>
                <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Typische Anliegen</div>
                <h2 id="sit-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Kommt Ihnen das bekannt vor?</h2>
              </div>
              <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em" }}>Ob ein einzelner Brief oder ein ganzer Stapel Unterlagen: Gemeinsam schaffen wir Ordnung und Klarheit.</p>
            </div>
            <div className="sit-grid">
              <div className="sit rv" style={{ background: "#F3EEE4", padding: "34px 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span className="serif" style={{ fontSize: "34px", lineHeight: "1", color: "#D4A017" }}>01</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Ein Brief ist unklar</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Sie haben Post vom Steueramt, von der Gemeinde, der Krankenkasse oder einer anderen Stelle erhalten und möchten verstehen, was verlangt wird.</p>
              </div>
              <div className="sit rv" style={{ background: "#F3EEE4", padding: "34px 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span className="serif" style={{ fontSize: "34px", lineHeight: "1", color: "#D4A017" }}>02</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Ein Formular wartet</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Ein Antrag, eine Anmeldung oder ein Gesuch soll vollständig und korrekt ausgefüllt werden.</p>
              </div>
              <div className="sit rv" style={{ background: "#F3EEE4", padding: "34px 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span className="serif" style={{ fontSize: "34px", lineHeight: "1", color: "#D4A017" }}>03</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Eine Frist läuft</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Sie möchten rechtzeitig reagieren und den Überblick über Termine und Fristen behalten.</p>
              </div>
              <div className="sit rv" style={{ background: "#F3EEE4", padding: "34px 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span className="serif" style={{ fontSize: "34px", lineHeight: "1", color: "#D4A017" }}>04</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Ein Schreiben ist nötig</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Zum Beispiel an die Vermieterin, den Arbeitgeber, die Schule oder die Versicherung.</p>
              </div>
              <div className="sit rv" style={{ background: "#F3EEE4", padding: "34px 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span className="serif" style={{ fontSize: "34px", lineHeight: "1", color: "#D4A017" }}>05</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Die Unterlagen stapeln sich</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Sie möchten persönliche Dokumente sortieren und eine Ablage aufbauen, in der Sie alles wiederfinden.</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="leist-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap split">
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Leistungen</div>
              <h2 id="leist-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Wobei ich Sie unterstütze.</h2>
              <p style={{ margin: "20px 0 0", fontSize: "16px", fontWeight: "300", color: "#2B3644", maxWidth: "26em" }}>Sie behalten jederzeit die Entscheidung über Ihre Angaben und unterschreiben Ihre Dokumente selbst.</p>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3 / 2", marginTop: "clamp(28px, 4vw, 40px)" }}>
                <Image src="/images/familie.jpg" alt="Beraterin ordnet gemeinsam mit einem Paar Unterlagen am Schreibtisch (Symbolbild)" fill sizes="(max-width: 980px) 100vw, 42vw" style={{ objectFit: "cover" }} />
                <span style={{ position: "absolute", left: "12px", bottom: "10px", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "2px 7px" }}>Symbolbild</span>
              </div>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #D9CFBB" }}>
              <div style={{ display: "grid", gridTemplateColumns: "64px minmax(0, 1fr)", gap: "18px", padding: "30px 0", borderBottom: "1px solid #D9CFBB" }}>
                <span className="serif" style={{ fontSize: "24px", fontStyle: "italic", color: "#8A6508" }}>I.</span>
                <div>
                  <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "600", color: "#163A5F" }}>Formulare und Anträge</h3>
                  <p style={{ margin: "8px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Hilfestellung beim Ausfüllen: Wir gehen die Fragen gemeinsam durch und prüfen, ob alle nötigen Angaben und Beilagen vorhanden sind.</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "64px minmax(0, 1fr)", gap: "18px", padding: "30px 0", borderBottom: "1px solid #D9CFBB" }}>
                <span className="serif" style={{ fontSize: "24px", fontStyle: "italic", color: "#8A6508" }}>II.</span>
                <div>
                  <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "600", color: "#163A5F" }}>Behördliche Briefe verstehen</h3>
                  <p style={{ margin: "8px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Ich erkläre Ihnen Briefe und Mitteilungen in verständlichen Worten: was darin steht, was von Ihnen erwartet wird und bis wann.</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "64px minmax(0, 1fr)", gap: "18px", padding: "30px 0", borderBottom: "1px solid #D9CFBB" }}>
                <span className="serif" style={{ fontSize: "24px", fontStyle: "italic", color: "#8A6508" }}>III.</span>
                <div>
                  <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "600", color: "#163A5F" }}>Allgemeiner Schriftverkehr</h3>
                  <p style={{ margin: "8px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Unterstützung beim Erstellen von Briefen und E-Mails – klar formuliert und vollständig.</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "64px minmax(0, 1fr)", gap: "18px", padding: "30px 0", borderBottom: "1px solid #D9CFBB" }}>
                <span className="serif" style={{ fontSize: "24px", fontStyle: "italic", color: "#8A6508" }}>IV.</span>
                <div>
                  <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "600", color: "#163A5F" }}>Unterlagen ordnen</h3>
                  <p style={{ margin: "8px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Sortieren und Strukturieren persönlicher Unterlagen, damit Sie wichtige Dokumente schnell finden.</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "64px minmax(0, 1fr)", gap: "18px", padding: "30px 0", borderBottom: "1px solid #D9CFBB" }}>
                <span className="serif" style={{ fontSize: "24px", fontStyle: "italic", color: "#8A6508" }}>V.</span>
                <div>
                  <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "600", color: "#163A5F" }}>Unterstützung in familiären Angelegenheiten</h3>
                  <ul style={{ margin: "8px 0 0", paddingLeft: "20px", fontSize: "15.5px", color: "#2B3644", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <li>Zusammenstellung von Unterlagen für Scheidung oder Trennung</li>
                    <li>Hilfe beim Ausfüllen von Formularen (z. B. Unterhaltsberechnung, Sorgerechtsdokumente)</li>
                    <li>Sortierung und Strukturierung von Dokumenten für Anwälte oder Mediatoren.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="ablauf-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap">
            <div className="rv" style={{ maxWidth: "760px", marginBottom: "clamp(44px, 5vw, 64px)" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Ablauf</div>
              <h2 id="ablauf-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>In vier Schritten zur Klarheit.</h2>
            </div>
            <ol style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "32px" }}>
              <li className="rv" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "22px", borderTop: "2px solid #163A5F" }}>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 1</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Anfrage &amp; Unterlagen</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Sie beschreiben Ihr Anliegen online und laden die betreffenden Schreiben hoch – inklusive allfälliger Fristen.</p>
              </li>
              <li className="rv" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "22px", borderTop: "1px solid #D9CFBB" }}>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 2</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Erstgespräch</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>In 45 Minuten, online oder persönlich, klären wir, was zu tun ist und was Sie dafür brauchen.</p>
              </li>
              <li className="rv" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "22px", borderTop: "1px solid #D9CFBB" }}>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 3</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Gemeinsame Bearbeitung</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Wir füllen aus, formulieren und ordnen – Schritt für Schritt und nachvollziehbar.</p>
              </li>
              <li className="rv" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "22px", borderTop: "1px solid #D9CFBB" }}>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 4</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Überblick behalten</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Sie wissen, was erledigt ist, was noch aussteht und welche Fristen zu beachten sind.</p>
              </li>
            </ol>
          </div>
        </section>
        <section aria-labelledby="grenzen-title" style={{ background: "#163A5F", color: "#FFFFFF", padding: "clamp(80px, 10vw, 130px) 0", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: "24px", border: "1px solid rgba(212,160,23,.22)", pointerEvents: "none" }}></div>
          <div className="wrap split" style={{ position: "relative" }}>
            <div className="rv">
              <div className="eyebrow" style={{ color: "#D4A017" }}>Wichtiger Hinweis</div>
              <h2 id="grenzen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(36px, 4.2vw, 54px)", lineHeight: "1.1", fontWeight: "500" }}>Unterstützung – keine Rechtsberatung.</h2>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <p className="serif" style={{ margin: "0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.4", color: "#FAF9F5" }}>Meine Dienstleistung umfasst rein administrative und organisatorische Unterstützung. Ich biete keine Rechtsberatung an und vertrete Kunden nicht rechtlich vor Gerichten oder Behörden.</p>
              <div style={{ paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,.2)" }}>
                <h3 style={{ margin: "0", fontSize: "15px", fontWeight: "600", letterSpacing: ".04em", color: "#FFFFFF" }}>Wann Sie eine Fachperson brauchen</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15.5px", color: "#DCE3EB" }}>Wenn es um eine rechtliche Einschätzung geht – etwa ob sich ein Rechtsmittel lohnt, wie Sie sich in einem Verfahren verhalten sollen oder welche Rechte Sie haben – wenden Sie sich bitte an eine Rechtsberatungsstelle oder an eine Anwältin bzw. einen Anwalt. Ich sage Ihnen offen, wenn Ihr Anliegen über meine Unterstützung hinausgeht.</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="mitbringen-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap split">
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Vorbereitung</div>
              <h2 id="mitbringen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(36px, 4vw, 52px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F" }}>Das hilft beim ersten Gespräch.</h2>
              <ul style={{ margin: "28px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", fontSize: "15.5px", color: "#2B3644" }}>
                <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}>
  <path d="M4 12.5l5 5L20 6.5"></path>
</svg>Das Schreiben oder Formular, um das es geht</li>
                <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}>
  <path d="M4 12.5l5 5L20 6.5"></path>
</svg>Frühere Korrespondenz zum gleichen Thema</li>
                <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}>
  <path d="M4 12.5l5 5L20 6.5"></path>
</svg>Bekannte Fristen und Termine</li>
                <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}>
  <path d="M4 12.5l5 5L20 6.5"></path>
</svg>Ihre Fragen – gerne notiert</li>
              </ul>
            </div>
            <div className="faq rv" style={{ borderTop: "1px solid #D9CFBB" }}>
              <h2 className="eyebrow" style={{ margin: "0", padding: "22px 0 6px", color: "#8A6508", fontSize: "12px" }}>Häufige Fragen</h2>
              <details style={{ borderBottom: "1px solid #D9CFBB" }} open>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Füllen Sie Formulare für mich aus?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Wir füllen sie gemeinsam aus. Sie entscheiden über alle Angaben und unterschreiben selbst.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Können Sie mich bei einer Behörde vertreten?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Nein. Ich vertrete niemanden rechtlich vor Gerichten oder Behörden. Benötigen Sie bei einem Termin sprachliche Unterstützung, kann ich Sie als Dolmetscherin begleiten.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Kann ich Unterlagen vorab senden?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Ja. In der Online-Anfrage können Sie die betreffenden Dokumente hochladen. Senden Sie bitte nur, was für Ihr Anliegen nötig ist.</div>
              </details>
            </div>
          </div>
        </section>
        <section aria-labelledby="weitere-title" style={{ background: "#FFFFFF", padding: "clamp(72px, 9vw, 120px) 0", borderTop: "1px solid #ECE6D8" }}>
          <div className="wrap">
            <h2 id="weitere-title" className="serif rv" style={{ margin: "0 0 clamp(32px, 4vw, 48px)", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F" }}>Weitere Leistungen</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "clamp(20px, 3vw, 32px)" }}>
              <Link className="svc rv" href="/jugendcoaching">
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#8A6508" }}>II.</span>
                <span className="serif" style={{ fontSize: "30px", fontWeight: "600", lineHeight: "1.12" }}>Jugendcoaching &amp; Berufsorientierung</span>
                <span style={{ fontSize: "15px", color: "#2B3644" }}>Berufswahl, Bewerbung und Orientierung im Schweizer Bildungssystem.</span>
                <span className="tl">Mehr erfahren →</span>
              </Link>
              <Link className="svc rv" href="/dolmetschen">
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#8A6508" }}>III.</span>
                <span className="serif" style={{ fontSize: "30px", fontWeight: "600", lineHeight: "1.12" }}>Dolmetschen &amp; Sprachhilfe</span>
                <span style={{ fontSize: "15px", color: "#2B3644" }}>Verständigung auf Arabisch und Aramäisch – bei Terminen und für Dokumente.</span>
                <span className="tl">Mehr erfahren →</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="lux-host" id="anfrage" aria-labelledby="cta-title" style={{ background: "#F3EEE4", padding: "clamp(88px, 11vw, 150px) 0", position: "relative", overflow: "hidden", borderTop: "1px solid #E4DCCB" }}>
          <LuxuryOrnaments />
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "0", width: "1px", height: "72px", background: "linear-gradient(#D4A017, rgba(212,160,23,0))" }}></div>
          <div className="wrap rv" style={{ maxWidth: "920px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            <ServiceIllustration kind="documents" />
            <div className="eyebrow" style={{ color: "#8A6508" }}>Anfrage &amp; Termin</div>
            <h2 id="cta-title" className="serif" style={{ margin: "0", fontSize: "clamp(42px, 5.4vw, 72px)", lineHeight: "1.04", fontWeight: "500", color: "#163A5F" }}>Bringen wir Ordnung <span style={{ fontStyle: "italic", color: "#8A6508" }}>hinein.</span></h2>
            <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em" }}>Stellen Sie Ihre Anfrage online, laden Sie die betreffenden Schreiben hoch und wählen Sie auf Wunsch direkt einen Termin.</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", marginTop: "10px" }}>
              <Link className="btn btn-navy" href="/anfrage" aria-describedby="cta-proto">Anfrage starten <span className="arr" aria-hidden="true">→</span></Link>
              <WhatsAppCta className="btn btn-line" describedBy="cta-proto" />
            </div>
            {site.showDemoNotices ? (
              <p id="cta-proto" style={{ margin: "0", fontSize: "12px", color: "#4A5563" }}>Prototyp: Das Anfrageformular ist eine Demo ohne Datenübermittlung; WhatsApp wird später verbunden.</p>
            ) : null}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
