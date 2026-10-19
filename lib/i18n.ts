import routesData from "./i18n-routes.json";
import toursEn from "./tours.json";
import toursIt from "./tours.it.json";
import toursDe from "./tours.de.json";

export const LOCALES = ["en", "it", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = { en: "EN", it: "IT", de: "DE" };
export const OG_LOCALE: Record<Locale, string> = { en: "en_GB", it: "it_IT", de: "de_DE" };

type RouteRow = { en: string; it: string | null; de: string | null };
const ROUTES = routesData as Record<string, RouteRow>;

// Path de una página (pageKey) en un idioma. Fallback a EN si no hay traducción.
export function pagePath(key: string, locale: Locale): string {
  const r = ROUTES[key];
  if (!r) return "/";
  return (locale === "en" ? r.en : r[locale]) || r.en;
}

// Links alternos (hreflang) de una página
export function pageAlternates(key: string): Partial<Record<Locale, string>> {
  const r = ROUTES[key];
  if (!r) return {};
  return { en: r.en, it: r.it || undefined, de: r.de || undefined };
}

// ---- Tours: mapa enSlug -> slug localizado ----
const tourSlug: Record<string, Record<Locale, string>> = {};
for (const t of toursEn) tourSlug[t.slug] = { en: t.slug, it: t.slug, de: t.slug };
for (const t of toursIt as { slug: string; en_slug: string }[]) {
  if (tourSlug[t.en_slug]) tourSlug[t.en_slug].it = t.slug;
}
for (const t of toursDe as { slug: string; en_slug: string }[]) {
  if (tourSlug[t.en_slug]) tourSlug[t.en_slug].de = t.slug;
}

export function tourPath(enSlug: string, locale: Locale): string {
  const s = tourSlug[enSlug]?.[locale] || enSlug;
  return locale === "en" ? `/tour/${s}` : `/${locale}/tour/${s}`;
}

export function tourAlternates(enSlug: string): Partial<Record<Locale, string>> {
  const s = tourSlug[enSlug];
  if (!s) return {};
  return { en: `/tour/${s.en}`, it: `/it/tour/${s.it}`, de: `/de/tour/${s.de}` };
}

export function toursListPath(locale: Locale): string {
  return pagePath("tours", locale);
}

// ---- Nav ----
type NavDef = { key: string; href?: string; children?: { key: string; tour?: boolean }[] };
const NAV_DEF: NavDef[] = [
  { key: "home" },
  { key: "about-us" },
  {
    key: "rent",
    children: [{ key: "bikes-e-bikes" }, { key: "motorbikes-scooters" }, { key: "2wheels-season-pass" }],
  },
  { key: "tours" },
  { key: "for-companies" },
  { key: "other", children: [{ key: "bike-shuttle", tour: true }, { key: "hotel-programs" }] },
  { key: "blog" },
  { key: "contact" },
];

const LABELS: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home", "about-us": "About Us", rent: "Rent", "bikes-e-bikes": "Bikes & e-bikes",
    "motorbikes-scooters": "Motorbikes & Scooters", "2wheels-season-pass": "Season Pass",
    tours: "Tours", "for-companies": "For Companies", other: "Other Services",
    "bike-shuttle": "Bike Shuttle", "hotel-programs": "Hotel Programs", blog: "Blog", contact: "Contact",
  },
  it: {
    home: "Home", "about-us": "Chi siamo", rent: "Noleggio", "bikes-e-bikes": "Biciclette e e-bike",
    "motorbikes-scooters": "Moto e scooter", "2wheels-season-pass": "Pass stagionale",
    tours: "Tour", "for-companies": "Per le aziende", other: "Altri servizi",
    "bike-shuttle": "Navetta per biciclette", "hotel-programs": "Programmi alberghieri", blog: "Blog", contact: "Contatti",
  },
  de: {
    home: "Home", "about-us": "Über uns", rent: "Miete", "bikes-e-bikes": "Fahrräder & E-Bikes",
    "motorbikes-scooters": "Motorräder & Motorroller", "2wheels-season-pass": "Saisonpass",
    tours: "Touren", "for-companies": "Für Unternehmen", other: "Weitere Services",
    "bike-shuttle": "Fahrrad-Shuttle", "hotel-programs": "Hotel-Programme", blog: "Blog", contact: "Kontakt",
  },
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export function buildNav(locale: Locale): NavItem[] {
  const hrefFor = (key: string, tour?: boolean) =>
    tour ? tourPath("bike-shuttle", locale) : pagePath(key, locale);
  return NAV_DEF.map((d) => {
    const label = LABELS[locale][d.key];
    const href = d.children ? hrefFor(d.children[0].key, d.children[0].tour) : hrefFor(d.key);
    return {
      label,
      href,
      children: d.children?.map((c) => ({ label: LABELS[locale][c.key], href: hrefFor(c.key, c.tour) })),
    };
  });
}

// ---- Strings de UI/footer ----
export const UI: Record<Locale, Record<string, string>> = {
  en: {
    bookNow: "Book now", footerTagline: "Premium bike, e-bike, scooter and motorcycle rentals and tours in Lugano, Ticino.",
    menu: "Menu", rentals: "Rentals", contact: "Contact", followInstagram: "Follow us on Instagram",
    rights: "All Rights Reserved.", backToTours: "Tours", bookThisTour: "Book this tour", requestThisTour: "Request this tour",
    readyToRide: "Ready to ride?", bookNowCta: "Book now", gallery: "Gallery", highlights: "Highlights",
    sendMessage: "Send us a message", getInTouch: "Get in touch", address: "Address", email: "Email",
    phone: "Phone / WhatsApp", viewTour: "View tour", itinerary: "Itinerary", practicalInfo: "Practical Info", keepExploring: "Keep Exploring", prev: "Previous", next: "Next", cookieText: "We use cookies to improve your experience and analyse traffic. See our",
    cookiePolicy: "Cookie Policy", accept: "Accept", decline: "Decline", whatsappUs: "WhatsApp us", bookOnline: "Book online",
  },
  it: {
    bookNow: "Prenota", footerTagline: "Noleggio e tour premium di biciclette, e-bike, scooter e moto a Lugano, Ticino.",
    menu: "Menu", rentals: "Noleggi", contact: "Contatti", followInstagram: "Seguiteci su Instagram",
    rights: "Tutti i diritti riservati.", backToTours: "Tour", bookThisTour: "Prenota questo tour", requestThisTour: "Richiedi questo tour",
    readyToRide: "Pronti a salire in sella?", bookNowCta: "Prenota", gallery: "Galleria", highlights: "Punti salienti",
    sendMessage: "Inviaci un messaggio", getInTouch: "Mettiti in contatto", address: "Indirizzo", email: "Email",
    phone: "Telefono / WhatsApp", viewTour: "Vedi il tour", itinerary: "Itinerario", practicalInfo: "Informazioni pratiche", keepExploring: "Continua a esplorare", prev: "Precedente", next: "Successivo", cookieText: "Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico. Consulta la nostra",
    cookiePolicy: "Informativa sui cookie", accept: "Accetta", decline: "Rifiuta", whatsappUs: "Scrivici su WhatsApp", bookOnline: "Prenota online",
  },
  de: {
    bookNow: "Buchen", footerTagline: "Premium-Verleih und Touren für Fahrräder, E-Bikes, Motorroller und Motorräder in Lugano, Tessin.",
    menu: "Menü", rentals: "Verleih", contact: "Kontakt", followInstagram: "Folgen Sie uns auf Instagram",
    rights: "Alle Rechte vorbehalten.", backToTours: "Touren", bookThisTour: "Diese Tour buchen", requestThisTour: "Diese Tour anfragen",
    readyToRide: "Bereit loszufahren?", bookNowCta: "Jetzt buchen", gallery: "Galerie", highlights: "Höhepunkte",
    sendMessage: "Schreiben Sie uns", getInTouch: "Kontakt aufnehmen", address: "Adresse", email: "E-Mail",
    phone: "Telefon / WhatsApp", viewTour: "Tour ansehen", itinerary: "Reiseverlauf", practicalInfo: "Praktische Infos", keepExploring: "Weiter entdecken", prev: "Zurück", next: "Weiter", cookieText: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern und den Verkehr zu analysieren. Siehe unsere",
    cookiePolicy: "Cookie-Richtlinie", accept: "Akzeptieren", decline: "Ablehnen", whatsappUs: "WhatsApp", bookOnline: "Online buchen",
  },
};

export function detectLocale(pathname: string): Locale {
  if (pathname === "/it" || pathname.startsWith("/it/")) return "it";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  return "en";
}

// Dado el path actual, devuelve la URL equivalente en cada idioma (para el switcher)
export function alternatesForPath(pathname: string): Record<Locale, string> {
  const path = pathname.replace(/\/+$/, "") || "/";
  const loc = detectLocale(path);
  const fallback = { en: "/", it: "/it", de: "/de" };

  const m = path.match(/^(?:\/(?:it|de))?\/tour\/([^/]+)$/);
  if (m) {
    const slug = m[1];
    for (const [en, map] of Object.entries(tourSlug)) {
      if (map[loc] === slug) {
        const a = tourAlternates(en);
        return { en: a.en!, it: a.it!, de: a.de! };
      }
    }
    return fallback;
  }

  for (const [key, r] of Object.entries(ROUTES)) {
    const p = loc === "en" ? r.en : r[loc];
    const isHome = key === "home" && (path === "/" || path === `/${loc}`);
    if ((p && p === path) || isHome) {
      return { en: r.en, it: r.it || "/it", de: r.de || "/de" };
    }
  }
  return fallback;
}
