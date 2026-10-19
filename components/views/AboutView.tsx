import Image from "next/image";
import Link from "next/link";
import { ABOUT, ABOUT_IMG } from "@/lib/about-content";
import { pagePath, type Locale } from "@/lib/i18n";

const btnRed =
  "inline-block rounded-md bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark";

// Íconos de los valores (montaña, medalla, hoja, grupo) como en el original
const ICONS = [
  <path key="m" d="M12 4 2 20h20L12 4Zm0 0 3.5 6-2 1.5L12 10l-1.5 1.5-2-1.5L12 4Z" />,
  <path key="q" d="M5 2h4l3 5 3-5h4l-4.6 7.4A7 7 0 1 1 9.6 9.4L5 2Zm7 9.5-1.5 3-3.3.5 2.4 2.3-.6 3.2 3-1.6 3 1.6-.6-3.2 2.4-2.3-3.3-.5-1.5-3Z" />,
  <path key="l" d="M20 3S8 2 5 9c-2 4.7 1 8.6 1 8.6L3 21l1.4 1.4 3-3.2S11 22 15.5 19C21 15.4 20 3 20 3Zm-4 4-8 9.5" />,
  <path key="p" d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6.5 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm13 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 13c-3.3 0-6 1.8-6 4v2h12v-2c0-2.2-2.7-4-6-4Zm-7.3 1C2.6 14.3 1 15.6 1 17v2h3.5v-2c0-1.2.1-2.2.2-3Zm14.6 0c.1.8.2 1.8.2 3v2H23v-2c0-1.4-1.6-2.7-3.7-3Z" />,
];

export default function AboutView({ locale }: { locale: Locale }) {
  const t = ABOUT[locale];
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden bg-ink py-20 text-white">
        <Image src={ABOUT_IMG.hero} alt={t.h1} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="container-site relative max-w-3xl">
          <h1 className="text-5xl uppercase sm:text-6xl lg:text-7xl">{t.h1}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">{t.lead}</p>
          <Link href={pagePath("contact", locale)} className={`${btnRed} mt-8`}>{t.contact}</Link>
        </div>
      </section>

      {/* WHO WE ARE: texto izq + imagen a sangre derecha (separada del hero) */}
      <section className="bg-paper pt-16 md:pt-24">
        <div className="grid items-center md:grid-cols-[1fr_minmax(0,42%)]">
          <div className="px-4 py-16 sm:px-10 lg:px-20">
            <h2 className="text-5xl text-ink sm:text-6xl">{t.whoTitle}</h2>
            {t.who.map((p, i) => (
              <p key={i} className="mt-5 max-w-xl text-lg text-ink-soft">{p}</p>
            ))}
          </div>
          <div className="relative aspect-[3/2] md:aspect-auto md:h-full md:min-h-[480px]">
            <Image src={ABOUT_IMG.who} alt={t.whoTitle} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" />
          </div>
        </div>

        {/* Valores */}
        <div className="container-site grid grid-cols-2 gap-x-6 gap-y-12 py-20 md:grid-cols-4">
          {t.values.map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-ink-soft" aria-hidden="true">{ICONS[i]}</svg>
              <p className="mt-6 max-w-[16rem] text-sm font-medium uppercase leading-relaxed tracking-[0.3em] text-ink">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-ink py-20 text-white">
        <div className="container-site text-center">
          <h2 className="text-5xl sm:text-6xl">{t.teamTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{t.teamIntro}</p>
          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {t.team.map((m) => (
              <div key={m.name} className="group relative aspect-[2/3] overflow-hidden">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                />
                <div className="absolute inset-x-3 bottom-3 bg-white px-2 py-3 text-ink">
                  <h3 className="text-base font-medium sm:text-lg">{m.name}</h3>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-ink-soft sm:text-[10px] xl:whitespace-nowrap">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* READY TO RIDE: texto + imagen a sangre */}
      <section className="bg-paper">
        <div className="grid items-center md:grid-cols-[1fr_minmax(0,45%)]">
          <div className="px-4 py-16 sm:px-10 lg:px-20">
            <h2 className="text-5xl text-ink sm:text-6xl">{t.ctaTitle}</h2>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">{t.ctaBody}</p>
            <Link href={pagePath("tours", locale)} className={`${btnRed} mt-8`}>{t.ctaButton}</Link>
          </div>
          <div className="relative aspect-[3/2] md:my-24">
            <Image src={ABOUT_IMG.cta} alt={t.ctaTitle} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
