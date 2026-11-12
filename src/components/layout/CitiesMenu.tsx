"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cities, cityHref } from "@/config/cities";

/**
 * Footer entry "Standorte": opens a floating list with links to the city pages.
 * The links stay in the markup while the list is closed, so search engines can follow them.
 * Closes with Escape, an outside click or after navigation.
 */
export default function CitiesMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      btn.current?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="cities">
      <button
        ref={btn}
        className="flink cities-btn"
        type="button"
        aria-expanded={open}
        aria-controls="cities-panel"
        onClick={() => setOpen((v) => !v)}
      >
        Standorte
        <svg className="chev" aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M2 3.5l3 3 3-3" />
        </svg>
      </button>
      <div id="cities-panel" className={`cities-panel${open ? " is-open" : ""}`}>
        <div className="eyebrow cities-title">Unterstützung vor Ort</div>
        <ul>
          <li>
            <Link className="flink" href="/">
              Zürich
            </Link>
          </li>
          {cities.map((c) => (
            <li key={c.slug}>
              <Link className="flink" href={cityHref(c)} aria-current={pathname === cityHref(c) ? "page" : undefined}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
