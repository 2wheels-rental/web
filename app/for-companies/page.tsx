import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { getPage, pageMetadata } from "@/lib/pages";

const SLUG = "for-companies";
export const metadata: Metadata = pageMetadata(SLUG);

export default function Page() {
  const p = getPage(SLUG);
  const blocks = [
    {
      tag: "p",
      text:
        "Corporate bike tours and outdoor team experiences in Lugano. Team building, incentives and tailor-made cycling days for your company across Ticino.",
    },
    { tag: "h2", text: "Team experiences" },
    {
      tag: "p",
      text:
        "Guided bike and e-bike outings designed around your group — from relaxed lakeside rides to challenging alpine routes, with full support, equipment and logistics handled by our team.",
    },
    { tag: "h2", text: "Tailor-made for your company" },
    {
      tag: "p",
      text:
        "We organise corporate rentals, incentives and events of any size. Tell us your goals, group size and dates and we'll build the right experience.",
    },
  ];
  return (
    <ContentPage
      title={p.h1}
      subtitle={p.description}
      blocks={blocks}
      heroImage={p.images[0]}
      images={p.images.slice(1)}
      cta={{ label: "Contact us", href: "/contact" }}
    />
  );
}
