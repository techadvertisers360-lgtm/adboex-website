import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { blog, getCategory } from "@/content/blog";
import type { SeoKey } from "@/content/seo";
import { getPostsByCategory, toMeta } from "@/lib/posts";
import { PageHero } from "@/components/sections/shared/PageHero";
import { PostGrid } from "@/components/blog/BlogParts";

export const dynamicParams = false;

export function generateStaticParams() {
  return blog.categories.map((c) => ({ cat: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  return buildMetadata(`category-${cat}` as SeoKey);
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const category = getCategory(cat);
  if (!category) notFound();
  const posts = getPostsByCategory(cat).map(toMeta);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Insights", path: "/insights/" },
          { name: category.name, path: `/insights/category/${category.slug}/` },
        ]}
        pill={blog.hero.pill}
        title={category.heading}
        text={<p>{category.description}</p>}
      />
      <section aria-label={`${category.name} articles`} className="pb-20 md:pb-32">
        <div className="container-x">
          {posts.length ? <PostGrid posts={posts} /> : <p className="text-center text-copy">New articles coming soon.</p>}
        </div>
      </section>
    </>
  );
}
