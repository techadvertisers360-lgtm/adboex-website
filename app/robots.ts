import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

/* /robots.txt — settings live in /content/site.ts → crawlers. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const { allowAiCrawlers, aiBots, disallow } = site.crawlers;
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      allowAiCrawlers ? { userAgent: aiBots, allow: "/", disallow } : { userAgent: aiBots, disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
