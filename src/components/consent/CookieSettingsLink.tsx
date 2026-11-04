"use client";

import { OPEN_EVENT } from "@/lib/consent";

/** Footer link that shows the cookie banner again, so visitors can change their choice. */
export default function CookieSettingsLink() {
  return (
    <button
      className="flink"
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      style={{ background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", textAlign: "left", cursor: "pointer" }}
    >
      Cookie-Einstellungen
    </button>
  );
}
