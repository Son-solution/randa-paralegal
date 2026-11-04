"use client";

import Link from "next/link";
import { useState } from "react";

type Props = { query: string };

/**
 * Interactive Google Maps card. The map is loaded only after a click, so Google
 * receives no data from visitors who do not want to see it (see Datenschutzerklärung).
 */
export default function MapEmbed({ query }: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

  return (
    <div style={{ position: "relative", aspectRatio: "4 / 3", background: "#E9E3D6", border: "1px solid #D9CFBB" }}>
      {loaded ? (
        <iframe
          title={`Karte: ${query}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", padding: "24px", textAlign: "center" }}>
          <svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"></path>
            <circle cx="12" cy="9.5" r="2.5"></circle>
          </svg>
          <button type="button" className="btn btn-navy" onClick={() => setLoaded(true)} style={{ whiteSpace: "normal" }}>Karte anzeigen</button>
          <p style={{ margin: 0, fontSize: "13px", color: "#4A5563", maxWidth: "30em" }}>
            Beim Anzeigen der Karte werden Daten an Google übermittelt. Mehr dazu in der{" "}
            <Link href="/datenschutz" style={{ color: "#8A6508" }}>Datenschutzerklärung</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
