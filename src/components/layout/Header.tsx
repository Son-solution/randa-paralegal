"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, services, type PageKey } from "@/config/navigation";

type Props = { current: PageKey };

/** Sticky ivory header with dropdown, navy CTA and full-width mobile menu (≤ 1120 px). */
export default function Header({ current }: Props) {
  const [open, setOpen] = useState(false);
  const [panelMax, setPanelMax] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const onHome = current === "home";

  // Close the mobile menu after navigation.
  useEffect(() => setOpen(false), [pathname]);

  // While the mobile menu is open: fit it into the visible viewport, lock the page behind it,
  // and close it with Escape (focus back to the menu button), an outside tap or a resize to desktop width.
  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    const root = document.documentElement;
    const desktop = window.matchMedia("(min-width: 1121px)");
    const fit = () => {
      if (header) setPanelMax(Math.max(200, window.innerHeight - header.getBoundingClientRect().bottom));
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      setOpen(false);
      btnRef.current?.focus();
    };
    const onPointer = (ev: PointerEvent) => {
      if (header && !header.contains(ev.target as Node)) setOpen(false);
    };
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const prev = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = scrollbar + "px";
    fit();
    window.addEventListener("resize", fit);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = prev.overflow;
      root.style.paddingRight = prev.paddingRight;
      window.removeEventListener("resize", fit);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);
  const homeHref = onHome ? "#start" : routes.home;
  const servicesHref = onHome ? "#leistungen" : "/#leistungen";
  const faqHref = onHome ? "#faq" : "/#faq";
  const isService = current === "admin" || current === "youth" || current === "interp";

  return (
    <header ref={headerRef} className="hdr" style={{ position: "sticky", top: 0, zIndex: 30 }}>
      <div
        aria-hidden="true"
        style={{
          height: "2px",
          background: "linear-gradient(90deg, rgba(212,160,23,0), #D4A017 30%, #D4A017 70%, rgba(212,160,23,0))",
          opacity: 0.7,
        }}
      ></div>
      <div
        className="wrap hdr-in"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", minHeight: "90px" }}
      >
        <Link
          className="logo"
          href={homeHref}
          aria-label="Randa Paralegal Services – zur Startseite"
          style={{ display: "block", lineHeight: 0, flexShrink: 0 }}
        >
          <Image
            src="/logo/randa-logo.webp"
            alt="Randa Paralegal Services"
            width={820}
            height={230}
            priority
            style={{ height: "58px", width: "auto", display: "block" }}
          />
        </Link>

        <nav className="dnav" aria-label="Hauptnavigation" style={{ display: "flex", alignItems: "center", gap: "34px" }}>
          <Link
            className={`navlink${current === "home" ? " is-active" : ""}`}
            href={homeHref}
            aria-current={current === "home" ? "page" : undefined}
          >
            Startseite
          </Link>
          <Link
            className={`navlink${current === "about" ? " is-active" : ""}`}
            href={routes.about}
            aria-current={current === "about" ? "page" : undefined}
          >
            Über mich
          </Link>
          <div className="dd">
            <Link className={`navlink${isService ? " is-active" : ""}`} href={servicesHref}>
              Leistungen{" "}
              <svg className="chev" aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#8A6508" strokeWidth="1.3">
                <path d="M1.5 3.5L5 7l3.5-3.5"></path>
              </svg>
            </Link>
            <div className="ddp">
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #ECE6D8",
                  borderTop: "2px solid #D4A017",
                  boxShadow: "0 30px 60px -28px rgba(14,26,40,.35)",
                  padding: "8px",
                }}
              >
                {services.map((s) => (
                  <Link
                    key={s.key}
                    className={`ddi${current === s.key ? " cur" : ""}`}
                    href={s.href}
                    aria-current={current === s.key ? "page" : undefined}
                  >
                    <span className="serif" aria-hidden="true" style={{ fontSize: "20px", fontStyle: "italic", color: "#8A6508" }}>
                      {s.num}
                    </span>
                    <span>
                      <span
                        className="ddt serif"
                        style={{ display: "block", fontSize: "21px", fontWeight: 600, lineHeight: 1.2, transition: "color .3s" }}
                      >
                        {s.title}
                      </span>
                      <span style={{ display: "block", fontSize: "13px", color: "#4A5563", lineHeight: 1.5, marginTop: "3px" }}>
                        {s.teaser}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link className="navlink" href={faqHref}>
            Häufige Fragen
          </Link>
          <Link
            className="btn btn-navy"
            href={routes.intake}
            aria-current={current === "intake" ? "page" : undefined}
            style={{
              minHeight: "48px",
              padding: "0 24px",
              fontSize: "12px",
              ...(current === "intake" ? { borderBottom: "2px solid #D4A017" } : {}),
            }}
          >
            Anfrage &amp; Termin
          </Link>
        </nav>

        <button
          ref={btnRef}
          className="mbtn"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
          onClick={() => setOpen((o) => !o)}
          style={{
            width: "48px",
            height: "48px",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "1px solid rgba(22,58,95,.25)",
            borderRadius: "10px",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {open ? (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#163A5F" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18"></path>
            </svg>
          ) : (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#163A5F" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M9 17h11"></path>
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div className="mpanel-wrap">
          <nav
            id="mobile-menu"
            className="mpanel"
            aria-label="Mobile Navigation"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "100%",
              background: "#FAF9F5",
              borderTop: "1px solid #E4DCCB",
              boxShadow: "0 40px 60px -30px rgba(14,26,40,.35)",
              // Measured from the header's bottom edge (header height and prototype bar vary); CSS value until measured.
              maxHeight: panelMax != null ? panelMax + "px" : "calc(100vh - 76px)",
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}
          >
            <div className="wrap" style={{ paddingTop: "12px", paddingBottom: "32px", display: "flex", flexDirection: "column" }}>
              <Link className="mlink" href={homeHref} onClick={close} aria-current={current === "home" ? "page" : undefined}>
                Startseite
                {current === "home" ? <CurrentDot /> : null}
              </Link>
              <Link className="mlink" href={routes.about} onClick={close} aria-current={current === "about" ? "page" : undefined}>
                Über mich
                {current === "about" ? <CurrentDot /> : null}
              </Link>
              <div style={{ padding: "18px 0 10px", borderBottom: "1px solid #E4DCCB" }}>
                <div className="eyebrow" style={{ color: "#8A6508", fontSize: "11px", marginBottom: "4px" }}>
                  Leistungen
                </div>
                {services.map((s) => (
                  <Link
                    key={s.key}
                    className="msub"
                    href={s.href}
                    onClick={close}
                    aria-current={current === s.key ? "page" : undefined}
                    style={current === s.key ? { color: "#163A5F", fontWeight: 600 } : undefined}
                  >
                    <span className="serif" aria-hidden="true" style={{ color: "#8A6508", fontStyle: "italic", width: "26px" }}>
                      {s.num}
                    </span>
                    {s.title}
                  </Link>
                ))}
              </div>
              <Link className="mlink" href={faqHref} onClick={close}>
                Häufige Fragen
              </Link>
              <Link className="mlink" href={routes.contact} onClick={close} aria-current={current === "contact" ? "page" : undefined}>
                Kontakt
                {current === "contact" ? <CurrentDot /> : null}
              </Link>
              <Link
                className="btn btn-navy"
                href={routes.intake}
                onClick={close}
                aria-current={current === "intake" ? "page" : undefined}
                style={{ marginTop: "26px", width: "100%" }}
              >
                Anfrage &amp; Termin{" "}
                <span className="arr" aria-hidden="true">
                  →
                </span>
              </Link>
              <p style={{ margin: "18px 0 0", fontSize: "13px", color: "#4A5563", textAlign: "center" }}>
                Deutsch · Arabisch · Aramäisch · Zürich und Umgebung
              </p>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function CurrentDot() {
  return <span aria-hidden="true" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4A017" }}></span>;
}
