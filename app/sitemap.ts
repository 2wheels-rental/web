import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/routes";
import { LOCALES, pagePath, pageAlternates, tourPath, tourAlternates, type Locale } from "@/lib/i18n";
import { TOURS } from "@/lib/tours";
import { localImg } from "@/lib/img";

// URL absoluta (y codificada) de una imagen local para el sitemap de imágenes
const img = (u: string) => encodeURI(`${SITE_URL}${localImg(u)}`);
import routesData from "@/lib/i18n-routes.json";

// Páginas noindex (placeholder) que no van al sitemap
const NOINDEX = new Set(["blog"]);

const ROUTES = routesData as Record<string, { en: string; it: string | null; de: string | null }>;

function abs(p: string) {
  return `${SITE_URL}${p === "/" ? "/" : p + "/"}`;
}
function langs(alts: Partial<Record<Locale, string>>) {
  const out: Record<string, string> = {};
  for (const l of LOCALES) if (alts[l]) out[l] = abs(alts[l]!);
  if (out.en) out["x-default"] = out.en;
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const items: MetadataRoute.Sitemap = [];

  // Páginas (home + estáticas) en cada idioma
  for (const key of Object.keys(ROUTES)) {
    if (NOINDEX.has(key)) continue;
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

  // Campervan (solo EN)
  items.push({
    url: abs("/campervan"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [img("/wp-content/uploads/2026/02/Campervan.webp")],
  });

  // Tours en cada idioma (con sus imágenes: hero + galería)
  for (const t of TOURS) {
    const alts = tourAlternates(t.slug);
    const images = [t.hero, t.highlightsImage, ...t.gallery].filter(Boolean).map((u) => img(u!)).slice(0, 20);
    for (const locale of LOCALES) {
      items.push({
        url: abs(tourPath(t.slug, locale)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: langs(alts) },
        images,
      });
    }
  }

  return items;
}
