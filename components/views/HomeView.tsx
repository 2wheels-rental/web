import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import Reviews from "@/components/Reviews";
import HeroVideo from "@/components/HeroVideo";
import { HOME } from "@/lib/home-content";
import { pagePath, tourPath, type Locale } from "@/lib/i18n";

const PARTNERS = [
  { slug: "luganoregion", name: "Lugano Region", href: "https://www.luganoregion.com/", h: "h-14" },
  { slug: "ascona-locarno", name: "Ascona-Locarno", href: "https://www.ascona-locarno.com/", h: "h-12" },
  { slug: "bellinzonaevalli", name: "Bellinzona e Valli", href: "https://www.bellinzonaevalli.ch/", h: "h-16" },
  { slug: "mendrisiottoturismo", name: "Mendrisiotto Turismo", href: "https://www.mendrisiottoturismo.ch/", h: "h-8" },
  { slug: "ticino", name: "Ticino", href: "https://www.ticino.ch/", h: "h-12" },
  { slug: "myswitzerland", name: "Switzerland Tourism", href: "https://www.myswitzerland.com/", h: "h-8" },
  { slug: "merida-bikes", name: "Merida Bikes", href: "https://www.merida-bikes.com/", h: "h-8" },
  { slug: "colorado", name: "Hotel Colorado Lugano", href: "https://www.colorado.ch/", h: "h-12" },
  { slug: "weridemtb", name: "WeRide Academy", href: "https://www.werideacademy.ch", h: "h-14" },
  { slug: "garagevallone", name: "Garage Vallone", href: "https://garagevallone.nissan.ch/", h: "h-11" },
];

const btn = {
  red: "inline-block rounded-md bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark",
  dark: "inline-block rounded-md bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black",
  outline:
    "inline-block rounded-md border border-ink px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white",
};
type BtnKey = keyof typeof btn;

function GoogleBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur">
      <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden>
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.6 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.2 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5c4.2-3.9 6.6-9.6 6.6-16.9z" />
        <path fill="#FBBC05" d="M10.5 28.3c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-7.9-6.1C1 16.9 0 20.3 0 24s1 7.1 2.6 10.3l7.9-6z" />
        <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.1-5.5c-2 1.3-4.6 2.1-7.9 2.1-6.3 0-11.6-3.7-13.5-9.3l-7.9 6C6.5 42.6 14.6 48 24 48z" />
      </svg>
      <span className="font-bold text-white">4,9</span>
      <span className="text-[#FBBC05]">★★★★★</span>
    </div>
  );
}

function Cta({ label, href, style, external }: { label: string; href: string; style: BtnKey; external?: boolean }) {
  return external ? (
    <a href={href} target="_blank" rel="noopener" className={btn[style]}>{label}</a>
  ) : (
    <Link href={href} className={btn[style]}>{label}</Link>
  );
}

function Split({ image, imageSide = "left", title, body, children, bg = "white" }: {
  image: string; imageSide?: "left" | "right"; title: string; body: React.ReactNode; children?: React.ReactNode; bg?: "white" | "paper";
}) {
  return (
    <section className={bg === "paper" ? "bg-paper" : "bg-white"}>
      <div className="container-site grid items-center gap-12 py-20 md:grid-cols-2">
        <div className={imageSide === "right" ? "md:order-2" : ""}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src={image} alt={title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className={imageSide === "right" ? "md:order-1" : ""}>
          <h2 className="text-4xl uppercase text-ink sm:text-5xl">{title}</h2>
          <div className="mt-5 space-y-4 text-lg text-ink-soft">{body}</div>
          <div className="mt-7 flex flex-wrap gap-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

function FullBleed({ image, title, body, cta }: { image: string; title: string; body: string; cta: React.ReactNode }) {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <Image src={image} alt={title} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="container-site relative text-center text-white">
        <h2 className="text-5xl uppercase sm:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">{body}</p>
        <div className="mt-8 flex justify-center">{cta}</div>
      </div>
    </section>
  );
}

export default function HomeView({ locale }: { locale: Locale }) {
  const t = HOME[locale];
  const toursHref = pagePath("tours", locale);
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-ink">
        <HeroVideo src="/videos/hero.mp4" mobileSrc="/videos/hero-mobile.mp4" poster="/images/hero.webp" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="container-site relative">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">{t.heroEyebrow}</p>
            <h1 className="mt-4 text-5xl uppercase sm:text-6xl lg:text-7xl">{t.heroTitle}</h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">{t.heroBody}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <GoogleBadge />
              <a href={SITE.booqable} target="_blank" rel="noopener" className={btn.red}>{t.rentABike}</a>
            </div>
          </div>
        </div>
      </section>

      {/* BIKES */}
      <Split image="/images/rent-bikes.webp" title={t.bikesTitle} body={<><p>{t.bikesBody1}</p><p>{t.bikesBody2}</p></>}>
        <Cta label={t.exploreBikes} href={pagePath("bikes-e-bikes", locale)} style="dark" />
        <Cta label={t.exploreMotorcycles} href={pagePath("motorbikes-scooters", locale)} style="outline" />
      </Split>

      {/* TOURS */}
      <FullBleed image="/images/tours.webp" title={t.toursTitle} body={t.toursBody} cta={<Cta label={t.checkOurTours} href={toursHref} style="red" />} />

      {/* FOR COMPANIES */}
      <Split image="/images/for-companies.webp" title={t.forCompaniesTitle} body={<p>{t.forCompaniesBody}</p>}>
        <Cta label={t.learnMore} href={pagePath("for-companies", locale)} style="dark" />
      </Split>

      {/* CAMPERVAN */}
      <FullBleed
        image="/wp-content/uploads/2026/02/05-Campervan-Rental-2wheels-Rental.webp"
        title={t.campervanTitle}
        body={t.campervanBody}
        cta={<Cta label={t.meetMaja} href="/campervan" style="red" />}
      />

      {/* BIKE SHUTTLE */}
      <Split image="/images/bike-shuttle.webp" imageSide="right" bg="paper" title={t.bikeShuttleTitle} body={<p>{t.bikeShuttleBody}</p>}>
        <Cta label={t.learnMore} href={tourPath("bike-shuttle", locale)} style="dark" />
      </Split>

      {/* WERIDE */}
      <Split image="/images/weride-section.webp" title={t.werideTitle} body={<p>{t.werideBody}</p>}>
        <Cta label={t.visitWebsite} href="https://www.werideacademy.ch" style="dark" external />
      </Split>

      {/* REVIEWS */}
      <Reviews title={t.reviewsTitle} />

      {/* PARTNERS: logos SVG del original (Elementor partner-logo), gris → color en hover */}
      <section className="bg-paper">
        <div className="container-site py-20 text-center">
          <h2 className="text-5xl text-ink sm:text-6xl">{t.partnersTitle}</h2>
          {[PARTNERS.slice(0, 6), PARTNERS.slice(6)].map((row, r) => (
            <ul key={r} className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-10 lg:flex-nowrap lg:justify-between ${r === 0 ? "mt-14" : "mx-auto mt-12 max-w-4xl"}`}>
              {row.map((p) => (
                <li key={p.slug}>
                  <a href={p.href} target="_blank" rel="noopener" aria-label={p.name} className="block opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/images/partners/${p.slug}.svg`} alt={p.name} className={`w-auto ${p.h}`} />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* READY TO RIDE */}
      <Split image="/images/about.webp" title={t.readyTitle} body={<p>{t.readyBody}</p>}>
        <Cta label={t.checkOurTours} href={toursHref} style="red" />
      </Split>
    </>
  );
}
