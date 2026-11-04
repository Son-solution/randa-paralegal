import { site } from "@/config/site";

/**
 * Structured data for search engines. Only confirmed facts are included:
 * phone, e-mail and address only once they are set in src/config/site.ts,
 * no opening hours or prices.
 */
export default function JsonLd({ page }: { page: "home" }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    image: `${site.url}/images/og-image.jpg`,
    logo: `${site.url}/logo/randa-logo.png`,
    slogan: site.slogan,
    founder: { "@type": "Person", name: site.owner },
    areaServed: { "@type": "City", name: site.city },
    availableLanguage: site.languages,
    knowsAbout: ["Administrative Unterstützung", "Jugendcoaching", "Berufsorientierung", "Dolmetschen"],
  };
  if (site.contact.phone) data.telephone = site.contact.phone;
  if (site.contact.email) data.email = site.contact.email;
  if (site.contact.address) {
    // Expects ["Street 1", "8000 City"].
    const [street, cityLine = ""] = site.contact.address;
    const m = /^(\d{4})\s+(.+)$/.exec(cityLine.trim());
    data.address = {
      "@type": "PostalAddress",
      streetAddress: street,
      ...(m ? { postalCode: m[1], addressLocality: m[2] } : { addressLocality: cityLine }),
      addressCountry: "CH",
    };
  }
  return (
    <script
      type="application/ld+json"
      data-page={page}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
