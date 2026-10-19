import type { Metadata } from "next";
import LandingView from "@/components/views/LandingView";
import { CAMPERVAN } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: "Campervan Rental - 2wheels Rental",
  description:
    "Meet maja — a fully equipped premium campervan for rent in Lugano, built for total freedom across Europe.",
  alternates: { canonical: "/campervan" },
  openGraph: {
    title: "Campervan Rental - 2wheels Rental",
    description: "Meet maja — a fully equipped premium campervan for rent in Lugano.",
    url: "https://2wheelsrental.com/campervan/",
    type: "website",
  },
};

export default function Page() {
  return <LandingView data={CAMPERVAN} />;
}
