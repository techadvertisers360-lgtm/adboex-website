import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAuthor, getCategory } from "@/content/blog";
import { site, SITE_URL } from "@/content/site";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";
import { metadataFromFields } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Img } from "@/components/ui/Img";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return metadataFromFields(
    {
      path: `/insights/${post.slug}/`,
      title: post.seoTitle,
      description: post.description,
      primaryKeyword: post.keywords[0] ?? post.title,
      secondaryKeywords: post.keywords.slice(1),
    },
    {
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [getAuthor(post.author).name],
      section: getCategory(post.category)?.name,
    }
  );
}

/* Links inside articles: internal → next/link, external → new tab with safe rel */
const mdxComponents = {
  a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.body,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });

  const author = getAuthor(post.author);
  const category = getCategory(post.category);
  const url = absoluteUrl(`/insights/${post.slug}/`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(post.image)],
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Organization", name: author.name, url: absoluteUrl("/about-us/") },
    publisher: { "@id": `${SITE_URL}/#organization`, "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl(site.logo.dark) } },
    articleSection: category?.name,
    keywords: post.keywords.join(", "),
    wordCount: post.body.split(/\s+/).length,
    inLanguage: "en-US",
  };

  /* Reference layout: date label, H1, rounded cover image, article text — nothing else. */
  return (
    <>
      <article aria-labelledby="page-heading" className="pt-32 pb-20 md:pt-[180px] md:pb-28">
        <div className="container-x max-w-[1024px]">
          <Breadcrumbs
            items={[
              { name: "Insights", path: "/insights/" },
              ...(category ? [{ name: category.name, path: `/insights/category/${category.slug}/` }] : []),
              { name: post.title, path: `/insights/${post.slug}/` },
            ]}
            className="sr-only"
          />
          <header className="fx-zoom-load">
            <p className="label">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            <h1 id="page-heading" className="mt-5 text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-white md:text-[42px] md:leading-[52px]">
              {post.title}
            </h1>
            <p className="sr-only">
              By {author.name}
              {post.updated !== post.date && <>, updated {formatDate(post.updated)}</>}
            </p>
          </header>

          <Img
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={1000}
            priority
            sizes="(max-width: 1056px) 100vw, 976px"
            className="mt-10 aspect-[976/430] h-auto w-full rounded-[24px] object-cover"
          />

          <div className="post-text mt-16">{content}</div>
        </div>
      </article>
      <JsonLd data={schema} />
    </>
  );
}
