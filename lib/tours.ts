import en from "./tours.json";
import it from "./tours.it.json";
import de from "./tours.de.json";
import type { Locale } from "./i18n";

export type PracticalBlock =
  | { t: "ul"; items: string[] }
  | { t: "p"; html: string }
  | { t: "h"; text: string }
  | { t: "cta"; text: string; href: string }
  | { t: "faq"; items: { q: string; a: string }[] };
export type PracticalTab = { title: string; blocks: PracticalBlock[] };

export type Tour = {
  slug: string;
  title: string;
  subtitle: string;
  specs: Record<string, string>;
  intro: string[];
  highlights: string[];
  hero: string;
  gallery: string[];
  booking: string;
  experience?: string; // custom | local | trips
  duration?: string; // 0.5 | 1 | 2 | 3 | 5 | 12
  itinerary?: { day: string; body: string[] }[];
  practical?: PracticalTab[]; // tabs "Practical Info" (scripts/parse_practical.py)
  // scripts/parse_tour_extras.py (sitio en vivo)
  highlightsTitle?: string; // "Highlights" o p.ej. "Why Shuttle"
  highlightsImage?: string;
  routesTitle?: string; // p.ej. "Routes Available" (Bike Shuttle)
  routes?: { day: string; body: string[] }[];
  en_slug?: string;
  slug_it?: string;
  slug_de?: string;
};

const BY_LOCALE: Record<Locale, Tour[]> = {
  en: en as Tour[],
  it: it as Tour[],
  de: de as Tour[],
};

export const TOURS = en as Tour[]; // compat EN

export function getTours(locale: Locale): Tour[] {
  return BY_LOCALE[locale];
}

// Busca por slug LOCALIZADO (el que viene en la URL de ese idioma)
export function getTourBySlug(locale: Locale, slug: string): Tour | undefined {
  return BY_LOCALE[locale].find((t) => t.slug === slug);
}

// Slug EN de un tour, desde su slug localizado (para hreflang/switcher)
export function enSlugOf(locale: Locale, slug: string): string | undefined {
  if (locale === "en") return slug;
  return BY_LOCALE[locale].find((t) => t.slug === slug)?.en_slug;
}

export const getTour = (slug: string): Tour | undefined =>
  (en as Tour[]).find((t) => t.slug === slug);

export const SPEC_ORDER = ["Duration", "Distance", "Format", "Level", "Elevation", "Bike Type"];
