import type { Metadata } from "next";
import { seo, type PageSeo, type SeoKey } from "@/content/seo";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

type ExtraMeta = {
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  /** pagination (/insights/page/2/) — overrides the canonical path */
  path?: string;
  titleSuffix?: string;
};

/**
 * Build the full <head> metadata for a page listed in /content/seo.ts.
 *   export const metadata = buildMetadata("pricing");
 */
export function buildMetadata(key: SeoKey, extra: ExtraMeta = {}): Metadata {
  const page: PageSeo = seo[key];
  return metadataFromFields(page, extra);
}

/** Same as buildMetadata, for pages whose SEO fields live elsewhere (blog posts). */
export function metadataFromFields(page: PageSeo, extra: ExtraMeta = {}): Metadata {
  const path = extra.path ?? page.path;
  const url = absoluteUrl(path);
  const title = extra.titleSuffix ? page.title.replace(" | ", ` ${extra.titleSuffix} | `) : page.title;
  // Share images are generated per route by opengraph-image.tsx files (next/og).
  // A custom ogImage in /content/seo.ts overrides the generated one.
  const images = page.ogImage ? [{ url: absoluteUrl(page.ogImage), width: 1200, height: 630, alt: page.title }] : undefined;

  return {
    title: { absolute: title },
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    alternates: { canonical: url },
    robots: page.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
    openGraph: {
      title,
      description: page.description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: extra.type ?? "website",
      ...(images ? { images } : {}),
      ...(extra.type === "article"
        ? {
            publishedTime: extra.publishedTime,
            modifiedTime: extra.modifiedTime,
            authors: extra.authors,
            section: extra.section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}
