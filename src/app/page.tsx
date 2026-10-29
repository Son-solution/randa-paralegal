import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import SiteShell from "@/components/layout/SiteShell";
import LuxuryOrnaments from "@/components/ui/LuxuryOrnaments";
import ContactValue from "@/components/ui/ContactValue";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

// Content ported 1:1 from the approved prototype (Main).
export const metadata: Metadata = {
  description: "Administrative Unterstützung, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch in Zürich und Umgebung – verständlich, nahbar und strukturiert. Keine Rechtsberatung.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    ...baseOpenGraph,
    url: "/",
    description: "Administrative Unterstützung, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch in Zürich und Umgebung – verständlich, nahbar und strukturiert. Keine Rechtsberatung."
  }
};

export default function HomePage() {
  return (
    <SiteShell page="home">
      <JsonLd page="home" />
      <main id="start">
        <section className="lux-host" aria-labelledby="hero-title" style={{ position: "relative", padding: "clamp(56px, 8vw, 112px) 0 clamp(72px, 9vw, 128px)" }}>
          <LuxuryOrnaments />
          <div className="wrap hero-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "28px", position: "relative", zIndex: "2" }}>
              {/* Main heading per briefing: the business name. The large slogan below keeps its look as the visual headline. */}
              <h1 id="hero-title" className="in eyebrow" style={{ "--d": ".1s", margin: "0", color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" } as CSSProperties}>
                <span className="hair" aria-hidden="true" style={{ "--d": ".2s", display: "inline-block", width: "40px", height: "1px", background: "#D4A017" } as CSSProperties}></span>
                <span>Randa Paralegal Services · Zürich</span>
              </h1>
              <p className="serif" style={{ margin: "0", fontSize: "clamp(46px, 6.2vw, 88px)", lineHeight: "1.02", fontWeight: "500", color: "#163A5F", letterSpacing: "-.01em" }}>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: ".06em" }}>
                  <span className="ln" style={{ "--d": ".25s", display: "block" } as CSSProperties}>Verstehen.</span>
                </span>
                {" "}
                <span style={{ display: "block", overflow: "hidden", paddingBottom: ".06em" }}>
                  <span className="ln" style={{ "--d": ".4s", display: "block" } as CSSProperties}>Begleiten.</span>
                </span>
                {" "}
                <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                  <span className="ln" style={{ "--d": ".55s", display: "block", fontStyle: "italic", color: "#0E1A28" } as CSSProperties}>Zukunft gestalten.</span>
                </span>
              </p>
              <p className="in" style={{ "--d": ".8s", margin: "0", fontSize: "15px", fontWeight: "600", letterSpacing: ".04em", color: "#163A5F", lineHeight: "1.6" } as CSSProperties}>Administrative Unterstützung · Jugendcoaching · Dolmetschen auf Arabisch und Aramäisch – in Zürich und Umgebung.</p>
              <p className="in" style={{ "--d": ".9s", margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em", textWrap: "pretty" } as CSSProperties}>Ich unterstütze Privatpersonen, Familien und Jugendliche mit Migrationshintergrund bei administrativen Orientierungsfragen, bei der beruflichen Zukunftsplanung und überall dort, wo Sprache zur Hürde wird – verständlich, nahbar und strukturiert.</p>
              <div className="in" style={{ "--d": "1.05s", display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "8px" } as CSSProperties}>
                <Link className="btn btn-navy" href="/anfrage">Jetzt Erstgespräch vereinbaren <span className="arr" aria-hidden="true">→</span></Link>
                <a className="btn btn-line" href="#leistungen">Leistungen ansehen</a>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div className="unveil" style={{ position: "relative", overflow: "hidden", aspectRatio: "5 / 5.4", background: "#E8E1D2" }}>
                <Image src="/images/hero.jpg" alt="Helles Büro mit Blick über die Altstadt von Zürich und den See (Symbolbild)" fill className="drift" sizes="(max-width: 980px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "38% 50%" }} priority />
                {" "}
                <span style={{ position: "absolute", left: "14px", bottom: "12px", fontSize: "10.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "3px 8px" }}>Symbolbild</span>
              </div>
              <div className="hframe" aria-hidden="true" style={{ position: "absolute", top: "-18px", right: "-18px", width: "42%", height: "46%", borderTop: "1px solid #D4A017", borderRight: "1px solid #D4A017", pointerEvents: "none" }}></div>
              <div className="hero-float in" style={{ "--d": "1.3s", position: "absolute", left: "-56px", bottom: "-48px", maxWidth: "330px", background: "#163A5F", color: "#FFFFFF", padding: "28px 30px", boxShadow: "0 30px 60px -30px rgba(14,26,40,.6)" } as CSSProperties}>
                <div className="eyebrow" style={{ color: "#D4A017", fontSize: "11px" }}>Termine</div>
                <p className="serif" style={{ margin: "8px 0 0", fontSize: "24px", lineHeight: "1.25", fontWeight: "500" }}>Online über Google Meet oder persönlich in Zürich und Umgebung.</p>
                <p style={{ margin: "12px 0 0", fontSize: "13px", color: "#C9D3DE" }}>45 Minuten · eine Anfrage, auch für mehrere Anliegen</p>
              </div>
            </div>
          </div>
        </section>
        <section id="leistungen" aria-labelledby="leistungen-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0", borderTop: "1px solid #ECE6D8" }}>
          <div className="wrap">
            <div className="rv split" style={{ alignItems: "end", marginBottom: "clamp(48px, 6vw, 80px)" }}>
              <div>
                <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>01 — Leistungen</div>
                <h2 id="leistungen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 60px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Drei Bereiche. Eine Ansprechperson.</h2>
              </div>
              <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "36em", textWrap: "pretty" }}>Verwaltung, Ausbildung und Sprache hängen im Alltag oft zusammen. Deshalb können Sie mich für einen einzelnen Bereich beauftragen – oder mehrere Anliegen in einer Anfrage verbinden.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
              <article className="card rv" style={{ background: "#FAF9F5", display: "flex", flexDirection: "column", border: "1px solid #ECE6D8" }}>
                <div className="ph" style={{ position: "relative", aspectRatio: "4 / 3" }}>
                  <Image src="/images/administrative.jpg" alt="Hände füllen am Schreibtisch ein Formular aus (Symbolbild)" fill sizes="(max-width: 980px) 100vw, 400px" style={{ objectFit: "cover", objectPosition: "60% 50%" }} />
                  {" "}
                  <span style={{ position: "absolute", left: "12px", bottom: "10px", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "2px 7px" }}>Symbolbild</span>
                </div>
                <div style={{ padding: "34px 32px 36px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: "1" }}>
                  <div className="serif" aria-hidden="true" style={{ fontSize: "22px", color: "#8A6508", fontStyle: "italic" }}>I.</div>
                  <h3 className="serif" style={{ margin: "0", fontSize: "31px", lineHeight: "1.12", fontWeight: "600", color: "#163A5F" }}>Administrative Unterstützung</h3>
                  <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Struktur in Behörden- und Formularangelegenheiten. Ich helfe Ihnen, Schreiben, Dokumente und Anträge zu verstehen und korrekt zu erledigen.</p>
                  <ul style={{ margin: "4px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", color: "#2B3644" }}>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Formulare und Anträge ausfüllen</li>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Behördliche Briefe verständlich erklärt</li>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Allgemeinen Schriftverkehr erstellen</li>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Persönliche Unterlagen ordnen</li>
                  </ul>
                  <div style={{ marginTop: "auto", paddingTop: "18px", borderTop: "1px solid #E4DCCB", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "12.5px", color: "#4A5563" }}>Ohne Rechtsberatung</span>
                    <Link className="tlink" href="/administrative-unterstuetzung" aria-label="Mehr erfahren über Administrative Unterstützung">Mehr erfahren <span aria-hidden="true">→</span></Link>
                  </div>
                </div>
              </article>
              <article className="card rv" style={{ background: "#FAF9F5", display: "flex", flexDirection: "column", border: "1px solid #ECE6D8" }}>
                <div className="ph" style={{ position: "relative", aspectRatio: "4 / 3" }}>
                  <Image src="/images/jugendcoaching.jpg" alt="Gespräch mit einem Jugendlichen über Berufswahl (Symbolbild)" fill sizes="(max-width: 980px) 100vw, 400px" style={{ objectFit: "cover", objectPosition: "50% 40%" }} />
                  {" "}
                  <span style={{ position: "absolute", left: "12px", bottom: "10px", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "2px 7px" }}>Symbolbild</span>
                </div>
                <div style={{ padding: "34px 32px 36px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: "1" }}>
                  <div className="serif" aria-hidden="true" style={{ fontSize: "22px", color: "#8A6508", fontStyle: "italic" }}>II.</div>
                  <h3 className="serif" style={{ margin: "0", fontSize: "31px", lineHeight: "1.12", fontWeight: "600", color: "#163A5F" }}>Jugendcoaching &amp; Berufsorientierung</h3>
                  <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Schritt für Schritt in die berufliche Zukunft – individuell, stärkenorientiert und mit Blick auf das Schweizer Bildungssystem.</p>
                  <ul style={{ margin: "4px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", color: "#2B3644" }}>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Stärken, Interessen und passende Berufsfelder</li>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Lebenslauf und Motivationsschreiben</li>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Schnupperlehren, Praktika und Lehrstellensuche</li>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Vorbereitung auf Vorstellungsgespräche</li>
                  </ul>
                  <div style={{ marginTop: "auto", paddingTop: "18px", borderTop: "1px solid #E4DCCB", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "12.5px", color: "#4A5563" }}>Deutsch · Arabisch · Aramäisch</span>
                    <Link className="tlink" href="/jugendcoaching" aria-label="Mehr erfahren über Jugendcoaching und Berufsorientierung">Mehr erfahren <span aria-hidden="true">→</span></Link>
                  </div>
                </div>
              </article>
              <article className="card rv" style={{ background: "#FAF9F5", display: "flex", flexDirection: "column", border: "1px solid #ECE6D8" }}>
                <div className="ph" style={{ position: "relative", aspectRatio: "4 / 3" }}>
                  <Image src="/images/dolmetschen.jpg" alt="Zwei Frauen im Gespräch an einem Besprechungstisch (Symbolbild)" fill sizes="(max-width: 980px) 100vw, 400px" style={{ objectFit: "cover", objectPosition: "55% 45%" }} />
                  {" "}
                  <span style={{ position: "absolute", left: "12px", bottom: "10px", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "2px 7px" }}>Symbolbild</span>
                </div>
                <div style={{ padding: "34px 32px 36px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: "1" }}>
                  <div className="serif" aria-hidden="true" style={{ fontSize: "22px", color: "#8A6508", fontStyle: "italic" }}>III.</div>
                  <h3 className="serif" style={{ margin: "0", fontSize: "31px", lineHeight: "1.12", fontWeight: "600", color: "#163A5F" }}>Dolmetschen &amp; Sprachhilfe</h3>
                  <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Verständigung auf Arabisch und Aramäisch – damit wichtige Gespräche und Schreiben nicht an der Sprache scheitern.</p>
                  <ul style={{ margin: "4px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", color: "#2B3644" }}>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Begleitung zu Behörden, Schulen und Sozialdiensten</li>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Elterngespräche und Termine zur Ausbildung</li>
                    <li style={{ display: "flex", gap: "12px" }}><span aria-hidden="true" style={{ color: "#D4A017" }}>—</span>Übersetzung einfacher Briefe, Mitteilungen und Formulare</li>
                  </ul>
                  <div style={{ marginTop: "auto", paddingTop: "18px", borderTop: "1px solid #E4DCCB", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "12.5px", color: "#4A5563" }}>Reine Sprachmittlung</span>
                    <Link className="tlink" href="/dolmetschen" aria-label="Mehr erfahren über Dolmetschen und Sprachhilfe">Mehr erfahren <span aria-hidden="true">→</span></Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section aria-labelledby="grenzen-title" style={{ background: "#163A5F", color: "#FFFFFF", padding: "clamp(72px, 9vw, 120px) 0", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: "24px", border: "1px solid rgba(212,160,23,.22)", pointerEvents: "none" }}></div>
          <div className="wrap split" style={{ position: "relative" }}>
            <div className="rv">
              <div className="eyebrow" style={{ color: "#D4A017" }}>02 — Transparenz</div>
              <h2 id="grenzen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(36px, 4vw, 54px)", lineHeight: "1.1", fontWeight: "500" }}>Klarheit beginnt mit ehrlichen Grenzen.</h2>
              <p style={{ margin: "22px 0 0", fontSize: "16.5px", fontWeight: "300", color: "#DCE3EB", maxWidth: "30em" }}>Meine Arbeit ist administrative, organisatorische und sprachliche Unterstützung. Damit Sie von Anfang an wissen, was Sie erwarten dürfen – und was nicht.</p>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "grid", gridTemplateColumns: "56px minmax(0, 1fr)", gap: "20px", padding: "26px 0", borderTop: "1px solid rgba(255,255,255,.18)" }}>
                <span className="serif" aria-hidden="true" style={{ fontSize: "30px", color: "#D4A017", lineHeight: "1" }}>§</span>
                <div>
                  <h3 style={{ margin: "0", fontSize: "16px", fontWeight: "600", letterSpacing: ".02em" }}>Keine Rechtsberatung</h3>
                  <p style={{ margin: "6px 0 0", fontSize: "15px", color: "#C9D3DE" }}>Meine Unterstützung ersetzt keine anwaltliche Konsultation.</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "56px minmax(0, 1fr)", gap: "20px", padding: "26px 0", borderTop: "1px solid rgba(255,255,255,.18)" }}>
                <span className="serif" aria-hidden="true" style={{ fontSize: "30px", color: "#D4A017", lineHeight: "1" }}>⁂</span>
                <div>
                  <h3 style={{ margin: "0", fontSize: "16px", fontWeight: "600", letterSpacing: ".02em" }}>Keine rechtliche Vertretung</h3>
                  <p style={{ margin: "6px 0 0", fontSize: "15px", color: "#C9D3DE" }}>Ich vertrete Sie nicht vor Gerichten oder Behörden. Beim Dolmetschen übernehme ich ausschliesslich die Sprachmittlung.</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "56px minmax(0, 1fr)", gap: "20px", padding: "26px 0", borderTop: "1px solid rgba(255,255,255,.18)", borderBottom: "1px solid rgba(255,255,255,.18)" }}>
                <span className="serif" aria-hidden="true" style={{ fontSize: "30px", color: "#D4A017", lineHeight: "1" }}>◦</span>
                <div>
                  <h3 style={{ margin: "0", fontSize: "16px", fontWeight: "600", letterSpacing: ".02em" }}>Kein Ersatz für Therapie</h3>
                  <p style={{ margin: "6px 0 0", fontSize: "15px", color: "#C9D3DE" }}>Coaching ist ein unterstützender Prozess und ersetzt keine psychologische, therapeutische oder medizinische Behandlung.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="fuerwen-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap">
            <div className="rv" style={{ maxWidth: "760px", marginBottom: "clamp(44px, 5vw, 72px)" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>03 — Für wen</div>
              <h2 id="fuerwen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 60px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Für Menschen, die in Zürich ankommen, weitergehen oder verstanden werden möchten.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "0", borderTop: "1px solid #D9CFBB" }}>
              <div className="rv" style={{ padding: "32px 28px 36px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span className="serif" style={{ fontSize: "18px", color: "#8A6508", fontStyle: "italic" }}>Privatpersonen</span>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>die im Schweizer Behördenalltag den Überblick behalten und Schreiben sicher erledigen möchten.</p>
              </div>
              <div className="rv" style={{ padding: "32px 28px 36px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span className="serif" style={{ fontSize: "18px", color: "#8A6508", fontStyle: "italic" }}>Familien</span>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>mit Migrationshintergrund, die Unterstützung bei Sprache, Unterlagen und wichtigen Terminen suchen.</p>
              </div>
              <div className="rv" style={{ padding: "32px 28px 36px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span className="serif" style={{ fontSize: "18px", color: "#8A6508", fontStyle: "italic" }}>Jugendliche</span>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>die ihren Weg in Lehre, Ausbildung und Beruf finden und dabei an Selbstvertrauen gewinnen möchten.</p>
              </div>
              <div className="rv" style={{ padding: "32px 28px 36px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span className="serif" style={{ fontSize: "18px", color: "#8A6508", fontStyle: "italic" }}>Schulen &amp; Institutionen</span>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>die für Gespräche mit Familien eine Sprachmittlung auf Arabisch oder Aramäisch benötigen.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="ueber-mich" aria-labelledby="about-title" style={{ background: "#F3EEE4", padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap split" style={{ alignItems: "center" }}>
            <div className="rv" style={{ position: "relative" }}>
              <div role="img" aria-label="Platzhalter für ein Porträt von Randa Kale" style={{ aspectRatio: "4 / 5", background: "#163A5F", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: "16px", border: "1px solid rgba(212,160,23,.55)" }}></div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", padding: "32px" }}>
                  <span className="serif" style={{ fontSize: "64px", lineHeight: "1", color: "#D4A017", fontWeight: "500", letterSpacing: ".06em" }}>RK</span>
                  <span className="eyebrow" style={{ color: "#E9E3D6", fontSize: "11px" }}>Porträt Randa Kale</span>
                  <span style={{ fontSize: "13px", color: "#C9D3DE" }}>[Foto folgt]</span>
                </div>
              </div>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>04 — Über mich</div>
              <h2 id="about-title" className="serif" style={{ margin: "0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Eine Ansprechperson für Sprache, Verwaltung und Zukunftsfragen.</h2>
              <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", textWrap: "pretty" }}>Mein Name ist Randa Kale. Mit Randa Paralegal Services begleite ich Privatpersonen, Familien und Jugendliche im Raum Zürich – verständlich, nahbar und strukturiert.</p>
              <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", textWrap: "pretty" }}>Mein Angebot verbindet administrative Unterstützung, Jugendcoaching und Sprachmittlung auf Arabisch und Aramäisch aus einer Hand. So erklären Sie Ihr Anliegen nur einmal – und behalten den Überblick.</p>
              <p style={{ margin: "0", padding: "14px 18px", border: "1px dashed #B9A06A", fontSize: "13.5px", color: "#5A4A20", background: "rgba(255,255,255,.5)" }}>[Kurzbiografie, Ausbildung und Qualifikationen von Randa Kale folgen.]</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".12em", textTransform: "uppercase", color: "#163A5F", border: "1px solid rgba(22,58,95,.3)", padding: "8px 14px" }}>Deutsch</span>
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".12em", textTransform: "uppercase", color: "#163A5F", border: "1px solid rgba(22,58,95,.3)", padding: "8px 14px" }}>Arabisch</span>
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: ".12em", textTransform: "uppercase", color: "#163A5F", border: "1px solid rgba(22,58,95,.3)", padding: "8px 14px" }}>Aramäisch</span>
              </div>
              <div>
                <Link className="tlink" href="/ueber-mich">Mehr über mich <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="ablauf-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap split-r">
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>05 — Arbeitsweise</div>
              <h2 id="ablauf-title" className="serif" style={{ margin: "18px 0 40px", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>So arbeiten wir zusammen.</h2>
              <ol style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column" }}>
                <li style={{ display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", gap: "16px", padding: "26px 0", borderTop: "1px solid #E4DCCB" }}>
                  <span className="serif" style={{ fontSize: "40px", lineHeight: "1", color: "#D4A017", fontWeight: "500" }}>01</span>
                  <div>
                    <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "600", color: "#163A5F" }}>Anfrage stellen</h3>
                    <p style={{ margin: "6px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Beschreiben Sie Ihr Anliegen im Online-Formular. Sie können mehrere Leistungen in einer einzigen Anfrage kombinieren und Unterlagen beilegen.</p>
                  </div>
                </li>
                <li style={{ display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", gap: "16px", padding: "26px 0", borderTop: "1px solid #E4DCCB" }}>
                  <span className="serif" style={{ fontSize: "40px", lineHeight: "1", color: "#D4A017", fontWeight: "500" }}>02</span>
                  <div>
                    <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "600", color: "#163A5F" }}>Erstgespräch</h3>
                    <p style={{ margin: "6px 0 0", fontSize: "15.5px", color: "#2B3644" }}>In 45 Minuten – online über Google Meet oder persönlich in Zürich und Umgebung – klären wir gemeinsam Ihre Situation.</p>
                  </div>
                </li>
                <li style={{ display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", gap: "16px", padding: "26px 0", borderTop: "1px solid #E4DCCB" }}>
                  <span className="serif" style={{ fontSize: "40px", lineHeight: "1", color: "#D4A017", fontWeight: "500" }}>03</span>
                  <div>
                    <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "600", color: "#163A5F" }}>Klare nächste Schritte</h3>
                    <p style={{ margin: "6px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Sie wissen danach, welche Schritte sinnvoll sind, welche Unterlagen es braucht und wie die Unterstützung abläuft.</p>
                  </div>
                </li>
                <li style={{ display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", gap: "16px", padding: "26px 0", borderTop: "1px solid #E4DCCB", borderBottom: "1px solid #E4DCCB" }}>
                  <span className="serif" style={{ fontSize: "40px", lineHeight: "1", color: "#D4A017", fontWeight: "500" }}>04</span>
                  <div>
                    <h3 style={{ margin: "0", fontSize: "17px", fontWeight: "600", color: "#163A5F" }}>Begleitung</h3>
                    <p style={{ margin: "6px 0 0", fontSize: "15.5px", color: "#2B3644" }}>Ich unterstütze Sie bei der Umsetzung – beim Schriftverkehr, im Coaching oder als Dolmetscherin im Gespräch.</p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="rv order-first-m" style={{ position: "relative" }}>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 5.4" }}>
                <Image src="/images/about.jpg" alt="Frau arbeitet an einem Schreibtisch mit Blick auf Zürich (Symbolbild)" fill className="drift" sizes="(max-width: 980px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "50% 40%" }} />
                {" "}
                <span style={{ position: "absolute", left: "12px", bottom: "10px", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "2px 7px" }}>Symbolbild</span>
              </div>
              <div aria-hidden="true" style={{ position: "absolute", left: "-18px", bottom: "-18px", width: "46%", height: "40%", borderLeft: "1px solid #D4A017", borderBottom: "1px solid #D4A017", pointerEvents: "none" }}></div>
            </div>
          </div>
        </section>
        <section aria-labelledby="termin-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap">
            <div className="rv split" style={{ alignItems: "end", marginBottom: "clamp(44px, 5vw, 64px)" }}>
              <div>
                <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>06 — Termine</div>
                <h2 id="termin-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Online oder persönlich – wie es für Sie passt.</h2>
              </div>
              <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em" }}>Einen Termin wählen Sie auf Wunsch direkt beim Ausfüllen Ihrer Anfrage. Auch wenn Sie mehrere Leistungen benötigen, genügt ein gemeinsames Gespräch.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: "clamp(20px, 3vw, 32px)" }}>
              <div className="card rv" style={{ background: "#FFFFFF", border: "1px solid #ECE6D8", padding: "40px 36px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <svg aria-hidden="true" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="5" width="14" height="12" rx="1.5"></rect>
                  <path d="M16.5 10l5-3v10l-5-3"></path>
                </svg>
                <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", color: "#163A5F" }}>Online-Termin</h3>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Per Google Meet, bequem von zu Hause aus. Den Link erhalten Sie zusammen mit der Terminbestätigung.</p>
              </div>
              <div className="card rv" style={{ background: "#FFFFFF", border: "1px solid #ECE6D8", padding: "40px 36px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <svg aria-hidden="true" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"></path>
                  <circle cx="12" cy="9.5" r="2.5"></circle>
                </svg>
                <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", color: "#163A5F" }}>Persönlicher Termin</h3>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>In Zürich und Umgebung. Den genauen Treffpunkt vereinbaren wir individuell nach Ihrer Anfrage.</p>
              </div>
            </div>
            <dl className="rv" style={{ margin: "clamp(28px, 4vw, 44px) 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "0", borderTop: "1px solid #D9CFBB", borderBottom: "1px solid #D9CFBB" }}>
              <div style={{ padding: "22px 20px 22px 0" }}>
                <dt className="eyebrow" style={{ color: "#4A5563", fontSize: "11px" }}>Dauer</dt>
                <dd className="serif" style={{ margin: "6px 0 0", fontSize: "24px", color: "#163A5F", fontWeight: "500" }}>45 Minuten</dd>
              </div>
              <div style={{ padding: "22px 20px 22px 0" }}>
                <dt className="eyebrow" style={{ color: "#4A5563", fontSize: "11px" }}>Mehrere Anliegen</dt>
                <dd className="serif" style={{ margin: "6px 0 0", fontSize: "24px", color: "#163A5F", fontWeight: "500" }}>Ein gemeinsames Gespräch</dd>
              </div>
              <div style={{ padding: "22px 20px 22px 0" }}>
                <dt className="eyebrow" style={{ color: "#4A5563", fontSize: "11px" }}>Verfügbarkeit</dt>
                <dd className="serif" style={{ margin: "6px 0 0", fontSize: "24px", color: "#163A5F", fontWeight: "500" }}>Freie Termine bei der Anfrage</dd>
              </div>
            </dl>
          </div>
        </section>
        <section id="faq" aria-labelledby="faq-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0", borderTop: "1px solid #ECE6D8" }}>
          <div className="wrap split">
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>07 — Häufige Fragen</div>
              <h2 id="faq-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Gut zu wissen.</h2>
              <p style={{ margin: "20px 0 0", fontSize: "16px", fontWeight: "300", color: "#2B3644", maxWidth: "26em" }}>Ihre Frage ist nicht dabei? Stellen Sie sie einfach direkt in Ihrer Anfrage.</p>
            </div>
            <div className="faq rv" style={{ borderTop: "1px solid #D9CFBB" }}>
              <details style={{ borderBottom: "1px solid #D9CFBB" }} open>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "26px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Bieten Sie Rechtsberatung an?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 28px 0", fontSize: "15.5px", color: "#2B3644" }}>Nein. Ich biete administrative und organisatorische Unterstützung, Coaching und Sprachmittlung an. Ich erteile keine Rechtsberatung und vertrete Sie nicht vor Gerichten oder Behörden. Wenn Ihr Anliegen eine rechtliche Einschätzung erfordert, sage ich Ihnen das offen.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "26px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Kann ich mehrere Leistungen in einer Anfrage kombinieren?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 28px 0", fontSize: "15.5px", color: "#2B3644" }}>Ja. Sie wählen im Formular alle Bereiche aus, die Sie betreffen, und beantworten nur die dazu passenden Fragen. Für eine kombinierte Anfrage reicht ein gemeinsames Erstgespräch von 45 Minuten.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "26px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>In welchen Sprachen kann ich mit Ihnen sprechen?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 28px 0", fontSize: "15.5px", color: "#2B3644" }}>Auf Deutsch, Arabisch oder Aramäisch. Auch das Jugendcoaching ist in allen drei Sprachen möglich.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "26px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Ich bin noch nicht 18 Jahre alt. Kann ich mich selbst für das Jugendcoaching anmelden?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 28px 0", fontSize: "15.5px", color: "#2B3644" }}>Ja, Sie können die Anfrage selbst stellen. Ob und in welcher Form für Jugendliche unter 18 Jahren die Einwilligung einer erziehungsberechtigten Person nötig ist, wird derzeit festgelegt (vorläufiger Hinweis).</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "26px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Welche Dokumente übersetzen Sie?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 28px 0", fontSize: "15.5px", color: "#2B3644" }}>Einfache Dokumente wie Briefe, Mitteilungen und Formulare, zwischen Deutsch und Arabisch oder Aramäisch. Die Übersetzung dient dem Verständnis und erfolgt nach bestem Wissen und Gewissen.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "26px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Was soll ich zum ersten Gespräch mitbringen?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 28px 0", fontSize: "15.5px", color: "#2B3644" }}>Alle Schreiben, Formulare oder Unterlagen, um die es geht – und wichtige Fristen. Vieles können Sie bereits mit Ihrer Anfrage hochladen, damit ich mich gut vorbereiten kann.</div>
              </details>
              <details style={{ borderBottom: "1px solid #D9CFBB" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "26px 0", minHeight: "44px" }}>
                  <span className="q serif" style={{ fontSize: "24px", lineHeight: "1.25", fontWeight: "600", color: "#163A5F", transition: "color .3s" }}>Was geschieht mit meinen Angaben und Dokumenten?</span>
                  <span className="pm" aria-hidden="true" style={{ fontSize: "26px", color: "#8A6508", lineHeight: "1", fontWeight: "300" }}>+</span>
                </summary>
                <div className="ans" style={{ padding: "0 48px 28px 0", fontSize: "15.5px", color: "#2B3644" }}>Senden Sie nur die Unterlagen, die für Ihr Anliegen nötig sind. Wie Ihre Daten bearbeitet, gespeichert und gelöscht werden, erklärt die Datenschutzerklärung.</div>
              </details>
            </div>
          </div>
        </section>
        <section className="lux-host" id="anfrage" aria-labelledby="cta-title" style={{ background: "#F3EEE4", padding: "clamp(88px, 11vw, 150px) 0", position: "relative", overflow: "hidden", borderTop: "1px solid #E4DCCB" }}>
          <LuxuryOrnaments />
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "0", width: "1px", height: "72px", background: "linear-gradient(#D4A017, rgba(212,160,23,0))" }}></div>
          <div className="wrap rv" style={{ maxWidth: "920px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            <div className="eyebrow" style={{ color: "#8A6508" }}>Anfrage &amp; Termin</div>
            <h2 id="cta-title" className="serif" style={{ margin: "0", fontSize: "clamp(42px, 5.4vw, 76px)", lineHeight: "1.04", fontWeight: "500", color: "#163A5F" }}>Erzählen Sie mir, <span style={{ fontStyle: "italic", color: "#8A6508" }}>worum es geht.</span></h2>
            <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "36em" }}>Stellen Sie Ihre Anfrage online – in wenigen Schritten, mit Ihren Unterlagen und auf Wunsch direkt mit Terminwahl. Sie können Ihren Entwurf speichern und später weiterführen.</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", marginTop: "10px" }}>
              <Link className="btn btn-navy" href="/anfrage" aria-describedby="cta-proto">Anfrage starten <span className="arr" aria-hidden="true">→</span></Link>
              <WhatsAppCta className="btn btn-line" describedBy="cta-proto" />
            </div>
            {site.showDemoNotices ? (
              <p id="cta-proto" style={{ margin: "0", fontSize: "12px", color: "#4A5563" }}>Prototyp: Das Anfrageformular ist eine Demo ohne Datenübermittlung; WhatsApp wird später verbunden.</p>
            ) : null}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 36px", marginTop: "18px", paddingTop: "26px", borderTop: "1px solid #D9CFBB", fontSize: "14px", color: "#2B3644" }}>
              <span>Telefon <ContactValue kind="phone" /></span>
              <span>E-Mail <ContactValue kind="email" /></span>
              <span>Zürich und Umgebung</span>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
