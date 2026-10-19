import type { MetadataRoute } from "next";
import { ALL_PATHS, SITE_URL } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ALL_PATHS.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "/" : p + "/"}`,
    lastModified: now,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.startsWith("/tour/") ? 0.7 : 0.8,
  }));
}
