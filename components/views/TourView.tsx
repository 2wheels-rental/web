import Image from "next/image";
import Link from "next/link";
import { getTours, type Tour } from "@/lib/tours";
import { localImg } from "@/lib/img";
import { SITE } from "@/lib/site";
import { UI, tourPath, type Locale } from "@/lib/i18n";
import ItineraryCarousel from "@/components/ItineraryCarousel";
import PracticalInfo from "@/components/PracticalInfo";
import FloatingBook from "@/components/FloatingBook";
import GalleryStrip from "@/components/GalleryStrip";

// Detalle de tour con el orden/estética del single-post de Elementor:
// hero centrado → specs → intro a 2 columnas → highlights (caja oscura + foto) →
// itinerario/rutas → galería → Practical Info → Keep Exploring.
export default function TourView({ locale, tour }: { locale: Locale; tour: Tour }) {
  const u = UI[locale];
  const specs = Object.entries(tour.specs);
  const gallery = tour.gallery.map(localImg);
  const itinerary = tour.itinerary || [];
  const routes = tour.routes || [];
  const bookingUrl = tour.booking || `https://wa.me/${SITE.contact.whatsapp}`;
  const bookingLabel = tour.booking ? u.bookThisTour : u.requestThisTour;
  const practical = tour.practical || [];
  const others = getTours(locale).filter((t) => t.slug !== tour.slug).slice(0, 3);

  return (
    <>
      {/* HERO centrado */}
      <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-ink">
        {tour.hero && <Image src={localImg(tour.hero)} alt={tour.title} fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0 bg-black/45" />
        <div className="container-site relative max-w-4xl py-24 text-center text-white">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl">{tour.title}</h1>
          {tour.subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90 sm:text-2xl">{tour.subtitle}</p>}
          <a
            data-book-cta
            href={bookingUrl}
            target="_blank"
            rel="noopener"
            className="mt-9 inline-block rounded-md bg-primary px-9 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-primary-dark"
          >
            {bookingLabel}
          </a>
        </div>
      </section>

      {/* SPECS + INTRO */}
      <section className="bg-paper">
        {specs.length > 0 && (
          <div className="container-site grid grid-cols-2 gap-x-6 gap-y-8 pt-16 sm:grid-cols-3 lg:grid-cols-6">
            {specs.map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-ink-soft">{label}</p>
                <p className="mt-2 text-2xl font-medium text-ink sm:text-3xl">{value}</p>
              </div>
            ))}
          </div>
        )}
        {tour.intro.length > 0 && (
          <div className="container-site gap-12 py-14 text-lg text-ink-soft md:columns-2 [&>p+p]:mt-5">
            {tour.intro.map((p, i) => <p key={i} className="break-inside-avoid-column">{p}</p>)}
          </div>
        )}
      </section>

      {/* HIGHLIGHTS: caja oscura + foto */}
      {tour.highlights.length > 0 && (
        <section className="bg-paper pb-20">
          <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <div className="topo bg-ink p-10 text-white sm:p-12">
              <h2 className="text-4xl sm:text-5xl">{tour.highlightsTitle || u.highlights}</h2>
              <ul className="mt-8 list-disc space-y-4 pl-6 text-lg text-white/90 marker:text-white">
                {tour.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
            {tour.highlightsImage && (
              <div className="relative aspect-[3/2]">
                <Image src={tour.highlightsImage} alt={tour.highlightsTitle || tour.title} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </section>
      )}

      {routes.length > 0 && (
        <ItineraryCarousel title={tour.routesTitle || u.itinerary} days={routes} prev={u.prev} next={u.next} />
      )}
      {itinerary.length > 0 && (
        <ItineraryCarousel title={u.itinerary} days={itinerary} prev={u.prev} next={u.next} />
      )}

      {gallery.length > 0 && <GalleryStrip images={gallery} alt={tour.title} />}

      {practical.length > 0 && (
        <PracticalInfo title={u.practicalInfo} tabs={practical} bookingUrl={bookingUrl} bookingLabel={bookingLabel} />
      )}

      {/* KEEP EXPLORING */}
      {others.length > 0 && (
        <section className="bg-paper pb-20 pt-6">
          <div className="container-site">
            <h2 className="text-center text-5xl text-ink sm:text-6xl">{u.keepExploring}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {others.map((t) => (
                <Link key={t.slug} href={tourPath(t.en_slug || t.slug, locale)} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    {t.hero && (
                      <Image src={localImg(t.hero)} alt={t.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl text-ink group-hover:text-primary">{t.title}</h3>
                  {t.subtitle && <p className="mt-1 text-sm text-ink-soft">{t.subtitle}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FloatingBook href={bookingUrl} label={tour.booking ? u.bookNow : bookingLabel} />
    </>
  );
}
