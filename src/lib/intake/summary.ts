/**
 * Readable summary of a request. Used by the review step (step 6) and by the
 * e-mail sent to Randa, so both always show the same information.
 */
import { booking, uploads } from "@/config/booking";
import { isSlotFree } from "./booking";
import { ADMIN_TASKS, AGE, DOCS, FORMAT, FRIST, FUER, INT_ART, INT_DIR, INT_MODUS, KONTAKT, SERVICES, URG, YOUTH_ART, YOUTH_SUP, labelOf, type Option } from "./constants";
import { fmtLong, fmtShort, hhmm } from "./dates";
import type { FormData } from "./state";
import { asInstitution } from "./validation";

export type SummaryRow = { k: string; v: string };

export type Summary = {
  services: string;
  contact: SummaryRow[];
  /** Empty when the service was not chosen. */
  admin: SummaryRow[];
  youth: SummaryRow[];
  interp: SummaryRow[];
  urgency: SummaryRow[];
  files: string;
  booking: string;
};

const rows = (pairs: [string, string][]): SummaryRow[] => pairs.filter((p) => p[1] && String(p[1]).trim()).map((p) => ({ k: p[0], v: p[1] }));
const joinChecked = (list: Option[], map: Record<string, boolean>) => list.filter((o) => map[o.id]).map((o) => o.label).join(", ");

/** The chosen appointment as text ("" while none is chosen or the slot is no longer bookable). */
export function chosenSlotLabel(s: Pick<FormData, "b">): string {
  const fmt = s.b.format || "online";
  if (s.b.mode !== "mit" || !isSlotFree(s.b.date, s.b.time, fmt)) return "";
  const h = parseInt(s.b.time, 10);
  return fmtLong(s.b.date) + ", " + hhmm(h, 0) + "–" + hhmm(h, booking.durationMinutes) + " Uhr";
}

export function buildSummary(s: FormData): Summary {
  const hasYouth = s.services.youth;
  const under18 = hasYouth && (s.c.alter === "u16" || s.c.alter === "16-17");
  const asInst = asInstitution(s);

  const contact = rows([
    ["Anfrage", s.services.interp ? (asInst ? "Im Namen von: " + s.c.institution.trim() : labelOf(FUER, "selbst")) : ""],
    ["Anrede", s.c.anrede], ["Name", (s.c.vorname + " " + s.c.nachname).trim()], ["E-Mail", s.c.email], ["Telefon", s.c.telefon || "—"],
    ["Wohnort / Gemeinde", s.c.ort], ["Bevorzugter Kontaktweg", labelOf(KONTAKT, s.c.kontakt)], ["Altersgruppe", hasYouth ? AGE[s.c.alter] || "" : ""],
  ]);
  const admin = !s.services.admin ? [] : rows([
    ["Unterstützung", joinChecked(ADMIN_TASKS, s.a.aufgaben)], ["Stelle", s.a.stelle], ["Situation", s.a.situation],
    ["Unterlagen vorhanden", labelOf(DOCS, s.a.dokumente)], ["Behördliche Frist", s.a.frist === "ja" ? "Ja, bis " + fmtShort(s.a.fristDatum) : labelOf(FRIST, s.a.frist)], ["Gewünschtes Ergebnis", s.a.ziel],
  ]);
  const youth = !hasYouth ? [] : rows([
    ["Aktuelle Situation", s.y.situation], ["Unterstützung", joinChecked(YOUTH_SUP, s.y.unterstuetzung)], ["Interessen und Ziele", s.y.interessen],
    ["Herausforderungen", s.y.herausforderungen], ["Form des Coachings", labelOf(YOUTH_ART, s.y.art)], ["Sprache", s.y.sprache],
    ["Unter 18 Jahre", under18 ? "Ja – vorläufiger Hinweis zur Einwilligung beachten" : s.c.alter ? "Nein" : ""],
  ]);
  const interp = !s.services.interp ? [] : rows([
    ["Art", labelOf(INT_ART, s.i.art)], ["Sprachrichtung", labelOf(INT_DIR, s.i.richtung) + (s.i.richtung ? " (vorläufig)" : "")], ["Variante / Dialekt", s.i.variante],
    ["Termin oder Dokument", s.i.anlass], ["Thema", s.i.thema],
    [s.i.art === "termin" ? "Datum des Termins" : "Gewünscht bis", s.i.datum ? fmtShort(s.i.datum) + (s.i.art === "termin" && s.i.zeit ? ", " + s.i.zeit.replace(":", ".") + " Uhr" : "") : ""],
    ["Dauer", s.i.art === "termin" ? s.i.dauer : ""], ["Durchführung", s.i.art === "termin" ? labelOf(INT_MODUS, s.i.modus) : ""],
  ]);

  const deadlines: string[] = [];
  if (s.services.admin && s.a.frist === "ja" && s.a.fristDatum) deadlines.push("Behördliche Frist: " + fmtShort(s.a.fristDatum));
  if (s.services.interp && s.i.art === "termin" && s.i.datum) deadlines.push("Dolmetsch-Termin: " + fmtShort(s.i.datum));
  if (s.u.frist) deadlines.push("Wichtiges Datum: " + fmtShort(s.u.frist));
  const urgency = rows([["Dringlichkeit", labelOf(URG, s.u.level) + " (eigene Einschätzung)"], ["Fristen und Daten", deadlines.join("\n") || "Keine angegeben"], ["Begründung", s.u.grund]]);

  const files = !uploads.enabled
    ? "Unterlagen können nach der Kontaktaufnahme per E-Mail gesendet werden."
    : s.files.length ? s.files.map((f) => f.name).join("\n") : "Keine Dokumente hinzugefügt.";

  const slot = chosenSlotLabel(s);
  const bookingText =
    s.b.mode === "mit"
      ? slot ? slot + " · " + labelOf(FORMAT, s.b.format) : "Termin gewünscht, aber noch nicht gewählt."
      : "Anfrage ohne Termin – der Termin wird nach der Anfrage vereinbart.";

  return {
    services: SERVICES.filter((x) => s.services[x.id]).map((x) => x.title).join(" · ") || "—",
    contact, admin, youth, interp, urgency, files, booking: bookingText,
  };
}
