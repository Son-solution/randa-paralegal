/**
 * Local landing pages (/standorte/<slug>): one page per city, built from the home page
 * with city-specific wording. Zürich itself is the home page.
 *
 * Every city has its own hand-written intro, local paragraph, FAQ entry and meta description,
 * so no two pages share the same text (important for search engines).
 *
 * To add a city, add an entry – the page, footer list and sitemap follow automatically.
 */

export type City = {
  slug: string;
  name: string;
  /** Canton abbreviation, e.g. "ZH". */
  canton: string;
  /** Short location phrase, e.g. "im Zürcher Oberland". */
  area: string;
  /** Hero intro, replaces the home page intro. */
  intro: string;
  /** Paragraph for the "Vor Ort in …" section. */
  local: string;
  /** City-specific question shown first in the FAQ. */
  faq: { q: string; a: string };
  /** Meta description for search results (about 140–160 characters). */
  description: string;
};

export const cityBase = "/standorte";

export const cities: City[] = [
  {
    slug: "glattbrugg",
    name: "Glattbrugg",
    area: "im Glattal",
    intro:
      "Mein Geschäftssitz liegt in Glattbrugg. Für Menschen in Glattbrugg und Umgebung biete ich Unterstützung bei Behördenangelegenheiten, Coaching für Jugendliche und Sprachmittlung auf Arabisch und Aramäisch – ganz in Ihrer Nähe.",
    local:
      "Glattbrugg gehört zur Stadt Opfikon und liegt zwischen Zürich-Nord und dem Flughafen. Hier bin ich zu Hause in meiner Arbeit: Ich helfe bei Briefen und Formularen, begleite Jugendliche in die Berufswelt und dolmetsche bei wichtigen Gesprächen.",
    faq: {
      q: "Kann ich Sie in Glattbrugg persönlich treffen?",
      a: "Ja. Persönliche Termine in Glattbrugg vereinbaren wir nach Ihrer Anfrage. Wenn es für Sie einfacher ist, treffen wir uns online über Google Meet.",
    },
    description:
      "Geschäftssitz in Glattbrugg: Hilfe bei Behördenschreiben und Formularen, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch – persönlich ganz in Ihrer Nähe.",
    canton: "ZH",
  },
  {
    slug: "opfikon",
    name: "Opfikon",
    area: "im Glattal",
    intro:
      "Opfikon ist mein Arbeitsort: Von meinem Geschäftssitz in Glattbrugg aus unterstütze ich Menschen in der ganzen Stadt bei Behördenschreiben, begleite Jugendliche bei der Berufswahl und dolmetsche auf Arabisch und Aramäisch.",
    local:
      "Zur Stadt Opfikon gehören Glattbrugg, das alte Dorf Opfikon und das neue Quartier Glattpark. Viele Familien sind erst vor kurzem hierhergezogen und haben mit Gemeinde, Steueramt oder Schule zu tun. Weil mein Büro in Glattbrugg liegt, sind die Wege für Sie besonders kurz.",
    faq: {
      q: "Ich wohne im Glattpark. Ist ein Termin in Ihrer Nähe möglich?",
      a: "Ja. Vom Glattpark nach Glattbrugg sind es nur wenige Minuten. Den Treffpunkt vereinbaren wir nach Ihrer Anfrage – oder wir sprechen online über Google Meet.",
    },
    description:
      "Behördenschreiben verstehen, Lehrstelle finden, Dolmetschen auf Arabisch und Aramäisch: Unterstützung in Opfikon, Glattbrugg und Glattpark – ganz in Ihrer Nähe.",
    canton: "ZH",
  },
  {
    slug: "kloten",
    name: "Kloten",
    area: "in der Flughafenregion",
    intro:
      "In Kloten und der Flughafenregion unterstütze ich Privatpersonen, Familien und Jugendliche mit Migrationshintergrund – bei Behördenschreiben, bei der Berufswahl und als Dolmetscherin für Arabisch und Aramäisch.",
    local:
      "Kloten liegt am Flughafen Zürich und ist für viele Menschen der erste Wohnort in der Schweiz. Gerade am Anfang sind Schreiben, Formulare und Termine oft schwer zu verstehen. Ich helfe Ihnen, Schritt für Schritt den Überblick zu gewinnen.",
    faq: {
      q: "Ich bin neu in Kloten. Können Sie mir bei Behördenschreiben helfen?",
      a: "Ja. Ich erkläre Ihnen Briefe von Ämtern verständlich, helfe beim Ausfüllen von Formularen und beim Ordnen Ihrer Unterlagen. Eine Rechtsberatung biete ich nicht an.",
    },
    description:
      "Neu in Kloten? Briefe von Ämtern verstehen, Formulare ausfüllen, Berufswahl für Jugendliche und Dolmetschen auf Arabisch und Aramäisch in der Flughafenregion.",
    canton: "ZH",
  },
  {
    slug: "wallisellen",
    name: "Wallisellen",
    area: "im Glattal",
    intro:
      "In Wallisellen unterstütze ich Privatpersonen, Familien und Jugendliche bei administrativen Orientierungsfragen, bei der beruflichen Zukunftsplanung und beim Dolmetschen auf Arabisch und Aramäisch.",
    local:
      "Wallisellen grenzt direkt an die Stadt Zürich. Für Menschen aus Wallisellen bin ich eine Ansprechperson für Verwaltung, Ausbildung und Sprache – damit Sie Ihr Anliegen nur einmal erklären müssen.",
    faq: {
      q: "Kann ich mehrere Anliegen aus Wallisellen in einer Anfrage stellen?",
      a: "Ja. Sie wählen im Formular alle Bereiche aus, die Sie betreffen. Für eine kombinierte Anfrage genügt ein gemeinsames Erstgespräch von 45 Minuten.",
    },
    description:
      "Wallisellen: Unterstützung aus einer Hand bei Verwaltung, Ausbildung und Sprache – mehrere Anliegen in einem Erstgespräch, Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "zuerich-oerlikon",
    name: "Zürich-Oerlikon",
    area: "im Norden der Stadt Zürich",
    intro:
      "Sie leben in Oerlikon und ein Brief vom Amt, eine Bewerbung oder ein wichtiges Gespräch bereitet Ihnen Sorgen? Ich helfe Ihnen dabei – verständlich erklärt und auf Wunsch auf Arabisch oder Aramäisch.",
    local:
      "Oerlikon gehört zum Stadtkreis 11 und ist mit seinem grossen Bahnhof einer der lebendigsten Orte im Norden von Zürich. Hier wohnen viele junge Familien und Menschen aus aller Welt. Mein Geschäftssitz in Glattbrugg ist nur wenige Minuten entfernt, deshalb sind persönliche Treffen unkompliziert.",
    faq: {
      q: "Helfen Sie auch bei Schreiben der Stadt Zürich?",
      a: "Ja. Ich erkläre Ihnen Briefe von städtischen Ämtern, Schulen oder Sozialdiensten in einfachen Worten und helfe beim Ausfüllen der Formulare. Eine Rechtsberatung biete ich nicht an.",
    },
    description:
      "Hilfe in Zürich-Oerlikon: Briefe von Ämtern verstehen, Formulare ausfüllen, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch. Persönlich oder online.",
    canton: "ZH",
  },
  {
    slug: "zuerich-seebach",
    name: "Zürich-Seebach",
    area: "im Norden der Stadt Zürich",
    intro:
      "In Seebach begleite ich Familien und Jugendliche, wenn Formulare, Schulfragen oder Gespräche mit Ämtern zur Herausforderung werden – mit Geduld, Struktur und auf Wunsch in Ihrer Muttersprache Arabisch oder Aramäisch.",
    local:
      "Seebach ist ein Quartier im Kreis 11 und grenzt direkt an Opfikon-Glattbrugg, wo mein Büro liegt. Im Quartier leben viele Familien mit Kindern im Schulalter. Gerade beim Übertritt in die Oberstufe oder bei der Lehrstellensuche lohnt sich eine Begleitung, die Eltern und Jugendliche gleichermassen versteht.",
    faq: {
      q: "Mein Kind sucht eine Lehrstelle. Können Sie uns in Seebach unterstützen?",
      a: "Ja. Im Jugendcoaching arbeiten wir an Berufswahl, Lebenslauf und Bewerbungen. Eltern beziehe ich auf Wunsch mit ein und erkläre ihnen die einzelnen Schritte auf Arabisch oder Aramäisch.",
    },
    description:
      "Unterstützung für Familien in Zürich-Seebach: Behördenbriefe, Lehrstellensuche für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – gleich neben Glattbrugg.",
    canton: "ZH",
  },
  {
    slug: "duebendorf",
    name: "Dübendorf",
    area: "im Glattal",
    intro:
      "In Dübendorf helfe ich Ihnen, Behördenschreiben zu verstehen, Formulare korrekt auszufüllen und wichtige Gespräche ohne Sprachbarriere zu führen. Jugendliche begleite ich auf dem Weg in Lehre und Beruf.",
    local:
      "Dübendorf liegt im Glattal zwischen Zürich und Uster. Für Familien und Jugendliche aus Dübendorf bin ich eine Ansprechperson für Verwaltung, Ausbildung und Sprache – persönlich vor Ort oder online.",
    faq: {
      q: "Bieten Sie Ihre Unterstützung auch in Dübendorf an?",
      a: "Ja. Ich unterstütze Menschen in Dübendorf persönlich oder online. Mehrere Anliegen, zum Beispiel ein Behördenbrief und eine Lehrstellenfrage, können wir in einem gemeinsamen Gespräch klären.",
    },
    description:
      "Dübendorf im Glattal: Behördenschreiben verstehen, Formulare korrekt ausfüllen, Jugendliche auf dem Weg in die Lehre begleiten, Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "winterthur",
    name: "Winterthur",
    area: "in der zweitgrössten Stadt des Kantons Zürich",
    intro:
      "In Winterthur unterstütze ich Privatpersonen, Familien und Jugendliche mit Migrationshintergrund bei Behördenschreiben, bei der Suche nach einer Lehrstelle und überall dort, wo Sprache zur Hürde wird – auf Deutsch, Arabisch oder Aramäisch.",
    local:
      "Winterthur ist eine Stadt mit vielen Schulen, Lehrbetrieben und Ämtern. Ob ein Brief der Stadtverwaltung, ein Elterngespräch im Schulhaus oder die Bewerbung für eine Lehrstelle: Ich helfe Ihnen, den Überblick zu behalten, und begleite Sie auf Wunsch persönlich vor Ort.",
    faq: {
      q: "Begleiten Sie mich auch zu Terminen in Winterthur?",
      a: "Ja. Persönliche Termine und Begleitungen, etwa zu Ämtern, Schulen oder Sozialdiensten in Winterthur, vereinbaren wir individuell. Viele Anliegen lassen sich auch online über Google Meet klären.",
    },
    description:
      "Winterthur: Hilfe bei Briefen der Stadtverwaltung, Lehrstellensuche und Elterngesprächen, Begleitung zu Ämtern und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "buelach",
    name: "Bülach",
    area: "im Zürcher Unterland",
    intro:
      "Im Zürcher Unterland, in Bülach und Umgebung, biete ich administrative Unterstützung, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch – verständlich, nahbar und strukturiert.",
    local:
      "Bülach ist der Hauptort des gleichnamigen Bezirks im Zürcher Unterland. Ob Schreiben von Behörden, Gespräche in der Schule oder die Suche nach einer Lehrstelle: Ich begleite Familien und Jugendliche aus Bülach persönlich oder online.",
    faq: {
      q: "Unterstützen Sie Jugendliche aus Bülach bei der Lehrstellensuche?",
      a: "Ja. Im Jugendcoaching arbeiten wir an Stärken, Berufswahl, Lebenslauf, Motivationsschreiben und Vorstellungsgesprächen – auf Deutsch, Arabisch oder Aramäisch.",
    },
    description:
      "Bülach im Zürcher Unterland: administrative Unterstützung, Lehrstellensuche mit Lebenslauf und Bewerbung, Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "regensdorf",
    name: "Regensdorf",
    area: "im Furttal",
    intro:
      "Für Einwohnerinnen und Einwohner von Regensdorf biete ich praktische Hilfe bei Behördenpost, Coaching für Jugendliche vor der Berufswahl und Sprachmittlung auf Arabisch und Aramäisch.",
    local:
      "Regensdorf ist die grösste Gemeinde im Furttal und gehört zum Bezirk Dielsdorf. Zur Gemeinde zählen auch Adlikon und Watt. Ob Post von der Gemeindeverwaltung, Unterlagen für die Krankenkasse oder ein Gespräch in der Schule: Ich helfe Ihnen, den Überblick zu behalten.",
    faq: {
      q: "Helfen Sie auch beim Ordnen von Unterlagen?",
      a: "Ja. Gemeinsam sortieren wir Ihre Briefe und Dokumente, damit Sie wissen, was erledigt ist und was noch ansteht. Für Menschen aus Regensdorf ist das persönlich oder online möglich.",
    },
    description:
      "Administrative Unterstützung in Regensdorf, Adlikon und Watt: Behördenpost verstehen, Unterlagen ordnen, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "dietikon",
    name: "Dietikon",
    area: "im Limmattal",
    intro:
      "Für Privatpersonen und Familien in Dietikon biete ich Unterstützung bei Behördenangelegenheiten, Coaching für Jugendliche auf dem Weg in den Beruf und Sprachmittlung auf Arabisch und Aramäisch.",
    local:
      "Dietikon im Limmattal ist für viele Familien ein Zuhause, in dem mehrere Sprachen gesprochen werden. Ich helfe dabei, Schreiben von Ämtern und Schulen zu verstehen, Unterlagen zu ordnen und Gespräche verständlich zu machen.",
    faq: {
      q: "Dolmetschen Sie auch bei Gesprächen in Dietikon?",
      a: "Ja. Ich dolmetsche auf Arabisch und Aramäisch, zum Beispiel bei Elterngesprächen, bei Sozialdiensten oder anderen Terminen in Dietikon. Dabei übernehme ich ausschliesslich die Sprachmittlung.",
    },
    description:
      "Dietikon im Limmattal: Schreiben von Ämtern und Schulen verstehen, Unterlagen ordnen, Jugendcoaching und Dolmetschen bei Gesprächen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "schlieren",
    name: "Schlieren",
    area: "im Limmattal",
    intro:
      "Für Menschen in Schlieren biete ich Unterstützung bei Briefen, Formularen und Anträgen, Coaching für Jugendliche auf dem Weg in Lehre und Beruf sowie Dolmetschen auf Arabisch und Aramäisch.",
    local:
      "Schlieren liegt im Limmattal direkt westlich von Zürich. Ich begleite Familien aus Schlieren bei Behördenangelegenheiten und Schulgesprächen und unterstütze Jugendliche dabei, ihren beruflichen Weg zu finden.",
    faq: {
      q: "Helfen Sie Familien aus Schlieren bei Gesprächen mit der Schule?",
      a: "Ja. Ich dolmetsche bei Elterngesprächen und Terminen zur Ausbildung auf Arabisch und Aramäisch, damit alle Beteiligten sich gut verstehen.",
    },
    description:
      "Schlieren: Hilfe bei Briefen, Formularen und Anträgen, Dolmetschen bei Elterngesprächen auf Arabisch und Aramäisch und Coaching für Jugendliche.",
    canton: "ZH",
  },
  {
    slug: "uster",
    name: "Uster",
    area: "am Greifensee",
    intro:
      "Für Menschen in Uster biete ich administrative Unterstützung, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch – verständlich, nahbar und strukturiert, damit Sie Ihre Anliegen sicher erledigen.",
    local:
      "Uster liegt am Greifensee und ist eine der grössten Städte im Kanton Zürich. Hier begleite ich Familien bei Formularen und Briefen, unterstütze Jugendliche bei der Berufswahl und dolmetsche bei Gesprächen, in denen es auf jedes Wort ankommt.",
    faq: {
      q: "Kommen Sie für einen Termin nach Uster?",
      a: "Ja, persönliche Termine in Uster sind möglich. Den genauen Treffpunkt vereinbaren wir nach Ihrer Anfrage. Alternativ treffen wir uns online über Google Meet.",
    },
    description:
      "Uster am Greifensee: Unterstützung bei Formularen und Briefen, Berufswahl-Coaching für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – auch vor Ort.",
    canton: "ZH",
  },
  {
    slug: "volketswil",
    name: "Volketswil",
    area: "im Bezirk Uster",
    intro:
      "In Volketswil helfe ich Familien, Behördenschreiben richtig einzuordnen, und begleite Jugendliche auf dem Weg zur passenden Lehrstelle. Bei wichtigen Gesprächen dolmetsche ich auf Arabisch und Aramäisch.",
    local:
      "Volketswil liegt zwischen Dübendorf und Uster und besteht aus mehreren Ortsteilen wie Hegnau, Zimikon, Gutenswil und Kindhausen. Die Gemeinde ist in den letzten Jahrzehnten stark gewachsen, und viele Familien sind neu zugezogen. Ich unterstütze Sie dabei, sich in Verwaltung und Schule zurechtzufinden.",
    faq: {
      q: "Wir sind neu nach Volketswil gezogen. Wobei können Sie helfen?",
      a: "Zum Beispiel bei Anmeldungen, Briefen der Gemeinde, Krankenkassen- oder Schulunterlagen. Ich erkläre Ihnen, was die Schreiben bedeuten, und helfe beim Ausfüllen. Eine Rechtsberatung biete ich nicht an.",
    },
    description:
      "Neu in Volketswil? Hilfe bei Behördenbriefen, Anmeldungen und Schulunterlagen, Jugendcoaching für die Lehrstellensuche und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "illnau-effretikon",
    name: "Illnau-Effretikon",
    area: "zwischen Zürich und Winterthur",
    intro:
      "Ob in Effretikon, Illnau oder Ottikon: Ich begleite Privatpersonen und Familien bei administrativen Fragen, unterstütze Jugendliche bei der Wahl ihrer Lehre und übersetze wichtige Gespräche ins Arabische und Aramäische.",
    local:
      "Illnau-Effretikon liegt im Bezirk Pfäffikon, mit der S-Bahn nur wenige Minuten von Zürich und Winterthur entfernt. Die Stadt verbindet das städtische Effretikon mit ländlichen Ortsteilen. Termine finden je nach Anliegen online oder persönlich statt – so sparen Sie sich unnötige Wege.",
    faq: {
      q: "Lohnt sich ein Online-Termin aus Illnau-Effretikon?",
      a: "Ja, viele Anliegen lassen sich gut über Google Meet klären, zum Beispiel das Erklären eines Briefes oder die Vorbereitung einer Bewerbung. Für Begleitungen vor Ort treffen wir uns persönlich.",
    },
    description:
      "Unterstützung in Illnau-Effretikon: Behördenschreiben, Formulare, Bewerbungscoaching für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – online oder vor Ort.",
    canton: "ZH",
  },
  {
    slug: "adliswil",
    name: "Adliswil",
    area: "im Sihltal",
    intro:
      "Für Menschen in Adliswil bin ich da, wenn ein Schreiben unverständlich ist, ein Formular drängt oder ein Gespräch ohne Sprachhilfe kaum möglich wäre. Jugendliche begleite ich bei ihren ersten Schritten in die Berufswelt.",
    local:
      "Adliswil liegt im Sihltal südlich von Zürich und gehört zum Bezirk Horgen. Mit der S-Bahn ist man schnell in der Stadt, und doch hat Adliswil seinen eigenen Charakter. Ich helfe Familien aus Adliswil bei Post von Behörden, Krankenkasse oder Schule und bereite wichtige Termine gemeinsam mit Ihnen vor.",
    faq: {
      q: "Können Sie mich auf einen Termin beim Amt vorbereiten?",
      a: "Ja. Wir gehen zusammen durch, welche Unterlagen Sie brauchen und welche Fragen auf Sie zukommen. Auf Wunsch begleite ich Sie in Adliswil und dolmetsche auf Arabisch oder Aramäisch.",
    },
    description:
      "Hilfe in Adliswil im Sihltal: Briefe und Formulare verstehen, Termine beim Amt vorbereiten, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "thalwil",
    name: "Thalwil",
    area: "am linken Zürichseeufer",
    intro:
      "In Thalwil biete ich Unterstützung für alle, die sich im Schweizer Verwaltungsalltag sicherer fühlen möchten: bei Briefen und Anträgen, bei der Berufswahl von Jugendlichen und beim Dolmetschen auf Arabisch und Aramäisch.",
    local:
      "Thalwil liegt am linken Ufer des Zürichsees im Bezirk Horgen und ist ein wichtiger Bahnknoten zwischen Zürich und der Innerschweiz. Für Familien aus Thalwil und den Nachbargemeinden wie Rüschlikon oder Oberrieden bin ich eine Ansprechperson für Verwaltung, Ausbildung und Sprache.",
    faq: {
      q: "Dolmetschen Sie in Thalwil auch bei Gesprächen in der Schule?",
      a: "Ja, nach Absprache dolmetsche ich bei Gesprächen in der Schule, bei Sozialdiensten oder anderen Terminen auf Arabisch und Aramäisch. Dabei übernehme ich ausschliesslich die Sprachmittlung.",
    },
    description:
      "Administrative Unterstützung, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch in Thalwil am Zürichsee – auch für Rüschlikon und Oberrieden.",
    canton: "ZH",
  },
  {
    slug: "horgen",
    name: "Horgen",
    area: "am linken Zürichseeufer",
    intro:
      "Am linken Zürichseeufer, in Horgen und Umgebung, begleite ich Privatpersonen, Familien und Jugendliche bei administrativen Fragen, bei der Berufsorientierung und als Dolmetscherin für Arabisch und Aramäisch.",
    local:
      "Horgen ist der Hauptort des gleichnamigen Bezirks am Zürichsee. Ich unterstütze Menschen aus Horgen dabei, Schreiben zu verstehen, Unterlagen zu ordnen und wichtige Termine gut vorbereitet wahrzunehmen.",
    faq: {
      q: "Bieten Sie in Horgen auch Online-Termine an?",
      a: "Ja. Neben persönlichen Terminen nach Absprache sind Gespräche online über Google Meet möglich. Den Link erhalten Sie mit der Terminbestätigung.",
    },
    description:
      "Horgen am Zürichsee: Schreiben verstehen, Unterlagen ordnen, Termine vorbereiten, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch – vor Ort oder online.",
    canton: "ZH",
  },
  {
    slug: "waedenswil",
    name: "Wädenswil",
    area: "am linken Zürichseeufer",
    intro:
      "In Wädenswil unterstütze ich Menschen mit Migrationshintergrund bei Behördenschreiben, bei der beruflichen Zukunftsplanung und überall dort, wo Sprache zur Hürde wird – auf Deutsch, Arabisch oder Aramäisch.",
    local:
      "Wädenswil liegt am linken Ufer des Zürichsees. Für Familien und Jugendliche aus Wädenswil biete ich Unterstützung aus einer Hand: administrativ, im Coaching und beim Dolmetschen.",
    faq: {
      q: "Wie läuft ein Erstgespräch aus Wädenswil ab?",
      a: "Sie stellen Ihre Anfrage online und wählen auf Wunsch direkt einen Termin. Im Erstgespräch von 45 Minuten, persönlich oder über Google Meet, klären wir Ihre Situation und die nächsten Schritte.",
    },
    description:
      "Wädenswil: Unterstützung aus einer Hand bei Behördenschreiben, beruflicher Zukunftsplanung für Jugendliche und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "wetzikon",
    name: "Wetzikon",
    area: "im Zürcher Oberland",
    intro:
      "Im Zürcher Oberland, in Wetzikon und Umgebung, begleite ich Menschen bei administrativen Fragen, bei der beruflichen Orientierung und bei Gesprächen, in denen Sprache zur Hürde wird.",
    local:
      "Wetzikon liegt am Pfäffikersee im Zürcher Oberland. Für Familien und Jugendliche aus der Region biete ich Unterstützung aus einer Hand: Briefe und Formulare, Bewerbungen und Lehrstellensuche, Dolmetschen auf Arabisch und Aramäisch.",
    faq: {
      q: "Ist eine Zusammenarbeit auch aus dem Zürcher Oberland möglich?",
      a: "Ja. Termine in Wetzikon vereinbaren wir individuell, und vieles lässt sich auch online über Google Meet erledigen – bequem von zu Hause aus.",
    },
    description:
      "Wetzikon im Zürcher Oberland: Hilfe bei Briefen und Formularen, Bewerbungen und Lehrstellensuche, Dolmetschen auf Arabisch und Aramäisch – auch online.",
    canton: "ZH",
  },
  {
    slug: "baden",
    name: "Baden",
    area: "an der Limmat im Kanton Aargau",
    intro:
      "Auch im Kanton Aargau bin ich für Sie da: In Baden unterstütze ich Privatpersonen und Familien bei Behördenschreiben, helfe Jugendlichen, eine passende Lehrstelle zu finden, und dolmetsche, wo Deutsch noch schwerfällt.",
    local:
      "Baden ist bekannt für seine Altstadt und die Thermalquellen an der Limmat und ist Hauptort des gleichnamigen Bezirks. Weil Baden im Aargau liegt, unterscheiden sich manche Abläufe und Formulare von denen im Kanton Zürich. Ich helfe Ihnen, die Schreiben der Aargauer Behörden zu verstehen und richtig zu beantworten.",
    faq: {
      q: "Kennen Sie sich auch mit Schreiben aus dem Kanton Aargau aus?",
      a: "Ja. Ich erkläre Ihnen Briefe von Gemeinde und Kanton verständlich und helfe beim Ausfüllen der Formulare. Viele Anliegen aus Baden klären wir online über Google Meet, persönliche Termine sind nach Absprache möglich.",
    },
    description:
      "Unterstützung in Baden AG: Schreiben von Aargauer Behörden verstehen, Formulare ausfüllen, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "AG",
  },
  {
    slug: "wettingen",
    name: "Wettingen",
    area: "an der Limmat, direkt neben Baden",
    intro:
      "Für Familien in Wettingen biete ich eine Anlaufstelle für Briefe, Formulare und Anträge, ein Coaching für Jugendliche auf Lehrstellensuche und Sprachmittlung auf Arabisch und Aramäisch.",
    local:
      "Wettingen liegt an der Limmat gleich gegenüber von Baden und ist eine der grössten Gemeinden im Aargau – bekannt auch für sein ehemaliges Kloster. Hier leben viele Familien mit unterschiedlichen Muttersprachen. Ich sorge dafür, dass wichtige Informationen von Schule und Gemeinde bei allen ankommen.",
    faq: {
      q: "Wie viel kostet eine Unterstützung aus Wettingen?",
      a: "Die Preise werden nach Absprache festgelegt und hängen vom Anliegen ab. Nach Ihrer Anfrage klären wir im Erstgespräch von 45 Minuten Ihre Situation und besprechen, welche Unterstützung sinnvoll ist. Online-Termine sind ohne Anfahrt möglich.",
    },
    description:
      "Wettingen AG: Hilfe bei Briefen, Formularen und Anträgen, Coaching für Jugendliche auf Lehrstellensuche und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "AG",
  },
  {
    slug: "zug",
    name: "Zug",
    area: "am Zugersee",
    intro:
      "In Zug begleite ich Menschen mit Migrationshintergrund, die sich im Schweizer Behördenalltag noch unsicher fühlen – bei Schreiben und Formularen, bei der Ausbildung ihrer Kinder und als Dolmetscherin für Arabisch und Aramäisch.",
    local:
      "Zug ist der Hauptort des gleichnamigen Kantons und liegt am Nordufer des Zugersees. Die Stadt ist international geprägt, und viele Menschen kommen aus beruflichen Gründen hierher. Ich unterstütze Neuzugezogene und Familien dabei, die Abläufe im Kanton Zug zu verstehen.",
    faq: {
      q: "Sind Termine für Menschen aus Zug auch online möglich?",
      a: "Ja. Die meisten Anliegen aus dem Kanton Zug besprechen wir bequem über Google Meet. Persönliche Termine und Begleitungen in Zug vereinbaren wir nach Absprache.",
    },
    description:
      "Neu im Kanton Zug? Unterstützung bei Behördenschreiben und Formularen, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch – online oder persönlich.",
    canton: "ZG",
  },
  {
    slug: "schaffhausen",
    name: "Schaffhausen",
    area: "am Rhein",
    intro:
      "Für Menschen in Schaffhausen biete ich Hilfe bei Behördenpost, Unterstützung für Jugendliche auf dem Weg in Lehre und Beruf und Dolmetschen auf Arabisch und Aramäisch – verständlich und strukturiert.",
    local:
      "Schaffhausen liegt am Rhein, ganz im Norden der Schweiz, und ist Hauptort des gleichnamigen Kantons. Die Altstadt mit dem Munot prägt das Stadtbild. Weil der Weg nach Zürich etwas länger ist, finden viele Gespräche mit Menschen aus Schaffhausen online statt – Dokumente können Sie mir vorab sicher zusenden.",
    faq: {
      q: "Wie funktioniert die Unterstützung aus Schaffhausen am besten?",
      a: "Meist online: Sie senden mir Ihre Unterlagen, und wir besprechen alles über Google Meet. Für Begleitungen zu Terminen in Schaffhausen finden wir nach Absprache eine Lösung.",
    },
    description:
      "Schaffhausen: Hilfe bei Briefen von Ämtern, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch – bequem online oder nach Absprache vor Ort.",
    canton: "SH",
  },
  {
    slug: "rapperswil-jona",
    name: "Rapperswil-Jona",
    area: "am oberen Zürichsee im Kanton St. Gallen",
    intro:
      "Ob in Rapperswil oder Jona: Ich helfe Ihnen bei Briefen und Formularen, coache Jugendliche bei der Lehrstellensuche und dolmetsche bei wichtigen Gesprächen auf Arabisch und Aramäisch.",
    local:
      "Rapperswil-Jona liegt am oberen Zürichsee und gehört zum Kanton St. Gallen, obwohl es nahe an Zürich liegt. Das Schloss und der Holzsteg über den See sind bekannt. Für Sie bedeutet die Kantonsgrenze manchmal andere Ämter und Formulare – ich helfe Ihnen, den richtigen Weg zu finden.",
    faq: {
      q: "Gelten in Rapperswil-Jona andere Regeln als in Zürich?",
      a: "Manche Abläufe sind im Kanton St. Gallen anders organisiert. Ich helfe Ihnen, Ihre Schreiben zu verstehen und die richtigen Stellen zu kontaktieren. Eine Rechtsberatung biete ich nicht an.",
    },
    description:
      "Unterstützung in Rapperswil-Jona (SG): Behördenschreiben, Formulare, Lehrstellensuche für Jugendliche und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "SG",
  },
  {
    slug: "frauenfeld",
    name: "Frauenfeld",
    area: "im Kanton Thurgau",
    intro:
      "Auch in Frauenfeld unterstütze ich Familien und Jugendliche: bei der Post von Ämtern, bei Bewerbungen für eine Lehrstelle und beim Dolmetschen auf Arabisch und Aramäisch.",
    local:
      "Frauenfeld ist der Hauptort des Kantons Thurgau und liegt an der Murg. Viele Familien aus Frauenfeld pendeln nach Winterthur oder Zürich. Die meisten Gespräche führen wir online, damit Sie keine langen Wege haben – Begleitungen vor Ort sind nach Absprache möglich.",
    faq: {
      q: "Helfen Sie Jugendlichen aus Frauenfeld bei Bewerbungen?",
      a: "Ja. Wir erstellen gemeinsam Lebenslauf und Motivationsschreiben und üben Vorstellungsgespräche – online oder persönlich, auf Deutsch, Arabisch oder Aramäisch.",
    },
    description:
      "Frauenfeld TG: Hilfe bei Behördenpost, Bewerbungscoaching für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – meist online, nach Absprache vor Ort.",
    canton: "TG",
  },
  {
    slug: "meilen",
    name: "Meilen",
    area: "am rechten Zürichseeufer",
    intro:
      "In Meilen und an der Goldküste unterstütze ich Privatpersonen und Familien bei Behördenschreiben, coache Jugendliche für den Start ins Berufsleben und dolmetsche bei Gesprächen mit Schule und Ämtern.",
    local:
      "Meilen ist Hauptort des gleichnamigen Bezirks am rechten Zürichseeufer. Auch hier gibt es Familien, die sich im Verwaltungsalltag eine verlässliche Begleitung wünschen. Ich helfe dabei, Briefe zu verstehen, Fristen im Blick zu behalten und Gespräche mit Schule oder Gemeinde vorzubereiten.",
    faq: {
      q: "Helfen Sie auch dabei, Fristen nicht zu verpassen?",
      a: "Ja. Wir gehen Ihre Schreiben gemeinsam durch und halten fest, bis wann was erledigt sein muss. So behalten Sie aus Meilen den Überblick – persönlich oder online.",
    },
    description:
      "Meilen am Zürichsee: Briefe verstehen, Fristen im Blick behalten, Gespräche mit Schule und Gemeinde vorbereiten – plus Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "kuesnacht",
    name: "Küsnacht",
    area: "am rechten Zürichseeufer",
    intro:
      "Für Menschen in Küsnacht biete ich Unterstützung, wenn Sprache oder Bürokratie zur Hürde werden: bei Schreiben und Anträgen, im Coaching für Jugendliche und beim Dolmetschen auf Arabisch und Aramäisch.",
    local:
      "Küsnacht liegt am rechten Zürichseeufer im Bezirk Meilen, zwischen Zollikon und Erlenbach. Zur Gemeinde gehören auch Itschnach und Goldbach. Ich begleite Familien und Jugendliche aus Küsnacht diskret und zuverlässig – von der ersten Frage bis zum erledigten Anliegen.",
    faq: {
      q: "Behandeln Sie meine Unterlagen vertraulich?",
      a: "Ja. Alles, was Sie mir anvertrauen, bleibt vertraulich. Ihre Dokumente verwende ich nur für Ihr Anliegen. Termine aus Küsnacht sind persönlich nach Absprache oder online möglich.",
    },
    description:
      "Diskrete Unterstützung in Küsnacht: Hilfe bei Schreiben und Anträgen, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch – vertraulich und zuverlässig.",
    canton: "ZH",
  },
  {
    slug: "zollikon",
    name: "Zollikon",
    area: "am rechten Zürichseeufer, direkt an der Stadtgrenze von Zürich",
    intro:
      "In Zollikon und Zollikerberg begleite ich Familien und Jugendliche bei administrativen Fragen, bei der Berufswahl und überall dort, wo eine Dolmetscherin für Arabisch oder Aramäisch gebraucht wird.",
    local:
      "Zollikon grenzt direkt an die Stadt Zürich und reicht vom Seeufer bis hinauf nach Zollikerberg. Durch die Nähe zur Stadt sind persönliche Treffen einfach zu organisieren. Ich unterstütze Sie bei Post von Gemeinde und Kanton und bereite mit Jugendlichen den Einstieg ins Berufsleben vor.",
    faq: {
      q: "Können wir uns für einen Termin in Zollikon treffen?",
      a: "Ja. Persönliche Termine in Zollikon oder Zollikerberg vereinbaren wir nach Ihrer Anfrage. Wenn es für Sie einfacher ist, sprechen wir online über Google Meet.",
    },
    description:
      "Zollikon und Zollikerberg: administrative Unterstützung, Jugendcoaching für den Berufseinstieg und Dolmetschen auf Arabisch und Aramäisch, direkt an der Stadtgrenze Zürich.",
    canton: "ZH",
  },
  {
    slug: "zumikon",
    name: "Zumikon",
    area: "im Bezirk Meilen",
    intro:
      "Sie wohnen in Zumikon und möchten ein Schreiben verstehen, einen Antrag richtig ausfüllen oder Ihr Kind bei der Lehrstellensuche unterstützen? Ich helfe Ihnen – auf Deutsch, Arabisch oder Aramäisch.",
    local:
      "Zumikon liegt oberhalb des Zürichsees an der Forch und ist mit der Forchbahn direkt mit Zürich verbunden. Die Gemeinde ist eher klein und ruhig, Ämter und Beratungsstellen liegen oft ausserhalb. Viele Anliegen klären wir deshalb online, und bei Bedarf begleite ich Sie zu Terminen in der Region.",
    faq: {
      q: "Begleiten Sie mich von Zumikon aus auch zu Ämtern in Zürich?",
      a: "Ja, nach Absprache begleite ich Sie zu Terminen in Zürich oder in der Region und dolmetsche auf Arabisch oder Aramäisch. Dabei übernehme ich ausschliesslich die Sprachmittlung.",
    },
    description:
      "Zumikon an der Forch: Hilfe bei Schreiben und Anträgen, Lehrstellensuche für Jugendliche, Begleitung zu Ämtern und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "faellanden",
    name: "Fällanden",
    area: "am Greifensee",
    intro:
      "In Fällanden, Pfaffhausen und Benglen unterstütze ich Familien bei Behördenschreiben und Formularen, bereite Jugendliche auf Schnupperlehre und Bewerbung vor und übernehme die Sprachmittlung auf Arabisch und Aramäisch.",
    local:
      "Fällanden liegt am Nordufer des Greifensees im Bezirk Uster, zwischen Dübendorf und Schwerzenbach. Für Familien aus den drei Ortsteilen bin ich eine Ansprechperson, die Verwaltung, Schule und Sprache zusammenbringt – damit Sie Ihr Anliegen nur einmal erklären müssen.",
    faq: {
      q: "Kann ich aus Fällanden Unterlagen vorab schicken?",
      a: "Ja. Nach Ihrer Anfrage können Sie mir die betreffenden Schreiben zusenden. So bin ich im Erstgespräch – persönlich oder über Google Meet – bereits vorbereitet.",
    },
    description:
      "Fällanden, Pfaffhausen und Benglen: Hilfe bei Behördenschreiben und Formularen, Berufswahl-Coaching für Jugendliche und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "greifensee",
    name: "Greifensee",
    area: "am gleichnamigen See",
    intro:
      "Auch in der kleinen Gemeinde Greifensee biete ich persönliche Unterstützung: bei Briefen von Ämtern, bei Bewerbungen von Jugendlichen und bei Gesprächen, für die eine Dolmetscherin für Arabisch oder Aramäisch nötig ist.",
    local:
      "Greifensee liegt am gleichnamigen See im Bezirk Uster und ist bekannt für sein Schloss und das historische Städtchen. In einer kleinen Gemeinde kennt man sich – und doch ist es nicht immer leicht, mit offiziellen Schreiben allein zurechtzukommen. Ich nehme mir Zeit, Ihre Fragen in Ruhe zu klären.",
    faq: {
      q: "Mein Anliegen ist klein. Kann ich mich trotzdem melden?",
      a: "Ja, gerne. Auch ein einzelner Brief, den Sie nicht verstehen, ist ein guter Grund für eine Anfrage. Aus Greifensee können wir uns persönlich oder online treffen.",
    },
    description:
      "Greifensee: persönliche Hilfe bei Briefen von Ämtern, Bewerbungen für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – auch für kleine Anliegen.",
    canton: "ZH",
  },
  {
    slug: "maur",
    name: "Maur",
    area: "am Greifensee",
    intro:
      "Für Menschen in Maur, Ebmatingen, Binz und Uessikon biete ich Unterstützung im Umgang mit Behörden, Coaching für Jugendliche und Sprachmittlung auf Arabisch und Aramäisch.",
    local:
      "Maur liegt am Ostufer des Greifensees im Bezirk Uster und besteht aus mehreren Dörfern bis hinauf zur Forch. Die Wege zu Ämtern und Beratungsstellen sind oft weit. Deshalb kläre ich viele Anliegen online und begleite Sie nur dann vor Ort, wenn es wirklich nötig ist.",
    faq: {
      q: "Ich habe keinen Computer. Geht ein Online-Termin auch mit dem Handy?",
      a: "Ja. Google Meet funktioniert auch auf dem Smartphone. Den Link erhalten Sie mit der Terminbestätigung. Wenn Ihnen ein persönliches Treffen in Maur lieber ist, finden wir eine Lösung.",
    },
    description:
      "Maur, Ebmatingen, Binz und Uessikon: Unterstützung bei Behördenschreiben, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch – online, auch per Handy.",
    canton: "ZH",
  },
  {
    slug: "bassersdorf",
    name: "Bassersdorf",
    area: "im Bezirk Bülach, nahe dem Flughafen Zürich",
    intro:
      "In Bassersdorf helfe ich Ihnen, wenn Briefe, Formulare oder Termine Fragen aufwerfen. Jugendliche begleite ich bei der Lehrstellensuche, und bei wichtigen Gesprächen dolmetsche ich auf Arabisch und Aramäisch.",
    local:
      "Bassersdorf liegt zwischen Kloten und Winterthur, nur wenige Minuten vom Flughafen und von meinem Büro in Glattbrugg entfernt. Viele Menschen arbeiten in der Flughafenregion und haben wenig Zeit für Behördengänge. Gemeinsam erledigen wir Ihre Anliegen effizient – auch abends online.",
    faq: {
      q: "Ich arbeite Schicht am Flughafen. Sind flexible Termine möglich?",
      a: "Wir suchen gemeinsam einen Termin, der zu Ihrem Arbeitsplan passt. Viele Gespräche aus Bassersdorf finden online über Google Meet statt, das spart Ihnen den Weg.",
    },
    description:
      "Bassersdorf: Hilfe bei Briefen und Formularen, Lehrstellensuche für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – flexible Termine, auch online.",
    canton: "ZH",
  },
  {
    slug: "nuerensdorf",
    name: "Nürensdorf",
    area: "im Bezirk Bülach",
    intro:
      "Für Familien in Nürensdorf und den Ortsteilen Birchwil, Breite und Oberwil biete ich Hilfe bei administrativen Fragen, Coaching für Jugendliche und Dolmetschen auf Arabisch und Aramäisch.",
    local:
      "Nürensdorf ist eine ländliche Gemeinde im Bezirk Bülach, unweit von Bassersdorf und dem Flughafen Zürich. Wer hier wohnt, fährt für viele Termine nach Bülach, Kloten oder Zürich. Ich helfe Ihnen, solche Termine gut vorzubereiten, damit sich jeder Weg lohnt.",
    faq: {
      q: "Können Sie Elterngespräche in der Schule Nürensdorf übersetzen?",
      a: "Ja. Nach Absprache dolmetsche ich bei Elterngesprächen auf Arabisch oder Aramäisch, damit Eltern, Lehrpersonen und Kinder sich gut verstehen. Dabei übernehme ich ausschliesslich die Sprachmittlung.",
    },
    description:
      "Nürensdorf, Birchwil und Breite: Unterstützung bei administrativen Fragen, Jugendcoaching und Dolmetschen bei Elterngesprächen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "embrach",
    name: "Embrach",
    area: "im Zürcher Unterland",
    intro:
      "Im Embrachertal unterstütze ich Privatpersonen und Familien bei Schreiben von Behörden, begleite Jugendliche auf dem Weg in die Lehre und dolmetsche auf Arabisch und Aramäisch.",
    local:
      "Embrach liegt im Zürcher Unterland im Bezirk Bülach, eingebettet ins Embrachertal. Ob Unterlagen für die Steuererklärung sortieren, ein Brief der Gemeinde oder die Bewerbung für die erste Lehrstelle: Ich helfe Familien aus Embrach, die nächsten Schritte klar zu sehen.",
    faq: {
      q: "Füllen Sie meine Steuererklärung aus?",
      a: "Eine Steuerberatung biete ich nicht an. Ich helfe Ihnen aber, Ihre Unterlagen zu ordnen und Schreiben des Steueramts zu verstehen, damit Sie wissen, was zu tun ist.",
    },
    description:
      "Embrach im Zürcher Unterland: Hilfe bei Schreiben von Behörden und beim Ordnen von Unterlagen, Lehrstellen-Coaching und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "oberglatt",
    name: "Oberglatt",
    area: "im Zürcher Unterland",
    intro:
      "Sie leben in Oberglatt und brauchen jemanden, der Ihnen ein Schreiben erklärt, beim Formular hilft oder bei einem Gespräch übersetzt? Ich unterstütze Sie – auf Deutsch, Arabisch oder Aramäisch.",
    local:
      "Oberglatt liegt an der Glatt im Bezirk Dielsdorf, nur eine kurze Strecke vom Flughafen und von Glattbrugg entfernt. Die Gemeinde ist in den letzten Jahren gewachsen, und viele junge Familien sind dazugekommen. Ich begleite Eltern und Jugendliche bei Schule, Ausbildung und Verwaltung.",
    faq: {
      q: "Wie schnell erhalte ich aus Oberglatt einen Termin?",
      a: "Nach Ihrer Anfrage melde ich mich so bald wie möglich. Auf Wunsch können Sie direkt online einen Termin für das Erstgespräch wählen – persönlich oder über Google Meet.",
    },
    description:
      "Oberglatt: Schreiben erklären, Formulare ausfüllen, Jugendliche bei Ausbildung begleiten, Dolmetschen auf Arabisch und Aramäisch – nahe Glattbrugg.",
    canton: "ZH",
  },
  {
    slug: "ruemlang",
    name: "Rümlang",
    area: "im Glattal, nahe dem Flughafen Zürich",
    intro:
      "In Rümlang begleite ich Familien und Einzelpersonen bei administrativen Aufgaben, unterstütze Jugendliche bei der beruflichen Orientierung und übernehme die Sprachmittlung auf Arabisch und Aramäisch.",
    local:
      "Rümlang grenzt direkt an den Flughafen Zürich und liegt nur wenige Minuten von meinem Büro in Glattbrugg entfernt. Durch die Nähe sind persönliche Treffen schnell organisiert. Ich helfe Ihnen bei Briefen, Anträgen und der Vorbereitung auf wichtige Termine.",
    faq: {
      q: "Ist Ihr Büro von Rümlang aus gut erreichbar?",
      a: "Ja. Mein Geschäftssitz in Glattbrugg ist von Rümlang aus in kurzer Zeit erreichbar. Den genauen Treffpunkt vereinbaren wir nach Ihrer Anfrage – oder wir sprechen online.",
    },
    description:
      "Rümlang: administrative Unterstützung, Berufsorientierung für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – nur wenige Minuten von Glattbrugg.",
    canton: "ZH",
  },
  {
    slug: "dielsdorf",
    name: "Dielsdorf",
    area: "im Zürcher Unterland",
    intro:
      "Für Menschen in Dielsdorf und im ganzen Bezirk biete ich Hilfe bei Behördenangelegenheiten, Coaching für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – klar, freundlich und strukturiert.",
    local:
      "Dielsdorf liegt am Fuss der Lägern und ist Hauptort des gleichnamigen Bezirks. Hier befinden sich verschiedene Ämter, mit denen Familien aus der Region zu tun haben. Ich helfe Ihnen, deren Schreiben zu verstehen, und begleite Sie auf Wunsch zu Terminen.",
    faq: {
      q: "Begleiten Sie mich zu einem Termin in Dielsdorf?",
      a: "Ja, nach Absprache begleite ich Sie zu Ämtern oder Sozialdiensten in Dielsdorf und dolmetsche auf Arabisch oder Aramäisch. Eine Rechtsberatung biete ich nicht an.",
    },
    description:
      "Dielsdorf und Bezirk: Hilfe bei Behördenangelegenheiten, Begleitung zu Terminen, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "niederhasli",
    name: "Niederhasli",
    area: "im Bezirk Dielsdorf",
    intro:
      "In Niederhasli und Oberhasli helfe ich Familien, sich im Schweizer Behördenalltag zurechtzufinden, begleite Jugendliche bei Bewerbungen und dolmetsche auf Arabisch und Aramäisch.",
    local:
      "Niederhasli liegt im Bezirk Dielsdorf, zwischen Dielsdorf und Oberglatt, und umfasst auch Oberhasli, Nöschikon und Nassenwil. Für Jugendliche aus Niederhasli ist der Weg in eine Lehre ein wichtiger Schritt – ich unterstütze sie mit Bewerbungstraining und Gesprächsvorbereitung.",
    faq: {
      q: "Üben Sie mit meinem Kind auch Vorstellungsgespräche?",
      a: "Ja. Im Jugendcoaching bereiten wir Vorstellungsgespräche gezielt vor und üben typische Fragen. Für Jugendliche aus Niederhasli geht das persönlich oder online.",
    },
    description:
      "Niederhasli und Oberhasli: Bewerbungstraining und Vorstellungsgespräche üben für Jugendliche, Hilfe bei Behördenschreiben und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "buchs-zh",
    name: "Buchs (ZH)",
    area: "im Furttal",
    intro:
      "In Buchs im Furttal unterstütze ich Privatpersonen und Familien bei Briefen, Formularen und Anträgen, stehe Jugendlichen bei Berufswahl und Bewerbung zur Seite und dolmetsche bei Bedarf auf Arabisch oder Aramäisch.",
    local:
      "Buchs liegt im Furttal im Bezirk Dielsdorf und teilt sich mit Dällikon den Bahnhof Buchs-Dällikon. Mit der S-Bahn sind Regensdorf und Zürich schnell erreichbar. Ich helfe Familien aus Buchs, Post von Gemeinde, Schule oder Versicherungen zu verstehen und richtig zu beantworten.",
    faq: {
      q: "Helfen Sie auch bei Briefen von Versicherungen?",
      a: "Ja. Ich erkläre Ihnen Schreiben von Krankenkassen oder anderen Versicherungen verständlich und helfe beim Ausfüllen der Formulare. Eine Rechts- oder Versicherungsberatung biete ich nicht an.",
    },
    description:
      "Buchs ZH im Furttal: Hilfe bei Briefen von Gemeinde, Schule und Versicherungen, Coaching zur Berufswahl und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "daellikon",
    name: "Dällikon",
    area: "im Furttal",
    intro:
      "Auch in Dällikon bin ich für Sie da: bei Schreiben, die Fragen aufwerfen, bei der Lehrstellensuche Ihrer Kinder und bei Gesprächen, in denen Sie eine Dolmetscherin für Arabisch oder Aramäisch brauchen.",
    local:
      "Dällikon ist eine kleine Gemeinde im Furttal zwischen Regensdorf und Buchs. Viele Erledigungen führen von hier nach Regensdorf, Dielsdorf oder Zürich. Ich helfe Ihnen, die nötigen Unterlagen vorzubereiten, und begleite Sie auf Wunsch – oder wir klären alles bequem online.",
    faq: {
      q: "Muss ich aus Dällikon für jedes Gespräch anreisen?",
      a: "Nein. Viele Anliegen lassen sich online über Google Meet erledigen. Persönliche Treffen und Begleitungen vereinbaren wir nur, wenn sie für Ihr Anliegen sinnvoll sind.",
    },
    description:
      "Dällikon im Furttal: Unterstützung bei Schreiben und Unterlagen, Lehrstellensuche für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – online oder vor Ort.",
    canton: "ZH",
  },
  {
    slug: "otelfingen",
    name: "Otelfingen",
    area: "im Furttal",
    intro:
      "Für Familien in Otelfingen biete ich Hilfe im Behördenalltag, Coaching für Jugendliche auf dem Weg in die Lehre und Sprachmittlung auf Arabisch und Aramäisch – nahbar und verlässlich.",
    local:
      "Otelfingen liegt am westlichen Ende des Furttals am Fuss der Lägern, nahe der Grenze zum Kanton Aargau. Das Dorf ist ländlich geprägt, Ämter und Schulen der Oberstufe liegen teils in Nachbargemeinden. Ich helfe Ihnen, die Übersicht über Termine, Fristen und Unterlagen zu behalten.",
    faq: {
      q: "Mein Kind kommt bald in die Oberstufe. Können Sie uns beraten?",
      a: "Ich begleite Jugendliche und Eltern bei Fragen zur Berufswahl und zur Lehrstellensuche und erkläre Ihnen die Schritte auf Arabisch oder Aramäisch. Für Familien aus Otelfingen persönlich oder online.",
    },
    description:
      "Otelfingen: Hilfe im Behördenalltag, Begleitung von Jugendlichen und Eltern bei Berufswahl und Lehrstellensuche, Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "urdorf",
    name: "Urdorf",
    area: "im Limmattal",
    intro:
      "In Urdorf unterstütze ich Menschen, die bei Behördenschreiben, Formularen oder wichtigen Gesprächen Hilfe brauchen. Jugendliche begleite ich bei der Berufswahl – auf Deutsch, Arabisch oder Aramäisch.",
    local:
      "Urdorf liegt im Limmattal im Bezirk Dietikon, zwischen Schlieren, Dietikon und Birmensdorf. Die Gemeinde ist gut mit Zürich verbunden und bei Familien beliebt. Ich helfe Ihnen bei Anliegen rund um Gemeinde, Schule und Sozialversicherungen und bereite Gespräche gemeinsam mit Ihnen vor.",
    faq: {
      q: "Können Sie mir einen Brief von der Gemeinde Urdorf erklären?",
      a: "Ja. Sie schicken mir den Brief oder bringen ihn zum Termin mit, und ich erkläre Ihnen in einfachen Worten, was darin steht und was Sie tun müssen. Eine Rechtsberatung biete ich nicht an.",
    },
    description:
      "Urdorf im Limmattal: Briefe von Gemeinde und Schule verständlich erklärt, Hilfe bei Formularen, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "ZH",
  },
  {
    slug: "spreitenbach",
    name: "Spreitenbach",
    area: "im aargauischen Limmattal",
    intro:
      "In Spreitenbach begleite ich Familien mit Migrationshintergrund bei administrativen Fragen, unterstütze Jugendliche auf Lehrstellensuche und dolmetsche bei wichtigen Gesprächen auf Arabisch und Aramäisch.",
    local:
      "Spreitenbach liegt im Limmattal direkt an der Grenze zum Kanton Zürich und gehört doch zum Aargau. In der Gemeinde leben Menschen aus vielen Ländern, und viele Familien sprechen zu Hause eine andere Sprache als Deutsch. Ich helfe dabei, dass Briefe von Schule und Gemeinde richtig verstanden werden.",
    faq: {
      q: "Spreitenbach liegt im Aargau. Unterstützen Sie trotzdem?",
      a: "Ja. Viele Anliegen klären wir online über Google Meet, und persönliche Termine in Spreitenbach sind nach Absprache möglich. Auch mit Aargauer Formularen helfe ich Ihnen gerne.",
    },
    description:
      "Spreitenbach AG: Unterstützung für Familien bei Briefen von Schule und Gemeinde, Lehrstellensuche für Jugendliche und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "AG",
  },
  {
    slug: "wuerenlos",
    name: "Würenlos",
    area: "im aargauischen Limmattal",
    intro:
      "Für Menschen in Würenlos biete ich Unterstützung bei Behördenschreiben, ein Coaching für Jugendliche auf dem Weg in den Beruf und Sprachmittlung auf Arabisch und Aramäisch.",
    local:
      "Würenlos liegt an der Limmat im Bezirk Baden, zwischen Wettingen und dem Zürcher Furttal. Viele Einwohnerinnen und Einwohner arbeiten in Zürich oder Baden. Ich helfe Ihnen, auch neben Beruf und Familie den Überblick über Post, Fristen und Termine zu behalten.",
    faq: {
      q: "Können wir Unterlagen aus Würenlos digital austauschen?",
      a: "Ja. Nach Ihrer Anfrage können Sie mir Dokumente zusenden, und wir besprechen sie online über Google Meet. Persönliche Termine sind nach Absprache ebenfalls möglich.",
    },
    description:
      "Würenlos AG: Hilfe bei Behördenschreiben, Fristen und Terminen, Coaching für Jugendliche und Dolmetschen auf Arabisch und Aramäisch – auch digital.",
    canton: "AG",
  },
  {
    slug: "brugg",
    name: "Brugg",
    area: "an der Aare im Kanton Aargau",
    intro:
      "In Brugg unterstütze ich Familien und Jugendliche bei allem, was mit Behörden, Ausbildung und Sprache zu tun hat – von der Erklärung eines Briefes bis zur Begleitung bei einem Gespräch auf Arabisch oder Aramäisch.",
    local:
      "Brugg liegt an der Aare, ganz in der Nähe des Wasserschlosses, wo Aare, Reuss und Limmat zusammenfliessen. Die Stadt ist Hauptort des gleichnamigen Bezirks und ein wichtiger Bildungsstandort. Ich begleite Jugendliche aus Brugg bei der Berufswahl und helfe Eltern, das Schweizer Bildungssystem zu verstehen.",
    faq: {
      q: "Können Sie meinen Eltern das Schweizer Ausbildungssystem erklären?",
      a: "Ja. Ich erkläre Eltern auf Arabisch oder Aramäisch, wie Lehre, Berufsschule und weiterführende Schulen funktionieren, damit die ganze Familie die Entscheidung mittragen kann. Für Brugg online oder nach Absprache vor Ort.",
    },
    description:
      "Brugg AG: Jugendcoaching zur Berufswahl, Schweizer Ausbildungssystem für Eltern erklärt, Hilfe bei Behördenbriefen und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "AG",
  },
  {
    slug: "bremgarten",
    name: "Bremgarten",
    area: "an der Reuss im Freiamt",
    intro:
      "In Bremgarten und im unteren Freiamt helfe ich Ihnen bei Behördenschreiben und Anträgen, begleite Jugendliche in die Berufswelt und dolmetsche auf Arabisch und Aramäisch.",
    local:
      "Bremgarten liegt in einer Schlaufe der Reuss und ist mit seiner Altstadt Hauptort des gleichnamigen Bezirks im Aargauer Freiamt. Mit der Bahn ist Bremgarten direkt mit Dietikon verbunden. Viele Anliegen klären wir online, für Begleitungen vor Ort finden wir einen passenden Termin.",
    faq: {
      q: "Wie stelle ich aus Bremgarten eine Anfrage?",
      a: "Sie füllen das Anfrageformular online aus und wählen die Bereiche, die Sie betreffen. Danach melde ich mich bei Ihnen, und wir vereinbaren das Erstgespräch – persönlich oder über Google Meet.",
    },
    description:
      "Bremgarten AG im Freiamt: Hilfe bei Behördenschreiben und Anträgen, Begleitung von Jugendlichen in die Berufswelt und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "AG",
  },
  {
    slug: "wohlen",
    name: "Wohlen",
    area: "im Freiamt im Kanton Aargau",
    intro:
      "Für Menschen in Wohlen biete ich verlässliche Unterstützung im Umgang mit Ämtern, Coaching für Jugendliche bei der Lehrstellensuche und Dolmetschen auf Arabisch und Aramäisch.",
    local:
      "Wohlen ist die grösste Gemeinde im Aargauer Freiamt und war früher für seine Strohflechterei bekannt. Heute leben hier Familien aus vielen Kulturen. Ich unterstütze Eltern bei Briefen von Gemeinde und Schule und helfe Jugendlichen, mit guten Bewerbungsunterlagen in die Lehrstellensuche zu starten.",
    faq: {
      q: "Erstellen Sie mit Jugendlichen aus Wohlen Bewerbungsunterlagen?",
      a: "Ja. Wir erarbeiten gemeinsam Lebenslauf und Motivationsschreiben und bereiten Vorstellungsgespräche vor. Die Jugendlichen schreiben dabei selbst mit – so lernen sie, es beim nächsten Mal allein zu schaffen.",
    },
    description:
      "Wohlen AG im Freiamt: Unterstützung im Umgang mit Ämtern, Bewerbungsunterlagen für Jugendliche und Dolmetschen auf Arabisch und Aramäisch.",
    canton: "AG",
  },
];

export function findCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const cityHref = (c: City) => `${cityBase}/${c.slug}`;
