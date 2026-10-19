import ContentPage from "@/components/ContentPage";
import AboutView from "@/components/views/AboutView";
import CompaniesView from "@/components/views/CompaniesView";
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
      return { label: u.getInTouch, href: pagePath("contact", locale) };
    default:
      return undefined;
  }
}

export default function PageView({ locale, pageKey }: { locale: Locale; pageKey: string }) {
  if (pageKey === "about-us") return <AboutView locale={locale} />;
  if (pageKey === "for-companies") return <CompaniesView locale={locale} />;
  const p = getPageL(locale, pageKey);
  const isLegal = pageKey.includes("policy") || pageKey.includes("cookie");
  let blocks: Block[] = p.blocks || [];
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
