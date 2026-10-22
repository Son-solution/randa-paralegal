import { site } from "@/config/site";

/**
 * Structured data for search engines. Only confirmed facts are included:
 * no street address, phone, opening hours or prices until they are confirmed
 * in src/config/site.ts.
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
  return (
    <script
      type="application/ld+json"
      data-page={page}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
