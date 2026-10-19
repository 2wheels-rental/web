import type { Metadata } from "next";
import { finalizeMeta } from "@/lib/seo";
import ContactView from "@/components/views/ContactView";
import { pageAlternates } from "@/lib/i18n";

export const metadata: Metadata = finalizeMeta({
  title: "Contact - 2wheels Rental",
  description:
    "Get in touch with 2wheels Rental in Lugano, Ticino. Bike, e-bike, scooter and campervan rentals, tours and outdoor experiences.",
  alternates: { canonical: "/contact", languages: pageAlternates("contact") },
  openGraph: {
    title: "Contact - 2wheels Rental",
    description: "Get in touch with 2wheels Rental in Lugano, Ticino.",
    url: "https://2wheelsrental.com/contact/",
    type: "website",
  },
});

export default function Page() {
  return <ContactView locale="en" />;
}
