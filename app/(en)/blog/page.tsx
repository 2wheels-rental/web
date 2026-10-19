import type { Metadata } from "next";
import BlogView, { blogMetadata } from "@/components/views/BlogView";

export const metadata: Metadata = blogMetadata("en");

export default function Page() {
  return <BlogView locale="en" />;
}
