import Image from "next/image";
import Link from "next/link";
import GalleryStrip from "@/components/GalleryStrip";
import { COMPANIES, COMPANIES_BROCHURE, COMPANIES_IMG } from "@/lib/about-content";
import { pagePath, type Locale } from "@/lib/i18n";

const btn = {
  red: "inline-block rounded-md bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark",
  dark: "inline-block rounded-md bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black",
  white: "inline-block rounded-md bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wide text-primary transition-transform hover:scale-105",
};

export default function CompaniesView({ locale }: { locale: Locale }) {
  const t = COMPANIES[locale];
  const contact = pagePath("contact", locale);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden bg-ink py-20 text-white">
        <Image src={COMPANIES_IMG.hero} alt={t.h1} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="container-site relative max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">{t.lead}</p>
          <h1 className="mt-4 text-5xl uppercase sm:text-6xl lg:text-7xl">{t.h1}</h1>
          <Link href={contact} className={`${btn.red} mt-8`}>{t.plan}</Link>
        </div>
      </section>

      {/* PROGRAMS + STATS */}
      <section className="bg-white py-20">
        <div className="container-site grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl uppercase text-ink sm:text-5xl">{t.programsTitle}</h2>
            <p className="mt-5 text-lg text-ink-soft">{t.programs}</p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-black/10 pt-8">
              {t.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl text-primary sm:text-5xl">{s.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
            <Image src={COMPANIES_IMG.programs} alt={t.programsTitle} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* RIDES / CHALLENGES / WORKSHOPS */}
      <section className="bg-paper py-20">
        <div className="container-site grid gap-6 md:grid-cols-3">
          {t.pillars.map((p, i) => (
            <article key={p.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative aspect-[3/2]">
                <Image src={COMPANIES_IMG.pillars[i]} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-7">
                <h3 className="text-3xl uppercase text-ink">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BROCHURE + GALERÍA */}
      <section className="bg-paper pt-20">
        <div className="container-site">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="max-w-2xl text-4xl uppercase text-ink sm:text-5xl">{t.brochureTitle}</h2>
            <a href={COMPANIES_BROCHURE} target="_blank" rel="noopener" className={btn.dark}>{t.brochureButton}</a>
          </div>
        </div>
      </section>
      <GalleryStrip images={COMPANIES_IMG.gallery} alt={t.h1} />

      {/* HOW IT WORKS */}
      <section className="bg-ink py-20 text-white">
        <div className="container-site">
          <div className="text-center">
            <h2 className="text-4xl uppercase sm:text-5xl">{t.howTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">{t.howIntro}</p>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/10 p-7">
                <span className="font-display text-5xl text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold uppercase">{s.title}</h3>
                <p className="mt-2 text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-primary py-24 text-center text-white">
        <Image src={COMPANIES_IMG.cta} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="container-site relative max-w-3xl">
          <h2 className="text-4xl uppercase sm:text-5xl">{t.ctaTitle}</h2>
          <p className="mt-5 text-lg text-white/90">{t.ctaBody}</p>
          <Link href={contact} className={`${btn.white} mt-8`}>{t.ctaButton}</Link>
        </div>
      </section>
    </>
  );
}
