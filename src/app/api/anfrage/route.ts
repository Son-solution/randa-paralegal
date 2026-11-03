/**
 * POST /api/anfrage – receives the intake form and sends it by e-mail (Resend).
 *
 * Needs RESEND_API_KEY (and optionally MAIL_FROM / MAIL_TO) in the environment,
 * see .env.example. Nothing is stored on the server: the request only exists in
 * the two e-mails (to Randa and the confirmation to the client).
 */
import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { confirmationMail, requestMail, type Mail } from "@/lib/intake/email";
import { fromPayload } from "@/lib/intake/payload";
import { initialState } from "@/lib/intake/state";
import { buildSummary } from "@/lib/intake/summary";
import { validate } from "@/lib/intake/validation";
import { zurichNow } from "@/lib/intake/dates";

// Best-effort limit per IP. Serverless instances do not share memory, so this only slows down simple abuse.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

async function send(mail: Mail, to: string, replyTo: string): Promise<boolean> {
  const from = process.env.MAIL_FROM || `${site.name} <anfrage@randa-paralegalservices.ch>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject: mail.subject, html: mail.html, text: mail.text }),
    });
    if (!res.ok) console.error("Resend error", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("Resend request failed", e);
    return false;
  }
}

const fail = (status: number, error: string) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const inbox = process.env.MAIL_TO || site.contact.email;
  if (!process.env.RESEND_API_KEY || !inbox) {
    console.error("Intake form: RESEND_API_KEY or recipient missing");
    return fail(503, "Der Versand ist zurzeit nicht eingerichtet.");
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return fail(429, "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut.");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Ungültige Anfrage.");
  }
  const meta = (body && typeof body === "object" ? body : {}) as { hp?: unknown; ms?: unknown; data?: unknown };
  // Spam traps: a hidden field only bots fill in, and forms sent within seconds of opening.
  // Answer "ok" so bots do not learn which check stopped them.
  if (meta.hp || (typeof meta.ms === "number" && meta.ms < 4000)) return NextResponse.json({ ref: "RPS-0000-0000" });

  const data = fromPayload(meta.data);
  if (!data) return fail(400, "Ungültige Anfrage.");
  const state = { ...initialState(), ...data };
  for (let n = 1; n <= 6; n++) {
    const errs = validate(n, state);
    if (errs.length) return fail(422, errs[0].msg);
  }

  const ref = "RPS-" + zurichNow().iso.slice(0, 4) + "-" + String(Math.floor(1000 + Math.random() * 9000));
  const sum = buildSummary(data);

  const ok = await send(requestMail(ref, data, sum), inbox, data.c.email.trim());
  if (!ok) return fail(502, "Die Anfrage konnte nicht gesendet werden.");
  // The confirmation is a courtesy: Randa already has the request, so a failure here is only logged.
  await send(confirmationMail(ref, data, sum), data.c.email.trim(), inbox);

  return NextResponse.json({ ref });
}
