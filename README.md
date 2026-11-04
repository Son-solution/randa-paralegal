# Randa Paralegal Services – Website (Next.js)

Website für **Randa Paralegal Services, Zürich**: Startseite, Über mich, drei Leistungsseiten und das mehrstufige Formular «Anfrage & Termin».

> **Status:** Das Formular sendet Anfragen per E-Mail (Resend) an Randa und schickt der anfragenden Person eine Eingangsbestätigung. Es gibt keine Datenbank, keine Google-Calendar-Anbindung und (vorerst) keinen Datei-Upload. Bis zum Absenden bleiben alle Eingaben nur im Arbeitsspeicher des Browserfensters.

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

`.env.example` nach `.env.local` kopieren und anpassen: `NEXT_PUBLIC_SITE_URL` (Canonical-URLs, Sitemap, robots.txt, Open-Graph-Bilder) und `RESEND_API_KEY` (ohne Schlüssel zeigt das Formular beim Absenden eine Fehlermeldung mit Telefon und E-Mail).

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
    api/anfrage/route.ts             POST /api/anfrage – prüft die Anfrage und versendet die E-Mails (Resend)
    kontakt/                         /kontakt  (Kontaktangaben, Standort, Anfahrt)
    rechtliche-hinweise/             /rechtliche-hinweise  (Auszug AGB aus dem Briefing)
    not-found.tsx    404-Seite
    sitemap.ts, robots.ts
    icon.png, apple-icon.png, favicon.ico   (vorläufiges Favicon, siehe offene Punkte)
  components/
    layout/          Header (inkl. Mobile-Menü), Footer, Prototyp-Hinweis, Anruf-Button, SiteShell
    intake/          IntakeForm.tsx – das Formular inkl. Kalender, Dokumente, Überprüfung, Absenden
    seo/             JSON-LD (strukturierte Daten, nur bestätigte Angaben)
    ui/              Kontaktangabe «[folgt]», Anruf-Aufruf
  config/
    site.ts          ⇦ Geschäftsangaben (Kontakt, rechtliche Seiten)
    booking.ts       ⇦ Termin- und Upload-Einstellungen (Arbeitszeiten = Annahmen!)
    navigation.ts    Routen und Leistungen
  lib/intake/        Formular-Logik: Validierung, Datumsfunktionen, Kalender, Dateiprüfung, Zustand, Zusammenfassung (summary.ts), Versanddaten (payload.ts), E-Mail-Texte (email.ts)
```

## Inhalte und Angaben bearbeiten

Alle veränderbaren Geschäftsangaben liegen in **`src/config/`**:

- **`site.ts`**
  - `contact.phone`, `contact.email` – solange `null`, zeigt die Website «[folgt]» bzw. führt der Anruf-Button zum Formular. Telefonnummer im internationalen Format, z. B. `"+41 79 123 45 67"`.
  - `legal.impressum`, `legal.datenschutz`, `legal.agb` – Pfad der jeweiligen Seite, sobald sie (rechtlich geprüft) existiert, z. B. `"/impressum"`. Solange `null`, erscheint der Eintrag im Footer nur als Text.
  - `showPrototypeBar` – blendet den Prototyp-Hinweis oben auf jeder Seite ein/aus.
  - `allowIndexing` – solange `false`, tragen alle Seiten «noindex» und robots.txt nennt keine Sitemap. Erst zum öffentlichen Livegang auf `true` setzen.
- **`booking.ts`** – angenommene Arbeitszeiten, Dauer des Erstgesprächs (45 Min.), Pause (15 Min.), Buchungshorizont, Upload-Regeln (PDF/JPG/PNG/HEIC, max. 10 MB, max. 10 Dateien). `uploads.enabled` ist `false`: Schritt 4 erklärt dann nur, dass Unterlagen später per E-Mail gesendet werden.

Texte der Seiten stehen direkt in den jeweiligen `page.tsx`-Dateien.

## Formular «Anfrage & Termin» – was passiert

- **Absenden**: `POST /api/anfrage` prüft alle Angaben erneut auf dem Server und sendet über Resend (1) die vollständige Anfrage an `contact.email` (Antworten gehen direkt an die anfragende Person) und (2) eine Eingangsbestätigung mit Referenz `RPS-JJJJ-NNNN`. Auf dem Server wird nichts gespeichert.
- **Spam-Schutz**: verstecktes Feld (Honeypot), Mindestdauer seit dem Öffnen des Formulars und ein einfaches Limit pro IP.
- **Fehler**: Schlägt der Versand fehl (z. B. fehlender `RESEND_API_KEY`), bleibt das Formular ausgefüllt und zeigt Telefon und E-Mail als Alternative.
- **Dokumente**: vorerst kein Upload (`uploads.enabled = false`). Für einen späteren Upload braucht es einen Dateispeicher (z. B. Vercel Blob), da Vercel pro Anfrage höchstens 4,5 MB annimmt; die Datenschutzerklärung ist dann anzupassen.
- **Kalender**: Terminwunsch innerhalb der (angenommenen) Arbeitszeiten, keine Google-Calendar-Anbindung. Randa bestätigt den Termin persönlich.
- **Entwurf speichern**: nur im Arbeitsspeicher; `localStorage`/`sessionStorage` werden bewusst nicht verwendet.
- Browser-Zurück/Vor wechselt zwischen den Schritten (`#schritt-1` … `#schritt-6`, `#bestaetigung`).

## Deployment auf Vercel

1. Projekt in ein GitHub-Repository hochladen (z. B. mit GitHub Desktop oder `git init`, `git add .`, `git commit`, `git push`). `node_modules` und `.next` werden durch `.gitignore` ausgeschlossen.
2. Auf [vercel.com](https://vercel.com) anmelden → **Add New… → Project** → das Repository importieren.
3. Vercel erkennt Next.js automatisch. Einstellungen unverändert lassen:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build` · Install Command: `npm install` · Output: automatisch
4. Unter **Environment Variables** `RESEND_API_KEY` und `NEXT_PUBLIC_SITE_URL` setzen, z. B. `https://www.ihre-domain.ch` (ohne Schrägstrich am Ende). Fehlt die Variable, wird die Produktions-Domain von Vercel (`VERCEL_PROJECT_PRODUCTION_URL`) verwendet, lokal `http://localhost:3000`.
5. **Deploy** klicken. Jeder weitere Push auf den Hauptzweig wird automatisch veröffentlicht.
6. Eigene Domain: im Vercel-Projekt unter **Settings → Domains** hinzufügen und die angezeigten DNS-Einträge beim Domain-Anbieter eintragen. Danach `NEXT_PUBLIC_SITE_URL` anpassen und neu deployen.

### E-Mail-Versand einrichten (Resend)

1. Konto auf [resend.com](https://resend.com) erstellen → **Domains → Add Domain** → `randa-paralegalservices.ch` (Region: **eu-west-1 / Irland** empfohlen).
2. Die angezeigten DNS-Einträge (MX/SPF/DKIM für die Subdomain `send`) beim Domain-Anbieter eintragen und auf «Verified» warten. Bestehende E-Mail-Einträge der Domain bleiben unverändert.
3. **API Keys → Create API Key** (Berechtigung «Sending access») und den Schlüssel in Vercel als `RESEND_API_KEY` speichern, dann neu deployen.
4. Testanfrage über `/anfrage` senden und prüfen, ob sie im Postfach `info@…` ankommt (auch im Spam-Ordner nachsehen).

Empfehlung: Die Rechtstexte vor dem öffentlichen Bewerben der Website prüfen lassen.

## Offene Punkte (vor dem Livegang zu klären)

- Anfahrtsbeschreibung für die Kontaktseite (`src/app/kontakt/page.tsx`). Telefon, E-Mail und Postadresse sind eingetragen.
- Impressum, Datenschutzerklärung, Cookie-Richtlinie und AGB-Auszug liegen als Entwurf vor (`/impressum`, `/datenschutz`, `/cookie-richtlinie`, `/rechtliche-hinweise`) und sollten von einer Fachperson geprüft werden.
- Arbeitszeiten für Termine (in `booking.ts` nur angenommen; sie werden nirgends als Öffnungszeiten veröffentlicht).
- Angebotene Sprachrichtungen/Dialekte (im Formular als vorläufig gekennzeichnet).
- Regelung für Jugendliche unter 18 Jahren (Einwilligung) – auf der Website als vorläufiger Hinweis gekennzeichnet.
- Favicon: vorläufig aus dem «R» des Logos zugeschnitten; durch eine freigegebene Version ersetzen (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`).
- Fotos: Symbolbilder. Vor der Veröffentlichung die Nutzungsrechte bestätigen bzw. durch eigene/lizenzierte Bilder ersetzen. Keine abgebildete Person stellt Randa Kale dar.
- Dokumenten-Upload und Kalender-Anbindung – spätere Phase.
