import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { getPage, pageMetadata } from "@/lib/pages";
import { SITE } from "@/lib/site";

const SLUG = "bikes-e-bikes";
export const metadata: Metadata = pageMetadata(SLUG);

export default function Page() {
  const p = getPage(SLUG);
  return (
    <ContentPage
      title={p.h1}
      subtitle="Premium bikes, e-bikes and gravel bikes for rent in Lugano, Ticino."
      blocks={p.blocks}
      heroImage={p.images[0]}
      images={p.images.slice(1)}
      cta={{ label: "Rent a bike", href: SITE.booqable, external: true }}
    />
  );
}
