/** Client-side validation of the intake form (one list of errors per step). */
import { isSlotFree } from "./booking";
import { zurichNow } from "./dates";
import type { FormState } from "./state";

export type ErrKey =
  | "services" | "c_institution" | "c_vorname" | "c_nachname" | "c_email" | "c_telefon" | "c_alter"
  | "a_aufgaben" | "a_situation" | "a_fristDatum" | "y_situation" | "y_unterstuetzung"
  | "i_art" | "i_richtung" | "i_datum" | "i_modus" | "u_frist" | "b_format" | "b_slot"
  | "consent_privacy" | "consent_self" | "consent_wa";

export const ERR_KEYS: ErrKey[] = [
  "services", "c_institution", "c_vorname", "c_nachname", "c_email", "c_telefon", "c_alter", "a_aufgaben", "a_situation", "a_fristDatum",
  "y_situation", "y_unterstuetzung", "i_art", "i_richtung", "i_datum", "i_modus", "u_frist", "b_format", "b_slot",
  "consent_privacy", "consent_self", "consent_wa",
];

/** k = field key, id = element to focus, msg = message shown in the error summary. */
export type FieldError = { k: ErrKey; id: string; msg: string };

export function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

export function validPhone(v: string): boolean {
  const digits = v.replace(/[^\d]/g, "");
  // Allows Swiss notations such as "+41 79 123 45 67", "079 123 45 67" or "(044) 123 45 67".
  return /^[+(\d][\d\s().\/-]*$/.test(v.trim()) && digits.length >= 9 && digits.length <= 15;
}

const anyTrue = (m: Record<string, boolean>) => Object.keys(m).some((k) => m[k]);

/** Request on behalf of a school, authority or institution (offered only together with Dolmetschen). */
export function asInstitution(s: FormState): boolean {
  return s.services.interp && s.c.fuer === "institution";
}

export function validate(step: number, s: FormState): FieldError[] {
  const e: FieldError[] = [];
  const now = zurichNow();
  if (step === 1) {
    if (!s.services.admin && !s.services.youth && !s.services.interp)
      e.push({ k: "services", id: "svc-admin", msg: "Bitte wählen Sie mindestens eine Leistung aus." });
  }
  if (step === 2) {
    if (asInstitution(s) && !s.c.institution.trim())
      e.push({ k: "c_institution", id: "f-c-institution", msg: "Bitte geben Sie den Namen der Schule, Behörde oder Institution an." });
    if (!s.c.vorname.trim()) e.push({ k: "c_vorname", id: "f-c-vorname", msg: "Bitte geben Sie Ihren Vornamen ein." });
    if (!s.c.nachname.trim()) e.push({ k: "c_nachname", id: "f-c-nachname", msg: "Bitte geben Sie Ihren Nachnamen ein." });
    if (!s.c.email.trim()) e.push({ k: "c_email", id: "f-c-email", msg: "Bitte geben Sie Ihre E-Mail-Adresse ein." });
    else if (!validEmail(s.c.email))
      e.push({ k: "c_email", id: "f-c-email", msg: "Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@beispiel.ch." });
    const needTel = s.c.kontakt === "telefon" || s.c.kontakt === "whatsapp";
    if (needTel && !s.c.telefon.trim())
      e.push({
        k: "c_telefon",
        id: "f-c-telefon",
        msg: "Für die Kontaktaufnahme per " + (s.c.kontakt === "whatsapp" ? "WhatsApp" : "Telefon") + " benötigen wir Ihre Telefonnummer.",
      });
    else if (s.c.telefon.trim() && !validPhone(s.c.telefon))
      e.push({ k: "c_telefon", id: "f-c-telefon", msg: "Bitte geben Sie eine gültige Telefonnummer ein (9 bis 15 Ziffern, z. B. mit +41)." });
    if (s.services.youth && !s.c.alter) e.push({ k: "c_alter", id: "f-c-alter", msg: "Bitte wählen Sie Ihre Altersgruppe." });
  }
  if (step === 3) {
    if (s.services.admin) {
      if (!anyTrue(s.a.aufgaben))
        e.push({ k: "a_aufgaben", id: "f-a-aufgaben-formular", msg: "Administrative Unterstützung: Bitte wählen Sie mindestens eine Art der Unterstützung." });
      if (s.a.situation.trim().length < 10)
        e.push({ k: "a_situation", id: "f-a-situation", msg: "Administrative Unterstützung: Bitte beschreiben Sie kurz Ihre Situation (mindestens 10 Zeichen)." });
      if (s.a.frist === "ja" && !s.a.fristDatum)
        e.push({ k: "a_fristDatum", id: "f-a-fristDatum", msg: "Administrative Unterstützung: Bitte geben Sie das Datum der Frist an." });
    }
    if (s.services.youth) {
      if (!s.y.situation) e.push({ k: "y_situation", id: "f-y-situation", msg: "Jugendcoaching: Bitte wählen Sie Ihre aktuelle Situation." });
      if (!anyTrue(s.y.unterstuetzung))
        e.push({ k: "y_unterstuetzung", id: "f-y-unterstuetzung-berufswahl", msg: "Jugendcoaching: Bitte wählen Sie mindestens einen Bereich." });
    }
    if (s.services.interp) {
      if (!s.i.art) e.push({ k: "i_art", id: "f-i-art-termin", msg: "Dolmetschen: Bitte wählen Sie, worum es geht." });
      if (!s.i.richtung) e.push({ k: "i_richtung", id: "f-i-richtung-de-ar", msg: "Dolmetschen: Bitte wählen Sie die Sprachrichtung." });
      if (s.i.art === "termin") {
        if (!s.i.datum) e.push({ k: "i_datum", id: "f-i-datum", msg: "Dolmetschen: Bitte geben Sie das Datum des Termins an." });
        else if (s.i.datum < now.iso) e.push({ k: "i_datum", id: "f-i-datum", msg: "Dolmetschen: Das Datum des Termins liegt in der Vergangenheit." });
        if (!s.i.modus) e.push({ k: "i_modus", id: "f-i-modus-vorort", msg: "Dolmetschen: Bitte wählen Sie, wie der Termin stattfindet." });
      }
      if (s.i.art === "dokument" && s.i.datum && s.i.datum < now.iso)
        e.push({ k: "i_datum", id: "f-i-datum2", msg: "Dolmetschen: Das gewünschte Datum liegt in der Vergangenheit." });
    }
    if (s.u.frist && s.u.frist < now.iso) e.push({ k: "u_frist", id: "f-u-frist", msg: "Dringlichkeit: Das angegebene Datum liegt in der Vergangenheit." });
  }
  if (step === 5 && s.b.mode === "mit") {
    if (!s.b.format) e.push({ k: "b_format", id: "f-b-format-online", msg: "Bitte wählen Sie, ob das Erstgespräch online oder persönlich stattfinden soll." });
    if (!s.b.date || !s.b.time) e.push({ k: "b_slot", id: "cal-grid", msg: "Bitte wählen Sie einen Tag und eine Uhrzeit – oder wählen Sie «Anfrage ohne Termin»." });
    // The chosen slot can expire (minimum notice) or no longer fit after the format was changed.
    else if (s.b.format && !isSlotFree(s.b.date, s.b.time, s.b.format))
      e.push({ k: "b_slot", id: "cal-grid", msg: "Die gewählte Demo-Zeit ist nicht mehr verfügbar. Bitte wählen Sie einen anderen Tag oder eine andere Uhrzeit." });
  }
  if (step === 6) {
    if (!s.consent.privacy) e.push({ k: "consent_privacy", id: "f-consent-privacy", msg: "Bitte bestätigen Sie die Kenntnisnahme der Datenschutzerklärung." });
    if (!s.consent.self)
      e.push({
        k: "consent_self",
        id: "f-consent-self",
        msg: asInstitution(s)
          ? "Bitte bestätigen Sie, dass Sie die Anfrage im Namen der angegebenen Institution stellen."
          : "Bitte bestätigen Sie, dass Sie die Anfrage für sich selbst stellen.",
      });
    if (s.c.kontakt === "whatsapp" && !s.consent.wa)
      e.push({ k: "consent_wa", id: "f-consent-wa", msg: "Bitte willigen Sie in die Kontaktaufnahme per WhatsApp ein – oder wählen Sie in Schritt 2 einen anderen Kontaktweg." });
  }
  return e;
}
