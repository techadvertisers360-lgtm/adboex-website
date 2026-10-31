import type { MetadataRoute } from "next";
import { getAllRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/utils";

/* /sitemap.xml — every public page, generated at build time from the content files. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
