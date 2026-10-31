import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

/**
 * Reads blog posts from /content/posts/*.mdx at build time.
 * Frontmatter format (between the --- lines), one field per line:
 *   title: "Post title"
 *   keywords: ["primary keyword", "secondary keyword"]
 */

export type PostMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  excerpt: string;
  author: string;
  readingMinutes: number;
};

export type Post = PostMeta & { body: string; toc: { id: string; text: string; level: 2 | 3 }[] };

const DIR = path.join(process.cwd(), "content", "posts");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error("Post is missing frontmatter (--- … ---)");
  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const value = m[2].trim();
    data[m[1]] = value.startsWith("[") ? JSON.parse(value) : value.replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const words = body.replace(/<[^>]+>|[#*_>`[\]()-]/g, " ").split(/\s+/).filter(Boolean).length;

  const slugger = new GithubSlugger();
  const toc = [...body.matchAll(/^(##|###)\s+(.+)$/gm)].map((m) => {
    const text = m[2].trim();
    return { id: slugger.slug(text), text, level: (m[1].length as 2 | 3) };
  });

  const slug = String(data.slug ?? file.replace(/\.mdx$/, ""));
  return {
    slug,
    title: String(data.title),
    seoTitle: String(data.seoTitle ?? data.title),
    description: String(data.description),
    date: String(data.date),
    updated: String(data.updated ?? data.date),
    category: String(data.category),
    keywords: (data.keywords as string[]) ?? [],
    image: String(data.image ?? `/images/blog/${slug}.webp`),
    imageAlt: String(data.imageAlt ?? data.title),
    excerpt: String(data.excerpt ?? data.description),
    author: String(data.author ?? "adboex-team"),
    readingMinutes: Math.max(1, Math.round(words / 220)),
    body,
    toc,
  };
}

let cache: Post[] | null = null;

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  if (!cache) {
    cache = fs
      .readdirSync(DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map(readPost)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return cache;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export const getPostsByCategory = (category: string) => getAllPosts().filter((p) => p.category === category);

/** Same-category posts first, then the newest others. */
export function getRelatedPosts(post: PostMeta, count = 3) {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}

/** Lightweight card data (no body) for listings and related links. */
export const toMeta = ({ body: _body, toc: _toc, ...meta }: Post): PostMeta => meta; // eslint-disable-line @typescript-eslint/no-unused-vars

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
