import type { Metadata } from "next";
import PageView from "@/components/views/PageView";
import { pageMetadataL } from "@/lib/pages";

export const metadata: Metadata = pageMetadataL("en", "2wheels-season-pass");
export default function Page() {
  return <PageView locale="en" pageKey="2wheels-season-pass" />;
}
