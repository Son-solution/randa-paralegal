/** Routes and service definitions used by the header, footer and intake form. */

export type PageKey = "home" | "about" | "admin" | "youth" | "interp" | "intake" | "contact" | "legal" | "none";

export const routes = {
  home: "/",
  about: "/ueber-mich",
  admin: "/administrative-unterstuetzung",
  youth: "/jugendcoaching",
  interp: "/dolmetschen",
  intake: "/anfrage",
  contact: "/kontakt",
  legal: "/rechtliche-hinweise",
} as const;

export const services = [
  {
    key: "admin" as const,
    num: "I.",
    title: "Administrative Unterstützung",
    teaser: "Formulare, Briefe und Schriftverkehr – ohne Rechtsberatung",
    href: routes.admin,
  },
  {
    key: "youth" as const,
    num: "II.",
    title: "Jugendcoaching & Berufsorientierung",
    teaser: "Berufswahl, Bewerbung und Lehrstellensuche",
    href: routes.youth,
  },
  {
    key: "interp" as const,
    num: "III.",
    title: "Dolmetschen & Sprachhilfe",
    teaser: "Arabisch und Aramäisch, bei Terminen und für Dokumente",
    href: routes.interp,
  },
];
