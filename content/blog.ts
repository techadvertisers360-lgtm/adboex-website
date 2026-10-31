/**
 * BLOG (INSIGHTS) SETTINGS — controls the /insights/ page text, blog
 * categories, authors and how many posts show per page.
 *
 * The posts themselves are .mdx files in /content/posts/. Each post's
 * `category` must match a category slug below, and its `author` must match
 * an author id below. Category SEO titles/descriptions are in /content/seo.ts
 * (keys "category-<slug>").
 */

export const blog = {
  hero: {
    pill: "Blogs",
    heading: "Local SEO Blog: Insights That Drive Growth",
    highlight: ["Growth"],
    text: "Practical, no-fluff guides on local SEO, Google Business Profile, AI search visibility and AI tools, written for owners of local service businesses.",
  },
  postsPerPage: 9,

  // heading = the category page H1 (include the category keyword from /content/seo.ts)
  categories: [
    { slug: "local-seo", name: "Local SEO", heading: "Local SEO Guides for Service Businesses", description: "Rankings, city pages, technical fixes and everything that gets local businesses found." },
    { slug: "ai-search", name: "AI Search & GEO", heading: "AI Search Articles and GEO Guides", description: "How ChatGPT, Gemini and Perplexity recommend local businesses, and how to be one of them." },
    { slug: "google-business-profile", name: "Google Business Profile", heading: "Google Business Profile Tips and Tutorials", description: "Posts, reviews, categories and map pack tactics for your Google profile." },
    { slug: "marketing-insights", name: "Marketing Insights", heading: "Marketing Insights for Small and Local Businesses", description: "Data, AI, advertising and analytics ideas that help small businesses market smarter." },
    { slug: "ai-tools", name: "AI Tools", heading: "AI Tools for Small Business, Explained", description: "AI receptionists, schedulers, content and video tools for small businesses." },
  ],

  authors: [
    {
      id: "adboex-team",
      name: "Adboex Local Growth Team", // REPLACE with a real author name for stronger E-E-A-T
      role: "Local SEO and AI visibility specialists",
      bio: "The Adboex team helps local service businesses get found on Google, Maps and AI assistants. We build the automation behind the platform and test every tactic on real local businesses.",
      image: "/images/team/author-adboex.webp",
    },
  ],
};

export type Category = (typeof blog.categories)[number];
export const getCategory = (slug: string) => blog.categories.find((c) => c.slug === slug);
export const getAuthor = (id: string) => blog.authors.find((a) => a.id === id) ?? blog.authors[0];
