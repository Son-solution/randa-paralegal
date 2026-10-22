/** Form state of the intake form. Kept in React state (memory) only – never in localStorage/sessionStorage. */
import type { ServiceId } from "./constants";
import { addDays, isoParts, zurichNow } from "./dates";
import type { FileError, FileMeta } from "./files";

export type FormData = {
  services: Record<ServiceId, boolean>;
  /** fuer: "selbst" | "institution" (only offered with Dolmetschen); institution = name of the school/authority. */
  c: { anrede: string; vorname: string; nachname: string; email: string; telefon: string; ort: string; kontakt: string; alter: string; fuer: string; institution: string };
  a: { aufgaben: Record<string, boolean>; stelle: string; situation: string; dokumente: string; frist: string; fristDatum: string; ziel: string };
  y: { situation: string; interessen: string; unterstuetzung: Record<string, boolean>; herausforderungen: string; art: string; sprache: string };
  i: { art: string; richtung: string; variante: string; anlass: string; thema: string; datum: string; zeit: string; dauer: string; modus: string };
  u: { level: string; frist: string; grund: string };
  files: FileMeta[];
  b: { mode: string; format: string; date: string; time: string; calY: number; calM: number; calFocus: string };
  consent: { privacy: boolean; self: boolean; wa: boolean };
};

export type FormState = FormData & {
  step: number;
  maxStep: number;
  attempted: Record<number, boolean>;
  focusTick: number;
  fileErrors: FileError[];
  drag: boolean;
  slotsLoading: boolean;
  svcNotice: string;
  returnTo6: boolean;
  submitting: boolean;
  submitted: boolean;
  ref: string;
  announce: string;
  draftPanel: boolean;
  hasMemDraft: boolean;
};

/** Groups whose fields are plain strings (used by the generic change handlers). */
export type TextGroup = "c" | "a" | "y" | "i" | "u";

/** Snapshot of the form data for the demo "save draft" (in memory only). */
export type Draft = Pick<FormState, "step" | "maxStep" | keyof FormData>;

export const DRAFT_KEYS: (keyof Draft)[] = ["step", "maxStep", "services", "c", "a", "y", "i", "u", "files", "b", "consent"];

export function clone<T>(o: T): T {
  return JSON.parse(JSON.stringify(o)) as T;
}

export function initialState(): FormState {
  const now = zurichNow();
  const p = isoParts(now.iso);
  return {
    step: 1,
    maxStep: 1,
    attempted: {},
    focusTick: 0,
    services: { admin: false, youth: false, interp: false },
    c: { anrede: "", vorname: "", nachname: "", email: "", telefon: "", ort: "", kontakt: "email", alter: "", fuer: "selbst", institution: "" },
    a: { aufgaben: {}, stelle: "", situation: "", dokumente: "", frist: "", fristDatum: "", ziel: "" },
    y: { situation: "", interessen: "", unterstuetzung: {}, herausforderungen: "", art: "", sprache: "" },
    i: { art: "", richtung: "", variante: "", anlass: "", thema: "", datum: "", zeit: "", dauer: "", modus: "" },
    u: { level: "normal", frist: "", grund: "" },
    files: [],
    fileErrors: [],
    drag: false,
    b: { mode: "ohne", format: "", date: "", time: "", calY: p.y, calM: p.m, calFocus: "" },
    slotsLoading: false,
    svcNotice: "",
    returnTo6: false,
    consent: { privacy: false, self: false, wa: false },
    submitting: false,
    submitted: false,
    ref: "",
    announce: "",
    draftPanel: false,
    hasMemDraft: false,
  };
}

/** Fictitious example data for demonstrations ("Beispiel-Entwurf laden"). */
export function sampleDraft(): FormState {
  const s = initialState();
  const now = zurichNow();
  s.services = { admin: true, youth: false, interp: true };
  s.c = { anrede: "Frau", vorname: "Beispiel", nachname: "Muster", email: "beispiel@example.ch", telefon: "", ort: "Zürich", kontakt: "email", alter: "", fuer: "selbst", institution: "" };
  s.a = {
    aufgaben: { brief: true, formular: true },
    stelle: "Steueramt",
    situation: "Beispieltext: Ich habe einen Brief vom Steueramt erhalten und verstehe nicht genau, welche Unterlagen ich nachreichen soll.",
    dokumente: "teilweise",
    frist: "ja",
    fristDatum: addDays(now.iso, 20),
    ziel: "Die fehlenden Unterlagen fristgerecht einreichen.",
  };
  s.i = { art: "termin", richtung: "de-ar", variante: "", anlass: "Schule oder Elterngespräch", thema: "Elterngespräch zur Lehrstellensuche", datum: addDays(now.iso, 16), zeit: "14:00", dauer: "Bis 1 Stunde", modus: "vorort" };
  s.u = { level: "dringend", frist: "", grund: "" };
  s.files = [{ id: "sample-1", name: "Beispiel_Brief_Steueramt.pdf", ext: "PDF", size: 251904 }];
  s.step = 3;
  s.maxStep = 3;
  return s;
}
