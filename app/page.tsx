import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";
import { HOME } from "@/lib/home-content";
import { pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: HOME.en.metaTitle,
  description: HOME.en.metaDesc,
  alternates: { canonical: "/", languages: pageAlternates("home") },
  openGraph: {
    title: HOME.en.metaTitle,
    description: HOME.en.metaDesc,
    url: "https://2wheelsrental.com/",
    siteName: "2wheels Rental",
    locale: "en_GB",
    type: "website",
    images: ["/images/tours.webp"],
  },
};

export default function Page() {
  return <HomeView locale="en" />;
}
