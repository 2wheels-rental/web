import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOURS, getTour, SPEC_ORDER } from "@/lib/tours";
import { localImg } from "@/lib/img";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return TOURS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};
  return {
    title: `${t.title} - 2wheels Rental`,
    description: t.subtitle,
    alternates: { canonical: `/tour/${t.slug}` },
    openGraph: {
      title: `${t.title} - 2wheels Rental`,
      description: t.subtitle,
      url: `https://2wheelsrental.com/tour/${t.slug}/`,
      type: "article",
      images: t.hero ? [t.hero] : undefined,
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const specs = SPEC_ORDER.filter((k) => tour.specs[k]).map((k) => ({
    label: k,
    value: tour.specs[k],
  }));
  const gallery = tour.gallery.map(localImg);
  const bookingUrl = tour.booking || `https://wa.me/${SITE.contact.whatsapp}`;
  const bookingLabel = tour.booking ? "Book this tour" : "Request this tour";

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-end">
        {tour.hero && (
          <Image src={localImg(tour.hero)} alt={tour.title} fill priority className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="container-site relative pb-14 text-white">
          <Link href="/tours" className="text-sm font-medium uppercase tracking-wide text-white/70 hover:text-white">
            ← Tours
          </Link>
          <h1 className="mt-3 text-5xl uppercase sm:text-6xl">{tour.title}</h1>
          {tour.subtitle && <p className="mt-3 max-w-2xl text-lg text-white/85">{tour.subtitle}</p>}
        </div>
      </section>

      {/* SPECS */}
      {specs.length > 0 && (
        <section className="border-b border-black/5 bg-white">
          <div className="container-site grid grid-cols-2 gap-6 py-10 sm:grid-cols-3 lg:grid-cols-6">
            {specs.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{s.label}</p>
                <p className="mt-1 text-lg font-medium text-ink">{s.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INTRO + HIGHLIGHTS */}
      <section className="bg-white">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            {tour.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl text-ink" : "text-ink-soft"}>
                {p}
              </p>
            ))}
            <div className="pt-4">
              <a href={bookingUrl} target="_blank" rel="noopener" className="inline-block rounded-md bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark">
                {bookingLabel}
              </a>
            </div>
          </div>

          {tour.highlights.length > 0 && (
            <aside className="rounded-2xl bg-paper p-8">
              <h2 className="text-2xl uppercase text-ink">Highlights</h2>
              <ul className="mt-5 space-y-3">
                {tour.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-ink-soft">
                    <span className="mt-1 text-primary">●</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </section>

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="bg-paper">
          <div className="container-site py-16">
            <h2 className="mb-8 text-center text-3xl uppercase text-ink">Gallery</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {gallery.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={src} alt={`${tour.title} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="container-site flex flex-col items-center gap-5 py-16 text-center">
          <h2 className="text-4xl uppercase">Ready to ride?</h2>
          <p className="text-white/70">Book now or ask us anything on WhatsApp.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={bookingUrl} target="_blank" rel="noopener" className="rounded-md bg-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark">
              {bookingLabel}
            </a>
            <a href={`https://wa.me/${SITE.contact.whatsapp}`} target="_blank" rel="noopener" className="rounded-md border border-white/40 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-ink">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
