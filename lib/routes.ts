/**
 * Every public page on the site, in one list. Used by the sitemap, llms.txt
 * and the SEO checker so nothing is ever forgotten. New pages from content
 * files (industries, posts) are picked up automatically.
 */
import { seo, type SeoKey } from "@/content/seo";
import { industries } from "@/content/industries";
import { blog } from "@/content/blog";
import { legalPages } from "@/content/legal";
import { securityPage } from "@/content/security";
import { getAllPosts } from "@/lib/posts";

export type RouteEntry = {
  path: string;
  title: string;
  description: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  group: "core" | "industry" | "blog" | "category" | "legal";
};

const BUILD_DATE = new Date().toISOString().slice(0, 10);

const fromSeo = (key: SeoKey, extra: Partial<RouteEntry> = {}): RouteEntry => ({
  path: seo[key].path,
  title: seo[key].title,
  description: seo[key].description,
  lastModified: BUILD_DATE,
  changeFrequency: "monthly",
  priority: 0.7,
  group: "core",
  ...extra,
});

export function getAllRoutes(): RouteEntry[] {
  const posts = getAllPosts();
  const newestPost = posts[0]?.updated ?? BUILD_DATE;
  const pages = Math.max(1, Math.ceil(posts.length / blog.postsPerPage));

  return [
    fromSeo("home", { priority: 1, changeFrequency: "weekly" }),
    fromSeo("platform", { priority: 0.9 }),
    fromSeo("pricing", { priority: 0.9 }),
    fromSeo("industries", { priority: 0.9 }),
    ...industries.map((i) => fromSeo(`industry-${i.slug}` as SeoKey, { priority: 0.8, group: "industry" })),
    fromSeo("about", { priority: 0.6 }),
    fromSeo("careers", { priority: 0.5, changeFrequency: "weekly" }),
    fromSeo("caseStudies", { priority: 0.7 }),
    fromSeo("contact", { priority: 0.6 }),
    fromSeo("academy", { priority: 0.6 }),
    fromSeo("insights", { priority: 0.8, changeFrequency: "weekly", lastModified: newestPost, group: "blog" }),
    ...Array.from({ length: pages - 1 }, (_, i) => ({
      ...fromSeo("insights", { priority: 0.4, changeFrequency: "weekly" as const, lastModified: newestPost, group: "blog" as const }),
      path: `/insights/page/${i + 2}/`,
    })),
    ...blog.categories.map((c) => fromSeo(`category-${c.slug}` as SeoKey, { priority: 0.5, changeFrequency: "weekly", group: "category" })),
    ...posts.map((p) => ({
      path: `/insights/${p.slug}/`,
      title: p.seoTitle,
      description: p.description,
      lastModified: p.updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      group: "blog" as const,
    })),
    fromSeo("security", { priority: 0.2, changeFrequency: "yearly", lastModified: securityPage.updated, group: "legal" }),
    ...legalPages.map((l) => fromSeo(l.seoKey, { priority: 0.2, changeFrequency: "yearly", lastModified: l.updated, group: "legal" })),
  ];
}
