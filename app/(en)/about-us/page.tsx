import type { Metadata } from "next";
import PageView from "@/components/views/PageView";
import { pageMetadataL } from "@/lib/pages";

export const metadata: Metadata = pageMetadataL("en", "about-us");
export default function Page() {
  return <PageView locale="en" pageKey="about-us" />;
}
