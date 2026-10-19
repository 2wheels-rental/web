import data from "./pages.json";
import type { Metadata } from "next";

export type Block = { tag: string; text: string };
export type PageData = {
  slug: string;
  title: string;
  metatitle: string;
  description: string;
  h1: string;
  blocks: Block[];
  images: string[];
  canonical: string;
  slug_it: string;
  slug_de: string;
};

const PAGES = data as Record<string, PageData>;

export const getPage = (slug: string): PageData => PAGES[slug];

export function pageMetadata(slug: string, path = `/${slug}`): Metadata {
  const p = PAGES[slug];
  if (!p) return {};
  return {
    title: p.metatitle || `${p.h1} - 2wheels Rental`,
    description: p.description || undefined,
    alternates: { canonical: path },
    openGraph: {
      title: p.metatitle || `${p.h1} - 2wheels Rental`,
      description: p.description || undefined,
      url: `https://2wheelsrental.com${path}/`,
      type: "website",
    },
  };
}
