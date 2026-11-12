import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import HomeContent from "@/components/home/HomeContent";
import JsonLd from "@/components/seo/JsonLd";
import { cities, cityHref, findCity } from "@/config/cities";
import { baseOpenGraph } from "@/lib/seo";

type Props = { params: Promise<{ stadt: string }> };

// Only the cities in src/config/cities.ts exist; every other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ stadt: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = findCity((await params).stadt);
  if (!city) return {};
  const title = `Administrative Unterstützung, Jugendcoaching & Dolmetschen in ${city.name}`;
  const description = city.description ?? `Hilfe bei Behördenschreiben, Jugendcoaching und Dolmetschen auf Arabisch und Aramäisch in ${city.name} – persönlich vor Ort oder online. Keine Rechtsberatung.`;
  const url = cityHref(city);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { ...baseOpenGraph, url, title, description },
  };
}

export default async function CityPage({ params }: Props) {
  const city = findCity((await params).stadt);
  if (!city) notFound();
  return (
    <SiteShell page="city">
      <JsonLd page="city" city={city} />
      <HomeContent city={city} />
    </SiteShell>
  );
}
