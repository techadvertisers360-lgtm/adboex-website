import { blog, getCategory } from "@/content/blog";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Adboex Insights category";

export function generateStaticParams() {
  return blog.categories.map((c) => ({ cat: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ cat: string }> }) {
  const cat = getCategory((await params).cat);
  return ogImage({ title: cat?.heading ?? "Adboex Insights", eyebrow: "Insights" });
}
