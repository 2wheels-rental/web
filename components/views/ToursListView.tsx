import Image from "next/image";
import Link from "next/link";
import { getTours } from "@/lib/tours";
import { localImg } from "@/lib/img";
import { HOME } from "@/lib/home-content";
import { UI, tourPath, type Locale } from "@/lib/i18n";

export default function ToursListView({ locale }: { locale: Locale }) {
  const tours = getTours(locale);
  const t = HOME[locale];
  const u = UI[locale];
  return (
    <>
      <section className="bg-ink py-20 text-center text-white">
        <div className="container-site">
          <h1 className="text-5xl uppercase sm:text-6xl">{t.toursTitle}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{t.toursBody}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site grid gap-7 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <Link
              key={tour.slug}
              href={tourPath(tour.en_slug || tour.slug, locale)}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {tour.hero && (
                  <Image src={localImg(tour.hero)} alt={tour.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl uppercase leading-tight text-ink">{tour.title}</h2>
                {tour.subtitle && <p className="mt-2 text-sm text-ink-soft">{tour.subtitle}</p>}
                <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-primary">{u.viewTour} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
