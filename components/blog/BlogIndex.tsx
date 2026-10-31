import { blog } from "@/content/blog";
import { getAllPosts, toMeta } from "@/lib/posts";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Pagination, PostGrid } from "@/components/blog/BlogParts";
import type { Crumb } from "@/lib/schema";

/** Shared body for /insights/ and /insights/page/<n>/ (reference: hero + post grid). */
export function BlogIndex({ page }: { page: number }) {
  const all = getAllPosts().map(toMeta);
  const per = blog.postsPerPage;
  const total = Math.max(1, Math.ceil(all.length / per));
  const posts = all.slice((page - 1) * per, page * per);
  const crumbs: Crumb[] = [{ name: "Insights", path: "/insights/" }];
  if (page > 1) crumbs.push({ name: `Page ${page}`, path: `/insights/page/${page}/` });

  return (
    <>
      <PageHero
        crumbs={crumbs}
        pill={blog.hero.pill}
        title={page > 1 ? `${blog.hero.heading} (Page ${page})` : blog.hero.heading}
        highlight={blog.hero.highlight}
        text={<p>{blog.hero.text}</p>}
      />
      <section aria-label="Articles" className="pb-20 md:pb-32">
        <div className="container-x">
          <PostGrid posts={posts} />
          <Pagination current={page} total={total} />
        </div>
      </section>
    </>
  );
}

export function totalBlogPages() {
  return Math.max(1, Math.ceil(getAllPosts().length / blog.postsPerPage));
}
