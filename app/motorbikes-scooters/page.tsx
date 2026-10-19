import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { getPage, pageMetadata } from "@/lib/pages";
import { SITE } from "@/lib/site";

const SLUG = "motorbikes-scooters";
export const metadata: Metadata = pageMetadata(SLUG);

export default function Page() {
  const p = getPage(SLUG);
  return (
    <ContentPage
      title={p.h1}
      subtitle="Premium motorcycles and scooters for alpine roads and Swiss mountain passes."
      blocks={p.blocks}
      heroImage={p.images[0]}
      images={p.images.slice(1)}
      cta={{ label: "Rent a motorcycle", href: SITE.booqableMotorcycles, external: true }}
    />
  );
}
