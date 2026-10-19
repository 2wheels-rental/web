// Datos estructurados (schema.org) — reemplazan los de Yoast del WP.
import { SITE } from "@/lib/site";
import { HOST } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const LANG: Record<Locale, string> = { en: "en", it: "it", de: "de" };
const HOME: Record<Locale, string> = { en: "/", it: "/it/", de: "/de/" };

// Negocio + sitio: en todas las páginas
export function SiteJsonLd({ locale }: { locale: Locale }) {
  const business = {
    "@type": "LocalBusiness",
    "@id": `${HOST}/#business`,
    name: SITE.name,
    description: "Premium bike, e-bike, scooter, motorbike and campervan rentals, guided tours and outdoor experiences in Lugano, Ticino.",
    url: `${HOST}/`,
    logo: `${HOST}/images/logo.png`,
    image: `${HOST}/images/tours.webp`,
    telephone: SITE.contact.phone.replace(/\s/g, ""),
    email: SITE.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Antonio Adamini 20",
      addressLocality: "Lugano",
      addressRegion: "Ticino",
      addressCountry: "CH",
    },
    areaServed: ["Lugano", "Ticino", "Switzerland", "Northern Italy"],
    sameAs: [SITE.contact.instagram],
  };
  const website = {
    "@type": "WebSite",
    "@id": `${HOST}/#website`,
    url: `${HOST}${HOME[locale]}`,
    name: SITE.name,
    inLanguage: LANG[locale],
    publisher: { "@id": `${HOST}/#business` },
  };
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [business, website] }} />;
}

// Tour: TouristTrip + migas de pan
export function TourJsonLd({
  locale, name, description, url, images, toursUrl, toursLabel, itinerary,
}: {
  locale: Locale; name: string; description?: string; url: string; images: string[];
  toursUrl: string; toursLabel: string; itinerary?: { day: string }[];
}) {
  const abs = (p: string) => (p.startsWith("http") ? p : encodeURI(`${HOST}${p}`));
  const trip = {
    "@type": "TouristTrip",
    name,
    description,
    url: abs(url),
    image: images.slice(0, 6).map(abs),
    inLanguage: LANG[locale],
    provider: { "@id": `${HOST}/#business` },
    ...(itinerary && itinerary.length > 0
      ? { itinerary: { "@type": "ItemList", itemListElement: itinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: d.day })) } }
      : {}),
  };
  const crumbs = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs(HOME[locale]) },
      { "@type": "ListItem", position: 2, name: toursLabel, item: abs(toursUrl) },
      { "@type": "ListItem", position: 3, name, item: abs(url) },
    ],
  };
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [trip, crumbs] }} />;
}
