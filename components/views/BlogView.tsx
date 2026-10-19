import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { finalizeMeta } from "@/lib/seo";
import { pagePath, pageAlternates, type Locale } from "@/lib/i18n";

// Blog: placeholder "Coming soon" hasta que haya artículos (noindex, fuera del sitemap).
const T: Record<Locale, { eyebrow: string; title: string; body: string; tours: string; insta: string; meta: string }> = {
  en: {
    eyebrow: "2wheels Rental Blog",
    title: "Coming soon",
    body: "Stories, routes and local tips from the trails, lakes and mountains of Ticino. We’re getting the first articles ready.",
    tours: "Explore our tours",
    insta: "Follow us on Instagram",
    meta: "Stories, routes and local tips from Ticino — coming soon.",
  },
  it: {
    eyebrow: "Il blog di 2wheels Rental",
    title: "Prossimamente",
    body: "Storie, itinerari e consigli locali da sentieri, laghi e montagne del Ticino. Stiamo preparando i primi articoli.",
    tours: "Scopri i nostri tour",
    insta: "Seguici su Instagram",
    meta: "Storie, itinerari e consigli locali dal Ticino — prossimamente.",
  },
  de: {
    eyebrow: "Der 2wheels Rental Blog",
    title: "Demnächst",
    body: "Geschichten, Routen und lokale Tipps von den Trails, Seen und Bergen des Tessins. Wir bereiten gerade die ersten Artikel vor.",
    tours: "Unsere Touren entdecken",
    insta: "Folgen Sie uns auf Instagram",
    meta: "Geschichten, Routen und lokale Tipps aus dem Tessin — demnächst.",
  },
};

export function blogMetadata(locale: Locale): Metadata {
  const t = T[locale];
  return finalizeMeta({
    title: "Blog - 2wheels Rental",
    description: t.meta,
    robots: { index: false, follow: true },
    alternates: { canonical: pagePath("blog", locale), languages: pageAlternates("blog") },
  });
}

export default function BlogView({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-ink text-white">
      <Image
        src="/wp-content/uploads/2026/03/galeria-2wheels-rental-monte-san-lucio-monte-bar-lugano-ticino-2.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[80%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
      <div className="container-site py-24">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/80">{t.eyebrow}</p>
        <h1 className="mt-5 text-6xl sm:text-7xl lg:text-8xl">{t.title}</h1>
        <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">{t.body}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href={pagePath("tours", locale)} className="rounded-md bg-primary px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-primary-dark">
            {t.tours}
          </Link>
          <a href={SITE.contact.instagram} target="_blank" rel="noopener" className="rounded-md border border-white/60 px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-ink">
            {t.insta}
          </a>
        </div>
      </div>
    </section>
  );
}
