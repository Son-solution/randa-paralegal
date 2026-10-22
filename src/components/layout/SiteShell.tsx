import type { ReactNode } from "react";
import type { PageKey } from "@/config/navigation";
import Footer from "./Footer";
import Header from "./Header";
import PrototypeBar from "./PrototypeBar";
import WhatsAppButton from "./WhatsAppButton";

const pageClass: Record<PageKey, string> = {
  home: "page-home",
  about: "page-about",
  admin: "page-admin",
  youth: "page-youth",
  interp: "page-interp",
  intake: "page-intake",
  // Kontakt and Rechtliche Hinweise use the "Über mich" page styles (breadcrumb, buttons, breakpoints).
  contact: "page-about",
  legal: "page-about",
  none: "page-about",
};

type Props = {
  page: PageKey;
  children: ReactNode;
  /** The floating WhatsApp button is hidden on the form page so it never covers form controls. */
  showWhatsApp?: boolean;
};

/**
 * Common frame for every page: prototype notice, sticky header, content, footer and
 * the floating WhatsApp button. The `.page-*` wrapper scopes the few page-specific
 * styles in globals.css; `.motion` enables the (reduced-motion aware) animations.
 */
export default function SiteShell({ page, children, showWhatsApp = true }: Props) {
  return (
    <div className={pageClass[page]}>
      <div
        className="motion"
        style={{
          fontFamily: "Montserrat, system-ui, -apple-system, 'Segoe UI', sans-serif",
          color: "#0E1A28",
          background: "#FAF9F5",
          fontSize: "16px",
          lineHeight: 1.7,
          fontWeight: 400,
          overflowX: "clip",
        }}
      >
        <PrototypeBar />
        <Header current={page} />
        {children}
        <Footer />
        {showWhatsApp ? <WhatsAppButton /> : null}
      </div>
    </div>
  );
}
