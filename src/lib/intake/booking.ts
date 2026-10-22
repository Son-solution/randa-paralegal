/**
 * DEMO calendar logic.
 *
 * Availability is simulated: "busy" slots are derived from a deterministic hash
 * of date and hour, so the calendar looks realistic without any server or
 * Google Calendar connection. Nothing is reserved. Working hours come from
 * src/config/booking.ts and are assumptions until confirmed.
 */
import { booking } from "@/config/booking";
import type { SlotState } from "./constants";
import { addDays, daysBetween, daysInMonth, dow, isoFrom, zurichNow } from "./dates";

export type Format = "online" | "vorort";

export type Slot = { h: number; state: SlotState; disabled: boolean };

export type DayInfo = { av: boolean; kind: "past" | "na" | "av"; reason: string };

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Simulated existing booking at this hour (demo only). */
export function busy(iso: string, h: number): boolean {
  return hash(iso + ":" + h) % 3 === 0;
}

/** Each slot: free | busy (booked) | travel (in-person travel buffer) | past (within the minimum notice or over). */
export function slotsFor(iso: string, format: string): Slot[] {
  const now = zurichNow();
  const range = booking.hours[dow(iso)];
  if (!range) return [];
  // Minutes from now until midnight at the start of `iso` (Swiss wall-clock time).
  const dayStart = daysBetween(now.iso, iso) * 1440 - (now.h * 60 + now.m);
  const out: Slot[] = [];
  for (let h = range[0]; h <= range[1]; h++) {
    let st: SlotState = "free";
    if (dayStart + h * 60 < booking.minNoticeHours * 60) st = "past";
    else if (busy(iso, h)) st = "busy";
    else if (format === "vorort" && (busy(iso, h - 1) || busy(iso, h + 1))) st = "travel";
    out.push({ h, state: st, disabled: st !== "free" });
  }
  return out;
}

export function dayInfo(iso: string, format: string): DayInfo {
  const now = zurichNow();
  if (iso < now.iso) return { av: false, kind: "past", reason: "vergangen" };
  if (!booking.hours[dow(iso)]) return { av: false, kind: "na", reason: "Wochenende, geschlossen" };
  if (iso > addDays(now.iso, booking.horizonDays)) return { av: false, kind: "na", reason: "noch nicht buchbar" };
  const slots = slotsFor(iso, format);
  if (!slots.some((x) => !x.disabled)) {
    // Every slot is inside the minimum notice period (e.g. today or tomorrow morning).
    if (slots.every((x) => x.state === "past"))
      return { av: false, kind: "na", reason: (iso === now.iso ? "heute, " : "") + "Termine nur mit " + booking.minNoticeHours + " Stunden Vorlauf" };
    return { av: false, kind: "na", reason: "ausgebucht (Demo)" };
  }
  return { av: true, kind: "av", reason: "Demo-Zeiten verfügbar" };
}

/** True while the chosen demo slot ("HH:00") on `iso` can still be booked. */
export function isSlotFree(iso: string, time: string, format: string): boolean {
  if (!iso || !time) return false;
  const h = parseInt(time, 10);
  return slotsFor(iso, format).some((x) => x.h === h && !x.disabled);
}

export function dayAvailable(iso: string, format: string): boolean {
  return dayInfo(iso, format).av;
}

/** First bookable day of a month (or the 1st if none). */
export function firstAvailableIn(y: number, m: number, format: string): string {
  const days = daysInMonth(y, m);
  for (let d = 1; d <= days; d++) {
    const iso = isoFrom(y, m, d);
    if (dayAvailable(iso, format)) return iso;
  }
  return isoFrom(y, m, 1);
}
