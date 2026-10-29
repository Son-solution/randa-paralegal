import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import SiteShell from "@/components/layout/SiteShell";
import LuxuryOrnaments from "@/components/ui/LuxuryOrnaments";
import { routes } from "@/config/navigation";

export type LegalSection = { title: string; body: ReactNode };

type Props = {
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
  /** Date shown at the end, e.g. "Oktober 2026". */
  updated: string;
};

export const pStyle = { margin: "0", fontSize: "16px", color: "#2B3644", maxWidth: "40em" } as const;
export const listStyle = { margin: "0", paddingLeft: "20px", fontSize: "16px", color: "#2B3644", maxWidth: "40em", display: "flex", flexDirection: "column", gap: "6px" } as const;

/** Shared layout of Impressum, Datenschutzerklärung and Cookie-Richtlinie (same look as "Rechtliche Hinweise"). */
export default function LegalDocument({ title, intro, sections, updated }: Props) {
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
                <li aria-current="page" style={{ color: "#163A5F" }}>{title}</li>
              </ol>
            </nav>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div className="in eyebrow" style={{ "--d": ".05s", color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" } as CSSProperties}><span className="hair" aria-hidden="true" style={{ "--d": ".15s", display: "inline-block", width: "40px", height: "1px", background: "#D4A017" } as CSSProperties}></span>Rechtliches</div>
              <h1 id="page-title" className="in serif" style={{ "--d": ".15s", margin: "0", fontSize: "clamp(44px, 5.6vw, 76px)", lineHeight: "1.02", fontWeight: "500", color: "#163A5F", overflowWrap: "anywhere" } as CSSProperties}>{title}</h1>
              <div className="in" style={{ "--d": ".3s", margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "36em" } as CSSProperties}>{intro}</div>
            </div>
            <div style={{ marginTop: "clamp(40px, 6vw, 64px)", borderTop: "1px solid #D9CFBB" }}>
              {sections.map((s, i) => (
                <section key={s.title} className="rv" aria-labelledby={`legal-${i + 1}`} style={{ display: "grid", gridTemplateColumns: "56px minmax(0, 1fr)", gap: "8px 20px", padding: "32px 0", borderBottom: "1px solid #D9CFBB" }}>
                  <span className="serif" aria-hidden="true" style={{ fontSize: "24px", fontStyle: "italic", color: "#8A6508", lineHeight: "1.3" }}>{i + 1}.</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <h2 id={`legal-${i + 1}`} className="serif" style={{ margin: "0", fontSize: "clamp(26px, 2.6vw, 32px)", fontWeight: "600", lineHeight: "1.2", color: "#163A5F" }}>{s.title}</h2>
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
            <p style={{ margin: "28px 0 0", fontSize: "14px", color: "#4A5563" }}>Stand: {updated}</p>
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
