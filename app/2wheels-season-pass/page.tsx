import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { getPage, pageMetadata } from "@/lib/pages";
import { SITE } from "@/lib/site";

const SLUG = "2wheels-season-pass";
export const metadata: Metadata = pageMetadata(SLUG);

export default function Page() {
  const p = getPage(SLUG);
  return (
    <ContentPage
      title={p.h1}
      subtitle="Ride more this season with the 2wheels Season Pass — flexible packs for regular riders."
      blocks={p.blocks}
      heroImage={p.images[0]}
      images={p.images.slice(1)}
      cta={{ label: "Get your pass", href: `https://wa.me/${SITE.contact.whatsapp}`, external: true }}
    />
  );
}
