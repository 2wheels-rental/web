// Capa SEO común a todas las páginas: títulos/descripciones de Yoast (lib/seo.json, generado por
// scripts/build_seo.py), x-default en hreflang y Open Graph completo (url, siteName, locale, imagen).
import type { Metadata } from "next";
import seo from "./seo.json";

const SEO = seo as Record<string, { title?: string; description?: string }>;
export const HOST = "https://2wheelsrental.com";
const OG_LOCALE: Record<string, string> = { en: "en_GB", it: "it_IT", de: "de_DE" };
const DEFAULT_IMAGE = "/images/tours.webp";

const norm = (p: string) => (p.replace(/\/+$/, "") || "/");
const localeOf = (p: string) => (p === "/it" || p.startsWith("/it/") ? "it" : p === "/de" || p.startsWith("/de/") ? "de" : "en");

export function finalizeMeta(meta: Metadata): Metadata {
  const canonical = meta.alternates?.canonical;
  if (typeof canonical !== "string") return meta;
  const path = norm(canonical);
  const o = SEO[path] || {};
  const title = o.title ?? (meta.title as string | undefined);
  const description = o.description ?? meta.description ?? undefined;

  // hreflang: x-default → versión EN
  const languages = { ...(meta.alternates?.languages as Record<string, string> | undefined) };
  if (languages.en && !languages["x-default"]) languages["x-default"] = languages.en;

  const og = (meta.openGraph || {}) as NonNullable<Metadata["openGraph"]> & { type?: string };
  return {
    ...meta,
    title,
    description,
    alternates: { ...meta.alternates, canonical: path === "/" ? "/" : `${path}/`, languages },
    openGraph: {
      ...og,
      title,
      description: description ?? undefined,
      url: `${HOST}${path === "/" ? "/" : `${path}/`}`,
      siteName: "2wheels Rental",
      locale: OG_LOCALE[localeOf(path)],
      images: og.images ?? [DEFAULT_IMAGE],
    },
    twitter: { card: "summary_large_image", title: title ?? undefined, description: description ?? undefined },
  };
}
