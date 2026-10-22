import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { routes } from "@/config/navigation";

export default function NotFound() {
  return (
    <SiteShell page="none">
      <main>
        <section style={{ padding: "clamp(80px, 12vw, 160px) 0" }}>
          <div className="wrap" style={{ maxWidth: "820px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}>
            <div className="eyebrow" style={{ color: "#8A6508" }}>
              Fehler 404
            </div>
            <h1 className="serif" style={{ margin: 0, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05, fontWeight: 500, color: "#163A5F" }}>
              Diese Seite wurde nicht gefunden.
            </h1>
            <p style={{ margin: 0, fontSize: "17px", fontWeight: 300, color: "#2B3644" }}>
              Vielleicht hat sich die Adresse geändert. Über die Startseite finden Sie alle Leistungen.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", marginTop: "8px" }}>
              <Link className="btn btn-navy" href={routes.home}>
                Zur Startseite
              </Link>
              <Link className="btn btn-line" href={routes.intake}>
                Anfrage &amp; Termin
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
