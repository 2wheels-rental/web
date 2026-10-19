import type { Metadata } from "next";
import { finalizeMeta } from "@/lib/seo";
import LandingView from "@/components/views/LandingView";
import { CAMPERVAN } from "@/lib/landing-content";

export const metadata: Metadata = finalizeMeta({
  title: "Campervan Rental - 2wheels Rental",
  description:
    "Campervan rental in Ticino: meet Maja, a fully equipped 2021 Fiat Ducato for exploring the Alps and Northern Italy with total autonomy.",
  alternates: { canonical: "/campervan" },
  openGraph: {
    title: "Campervan Rental - 2wheels Rental",
    description: "Your fully equipped home on wheels — campervan rental in Ticino.",
    url: "https://2wheelsrental.com/campervan/",
    type: "website",
  },
});

export default function Page() {
  return <LandingView data={CAMPERVAN} />;
}
