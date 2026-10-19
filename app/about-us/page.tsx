import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { getPage, pageMetadata } from "@/lib/pages";

const SLUG = "about-us";
export const metadata: Metadata = pageMetadata(SLUG);

export default function Page() {
  const p = getPage(SLUG);
  const blocks = [
    { tag: "p", text: "Built in Lugano. Driven by passion for two wheels." },
    {
      tag: "p",
      text:
        "2wheels Rental is based in Lugano and offers premium bike, e-bike and campervan rentals, guided tours and outdoor experiences across Ticino. We help locals and travellers discover Switzerland on two wheels — with the right bike, local advice and no hassle.",
    },
    { tag: "h2", text: "What we do" },
    {
      tag: "p",
      text:
        "From a quick lakeside ride to multi-day alpine adventures, we provide carefully maintained bikes and motorcycles, guided tours for all levels, corporate experiences and a fully equipped campervan for total freedom across Europe.",
    },
    { tag: "h2", text: "Why Ticino" },
    {
      tag: "p",
      text:
        "Lugano and Ticino combine Mediterranean lakes, rolling countryside and serious alpine climbs — one of the most beautiful and varied regions in Europe to explore by bike.",
    },
  ];
  return (
    <ContentPage
      title={p.h1}
      subtitle={p.description}
      blocks={blocks}
      heroImage={p.images[0]}
      images={p.images.slice(1)}
      cta={{ label: "Check our tours", href: "/tours" }}
    />
  );
}
