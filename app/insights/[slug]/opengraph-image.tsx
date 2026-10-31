import { getAllPosts, getPost } from "@/lib/posts";
import { getCategory } from "@/content/blog";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Adboex Insights article";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return ogImage({ title: post?.title ?? "Adboex Insights", eyebrow: post ? getCategory(post.category)?.name : "Insights" });
}
