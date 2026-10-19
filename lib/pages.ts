import data from "./pages.json";
import dataIt from "./pages.it.json";
import dataDe from "./pages.de.json";
import type { Metadata } from "next";
import { finalizeMeta } from "./seo";
import { pageImage as imageFor } from "./page-images";
import type { Locale } from "./i18n";
import { pagePath, pageAlternates } from "./i18n";

export type Block = { tag: string; text: string };
export type PageData = {
  slug?: string;
  title: string;
  metatitle?: string;
  description: string;
  h1: string;
  blocks: Block[];
  images: string[];
  canonical?: string;
  slug_it?: string;
  slug_de?: string;
};

const PAGES = data as Record<string, PageData>;
const BY_LOCALE: Record<Locale, Record<string, PageData>> = {
  en: PAGES,
  it: dataIt as Record<string, PageData>,
  de: dataDe as Record<string, PageData>,
};

export const getPage = (slug: string): PageData => PAGES[slug];
export const getPageL = (locale: Locale, key: string): PageData =>
  BY_LOCALE[locale][key] || PAGES[key];

export function pageMetadata(slug: string, path = `/${slug}`): Metadata {
  return pageMetadataL("en", slug);
}

// Metadata localizada con hreflang
export function pageMetadataL(locale: Locale, key: string): Metadata {
  const p = getPageL(locale, key);
  if (!p) return {};
  return finalizeMeta(rawPageMeta(locale, key, p));
}

function rawPageMeta(locale: Locale, key: string, p: NonNullable<ReturnType<typeof getPageL>>): Metadata {
  const path = pagePath(key, locale);
  const alts = pageAlternates(key);
  const title = p.metatitle || `${p.h1} - 2wheels Rental`;
  return {
    title,
    description: p.description || undefined,
    alternates: { canonical: path, languages: alts },
    openGraph: {
      title,
      description: p.description || undefined,
      url: `https://2wheelsrental.com${path}/`,
      type: "website",
      locale: { en: "en_GB", it: "it_IT", de: "de_DE" }[locale],
      ...(imageFor(key, locale) ? { images: [imageFor(key, locale)!] } : {}),
    },
  };
}
