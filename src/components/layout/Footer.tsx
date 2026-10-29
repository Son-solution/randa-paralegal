import Image from "next/image";
import Link from "next/link";
import { routes, services } from "@/config/navigation";
import { site } from "@/config/site";

const labelStyle = {
  color: "#D4A017",
  fontSize: "11px",
  paddingBottom: "12px",
  marginBottom: "4px",
  borderBottom: "1px solid rgba(212,160,23,.3)",
} as const;

const navStyle = { display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" } as const;

function LegalItem({ href, label }: { href: string | null; label: string }) {
  return href ? (
    <Link className="flink" href={href}>
      {label}
    </Link>
  ) : (
    // Page not written yet: shown as plain text (as in the prototype), not as a link.
    <span className="flink" title="Seite folgt">
      {label}
    </span>
  );
}

/** Deep-navy footer with the high-contrast logo variant. */
export default function Footer() {
  return (
    <footer style={{ background: "#163A5F", color: "#DCE3EB", padding: "clamp(64px, 8vw, 96px) 0 32px", position: "relative" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "1px",
          background: "linear-gradient(90deg, rgba(212,160,23,0), rgba(212,160,23,.8) 50%, rgba(212,160,23,0))",
        }}
      ></div>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "44px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <Link
            href={routes.home}
            aria-label="Randa Paralegal Services – zur Startseite"
            style={{ display: "block", lineHeight: 0, alignSelf: "flex-start" }}
          >
            <Image
              src="/logo/randa-logo-footer.webp"
              alt="Randa Paralegal Services"
              width={820}
              height={230}
              style={{ width: "250px", height: "auto", display: "block" }}
            />
          </Link>
          <p className="serif" style={{ margin: 0, fontSize: "21px", fontStyle: "italic", color: "#FAF9F5", lineHeight: 1.35 }}>
            Verstehen. Begleiten.
            <br />
            Zukunft gestalten.
          </p>
        </div>
        <nav aria-label="Leistungen" style={navStyle}>
          <span className="eyebrow" style={labelStyle}>
            Leistungen
          </span>
          {services.map((s) => (
            <Link key={s.key} className="flink" href={s.href}>
              {s.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Seiten" style={navStyle}>
          <span className="eyebrow" style={labelStyle}>
            Seiten
          </span>
          <Link className="flink" href={routes.home}>
            Startseite
          </Link>
          <Link className="flink" href={routes.about}>
            Über mich
          </Link>
          <Link className="flink" href={routes.intake}>
            Anfrage &amp; Termin
          </Link>
          <Link className="flink" href="/#faq">
            Häufige Fragen
          </Link>
          <Link className="flink" href={routes.contact}>
            Kontakt
          </Link>
        </nav>
        <nav aria-label="Rechtliches" style={navStyle}>
          <span className="eyebrow" style={labelStyle}>
            Rechtliches
          </span>
          <LegalItem href={site.legal.impressum} label="Impressum" />
          <LegalItem href={site.legal.datenschutz} label="Datenschutzerklärung" />
          <LegalItem href={site.legal.cookies} label="Cookie-Richtlinie" />
          <LegalItem href={site.legal.agb} label="AGB & rechtliche Hinweise" />
        </nav>
      </div>
      <div className="wrap" style={{ marginTop: "56px" }}>
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,.16)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "12px 32px",
            fontSize: "12.5px",
            color: "#C9D3DE",
          }}
        >
          <span style={{ maxWidth: "46em" }}>
            Randa Paralegal Services bietet administrative, organisatorische und sprachliche Unterstützung. Es erfolgt keine
            Rechtsberatung und keine rechtliche Vertretung. Abgebildete Personen und Räume sind Symbolbilder.
          </span>
          <span>© {new Date().getFullYear()} Randa Paralegal Services · Zürich</span>
        </div>
      </div>
    </footer>
  );
}
