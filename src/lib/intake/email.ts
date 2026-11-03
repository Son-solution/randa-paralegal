/**
 * E-mails for a submitted request: the full request for Randa and a short
 * confirmation for the client. Plain HTML with inline styles (e-mail clients
 * ignore stylesheets) plus a text version.
 */
import { site } from "@/config/site";
import { chosenSlotLabel, type Summary, type SummaryRow } from "./summary";
import type { FormData } from "./state";

export type Mail = { subject: string; html: string; text: string };

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const br = (v: string) => esc(v).replace(/\n/g, "<br>");

const NAVY = "#163A5F";
const GOLD = "#8A6508";

function wrap(inner: string): string {
  return (
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#0E1A28;max-width:640px;margin:0 auto;padding:24px">` +
    `<p style="margin:0 0 20px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:${GOLD}">${esc(site.name)}</p>` +
    inner +
    `</div>`
  );
}

function section(title: string, body: string): string {
  return `<h2 style="margin:28px 0 8px;font-size:18px;color:${NAVY};border-bottom:1px solid #D9CFBB;padding-bottom:6px">${esc(title)}</h2>${body}`;
}

function table(list: SummaryRow[]): string {
  const tr = list
    .map((r) => `<tr><td style="padding:6px 16px 6px 0;vertical-align:top;color:#4A5563;white-space:nowrap">${esc(r.k)}</td><td style="padding:6px 0;vertical-align:top">${br(r.v)}</td></tr>`)
    .join("");
  return `<table role="presentation" style="border-collapse:collapse;width:100%">${tr}</table>`;
}

const textRows = (list: SummaryRow[]) => list.map((r) => r.k + ": " + r.v.replace(/\n/g, "\n    ")).join("\n");

/** The request as it arrives in Randa's inbox. */
export function requestMail(ref: string, s: FormData, sum: Summary): Mail {
  const name = (s.c.vorname + " " + s.c.nachname).trim();
  const blocks: [string, SummaryRow[] | string][] = [
    ["Leistungen", sum.services],
    ["Kontakt", sum.contact],
    ["Administrative Unterstützung", sum.admin],
    ["Jugendcoaching & Berufsorientierung", sum.youth],
    ["Dolmetschen & Sprachhilfe", sum.interp],
    ["Dringlichkeit & Fristen", sum.urgency],
    ["Dokumente", sum.files],
    ["Termin", sum.booking],
  ];
  const shown = blocks.filter(([, b]) => b.length > 0);
  const html = wrap(
    `<h1 style="margin:0 0 6px;font-size:24px;color:${NAVY}">Neue Anfrage ${esc(ref)}</h1>` +
      `<p style="margin:0;color:#4A5563">Von ${esc(name)} · Antworten Sie direkt auf diese E-Mail, um ${esc(s.c.vorname || name)} zu schreiben.</p>` +
      shown.map(([t, b]) => section(t, typeof b === "string" ? `<p style="margin:0">${br(b)}</p>` : table(b))).join("")
  );
  const text =
    "Neue Anfrage " + ref + "\nVon " + name + "\n\n" +
    shown.map(([t, b]) => t.toUpperCase() + "\n" + (typeof b === "string" ? b : textRows(b))).join("\n\n");
  return { subject: "Neue Anfrage " + ref + " – " + name, html, text };
}

/** Short confirmation for the client. */
export function confirmationMail(ref: string, s: FormData, sum: Summary): Mail {
  const greeting = "Guten Tag " + ((s.c.anrede ? s.c.anrede + " " : "") + s.c.nachname).trim();
  const slot = chosenSlotLabel(s);
  const lines = [
    greeting,
    "Vielen Dank für Ihre Anfrage. Sie ist bei mir eingegangen und ich melde mich so bald wie möglich bei Ihnen.",
    slot ? "Ihren Terminwunsch (" + slot + ") bestätige ich Ihnen persönlich – er ist erst nach meiner Bestätigung verbindlich." : "",
    "Falls für Ihr Anliegen Unterlagen nötig sind, sage ich Ihnen, welche. Sie können sie mir dann als Antwort auf diese E-Mail senden.",
    "Ihre Referenznummer: " + ref + "\nGewählte Leistungen: " + sum.services,
    "Bitte beachten Sie: Eine Anfrage hemmt oder verlängert keine behördlichen Fristen.",
    "Freundliche Grüsse\n" + site.owner + "\n" + site.name + (site.contact.phone ? "\n" + site.contact.phone : ""),
  ].filter(Boolean);
  const html = wrap(lines.map((l) => `<p style="margin:0 0 14px">${br(l)}</p>`).join(""));
  return { subject: "Ihre Anfrage " + ref + " – " + site.name, html, text: lines.join("\n\n") };
}
