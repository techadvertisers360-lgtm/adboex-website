# Adboex SEO Checklist

✅ = built into the site and checked automatically by `npm run seo:check`
🔲 = something **you** need to do (content, accounts, launch steps)

---

## 1. Before launch — replace placeholders

- 🔲 `content/site.ts`: real legal name, email, phone, address, hours, social links, founding year — must match your Google Business Profile exactly (NAP)
- 🔲 `SITE_URL` in `content/site.ts` is your final domain (`https://www.adboex.com` or without www)
- 🔲 Real testimonials with permission (`content/testimonials.ts`) — remove the placeholders
- 🔲 Real case studies (`content/case-studies.ts`) — then set `sample: false`
- 🔲 Real team members and photos (`content/about.ts`, `public/images/team/`)
- 🔲 Blog author: a real person's name, role, bio and photo (`content/blog.ts`) for E-E-A-T
- 🔲 Careers: real apply email, salaries and current openings (`content/careers.ts`)
- 🔲 Lawyer-reviewed legal text (`content/legal.ts`) — remove the placeholder notice
- 🔲 Replace every "replace me" image (search the site for the grey placeholders)
- 🔲 Press logos: real outlets + article links (`content/home.ts → pressLogos`), or hide the section
- 🔲 App Store / Google Play links (`content/home.ts → features.cards → badges`)
- 🔲 Academy YouTube IDs (`content/academy.ts`)
- 🔲 Check the 4.9/400+ rating claim is accurate, or set `schema.showAggregateRating: false`
- 🔲 Optional: switch the accent colours to your logo's blue → magenta (`styles/theme.css`)

## 2. On-page SEO

- ✅ Exactly one H1 per page, containing the page's primary keyword
- ✅ Logical H2 → H3 hierarchy; pill labels are `<p>`, not headings
- ✅ Unique titles (50–60 chars, "Keyword | Adboex") and descriptions (140–160 chars, with CTA)
- ✅ Keyword map in `content/seo.ts` — one unique primary keyword per page (no cannibalisation)
- ✅ Primary keyword in title, description, H1, first 100 words, an H2 and image alt text
- ✅ Short, lowercase, hyphenated URLs with trailing slashes
- ✅ Semantic HTML: header, nav, main, section[aria-labelledby], article, aside, footer
- ✅ Descriptive anchor text; strong internal linking (home ↔ platform ↔ pricing ↔ industries ↔ posts)
- ✅ Every page within 3 clicks of the home page (header mega menu + footer link every industry)
- ✅ All content in the static HTML (tabs, FAQ answers, mega menu links included)
- ✅ External links use `rel="noopener noreferrer"`; press links add `sponsored nofollow`

## 3. Technical SEO

- ✅ Metadata on every page via `buildMetadata()` (title, description, keywords, canonical, robots, OpenGraph, Twitter)
- ✅ Absolute canonicals with trailing slash; non-www → www redirect (one hop)
- ✅ `/sitemap.xml` with every page, lastModified, changeFrequency, priority
- ✅ `/robots.txt` allows all, blocks `/api/`, lists the sitemap, explicitly allows AI crawlers
- ✅ `/llms.txt` summary for AI engines
- ✅ `/rss.xml` blog feed (linked in `<head>`)
- ✅ Unique share image per page (generated at build)
- ✅ Favicon, SVG icon, Apple touch icon, web manifest, theme colour #131313
- ✅ Real 404 status for missing pages, with helpful links
- ✅ Crawlable blog pagination (`/insights/page/2/` …) with self-canonicals
- ✅ Placeholders for Google / Bing verification and GA4 / GTM (loaded after the page is interactive, Consent Mode defaults)
- 🔲 hPanel → SSL active + **Force HTTPS** on

## 4. Structured data (JSON-LD)

- ✅ Organization + WebSite (every page)
- ✅ SoftwareApplication with offers + optional rating (Home, Platform)
- ✅ Product / Offer per plan (Pricing)
- ✅ FAQPage on every FAQ section
- ✅ BreadcrumbList on every inner page
- ✅ BlogPosting (posts), Article (case studies), Service (industries), JobPosting (careers), VideoObject (academy, once IDs are added), ContactPage
- 🔲 After launch, test 5–6 URLs at search.google.com/test/rich-results and validator.schema.org

## 5. Performance & accessibility

- ✅ Pages pre-rendered; minimal client JavaScript; Framer Motion via LazyMotion
- ✅ next/image → AVIF/WebP, responsive sizes, width/height (no layout shift), lazy loading below the fold
- ✅ Self-hosted font (next/font, swap); CSS-only marquees; YouTube and Maps load on click
- ✅ Security headers (HSTS, CSP, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy)
- ✅ Skip link, keyboard-accessible menus/tabs/accordion/dialogs, visible focus, aria labels, reduced-motion support, AA contrast
- 🔲 After launch: run PageSpeed Insights (pagespeed.web.dev) on Home, an industry page and a blog post (mobile). Target 95+. Large real images are the most common cause of a lower score — keep uploads under ~300 KB where possible.

## 6. Local SEO & GEO

- ✅ NAP identical in footer, contact page and schema (single source: `content/site.ts`)
- ✅ Industry pages: "Who it's for", definition and Q&A blocks AI engines can quote
- ✅ Factual "What is Adboex" paragraphs on Home and Platform
- 🔲 Claim/optimise Adboex's own Google Business Profile with the same NAP
- 🔲 List Adboex in key directories (G2, Capterra, Crunchbase, LinkedIn, Clutch) with identical details
- 🔲 Each month: ask ChatGPT, Gemini and Perplexity "best AI marketing platform for local businesses" and note whether Adboex appears

## 7. Launch day — submit to search engines

1. 🔲 Deploy and open `https://www.adboex.com/` — check https padlock, forms (send a test message), menus on mobile.
2. 🔲 Check `https://www.adboex.com/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/rss.xml` open correctly.
3. 🔲 **Google Search Console**
   - Add property → URL prefix → `https://www.adboex.com/`
   - Verify with the HTML tag (paste the code in `content/site.ts → verification.google`, push, then click Verify)
   - **Sitemaps** → submit `sitemap.xml`
   - **URL Inspection** → request indexing for Home, Platform, Pricing and the 10 industry pages
4. 🔲 **Bing Webmaster Tools**
   - Sign in at bing.com/webmasters → **Import from Google Search Console** (or verify with `verification.bing`)
   - **Sitemaps** → submit `https://www.adboex.com/sitemap.xml`
   - Optional: enable IndexNow in Bing for faster indexing
5. 🔲 Add GA4 or GTM ID in `content/site.ts` (and a cookie banner via GTM if you serve EU/UK visitors; set `consentDefault: "denied"` for them).
6. 🔲 Share one page on LinkedIn/Facebook to confirm the share image appears.

## 8. Ongoing (monthly)

- 🔲 Publish 2–4 new blog posts targeting new long-tail keywords (never reuse a primary keyword)
- 🔲 Search Console → **Pages** report: fix any "Not indexed" errors; **Performance**: improve titles of pages with high impressions but low clicks
- 🔲 Update `updated:` dates on posts you refresh
- 🔲 Remove filled job openings; refresh case studies and testimonials
- 🔲 Run `npm run check` before every big change
