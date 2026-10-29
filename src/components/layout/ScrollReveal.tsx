"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MAX_STAGGER = 5;

function isRow(el: Element): boolean {
  if (el.children.length < 2) return false;
  const cs = getComputedStyle(el);
  return cs.display === "grid" || (cs.display === "flex" && cs.flexWrap === "wrap");
}

/**
 * Collects the blocks below the page hero that should reveal on scroll. Rows (grids or
 * wrapping flex) reveal child by child with a stagger; the intake form is left alone.
 */
function collect(main: HTMLElement): { units: HTMLElement[]; images: HTMLElement[] } {
  const units = new Set<HTMLElement>();
  const skip = (el: Element) => !!el.closest("form, .layout, aside");
  const add = (el: Element, i = 0) => {
    if (skip(el)) return;
    (el as HTMLElement).style.setProperty("--i", String(Math.min(i, MAX_STAGGER)));
    units.add(el as HTMLElement);
  };

  Array.from(main.querySelectorAll(":scope > section")).slice(1).forEach((section) => {
    section.querySelectorAll(".wrap").forEach((wrap) => {
      if (wrap.parentElement?.closest(".wrap")) return;
      if (wrap.classList.contains("rv")) return add(wrap);
      Array.from(wrap.children).forEach((child) => {
        if (isRow(child)) Array.from(child.children).forEach((c, i) => add(c, i));
        else add(child);
      });
    });
  });
  // Remaining scroll blocks, e.g. the sections of the legal pages
  main.querySelectorAll(".rv").forEach((el) => {
    if (![...units].some((u) => u.contains(el))) add(el);
  });

  const images = Array.from(main.querySelectorAll<HTMLElement>('div:has(> img[data-nimg="fill"])')).filter(
    (el) => !skip(el) && !el.closest("main > section:first-of-type"),
  );
  return { units: [...units], images };
}

/**
 * Scroll animations in both directions: blocks fade and glide in from the side the
 * user scrolls from, photos open with a navy curtain, line illustrations draw themselves.
 * Without JavaScript or with reduced motion, everything stays visible and static.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { units, images } = collect(main);
    units.forEach((el) => el.classList.add("rvx"));
    images.forEach((el) => el.classList.add("rvx-img"));
    const root = document.documentElement;
    root.classList.add("reveal-on");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.classList.add("is-in");
          else {
            el.classList.remove("is-in");
            el.dataset.from = e.boundingClientRect.top < 0 ? "top" : "bottom";
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    [...units, ...images].forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove("reveal-on");
      [...units, ...images].forEach((el) => el.classList.remove("rvx", "rvx-img", "is-in"));
    };
  }, [pathname]);

  return null;
}
