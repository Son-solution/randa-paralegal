/**
 * Editable business information.
 *
 * Everything here is shown on the website. Values that are not confirmed yet are
 * `null` – the website then shows "[folgt]" (or hides the element) instead of
 * inventing information. Fill them in once Randa Kale has confirmed them.
 */

/**
 * Public URL without trailing slash: NEXT_PUBLIC_SITE_URL, otherwise the production
 * domain Vercel provides at build time, otherwise localhost (local development).
 */
function siteUrl(): string {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url = process.env.NEXT_PUBLIC_SITE_URL || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return url.replace(/\/$/, "");
}

export const site = {
  name: "Randa Paralegal Services",
  owner: "Randa Kale",
  slogan: "Verstehen. Begleiten. Zukunft gestalten.",
  city: "Zürich",
  region: "Zürich und Umgebung",
  locale: "de-CH",

  /** Public URL, set via NEXT_PUBLIC_SITE_URL (see .env.example). */
  url: siteUrl(),

  /** Languages offered (from the project briefing). */
  languages: ["Deutsch", "Arabisch", "Aramäisch"],

  /** Contact details – leave `null` until confirmed. */
  contact: {
    phone: "+41 78 625 12 42" as string | null,
    email: "info@randa-paralegalservices.ch" as string | null,
    /** Postal address for the Impressum, e.g. ["Musterstrasse 1", "8000 Zürich"]. */
    address: null as string[] | null,
  },

  /** UID (Unternehmens-Identifikationsnummer), e.g. "CHE-123.456.789" – only if registered. */
  uid: null as string | null,

  /**
   * Legal pages. While a value is `null`, the footer shows the label without a link.
   * The texts are drafts and should be legally reviewed before the public launch.
   */
  legal: {
    impressum: "/impressum" as string | null,
    datenschutz: "/datenschutz" as string | null,
    cookies: "/cookie-richtlinie" as string | null,
    // Excerpt from the client briefing ("Rechtliche Hinweise & AGB"); full AGB still to be supplied.
    agb: "/rechtliche-hinweise" as string | null,
  },

  /**
   * Shows the old "Prototyp" notes under the call-to-action buttons. Keep `false`:
   * the intake form now sends requests by e-mail (src/app/api/anfrage/route.ts).
   */
  showDemoNotices: false,

  /** Shows the thin prototype notice at the top of every page. */
  showPrototypeBar: false,

  /**
   * Allows search engines to index the website. Keep `false` while the site is a
   * prototype (no legal pages, demo form); every page then carries "noindex".
   * Set to `true` for the public launch.
   */
  allowIndexing: false,

  /** Text of the prototype notice. */
  prototypeNotice:
    "Prototyp – Anfrageformular, Terminbuchung und Kontaktangaben sind noch nicht aktiv.",
} as const;

/** Builds a tel: link once a phone number is configured. */
export function phoneHref(): string | null {
  const n = site.contact.phone;
  return n ? `tel:${n.replace(/[^\d+]/g, "")}` : null;
}
