"use client";

import { useEffect, useRef } from "react";
import "./ambient.css";

const ribbon = [
  "Administrative Unterstützung",
  "Jugendcoaching & Berufsorientierung",
  "Dolmetschen & Sprachhilfe",
  "Arabisch · Aramäisch · Deutsch",
  "Zürich und Umgebung",
];

/**
 * Continuous ambient animations across the site (independent of scrolling): gold shimmer on
 * headings, slow Ken Burns on photos, a drifting glow in navy sections, a light running around
 * card borders, pulsing contact buttons, rising gold dust, looping line illustrations, lights
 * travelling along gold hairlines and a gold spotlight that follows the pointer in the page hero.
 * Styles live in ambient.css and only apply while the `amb-on` class is set, so with reduced
 * motion everything stays static.
 *
 * To switch all of it off, remove <AmbientMotion /> from SiteShell.tsx (and <ServicesRibbon />
 * from the home page).
 */
export default function AmbientMotion() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("amb-on");

    const el = spot.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!el || !fine) return () => root.classList.remove("amb-on");

    // The spotlight glides after the pointer instead of sticking to it
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      const inHero = !!(e.target as Element | null)?.closest?.("main > section:first-of-type");
      el.classList.toggle("is-on", inHero);
      if (!inHero) return;
      if (!el.dataset.ready) {
        x = tx = e.clientX;
        y = ty = e.clientY;
        el.dataset.ready = "1";
      }
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      root.classList.remove("amb-on");
    };
  }, []);

  return <div ref={spot} className="amb-spot" aria-hidden="true" />;
}

/** Endless services ribbon, placed below the home page hero. Static with reduced motion. */
export function ServicesRibbon() {
  const items = ribbon.map((t) => (
    <span key={t} className="amb-ribbon-item">
      <span className="serif">{t}</span>
      <span className="amb-ribbon-dia" />
    </span>
  ));
  return (
    <div className="amb-ribbon" aria-hidden="true">
      <div className="amb-ribbon-track">
        <div className="amb-ribbon-set">{items}</div>
        <div className="amb-ribbon-set">{items}</div>
      </div>
    </div>
  );
}
