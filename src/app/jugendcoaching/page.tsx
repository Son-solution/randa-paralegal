import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import SiteShell from "@/components/layout/SiteShell";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { site } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

// Content ported 1:1 from the approved prototype (Jugendcoaching).
export const metadata: Metadata = {
  description: "Coaching für Jugendliche in Zürich: Berufswahl, Schnupperlehren, Lehrstellensuche, Bewerbungsunterlagen und Orientierung im Schweizer Bildungssystem – auf Deutsch, Arabisch oder Aramäisch.",
  alternates: {
    canonical: "/jugendcoaching"
  },
  openGraph: {
    ...baseOpenGraph,
    url: "/jugendcoaching",
    description: "Coaching für Jugendliche in Zürich: Berufswahl, Schnupperlehren, Lehrstellensuche, Bewerbungsunterlagen und Orientierung im Schweizer Bildungssystem – auf Deutsch, Arabisch oder Aramäisch.",
    title: "Jugendcoaching & Berufsorientierung in Zürich"
  },
  title: "Jugendcoaching & Berufsorientierung in Zürich"
};

export default function YouthCoachingPage() {
  return (
    <SiteShell page="youth">
      <main>
        <section aria-labelledby="page-title" style={{ padding: "clamp(28px, 4vw, 44px) 0 clamp(80px, 10vw, 130px)" }}>
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
                <li aria-current="page" style={{ color: "#163A5F" }}>Jugendcoaching &amp; Berufsorientierung</li>
              </ol>
            </nav>
            <div className="hero3">
              <div style={{ position: "relative" }}>
                <div className="unveil" style={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 3.3", background: "#E8E1D2" }}>
                  <Image src="/images/jugendcoaching.jpg" alt="Gespräch mit einem Jugendlichen über Berufswahl (Symbolbild)" fill sizes="(max-width: 980px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "45% 40%" }} priority />
                  {" "}
                  <span style={{ position: "absolute", left: "14px", bottom: "12px", fontSize: "10.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "3px 8px" }}>Symbolbild</span>
                </div>
                <div className="jframe" aria-hidden="true" style={{ position: "absolute", left: "-18px", bottom: "-18px", width: "40%", height: "44%", borderLeft: "1px solid #D4A017", borderBottom: "1px solid #D4A017", pointerEvents: "none" }}></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="in eyebrow" style={{ "--d": ".1s", color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" } as CSSProperties}><span className="hair" aria-hidden="true" style={{ "--d": ".2s", display: "inline-block", width: "40px", height: "1px", background: "#D4A017" } as CSSProperties}></span>Leistung II</div>
                <h1 id="page-title" className="serif" style={{ margin: "0", fontSize: "clamp(40px, 4.4vw, 64px)", lineHeight: "1.04", fontWeight: "500", color: "#163A5F" }}>
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".05em" }}>
                    <span className="ln" style={{ "--d": ".25s", display: "block" } as CSSProperties}>Jugendcoaching &amp;</span>
                  </span>
                  {" "}
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                    <span className="ln" style={{ "--d": ".4s", display: "block", fontStyle: "italic", color: "#0E1A28" } as CSSProperties}>Berufs­orientierung</span>
                  </span>
                </h1>
                <p className="in" style={{ "--d": ".6s", margin: "0", fontSize: "15px", fontWeight: "600", letterSpacing: ".04em", color: "#163A5F" } as CSSProperties}>Coaching für jugendliche Migrantinnen und Migranten – Berufswahl und Integration</p>
                <p className="in" style={{ "--d": ".7s", margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", textWrap: "pretty" } as CSSProperties}>Der Einstieg in die Schweizer Bildungs- und Arbeitswelt ist ein wichtiger Meilenstein. Ich begleite Jugendliche individuell und stärkenorientiert auf ihrem Weg in eine passende Ausbildung.</p>
                <div className="in" style={{ "--d": ".85s", display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "4px" } as CSSProperties}>
                  <Link className="btn btn-navy" href="/anfrage">Coaching anfragen <span className="arr" aria-hidden="true">→</span></Link>
                  <a className="btn btn-line" href="#bildungsweg">Der Bildungsweg</a>
                </div>
                <p className="in" style={{ "--d": ".95s", margin: "0", fontSize: "13px", color: "#4A5563" } as CSSProperties}>Auf Deutsch, Arabisch oder Aramäisch · online oder in Zürich und Umgebung</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="fuerwen-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 130px) 0", borderTop: "1px solid #ECE6D8" }}>
          <div className="wrap">
            <div className="rv" style={{ maxWidth: "760px", marginBottom: "clamp(40px, 5vw, 64px)" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Für wen</div>
              <h2 id="fuerwen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Für Jugendliche auf dem Weg in die Berufswelt.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "0", borderTop: "1px solid #D9CFBB" }}>
              <div className="rv" style={{ padding: "30px 28px 34px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span className="serif" style={{ fontSize: "20px", color: "#8A6508", fontStyle: "italic" }}>In der Oberstufe</span>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Sie stehen vor der Berufswahl und möchten herausfinden, welcher Weg zu Ihnen passt.</p>
              </div>
              <div className="rv" style={{ padding: "30px 28px 34px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span className="serif" style={{ fontSize: "20px", color: "#8A6508", fontStyle: "italic" }}>Neu in der Schweiz</span>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Sie möchten das Schweizer Bildungs- und Lehrstellensystem verstehen und sich im Alltag orientieren.</p>
              </div>
              <div className="rv" style={{ padding: "30px 28px 34px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span className="serif" style={{ fontSize: "20px", color: "#8A6508", fontStyle: "italic" }}>Auf Lehrstellensuche</span>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Sie suchen eine Lehrstelle, ein Praktikum oder eine Schnupperlehre und brauchen Unterstützung bei der Bewerbung.</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="leist-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap">
            <div className="rv" style={{ maxWidth: "760px", marginBottom: "clamp(40px, 5vw, 64px)" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Leistungen</div>
              <h2 id="leist-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Orientierung und Begleitung – zwei Seiten eines Weges.</h2>
            </div>
            <div className="two">
              <div className="rv" style={{ background: "#FFFFFF", border: "1px solid #ECE6D8", padding: "clamp(28px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: "18px" }}>
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#8A6508" }}>I.</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "34px", fontWeight: "600", lineHeight: "1.1", color: "#163A5F" }}>Berufsorientierung</h3>
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "0", fontSize: "15.5px", color: "#2B3644", borderTop: "1px solid #E4DCCB" }}>
                  <li style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Stärken, Interessen und passende Berufsfelder erarbeiten</li>
                  <li style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Das Schweizer Bildungs- und Lehrstellensystem verstehen</li>
                  <li style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Lebenslauf und Motivationsschreiben erstellen</li>
                  <li style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Auf Vorstellungsgespräche und Auftreten vorbereiten</li>
                  <li style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: "1px solid #E4DCCB" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Lehrstellen, Praktika und Schnupperlehren suchen</li>
                </ul>
              </div>
              <div className="rv" style={{ background: "#163A5F", color: "#FFFFFF", padding: "clamp(28px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: "18px" }}>
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#D4A017" }}>II.</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "34px", fontWeight: "600", lineHeight: "1.1", color: "#FAF9F5" }}>Integration &amp; Begleitung</h3>
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "0", fontSize: "15.5px", color: "#DCE3EB", borderTop: "1px solid rgba(255,255,255,.2)" }}>
                  <li style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.2)" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Kulturübergreifende Orientierung im Alltag und in der Ausbildung</li>
                  <li style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.2)" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Sprachliche Unterstützung beim Verstehen von Schul- und Lehrverträgen</li>
                  <li style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.2)" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Selbstvertrauen und Eigenverantwortung stärken</li>
                  <li style={{ display: "flex", gap: "14px", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.2)" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Coaching wahlweise auf Deutsch, Arabisch oder Aramäisch</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="bildungsweg" aria-labelledby="weg-title" style={{ background: "#F3EEE4", padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap">
            <div className="rv split" style={{ alignItems: "end", marginBottom: "clamp(48px, 6vw, 80px)" }}>
              <div>
                <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Orientierung</div>
                <h2 id="weg-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Der Weg in die Berufsbildung – vereinfacht.</h2>
              </div>
              <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em" }}>Das Schweizer System bietet viele Wege. Im Coaching klären wir, wo Sie heute stehen und welcher nächste Schritt sinnvoll ist.</p>
            </div>
            <ol className="path" style={{ margin: "0", padding: "0", listStyle: "none" }}>
              <li className="stage rv" style={{ position: "relative", padding: "34px 24px 0 0", borderTop: "1px solid #B9A06A" }}>
                <span className="dot" aria-hidden="true" style={{ position: "absolute", left: "0", top: "-7px", width: "13px", height: "13px", borderRadius: "50%", background: "#163A5F", border: "2px solid #F3EEE4", transition: "background-color .4s" }}></span>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Etappe 1</span>
                <h3 className="serif" style={{ margin: "8px 0 8px", fontSize: "25px", fontWeight: "600", lineHeight: "1.15", color: "#163A5F" }}>Sekundarstufe</h3>
                <p style={{ margin: "0", fontSize: "14.5px", color: "#2B3644" }}>In der Oberstufe beginnt die Berufswahl: Interessen entdecken, Berufe kennenlernen.</p>
              </li>
              <li className="stage rv" style={{ position: "relative", padding: "34px 24px 0 0", borderTop: "1px solid #B9A06A" }}>
                <span className="dot" aria-hidden="true" style={{ position: "absolute", left: "0", top: "-7px", width: "13px", height: "13px", borderRadius: "50%", background: "#163A5F", border: "2px solid #F3EEE4", transition: "background-color .4s" }}></span>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Etappe 2</span>
                <h3 className="serif" style={{ margin: "8px 0 8px", fontSize: "25px", fontWeight: "600", lineHeight: "1.15", color: "#163A5F" }}>Schnupperlehren</h3>
                <p style={{ margin: "0", fontSize: "14.5px", color: "#2B3644" }}>Berufe im Betrieb erleben und herausfinden, was wirklich passt.</p>
              </li>
              <li className="stage rv" style={{ position: "relative", padding: "34px 24px 0 0", borderTop: "1px solid #B9A06A" }}>
                <span className="dot" aria-hidden="true" style={{ position: "absolute", left: "0", top: "-7px", width: "13px", height: "13px", borderRadius: "50%", background: "#163A5F", border: "2px solid #F3EEE4", transition: "background-color .4s" }}></span>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Etappe 3</span>
                <h3 className="serif" style={{ margin: "8px 0 8px", fontSize: "25px", fontWeight: "600", lineHeight: "1.15", color: "#163A5F" }}>Bewerbung</h3>
                <p style={{ margin: "0", fontSize: "14.5px", color: "#2B3644" }}>Lebenslauf, Motivationsschreiben und Vorstellungsgespräch – bis zum Lehrvertrag.</p>
              </li>
              <li className="stage rv" style={{ position: "relative", padding: "34px 24px 0 0", borderTop: "1px solid #B9A06A" }}>
                <span className="dot" aria-hidden="true" style={{ position: "absolute", left: "0", top: "-7px", width: "13px", height: "13px", borderRadius: "50%", background: "#163A5F", border: "2px solid #F3EEE4", transition: "background-color .4s" }}></span>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Etappe 4</span>
                <h3 className="serif" style={{ margin: "8px 0 8px", fontSize: "25px", fontWeight: "600", lineHeight: "1.15", color: "#163A5F" }}>Berufliche Grundbildung</h3>
                <p style={{ margin: "0", fontSize: "14.5px", color: "#2B3644" }}>Die Lehre mit eidgenössischem Berufsattest (EBA, 2 Jahre) oder Fähigkeitszeugnis (EFZ, 3–4 Jahre).</p>
              </li>
              <li className="stage rv" style={{ position: "relative", padding: "34px 24px 0 0", borderTop: "1px solid #B9A06A" }}>
                <span className="dot" aria-hidden="true" style={{ position: "absolute", left: "0", top: "-7px", width: "13px", height: "13px", borderRadius: "50%", background: "#163A5F", border: "2px solid #F3EEE4", transition: "background-color .4s" }}></span>
                <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Etappe 5</span>
                <h3 className="serif" style={{ margin: "8px 0 8px", fontSize: "25px", fontWeight: "600", lineHeight: "1.15", color: "#163A5F" }}>Weiterkommen</h3>
                <p style={{ margin: "0", fontSize: "14.5px", color: "#2B3644" }}>Danach stehen weitere Wege offen, etwa die Berufsmaturität oder eine höhere Berufsbildung.</p>
              </li>
            </ol>
            <p className="rv" style={{ margin: "clamp(36px, 4vw, 52px) 0 0", fontSize: "14.5px", color: "#4A5563", maxWidth: "52em" }}>Noch keine Anschlusslösung nach der obligatorischen Schulzeit? Auch Brückenangebote wie ein 10. Schuljahr können ein sinnvoller Zwischenschritt sein. Gemeinsam schauen wir, was in Ihrer Situation passt.</p>
          </div>
        </section>
        <section aria-labelledby="ablauf-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap split">
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Ablauf</div>
              <h2 id="ablauf-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>So läuft das Coaching ab.</h2>
              <p style={{ margin: "20px 0 0", fontSize: "16px", fontWeight: "300", color: "#2B3644", maxWidth: "26em" }}>Umfang und Anzahl der Termine richten sich nach Ihrer Situation und werden im Erstgespräch besprochen.</p>
            </div>
            <ol className="rv" style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column" }}>
              <li style={{ display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", gap: "16px", padding: "26px 0", borderTop: "1px solid #E4DCCB" }}>
                <span className="serif" style={{ fontSize: "40px", lineHeight: "1", color: "#D4A017" }}>01</span>
                <div>
                  <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "600", color: "#163A5F" }}>Kennenlernen</h3>
                  <p style={{ margin: "6px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Im Erstgespräch lernen wir uns kennen und klären Ihre Ausgangslage und Ihre Ziele.</p>
                </div>
              </li>
              <li style={{ display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", gap: "16px", padding: "26px 0", borderTop: "1px solid #E4DCCB" }}>
                <span className="serif" style={{ fontSize: "40px", lineHeight: "1", color: "#D4A017" }}>02</span>
                <div>
                  <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "600", color: "#163A5F" }}>Stärken entdecken</h3>
                  <p style={{ margin: "6px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Wir erarbeiten Ihre Interessen und Fähigkeiten und leiten passende Berufsfelder ab.</p>
                </div>
              </li>
              <li style={{ display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", gap: "16px", padding: "26px 0", borderTop: "1px solid #E4DCCB" }}>
                <span className="serif" style={{ fontSize: "40px", lineHeight: "1", color: "#D4A017" }}>03</span>
                <div>
                  <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "600", color: "#163A5F" }}>Unterlagen &amp; Bewerbungen</h3>
                  <p style={{ margin: "6px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Lebenslauf und Motivationsschreiben entstehen gemeinsam; wir planen die Suche nach Schnupperlehren und Lehrstellen.</p>
                </div>
              </li>
              <li style={{ display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", gap: "16px", padding: "26px 0", borderTop: "1px solid #E4DCCB", borderBottom: "1px solid #E4DCCB" }}>
                <span className="serif" style={{ fontSize: "40px", lineHeight: "1", color: "#D4A017" }}>04</span>
                <div>
                  <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "600", color: "#163A5F" }}>Gespräche vorbereiten</h3>
                  <p style={{ margin: "6px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Wir üben Vorstellungsgespräche und das Auftreten – damit Sie sicher in den nächsten Schritt gehen.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>
        <section aria-labelledby="grenzen-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap">
            <div className="rv" style={{ maxWidth: "760px", marginBottom: "clamp(40px, 5vw, 56px)" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Klarheit</div>
              <h2 id="grenzen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(36px, 4.2vw, 54px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Was Coaching ist – und was nicht.</h2>
            </div>
            <div className="two">
              <div className="rv" style={{ borderTop: "2px solid #163A5F", paddingTop: "24px" }}>
                <h3 style={{ margin: "0 0 14px", fontSize: "15px", fontWeight: "600", letterSpacing: ".04em", color: "#163A5F" }}>Coaching ist</h3>
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "15.5px", color: "#2B3644" }}>
                  <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}>
  <path d="M4 12.5l5 5L20 6.5"></path>
</svg>ein unterstützender, stärkenorientierter Prozess</li>
                  <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}>
  <path d="M4 12.5l5 5L20 6.5"></path>
</svg>individuell auf Ihre Situation abgestimmt</li>
                  <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}>
  <path d="M4 12.5l5 5L20 6.5"></path>
</svg>eine Zusammenarbeit, bei der Ihre eigene Initiative entscheidend ist</li>
                </ul>
              </div>
              <div className="rv" style={{ borderTop: "1px solid #D9CFBB", paddingTop: "24px" }}>
                <h3 style={{ margin: "0 0 14px", fontSize: "15px", fontWeight: "600", letterSpacing: ".04em", color: "#163A5F" }}>Coaching ist nicht</h3>
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "15.5px", color: "#2B3644" }}>
                  <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5563" strokeWidth="1.6" strokeLinecap="round" style={{ marginTop: "5px" }}>
  <path d="M6 6l12 12M18 6L6 18"></path>
</svg>eine Garantie für eine Lehrstelle oder einen Ausbildungsplatz</li>
                  <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5563" strokeWidth="1.6" strokeLinecap="round" style={{ marginTop: "5px" }}>
  <path d="M6 6l12 12M18 6L6 18"></path>
</svg>ein Ersatz für psychologische, therapeutische oder medizinische Behandlung</li>
                  <li style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: "10px" }}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5563" strokeWidth="1.6" strokeLinecap="round" style={{ marginTop: "5px" }}>
  <path d="M6 6l12 12M18 6L6 18"></path>
</svg>eine Rechtsberatung, etwa zu Lehrverträgen</li>
                </ul>
              </div>
            </div>
            <div className="rv" style={{ marginTop: "clamp(40px, 5vw, 64px)", background: "#163A5F", color: "#FFFFFF", padding: "clamp(28px, 4vw, 44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "20px 48px", alignItems: "start", position: "relative" }}>
              <div aria-hidden="true" style={{ position: "absolute", inset: "12px", border: "1px solid rgba(212,160,23,.25)", pointerEvents: "none" }}></div>
              <div style={{ position: "relative" }}>
                <div className="eyebrow" style={{ color: "#D4A017", fontSize: "11px" }}>Unter 18 Jahren</div>
                <h3 className="serif" style={{ margin: "10px 0 0", fontSize: "30px", fontWeight: "500", lineHeight: "1.15", color: "#FAF9F5" }}>Einwilligung der Erziehungsberechtigten – in Klärung</h3>
              </div>
              <p style={{ margin: "0", fontSize: "15.5px", color: "#DCE3EB", position: "relative" }}><b style={{ color: "#D4A017" }}>Vorläufiger Hinweis.</b> Sie können die Anfrage selbst stellen. Ob und in welcher Form für Jugendliche unter 18 Jahren eine Einwilligung der Erziehungsberechtigten nötig ist, wird derzeit festgelegt.</p>
            </div>
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
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Wie viele Termine braucht es?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Das hängt von Ihrer Situation und Ihren Zielen ab. Im Erstgespräch besprechen wir, welcher Umfang sinnvoll ist.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Finde ich durch das Coaching sicher eine Lehrstelle?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Eine Garantie gibt es nicht. Das Coaching unterstützt Sie dabei, gut vorbereitet und gezielt vorzugehen. Der Erfolg hängt wesentlich von Ihrer eigenen Initiative ab.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>In welcher Sprache findet das Coaching statt?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Wahlweise auf Deutsch, Arabisch oder Aramäisch. Bewerbungsunterlagen für Schweizer Betriebe entstehen auf Deutsch.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Ich bin noch nicht 18 Jahre alt. Was muss ich beachten?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 26px 0", fontSize: "15.5px", color: "#2B3644" }}>Sie stellen die Anfrage selbst. Die Regelung zur Einwilligung der Erziehungsberechtigten wird derzeit festgelegt (vorläufiger Hinweis).</div>
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
              <Link className="svc rv" href="/dolmetschen">
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#8A6508" }}>III.</span>
                <span className="serif" style={{ fontSize: "30px", fontWeight: "600", lineHeight: "1.12" }}>Dolmetschen &amp; Sprachhilfe</span>
                <span style={{ fontSize: "15px", color: "#2B3644" }}>Verständigung auf Arabisch und Aramäisch – zum Beispiel bei Elterngesprächen.</span>
                <span className="tl">Mehr erfahren →</span>
              </Link>
            </div>
          </div>
        </section>
        <section id="anfrage" aria-labelledby="cta-title" style={{ background: "#F3EEE4", padding: "clamp(88px, 11vw, 150px) 0", position: "relative", overflow: "hidden", borderTop: "1px solid #E4DCCB" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "0", width: "1px", height: "72px", background: "linear-gradient(#D4A017, rgba(212,160,23,0))" }}></div>
          <div className="wrap rv" style={{ maxWidth: "920px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            <div className="eyebrow" style={{ color: "#8A6508" }}>Anfrage &amp; Termin</div>
            <h2 id="cta-title" className="serif" style={{ margin: "0", fontSize: "clamp(42px, 5.4vw, 72px)", lineHeight: "1.04", fontWeight: "500", color: "#163A5F" }}>Der erste Schritt <span style={{ fontStyle: "italic", color: "#8A6508" }}>zählt.</span></h2>
            <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em" }}>Erzählen Sie in der Online-Anfrage, wo Sie stehen und was Sie erreichen möchten. Im Erstgespräch planen wir die nächsten Schritte.</p>
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
