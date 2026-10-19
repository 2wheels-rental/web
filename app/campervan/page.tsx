import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { SITE } from "@/lib/site";

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
  const blocks = [
    { tag: "p", text: "Meet maja — total freedom on four wheels." },
    {
      tag: "p",
      text:
        "A fully equipped premium campervan based in Lugano, built for total freedom across Europe. Perfect for couples and small families who want to combine cycling adventures with the freedom of van life.",
    },
    { tag: "h2", text: "Fully equipped" },
    {
      tag: "p",
      text:
        "Comfortable sleeping, kitchen, storage and bike-friendly setup — everything you need to hit the road and explore the Alps, the lakes and beyond.",
    },
  ];
  return (
    <ContentPage
      title="Campervan Rental"
      subtitle="Fully equipped premium campervan in Lugano, built for total freedom across Europe."
      blocks={blocks}
      heroImage="/wp-content/uploads/2026/02/05-Campervan-Rental-2wheels-Rental.webp"
      images={[
        "/wp-content/uploads/2026/03/portada-2wheels-rental-camper-campervan-bike-rental-dolomites-bolzano-italia-1.webp",
      ]}
      cta={{ label: "Enquire now", href: `https://wa.me/${SITE.contact.whatsapp}`, external: true }}
    />
  );
}
