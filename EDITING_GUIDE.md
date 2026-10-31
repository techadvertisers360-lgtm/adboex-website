# Adboex Website — Editing Guide

This guide is written for non-developers. You will mostly edit **text files in the `content/` folder** — you never need to touch the design code.

**Golden rules**

1. Change only the text **between the quotes** `"like this"`. Keep the quotes, commas and brackets.
2. If your text contains a double quote, use a curly one (“ ”) or an apostrophe instead.
3. After editing, preview with `npm run dev` before pushing.
4. Each content file starts with a comment explaining what it controls — read it first.

---

## Table of contents

1. [Tools you need (one time)](#1-tools-you-need-one-time)
2. [Preview the site on your computer](#2-preview-the-site-on-your-computer)
3. [Where to change things](#3-where-to-change-things)
4. [Images](#4-images)
5. [Adding new things](#5-adding-new-things)
6. [SEO rules when editing](#6-seo-rules-when-editing)
7. [Git one-time setup](#7-git-one-time-setup)
8. [Hostinger one-time setup (Deploy from Git)](#8-hostinger-one-time-setup-deploy-from-git)
9. [Your daily workflow](#9-your-daily-workflow)
10. [Undo a bad change](#10-undo-a-bad-change)
11. [If a deploy fails](#11-if-a-deploy-fails)
12. [SSL, Google Search Console and Bing](#12-ssl-google-search-console-and-bing)
13. [Ready-to-use prompts for AI helpers](#13-ready-to-use-prompts-for-ai-helpers)

---

## 1. Tools you need (one time)

| Tool | Why | Get it |
|---|---|---|
| **Node.js 20 or newer** | Runs the website on your computer | nodejs.org → "LTS" version |
| **Git** | Sends your changes to GitHub | git-scm.com |
| **VS Code** (recommended) | Easy text editor with a built-in terminal | code.visualstudio.com |
| **GitHub account** | Stores the website code | github.com |

Open the project folder in VS Code, then open the terminal with **Terminal → New Terminal**. All commands below are typed there.

---

## 2. Preview the site on your computer

```bash
npm install        # first time only (or after someone adds a package)
npm run dev
```

Open **http://localhost:3000** in your browser. Every time you save a file, the page refreshes automatically. Press `Ctrl + C` in the terminal to stop.

> Forms don't send real emails locally unless you create a `.env.local` file (copy `.env.example` and fill in the values). That's optional — they work on the live site once Hostinger has the email settings.

**Before pushing a big change**, run the full check (the same one GitHub runs):

```bash
npm run check
```

It ends with **✔ All checks passed** or a list of **✖ errors** to fix.

> ⚠️ **Stop `npm run dev` (Ctrl + C) before running `npm run check` or `npm run build`.** Both use the same `.next` folder; running them at the same time breaks both with errors like "Cannot find module … vendor-chunks" or "Internal Server Error". If that happens: stop everything, run `npm run clean`, then start again.

---

## 3. Where to change things

### Brand, logo and contact details

| What | File | Field |
|---|---|---|
| Brand name | `content/site.ts` | `name`, `legalName` |
| Website address | `content/site.ts` | `SITE_URL` (e.g. `"https://www.adboex.com"`, no slash at the end) |
| Logo | `public/images/brand/logo-white.png` (white logo for the dark site) and `logo-dark.png` (black, used by Google) | Replace the files, keep the names. If the shape changes, update `logo.width` / `logo.height` in `content/site.ts` (keep the same ratio). |
| Email, phone, address, hours | `content/site.ts` | `email`, `phone`, `address`, `hours`, `hoursDisplay` |
| Social links | `content/site.ts` | `socials` |
| Footer text and links | `content/site.ts` | `footer` |
| Header menu | `content/site.ts` | `nav` |
| "Book a Demo" popup text | `content/site.ts` | `demoPopup` |
| "Talk to Max" floating button | `content/site.ts` | `assistant` (`enabled: false` hides it) |
| Google Analytics / Tag Manager | `content/site.ts` | `analytics.ga4Id` or `analytics.gtmId` |
| Search Console / Bing verification | `content/site.ts` | `verification.google`, `verification.bing` |
| Star rating in Google results | `content/site.ts` | `schema.showAggregateRating` (`false` to remove) |
| AI crawlers (ChatGPT, Perplexity …) | `content/site.ts` | `crawlers.allowAiCrawlers` |

> **Keep your name, address and phone (NAP) identical** to your Google Business Profile — it's a local SEO signal. They appear in the footer, contact page and schema automatically from `content/site.ts`.

### Contact email (where form messages go)

Form messages are emailed by the server using environment variables — **not** a file in the code:

- **On the live site:** Hostinger hPanel → your website → **Environment variables** → change `CONTACT_TO` (and `SMTP_USER` / `SMTP_PASS` if you use a different mailbox) → redeploy.
- **On your computer:** the same names in `.env.local`.

### Colours, gradient, corners and font

All in **`styles/theme.css`** — every line has a comment.

- Accent colours: `--color-accent` (lime) and `--color-accent-2` (blue)
- Button / highlight gradient: `--gradient-brand` and `--gradient-text`
- Background and card colours: `--color-bg`, `--color-surface`
- Corner roundness: `--radius-card`, `--radius-button`
- Text sizes: `--text-display` (big headlines), `--text-h2` …

**Font:** open `app/layout.tsx`, find `Plus_Jakarta_Sans` and replace it with another Google font name (e.g. `Inter`) in both places. Keep the `variable: "--font-jakarta"` line as it is.

### Animations

`content/animations.ts` — turn the preloader on/off, change marquee speed (higher number = slower), reveal duration and count-up speed.

### Page text

| Page | File |
|---|---|
| Home | `content/home.ts` |
| Platform | `content/platform.ts` |
| Pricing (plans, prices, comparison table) | `content/pricing.ts` |
| Industries hub + all 10 industry pages | `content/industries.ts` |
| About | `content/about.ts` |
| Careers and job openings | `content/careers.ts` |
| Case studies | `content/case-studies.ts` |
| Academy videos | `content/academy.ts` |
| Contact page | `content/contact.ts` |
| Privacy, Terms, Refund, Security, Data Security, SMS Terms | `content/legal.ts` |
| FAQs (home, platform, pricing) | `content/faqs.ts` |
| Testimonials | `content/testimonials.ts` |
| Blog page text, categories, authors | `content/blog.ts` |
| Blog posts | `content/posts/*.mdx` |

### Section order on a page

At the top of `home.ts`, `platform.ts` and `about.ts` there is a list like:

```ts
export const homeSections = [
  "hero",
  "dashboardMarquee",
  // "pressLogos",   ← add // in front to hide a section
  "about",
  ...
```

Move a line up/down to reorder; put `//` in front to hide it.

### SEO titles, descriptions and keywords

All in **`content/seo.ts`** — one block per page:

```ts
pricing: {
  path: "/pricing/",
  title: "Local SEO Software Pricing, Plans & Costs | Adboex",   // 50–60 characters
  description: "Compare Adboex local SEO software pricing: …",       // 140–160 characters
  primaryKeyword: "local SEO software pricing",                  // unique to this page
  secondaryKeywords: ["local SEO cost per month", …],
},
```

Blog post SEO lives at the top of each `.mdx` file (see [Add a blog post](#add-a-blog-post)).

### Prices

`content/pricing.ts` → `plans`. Change `price` (number, no `$`), `oldPrice` (crossed-out price, or `null`), `features`, `tagline`. The yearly price is calculated from `yearlyDiscount` (`0.2` = 20% off; `0` hides the yearly toggle). The comparison table is `pricingPage.comparison.rows` — `true` = ✓, `false` = —, or short text like `"Weekly"`.

### FAQs and testimonials

- FAQs: `content/faqs.ts` (industry FAQs are inside each industry in `content/industries.ts`). Keep answers 1–3 plain sentences — they also appear in Google as FAQ data.
- Testimonials: `content/testimonials.ts`. `short` shows on the card, `full` in the popup. ⚠️ **Only publish real, approved testimonials.**

---

## 4. Images

All images are in **`public/images/`**, in folders named after where they appear:

| Folder | Used on |
|---|---|
| `brand/` | Logo |
| `marquee/` | Home dashboard screenshot strip (square, 800×800) |
| `press/` | "As seen on" logos |
| `tech-logos/` | Technology logo strip |
| `services/` | Home services tabs (1216×974) |
| `features/` | Home feature cards (1200×720) |
| `platform/` | Platform page blocks (1216×974), Max phone (760×1080) |
| `industries/` | Industry cards (1200×750) |
| `blog/` | Blog post covers (1200×630) |
| `case-studies/` | Case study covers (1200×630) |
| `testimonials/` | Client photos and avatars (square) |
| `team/` | Team photos (square, 600×600) and blog author photo |
| `about/`, `careers/` | About and Careers images |
| `academy/` | Video thumbnails (1280×720) |
| `badges/` | App Store / Google Play badges |
| `hero/` | Background orb image |

**To replace an image:** upload your file with **exactly the same name and extension** (e.g. `dashboard-01.webp`). Use the same shape (aspect ratio) as listed. The site converts images to fast AVIF/WebP automatically — you can upload JPG, PNG or WebP, but if you change the extension, update the path in the content file too.

**Alt text** (the description Google and screen readers use) is set next to each image in the content files, e.g. `alt: "Website health score with one-click SEO fixes"`. Describe what the image shows; include a keyword only if natural.

**Missing images?** Run `npm run placeholders` — it creates grey "replace me" images for anything missing and never overwrites your real ones.

**Temporary demo photos.** Right now most photos are free placeholders from Unsplash (people, trades, offices) and logos from Simple Icons, downloaded by `npm run demo-images`. Replace them with your own photos (same file names) before launch. `npm run demo-images` only replaces grey placeholders; `npm run demo-images -- --force` re-downloads the whole list.

**Animated product scenes.** The moving "dashboard" visuals inside cards (Home services/features/mobile app, Platform rows, Max phone) are built in code — no image needed. Each card has `visual: "search" | "website" | "gbp" | "analytics" | "receptionist" | "mobile" | "outreach" | "competitors"` in its content file. To use your own looping video instead, add `video: "/videos/your-file.mp4"` (put the file in `public/videos/`).

**Globe section** ("Our presence" on Home and About): a 3D network globe (three.js). Offices, cities, marker positions, arcs and pills: `content/presence.ts`. Colours, node count (desktop/mobile), network shape, hubs, tilt and start position: `content/globe.ts`. Speed: `content/animations.ts` → `globeSpeed`. After changing any of these, run `npm run globe-image` to refresh the still image shown before the 3D globe loads.

**Entrance animations** (like the reference site): in any page you can wrap content in `<Reveal effect="zoom">`, `effect="left"` or `effect="right"`.

**Share images** (the preview when a page is shared on Facebook/LinkedIn/X) are generated automatically from each page's title. To use a custom one, add `ogImage: "/images/og/your-image.jpg"` (1200×630) to that page in `content/seo.ts`.

**Favicon / app icon:** edit the SVG in `scripts/make-icons.mjs` and run `npm run icons`.

---

## 5. Adding new things

### Add an industry page

1. In `content/industries.ts`, copy a whole industry block (from `{` to `},`) and paste it below the last one.
2. Change `slug` (lowercase-with-dashes, e.g. `"pest-control"`), `name`, `plural`, `serviceType` and **all** the text. Write genuinely new text — at least ~600 words of unique content.
3. Put the page keyword in `hero.heading` (this becomes the H1).
4. In `content/seo.ts`, add a block named `"industry-pest-control"` with the path `/industries/pest-control/`, a unique title, description and primary keyword.
5. In `content/site.ts`, add the link to `nav.industries.items` and to the footer "Solutions" column.
6. Add an image `public/images/industries/pest-control.webp` (or run `npm run placeholders` after adding it to the script list).
7. Run `npm run check`.

### Add a blog post

1. Copy any file in `content/posts/` and rename it, e.g. `hvac-maintenance-plans.mdx` (the file name becomes the web address).
2. Edit the top section (frontmatter):

```yaml
---
title: "The full headline shown on the page (this is the H1)"
seoTitle: "Shorter Title for Google, 50–60 characters | Adboex"
description: "140–160 character summary with the keyword and a call to action."
slug: "hvac-maintenance-plans"
date: "2026-11-15"
updated: "2026-11-15"
category: "local-seo"          # local-seo, ai-search, google-business-profile or ai-tools
keywords: ["primary keyword first", "secondary keyword", "another one"]
image: "/images/blog/hvac-maintenance-plans.webp"
imageAlt: "What the cover image shows"
excerpt: "One or two sentences shown on the blog card."
author: "adboex-team"
---
```

3. Write the article below the second `---` using Markdown:
   - `## Heading` for main sections (H2) and `### Sub-heading` for sub-sections (H3). **Never use a single `#`** — the title is already the H1.
   - Links: `[descriptive anchor text](/platform/)` — link to 2–3 related posts and 1–2 product or industry pages.
   - Avoid the characters `<` and `{` in plain text (they have special meaning in MDX).
4. Add the cover image (1200×630) to `public/images/blog/`.
5. The table of contents, reading time, sitemap, RSS feed and related posts update automatically.

### Add a case study

Copy a block in `content/case-studies.ts`, change the `slug` and text, set `sample: false` for real results, add an SEO block `"case-<slug>"` in `content/seo.ts`, and add `public/images/case-studies/<slug>.webp`.

### Add a job opening

Copy a block in `content/careers.ts` → `openings`. Give it a unique `id`, set `datePosted` and `validThrough` (YYYY-MM-DD) and the salary (or `salary: null`). **Delete jobs once filled** — expired job postings hurt you in Google for Jobs.

### Add or change a pricing plan

In `content/pricing.ts`, copy a plan block, give it a unique `id`, and add one more value to **every** row of `pricingPage.comparison.rows` (one value per plan, in the same order).

### Add an Academy video

In `content/academy.ts`, paste the YouTube video ID (the part after `v=` in the link) into `youtubeId`. Lessons without an ID show "Coming soon".

---

## 6. SEO rules when editing

- **One H1 per page.** The H1 comes from the hero heading in each content file. Don't add another.
- **Titles 50–60 characters, descriptions 140–160 characters**, all unique. End descriptions with a call to action.
- **One primary keyword per page**, never reused on another page. Put it in the title, description, H1, first paragraph, one section heading and (if natural) an image alt text.
- **Headings in order:** H2 → H3 → H4, never skipping levels.
- **Alt text** on every meaningful image; decorative images use `alt: ""`.
- **Descriptive links** — "see our Google Business Profile guide", never "click here".
- **Unique, useful content** — don't copy text between industry pages or posts.
- **Web addresses** stay short, lowercase and hyphenated. If you ever change one, add a redirect from the old address in `next.config.ts` → `redirects()`.
- Run `npm run check` — it catches most mistakes automatically.

---

## 7. Git one-time setup

1. Install Git, then tell it who you are:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```
2. On github.com click **New repository** → name it `adboex-website` → **Private** → don't add a README → **Create repository**.
3. In the project folder terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial Adboex website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/adboex-website.git
   git push -u origin main
   ```
   The first push asks you to sign in to GitHub in the browser.

> Never commit passwords. `.env.local` is ignored automatically; only `.env.example` (with no real values) is shared.

---

## 8. Hostinger one-time setup (Deploy from Git)

### a) Create a mailbox for the forms

hPanel → **Emails** → create a mailbox such as `hello@adboex.com`. Note its password — the website uses it to send form messages. (SMTP server: `smtp.hostinger.com`, port `465`.)

### b) Create the Node.js app

1. hPanel → **Websites** → **Create / Add website** → choose **Node.js Web App** (Deploy from Git).
2. Click **Connect with GitHub**, approve access, then choose the **adboex-website** repository and the **main** branch.
3. Confirm the settings Hostinger detects (Next.js):
   - **Node.js version:** 20 (or newer)
   - **Install command:** `npm ci` (or `npm install`)
   - **Build command:** `npm run build`
   - **Start command:** `npm run start`
4. Add **Environment variables** (from `.env.example`):

   | Name | Value |
   |---|---|
   | `SMTP_HOST` | `smtp.hostinger.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_USER` | your mailbox, e.g. `hello@adboex.com` |
   | `SMTP_PASS` | that mailbox's password |
   | `CONTACT_TO` | where form messages should arrive |
   | `CONTACT_FROM` | (optional) sender address — must be a mailbox you own |

5. Click **Deploy** and wait for it to finish (a few minutes the first time).

### c) Connect your domain

1. In the website's dashboard, **Connect domain** → `adboex.com`. If the domain is registered elsewhere, point its DNS to Hostinger as shown on screen.
2. Make sure **both** `adboex.com` and `www.adboex.com` reach the app. The site automatically redirects the non-www version to `https://www.adboex.com` (set by `SITE_URL` in `content/site.ts`). If you'd rather use the version without www, change `SITE_URL` to `https://adboex.com` — the redirect flips automatically.

---

## 9. Your daily workflow

```bash
# 1. edit files in content/ (or images in public/images/)
npm run dev                        # 2. preview at http://localhost:3000
git add .                          # 3. stage your changes
git commit -m "Update home hero text"   # 4. describe what you changed
git push                           # 5. send to GitHub
```

Then:

- **Hostinger** notices the push, rebuilds and restarts the site automatically. Check progress in hPanel → your website → **Deployment details**. The change is usually live within a few minutes.
- **GitHub** runs the quality check: open your repository → **Actions** tab → a green ✔ means everything passed; a red ✖ means something needs fixing (see section 11).

### For big changes: use a branch and pull request

```bash
git checkout -b new-pricing        # work on a separate branch
# …edit, commit…
git push -u origin new-pricing
```

On GitHub click **Compare & pull request**. The check runs on the pull request; when it's green, click **Merge** — only then does Hostinger deploy it.

---

## 10. Undo a bad change

```bash
git log --oneline                 # find the commit (e.g. a1b2c3d Update pricing)
git revert a1b2c3d                # creates a new commit that undoes it
git push                          # Hostinger redeploys the fixed version
```

Not committed yet? `git restore path/to/file` throws away unsaved edits to that file.

---

## 11. If a deploy fails

**Hostinger deployment failed** (site keeps the previous version):

1. hPanel → your website → **Deployment details** → open the latest deployment → read the **build log** from the bottom up; the first red error line is the real problem.
2. Common causes:
   - **Missing environment variables** → forms show "Email is not configured yet". Add them (section 8b) and redeploy.
   - **Typo in a content file** (missing quote, comma or bracket) → the log names the file and line. Fix and push again.
   - **Wrong Node version** → set Node 20 or newer.
   - **Image path wrong** → check the file name and extension match exactly (capital letters matter on the server).

**GitHub check failed** (red ✖ in the Actions tab):

1. Open the failed run → click **Lint, build and SEO check** → expand the red step.
2. The SEO check lists problems with ✖, for example:
   - `title is 63 chars (50–60)` → shorten the title in `content/seo.ts` (or the post's `seoTitle`).
   - `has 2 <h1> tags` → you added a second H1; use `##` instead.
   - `Broken link /industries/pest-control/` → the page doesn't exist; fix the link.
   - `Duplicate primary keyword` → choose a different keyword for one of the pages.
3. Fix, commit, push — the check runs again.

Run `npm run check` on your computer to see the same report before pushing.

---

## 12. SSL, Google Search Console and Bing

### SSL (https)

hPanel → **Security → SSL** → make sure the free SSL is **Active** for `adboex.com` and `www.adboex.com`, and turn on **Force HTTPS**. The site also sends an HSTS header so browsers always use https.

### Google Search Console

1. Go to search.google.com/search-console → **Add property** → **URL prefix** → `https://www.adboex.com/`.
2. Choose **HTML tag**, copy only the code inside `content="…"`, paste it into `content/site.ts` → `verification.google`, push, wait for the deploy, then click **Verify**.
3. Left menu **Sitemaps** → enter `sitemap.xml` → **Submit**.
4. Use **URL Inspection** on your home page and a few key pages → **Request indexing**.

### Bing Webmaster Tools

1. Go to bing.com/webmasters → **Import from Google Search Console** (easiest), or add the site manually.
2. If manual: choose the meta tag option, paste the code into `verification.bing`, push, then verify.
3. **Sitemaps** → submit `https://www.adboex.com/sitemap.xml`.

---

## 13. Ready-to-use prompts for AI helpers

Copy one of these into Claude Code (or another AI coding assistant) opened in this project:

- “In `/content/home.ts` change the hero heading to ___ and keep the primary keyword from `/content/seo.ts` in it.”
- “Write a new SEO-optimized blog post in `/content/posts/` targeting the keyword ___. Follow the frontmatter format of the existing posts, 1,200+ words, H2/H3 structure, link to 2–3 related posts and the most relevant industry page, then run `npm run check`.”
- “Replace the pricing plans in `/content/pricing.ts` with ___ and update the comparison table rows to match.”
- “Add a new section to the Home page after testimonials that ___. Put all its text in `/content/home.ts`, add it to `homeSections`, and match the existing design.”
- “Change the brand gradient in `/styles/theme.css` to ___ and make sure button text still meets WCAG AA contrast.”
- “Add a new industry page for ___ following the instructions at the top of `/content/industries.ts`, with unique copy, an SEO entry, menu and footer links.”
- “Add a job opening to `/content/careers.ts` for ___ (location ___, salary ___).”
- “Update my phone number and address everywhere to ___.” (→ `content/site.ts`)
- “Run `npm run check` and fix any SEO errors it reports.”
- “Swap the accent colours to match my logo (blue #2B8CF0 to magenta #E80B8C) in `/styles/theme.css`.”
