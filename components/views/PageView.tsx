import ContentPage from "@/components/ContentPage";
import { getPageL, type Block } from "@/lib/pages";
import { SITE } from "@/lib/site";
import { HOME } from "@/lib/home-content";
import { UI, pagePath, type Locale } from "@/lib/i18n";

type CTA = { label: string; href: string; external?: boolean } | undefined;

function ctaFor(key: string, locale: Locale): CTA {
  const t = HOME[locale];
  const u = UI[locale];
  switch (key) {
    case "bikes-e-bikes":
      return { label: t.rentABike, href: SITE.booqable, external: true };
    case "motorbikes-scooters":
      return { label: t.exploreMotorcycles, href: SITE.booqableMotorcycles, external: true };
    case "2wheels-season-pass":
      return { label: u.bookNow, href: `https://wa.me/${SITE.contact.whatsapp}`, external: true };
    case "hotel-programs":
    case "for-companies":
      return { label: u.getInTouch, href: pagePath("contact", locale) };
    case "about-us":
      return { label: t.checkOurTours, href: pagePath("tours", locale) };
    default:
      return undefined;
  }
}

export default function PageView({ locale, pageKey }: { locale: Locale; pageKey: string }) {
  const p = getPageL(locale, pageKey);
  const isLegal = pageKey.includes("policy") || pageKey.includes("cookie");
  let blocks: Block[] = p.blocks || [];
  // about-us / for-companies tienen poco texto (está en imágenes) → fallback a la descripción
  if (blocks.length < 2 && p.description) {
    blocks = [{ tag: "p", text: p.description }];
  }
  return (
    <ContentPage
      title={p.h1}
      subtitle={p.description}
      blocks={blocks}
      heroImage={p.images?.[0]}
      images={p.images?.slice(1)}
      cta={isLegal ? undefined : ctaFor(pageKey, locale)}
      variant={isLegal ? "legal" : "rich"}
    />
  );
}
