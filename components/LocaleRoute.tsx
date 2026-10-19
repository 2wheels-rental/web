import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeView from "@/components/views/HomeView";
import ToursListView from "@/components/views/ToursListView";
import TourView from "@/components/views/TourView";
import PageView from "@/components/views/PageView";
import ContactView from "@/components/views/ContactView";
import { getTours, getTourBySlug } from "@/lib/tours";
import { getPageL } from "@/lib/pages";
import { HOME } from "@/lib/home-content";
import {
  LOCALES, OG_LOCALE, pagePath, pageAlternates, tourAlternates, toursListPath,
  type Locale,
} from "@/lib/i18n";
import routesData from "@/lib/i18n-routes.json";

const ROUTES = routesData as Record<string, { en: string; it: string | null; de: string | null }>;
const HOST = "https://2wheelsrental.com";

// ---- generateStaticParams ----
export function paramsFor(locale: Locale): { slug?: string[] }[] {
  const out: { slug?: string[] }[] = [{ slug: [] }];
  for (const [key, r] of Object.entries(ROUTES)) {
    if (key === "home") continue;
    const path = locale === "en" ? r.en : r[locale];
    if (!path) continue;
    const rel = path.replace(`/${locale}/`, "").replace(/^\//, "");
    if (rel) out.push({ slug: rel.split("/") });
  }
  for (const t of getTours(locale)) out.push({ slug: ["tour", t.slug] });
  return out;
}

// ---- Resolver ----
type Resolved =
  | { kind: "home" }
  | { kind: "tours" }
  | { kind: "contact" }
  | { kind: "tour"; slug: string }
  | { kind: "page"; key: string }
  | { kind: "notfound" };

function resolve(locale: Locale, slug: string[]): Resolved {
  if (!slug || slug.length === 0) return { kind: "home" };
  if (slug[0] === "tour" && slug[1]) return { kind: "tour", slug: slug[1] };
  const fullPath = `/${locale}/${slug.join("/")}`;
  for (const [key, r] of Object.entries(ROUTES)) {
    const p = locale === "en" ? r.en : r[locale];
    if (p && p === fullPath) {
      if (key === "tours") return { kind: "tours" };
      if (key === "contact") return { kind: "contact" };
      return { kind: "page", key };
    }
  }
  return { kind: "notfound" };
}

// ---- Render ----
export function RenderFor({ locale, slug }: { locale: Locale; slug: string[] }) {
  const r = resolve(locale, slug);
  switch (r.kind) {
    case "home":
      return <HomeView locale={locale} />;
    case "tours":
      return <ToursListView locale={locale} />;
    case "contact":
      return <ContactView locale={locale} />;
    case "tour": {
      const tour = getTourBySlug(locale, r.slug);
      if (!tour) notFound();
      return <TourView locale={locale} tour={tour} />;
    }
    case "page":
      return <PageView locale={locale} pageKey={r.key} />;
    default:
      notFound();
  }
}

// ---- Metadata ----
export function metadataFor(locale: Locale, slug: string[]): Metadata {
  const r = resolve(locale, slug);
  const og = OG_LOCALE[locale];

  if (r.kind === "home") {
    const t = HOME[locale];
    return {
      title: t.metaTitle,
      description: t.metaDesc,
      alternates: { canonical: pagePath("home", locale), languages: pageAlternates("home") },
      openGraph: { title: t.metaTitle, description: t.metaDesc, url: `${HOST}${pagePath("home", locale)}/`, type: "website", locale: og },
    };
  }
  if (r.kind === "tours") {
    const t = HOME[locale];
    return {
      title: `${t.toursTitle} - 2wheels Rental`,
      description: t.toursBody,
      alternates: { canonical: toursListPath(locale), languages: pageAlternates("tours") },
      openGraph: { title: `${t.toursTitle} - 2wheels Rental`, description: t.toursBody, type: "website", locale: og },
    };
  }
  if (r.kind === "contact") {
    return {
      title: "Contact - 2wheels Rental",
      alternates: { canonical: pagePath("contact", locale), languages: pageAlternates("contact") },
      openGraph: { title: "Contact - 2wheels Rental", type: "website", locale: og },
    };
  }
  if (r.kind === "tour") {
    const tour = getTourBySlug(locale, r.slug);
    if (!tour) return {};
    const alts = tour.en_slug ? tourAlternates(tour.en_slug) : undefined;
    const title = `${tour.title} - 2wheels Rental`;
    return {
      title,
      description: tour.subtitle,
      alternates: { canonical: `/${locale}/tour/${tour.slug}`, languages: alts },
      openGraph: { title, description: tour.subtitle, type: "article", locale: og, images: tour.hero ? [tour.hero] : undefined },
    };
  }
  if (r.kind === "page") {
    const p = getPageL(locale, r.key);
    const title = p.metatitle || `${p.h1} - 2wheels Rental`;
    return {
      title,
      description: p.description || undefined,
      alternates: { canonical: pagePath(r.key, locale), languages: pageAlternates(r.key) },
      openGraph: { title, description: p.description || undefined, type: "website", locale: og },
    };
  }
  return {};
}

export { LOCALES };
