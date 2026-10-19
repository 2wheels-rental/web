import type { Metadata } from "next";
import PageView from "@/components/views/PageView";
import { pageMetadataL } from "@/lib/pages";

export const metadata: Metadata = pageMetadataL("en", "cookie-policy-eu");
export default function Page() {
  return <PageView locale="en" pageKey="cookie-policy-eu" />;
}
