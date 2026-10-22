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

  /**
   * Contact details – NOT YET CONFIRMED. Leave `null` until supplied.
   * whatsapp: international format without spaces, e.g. "+41791234567".
   */
  contact: {
    phone: null as string | null,
    email: null as string | null,
    whatsapp: null as string | null,
  },

  /**
   * Legal pages. They are planned but not written yet; while `null`, the footer shows
   * "Impressum (folgt)" etc. instead of a link. Set to a path such as "/impressum"
   * once the (legally reviewed) page exists.
   */
  legal: {
    impressum: null as string | null,
    datenschutz: null as string | null,
    // Excerpt from the client briefing ("Rechtliche Hinweise & AGB"); full AGB still to be supplied.
    agb: "/rechtliche-hinweise" as string | null,
  },

  /**
   * Demo mode for the intake form ("Anfrage & Termin").
   * While `true`, nothing is transmitted, uploaded, stored or booked.
   * The production backend is a separate, not yet approved phase.
   */
  demoMode: true,

  /** Shows the thin prototype notice at the top of every page. */
  showPrototypeBar: true,

  /**
   * Allows search engines to index the website. Keep `false` while the site is a
   * prototype (no legal pages, demo form); every page then carries "noindex".
   * Set to `true` for the public launch.
   */
  allowIndexing: false,

  /** Text of the prototype notice. */
  prototypeNotice:
    "Prototyp – Anfrageformular, Terminbuchung, WhatsApp und Kontaktangaben sind noch nicht aktiv.",
} as const;

/** Builds a wa.me link once a WhatsApp number is configured. */
export function whatsappHref(): string | null {
  const n = site.contact.whatsapp;
  return n ? `https://wa.me/${n.replace(/[^\d]/g, "")}` : null;
}
