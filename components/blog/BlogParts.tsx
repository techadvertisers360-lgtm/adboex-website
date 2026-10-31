import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/posts";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/utils";

/** Card for one post in listings (reference: rounded cover with a white arrow button, date, title). */
export function PostCard({ post, priority = false, headingLevel = 2 }: { post: PostMeta; priority?: boolean; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2";
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/insights/${post.slug}/`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[41/35] overflow-hidden rounded-[24px]">
        <Img
          src={post.image}
          alt=""
          width={1200}
          height={1000}
          eager={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 410px"
          className="size-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
        />
        <span className="absolute right-6 bottom-6 grid size-14 place-items-center rounded-full bg-white text-[#131313] transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-6" strokeWidth={2} />
        </span>
      </Link>
      <p className="mt-9 text-[16px] text-white/85">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <H className="mt-3 text-[24px] leading-[36px] font-medium tracking-[-0.05em] text-white">
        <Link href={`/insights/${post.slug}/`} className="transition-colors hover:text-lime">
          {post.title}
        </Link>
      </H>
    </article>
  );
}

/** Numbered pagination with real links. Page 1 = /insights/, page n = /insights/page/n/. */
export function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;
  const href = (n: number) => (n === 1 ? "/insights/" : `/insights/page/${n}/`);
  return (
    <nav aria-label="Blog pages" className="mt-14 flex items-center justify-center gap-2">
      {current > 1 && (
        <Link href={href(current - 1)} rel="prev" className="flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm text-copy hover:text-title">
          <ArrowLeft aria-hidden="true" className="size-4" /> Newer
        </Link>
      )}
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-current={n === current ? "page" : undefined}
          aria-label={`Page ${n}`}
          className={cn("grid size-10 place-items-center rounded-full text-sm font-semibold", n === current ? "bg-lime text-ink" : "border border-line text-copy hover:text-title")}
        >
          {n}
        </Link>
      ))}
      {current < total && (
        <Link href={href(current + 1)} rel="next" className="flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm text-copy hover:text-title">
          Older <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </nav>
  );
}

/** Grid of post cards. */
export function PostGrid({ posts, headingLevel = 2 }: { posts: PostMeta[]; headingLevel?: 2 | 3 }) {
  return (
    <ul data-reveal-stagger="zoom" className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <li key={p.slug}>
          <PostCard post={p} priority={i < 3} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
