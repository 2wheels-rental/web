import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TOURS } from "@/lib/tours";
import { localImg } from "@/lib/img";

export const metadata: Metadata = {
  title: "Tours - 2wheels Rental",
  description:
    "Guided bike and e-bike tours in Lugano and across Ticino, designed for all levels. Discover alpine routes, lake rides and multi-day cycling adventures.",
  alternates: { canonical: "/tours" },
  openGraph: {
    title: "Tours - 2wheels Rental",
    description:
      "Guided bike and e-bike tours in Lugano and across Ticino, designed for all levels.",
    url: "https://2wheelsrental.com/tours/",
    type: "website",
  },
};

export default function ToursPage() {
  return (
    <>
      <section className="bg-ink py-20 text-center text-white">
        <div className="container-site">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
            Bike &amp; e-bike experiences
          </p>
          <h1 className="mt-3 text-5xl uppercase sm:text-6xl">Tours</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Guided bike and e-bike tours in Lugano and across Ticino, designed
            for all levels — from scenic lake rides to multi-day alpine
            adventures.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site grid gap-7 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {TOURS.map((t) => (
            <Link
              key={t.slug}
              href={`/tour/${t.slug}`}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {t.hero && (
                  <Image
                    src={localImg(t.hero)}
                    alt={t.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl uppercase leading-tight text-ink">{t.title}</h2>
                {t.subtitle && (
                  <p className="mt-2 text-sm text-ink-soft">{t.subtitle}</p>
                )}
                <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-primary">
                  View tour →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
