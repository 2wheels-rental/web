import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { getPage, pageMetadata } from "@/lib/pages";

const SLUG = "cookie-policy-eu";
export const metadata: Metadata = pageMetadata(SLUG);

export default function Page() {
  const p = getPage(SLUG);
  return (
    <ContentPage
      title={p.h1}
      subtitle="How 2wheels Rental uses cookies and similar technologies."
      blocks={p.blocks}
    />
  );
}
