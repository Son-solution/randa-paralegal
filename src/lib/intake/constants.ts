/** Static option lists of the intake form ("Anfrage & Termin"). */

export type ServiceId = "admin" | "youth" | "interp";

export type Option = { id: string; label: string; desc?: string };

export const SERVICES: { id: ServiceId; num: string; title: string; desc: string }[] = [
  { id: "admin", num: "I.", title: "Administrative Unterstützung", desc: "Formulare, Briefe, Schriftverkehr und Unterlagen – ohne Rechtsberatung." },
  { id: "youth", num: "II.", title: "Jugendcoaching & Berufsorientierung", desc: "Berufswahl, Bewerbung und Orientierung im Schweizer Bildungssystem." },
  { id: "interp", num: "III.", title: "Dolmetschen & Sprachhilfe", desc: "Arabisch und Aramäisch – bei Terminen und für einfache Dokumente." },
];

export const STEPS = ["Leistungen", "Kontakt", "Anliegen", "Dokumente", "Termin", "Überprüfen"];

/** Who submits the request – institutions only for Dolmetschen (see the FAQ on /dolmetschen). */
export const FUER: Option[] = [
  { id: "selbst", label: "Für mich selbst" },
  { id: "institution", label: "Für eine Schule, Behörde oder Institution" },
];

export const KONTAKT: Option[] = [
  { id: "email", label: "E-Mail" },
  { id: "telefon", label: "Telefon" },
  { id: "whatsapp", label: "WhatsApp" },
];

export const AGE: Record<string, string> = {
  u16: "Unter 16 Jahre",
  "16-17": "16–17 Jahre",
  "18-20": "18–20 Jahre",
  "21-25": "21–25 Jahre",
  "26+": "26 Jahre oder älter",
};

export const ADMIN_TASKS: Option[] = [
  { id: "formular", label: "Formular oder Antrag ausfüllen" },
  { id: "brief", label: "Behördlichen Brief verstehen" },
  { id: "schreiben", label: "Brief oder E-Mail verfassen" },
  { id: "ordnen", label: "Unterlagen ordnen" },
  { id: "anderes", label: "Anderes" },
];

export const DOCS: Option[] = [
  { id: "ja", label: "Ja, liegen vor" },
  { id: "teilweise", label: "Teilweise" },
  { id: "nein", label: "Nein, noch nicht" },
];

export const FRIST: Option[] = [
  { id: "ja", label: "Ja" },
  { id: "nein", label: "Nein" },
  { id: "unklar", label: "Weiss ich nicht" },
];

export const YOUTH_SUP: Option[] = [
  { id: "berufswahl", label: "Berufswahl und passende Berufsfelder" },
  { id: "schnupper", label: "Schnupperlehren und Praktika" },
  { id: "lehrstelle", label: "Lehrstellensuche" },
  { id: "dossier", label: "Lebenslauf und Motivationsschreiben" },
  { id: "gespraech", label: "Vorbereitung auf Vorstellungsgespräche" },
  { id: "system", label: "Orientierung im Schweizer Bildungssystem" },
];

export const YOUTH_ART: Option[] = [
  { id: "online", label: "Online über Google Meet" },
  { id: "vorort", label: "Persönlich in Zürich und Umgebung" },
  { id: "offen", label: "Noch offen" },
];

export const INT_ART: Option[] = [
  { id: "termin", label: "Dolmetschen bei einem Termin", desc: "Begleitung zu einem Gespräch, z. B. bei einer Behörde oder Schule." },
  { id: "dokument", label: "Übersetzung eines einfachen Dokuments", desc: "Brief, Mitteilung oder Formular." },
  { id: "hilfe", label: "Einfache Sprachhilfe", desc: "Zum Beispiel einen Brief gemeinsam verstehen." },
];

export const INT_DIR: Option[] = [
  { id: "de-ar", label: "Deutsch ⇄ Arabisch" },
  { id: "de-arc", label: "Deutsch ⇄ Aramäisch" },
];

export const INT_MODUS: Option[] = [
  { id: "vorort", label: "Vor Ort" },
  { id: "online", label: "Online" },
  { id: "telefon", label: "Telefonisch" },
];

export const URG: Option[] = [
  { id: "normal", label: "Normal", desc: "Kein unmittelbarer Zeitdruck." },
  { id: "dringend", label: "Dringend", desc: "Eine Frist oder ein Termin steht in den nächsten Wochen an." },
  { id: "sehr", label: "Sehr dringend", desc: "Eine Frist läuft in den nächsten Tagen ab." },
];

export const BOOK: Option[] = [
  { id: "ohne", label: "Anfrage ohne Termin", desc: "Ich melde mich bei Ihnen, um einen Termin zu vereinbaren." },
  { id: "mit", label: "Anfrage mit Termin", desc: "Sie wählen direkt ein Zeitfenster für das Erstgespräch." },
];

export const FORMAT: Option[] = [
  { id: "online", label: "Online über Google Meet", desc: "Den Link erhalten Sie mit der Bestätigung." },
  { id: "vorort", label: "Persönlich in Zürich und Umgebung", desc: "Der Treffpunkt wird individuell vereinbart." },
];

export type SlotState = "free" | "busy" | "travel" | "past";

export const SLOT_TEXT: Record<SlotState, string> = { free: "frei", busy: "belegt", travel: "Reisezeit", past: "vorbei" };

export const WD = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
export const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

/** Returns the label of an option id ('' if not found). */
export function labelOf(list: Option[], id: string): string {
  const o = list.find((x) => x.id === id);
  return o ? o.label : "";
}
