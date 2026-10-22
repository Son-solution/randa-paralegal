# Randa Paralegal Services – Website (Next.js)

Website für **Randa Paralegal Services, Zürich**: Startseite, Über mich, drei Leistungsseiten und das mehrstufige Formular «Anfrage & Termin».

> **Status: Prototyp / Demo-Modus.** Das Formular überträgt, speichert und bucht nichts. Es gibt kein Backend, keine Datenbank, keinen E-Mail-Versand, keine Google-Calendar-Anbindung und keinen Datei-Upload. Alle Eingaben bleiben nur im Arbeitsspeicher des Browserfensters und gehen beim Neuladen verloren.

---

## Technik

| Bereich | Version |
| --- | --- |
| Next.js (App Router) | 15.5 |
| React | 19 |
| TypeScript | 5.9 (strict) |
| Tailwind CSS | 3.4 (Preflight deaktiviert, siehe unten) |
| Schriften | Cormorant Garamond und Montserrat, lokal eingebunden über `@fontsource` (keine Anfragen an Google) |

Voraussetzung: **Node.js 18.18 oder neuer** (empfohlen: Node.js 20 oder 22 LTS) und npm.

## Installation und lokale Entwicklung

```bash
npm install          # Abhängigkeiten installieren
npm run dev          # Entwicklungsserver auf http://localhost:3000
```

Weitere Befehle:

```bash
npm run build        # Produktions-Build erstellen
npm run start        # Produktions-Build lokal starten (nach build)
npm run lint         # ESLint
npm run typecheck    # TypeScript-Prüfung ohne Ausgabe
```

Optional: `.env.example` nach `.env.local` kopieren und `NEXT_PUBLIC_SITE_URL` setzen (wird für Canonical-URLs, Sitemap, robots.txt und Open-Graph-Bilder verwendet).

## Projektstruktur

```
public/
  images/            Fotos (Symbolbilder) und Open-Graph-Bild
  logo/              Offizielles Logo (hell) und Footer-Variante (hoher Kontrast), je WebP + PNG
src/
  app/
    layout.tsx       Grundgerüst, Schriften, Metadaten (de-CH)
    globals.css      Gesamtes Styling (1:1 aus dem freigegebenen Prototyp übernommen)
    page.tsx                         /  Startseite
    ueber-mich/page.tsx              /ueber-mich
    administrative-unterstuetzung/   /administrative-unterstuetzung
    jugendcoaching/                  /jugendcoaching
    dolmetschen/                     /dolmetschen
    anfrage/                         /anfrage  (Formular «Anfrage & Termin»)
    kontakt/                         /kontakt  (Kontaktangaben, Standort – Platzhalter «[folgt]»)
    rechtliche-hinweise/             /rechtliche-hinweise  (Auszug AGB aus dem Briefing)
    not-found.tsx    404-Seite
    sitemap.ts, robots.ts
    icon.png, apple-icon.png, favicon.ico   (vorläufiges Favicon, siehe offene Punkte)
  components/
    layout/          Header (inkl. Mobile-Menü), Footer, Prototyp-Hinweis, WhatsApp-Button, SiteShell
    intake/          IntakeForm.tsx – das Formular inkl. Kalender, Dokumente, Überprüfung, Demo-Absenden
    seo/             JSON-LD (strukturierte Daten, nur bestätigte Angaben)
    ui/              Kontaktangabe «[folgt]», WhatsApp-Aufruf
  config/
    site.ts          ⇦ Geschäftsangaben (Kontakt, rechtliche Seiten, Demo-Modus)
    booking.ts       ⇦ Termin- und Upload-Einstellungen (Arbeitszeiten = Annahmen!)
    navigation.ts    Routen und Leistungen
  lib/intake/        Formular-Logik: Validierung, Datumsfunktionen, Demo-Kalender, Dateiprüfung, Zustand
```

## Inhalte und Angaben bearbeiten

Alle veränderbaren Geschäftsangaben liegen in **`src/config/`**:

- **`site.ts`**
  - `contact.phone`, `contact.email`, `contact.whatsapp` – solange `null`, zeigt die Website «[folgt]» bzw. führt der WhatsApp-Button zum Formular. WhatsApp-Nummer im internationalen Format, z. B. `"+41791234567"`.
  - `legal.impressum`, `legal.datenschutz`, `legal.agb` – Pfad der jeweiligen Seite, sobald sie (rechtlich geprüft) existiert, z. B. `"/impressum"`. Solange `null`, erscheint der Eintrag im Footer nur als Text.
  - `showPrototypeBar` – blendet den Prototyp-Hinweis oben auf jeder Seite ein/aus.
  - `allowIndexing` – solange `false`, tragen alle Seiten «noindex» und robots.txt nennt keine Sitemap. Erst zum öffentlichen Livegang auf `true` setzen.
  - `demoMode` – steuert Demo-Hinweise. Hinweis: Auch bei `false` sendet das Formular nichts; dafür ist die (noch nicht freigegebene) Backend-Phase nötig.
- **`booking.ts`** – angenommene Arbeitszeiten, Dauer des Erstgesprächs (45 Min.), Pause (15 Min.), Buchungshorizont, Upload-Regeln (PDF/JPG/PNG/HEIC, max. 10 MB, max. 10 Dateien).

Texte der Seiten stehen direkt in den jeweiligen `page.tsx`-Dateien.

## Demo-Modus des Formulars – was passiert und was nicht

- **Keine Netzwerkanfrage**: Absenden ist simuliert und zeigt eine Demo-Referenz (`DEMO-RPS-JJJJ-NNNN`). Es wird nicht behauptet, dass eine Anfrage eingegangen ist.
- **Dokumente**: Es werden nur Dateiname, Typ und Grösse angezeigt; der Inhalt wird nie gelesen oder hochgeladen.
- **Kalender**: Verfügbarkeiten sind simuliert (deterministisch aus Datum und Stunde berechnet). Nichts wird reserviert.
- **Entwurf speichern**: nur im Arbeitsspeicher; `localStorage`/`sessionStorage` werden bewusst nicht verwendet.
- Browser-Zurück/Vor wechselt zwischen den Schritten (`#schritt-1` … `#schritt-6`, `#bestaetigung`).

## Deployment auf Vercel

1. Projekt in ein GitHub-Repository hochladen (z. B. mit GitHub Desktop oder `git init`, `git add .`, `git commit`, `git push`). `node_modules` und `.next` werden durch `.gitignore` ausgeschlossen.
2. Auf [vercel.com](https://vercel.com) anmelden → **Add New… → Project** → das Repository importieren.
3. Vercel erkennt Next.js automatisch. Einstellungen unverändert lassen:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build` · Install Command: `npm install` · Output: automatisch
4. Unter **Environment Variables** `NEXT_PUBLIC_SITE_URL` setzen, z. B. `https://www.ihre-domain.ch` (ohne Schrägstrich am Ende). Fehlt die Variable, wird die Produktions-Domain von Vercel (`VERCEL_PROJECT_PRODUCTION_URL`) verwendet, lokal `http://localhost:3000`.
5. **Deploy** klicken. Jeder weitere Push auf den Hauptzweig wird automatisch veröffentlicht.
6. Eigene Domain: im Vercel-Projekt unter **Settings → Domains** hinzufügen und die angezeigten DNS-Einträge beim Domain-Anbieter eintragen. Danach `NEXT_PUBLIC_SITE_URL` anpassen und neu deployen.

Empfehlung: Solange Impressum und Datenschutzerklärung fehlen und das Formular im Demo-Modus ist, die Website nur als Vorschau (nicht öffentlich beworben) betreiben.

## Offene Punkte (vor dem Livegang zu klären)

- Telefonnummer, E-Mail-Adresse und WhatsApp-Nummer (`src/config/site.ts`).
- Impressum, Datenschutzerklärung, AGB – Inhalte müssen von Randa Kale bzw. einer Fachperson erstellt und geprüft werden; sie sind hier bewusst **nicht** enthalten.
- Arbeitszeiten für Termine (in `booking.ts` nur angenommen; sie werden nirgends als Öffnungszeiten veröffentlicht).
- Angebotene Sprachrichtungen/Dialekte (im Formular als vorläufig gekennzeichnet).
- Regelung für Jugendliche unter 18 Jahren (Einwilligung) – auf der Website als vorläufiger Hinweis gekennzeichnet.
- Favicon: vorläufig aus dem «R» des Logos zugeschnitten; durch eine freigegebene Version ersetzen (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`).
- Fotos: Symbolbilder. Vor der Veröffentlichung die Nutzungsrechte bestätigen bzw. durch eigene/lizenzierte Bilder ersetzen. Keine abgebildete Person stellt Randa Kale dar.
- Backend (Formularversand, Dokumentenablage, Kalender, E-Mails) – separate Phase, noch nicht freigegeben.
