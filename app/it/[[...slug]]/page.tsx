import type { Metadata } from "next";
import { paramsFor, RenderFor, metadataFor } from "@/components/LocaleRoute";

export const dynamicParams = false;

export function generateStaticParams() {
  return paramsFor("it");
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug = [] } = await params;
  return metadataFor("it", slug);
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  return <RenderFor locale="it" slug={slug} />;
}
