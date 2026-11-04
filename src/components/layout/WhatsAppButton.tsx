import { site, whatsappHref } from "@/config/site";

/**
 * Floating WhatsApp button, stacked above the call button (bottom right).
 * Hidden while no WhatsApp number is configured in `src/config/site.ts`.
 */
export default function WhatsAppButton() {
  const href = whatsappHref();
  if (!href) return null;
  const style = {
    position: "fixed",
    right: "clamp(16px, 3vw, 32px)",
    bottom: "calc(clamp(16px, 3vw, 32px) + 72px)",
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
  return (
    <a className="wa-fab" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Per WhatsApp schreiben: ${site.contact.whatsapp}`} style={style}>
      <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.5-4.3A8.5 8.5 0 1 1 20.5 11.6z"></path>
        <path d="M9 8.8c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.4-3.2-.4a8 8 0 0 1-3.3-3.3c-.8-1.6-.7-2.6-.4-3.2z"></path>
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
        WhatsApp · {site.contact.whatsapp}
      </span>
    </a>
  );
}
