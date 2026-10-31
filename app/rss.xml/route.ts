import { site } from "@/content/site";
import { blog, getAuthor, getCategory } from "@/content/blog";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/utils";

/* /rss.xml — RSS 2.0 feed of all blog posts, generated at build time. */
export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(iso + "T12:00:00Z").toUTCString();

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/insights/${p.slug}/`);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${rfc822(p.date)}</pubDate>
      <category>${esc(getCategory(p.category)?.name ?? p.category)}</category>
      <dc:creator>${esc(getAuthor(p.author).name)}</dc:creator>
      <enclosure url="${absoluteUrl(p.image)}" type="image/webp" length="0" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.name)} Insights</title>
    <link>${absoluteUrl("/insights/")}</link>
    <description>${esc(blog.hero.text)}</description>
    <language>en-us</language>
    <lastBuildDate>${posts[0] ? rfc822(posts[0].updated) : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
