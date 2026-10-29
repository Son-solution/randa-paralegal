import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import SiteShell from "@/components/layout/SiteShell";
import LuxuryOrnaments from "@/components/ui/LuxuryOrnaments";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { site } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";

// Content ported 1:1 from the approved prototype (Ueber-mich).
export const metadata: Metadata = {
  description: "Randa Kale begleitet Privatpersonen, Familien und Jugendliche im Raum Zürich: administrative Unterstützung, Jugendcoaching und Sprachmittlung auf Arabisch und Aramäisch.",
  alternates: {
    canonical: "/ueber-mich"
  },
  openGraph: {
    ...baseOpenGraph,
    url: "/ueber-mich",
    description: "Randa Kale begleitet Privatpersonen, Familien und Jugendliche im Raum Zürich: administrative Unterstützung, Jugendcoaching und Sprachmittlung auf Arabisch und Aramäisch.",
    title: "Über mich – Randa Kale"
  },
  title: "Über mich – Randa Kale"
};

export default function AboutPage() {
  return (
    <SiteShell page="about">
      <main>
        <section className="lux-host" aria-labelledby="page-title" style={{ padding: "clamp(36px, 5vw, 56px) 0 clamp(72px, 9vw, 120px)" }}>
          <LuxuryOrnaments />
          <div className="wrap">
            <nav aria-label="Brotkrümelnavigation" style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}>
              <ol className="crumb">
                <li>
                  <Link href="/">Startseite</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: "#163A5F" }}>Über mich</li>
              </ol>
            </nav>
            <div className="hero2">
              <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
                <div className="in eyebrow" style={{ "--d": ".05s", color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" } as CSSProperties}><span className="hair" aria-hidden="true" style={{ "--d": ".15s", display: "inline-block", width: "40px", height: "1px", background: "#D4A017" } as CSSProperties}></span>Über mich</div>
                <h1 id="page-title" className="serif" style={{ margin: "0", fontSize: "clamp(54px, 7.4vw, 104px)", lineHeight: ".98", fontWeight: "500", color: "#163A5F", letterSpacing: "-.01em" }}>
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".06em" }}>
                    <span className="ln" style={{ "--d": ".2s", display: "block" } as CSSProperties}>Randa</span>
                  </span>
                  {" "}
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                    <span className="ln" style={{ "--d": ".35s", display: "block", fontStyle: "italic", color: "#0E1A28" } as CSSProperties}>Kale</span>
                  </span>
                </h1>
                <p className="in serif" style={{ "--d": ".6s", margin: "0", fontSize: "clamp(24px, 2.4vw, 32px)", lineHeight: "1.3", color: "#163A5F", fontWeight: "500", maxWidth: "22em" } as CSSProperties}>Ihre Bridge-Builderin zwischen Sprachen, Behörden und Ihrer beruflichen Zukunft.</p>
              </div>
              <div className="in" style={{ "--d": ".4s", position: "relative" } as CSSProperties}>
                <div role="img" aria-label="Platzhalter für ein Porträt von Randa Kale" style={{ aspectRatio: "4 / 5", background: "#163A5F", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <div aria-hidden="true" style={{ position: "absolute", inset: "18px", border: "1px solid rgba(212,160,23,.55)" }}></div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", padding: "32px" }}>
                    <span className="serif" style={{ fontSize: "76px", lineHeight: "1", color: "#D4A017", fontWeight: "500", letterSpacing: ".06em" }}>RK</span>
                    <span className="eyebrow" style={{ color: "#E9E3D6", fontSize: "11px" }}>Porträt Randa Kale</span>
                    <span style={{ fontSize: "13px", color: "#C9D3DE" }}>[Professionelles Porträtfoto folgt]</span>
                  </div>
                </div>
                <div className="pframe" aria-hidden="true" style={{ position: "absolute", top: "-18px", right: "-18px", width: "44%", height: "40%", borderTop: "1px solid #D4A017", borderRight: "1px solid #D4A017", pointerEvents: "none" }}></div>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="willkommen-title" style={{ padding: "0 0 clamp(80px, 10vw, 140px)" }}>
          <div className="wrap split">
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Willkommen</div>
              <h2 id="willkommen-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Schön, dass Sie hier sind</h2>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3 / 2", marginTop: "clamp(28px, 4vw, 40px)" }}>
                <Image src="/images/behoerden.jpg" alt="Beraterin erklärt einer Klientin ein behördliches Schreiben (Symbolbild)" fill sizes="(max-width: 980px) 100vw, 42vw" style={{ objectFit: "cover" }} />
                <span style={{ position: "absolute", left: "12px", bottom: "10px", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "2px 7px" }}>Symbolbild</span>
              </div>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "17px", fontWeight: "300", color: "#2B3644", textWrap: "pretty" } as CSSProperties}>
              <p style={{ margin: "0" }}>Als qualifizierte Paralegal mit fundierter Erfahrung im Schweizer Rechtssystem und in der professionellen Jugend- und Integrationsförderung stehe ich Privatpersonen und Jugendlichen bei administrativen, schulischen und beruflichen Herausforderungen zur Seite.</p>
              <p style={{ margin: "0" }}>Viele Menschen fühlen sich von Formularen, behördlichen Schreiben, Fristen oder der Berufswahl überfordert. Genau hier setze ich an: Ich bringe Ordnung, Klarheit und Struktur in Ihre Unterlagen und Verfahren.</p>
              <p style={{ margin: "0" }}>Mit fachlicher Kompetenz, Diskretion und kulturellem Feingefühl unterstütze ich Sie dabei, Hürden im Alltag und auf dem Arbeitsmarkt zu überwinden – damit Sie sich in der Schweiz sicher und gestärkt bewegen können.</p>
            </div>
          </div>
        </section>
        <section aria-labelledby="ansatz-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0", borderTop: "1px solid #ECE6D8" }}>
          <div className="wrap">
            <div className="rv" style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto clamp(48px, 6vw, 80px)" }}>
              <div className="eyebrow" style={{ color: "#8A6508" }}>Mein Ansatz</div>
              <h2 id="ansatz-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(40px, 5vw, 68px)", lineHeight: "1.05", fontWeight: "500", color: "#163A5F" }}>Verstehen. Begleiten. <span style={{ fontStyle: "italic", color: "#8A6508" }}>Zukunft gestalten.</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "0", borderTop: "1px solid #D9CFBB" }}>
              <div className="rv" style={{ padding: "36px 32px 40px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span className="serif" style={{ fontSize: "44px", lineHeight: "1", color: "#D4A017" }}>I.</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", color: "#163A5F" }}>Verstehen</h3>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Behördliche Schreiben, Abläufe und Gespräche verständlich machen – in einfachen Worten und, wenn nötig, in Ihrer Sprache.</p>
              </div>
              <div className="rv" style={{ padding: "36px 32px 40px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span className="serif" style={{ fontSize: "44px", lineHeight: "1", color: "#D4A017" }}>II.</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", color: "#163A5F" }}>Begleiten</h3>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Sie mit Ihrem Anliegen nicht allein lassen: beim Ordnen von Unterlagen, bei Terminen und bei den nächsten Schritten.</p>
              </div>
              <div className="rv" style={{ padding: "36px 32px 40px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span className="serif" style={{ fontSize: "44px", lineHeight: "1", color: "#D4A017" }}>III.</span>
                <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", color: "#163A5F" }}>Zukunft gestalten</h3>
                <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Jugendliche stärkenorientiert auf ihrem Weg in Ausbildung und Beruf unterstützen – Schritt für Schritt.</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="bio-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap split">
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Werdegang</div>
              <h2 id="bio-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>💼 Berufliche Erfahrung</h2>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "600", color: "#163A5F" }}>Jobcoach (Academia Education AG / Bereich Integration)</h3>
              <p style={{ margin: "0", fontSize: "16px", color: "#2B3644" }}>In meiner Tätigkeit als Jobcoach in der Ganztagesstruktur Alpha (Bildungsangebot Auftakt) habe ich Jugendliche und junge Erwachsene intensiv auf ihrem Weg begleitet:</p>
              <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "15.5px", color: "#2B3644", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li><strong>Berufswahl &amp; Bewerbungsprozess:</strong> Fundierte Beratung, Erkennen von Interessen und Kompetenzen sowie zielgerichtete Unterstützung bei Bewerbungen.</li>
                <li><strong>Bildungssystem &amp; Arbeitsmarkt:</strong> Verständliche Vermittlung des Schweizer Berufsbildungssystems, Erklärung von Arbeitsmarktanforderungen und Empfehlung von BIZ-Potenzialabklärungen oder INVOL.</li>
                <li><strong>Vermittlung von Anschlusslösungen:</strong> Erfolgreiche Suche nach Lehrstellen und praktischen Ausbildungen (PRA) sowie Zusammenarbeit mit Sozialdiensten.</li>
                <li><strong>Individuelle Förderung:</strong> Gezielte Unterstützung von Jugendlichen mit Lernschwierigkeiten oder individuellen Herausforderungen durch ein strukturiertes, motivierendes Konzept.</li>
              </ul>
            </div>
          </div>
          <div className="wrap split" style={{ marginTop: "clamp(64px, 8vw, 110px)" }}>
            <div className="rv">
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Engagement</div>
              <h2 id="engagement-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>🤝 Ehrenamtliches Engagement &amp; Herzensangelegenheit</h2>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ margin: "0", fontSize: "16px", color: "#2B3644" }}>Ein wesentlicher Teil meiner menschlichen und praktischen Expertise beruht auf langjähriger, ehrenamtlicher Unterstützung für Bekannte, Verwandte und Familien in herausfordernden Lebenslagen:</p>
              <ul style={{ margin: "0", padding: "0", listStyle: "none", fontSize: "15.5px", color: "#2B3644", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li>🏛️ <strong>Behörden, Migration &amp; Schweizer Recht:</strong> Prüfung von Voraussetzungen für Aufenthaltsbewilligungen, Abklärung von Behördenentscheiden sowie Verfassen von offiziellen Schreiben und Rekursen.</li>
                <li>📄 <strong>Reisedokumente &amp; Visa:</strong> Erläuterung und Verfassen von Anträgen auf Rückreisevisa für Personen mit Status F sowie Briefe an das SEM (Staatssekretariat für Migration) zur Verlängerung von Reisedokumenten.</li>
                <li>🗣️ <strong>Dolmetschen &amp; Sprachmittlung:</strong> Sprachmittlung auf Arabisch und Aramäisch bei Arztbesuchen, Spitälern, auf Behörden und in Schulen.</li>
                <li>📄 <strong>Administrative Alltagshilfe:</strong> Ausfüllen von Formularen, Vereinbaren von Terminen, direkter Kontakt mit Behörden und Aufsetzen von Kündigungen (z. B. für Wohnungen).</li>
                <li>⚖️ <strong>Familiäre Angelegenheiten:</strong> Zusammenstellung und Strukturierung von Unterlagen für Anwälte oder Mediatoren (z. B. bei Scheidung, Trennung, Unterhaltsberechnungen oder Sorgerechtsdokumenten).</li>
                <li>🧭 <strong>Coaching &amp; Integration im privaten Umfeld:</strong> Empathische Begleitung und Motivation von Menschen bei der Stellensuche, Aus-/Weiterbildung und beim Überwinden des Gefühls von Fremdheit in der Schweiz.</li>
              </ul>
            </div>
          </div>
          <div className="wrap" style={{ marginTop: "clamp(64px, 8vw, 110px)" }}>
            <div className="rv" style={{ borderLeft: "2px solid #D4A017", padding: "8px 0 8px clamp(20px, 3vw, 36px)", maxWidth: "820px" }}>
              <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", color: "#163A5F" }}>Mein Versprechen an Sie:</h3>
              <p className="serif" style={{ margin: "14px 0 0", fontSize: "clamp(20px, 2vw, 24px)", lineHeight: "1.4", fontStyle: "italic", color: "#163A5F" }}>Ob im professionellen Coaching oder bei Ihren administrativen Anliegen – ich begegne Ihnen mit voller Diskretion, rechtlicher Sorgfalt und menschlicher Empathie. Lassen Sie uns Ihre Zukunft gemeinsam anpacken.</p>
            </div>
          </div>
        </section>
        <section aria-labelledby="prinzip-title" style={{ background: "#163A5F", color: "#FFFFFF", padding: "clamp(80px, 10vw, 130px) 0", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: "24px", border: "1px solid rgba(212,160,23,.22)", pointerEvents: "none" }}></div>
          <div className="wrap" style={{ position: "relative" }}>
            <div className="rv" style={{ maxWidth: "760px", marginBottom: "clamp(40px, 5vw, 64px)" }}>
              <div className="eyebrow" style={{ color: "#D4A017" }}>Arbeitsweise</div>
              <h2 id="prinzip-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(36px, 4.2vw, 56px)", lineHeight: "1.1", fontWeight: "500" }}>Worauf Sie sich verlassen können.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "0 32px" }}>
              <div className="rv" style={{ padding: "26px 0", borderTop: "1px solid rgba(255,255,255,.2)" }}>
                <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "500", color: "#FAF9F5" }}>Verständlich</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15px", color: "#C9D3DE" }}>Klare Sprache statt Amtsdeutsch – damit Sie wissen, worum es geht.</p>
              </div>
              <div className="rv" style={{ padding: "26px 0", borderTop: "1px solid rgba(255,255,255,.2)" }}>
                <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "500", color: "#FAF9F5" }}>Nahbar</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15px", color: "#C9D3DE" }}>Persönlich ansprechbar, auf Deutsch, Arabisch oder Aramäisch.</p>
              </div>
              <div className="rv" style={{ padding: "26px 0", borderTop: "1px solid rgba(255,255,255,.2)" }}>
                <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "500", color: "#FAF9F5" }}>Strukturiert</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15px", color: "#C9D3DE" }}>Ein klarer Ablauf, geordnete Unterlagen und nachvollziehbare nächste Schritte.</p>
              </div>
              <div className="rv" style={{ padding: "26px 0", borderTop: "1px solid rgba(255,255,255,.2)" }}>
                <h3 className="serif" style={{ margin: "0", fontSize: "28px", fontWeight: "500", color: "#FAF9F5" }}>Transparent</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15px", color: "#C9D3DE" }}>Offen über die Grenzen meiner Arbeit: keine Rechtsberatung, keine rechtliche Vertretung.</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="sprachen-title" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="wrap split" style={{ alignItems: "center" }}>
            <div className="rv" style={{ position: "relative" }}>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 3.4" }}>
                <Image src="/images/hero.jpg" alt="Blick über die Altstadt von Zürich und den See (Symbolbild)" fill className="drift" sizes="(max-width: 980px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "35% 40%" }} />
                {" "}
                <span style={{ position: "absolute", left: "12px", bottom: "10px", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "rgba(14,26,40,.55)", padding: "2px 7px" }}>Symbolbild</span>
              </div>
            </div>
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Sprachen &amp; Region</div>
              <h2 id="sprachen-title" className="serif" style={{ margin: "0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>In Ihrer Sprache. In Ihrer Nähe.</h2>
              <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", borderTop: "1px solid #D9CFBB" }}>
                <li style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "20px", padding: "18px 0", borderBottom: "1px solid #D9CFBB" }}>
                  <span className="serif" style={{ fontSize: "30px", color: "#163A5F", fontWeight: "500" }}>Deutsch</span>
                  <span style={{ fontSize: "13px", color: "#4A5563" }}>Beratung &amp; Coaching</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "20px", padding: "18px 0", borderBottom: "1px solid #D9CFBB" }}>
                  <span className="serif" style={{ fontSize: "30px", color: "#163A5F", fontWeight: "500" }}>Arabisch</span>
                  <span style={{ fontSize: "13px", color: "#4A5563" }}>Coaching &amp; Sprachmittlung</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "20px", padding: "18px 0", borderBottom: "1px solid #D9CFBB" }}>
                  <span className="serif" style={{ fontSize: "30px", color: "#163A5F", fontWeight: "500" }}>Aramäisch</span>
                  <span style={{ fontSize: "13px", color: "#4A5563" }}>Coaching &amp; Sprachmittlung</span>
                </li>
              </ul>
              <p style={{ margin: "0", fontSize: "15.5px", color: "#2B3644" }}>Termine finden online über Google Meet oder persönlich in Zürich und Umgebung statt. Den Treffpunkt vereinbaren wir jeweils individuell.</p>
            </div>
          </div>
        </section>
        <section aria-labelledby="bereiche-title" style={{ background: "#FFFFFF", padding: "clamp(80px, 10vw, 140px) 0", borderTop: "1px solid #ECE6D8" }}>
          <div className="wrap">
            <div className="rv" style={{ maxWidth: "760px", marginBottom: "clamp(40px, 5vw, 64px)" }}>
              <div className="eyebrow" style={{ color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" }}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Leistungen</div>
              <h2 id="bereiche-title" className="serif" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 58px)", lineHeight: "1.08", fontWeight: "500", color: "#163A5F" }}>Drei Bereiche aus einer Hand.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "clamp(20px, 3vw, 32px)" }}>
              <Link className="svc rv" href="/administrative-unterstuetzung">
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#8A6508" }}>I.</span>
                <span className="serif" style={{ fontSize: "30px", fontWeight: "600", lineHeight: "1.12" }}>Administrative Unterstützung</span>
                <span style={{ fontSize: "15px", color: "#2B3644" }}>Formulare, Briefe und Schriftverkehr verstehen und erledigen.</span>
                <span className="tl">Mehr erfahren →</span>
              </Link>
              <Link className="svc rv" href="/jugendcoaching">
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#8A6508" }}>II.</span>
                <span className="serif" style={{ fontSize: "30px", fontWeight: "600", lineHeight: "1.12" }}>Jugendcoaching &amp; Berufsorientierung</span>
                <span style={{ fontSize: "15px", color: "#2B3644" }}>Berufswahl, Bewerbung und Orientierung im Bildungssystem.</span>
                <span className="tl">Mehr erfahren →</span>
              </Link>
              <Link className="svc rv" href="/dolmetschen">
                <span className="serif" aria-hidden="true" style={{ fontSize: "22px", fontStyle: "italic", color: "#8A6508" }}>III.</span>
                <span className="serif" style={{ fontSize: "30px", fontWeight: "600", lineHeight: "1.12" }}>Dolmetschen &amp; Sprachhilfe</span>
                <span style={{ fontSize: "15px", color: "#2B3644" }}>Verständigung auf Arabisch und Aramäisch.</span>
                <span className="tl">Mehr erfahren →</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="lux-host" id="anfrage" aria-labelledby="cta-title" style={{ background: "#F3EEE4", padding: "clamp(88px, 11vw, 150px) 0", position: "relative", overflow: "hidden", borderTop: "1px solid #E4DCCB" }}>
          <LuxuryOrnaments />
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "0", width: "1px", height: "72px", background: "linear-gradient(#D4A017, rgba(212,160,23,0))" }}></div>
          <div className="wrap rv" style={{ maxWidth: "920px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            <div className="eyebrow" style={{ color: "#8A6508" }}>Anfrage &amp; Termin</div>
            <h2 id="cta-title" className="serif" style={{ margin: "0", fontSize: "clamp(42px, 5.4vw, 72px)", lineHeight: "1.04", fontWeight: "500", color: "#163A5F" }}>Lernen wir uns <span style={{ fontStyle: "italic", color: "#8A6508" }}>kennen.</span></h2>
            <p style={{ margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em" }}>Beschreiben Sie Ihr Anliegen in der Online-Anfrage. Gerne klären wir alles Weitere in einem Erstgespräch von 45 Minuten.</p>
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
