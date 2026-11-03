import Link from "next/link";
import { routes } from "@/config/navigation";
import { phoneHref, site } from "@/config/site";

/**
 * Floating call button (bottom right). Until a phone number is configured in
 * `src/config/site.ts`, it leads to the enquiry page and says "Nummer folgt".
 */
export default function CallButton() {
  const href = phoneHref();
  const label = href ? `Anrufen: ${site.contact.phone}` : "Anrufen – Nummer folgt";
  const tip = href ? `Anrufen · ${site.contact.phone}` : "Anrufen · Nummer folgt";
  const style = {
    position: "fixed",
    right: "clamp(16px, 3vw, 32px)",
    bottom: "clamp(16px, 3vw, 32px)",
    zIndex: 40,
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#163A5F",
    border: "1px solid #D4A017",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 14px 34px -14px rgba(14,26,40,.55)",
    textDecoration: "none",
  } as const;
  const inner = (
    <>
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"></path>
      </svg>
      <span
        className="tip"
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "72px",
          whiteSpace: "nowrap",
          background: "#163A5F",
          color: "#FFFFFF",
          fontSize: "12.5px",
          letterSpacing: ".04em",
          padding: "8px 14px",
          border: "1px solid rgba(212,160,23,.5)",
        }}
      >
        {tip}
      </span>
    </>
  );
  return href ? (
    <a className="call-fab" href={href} aria-label={label} style={style}>
      {inner}
    </a>
  ) : (
    <Link className="call-fab" href={routes.intake} aria-label={label} style={style}>
      {inner}
    </Link>
  );
}
