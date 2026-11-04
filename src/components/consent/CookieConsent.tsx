"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/config/navigation";
import { site } from "@/config/site";
import { disableAnalytics, loadAnalytics, OPEN_EVENT, readConsent, storeConsent, type Consent } from "@/lib/consent";

/**
 * Cookie banner (bottom of the screen). Shown until the visitor decides, and again
 * via "Cookie-Einstellungen" in the footer. Both choices are equally prominent.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!site.analytics.gaId) return;
    const c = readConsent();
    if (c === "granted") loadAnalytics();
    if (!c) setOpen(true);
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  if (!open) return null;

  const decide = (v: Consent) => {
    storeConsent(v);
    if (v === "granted") loadAnalytics();
    else disableAnalytics();
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie-Einstellungen"
      style={{
        position: "fixed",
        left: "clamp(12px, 3vw, 32px)",
        right: "clamp(12px, 3vw, 32px)",
        bottom: "clamp(12px, 3vw, 32px)",
        zIndex: 50,
        maxWidth: "760px",
        margin: "0 auto",
        background: "#FFFFFF",
        border: "1px solid #D9CFBB",
        borderTop: "2px solid #D4A017",
        borderRadius: "var(--r-card)",
        boxShadow: "0 24px 60px -24px rgba(14,26,40,.45)",
        padding: "clamp(18px, 3vw, 26px)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "16px 24px",
        fontFamily: "Montserrat, system-ui, -apple-system, 'Segoe UI', sans-serif",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 320px", fontSize: "14px", lineHeight: 1.6, color: "#2B3644" }}>
        Mit Ihrer Einwilligung verwende ich <b style={{ color: "#163A5F" }}>Google Analytics</b>, um zu verstehen, wie die Website genutzt wird. Dabei werden
        Cookies gesetzt und Daten an Google (auch in die USA) übermittelt. Mehr dazu in der{" "}
        <Link href={routes.cookies} style={{ color: "#8A6508" }}>
          Cookie-Richtlinie
        </Link>
        .
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <button className="btn btn-line" type="button" onClick={() => decide("denied")} style={{ minHeight: "46px", padding: "0 22px" }}>
          Ablehnen
        </button>
        <button className="btn btn-navy" type="button" onClick={() => decide("granted")} style={{ minHeight: "46px", padding: "0 22px" }}>
          Akzeptieren
        </button>
      </div>
    </div>
  );
}
