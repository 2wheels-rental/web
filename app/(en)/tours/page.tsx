import type { Metadata } from "next";
import { finalizeMeta } from "@/lib/seo";
import ToursListView from "@/components/views/ToursListView";
import { HOME } from "@/lib/home-content";
import { pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = finalizeMeta({
  title: "Tours - 2wheels Rental",
  description: HOME.en.toursBody,
  alternates: { canonical: "/tours", languages: pageAlternates("tours") },
  openGraph: {
    title: "Tours - 2wheels Rental",
    description: HOME.en.toursBody,
    url: "https://2wheelsrental.com/tours/",
    type: "website",
  },
});

export default function Page() {
  return <ToursListView locale="en" />;
}
