import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/routes";
import { LOCALES, pagePath, pageAlternates, tourPath, tourAlternates, type Locale } from "@/lib/i18n";
import { TOURS } from "@/lib/tours";
import routesData from "@/lib/i18n-routes.json";

const ROUTES = routesData as Record<string, { en: string; it: string | null; de: string | null }>;

function abs(p: string) {
  return `${SITE_URL}${p === "/" ? "/" : p + "/"}`;
}
function langs(alts: Partial<Record<Locale, string>>) {
  const out: Record<string, string> = {};
  for (const l of LOCALES) if (alts[l]) out[l] = abs(alts[l]!);
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const items: MetadataRoute.Sitemap = [];

  // Páginas (home + estáticas) en cada idioma
  for (const key of Object.keys(ROUTES)) {
    const alts = pageAlternates(key);
    for (const locale of LOCALES) {
      const path = pagePath(key, locale);
      if (locale !== "en" && !alts[locale]) continue; // no hay traducción
      items.push({
        url: abs(path),
        lastModified: now,
        changeFrequency: key === "home" ? "weekly" : "monthly",
        priority: key === "home" ? 1 : 0.8,
        alternates: { languages: langs(alts) },
      });
    }
  }

  // Tours en cada idioma
  for (const t of TOURS) {
    const alts = tourAlternates(t.slug);
    for (const locale of LOCALES) {
      items.push({
        url: abs(tourPath(t.slug, locale)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: langs(alts) },
      });
    }
  }

  return items;
}
