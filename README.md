# Adboex Website

Marketing website for **Adboex**, the AI operating system for local business visibility.
Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion and Radix UI.
Hosted on **Hostinger Node.js Web Apps** with automatic **Deploy from Git**.

> 👉 Not a developer? Read **[EDITING_GUIDE.md](EDITING_GUIDE.md)** — it explains every change in plain English.
> SEO launch steps are in **[SEO_CHECKLIST.md](SEO_CHECKLIST.md)**.

## Quick start

```bash
npm install          # once
npm run dev          # preview at http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local preview with live reload |
| `npm run build` | Production build (Hostinger runs this) |
| `npm run start` | Start the production server (Hostinger runs this) |
| `npm run lint` | Code style check |
| `npm run seo:check` | Clean build + SEO check of every page (fails on errors) |
| `npm run seo:report` | SEO check of the last build, without rebuilding |
| `npm run check` | Lint + `seo:check` (what GitHub runs on every push) |
| `npm run placeholders` | Create missing placeholder images (never overwrites) |
| `npm run icons` | Rebuild favicon and app icons from `scripts/make-icons.mjs` |

## Where things live

```
content/        ← ALL text, prices, FAQs, SEO, menus (edit these)
  site.ts         brand, contact details, menus, footer, popup, analytics
  seo.ts          title / description / keywords for every page
  home.ts, platform.ts, about.ts, pricing.ts, industries.ts, careers.ts,
  case-studies.ts, academy.ts, contact.ts, legal.ts, faqs.ts,
  testimonials.ts, blog.ts, animations.ts
  posts/*.mdx     blog posts
styles/theme.css  colours, gradient, radius, font sizes
public/images/    images (replace a file = upload one with the same name)
app/              pages and routes (sitemap, robots, llms.txt, rss.xml, /api/contact)
components/       reusable building blocks
lib/              SEO helpers, schema, blog loader
scripts/          seo-check, placeholders, icons
```

## Deployment

Push to `main` → Hostinger pulls from GitHub, runs `npm run build`, and restarts the app.
GitHub Actions (`.github/workflows/check.yml`) runs `npm run check` on every push and pull request.

Environment variables (set in Hostinger, see `.env.example`):
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, optional `CONTACT_FROM`.

## Tech notes

- Every page is pre-rendered at build time (static HTML) for speed and SEO; the Node server adds image optimisation, `/api/contact`, headers and redirects.
- Security headers, caching and the www redirect are in `next.config.ts`.
- Animations respect `prefers-reduced-motion`; scroll reveals never hide content from crawlers.
- Structured data: Organization, WebSite, SoftwareApplication, Product/Offer, FAQPage, BreadcrumbList, Service, BlogPosting, Article, JobPosting, VideoObject, ContactPage.
