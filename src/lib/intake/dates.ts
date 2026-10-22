/**
 * Date helpers. All dates are plain ISO strings (YYYY-MM-DD) in Swiss time
 * (Europe/Zurich), independent of the visitor's own time zone.
 */
import { booking } from "@/config/booking";
import { MONTHS, WD } from "./constants";

export function pad(n: number): string {
  return (n < 10 ? "0" : "") + n;
}

export type ZurichNow = { iso: string; h: number; m: number };

// Created once: constructing an Intl.DateTimeFormat is expensive and zurichNow() runs many times per render.
let zurichFmt: Intl.DateTimeFormat | null = null;

export function zurichNow(): ZurichNow {
  if (!zurichFmt) {
    zurichFmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: booking.timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
  }
  const parts = zurichFmt.formatToParts(new Date());
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return { iso: g("year") + "-" + g("month") + "-" + g("day"), h: parseInt(g("hour"), 10), m: parseInt(g("minute"), 10) };
}

export function isoParts(iso: string): { y: number; m: number; d: number } {
  const p = iso.split("-").map((x) => parseInt(x, 10));
  return { y: p[0], m: p[1] - 1, d: p[2] };
}

/** Builds an ISO date; month is 0-based and overflowing values roll over. */
export function isoFrom(y: number, m: number, d: number): string {
  const dt = new Date(Date.UTC(y, m, d));
  return dt.getUTCFullYear() + "-" + pad(dt.getUTCMonth() + 1) + "-" + pad(dt.getUTCDate());
}

export function addDays(iso: string, n: number): string {
  const p = isoParts(iso);
  return isoFrom(p.y, p.m, p.d + n);
}

/** Day of week, 0 = Sunday … 6 = Saturday. */
export function dow(iso: string): number {
  const p = isoParts(iso);
  return new Date(Date.UTC(p.y, p.m, p.d)).getUTCDay();
}

/** Whole days from ISO date a to ISO date b (negative if b is earlier). */
export function daysBetween(a: string, b: string): number {
  const pa = isoParts(a);
  const pb = isoParts(b);
  return Math.round((Date.UTC(pb.y, pb.m, pb.d) - Date.UTC(pa.y, pa.m, pa.d)) / 86400000);
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
}

/** 07.03.2027 */
export function fmtShort(iso: string): string {
  if (!iso) return "";
  const p = isoParts(iso);
  return pad(p.d) + "." + pad(p.m + 1) + "." + p.y;
}

/** Sonntag, 7. März 2027 */
export function fmtLong(iso: string): string {
  const p = isoParts(iso);
  return WD[dow(iso)] + ", " + p.d + ". " + MONTHS[p.m] + " " + p.y;
}

/** Swiss time notation: 09.45 */
export function hhmm(h: number, m = 0): string {
  return pad(h) + "." + pad(m);
}
