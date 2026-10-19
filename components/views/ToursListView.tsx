import { getTours } from "@/lib/tours";
import { localImg } from "@/lib/img";
import { UI, tourPath, type Locale } from "@/lib/i18n";
import { TOURS_PAGE } from "@/lib/tours-content";
import ToursExplorer, { type TourCard } from "@/components/ToursExplorer";

export default function ToursListView({ locale }: { locale: Locale }) {
  const s = TOURS_PAGE[locale];
  const u = UI[locale];
  const cards: TourCard[] = getTours(locale).map((t) => ({
    slug: t.slug,
    title: t.title,
    subtitle: t.subtitle,
    hero: localImg(t.hero),
    experience: t.experience || "local",
    duration: t.duration || "1",
    href: tourPath(t.en_slug || t.slug, locale),
  }));

  return (
    <>
      <section className="bg-paper">
        <div className="container-site grid items-center gap-8 py-16 md:grid-cols-[0.8fr_1.6fr]">
          <h1 className="text-5xl uppercase text-ink sm:text-6xl">{s.heading}</h1>
          <p className="text-lg text-ink-soft">{s.intro}</p>
        </div>
      </section>

      <section className="bg-white">
        <ToursExplorer locale={locale} tours={cards} viewLabel={u.viewTour} />
      </section>
    </>
  );
}
