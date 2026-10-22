import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import SiteShell from "@/components/layout/SiteShell";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { site } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

// Content ported 1:1 from the approved prototype (Dolmetschen).
export const metadata: Metadata = {
  description: "Dolmetschen und Sprachhilfe auf Arabisch und Aramäisch in Zürich: Begleitung zu Terminen bei Behörden, Schulen und Sozialdiensten sowie Übersetzung einfacher Dokumente.",
  alternates: {
    canonical: "/dolmetschen"
  },
  openGraph: {
    ...baseOpenGraph,
    url: "/dolmetschen",
    description: "Dolmetschen und Sprachhilfe auf Arabisch und Aramäisch in Zürich: Begleitung zu Terminen bei Behörden, Schulen und Sozialdiensten sowie Übersetzung einfacher Dokumente.",
    title: "Dolmetschen & Sprachhilfe Arabisch und Aramäisch in Zürich"
  },
  title: "Dolmetschen & Sprachhilfe Arabisch und Aramäisch in Zürich"
};

export default function InterpretingPage() {
  return (
    <SiteShell page="interp">
      <main>
        <section aria-labelledby="page-title" style={{ background: "#163A5F", color: "#FFFFFF", padding: "clamp(28px, 4vw, 44px) 0 clamp(80px, 10vw, 130px)", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "1px", background: "linear-gradient(90deg, rgba(212,160,23,0), rgba(212,160,23,.7) 50%, rgba(212,160,23,0))" }}></div>
          <div className="wrap">
            <nav aria-label="Brotkrümelnavigation" style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
              <ol className="crumb">
                <li>
                  <Link href="/">Startseite</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#leistungen">Leistungen</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: "#FFFFFF" }}>Dolmetschen &amp; Sprachhilfe</li>
              </ol>
            </nav>
            <div className="hero4">
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="in eyebrow" style={{ "--d": ".1s", color: "#D4A017", display: "flex", alignItems: "center", gap: "14px" } as CSSProperties}><span className="hair" aria-hidden="true" style={{ "--d": ".2s", display: "inline-block", width: "40px", height: "1px", background: "#D4A017" } as CSSProperties}></span>Leistung III</div>
                <h1 id="page-title" className="serif" style={{ margin: "0", fontSize: "clamp(46px, 6vw, 84px)", lineHeight: "1.02", fontWeight: "500", color: "#FAF9F5" }}>
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".05em" }}>
                    <span className="ln" style={{ "--d": ".25s", display: "block" } as CSSProperties}>Dolmetschen &amp;</span>
                  </span>
                  {" "}
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                    <span className="ln" style={{ "--d": ".4s", display: "block", fontStyle: "italic" } as CSSProperties}>Sprachhilfe</span>
                  </span>
                </h1>
                <p className="in serif" style={{ "--d": ".55s", margin: "0", fontSize: "clamp(22px, 2.2vw, 28px)", color: "#D4A017", fontStyle: "italic" } as CSSProperties}>Arabisch und Aramäisch</p>
                <p className="in" style={{ "--d": ".65s", margin: "0", fontSize: "17px", fontWeight: "300", color: "#DCE3EB", maxWidth: "34em", textWrap: "pretty" } as CSSProperties}>Sprachbarrieren führen oft zu Missverständnissen. Ich sorge für eine klare, vertrauensvolle Verständigung zwischen Privatpersonen, Behörden und Institutionen.</p>
                <div className="in" style={{ "--d": ".8s", display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "4px" } as CSSProperties}>
                  <Link className="btn btn-ivory" href="/anfrage">Dolmetschen anfragen <span className="arr" aria-hidden="true">→</span></Link>
                  <a className="btn btn-line-light" href="#formen">Leistungen ansehen</a>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <div className="unveil" style={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 3.6", background: "#0F2A45" }}>
                  <Image src="/images/dolmetschen.jpg" alt="Zwei Frauen im Gespräch an einem Besprechungstisch (Symbolbild)" fill sizes="(max-width: 980px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "55% 45%" }} priority />
                  {" "}
                  <span style={{ position: "absolute", left: "14px", bottom: "12px", fontSize: "10.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.6)", padding: "3px 8px" }}>Symbolbild</span>
                </div>
                <div className="dframe" aria-hidden="true" style={{ position: "absolute", top: "-18px", right: "-18px", width: "42%", height: "46%", borderTop: "1px solid #D4A017", borderRight: "1px solid #D4A017", pointerEvents: "none" }}></div>
              </div>
            </div>
          </div>
        </section>
        <section aria-label="Sprachkombinationen" style={{ padding: "clamp(48px, 6vw, 72px) 0", borderBottom: "1px solid #E4DCCB" }}>
          <div className="wrap rv" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px clamp(28px, 5vw, 72px)", textAlign: "center" }}>
            <span className="serif" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", color: "#163A5F", fontWeight: "500" }}>Deutsch <span aria-label="und" style={{ color: "#D4A017" }}>⇄</span> Arabisch</span>
            <span aria-hidden="true" style={{ width: "1px", height: "40px", background: "#D9CFBB" }}></span>
            <span className="serif" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", color: "#163A5F", fontWeight: "500" }}>Deutsch <span aria-label="und" style={{ color: "#D4A017" }}>⇄</span> Aramäisch</span>
          </div>
        </section>
        <section id="formen" aria-labelledby="formen-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap">
            <div className="rv" style={{ maxWidth: "760px", marginBottom: "clamp(40px, 5vw, 64px)" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Leistungen</div>
              <h2 id="formen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Mündlich und schriftlich.</h2>
            </div>
            <div className="two">
              <div className="card rv" style={{ background: "#FFFFFF", border: "1px solid #ECE6D8", padding: "clamp(28px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h7A2.5 2.5 0 0 1 15 6.5v4a2.5 2.5 0 0 1-2.5 2.5H8l-3 2.5V13h0a2 2 0 0 1-2-2z"></path>
                  <path d="M17 9h1.5A2.5 2.5 0 0 1 21 11.5v4a2 2 0 0 1-2 2v2.5l-3-2.5h-3.5a2.5 2.5 0 0 1-2.4-1.8"></path>
                </svg>
                <h3 className="serif" style={{ margin: "0", fontSize: "34px", fontWeight: "600", lineHeight: "1.1", color: "#163A5F" }}>Begleitung zu Terminen</h3>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Damit wichtige Gespräche gelingen – mühelose Verständigung vor Ort.</p>
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", fontSize: "15px", color: "#2B3644", borderTop: "1px solid #E4DCCB" }}>
                  <li style={{ display: "flex", gap: "14px", padding: "12px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Termine bei Behörden, Schulen und Sozialdiensten</li>
                  <li style={{ display: "flex", gap: "14px", padding: "12px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Gespräche mit Institutionen</li>
                  <li style={{ display: "flex", gap: "14px", padding: "12px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Elterngespräche und Termine zur Ausbildung</li>
                </ul>
              </div>
              <div className="card rv" style={{ background: "#FFFFFF", border: "1px solid #ECE6D8", padding: "clamp(28px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 3v5h5M8.5 12.5h7M8.5 16h5"></path>
                </svg>
                <h3 className="serif" style={{ margin: "0", fontSize: "34px", fontWeight: "600", lineHeight: "1.1", color: "#163A5F" }}>Übersetzung einfacher Dokumente</h3>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Damit Sie verstehen, was in einem Schreiben steht – oder sich verständlich machen können.</p>
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", fontSize: "15px", color: "#2B3644", borderTop: "1px solid #E4DCCB" }}>
                  <li style={{ display: "flex", gap: "14px", padding: "12px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Briefe und Mitteilungen</li>
                  <li style={{ display: "flex", gap: "14px", padding: "12px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Formulare</li>
                  <li style={{ display: "flex", gap: "14px", padding: "12px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Kurze Texte aus dem Alltag, aus Schule und Ausbildung</li>
                  <li style={{ display: "flex", gap: "14px", padding: "12px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Vertrauensvolle Übersetzung in Muttersprachenqualität (Arabisch &amp; Aramäisch)</li>
                </ul>
                <p style={{ margin: "0", fontSize: "13.5px", color: "#4A5563" }}>Benötigen Sie eine amtlich beglaubigte Übersetzung, klären Sie bitte vorab in Ihrer Anfrage, ob dies möglich ist.</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="fuerwen-title" style={{ background: "#F3EEE4", padding: "clamp(80px, 10vw, 130px) 0" }}>
          <div className="wrap split" style={{ alignItems: "center" }}>
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Für wen</div>
              <h2 id="fuerwen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Für beide Seiten des Gesprächs.</h2>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #D9CFBB" }}>
              <div style={{ padding: "28px 0", borderBottom: "1px solid #D9CFBB" }}>
                <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "600", color: "#163A5F" }}>Privatpersonen &amp; Familien</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Die bei Terminen mit Ämtern, Schulen oder Sozialdiensten sicher verstanden werden möchten.</p>
              </div>
              <div style={{ padding: "28px 0", borderBottom: "1px solid #D9CFBB" }}>
                <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "600", color: "#163A5F" }}>Schulen, Behörden &amp; Institutionen</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Die für Gespräche mit Familien eine Sprachmittlung auf Arabisch oder Aramäisch benötigen.</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="rolle-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap split">
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Rolle</div>
              <h2 id="rolle-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Was Sprachmittlung bedeutet.</h2>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <p className="serif" style={{ margin: "0", fontSize: "clamp(24px, 2.4vw, 32px)", lineHeight: "1.35", color: "#163A5F" }}>Ich übertrage das Gespräch, damit alle Beteiligten einander verstehen. Ich berate nicht und vertrete niemanden.</p>
              <div style={{ border: "1px solid #E4DCCB", borderTop: "2px solid #163A5F", padding: "24px 26px", background: "#FAF9F5" }}>
                <div className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Wichtiger Hinweis</div>
                <p style={{ margin: "10px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Die Dolmetschleistung dient der reinen Sprachmittlung zur Vermeidung von Verständigungsproblemen. Es erfolgt keine rechtliche Vertretung oder Beratung. Die Übertragung erfolgt nach bestem Wissen und Gewissen; Einzelheiten regeln die AGB.</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="ablauf-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap">
            <div className="rv split" style={{ alignItems: "end", marginBottom: "clamp(44px, 5vw, 64px)" }}>
              <div>
                <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Ablauf</div>
                <h2 id="ablauf-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Von der Anfrage zum Gespräch.</h2>
              </div>
              <div style={{ background: "#FFFFFF", border: "1px solid #ECE6D8", padding: "22px 24px" }}>
                <div className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Bitte in der Anfrage angeben</div>
                <p style={{ margin: "8px 0 0", fontSize: "14.5px", color: "#2B3644" }}>Datum und Uhrzeit · Ort · voraussichtliche Dauer · Sprache bzw. Sprachvariante · Thema in Stichworten</p>
              </div>
            </div>
            <ol style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "32px" }}>
              <li className="rv" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "22px", borderTop: "2px solid #163A5F" }}>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 1</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Anfrage</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Sie nennen Termin, Ort und Thema – oder laden das Dokument hoch, das übersetzt werden soll.</p>
              </li>
              <li className="rv" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "22px", borderTop: "1px solid #D9CFBB" }}>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 2</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Abklärung</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Ich prüfe Verfügbarkeit und Sprachvariante und melde mich bei Ihnen.</p>
              </li>
              <li className="rv" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "22px", borderTop: "1px solid #D9CFBB" }}>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 3</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Vorbereitung</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Eine kurze Information zu Thema und Beteiligten hilft, das Gespräch gut zu begleiten.</p>
              </li>
              <li className="rv" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "22px", borderTop: "1px solid #D9CFBB" }}>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 4</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Verständigung</h3>
                <p style={{ margin: "0", fontSize: "15px", color: "#2B3644" }}>Beim Termin oder mit der Übersetzung: klare Kommunikation für alle Beteiligten.</p>
              </li>
            </ol>
          </div>
        </section>
        <section aria-labelledby="faq-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 130px) 0", borderTop: "1px solid #ECE6D8" }}>
          <div className="wrap split">
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Häufige Fragen</div>
              <h2 id="faq-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(36px, 4.2vw, 54px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Gut zu wissen.</h2>
            </div>
            <div className="faq rv" style={{ borderTop: "1px solid #D9CFBB" }}>
              <details style={{ borderBottom: "1px solid #D9CFBB" }} open>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Welche Sprachvarianten decken Sie ab?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Bitte nennen Sie in Ihrer Anfrage die gewünschte Sprache und, wenn bekannt, die Variante oder den Dialekt. Ich bestätige vorab, ob ich diese abdecken kann.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Geben Sie bei Terminen auch Ratschläge?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Nein. Als Dolmetscherin übernehme ich ausschliesslich die Sprachmittlung. Ich berate nicht und vertrete niemanden rechtlich.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Kann eine Schule oder Behörde die Anfrage stellen?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Ja. Institutionen stellen die Anfrage für ihren eigenen Termin und geben dabei Datum, Ort, Dauer und Thema an.</div>
              </details>
            </div>
          </div>
        </section>
        <section aria-labelledby="weitere-title" style={{ padding: "clamp(72px, 9vw, 120px) 0" }}>
          <div className="wrap">
            <h2 id="weitere-title" className="serif rv" style={{ margin: "0 0 clamp(32px, 4vw, 48px)", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F" }}>Weitere Leistungen</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "clamp(20px, 3vw, 32px)" }}>
              <Link className="svc rv" href="/administrative-unterstuetzung">
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#8A6508" }}>I.</span>
                <span className="serif" style={{ fontSize: "30px", fontWeight: "600", lineHeight: "1.12" }}>Administrative Unterstützung</span>
                <span style={{ fontSize: "15px", color: "#2B3644" }}>Formulare, Briefe und Schriftverkehr verstehen und erledigen.</span>
                <span className="tl">Mehr erfahren →</span>
              </Link>
              <Link className="svc rv" href="/jugendcoaching">
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#8A6508" }}>II.</span>
                <span className="serif" style={{ fontSize: "30px", fontWeight: "600", lineHeight: "1.12" }}>Jugendcoaching &amp; Berufsorientierung</span>
                <span style={{ fontSize: "15px", color: "#2B3644" }}>Berufswahl, Bewerbung und Orientierung im Schweizer Bildungssystem.</span>
                <span className="tl">Mehr erfahren →</span>
              </Link>
            </div>
          </div>
        </section>
        <section id="anfrage" aria-labelledby="cta-title" style={{ background: "#F3EEE4", padding: "clamp(88px, 11vw, 150px) 0", position: "relative", overflow: "hidden", borderTop: "1px solid #E4DCCB" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "0", width: "1px", height: "72px", background: "linear-gradient(#D4A017, rgba(212,160,23,0))" }}></div>
          <div className="wrap rv" style={{ maxWidth: "920px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            <div className="eyebrow" style={{ color: "#8A6508" }}>Anfrage &amp; Termin</div>
            <h2 id="cta-title" className="serif" style={{ margin: "0", fontSize: "clamp(42px, 5.4vw, 72px)", lineHeight: "1.04", fontWeight: "500", color: "#163A5F" }}>Damit Sie <span style={{ fontStyle: "italic", color: "#8A6508" }}>verstanden werden.</span></h2>
            <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em" }}>Nennen Sie Termin, Ort und Sprache in der Online-Anfrage – oder laden Sie das Dokument hoch, das übersetzt werden soll.</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", marginTop: "10px" }}>
              <Link className="btn btn-navy" href="/anfrage" aria-describedby="cta-proto">Anfrage starten <span className="arr" aria-hidden="true">→</span></Link>
              <WhatsAppCta className="btn btn-line" describedBy="cta-proto" />
            </div>
            {site.demoMode ? (
              <p id="cta-proto" style={{ margin: "0", fontSize: "12px", color: "#4A5563" }}>Prototyp: Das Anfrageformular ist eine Demo ohne Datenübermittlung; WhatsApp wird später verbunden.</p>
            ) : null}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
