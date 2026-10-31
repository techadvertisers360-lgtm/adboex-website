import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { BlogIndex, totalBlogPages } from "@/components/blog/BlogIndex";

/* /insights/page/2/, /insights/page/3/ … — each page has its own self-referencing canonical. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, totalBlogPages() - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  return buildMetadata("insights", { path: `/insights/page/${n}/`, titleSuffix: `(Page ${n})` });
}

export default async function InsightsPaged({ params }: { params: Promise<{ n: string }> }) {
  const page = Number((await params).n);
  if (!Number.isInteger(page) || page < 2 || page > totalBlogPages()) notFound();
  return <BlogIndex page={page} />;
}
