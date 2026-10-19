import type { Metadata } from "next";
import PageView from "@/components/views/PageView";
import { pageMetadataL } from "@/lib/pages";

export const metadata: Metadata = pageMetadataL("en", "bikes-e-bikes");
export default function Page() {
  return <PageView locale="en" pageKey="bikes-e-bikes" />;
}
