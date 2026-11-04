/**
 * Cookie consent for Google Analytics.
 *
 * The visitor's choice is kept in localStorage ("rps-consent"). Google Analytics is
 * only loaded after "Akzeptieren" – until then no request goes to Google.
 */
import { site } from "@/config/site";

export type Consent = "granted" | "denied";

const KEY = "rps-consent";
/** Fired by the "Cookie-Einstellungen" link in the footer to show the banner again. */
export const OPEN_EVENT = "rps:open-consent";

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Record<string, unknown>;

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function storeConsent(v: Consent) {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* storage blocked: the banner simply shows again on the next visit */
  }
}

export function loadAnalytics() {
  const id = site.analytics.gaId;
  if (!id) return;
  const w = window as unknown as GtagWindow;
  w["ga-disable-" + id] = false;
  if (document.getElementById("ga-script")) return;
  w.dataLayer = w.dataLayer || [];
  // gtag must push the `arguments` object itself, as in Google's snippet.
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", id);
  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);
}

/** Stops Google Analytics for the rest of the visit and deletes its cookies (_ga, _ga_…). */
export function disableAnalytics() {
  const id = site.analytics.gaId;
  if (!id) return;
  (window as unknown as GtagWindow)["ga-disable-" + id] = true;
  const host = window.location.hostname;
  const domains = ["", host, "." + host, "." + host.replace(/^www\./, "")];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!/^_ga(_|$)/.test(name)) return;
    domains.forEach((d) => {
      document.cookie = name + "=; Max-Age=0; path=/" + (d ? "; domain=" + d : "");
    });
  });
}
