import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { getPage, pageMetadata } from "@/lib/pages";

const SLUG = "hotel-programs";
export const metadata: Metadata = pageMetadata(SLUG);

export default function Page() {
  const p = getPage(SLUG);
  return (
    <ContentPage
      title={p.h1}
      subtitle="Offer premium bikes to your guests — all-inclusive hotel bike programs in Ticino."
      blocks={p.blocks}
      heroImage={p.images[0]}
      images={p.images.slice(1)}
      cta={{ label: "Contact us", href: "/contact" }}
    />
  );
}
