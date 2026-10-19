import type { Metadata } from "next";
import { finalizeMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import TourView from "@/components/views/TourView";
import { TOURS, getTour } from "@/lib/tours";
import { tourAlternates } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOURS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};
  const title = `${t.title} - 2wheels Rental`;
  return finalizeMeta({
    title,
    description: t.subtitle,
    alternates: { canonical: `/tour/${t.slug}`, languages: tourAlternates(t.slug) },
    openGraph: {
      title,
      description: t.subtitle,
      url: `https://2wheelsrental.com/tour/${t.slug}/`,
      type: "article",
      images: t.hero ? [t.hero] : undefined,
    },
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();
  return <TourView locale="en" tour={tour} />;
}
