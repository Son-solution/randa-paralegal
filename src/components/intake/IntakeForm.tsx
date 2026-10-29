"use client";

/**
 * Intake form "Anfrage & Termin" – DEMO MODE.
 *
 * - Nothing is transmitted, uploaded, stored or booked. There is no network request.
 * - All entries live in React state (memory) only and are lost on reload.
 *   localStorage / sessionStorage are deliberately NOT used.
 * - Uploaded files: only name, type and size are kept for display; the content is never read.
 * - The calendar availability is simulated (see src/lib/intake/booking.ts).
 * - The submission is simulated and creates a demo reference (DEMO-RPS-YYYY-NNNN).
 *
 * The markup is ported 1:1 from the approved prototype so the page looks identical.
 */
import Link from "next/link";
import LuxuryOrnaments from "@/components/ui/LuxuryOrnaments";
import { Component, Fragment, type ChangeEvent, type CSSProperties, type DragEvent, type FocusEvent, type FormEvent, type KeyboardEvent, type MouseEvent } from "react";
import { booking, uploads } from "@/config/booking";
import { firstAvailableIn, dayInfo, isSlotFree, slotsFor, type Slot } from "@/lib/intake/booking";
import {
  ADMIN_TASKS, AGE, BOOK, DOCS, FORMAT, FRIST, FUER, INT_ART, INT_DIR, INT_MODUS, KONTAKT, MONTHS, SERVICES, SLOT_TEXT, STEPS, URG,
  YOUTH_ART, YOUTH_SUP, labelOf, type Option,
} from "@/lib/intake/constants";
import { addDays, daysInMonth, dow, fmtLong, fmtShort, hhmm, isoFrom, isoParts, pad, zurichNow } from "@/lib/intake/dates";
import { addFileMeta, sizeLabel } from "@/lib/intake/files";
import { clone, DRAFT_KEYS, initialState, sampleDraft, type Draft, type FormState, type TextGroup } from "@/lib/intake/state";
import { asInstitution, ERR_KEYS, validate, type ErrKey } from "@/lib/intake/validation";

type Bool = "true" | "false";
type HistKey = number | "done";
type FieldEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
type AnyGroup = TextGroup | "b";
type ToggleGroup = { a: "aufgaben"; y: "unterstuetzung" };

const bool = (b: boolean): Bool => (b ? "true" : "false");

export default class IntakeForm extends Component<Record<string, never>, FormState> {
  private memDraft: Draft | null = null;
  private timers: ReturnType<typeof setTimeout>[] = [];
  private prev: { step: number; submitted: boolean; focusTick: number } | null = null;
  private focusId: string | null = null;
  private revealSlots = false;
  // dragenter/dragleave also fire for the drop zone's child elements; the counter keeps the highlight steady.
  private dragDepth = 0;
  private readonly onPopBound = (ev: PopStateEvent) => this.onPop(ev);

  constructor(props: Record<string, never>) {
    super(props);
    this.state = initialState();
  }

  componentDidMount() {
    const st = this.state;
    this.prev = { step: st.step, submitted: st.submitted, focusTick: st.focusTick };
    window.addEventListener("popstate", this.onPopBound);
    this.hist("replace", 1);
  }

  componentWillUnmount() {
    this.timers.forEach((t) => clearTimeout(t));
    window.removeEventListener("popstate", this.onPopBound);
  }

  // Browser history: each step gets its own entry (#schritt-n), so Back/Forward move between steps.
  hist(mode: "replace" | "push", key: HistKey) {
    try {
      const hash = key === "done" ? "#bestaetigung" : "#schritt-" + key;
      const data = Object.assign({}, window.history.state || {}, { rps: key });
      if (mode === "replace") window.history.replaceState(data, "", hash);
      else if (window.location.hash !== hash) window.history.pushState(data, "", hash);
    } catch {
      /* history unavailable: in-page navigation still works */
    }
  }

  onPop(ev: PopStateEvent) {
    let key: HistKey | null = ev && ev.state && ev.state.rps != null ? (ev.state.rps as HistKey) : null;
    if (key == null) {
      const m = /^#schritt-(\d)$/.exec(window.location.hash || "");
      if (m) key = parseInt(m[1], 10);
      else if (window.location.hash === "#bestaetigung") key = "done";
      else return;
    }
    if (key === "done") {
      if (this.state.ref) this.setState({ submitted: true, announce: "Bestätigung." });
      else this.hist("replace", this.state.step);
      return;
    }
    const target = Math.max(1, Math.min(key, this.state.maxStep));
    if (target !== key) this.hist("replace", target);
    this.setState({ step: target, submitted: false, announce: "Schritt " + target + " von 6: " + STEPS[target - 1] });
  }

  // Space taken by the sticky header (top) and, on phones, the sticky action bar (bottom).
  obstruct() {
    const h = document.querySelector("header.hdr");
    const top = h ? Math.max(0, h.getBoundingClientRect().bottom) : 0;
    const f = document.querySelector("form .foot");
    const bottom = f && window.getComputedStyle(f).position === "sticky" ? f.getBoundingClientRect().height : 0;
    return { top, bottom };
  }

  inView(el: Element, extra = 0) {
    const o = this.obstruct();
    const r = el.getBoundingClientRect();
    return r.top >= o.top + 8 && r.bottom <= window.innerHeight - o.bottom - extra;
  }

  // Instant jump (not smooth): the target is in place immediately for focus, screen readers and the next action.
  scrollToEl(el: Element, gap = 24) {
    const o = this.obstruct();
    const r = el.getBoundingClientRect();
    window.scrollTo({ top: Math.max(0, window.scrollY + r.top - o.top - gap), behavior: "instant" as ScrollBehavior });
  }

  // Keep a focused control fully visible between the sticky header and (on phones) the sticky action bar.
  keepFocusedVisible(target: HTMLElement | null) {
    if (!target || !target.closest) return;
    if (target.closest(".foot") || target.closest(".cal")) return;
    if (!/^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(target.tagName)) return;
    const box = target.closest("label.chk, label.svc") || target;
    const o = this.obstruct();
    const r = box.getBoundingClientRect();
    const topLimit = o.top + 8;
    const bottomLimit = window.innerHeight - o.bottom - 12;
    if (r.height > bottomLimit - topLimit) return;
    let dy = 0;
    if (r.top < topLimit) dy = r.top - topLimit - 8;
    else if (r.bottom > bottomLimit) dy = r.bottom - bottomLimit + 8;
    if (dy) window.scrollBy({ top: dy, behavior: "instant" as ScrollBehavior });
  }

  revealField(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const box = el.closest(".fld") || el.closest("fieldset") || el;
    el.focus({ preventScroll: true });
    this.scrollToEl(box, 20);
  }

  componentDidUpdate() {
    const st = this.state;
    const ps = this.prev || { step: st.step, submitted: st.submitted, focusTick: st.focusTick };
    this.prev = { step: st.step, submitted: st.submitted, focusTick: st.focusTick };
    if (ps.step !== st.step || ps.submitted !== st.submitted) {
      const h = document.getElementById("step-title");
      const top = document.getElementById("form-top");
      if (h) {
        h.focus({ preventScroll: true });
        if (!this.inView(h, 80) || (top && top.getBoundingClientRect().top < this.obstruct().top)) this.scrollToEl(top || h, 16);
      }
    }
    if (ps.focusTick !== st.focusTick) {
      const es = document.getElementById("error-summary");
      if (es) {
        es.focus({ preventScroll: true });
        if (!this.inView(es, 0)) this.scrollToEl(es, 16);
      }
    }
    if (this.focusId) {
      const el = document.getElementById(this.focusId);
      this.focusId = null;
      if (el) {
        el.focus({ preventScroll: true });
        if (!this.inView(el, 0)) {
          // Prefer showing the whole calendar (month header + grid) when it fits on screen.
          const o = this.obstruct();
          const box = el.closest("#cal-grid");
          const fits = box && box.getBoundingClientRect().height < window.innerHeight - o.top - o.bottom - 32;
          this.scrollToEl(fits && box ? box : el, fits ? 16 : 90);
        }
      }
    }
    if (this.revealSlots) {
      this.revealSlots = false;
      const sl = document.getElementById("slot-list");
      if (sl && !this.inView(sl, 0)) {
        const o = this.obstruct();
        const r = sl.getBoundingClientRect();
        if (r.top < o.top + 8 || r.top > window.innerHeight - o.bottom - 60) this.scrollToEl(sl, 60);
      }
    }
  }

  later(fn: () => void, ms: number) {
    const t = setTimeout(fn, ms);
    this.timers.push(t);
  }

  setIn<G extends AnyGroup>(g: G, k: keyof FormState[G], v: string) {
    this.setState((s) => ({ [g]: { ...s[g], [k]: v } }) as unknown as Pick<FormState, G>);
  }

  toggleIn<G extends keyof ToggleGroup>(g: G, k: ToggleGroup[G], id: string) {
    this.setState((s) => {
      const group = s[g] as unknown as Record<string, Record<string, boolean>>;
      const m = { ...group[k] };
      m[id] = !m[id];
      return { [g]: { ...s[g], [k]: m } } as unknown as Pick<FormState, G>;
    });
  }

  toggleConsent(k: keyof FormState["consent"]) {
    this.setState((s) => ({ consent: { ...s.consent, [k]: !s.consent[k] } }));
  }

  selected(s: FormState) {
    return SERVICES.filter((x) => s.services[x.id]);
  }

  goTo(n: number, opts: { fromReview?: boolean; extra?: string; noPush?: boolean } = {}) {
    this.setState((s) => ({
      step: n,
      maxStep: Math.max(s.maxStep, n),
      submitted: false,
      returnTo6: opts.fromReview ? true : n === 6 ? false : s.returnTo6,
      svcNotice: n === 1 ? s.svcNotice : "",
      announce: "Schritt " + n + " von 6: " + STEPS[n - 1] + (opts.extra ? ". " + opts.extra : ""),
    }));
    if (!opts.noPush) this.hist("push", n);
  }

  // Go to step n and show its errors immediately.
  goToWithErrors(n: number, extra: string) {
    this.setState((st) => ({ attempted: { ...st.attempted, [n]: true }, focusTick: st.focusTick + 1 }));
    this.goTo(n, { extra });
  }

  next() {
    const s = this.state;
    const errs = validate(s.step, s);
    if (errs.length) {
      this.setState((st) => ({
        attempted: { ...st.attempted, [st.step]: true },
        focusTick: st.focusTick + 1,
        announce: errs.length === 1 ? "1 Angabe ist noch unvollständig." : errs.length + " Angaben sind noch unvollständig.",
      }));
      return;
    }
    if (s.returnTo6 && s.step < 6) {
      for (let n = s.step + 1; n <= 5; n++) {
        if (validate(n, s).length) {
          this.goToWithErrors(n, "Bitte ergänzen Sie diese Angaben, bevor Sie zur Übersicht zurückkehren.");
          return;
        }
      }
      this.goTo(6);
      return;
    }
    this.goTo(s.step + 1);
  }

  /** DEMO: simulates the submission. Nothing is sent – there is no network request. */
  submit() {
    const s = this.state;
    if (s.submitting) return;
    for (let n = 1; n <= 6; n++) {
      if (validate(n, s).length) {
        if (n === 6) {
          this.setState((st) => ({ attempted: { ...st.attempted, 6: true }, focusTick: st.focusTick + 1, announce: "Bitte bestätigen Sie die Einwilligungen." }));
        } else {
          this.setState({ returnTo6: true });
          this.goToWithErrors(n, "Bitte prüfen Sie diesen Schritt.");
        }
        return;
      }
    }
    this.setState({ submitting: true, announce: "Anfrage wird gesendet …" });
    this.later(() => {
      // Submitting again after "Back" from the confirmation keeps the same demo reference.
      const year = zurichNow().iso.slice(0, 4);
      const ref = this.state.ref || "RPS-" + year + "-" + String(Math.floor(1000 + Math.random() * 9000));
      this.setState({ submitting: false, submitted: true, ref, announce: "Vielen Dank für Ihre Anfrage." });
      this.hist("push", "done");
    }, 1300);
  }

  /** DEMO: keeps only file metadata in memory – the file content is never read or uploaded. */
  addFiles(list: FileList | null | undefined) {
    if (!list || !list.length) return;
    const { files, errors, added } = addFileMeta(this.state.files, list);
    let msg = "";
    if (added) msg += added === 1 ? "1 Datei hinzugefügt. " : added + " Dateien hinzugefügt. ";
    if (errors.length) msg += errors.length === 1 ? "1 Datei nicht hinzugefügt." : errors.length + " Dateien nicht hinzugefügt.";
    this.setState({ files, fileErrors: errors, drag: false, announce: msg.trim() });
  }

  removeFile(id: string) {
    const f = this.state.files.find((x) => x.id === id);
    this.setState((s) => ({ files: s.files.filter((x) => x.id !== id), fileErrors: [], announce: f ? "Datei entfernt: " + f.name : "" }));
    this.later(() => {
      const el = document.getElementById("f-files");
      if (el) el.focus();
    }, 30);
  }

  pickDate(iso: string) {
    const info = dayInfo(iso, this.state.b.format || "online");
    if (!info.av) {
      this.setState((s) => ({ b: { ...s.b, calFocus: iso }, announce: fmtLong(iso) + ": nicht wählbar – " + info.reason + "." }));
      return;
    }
    this.setState((s) => ({ b: { ...s.b, date: iso, time: "", calFocus: iso }, slotsLoading: true, announce: fmtLong(iso) + " ausgewählt. Zeiten werden geladen." }));
    this.later(() => {
      // Another day was picked in the meantime: its own timer finishes loading.
      if (this.state.b.date !== iso) return;
      this.revealSlots = true;
      this.setState({ slotsLoading: false, announce: "Freie Zeiten für " + fmtLong(iso) + " angezeigt." });
    }, 450);
  }

  pickTime(slot: Slot) {
    const s = this.state;
    const label = hhmm(slot.h, 0) + " bis " + hhmm(slot.h, booking.durationMinutes) + " Uhr";
    if (slot.disabled) {
      this.setState({ announce: label + " ist nicht wählbar (" + SLOT_TEXT[slot.state] + ")." });
      return;
    }
    const t = pad(slot.h) + ":00";
    this.setState((st) => ({ b: { ...st.b, time: t }, announce: "Termin gewählt: " + fmtLong(s.b.date) + ", " + label + "." }));
  }

  shiftMonth(n: number) {
    const s = this.state;
    let m = s.b.calM + n;
    let y = s.b.calY;
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    const focus = s.b.date && isoParts(s.b.date).m === m && isoParts(s.b.date).y === y ? s.b.date : firstAvailableIn(y, m, s.b.format || "online");
    this.setState((st) => ({ b: { ...st.b, calM: m, calY: y, calFocus: focus }, announce: MONTHS[m] + " " + y }));
  }

  // Arrow keys / Home / End / PageUp / PageDown inside the day grid (roving focus).
  calKey(ev: KeyboardEvent<HTMLDivElement>) {
    const s = this.state;
    const cur = s.b.calFocus || s.b.date || firstAvailableIn(s.b.calY, s.b.calM, s.b.format || "online");
    const step: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    let nxt: string;
    if (step[ev.key] != null) nxt = addDays(cur, step[ev.key]);
    else if (ev.key === "Home") nxt = addDays(cur, -((dow(cur) + 6) % 7));
    else if (ev.key === "End") nxt = addDays(cur, 6 - ((dow(cur) + 6) % 7));
    else if (ev.key === "PageUp" || ev.key === "PageDown") {
      const p = isoParts(cur);
      const dm = ev.key === "PageUp" ? -1 : 1;
      const dim = daysInMonth(p.y, p.m + dm);
      nxt = isoFrom(p.y, p.m + dm, Math.min(p.d, dim));
    } else return;
    ev.preventDefault();
    const now = zurichNow();
    const np = isoParts(now.iso);
    const hp = isoParts(addDays(now.iso, booking.horizonDays));
    const minIso = isoFrom(np.y, np.m, 1);
    const maxIso = isoFrom(hp.y, hp.m + 1, 0);
    if (nxt < minIso) nxt = minIso;
    if (nxt > maxIso) nxt = maxIso;
    const p = isoParts(nxt);
    this.focusId = "day-" + nxt;
    this.setState((st) => ({ b: { ...st.b, calFocus: nxt, calY: p.y, calM: p.m } }));
  }

  /** DEMO: the draft is kept in memory only (lost on reload) – never in browser storage. */
  saveDraft() {
    const s = this.state;
    const snap = {} as Record<string, unknown>;
    DRAFT_KEYS.forEach((k) => {
      snap[k] = clone(s[k]);
    });
    this.memDraft = snap as Draft;
    this.setState({ draftPanel: true, hasMemDraft: true, announce: "Entwurf gespeichert." });
  }

  restoreDraft() {
    if (!this.memDraft) return;
    const snap = clone(this.memDraft);
    this.setState({ ...initialState(), ...snap, hasMemDraft: true, announce: "Entwurf wiederhergestellt.", focusTick: this.state.focusTick });
    this.hist("push", snap.step);
  }

  toggleService(x: (typeof SERVICES)[number]) {
    this.setState((st) => {
      const on = !st.services[x.id];
      let notice = "";
      if (st.maxStep >= 3) {
        notice = on
          ? "«" + x.title + "» hinzugefügt. Die zugehörigen Fragen finden Sie in Schritt 3 – Ihre bisherigen Angaben bleiben erhalten." +
            (x.id === "youth" && !st.c.alter ? " Bitte ergänzen Sie ausserdem in Schritt 2 Ihre Altersgruppe." : "")
          : "«" + x.title + "» abgewählt. Ihre Antworten dazu bleiben vorgemerkt, werden aber nicht übermittelt, solange die Leistung abgewählt ist.";
      }
      return { services: { ...st.services, [x.id]: on }, svcNotice: notice, announce: x.title + (on ? " ausgewählt." : " abgewählt.") };
    });
  }

  /** Prepares every value the markup needs (same structure as in the prototype). */
  renderVals() {
    const s = this.state;
    const now = zurichNow();
    const att = !!s.attempted[s.step];
    const errs = att ? validate(s.step, s) : [];
    const E = {} as Record<ErrKey, string>;
    const I = {} as Record<ErrKey, Bool>;
    const H = {} as Record<ErrKey, boolean>;
    const D = {} as Record<ErrKey, string>;
    ERR_KEYS.forEach((k) => {
      E[k] = "";
      I[k] = "false";
      H[k] = false;
      D[k] = "";
    });
    errs.forEach((e) => {
      if (!H[e.k]) {
        E[e.k] = e.msg.replace(/^[^:]+: /, "");
        I[e.k] = "true";
        H[e.k] = true;
        D[e.k] = "e-" + e.k;
      }
    });

    const T = <G extends TextGroup>(g: G, k: keyof FormState[G]) => (ev: FieldEvent) => this.setIn(g, k, ev.target.value);
    const on = {
      c: { institution: T("c", "institution"), anrede: T("c", "anrede"), vorname: T("c", "vorname"), nachname: T("c", "nachname"), email: T("c", "email"), telefon: T("c", "telefon"), ort: T("c", "ort"), alter: T("c", "alter") },
      a: { stelle: T("a", "stelle"), situation: T("a", "situation"), fristDatum: T("a", "fristDatum"), ziel: T("a", "ziel") },
      y: { situation: T("y", "situation"), interessen: T("y", "interessen"), herausforderungen: T("y", "herausforderungen"), sprache: T("y", "sprache") },
      i: { variante: T("i", "variante"), anlass: T("i", "anlass"), thema: T("i", "thema"), datum: T("i", "datum"), zeit: T("i", "zeit"), dauer: T("i", "dauer") },
      u: { frist: T("u", "frist"), grund: T("u", "grund") },
    };
    const radios = <G extends AnyGroup>(list: Option[], g: G, k: keyof FormState[G], prefix: string) =>
      list.map((o) => {
        const checked = (s[g] as Record<string, unknown>)[k as string] === o.id;
        return { id: prefix + "-" + o.id, name: prefix, label: o.label, desc: o.desc || "", checked, cls: checked ? "on" : "", pick: () => this.setIn(g, k, o.id) };
      });
    const checks = <G extends keyof ToggleGroup>(list: Option[], g: G, k: ToggleGroup[G], prefix: string) =>
      list.map((o) => {
        const map = (s[g] as unknown as Record<string, Record<string, boolean>>)[k];
        return { id: prefix + "-" + o.id, label: o.label, checked: !!map[o.id], cls: map[o.id] ? "on" : "", toggle: () => this.toggleIn(g, k, o.id) };
      });

    const sel = this.selected(s);
    const hasAdmin = s.services.admin;
    const hasYouth = s.services.youth;
    const hasInterp = s.services.interp;
    const under18 = hasYouth && (s.c.alter === "u16" || s.c.alter === "16-17");
    const asInst = asInstitution(s);

    let anyWarn = false;
    const steps = STEPS.map((label, idx) => {
      const n = idx + 1;
      const cur = n === s.step;
      const done = n < s.step || (n <= s.maxStep && !cur);
      const warn = !cur && n <= 5 && n <= s.maxStep && (n < s.maxStep || !!s.attempted[n]) && validate(n, s).length > 0;
      if (warn) anyWarn = true;
      const stateTxt = cur ? "aktueller Schritt" : warn ? "unvollständig" : n <= s.maxStep ? "besucht" : "noch nicht erreicht";
      return {
        n,
        label,
        cls: cur ? "cur" : warn ? "done warn" : done ? "done" : "",
        locked: n > s.maxStep,
        ariaCur: (cur ? "step" : "false") as "step" | "false",
        srState: "(" + stateTxt + ")",
        aria: "Schritt " + n + ": " + label + " – " + stateTxt,
        go: () => {
          if (n <= s.maxStep && n !== s.step) this.goTo(n);
        },
      };
    });

    const svcCards = SERVICES.map((x) => ({
      num: x.num, title: x.title, desc: x.desc, inputId: "svc-" + x.id, checked: !!s.services[x.id], cls: s.services[x.id] ? "on" : "", toggle: () => this.toggleService(x),
    }));
    const secNo = { admin: "", youth: "", interp: "" };
    sel.forEach((x, k) => {
      secNo[x.id] = String(k + 1) + " von " + sel.length;
    });

    const kontaktOpts = radios(KONTAKT, "c", "kontakt", "f-c-kontakt");
    const bookOpts = radios(BOOK, "b", "mode", "f-b-mode");
    const formatOpts = FORMAT.map((o) => ({
      id: "f-b-format-" + o.id, name: "f-b-format", label: o.label, desc: o.desc || "", checked: s.b.format === o.id, cls: s.b.format === o.id ? "on" : "",
      pick: () => this.setState((st) => ({ b: { ...st.b, format: o.id, time: "" } })),
    }));

    // calendar – only computed while it is shown (step 5, "mit Termin"); building it costs a dayInfo() per day.
    const showCal = s.step === 5 && s.b.mode === "mit";
    const fmt = s.b.format || "online";
    const first = isoFrom(s.b.calY, s.b.calM, 1);
    const offset = (dow(first) + 6) % 7;
    const dim = showCal ? daysInMonth(s.b.calY, s.b.calM) : 0;
    type Cell = { blank: boolean; real: boolean; id: string; label: string; tab: number; ariaDis: Bool; pressed: Bool; cls: string; aria: string; pick: () => void };
    const cells: Cell[] = [];
    const blank: Cell = { blank: true, real: false, id: "", label: "", tab: -1, ariaDis: "true", pressed: "false", cls: "", aria: "", pick: () => {} };
    if (showCal) for (let k = 0; k < offset; k++) cells.push(blank);
    const monthHas = (iso: string) => !!iso && isoParts(iso).y === s.b.calY && isoParts(iso).m === s.b.calM;
    const tabIso = !showCal ? "" : monthHas(s.b.calFocus) ? s.b.calFocus : monthHas(s.b.date) ? s.b.date : firstAvailableIn(s.b.calY, s.b.calM, fmt);
    for (let d = 1; d <= dim; d++) {
      const iso = isoFrom(s.b.calY, s.b.calM, d);
      const info = dayInfo(iso, fmt);
      const selD = s.b.date === iso && info.av;
      cells.push({
        blank: false, real: true, id: "day-" + iso, label: String(d), tab: iso === tabIso ? 0 : -1,
        ariaDis: bool(!info.av), pressed: bool(selD),
        cls: [selD ? "sel" : info.kind, iso === now.iso ? "today" : ""].join(" "),
        aria: fmtLong(iso) + ", " + (selD ? "ausgewählt" : info.av ? "verfügbar" : "nicht wählbar: " + info.reason),
        pick: () => this.pickDate(iso),
      });
    }
    const nowP = isoParts(now.iso);
    const horizon = isoParts(addDays(now.iso, booking.horizonDays));
    const cal = {
      monthLabel: MONTHS[s.b.calM] + " " + s.b.calY,
      cells,
      groupLabel: "Tag im " + MONTHS[s.b.calM] + " " + s.b.calY + " auswählen",
      prevDisabled: s.b.calY < nowP.y || (s.b.calY === nowP.y && s.b.calM <= nowP.m),
      nextDisabled: s.b.calY > horizon.y || (s.b.calY === horizon.y && s.b.calM >= horizon.m),
      prev: () => this.shiftMonth(-1),
      next: () => this.shiftMonth(1),
    };
    const dur = booking.durationMinutes;
    const rawSlots = showCal && s.b.date ? slotsFor(s.b.date, fmt) : [];
    const slots = rawSlots.map((x) => {
      const t = pad(x.h) + ":00";
      const selT = s.b.time === t && !x.disabled;
      const cls = selT ? "sel" : x.state === "free" ? "" : x.state === "past" ? "past" : "na";
      const stTxt = selT ? "gewählt ✓" : SLOT_TEXT[x.state];
      return {
        label: hhmm(x.h, 0), state: stTxt, ariaDis: bool(x.disabled), pressed: bool(selT), cls,
        aria: hhmm(x.h, 0) + " bis " + hhmm(x.h, dur) + " Uhr, " + (selT ? "ausgewählt" : x.disabled ? "nicht wählbar: " + SLOT_TEXT[x.state] : "frei"),
        pick: () => this.pickTime(x),
      };
    });
    const anyFree = rawSlots.some((x) => !x.disabled);
    // A chosen slot only counts while it is still bookable (it can expire or stop fitting after a format change).
    const hasChosen = s.b.mode === "mit" && isSlotFree(s.b.date, s.b.time, fmt);
    const chosenH = s.b.time ? parseInt(s.b.time, 10) : 0;
    const chosenLong = hasChosen ? fmtLong(s.b.date) + ", " + hhmm(chosenH, 0) + "–" + hhmm(chosenH, dur) + " Uhr" : "";
    const fmtLabel = s.b.format === "vorort" ? "Persönlich in Zürich und Umgebung – Treffpunkt nach Vereinbarung." : s.b.format === "online" ? "Online über Google Meet." : "";

    // files
    const files = s.files.map((f) => ({ name: f.name, ext: f.ext, sizeLabel: sizeLabel(f.size), removeLabel: "Datei " + f.name + " entfernen", remove: () => this.removeFile(f.id) }));

    // review
    const rows = (pairs: [string, string][]) => pairs.filter((p) => p[1] && String(p[1]).trim()).map((p) => ({ k: p[0], v: p[1] }));
    const joinChecked = (list: Option[], map: Record<string, boolean>) => list.filter((o) => map[o.id]).map((o) => o.label).join(", ");
    const rvContact = rows([
      ["Anfrage", hasInterp ? (asInst ? "Im Namen von: " + s.c.institution.trim() : labelOf(FUER, "selbst")) : ""],
      ["Anrede", s.c.anrede], ["Name", (s.c.vorname + " " + s.c.nachname).trim()], ["E-Mail", s.c.email], ["Telefon", s.c.telefon || "—"],
      ["Wohnort / Gemeinde", s.c.ort], ["Bevorzugter Kontaktweg", labelOf(KONTAKT, s.c.kontakt)], ["Altersgruppe", hasYouth ? AGE[s.c.alter] || "" : ""],
    ]);
    const rvAdmin = rows([
      ["Unterstützung", joinChecked(ADMIN_TASKS, s.a.aufgaben)], ["Stelle", s.a.stelle], ["Situation", s.a.situation],
      ["Unterlagen vorhanden", labelOf(DOCS, s.a.dokumente)], ["Behördliche Frist", s.a.frist === "ja" ? "Ja, bis " + fmtShort(s.a.fristDatum) : labelOf(FRIST, s.a.frist)], ["Gewünschtes Ergebnis", s.a.ziel],
    ]);
    const rvYouth = rows([
      ["Aktuelle Situation", s.y.situation], ["Unterstützung", joinChecked(YOUTH_SUP, s.y.unterstuetzung)], ["Interessen und Ziele", s.y.interessen],
      ["Herausforderungen", s.y.herausforderungen], ["Form des Coachings", labelOf(YOUTH_ART, s.y.art)], ["Sprache", s.y.sprache],
      ["Unter 18 Jahre", under18 ? "Ja – vorläufiger Hinweis zur Einwilligung beachten" : s.c.alter ? "Nein" : ""],
    ]);
    const rvInterp = rows([
      ["Art", labelOf(INT_ART, s.i.art)], ["Sprachrichtung", labelOf(INT_DIR, s.i.richtung) + (s.i.richtung ? " (vorläufig)" : "")], ["Variante / Dialekt", s.i.variante],
      ["Termin oder Dokument", s.i.anlass], ["Thema", s.i.thema],
      [s.i.art === "termin" ? "Datum des Termins" : "Gewünscht bis", s.i.datum ? fmtShort(s.i.datum) + (s.i.art === "termin" && s.i.zeit ? ", " + s.i.zeit.replace(":", ".") + " Uhr" : "") : ""],
      ["Dauer", s.i.art === "termin" ? s.i.dauer : ""], ["Durchführung", s.i.art === "termin" ? labelOf(INT_MODUS, s.i.modus) : ""],
    ]);
    const deadlines: string[] = [];
    if (hasAdmin && s.a.frist === "ja" && s.a.fristDatum) deadlines.push("Behördliche Frist: " + fmtShort(s.a.fristDatum));
    if (hasInterp && s.i.art === "termin" && s.i.datum) deadlines.push("Dolmetsch-Termin: " + fmtShort(s.i.datum));
    if (s.u.frist) deadlines.push("Wichtiges Datum: " + fmtShort(s.u.frist));
    const rvUrg = rows([["Dringlichkeit", labelOf(URG, s.u.level) + " (eigene Einschätzung)"], ["Fristen und Daten", deadlines.join("\n") || "Keine angegeben"], ["Begründung", s.u.grund]]);
    const rvFiles = s.files.length ? s.files.map((f) => f.name).join("\n") : "Keine Dokumente hinzugefügt.";
    const rvBooking =
      s.b.mode === "mit"
        ? hasChosen ? chosenLong + " · " + labelOf(FORMAT, s.b.format) : "Termin gewünscht, aber noch nicht gewählt."
        : "Anfrage ohne Termin – der Termin wird nach der Anfrage vereinbart.";

    const cs = {
      privacy: s.consent.privacy, self: s.consent.self, wa: s.consent.wa,
      privacyCls: s.consent.privacy ? "on" : "", selfCls: s.consent.self ? "on" : "", waCls: s.consent.wa ? "on" : "",
      togglePrivacy: () => this.toggleConsent("privacy"), toggleSelf: () => this.toggleConsent("self"), toggleWa: () => this.toggleConsent("wa"),
    };

    const go = (n: number) => () => this.goTo(n, { fromReview: true });
    const urgLabel = labelOf(URG, s.u.level);
    return {
      announce: s.announce,
      isForm: !s.submitted, isDone: s.submitted,
      isS1: s.step === 1, isS2: s.step === 2, isS3: s.step === 3, isS4: s.step === 4, isS5: s.step === 5, isS6: s.step === 6,
      notFirst: s.step > 1, notLast: s.step < 6,
      nextLabel: s.step === 5 || (s.returnTo6 && s.step < 6) ? "Zur Übersicht" : "Weiter",
      backAria: s.step > 1 ? "Zurück zu Schritt " + (s.step - 1) + ": " + STEPS[s.step - 2] : "Zurück",
      anyWarn, anyWarnDesk: anyWarn,
      hasSvcNotice: !!s.svcNotice, svcNotice: s.svcNotice,
      svcCountLabel: sel.length === 1 ? "1 Leistung gewählt" : sel.length + " Leistungen gewählt",
      secNo,
      calKey: (ev: KeyboardEvent<HTMLDivElement>) => this.calKey(ev),
      keptSlotNote: s.b.mode === "ohne" && !!s.b.date && !!s.b.time,
      keptSlotLabel: s.b.date && s.b.time ? fmtShort(s.b.date) + ", " + hhmm(parseInt(s.b.time, 10), 0) + " Uhr" : "",
      stepNo: s.step, stepLabel: STEPS[s.step - 1], progressPct: Math.round((s.step / 6) * 100) + "%",
      steps,
      showErrSummary: errs.length > 0,
      errList: errs.map((e) => ({
        id: e.id, msg: e.msg,
        go: (ev: MouseEvent<HTMLAnchorElement>) => {
          if (ev) ev.preventDefault();
          this.revealField(e.id);
        },
      })),
      E, I, H, D,
      svcCards, hasAdmin, hasYouth, hasInterp,
      c: s.c, a: s.a, y: s.y, i: s.i, u: s.u, on,
      telOptLabel: s.c.kontakt === "telefon" || s.c.kontakt === "whatsapp" ? "erforderlich für " + labelOf(KONTAKT, s.c.kontakt) : "optional",
      kontaktOpts, kontaktWa: s.c.kontakt === "whatsapp",
      // Switching between "für mich selbst" and "Institution" changes the wording of the consent, so it must be confirmed again.
      fuerOpts: radios(FUER, "c", "fuer", "f-c-fuer").map((o, k) => ({
        ...o,
        pick: () => this.setState((st) => ({ c: { ...st.c, fuer: FUER[k].id }, consent: { ...st.consent, self: false } })),
      })),
      asInst,
      under18, youthAgeMissing: hasYouth && !s.c.alter,
      adminTasks: checks(ADMIN_TASKS, "a", "aufgaben", "f-a-aufgaben"),
      aSitCount: s.a.situation.length ? "(" + s.a.situation.length + " / 1500 Zeichen)" : "",
      docsOpts: radios(DOCS, "a", "dokumente", "f-a-dokumente"),
      fristOpts: radios(FRIST, "a", "frist", "f-a-frist"), fristJa: s.a.frist === "ja",
      aFristPast: s.a.frist === "ja" && !!s.a.fristDatum && s.a.fristDatum < now.iso,
      youthSup: checks(YOUTH_SUP, "y", "unterstuetzung", "f-y-unterstuetzung"),
      youthArt: radios(YOUTH_ART, "y", "art", "f-y-art"),
      intArt: radios(INT_ART, "i", "art", "f-i-art"), intDir: radios(INT_DIR, "i", "richtung", "f-i-richtung"), intModus: radios(INT_MODUS, "i", "modus", "f-i-modus"),
      intIsTermin: s.i.art === "termin", intIsDok: s.i.art === "dokument",
      urgOpts: radios(URG, "u", "level", "f-u-level"),
      todayIso: now.iso,
      files, fileCount: s.files.length, hasFiles: s.files.length > 0, noFiles: s.files.length === 0,
      fileErrors: s.fileErrors, hasFileErrors: s.fileErrors.length > 0,
      dropCls: s.drag ? "over" : "",
      onFiles: (ev: ChangeEvent<HTMLInputElement>) => {
        this.addFiles(ev.target.files);
        ev.target.value = "";
      },
      onDragEnter: (ev: DragEvent<HTMLLabelElement>) => {
        ev.preventDefault();
        this.dragDepth++;
        if (!this.state.drag) this.setState({ drag: true });
      },
      onDragOver: (ev: DragEvent<HTMLLabelElement>) => {
        ev.preventDefault();
        if (!this.state.drag) this.setState({ drag: true });
      },
      onDragLeave: (ev: DragEvent<HTMLLabelElement>) => {
        ev.preventDefault();
        this.dragDepth = Math.max(0, this.dragDepth - 1);
        if (this.dragDepth === 0) this.setState({ drag: false });
      },
      onDrop: (ev: DragEvent<HTMLLabelElement>) => {
        ev.preventDefault();
        this.dragDepth = 0;
        this.addFiles(ev.dataTransfer ? ev.dataTransfer.files : null);
      },
      bookOpts, bookingMit: s.b.mode === "mit", formatOpts, cal,
      slots, slotsLoading: !!(s.b.date && s.slotsLoading), noDate: !s.b.date,
      showSlots: !!(s.b.date && !s.slotsLoading && anyFree), noSlots: !!(s.b.date && !s.slotsLoading && !anyFree),
      slotsTitle: s.b.date ? "Zeiten am " + fmtLong(s.b.date) : "Uhrzeit",
      slotsVorOrtHint: s.b.format === "vorort" ? " Bei persönlichen Terminen wird Reisezeit eingeplant, daher sind weniger Zeiten wählbar." : "",
      hasChosen, chosenLong, chosenFormatLine: fmtLabel,
      rvServices: sel.map((x) => x.title).join(" · ") || "—",
      rvContact, rvAdmin, rvYouth, rvInterp, rvUrg, rvFiles, rvBooking,
      cs,
      go1: go(1), go2: go(2), go3: go(3), go4: go(4), go5: go(5),
      submitting: s.submitting, submittingStr: bool(s.submitting),
      submitLabel: s.submitting ? "Wird gesendet …" : "Anfrage absenden",
      submitLabelShort: s.submitting ? "Wird gesendet …" : "Absenden",
      onFieldFocus: (ev: FocusEvent<HTMLFormElement>) => {
        const t = ev.target as HTMLElement;
        this.later(() => this.keepFocusedVisible(t), 0);
      },
      onFormSubmit: (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (this.state.step === 6) this.submit();
        else this.next();
      },
      back: () => {
        if (s.step > 1) this.goTo(s.step - 1);
      },
      saveDraft: () => this.saveDraft(),
      closeDraft: () => this.setState({ draftPanel: false }),
      draftPanel: s.draftPanel, hasMemDraft: !!s.hasMemDraft,
      restoreDraft: () => this.restoreDraft(),
      loadSample: () => {
        this.setState({ ...sampleDraft(), hasMemDraft: !!s.hasMemDraft, announce: "Beispiel-Entwurf geladen. Schritt 3 von 6.", focusTick: s.focusTick });
        this.hist("push", 3);
      },
      reset: () => {
        this.setState({ ...initialState(), hasMemDraft: !!s.hasMemDraft, announce: "Formular geleert.", focusTick: s.focusTick });
        this.hist("push", 1);
      },
      ref: s.ref,
      doneBookingNote: hasChosen ? " sowie eine Kalendereinladung" + (s.b.format === "online" ? " mit Google-Meet-Link" : "") : "",
      sbServices: sel.map((x) => ({ num: x.num, title: x.title })), sbNoServices: sel.length === 0,
      sbKontakt: labelOf(KONTAKT, s.c.kontakt),
      sbUrg: urgLabel,
      sbFiles: s.files.length === 0 ? "Keine" : s.files.length === 1 ? "1 Datei" : s.files.length + " Dateien",
      sbTermin: s.b.mode === "mit" ? (hasChosen ? fmtShort(s.b.date) + ", " + hhmm(chosenH, 0) : "Noch nicht gewählt") : "Ohne Termin",
      uploadAccept: uploads.accept,
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <main>
        <div role="status" aria-live="polite" className="sr">{v.announce}</div>
        <section className="lux-host" aria-labelledby="page-title" style={{ padding: "clamp(28px, 4vw, 44px) 0 clamp(36px, 5vw, 56px)" }}>
          <LuxuryOrnaments />
          <div className="wrap">
            <nav aria-label="Brotkrümelnavigation" style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}>
              <ol style={{ display: "flex", flexWrap: "wrap", gap: "8px", listStyle: "none", margin: "0", padding: "0", fontSize: "12.5px", color: "#4A5563" }}>
                <li>
                  <Link href="/" style={{ color: "#4A5563", textDecoration: "none" }}>Startseite</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: "#163A5F" }}>Anfrage &amp; Termin</li>
              </ol>
            </nav>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", gap: "24px clamp(32px, 6vw, 96px)", alignItems: "end" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="in eyebrow" style={{ "--d": ".05s", color: "#8A6508", display: "flex", alignItems: "center", gap: "14px" } as CSSProperties}><span aria-hidden="true" style={{ display: "inline-block", width: "40px", height: "1px", background: "#D4A017" }}></span>Anfrage &amp; Termin</div>
                <h1 id="page-title" className="in serif" style={{ "--d": ".15s", margin: "0", fontSize: "clamp(44px, 5.6vw, 78px)", lineHeight: "1.02", fontWeight: "500", color: "#163A5F" } as CSSProperties}>Ihre Anfrage – <span style={{ fontStyle: "italic", color: "#0E1A28" }}>Schritt für Schritt.</span></h1>
                <p className="in" style={{ "--d": ".3s", margin: "0", fontSize: "17px", fontWeight: "300", color: "#2B3644", maxWidth: "34em" } as CSSProperties}>In sechs kurzen Schritten beschreiben Sie Ihr Anliegen – für eine oder mehrere Leistungen. Auf Wunsch wählen Sie direkt einen Termin für ein gemeinsames Erstgespräch von 45 Minuten.</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-label="Anfrageformular" style={{ padding: "0 0 clamp(80px, 10vw, 130px)" }}>
          <div className="wrap">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 18px", marginBottom: "18px", fontSize: "13px", color: "#4A5563" }}>
              {v.hasMemDraft ? (
                <>
                <button className="btn-text" type="button" onClick={v.restoreDraft}>Gespeicherten Entwurf wiederherstellen</button>
                </>
              ) : null}
              <button className="btn-text" type="button" onClick={v.reset}>Formular leeren</button>
            </div>
            <div className="layout">
              <div id="form-top" style={{ scrollMarginTop: "120px", minWidth: "0" }}>
                {v.isForm ? (
                  <>
                  <div className="panel">
                    <nav aria-label="Fortschritt">
                      <ol className="stepper">
                        {v.steps.map((st, i1) => (
                          <Fragment key={i1}>
                            <li>
                              <button className={`stp ${st.cls}`} type="button" onClick={st.go} disabled={st.locked} aria-current={st.ariaCur}>
                                <span className="no">{st.n}</span>
                                <span className="lb">{st.label}</span>
                                <span className="sr">{st.srState}</span>
                              </button>
                            </li>
                          </Fragment>
                        ))}
                      </ol>
                      <div className="mstep">
                        <ol className="mdots">
                          {v.steps.map((st, i1) => (
                            <Fragment key={i1}>
                              <li>
                                <button className={`md ${st.cls}`} type="button" onClick={st.go} disabled={st.locked} aria-current={st.ariaCur} aria-label={st.aria}>{st.n}</button>
                              </li>
                            </Fragment>
                          ))}
                        </ol>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", marginTop: "12px" }}>
                          <span className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt {v.stepNo} von 6</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#163A5F" }}>{v.stepLabel}</span>
                        </div>
                        {v.anyWarn ? (
                          <>
                          <p className="hint" style={{ margin: "6px 0 0", color: "#B42318" }}>Rot markierte Schritte sind noch unvollständig.</p>
                          </>
                        ) : null}
                      </div>
                      {v.anyWarnDesk ? (
                        <>
                        <p className="hint stp-warnline" style={{ margin: "12px 0 0", color: "#B42318" }}>Rot markierte Schritte sind noch unvollständig – zum Beispiel nach einer Änderung der Leistungen.</p>
                        </>
                      ) : null}
                    </nav>
                    {v.showErrSummary ? (
                      <>
                      <div id="error-summary" className="errsum" tabIndex={-1} style={{ marginTop: "32px" }}>
                        <h2 style={{ margin: "0 0 8px", fontSize: "16px", color: "#B42318" }}>Bitte prüfen Sie folgende Angaben:</h2>
                        <ul style={{ margin: "0", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", fontSize: "14.5px" }}>
                          {v.errList.map((er, i1) => (
                            <Fragment key={i1}>
                              <li>
                                <a href={`#${er.id}`} onClick={er.go}>{er.msg}</a>
                              </li>
                            </Fragment>
                          ))}
                        </ul>
                      </div>
                      </>
                    ) : null}
                    <form noValidate onSubmit={v.onFormSubmit} onFocus={v.onFieldFocus} aria-labelledby="step-title" style={{ marginTop: "clamp(28px, 4vw, 40px)" }}>
                      {v.isS1 ? (
                        <>
                        <div className="stepanim">
                          <div className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 1 · Leistungen</div>
                          <h2 id="step-title" tabIndex={-1} className="serif" style={{ margin: "10px 0 8px", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F", outline: "none" }}>Wobei darf ich Sie unterstützen?</h2>
                          <p className="hint" style={{ fontSize: "15px", margin: "0 0 26px" }}>Wählen Sie eine, zwei oder alle drei Leistungen. Ihre Angaben bleiben erhalten, auch wenn Sie die Auswahl später ändern.</p>
                          <fieldset style={{ border: "0", margin: "0", padding: "0" }} aria-describedby={v.D.services}>
                            <legend className="sr">Leistungen auswählen</legend>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))", gap: "16px" }}>
                              {v.svcCards.map((s, i1) => (
                                <Fragment key={i1}>
                                  <label className={`svc ${s.cls}`}>
                                    <input className="sr" type="checkbox" id={s.inputId} checked={s.checked} onChange={s.toggle} />
                                    {" "}
                                    <span className="tick" aria-hidden="true">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 12.5l5 5L20 6.5"></path>
                                      </svg>
                                    </span>
                                    {" "}
                                    <span className="serif" aria-hidden="true" style={{ fontSize: "20px", fontStyle: "italic", color: "#8A6508" }}>{s.num}</span>
                                    {" "}
                                    <span className="serif" style={{ fontSize: "26px", fontWeight: "600", lineHeight: "1.12", color: "#163A5F", paddingRight: "30px" }}>{s.title}</span>
                                    {" "}
                                    <span style={{ fontSize: "14px", color: "#2B3644", lineHeight: "1.55" }}>{s.desc}</span>
                                  </label>
                                </Fragment>
                              ))}
                            </div>
                          </fieldset>
                          {v.H.services ? (
                            <>
                            <p id="e-services" className="err" style={{ margin: "14px 0 0" }}>{v.E.services}</p>
                            </>
                          ) : null}
                          {v.hasSvcNotice ? (
                            <>
                            <div className="note note-navy" role="status" style={{ marginTop: "18px" }}>
                              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#163A5F" strokeWidth="1.6" strokeLinecap="round">
                                <circle cx="12" cy="12" r="9"></circle>
                                <path d="M12 8v5M12 16v.5"></path>
                              </svg>
                              <div>{v.svcNotice}</div>
                            </div>
                            </>
                          ) : null}
                          <p className="hint" style={{ margin: "20px 0 0" }}>Mehrere Leistungen? Sie beantworten nur die passenden Fragen – und ein gemeinsames Erstgespräch genügt.</p>
                        </div>
                        </>
                      ) : null}
                      {v.isS2 ? (
                        <>
                        <div className="stepanim">
                          <div className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 2 · Kontakt</div>
                          <h2 id="step-title" tabIndex={-1} className="serif" style={{ margin: "10px 0 8px", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F", outline: "none" }}>Wie erreiche ich Sie?</h2>
                          <p className="hint" style={{ fontSize: "15px", margin: "0 0 26px" }}>{v.asInst ? "Sie stellen die Anfrage im Namen einer Institution; die Angaben unten betreffen die zuständige Kontaktperson." : "Sie stellen die Anfrage für sich selbst."} Wir fragen nur, was für die Kontaktaufnahme nötig ist. Pflichtfelder sind mit * gekennzeichnet.</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                            {v.hasInterp ? (
                              <>
                              <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                                <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Für wen stellen Sie die Anfrage?&nbsp;*</legend>
                                <div className="opts">
                                  {v.fuerOpts.map((o, i1) => (
                                    <Fragment key={i1}>
                                      <label className={`chk ${o.cls}`}>
                                        <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                        <span className="t">{o.label}</span>
                                      </label>
                                    </Fragment>
                                  ))}
                                </div>
                              </fieldset>
                              {v.asInst ? (
                                <>
                                <div className="fld" style={{ maxWidth: "560px" }}>
                                  <label className="lbl" htmlFor="f-c-institution">Name der Schule, Behörde oder Institution&nbsp;*</label>
                                  {" "}
                                  <input className="inp" id="f-c-institution" type="text" value={v.c.institution} onChange={v.on.c.institution} maxLength={160} autoComplete="organization" aria-required="true" aria-invalid={v.I.c_institution} aria-describedby={v.D.c_institution} />
                                  {v.H.c_institution ? (
                                    <>
                                    <p id="e-c_institution" className="err" style={{ margin: "0" }}>{v.E.c_institution}</p>
                                    </>
                                  ) : null}
                                </div>
                                </>
                              ) : null}
                              </>
                            ) : null}
                            <div className="grid2">
                              <div className="fld">
                                <label className="lbl" htmlFor="f-c-anrede">Anrede<span className="opt">optional</span></label>
                                {" "}
                                <select className="inp" id="f-c-anrede" value={v.c.anrede} onChange={v.on.c.anrede} autoComplete="honorific-prefix">
                                  <option value="">Bitte wählen</option>
                                  <option value="Frau">Frau</option>
                                  <option value="Herr">Herr</option>
                                  <option value="Keine Anrede">Keine Anrede</option>
                                </select>
                              </div>
                              <div aria-hidden="true"></div>
                              <div className="fld">
                                <label className="lbl" htmlFor="f-c-vorname">Vorname&nbsp;*</label>
                                {" "}
                                <input className="inp" id="f-c-vorname" type="text" value={v.c.vorname} onChange={v.on.c.vorname} autoComplete="given-name" aria-required="true" aria-invalid={v.I.c_vorname} aria-describedby={v.D.c_vorname} />
                                {v.H.c_vorname ? (
                                  <>
                                  <p id="e-c_vorname" className="err" style={{ margin: "0" }}>{v.E.c_vorname}</p>
                                  </>
                                ) : null}
                              </div>
                              <div className="fld">
                                <label className="lbl" htmlFor="f-c-nachname">Nachname&nbsp;*</label>
                                {" "}
                                <input className="inp" id="f-c-nachname" type="text" value={v.c.nachname} onChange={v.on.c.nachname} autoComplete="family-name" aria-required="true" aria-invalid={v.I.c_nachname} aria-describedby={v.D.c_nachname} />
                                {v.H.c_nachname ? (
                                  <>
                                  <p id="e-c_nachname" className="err" style={{ margin: "0" }}>{v.E.c_nachname}</p>
                                  </>
                                ) : null}
                              </div>
                              <div className="fld">
                                <label className="lbl" htmlFor="f-c-email">E-Mail-Adresse&nbsp;*</label>
                                {" "}
                                <input className="inp" id="f-c-email" type="email" inputMode="email" value={v.c.email} onChange={v.on.c.email} autoComplete="email" aria-required="true" aria-invalid={v.I.c_email} aria-describedby={v.D.c_email} />
                                {v.H.c_email ? (
                                  <>
                                  <p id="e-c_email" className="err" style={{ margin: "0" }}>{v.E.c_email}</p>
                                  </>
                                ) : null}
                              </div>
                              <div className="fld">
                                <label className="lbl" htmlFor="f-c-telefon">Telefonnummer<span className="opt">{v.telOptLabel}</span></label>
                                {" "}
                                <input className="inp" id="f-c-telefon" type="tel" inputMode="tel" value={v.c.telefon} onChange={v.on.c.telefon} autoComplete="tel" placeholder="+41 …" aria-invalid={v.I.c_telefon} aria-describedby={v.D.c_telefon} />
                                {v.H.c_telefon ? (
                                  <>
                                  <p id="e-c_telefon" className="err" style={{ margin: "0" }}>{v.E.c_telefon}</p>
                                  </>
                                ) : null}
                              </div>
                              <div className="fld">
                                <label className="lbl" htmlFor="f-c-ort">Wohnort / Gemeinde<span className="opt">optional</span></label>
                                {" "}
                                <input className="inp" id="f-c-ort" type="text" value={v.c.ort} onChange={v.on.c.ort} autoComplete="address-level2" aria-describedby="h-c-ort" />
                                {" "}
                                <span id="h-c-ort" className="hint">Hilft bei der Planung persönlicher Termine. Keine Adresse nötig.</span>
                              </div>
                            </div>
                            <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                              <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Bevorzugter Kontaktweg&nbsp;*</legend>
                              <div className="opts">
                                {v.kontaktOpts.map((o, i1) => (
                                  <Fragment key={i1}>
                                    <label className={`chk ${o.cls}`}>
                                      <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                      <span className="t">{o.label}</span>
                                    </label>
                                  </Fragment>
                                ))}
                              </div>
                              {v.kontaktWa ? (
                                <>
                                <p className="hint" style={{ margin: "4px 0 0" }}>WhatsApp ist ein Dienst von Meta. Vor dem Absenden bitten wir Sie um eine separate Einwilligung.</p>
                                </>
                              ) : null}
                            </fieldset>
                            {v.hasYouth ? (
                              <>
                              <div className="fld" style={{ maxWidth: "420px" }}>
                                <label className="lbl" htmlFor="f-c-alter">Altersgruppe&nbsp;*</label>
                                {" "}
                                <select className="inp" id="f-c-alter" value={v.c.alter} onChange={v.on.c.alter} aria-required="true" aria-invalid={v.I.c_alter} aria-describedby={`h-c-alter ${v.D.c_alter}`}>
                                  <option value="">Bitte wählen</option>
                                  <option value="u16">Unter 16 Jahre</option>
                                  <option value="16-17">16–17 Jahre</option>
                                  <option value="18-20">18–20 Jahre</option>
                                  <option value="21-25">21–25 Jahre</option>
                                  <option value="26+">26 Jahre oder älter</option>
                                </select>
                                {" "}
                                <span id="h-c-alter" className="hint">Nur für das Jugendcoaching. Wir fragen kein Geburtsdatum.</span>
                                {v.H.c_alter ? (
                                  <>
                                  <p id="e-c_alter" className="err" style={{ margin: "0" }}>{v.E.c_alter}</p>
                                  </>
                                ) : null}
                              </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                        </>
                      ) : null}
                      {v.isS3 ? (
                        <>
                        <div className="stepanim">
                          <div className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 3 · Ihr Anliegen</div>
                          <h2 id="step-title" tabIndex={-1} className="serif" style={{ margin: "10px 0 8px", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F", outline: "none" }}>Erzählen Sie mir mehr.</h2>
                          <p className="hint" style={{ fontSize: "15px", margin: "0" }}>Ein eigener Fragenteil pro gewählter Leistung ({v.svcCountLabel}). Die meisten Angaben sind freiwillig – schreiben Sie so viel, wie Sie möchten.</p>
                          <p className="hint" style={{ margin: "10px 0 0", display: "flex", gap: "8px", alignItems: "center" }}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
  <path d="M4 12.5l5 5L20 6.5"></path>
</svg>Ihre Kontaktangaben aus Schritt 2 gelten für alle Leistungen und werden nicht erneut abgefragt.</p>
                          {v.hasAdmin ? (
                            <>
                            <div className="sec">
                              <div className="secHead">
                                <span className="k">Fragenteil {v.secNo.admin} · Leistung I</span>
                                <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", lineHeight: "1.15", color: "#163A5F" }}>Administrative Unterstützung</h3>
                              </div>
                              <fieldset style={{ border: "0", margin: "0", padding: "0" }} aria-describedby={v.D.a_aufgaben}>
                                <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Wobei brauchen Sie Unterstützung?&nbsp;*</legend>
                                <div className="opts">
                                  {v.adminTasks.map((o, i1) => (
                                    <Fragment key={i1}>
                                      <label className={`chk ${o.cls}`}>
                                        <input type="checkbox" id={o.id} checked={o.checked} onChange={o.toggle} />
                                        <span className="t">{o.label}</span>
                                      </label>
                                    </Fragment>
                                  ))}
                                </div>
                                {v.H.a_aufgaben ? (
                                  <>
                                  <p id="e-a_aufgaben" className="err" style={{ margin: "10px 0 0" }}>{v.E.a_aufgaben}</p>
                                  </>
                                ) : null}
                              </fieldset>
                              <div className="fld" style={{ maxWidth: "460px" }}>
                                <label className="lbl" htmlFor="f-a-stelle">Betroffene Stelle oder Organisation<span className="opt">optional</span></label>
                                {" "}
                                <select className="inp" id="f-a-stelle" value={v.a.stelle} onChange={v.on.a.stelle}>
                                  <option value="">Bitte wählen</option>
                                  <option value="Gemeinde / Kreisbüro">Gemeinde / Kreisbüro</option>
                                  <option value="Steueramt">Steueramt</option>
                                  <option value="Krankenkasse oder Versicherung">Krankenkasse oder Versicherung</option>
                                  <option value="Migrationsamt">Migrationsamt</option>
                                  <option value="Sozialdienst">Sozialdienst</option>
                                  <option value="RAV oder Arbeitslosenkasse">RAV oder Arbeitslosenkasse</option>
                                  <option value="Arbeitgeber">Arbeitgeber</option>
                                  <option value="Vermieter oder Verwaltung">Vermieter oder Verwaltung</option>
                                  <option value="Schule">Schule</option>
                                  <option value="Andere Stelle">Andere Stelle</option>
                                  <option value="Weiss ich nicht">Weiss ich nicht</option>
                                </select>
                              </div>
                              <div className="fld">
                                <label className="lbl" htmlFor="f-a-situation">Ihre Situation und die gewünschte Unterstützung&nbsp;*</label>
                                {" "}
                                <textarea className="inp" id="f-a-situation" value={v.a.situation} onChange={v.on.a.situation} maxLength={1500} aria-required="true" aria-invalid={v.I.a_situation} aria-describedby={`h-a-situation ${v.D.a_situation}`}></textarea>
                                {" "}
                                <span id="h-a-situation" className="hint">Zum Beispiel: «Ich habe einen Brief erhalten und verstehe nicht, was ich nachreichen muss.» Bitte keine Ausweis- oder Kontonummern. {v.aSitCount}</span>
                                {v.H.a_situation ? (
                                  <>
                                  <p id="e-a_situation" className="err" style={{ margin: "0" }}>{v.E.a_situation}</p>
                                  </>
                                ) : null}
                              </div>
                              <div className="grid2">
                                <fieldset style={{ border: "0", margin: "0", padding: "0" }}>
                                  <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Liegen die Unterlagen vor?<span className="opt">optional</span></legend>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {v.docsOpts.map((o, i1) => (
                                      <Fragment key={i1}>
                                        <label className={`chk ${o.cls}`}>
                                          <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                          <span className="t">{o.label}</span>
                                        </label>
                                      </Fragment>
                                    ))}
                                  </div>
                                </fieldset>
                                <fieldset style={{ border: "0", margin: "0", padding: "0" }}>
                                  <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Gibt es eine behördliche Frist?<span className="opt">optional</span></legend>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {v.fristOpts.map((o, i1) => (
                                      <Fragment key={i1}>
                                        <label className={`chk ${o.cls}`}>
                                          <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                          <span className="t">{o.label}</span>
                                        </label>
                                      </Fragment>
                                    ))}
                                  </div>
                                  {v.fristJa ? (
                                    <>
                                    <div className="fld" style={{ marginTop: "14px" }}>
                                      <label className="lbl" htmlFor="f-a-fristDatum">Frist bis&nbsp;*</label>
                                      {" "}
                                      <input className="inp" id="f-a-fristDatum" type="date" value={v.a.fristDatum} onChange={v.on.a.fristDatum} aria-required="true" aria-invalid={v.I.a_fristDatum} aria-describedby={v.D.a_fristDatum} />
                                      {v.H.a_fristDatum ? (
                                        <>
                                        <p id="e-a_fristDatum" className="err" style={{ margin: "0" }}>{v.E.a_fristDatum}</p>
                                        </>
                                      ) : null}
                                      {v.aFristPast ? (
                                        <>
                                        <p className="hint" style={{ margin: "0", color: "#8A3B12" }}>Diese Frist liegt bereits in der Vergangenheit. Bitte wenden Sie sich zusätzlich direkt an die zuständige Stelle.</p>
                                        </>
                                      ) : null}
                                    </div>
                                    </>
                                  ) : null}
                                </fieldset>
                              </div>
                              <div className="fld">
                                <label className="lbl" htmlFor="f-a-ziel">Was möchten Sie erreichen?<span className="opt">optional</span></label>
                                {" "}
                                <textarea className="inp" id="f-a-ziel" value={v.a.ziel} onChange={v.on.a.ziel} maxLength={800} style={{ minHeight: "90px" }}></textarea>
                              </div>
                              <p className="hint" style={{ margin: "0" }}>Hinweis: Diese Leistung umfasst administrative und organisatorische Unterstützung – keine Rechtsberatung und keine rechtliche Vertretung.</p>
                            </div>
                            </>
                          ) : null}
                          {v.hasYouth ? (
                            <>
                            <div className="sec">
                              <div className="secHead">
                                <span className="k">Fragenteil {v.secNo.youth} · Leistung II</span>
                                <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", lineHeight: "1.15", color: "#163A5F" }}>Jugendcoaching &amp; Berufsorientierung</h3>
                              </div>
                              {v.under18 ? (
                                <>
                                <div className="note" role="note">
                                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.6" strokeLinecap="round">
                                    <circle cx="12" cy="12" r="9"></circle>
                                    <path d="M12 8v5M12 16v.5"></path>
                                  </svg>
                                  <div><b>Vorläufiger Hinweis – Regelung noch nicht festgelegt.</b> Sie haben angegeben, unter 18 Jahre alt zu sein. Ob und in welcher Form für Jugendliche unter 18 Jahren eine Einwilligung der Erziehungsberechtigten nötig ist, wird derzeit von Randa Kale festgelegt. Sie können die Anfrage trotzdem vollständig ausfüllen.</div>
                                </div>
                                </>
                              ) : null}
                              {v.youthAgeMissing ? (
                                <>
                                <p className="hint" style={{ margin: "0" }}>Ihre Altersgruppe geben Sie in Schritt 2 an.</p>
                                </>
                              ) : null}
                              <div className="fld" style={{ maxWidth: "460px" }}>
                                <label className="lbl" htmlFor="f-y-situation">Aktuelle Ausbildungs- oder Arbeitssituation&nbsp;*</label>
                                {" "}
                                <select className="inp" id="f-y-situation" value={v.y.situation} onChange={v.on.y.situation} aria-required="true" aria-invalid={v.I.y_situation} aria-describedby={v.D.y_situation}>
                                  <option value="">Bitte wählen</option>
                                  <option value="Sekundarschule (Oberstufe)">Sekundarschule (Oberstufe)</option>
                                  <option value="10. Schuljahr oder Brückenangebot">10. Schuljahr oder Brückenangebot</option>
                                  <option value="Integrationsklasse oder -kurs">Integrationsklasse oder -kurs</option>
                                  <option value="Gymnasium oder Mittelschule">Gymnasium oder Mittelschule</option>
                                  <option value="Berufliche Grundbildung (Lehre)">Berufliche Grundbildung (Lehre)</option>
                                  <option value="Lehre abgebrochen">Lehre abgebrochen</option>
                                  <option value="Auf Stellensuche">Auf Stellensuche</option>
                                  <option value="Erwerbstätig">Erwerbstätig</option>
                                  <option value="Andere Situation">Andere Situation</option>
                                </select>
                                {v.H.y_situation ? (
                                  <>
                                  <p id="e-y_situation" className="err" style={{ margin: "0" }}>{v.E.y_situation}</p>
                                  </>
                                ) : null}
                              </div>
                              <fieldset style={{ border: "0", margin: "0", padding: "0" }} aria-describedby={v.D.y_unterstuetzung}>
                                <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Wobei wünschen Sie Unterstützung?&nbsp;*</legend>
                                <div className="opts">
                                  {v.youthSup.map((o, i1) => (
                                    <Fragment key={i1}>
                                      <label className={`chk ${o.cls}`}>
                                        <input type="checkbox" id={o.id} checked={o.checked} onChange={o.toggle} />
                                        <span className="t">{o.label}</span>
                                      </label>
                                    </Fragment>
                                  ))}
                                </div>
                                {v.H.y_unterstuetzung ? (
                                  <>
                                  <p id="e-y_unterstuetzung" className="err" style={{ margin: "10px 0 0" }}>{v.E.y_unterstuetzung}</p>
                                  </>
                                ) : null}
                              </fieldset>
                              <div className="grid2">
                                <div className="fld">
                                  <label className="lbl" htmlFor="f-y-interessen">Berufliche Interessen und Ziele<span className="opt">optional</span></label>
                                  {" "}
                                  <textarea className="inp" id="f-y-interessen" value={v.y.interessen} onChange={v.on.y.interessen} maxLength={800}></textarea>
                                </div>
                                <div className="fld">
                                  <label className="lbl" htmlFor="f-y-herausforderungen">Grösste Herausforderungen<span className="opt">optional</span></label>
                                  {" "}
                                  <textarea className="inp" id="f-y-herausforderungen" value={v.y.herausforderungen} onChange={v.on.y.herausforderungen} maxLength={800}></textarea>
                                </div>
                              </div>
                              <div className="grid2">
                                <fieldset style={{ border: "0", margin: "0", padding: "0" }}>
                                  <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Gewünschte Form des Coachings<span className="opt">optional</span></legend>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {v.youthArt.map((o, i1) => (
                                      <Fragment key={i1}>
                                        <label className={`chk ${o.cls}`}>
                                          <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                          <span className="t">{o.label}</span>
                                        </label>
                                      </Fragment>
                                    ))}
                                  </div>
                                </fieldset>
                                <div className="fld">
                                  <label className="lbl" htmlFor="f-y-sprache">Sprache des Coachings<span className="opt">optional</span></label>
                                  {" "}
                                  <select className="inp" id="f-y-sprache" value={v.y.sprache} onChange={v.on.y.sprache}>
                                    <option value="">Bitte wählen</option>
                                    <option value="Deutsch">Deutsch</option>
                                    <option value="Arabisch">Arabisch</option>
                                    <option value="Aramäisch">Aramäisch</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            </>
                          ) : null}
                          {v.hasInterp ? (
                            <>
                            <div className="sec">
                              <div className="secHead">
                                <span className="k">Fragenteil {v.secNo.interp} · Leistung III</span>
                                <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", lineHeight: "1.15", color: "#163A5F" }}>Dolmetschen &amp; Sprachhilfe</h3>
                              </div>
                              <fieldset style={{ border: "0", margin: "0", padding: "0" }} aria-describedby={v.D.i_art}>
                                <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Worum geht es?&nbsp;*</legend>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                  {v.intArt.map((o, i1) => (
                                    <Fragment key={i1}>
                                      <label className={`chk ${o.cls}`}>
                                        <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                        <span className="t">{o.label}<span className="d">{o.desc}</span></span>
                                      </label>
                                    </Fragment>
                                  ))}
                                </div>
                                {v.H.i_art ? (
                                  <>
                                  <p id="e-i_art" className="err" style={{ margin: "10px 0 0" }}>{v.E.i_art}</p>
                                  </>
                                ) : null}
                              </fieldset>
                              <fieldset style={{ border: "0", margin: "0", padding: "0" }} aria-describedby={`h-i-richtung ${v.D.i_richtung}`}>
                                <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Sprachrichtung&nbsp;*</legend>
                                <div className="opts">
                                  {v.intDir.map((o, i1) => (
                                    <Fragment key={i1}>
                                      <label className={`chk ${o.cls}`}>
                                        <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                        <span className="t">{o.label}</span>
                                      </label>
                                    </Fragment>
                                  ))}
                                </div>
                                <p id="h-i-richtung" className="hint" style={{ margin: "10px 0 0" }}><b style={{ color: "#8A6508" }}>Vorläufig:</b> Welche Varianten und Dialekte abgedeckt werden, wird noch bestätigt. Die Auswahl ist keine Zusage.</p>
                                {v.H.i_richtung ? (
                                  <>
                                  <p id="e-i_richtung" className="err" style={{ margin: "8px 0 0" }}>{v.E.i_richtung}</p>
                                  </>
                                ) : null}
                              </fieldset>
                              <div className="grid2">
                                <div className="fld">
                                  <label className="lbl" htmlFor="f-i-variante">Variante oder Dialekt<span className="opt">optional</span></label>
                                  {" "}
                                  <input className="inp" id="f-i-variante" type="text" value={v.i.variante} onChange={v.on.i.variante} maxLength={80} />
                                </div>
                                <div className="fld">
                                  <label className="lbl" htmlFor="f-i-anlass">Art des Termins oder Dokuments<span className="opt">optional</span></label>
                                  {" "}
                                  <select className="inp" id="f-i-anlass" value={v.i.anlass} onChange={v.on.i.anlass}>
                                    <option value="">Bitte wählen</option>
                                    <option value="Behörde oder Amt">Behörde oder Amt</option>
                                    <option value="Schule oder Elterngespräch">Schule oder Elterngespräch</option>
                                    <option value="Sozialdienst">Sozialdienst</option>
                                    <option value="Ausbildung oder Lehrbetrieb">Ausbildung oder Lehrbetrieb</option>
                                    <option value="Andere Institution">Andere Institution</option>
                                    <option value="Brief, Mitteilung oder Formular">Brief, Mitteilung oder Formular</option>
                                    <option value="Anderes">Anderes</option>
                                  </select>
                                </div>
                              </div>
                              <div className="fld">
                                <label className="lbl" htmlFor="f-i-thema">Thema in Stichworten<span className="opt">optional</span></label>
                                {" "}
                                <input className="inp" id="f-i-thema" type="text" value={v.i.thema} onChange={v.on.i.thema} maxLength={160} aria-describedby="h-i-thema" />
                                {" "}
                                <span id="h-i-thema" className="hint">Zum Beispiel «Elterngespräch zur Lehrstellensuche». Bitte keine vertraulichen Details.</span>
                              </div>
                              {v.intIsTermin ? (
                                <>
                                <div className="grid2">
                                  <div className="fld">
                                    <label className="lbl" htmlFor="f-i-datum">Datum des Termins&nbsp;*</label>
                                    {" "}
                                    <input className="inp" id="f-i-datum" type="date" min={v.todayIso} value={v.i.datum} onChange={v.on.i.datum} aria-required="true" aria-invalid={v.I.i_datum} aria-describedby={v.D.i_datum} />
                                    {v.H.i_datum ? (
                                      <>
                                      <p id="e-i_datum" className="err" style={{ margin: "0" }}>{v.E.i_datum}</p>
                                      </>
                                    ) : null}
                                  </div>
                                  <div className="fld">
                                    <label className="lbl" htmlFor="f-i-zeit">Uhrzeit<span className="opt">optional</span></label>
                                    {" "}
                                    <input className="inp" id="f-i-zeit" type="time" value={v.i.zeit} onChange={v.on.i.zeit} />
                                  </div>
                                  <div className="fld">
                                    <label className="lbl" htmlFor="f-i-dauer">Voraussichtliche Dauer<span className="opt">optional</span></label>
                                    {" "}
                                    <select className="inp" id="f-i-dauer" value={v.i.dauer} onChange={v.on.i.dauer}>
                                      <option value="">Bitte wählen</option>
                                      <option value="Bis 1 Stunde">Bis 1 Stunde</option>
                                      <option value="1–2 Stunden">1–2 Stunden</option>
                                      <option value="Mehr als 2 Stunden">Mehr als 2 Stunden</option>
                                      <option value="Noch unklar">Noch unklar</option>
                                    </select>
                                  </div>
                                </div>
                                <fieldset style={{ border: "0", margin: "0", padding: "0" }} aria-describedby={`h-i-modus ${v.D.i_modus}`}>
                                  <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Wie findet der Termin statt?&nbsp;*</legend>
                                  <div className="opts">
                                    {v.intModus.map((o, i1) => (
                                      <Fragment key={i1}>
                                        <label className={`chk ${o.cls}`}>
                                          <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                          <span className="t">{o.label}</span>
                                        </label>
                                      </Fragment>
                                    ))}
                                  </div>
                                  <p id="h-i-modus" className="hint" style={{ margin: "10px 0 0" }}><b style={{ color: "#8A6508" }}>Vorläufig:</b> Ob Dolmetschen online oder telefonisch angeboten wird, ist noch nicht bestätigt.</p>
                                  {v.H.i_modus ? (
                                    <>
                                    <p id="e-i_modus" className="err" style={{ margin: "8px 0 0" }}>{v.E.i_modus}</p>
                                    </>
                                  ) : null}
                                </fieldset>
                                </>
                              ) : null}
                              {v.intIsDok ? (
                                <>
                                <div className="grid2">
                                  <div className="fld">
                                    <label className="lbl" htmlFor="f-i-datum2">Gewünscht bis<span className="opt">optional</span></label>
                                    {" "}
                                    <input className="inp" id="f-i-datum2" type="date" min={v.todayIso} value={v.i.datum} onChange={v.on.i.datum} aria-invalid={v.I.i_datum} aria-describedby={v.D.i_datum} />
                                    {v.H.i_datum ? (
                                      <>
                                      <p id="e-i_datum" className="err" style={{ margin: "0" }}>{v.E.i_datum}</p>
                                      </>
                                    ) : null}
                                  </div>
                                </div>
                                <p className="hint" style={{ margin: "0" }}>Das Dokument können Sie in Schritt 4 hinzufügen. Beglaubigte Übersetzungen: bitte vorab in der Anfrage nachfragen.</p>
                                </>
                              ) : null}
                              <p className="hint" style={{ margin: "0" }}>Die Dolmetschleistung ist reine Sprachmittlung – ohne rechtliche Vertretung oder Beratung.</p>
                            </div>
                            </>
                          ) : null}
                          <div className="sec">
                            <div className="secHead">
                              <span className="k">Für die ganze Anfrage</span>
                              <h3 className="serif" style={{ margin: "0", fontSize: "30px", fontWeight: "600", lineHeight: "1.15", color: "#163A5F" }}>Dringlichkeit &amp; Fristen</h3>
                            </div>
                            <fieldset style={{ border: "0", margin: "0", padding: "0" }}>
                              <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Wie dringend ist Ihr Anliegen?&nbsp;*</legend>
                              <div className="opts">
                                {v.urgOpts.map((o, i1) => (
                                  <Fragment key={i1}>
                                    <label className={`chk ${o.cls}`}>
                                      <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                      <span className="t">{o.label}<span className="d">{o.desc}</span></span>
                                    </label>
                                  </Fragment>
                                ))}
                              </div>
                            </fieldset>
                            <div className="grid2">
                              <div className="fld">
                                <label className="lbl" htmlFor="f-u-frist">Wichtiges Datum oder Frist<span className="opt">optional</span></label>
                                {" "}
                                <input className="inp" id="f-u-frist" type="date" min={v.todayIso} value={v.u.frist} onChange={v.on.u.frist} aria-invalid={v.I.u_frist} aria-describedby={v.D.u_frist} />
                                {v.H.u_frist ? (
                                  <>
                                  <p id="e-u_frist" className="err" style={{ margin: "0" }}>{v.E.u_frist}</p>
                                  </>
                                ) : null}
                              </div>
                              <div className="fld">
                                <label className="lbl" htmlFor="f-u-grund">Warum ist dieses Datum wichtig?<span className="opt">optional</span></label>
                                {" "}
                                <input className="inp" id="f-u-grund" type="text" value={v.u.grund} onChange={v.on.u.grund} maxLength={200} />
                              </div>
                            </div>
                            <div className="note note-navy" role="note">
                              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#163A5F" strokeWidth="1.6" strokeLinecap="round">
                                <circle cx="12" cy="12" r="9"></circle>
                                <path d="M12 8v5M12 16v.5"></path>
                              </svg>
                              <div>Die Dringlichkeit ist Ihre eigene Einschätzung und keine garantierte Antwortzeit. Diese Website ist <b>kein Notfalldienst</b>. Eine Anfrage hemmt oder verlängert <b>keine behördlichen Fristen</b> – wenden Sie sich bei knappen Fristen bitte zusätzlich direkt an die zuständige Stelle.</div>
                            </div>
                          </div>
                        </div>
                        </>
                      ) : null}
                      {v.isS4 ? (
                        <>
                        <div className="stepanim">
                          <div className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 4 · Dokumente</div>
                          <h2 id="step-title" tabIndex={-1} className="serif" style={{ margin: "10px 0 8px", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F", outline: "none" }}>Unterlagen hinzufügen</h2>
                          <p className="hint" style={{ fontSize: "15px", margin: "0 0 22px" }}>Freiwillig. Fügen Sie nur Dokumente hinzu, die für Ihr Anliegen nötig sind.</p>
                          <label className={`drop ${v.dropCls}`} htmlFor="f-files" onDragOver={v.onDragOver} onDragEnter={v.onDragEnter} onDragLeave={v.onDragLeave} onDrop={v.onDrop}>
                            <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 16V4M7 9l5-5 5 5"></path>
                              <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"></path>
                            </svg>
                            {" "}
                            <span className="serif" style={{ fontSize: "24px", fontWeight: "600", color: "#163A5F" }}>Dateien auswählen<span className="dropdesk">oder hierher ziehen</span></span>
                            {" "}
                            <span className="hint">PDF, JPG, PNG oder HEIC · max. 10 MB pro Datei · max. 10 Dateien</span>
                            {" "}
                            <input className="sr" id="f-files" type="file" multiple accept={v.uploadAccept} onChange={v.onFiles} />
                          </label>
                          {v.hasFileErrors ? (
                            <>
                            <div role="alert" style={{ marginTop: "16px", border: "1px solid #F3C7C2", background: "#FFFBFA", padding: "14px 18px" }}>
                              <p className="err" style={{ margin: "0 0 6px" }}>Nicht hinzugefügt:</p>
                              <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "14px", color: "#7A1D14", display: "flex", flexDirection: "column", gap: "3px" }}>
                                {v.fileErrors.map((fe, i1) => (
                                  <Fragment key={i1}>
                                    <li><span style={{ overflowWrap: "anywhere" }}>{fe.name}</span> – {fe.msg}</li>
                                  </Fragment>
                                ))}
                              </ul>
                            </div>
                            </>
                          ) : null}
                          <div style={{ marginTop: "26px" }}>
                            <h3 style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: "600", color: "#163A5F" }}>Ausgewählte Dateien ({v.fileCount})</h3>
                            {v.noFiles ? (
                              <>
                              <p className="hint" style={{ margin: "0", padding: "18px 0", borderTop: "1px solid #ECE6D8" }}>Noch keine Dateien ausgewählt. Sie können diesen Schritt auch überspringen.</p>
                              </>
                            ) : null}
                            {v.hasFiles ? (
                              <>
                              <ul style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "1px solid #ECE6D8" }}>
                                {v.files.map((fl, i1) => (
                                  <Fragment key={i1}>
                                    <li className="frow">
                                      <span aria-hidden="true" style={{ width: "36px", height: "44px", border: "1px solid #C9BFAA", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "5px", fontSize: "9px", fontWeight: "600", letterSpacing: ".06em", color: "#8A6508", background: "#FFFFFF" }}>{fl.ext}</span>
                                      {" "}
                                      <span style={{ minWidth: "0" }}>
                                        <span style={{ display: "block", fontSize: "14.5px", color: "#0E1A28", overflowWrap: "anywhere" }}>{fl.name}</span>
                                        <span className="hint">{fl.sizeLabel} · nur lokal angezeigt</span>
                                      </span>
                                      {" "}
                                      <button className="rm" type="button" onClick={fl.remove} aria-label={fl.removeLabel}>Entfernen</button>
                                    </li>
                                  </Fragment>
                                ))}
                              </ul>
                              </>
                            ) : null}
                          </div>
                        </div>
                        </>
                      ) : null}
                      {v.isS5 ? (
                        <>
                        <div className="stepanim">
                          <div className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 5 · Termin</div>
                          <h2 id="step-title" tabIndex={-1} className="serif" style={{ margin: "10px 0 8px", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F", outline: "none" }}>Möchten Sie direkt einen Termin wählen?</h2>
                          <p className="hint" style={{ fontSize: "15px", margin: "0 0 22px" }}>Ein Erstgespräch dauert 45 Minuten – auch wenn Sie mehrere Leistungen gewählt haben.</p>
                          <fieldset style={{ border: "0", margin: "0", padding: "0" }}>
                            <legend className="sr">Anfrage mit oder ohne Termin</legend>
                            <div className="seg">
                              {v.bookOpts.map((o, i1) => (
                                <Fragment key={i1}>
                                  <label className={`chk ${o.cls}`} style={{ padding: "18px" }}>
                                    <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                    <span className="t">
                                      <b style={{ color: "#163A5F" }}>{o.label}</b>
                                      <span className="d">{o.desc}</span>
                                    </span>
                                  </label>
                                </Fragment>
                              ))}
                            </div>
                          </fieldset>
                          {v.keptSlotNote ? (
                            <>
                            <p className="hint" role="status" style={{ margin: "16px 0 0" }}>Ihre zuvor gewählte Zeit ({v.keptSlotLabel}) bleibt vorgemerkt, falls Sie wieder «Anfrage mit Termin» wählen. Sie wird ohne Termin nicht übermittelt.</p>
                            </>
                          ) : null}
                          {v.bookingMit ? (
                            <>
                            <div style={{ marginTop: "26px", display: "flex", flexDirection: "column", gap: "26px" }}>
                              <div className="note" role="note">
                                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A6508" strokeWidth="1.6" strokeLinecap="round">
                                  <rect x="3.5" y="5" width="17" height="15" rx="1"></rect>
                                  <path d="M3.5 9.5h17M8 3v4M16 3v4"></path>
                                </svg>
                                <div><b>Terminwunsch.</b> Die gewählte Zeit wird nach Eingang Ihrer Anfrage bestätigt. Alle Zeiten in Schweizer Zeit (Europe/Zurich).</div>
                              </div>
                              <fieldset style={{ border: "0", margin: "0", padding: "0" }} aria-describedby={v.D.b_format}>
                                <legend className="lbl" style={{ padding: "0", marginBottom: "10px" }}>Form des Erstgesprächs&nbsp;*</legend>
                                <div className="seg">
                                  {v.formatOpts.map((o, i1) => (
                                    <Fragment key={i1}>
                                      <label className={`chk ${o.cls}`}>
                                        <input type="radio" name={o.name} id={o.id} checked={o.checked} onChange={o.pick} />
                                        <span className="t">{o.label}<span className="d">{o.desc}</span></span>
                                      </label>
                                    </Fragment>
                                  ))}
                                </div>
                                {v.H.b_format ? (
                                  <>
                                  <p id="e-b_format" className="err" style={{ margin: "10px 0 0" }}>{v.E.b_format}</p>
                                  </>
                                ) : null}
                              </fieldset>
                              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "28px", alignItems: "start" }}>
                                <div id="cal-grid" tabIndex={-1} style={{ outline: "none" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <button className="calnav" type="button" onClick={v.cal.prev} disabled={v.cal.prevDisabled} aria-label="Vorheriger Monat">
                                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#163A5F" strokeWidth="1.6">
                                        <path d="M15 5l-7 7 7 7"></path>
                                      </svg>
                                    </button>
                                    <h3 className="serif" style={{ margin: "0", fontSize: "24px", fontWeight: "600", color: "#163A5F" }}>{v.cal.monthLabel}</h3>
                                    <button className="calnav" type="button" onClick={v.cal.next} disabled={v.cal.nextDisabled} aria-label="Nächster Monat">
                                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#163A5F" strokeWidth="1.6">
                                        <path d="M9 5l7 7-7 7"></path>
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="cal" aria-hidden="true">
                                    <span className="dow">Mo</span>
                                    <span className="dow">Di</span>
                                    <span className="dow">Mi</span>
                                    <span className="dow">Do</span>
                                    <span className="dow">Fr</span>
                                    <span className="dow">Sa</span>
                                    <span className="dow">So</span>
                                  </div>
                                  <div className="cal" role="group" aria-label={v.cal.groupLabel} aria-describedby="cal-help" onKeyDown={v.calKey}>
                                    {v.cal.cells.map((d, i1) => (
                                      <Fragment key={i1}>
                                        {d.blank ? (
                                          <>
                                          <span aria-hidden="true"></span>
                                          </>
                                        ) : null}
                                        {d.real ? (
                                          <>
                                          <button className={`day ${d.cls}`} id={d.id} type="button" tabIndex={d.tab} onClick={d.pick} aria-disabled={d.ariaDis} aria-pressed={d.pressed} aria-label={d.aria}>
                                            <span>{d.label}</span>
                                            <span className="dot" aria-hidden="true"></span>
                                          </button>
                                          </>
                                        ) : null}
                                      </Fragment>
                                    ))}
                                  </div>
                                  <ul className="legend" aria-label="Legende">
                                    <li><span className="sw" aria-hidden="true" style={{ background: "#FFFFFF", border: "1px solid #8A7A55", boxShadow: "inset 0 -4px 0 -2px #D4A017" }}></span>Verfügbar</li>
                                    <li><span className="sw" aria-hidden="true" style={{ background: "#163A5F" }}></span>Ausgewählt</li>
                                    <li><span className="sw" aria-hidden="true" style={{ background: "#F1EEE7" }}></span>Ausgebucht / geschlossen</li>
                                    <li><span className="sw" aria-hidden="true" style={{ border: "1px dashed #C9BFAA", background: "linear-gradient(to top right, transparent 46%, #A3AAB3 48%, #A3AAB3 52%, transparent 54%)" }}></span>Vergangen</li>
                                  </ul>
                                  <p id="cal-help" className="hint" style={{ margin: "10px 0 0" }}>Tastatur: Pfeiltasten wechseln den Tag, Bild auf/ab den Monat, Eingabe wählt aus. Wochenenden und Tage innerhalb von {booking.minNoticeHours} Stunden sind nicht wählbar.</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                  <h3 style={{ margin: "0", fontSize: "14px", fontWeight: "600", color: "#163A5F" }}>{v.slotsTitle}</h3>
                                  {v.noDate ? (
                                    <>
                                    <p className="hint" style={{ margin: "0", padding: "22px", border: "1px dashed #DCD5C6", textAlign: "center" }}>Bitte wählen Sie zuerst einen Tag im Kalender.</p>
                                    </>
                                  ) : null}
                                  {v.slotsLoading ? (
                                    <>
                                    <div role="status" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "22px 0", fontSize: "14px", color: "#4A5563" }}><span className="spin-navy" aria-hidden="true"></span>Freie Zeiten werden geladen …</div>
                                    </>
                                  ) : null}
                                  {v.showSlots ? (
                                    <>
                                    <div id="slot-list" className="slots" role="group" aria-label="Uhrzeit auswählen" style={{ scrollMarginBottom: "120px" }}>
                                      {v.slots.map((sl, i1) => (
                                        <Fragment key={i1}>
                                          <button className={`slot ${sl.cls}`} type="button" onClick={sl.pick} aria-disabled={sl.ariaDis} aria-pressed={sl.pressed} aria-label={sl.aria}>
                                            <span className="tm" aria-hidden="true">{sl.label}</span>
                                            <span className="st" aria-hidden="true">{sl.state}</span>
                                          </button>
                                        </Fragment>
                                      ))}
                                    </div>
                                    <p className="hint" style={{ margin: "0" }}>Jeweils 45 Minuten, mit 15 Minuten Pause dazwischen. «Belegt», «Reisezeit» und «Vorbei» sind nicht wählbar.{v.slotsVorOrtHint}</p>
                                    </>
                                  ) : null}
                                  {v.noSlots ? (
                                    <>
                                    <p className="hint" style={{ margin: "0", padding: "22px", border: "1px dashed #DCD5C6", textAlign: "center" }}>An diesem Tag sind keine Zeiten frei. Bitte wählen Sie einen anderen Tag.</p>
                                    </>
                                  ) : null}
                                  {v.H.b_slot ? (
                                    <>
                                    <p id="e-b_slot" className="err" style={{ margin: "0" }}>{v.E.b_slot}</p>
                                    </>
                                  ) : null}
                                </div>
                              </div>
                              {v.hasChosen ? (
                                <>
                                <div role="status" style={{ border: "1px solid #163A5F", borderLeftWidth: "1px", background: "#F2F5F9", padding: "20px 22px", display: "grid", gridTemplateColumns: "28px minmax(0, 1fr)", gap: "14px" }}>
                                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163A5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="9"></circle>
                                    <path d="M8 12.5l3 3 5-6"></path>
                                  </svg>
                                  <div>
                                    <div className="eyebrow" style={{ color: "#8A6508", fontSize: "10.5px" }}>Gewählter Termin</div>
                                    <p className="serif" style={{ margin: "4px 0 0", fontSize: "24px", lineHeight: "1.25", color: "#163A5F" }}>{v.chosenLong}</p>
                                    <p className="hint" style={{ margin: "4px 0 0" }}>{v.chosenFormatLine}</p>
                                  </div>
                                </div>
                                </>
                              ) : null}
                            </div>
                            </>
                          ) : null}
                        </div>
                        </>
                      ) : null}
                      {v.isS6 ? (
                        <>
                        <div className="stepanim">
                          <div className="eyebrow" style={{ color: "#8A6508", fontSize: "11px" }}>Schritt 6 · Überprüfen</div>
                          <h2 id="step-title" tabIndex={-1} className="serif" style={{ margin: "10px 0 8px", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F", outline: "none" }}>Alles korrekt?</h2>
                          <p className="hint" style={{ fontSize: "15px", margin: "0 0 18px" }}>Prüfen Sie Ihre Angaben. Mit «Bearbeiten» gelangen Sie direkt zum jeweiligen Schritt.</p>
                          <div className="rv-sec">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                              <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Leistungen</h3>
                              <button className="btn-text" type="button" onClick={v.go1} aria-label="Leistungen bearbeiten">Bearbeiten</button>
                            </div>
                            <p style={{ margin: "0", fontSize: "15px", color: "#0E1A28" }}>{v.rvServices}</p>
                          </div>
                          <div className="rv-sec">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                              <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Kontakt</h3>
                              <button className="btn-text" type="button" onClick={v.go2} aria-label="Kontaktangaben bearbeiten">Bearbeiten</button>
                            </div>
                            <dl style={{ margin: "0" }}>
                              {v.rvContact.map((r, i1) => (
                                <Fragment key={i1}>
                                  <div className="rv-row">
                                    <dt>{r.k}</dt>
                                    <dd>{r.v}</dd>
                                  </div>
                                </Fragment>
                              ))}
                            </dl>
                          </div>
                          {v.hasAdmin ? (
                            <>
                            <div className="rv-sec">
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Administrative Unterstützung</h3>
                                <button className="btn-text" type="button" onClick={v.go3} aria-label="Angaben zur administrativen Unterstützung bearbeiten">Bearbeiten</button>
                              </div>
                              <dl style={{ margin: "0" }}>
                                {v.rvAdmin.map((r, i1) => (
                                  <Fragment key={i1}>
                                    <div className="rv-row">
                                      <dt>{r.k}</dt>
                                      <dd>{r.v}</dd>
                                    </div>
                                  </Fragment>
                                ))}
                              </dl>
                            </div>
                            </>
                          ) : null}
                          {v.hasYouth ? (
                            <>
                            <div className="rv-sec">
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Jugendcoaching &amp; Berufsorientierung</h3>
                                <button className="btn-text" type="button" onClick={v.go3} aria-label="Angaben zum Jugendcoaching bearbeiten">Bearbeiten</button>
                              </div>
                              <dl style={{ margin: "0" }}>
                                {v.rvYouth.map((r, i1) => (
                                  <Fragment key={i1}>
                                    <div className="rv-row">
                                      <dt>{r.k}</dt>
                                      <dd>{r.v}</dd>
                                    </div>
                                  </Fragment>
                                ))}
                              </dl>
                            </div>
                            </>
                          ) : null}
                          {v.hasInterp ? (
                            <>
                            <div className="rv-sec">
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Dolmetschen &amp; Sprachhilfe</h3>
                                <button className="btn-text" type="button" onClick={v.go3} aria-label="Angaben zum Dolmetschen bearbeiten">Bearbeiten</button>
                              </div>
                              <dl style={{ margin: "0" }}>
                                {v.rvInterp.map((r, i1) => (
                                  <Fragment key={i1}>
                                    <div className="rv-row">
                                      <dt>{r.k}</dt>
                                      <dd>{r.v}</dd>
                                    </div>
                                  </Fragment>
                                ))}
                              </dl>
                            </div>
                            </>
                          ) : null}
                          <div className="rv-sec">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                              <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Dringlichkeit &amp; Fristen</h3>
                              <button className="btn-text" type="button" onClick={v.go3} aria-label="Dringlichkeit und Fristen bearbeiten">Bearbeiten</button>
                            </div>
                            <dl style={{ margin: "0" }}>
                              {v.rvUrg.map((r, i1) => (
                                <Fragment key={i1}>
                                  <div className="rv-row">
                                    <dt>{r.k}</dt>
                                    <dd>{r.v}</dd>
                                  </div>
                                </Fragment>
                              ))}
                            </dl>
                          </div>
                          <div className="rv-sec">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                              <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Dokumente</h3>
                              <button className="btn-text" type="button" onClick={v.go4} aria-label="Dokumente bearbeiten">Bearbeiten</button>
                            </div>
                            <p style={{ margin: "0", fontSize: "14.5px", color: "#0E1A28", whiteSpace: "pre-line", overflowWrap: "anywhere" }}>{v.rvFiles}</p>
                          </div>
                          <div className="rv-sec">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                              <h3 className="serif" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Termin</h3>
                              <button className="btn-text" type="button" onClick={v.go5} aria-label="Termin bearbeiten">Bearbeiten</button>
                            </div>
                            <p style={{ margin: "0", fontSize: "14.5px", color: "#0E1A28" }}>{v.rvBooking}</p>
                          </div>
                          <fieldset className="rv-sec" style={{ borderLeft: "0", borderRight: "0", borderBottom: "0", margin: "0", padding: "24px 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                            <legend className="serif" style={{ padding: "0 12px 0 0", fontSize: "26px", fontWeight: "600", color: "#163A5F" }}>Datenschutz &amp; Einwilligung</legend>
                            <p className="hint" style={{ margin: "0 0 6px" }}>Ihre Angaben werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet. Details regelt die <Link href="/datenschutz" style={{ color: "#8A6508" }}>Datenschutzerklärung</Link>.</p>
                            <label className={`chk ${v.cs.privacyCls}`}>
                              <input type="checkbox" id="f-consent-privacy" checked={v.cs.privacy} onChange={v.cs.togglePrivacy} aria-invalid={v.I.consent_privacy} aria-describedby={v.D.consent_privacy} />
                              <span className="t">Ich habe die Datenschutzerklärung zur Kenntnis genommen und bin mit der Bearbeitung meiner Angaben für diese Anfrage einverstanden. *</span>
                            </label>
                            {v.H.consent_privacy ? (
                              <>
                              <p id="e-consent_privacy" className="err" style={{ margin: "0" }}>{v.E.consent_privacy}</p>
                              </>
                            ) : null}
                            <label className={`chk ${v.cs.selfCls}`}>
                              <input type="checkbox" id="f-consent-self" checked={v.cs.self} onChange={v.cs.toggleSelf} aria-invalid={v.I.consent_self} aria-describedby={v.D.consent_self} />
                              <span className="t">{v.asInst ? "Ich stelle diese Anfrage im Namen der angegebenen Institution" : "Ich stelle diese Anfrage für mich selbst"} und habe verstanden, dass keine Rechtsberatung und keine rechtliche Vertretung erfolgt. *</span>
                            </label>
                            {v.H.consent_self ? (
                              <>
                              <p id="e-consent_self" className="err" style={{ margin: "0" }}>{v.E.consent_self}</p>
                              </>
                            ) : null}
                            {v.kontaktWa ? (
                              <>
                              <label className={`chk ${v.cs.waCls}`}>
                                <input type="checkbox" id="f-consent-wa" checked={v.cs.wa} onChange={v.cs.toggleWa} aria-invalid={v.I.consent_wa} aria-describedby={v.D.consent_wa} />
                                <span className="t">Ich bin einverstanden, per WhatsApp (Dienst von Meta, Datenbearbeitung auch ausserhalb der Schweiz) kontaktiert zu werden. *</span>
                              </label>
                              {v.H.consent_wa ? (
                                <>
                                <p id="e-consent_wa" className="err" style={{ margin: "0" }}>{v.E.consent_wa}</p>
                                </>
                              ) : null}
                              </>
                            ) : null}
                          </fieldset>
                        </div>
                        </>
                      ) : null}
                      <div className="save-m">
                        <button className="btn-text" type="button" onClick={v.saveDraft}>Entwurf speichern</button>
                      </div>
                      <div className="foot">
                        <div className="lgrp" style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                          {v.notFirst ? (
                            <>
                            <button className="btn btn-line" type="button" onClick={v.back} aria-label={v.backAria}><span aria-hidden="true">←</span> Zurück</button>
                            </>
                          ) : null}
                          <button className="btn-text save-d" type="button" onClick={v.saveDraft}>Entwurf speichern</button>
                        </div>
                        <span className="mpos" aria-hidden="true">{v.stepNo} / 6</span>
                        {v.notLast ? (
                          <>
                          <button className="btn btn-navy" type="submit">{v.nextLabel} <span className="arr" aria-hidden="true">→</span></button>
                          </>
                        ) : null}
                        {v.isS6 ? (
                          <>
                          <button className="btn btn-navy" type="submit" disabled={v.submitting} aria-busy={v.submittingStr}>
                            {v.submitting ? (
                              <>
                              <span className="spin" aria-hidden="true"></span>
                              </>
                            ) : null}
                            <span className="lbl-d">{v.submitLabel}</span>
                            <span className="lbl-m" aria-hidden="true">{v.submitLabelShort}</span>
                          </button>
                          </>
                        ) : null}
                      </div>
                      {v.draftPanel ? (
                        <>
                        <div role="status" style={{ marginTop: "18px", border: "1px solid #163A5F", background: "#F2F5F9", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "flex-start" }}>
                            <h3 className="serif" style={{ margin: "0", fontSize: "24px", fontWeight: "600", color: "#163A5F" }}>Entwurf gespeichert</h3>
                            <button className="rm" type="button" onClick={v.closeDraft} aria-label="Hinweis schliessen">✕</button>
                          </div>
                          <p style={{ margin: "0", fontSize: "14.5px", color: "#2B3644" }}>Ihr Entwurf bleibt gespeichert, solange dieses Browserfenster geöffnet ist.</p>
                        </div>
                        </>
                      ) : null}
                    </form>
                  </div>
                  </>
                ) : null}
                {v.isDone ? (
                  <>
                  <div className="panel stepanim" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", paddingTop: "clamp(40px, 6vw, 72px)", paddingBottom: "clamp(40px, 6vw, 72px)" }}>
                    <span aria-hidden="true" style={{ width: "72px", height: "72px", borderRadius: "50%", border: "1px solid #D4A017", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#163A5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12.5l5 5L20 6.5"></path>
                      </svg>
                    </span>
                    <h2 id="step-title" tabIndex={-1} className="serif" style={{ margin: "0", fontSize: "clamp(34px, 4vw, 52px)", lineHeight: "1.1", fontWeight: "500", color: "#163A5F", outline: "none" }}>Vielen Dank für Ihre Anfrage.</h2>
                    <p style={{ margin: "0", fontSize: "16px", color: "#2B3644", maxWidth: "34em" }}>Ihre Referenznummer</p>
                    <p className="serif" style={{ margin: "-8px 0 0", fontSize: "34px", letterSpacing: ".06em", color: "#163A5F" }}>{v.ref}</p>
                    <p style={{ margin: "0", fontSize: "15px", color: "#2B3644", maxWidth: "36em" }}>Ich melde mich so bald wie möglich bei Ihnen.</p>
                    <p className="hint" style={{ margin: "0", maxWidth: "36em" }}>Sie erhalten zusätzlich eine Bestätigung per E-Mail{v.doneBookingNote}.</p>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "10px" }}>
                      <button className="btn btn-navy" type="button" onClick={v.reset}>Neue Anfrage</button>
                      <Link className="btn btn-line" href="/">Zur Startseite</Link>
                    </div>
                  </div>
                  </>
                ) : null}
              </div>
              <aside className="aside" aria-label="Zusammenfassung Ihrer Anfrage">
                <div style={{ background: "#163A5F", color: "#FFFFFF", padding: "28px 26px", position: "relative" }}>
                  <div aria-hidden="true" style={{ position: "absolute", inset: "10px", border: "1px solid rgba(212,160,23,.25)", pointerEvents: "none" }}></div>
                  <div style={{ position: "relative" }}>
                    <div className="eyebrow" style={{ color: "#D4A017", fontSize: "11px" }}>Ihre Anfrage</div>
                    {v.sbNoServices ? (
                      <>
                      <p style={{ margin: "12px 0 0", fontSize: "14px", color: "#C9D3DE" }}>Noch keine Leistung gewählt.</p>
                      </>
                    ) : null}
                    <ul style={{ listStyle: "none", margin: "12px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {v.sbServices.map((s, i1) => (
                        <Fragment key={i1}>
                          <li className="serif" style={{ fontSize: "21px", lineHeight: "1.25", color: "#FAF9F5", display: "flex", gap: "10px" }}><span style={{ color: "#D4A017", fontStyle: "italic", fontSize: "17px", minWidth: "28px" }}>{s.num}</span>{s.title}</li>
                        </Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ background: "#FFFFFF", border: "1px solid #ECE6D8", borderTop: "0", padding: "8px 26px 18px" }}>
                  <div className="sbrow">
                    <span>Kontaktweg</span>
                    <span>{v.sbKontakt}</span>
                  </div>
                  <div className="sbrow">
                    <span>Dringlichkeit</span>
                    <span>{v.sbUrg}</span>
                  </div>
                  <div className="sbrow">
                    <span>Dokumente</span>
                    <span>{v.sbFiles}</span>
                  </div>
                  <div className="sbrow" style={{ borderBottom: "0" }}>
                    <span>Termin</span>
                    <span>{v.sbTermin}</span>
                  </div>
                </div>
                <p className="hint" style={{ margin: "14px 2px 0" }}>Ein Erstgespräch · 45 Minuten · online oder in Zürich und Umgebung.</p>
              </aside>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
