/**
 * SEO SETTINGS — controls the browser-tab title, Google description, keywords,
 * canonical URL and social-share image for every page on the site.
 *
 * Where it appears: <head> of each page (via lib/seo.ts → buildMetadata()),
 * the sitemap, OpenGraph/Twitter previews and the npm run seo:check report.
 *
 * Rules (checked automatically by `npm run seo:check`):
 *  - title: 50–60 characters, format "Primary Keyword | Adboex"
 *  - description: 140–160 characters, ends with a call to action
 *  - primaryKeyword: must be UNIQUE across the whole site (no two pages compete)
 *  - primaryKeyword should also appear in the page's H1, first 100 words,
 *    one H2 and (where natural) an image alt text — set those in the page's
 *    content file (/content/home.ts, /content/industries.ts, …)
 *  - ogImage: leave empty to use the auto-generated share image (opengraph-image.tsx)
 *
 * Blog posts are NOT in this file — their SEO fields live in the frontmatter
 * of each /content/posts/*.mdx file. Their keywords are listed at the bottom
 * of this file for reference so you never reuse one by accident.
 */

export type PageSeo = {
  /** URL path, lowercase, hyphenated, with trailing slash */
  path: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** optional custom share image (1200×630) in /public, e.g. "/images/og/home.jpg" */
  ogImage?: string;
  /** true = hide from Google (still crawlable, not indexed) */
  noindex?: boolean;
};

export const seo = {
  /* ============================ CORE PAGES ============================ */
  home: {
    path: "/",
    title: "AI Marketing Platform for Local Businesses | Adboex",
    description:
      "Adboex is the AI marketing platform for local businesses: local SEO, Google profile, AI search visibility and 24/7 inquiry capture. Book a free audit today.",
    primaryKeyword: "AI marketing platform for local businesses",
    secondaryKeywords: [
      "local business marketing software",
      "AI search visibility",
      "Google Business Profile automation",
      "AI receptionist for local businesses",
      "local SEO automation",
    ],
  },
  platform: {
    path: "/platform/",
    title: "All-in-One Local SEO Software With AI Tools | Adboex",
    description:
      "One all-in-one local SEO software for your website, Google profile, reviews, ads, reports and AI search. Replace 5+ tools and an agency. Book a live demo.",
    primaryKeyword: "all-in-one local SEO software",
    secondaryKeywords: [
      "generative engine optimization",
      "GMB automation software",
      "competitor analysis tool for local business",
      "AI voice assistant for business",
      "local marketing dashboard",
    ],
  },
  pricing: {
    path: "/pricing/",
    title: "Local SEO Software Pricing, Plans & Costs | Adboex",
    description:
      "Compare Adboex local SEO software pricing: three monthly plans from $285, no setup fees, no contracts, cancel anytime. See what each plan includes and start.",
    primaryKeyword: "local SEO software pricing",
    secondaryKeywords: [
      "local SEO cost per month",
      "affordable local SEO plans",
      "marketing software for small business pricing",
      "no contract SEO service",
    ],
  },
  about: {
    path: "/about-us/",
    title: "AI-Powered Local Business Growth Company Team | Adboex",
    description:
      "Meet Adboex, the AI-powered local business growth company turning agency-level marketing into software you own. Read our story, mission and values today.",
    primaryKeyword: "local business growth",
    secondaryKeywords: [
      "AI marketing company",
      "about Adboex",
      "local marketing experts",
      "marketing technology team",
    ],
  },
  careers: {
    path: "/careers/",
    title: "AI Marketing Jobs: Build the Future of Local SEO | Adboex",
    description:
      "Explore AI marketing jobs at Adboex. Remote-friendly roles in engineering, data and growth helping local businesses win online. See open positions and apply.",
    primaryKeyword: "AI marketing jobs",
    secondaryKeywords: [
      "marketing technology careers",
      "remote SaaS jobs",
      "machine learning engineer jobs",
      "Adboex careers",
    ],
  },
  caseStudies: {
    path: "/case-studies/",
    title: "Local SEO Case Studies & Real Client Results | Adboex",
    description:
      "Read local SEO case studies from HVAC, plumbing, roofing and real estate businesses that grew calls, rankings and bookings with Adboex. See the full results.",
    primaryKeyword: "local SEO case studies",
    secondaryKeywords: [
      "local marketing success stories",
      "Google Business Profile results",
      "AI search visibility results",
    ],
  },
  contact: {
    path: "/contact-us/",
    title: "Contact Our Local SEO Company Support Team | Adboex",
    description:
      "Contact the Adboex local SEO company team by phone, email or form. Real people reply fast with answers on pricing, setup and demos. Send us a message today.",
    primaryKeyword: "local SEO company",
    secondaryKeywords: [
      "Adboex phone number",
      "book a local SEO demo",
      "local marketing support",
    ],
  },
  insights: {
    path: "/insights/",
    title: "Local SEO & AI Search Marketing Blog Insights | Adboex",
    description:
      "The Adboex local SEO blog: practical guides on Google Business Profile, AI search visibility, GEO and AI receptionists for service businesses. Start reading.",
    primaryKeyword: "local SEO blog",
    secondaryKeywords: [
      "AI search marketing tips",
      "Google Business Profile guides",
      "small business marketing blog",
    ],
  },
  academy: {
    path: "/academy/",
    title: "Adboex Academy: Local SEO Video Tutorials | Adboex",
    description:
      "Free local SEO video tutorials from Adboex Academy. Learn to fix your website, manage your Google profile, track rankings and use AI tools. Watch a lesson now.",
    primaryKeyword: "local SEO video tutorials",
    secondaryKeywords: [
      "Google Business Profile tutorial",
      "Adboex training videos",
      "marketing software tutorials",
    ],
  },
  industries: {
    path: "/industries/",
    title: "Marketing Software for Service Businesses | Adboex",
    description:
      "Marketing software for service businesses: HVAC, plumbing, roofing, real estate, auto repair and more, each with local SEO and AI search built in. Find yours.",
    primaryKeyword: "marketing software for service businesses",
    secondaryKeywords: [
      "home service marketing platform",
      "contractor marketing software",
      "local service business SEO",
    ],
  },

  /* ============================ INDUSTRY PAGES ============================
     key = "industry-<slug>" — the slug must match /content/industries.ts */
  "industry-hvac": {
    path: "/industries/hvac/",
    title: "HVAC Marketing Software for More Booked Calls | Adboex",
    description:
      "HVAC marketing software that ranks you in Google Maps and AI search, answers calls 24/7 and books service jobs. Built for heating and cooling pros. Get audited.",
    primaryKeyword: "HVAC marketing software",
    secondaryKeywords: ["HVAC SEO", "HVAC lead generation", "HVAC Google Business Profile", "AI receptionist for HVAC"],
  },
  "industry-plumbing": {
    path: "/industries/plumbing/",
    title: "SEO for Plumbers: AI Marketing That Books Jobs | Adboex",
    description:
      "SEO for plumbers that gets you into the map pack and AI answers, captures emergency calls around the clock and fills your schedule. Book a free plumbing audit.",
    primaryKeyword: "SEO for plumbers",
    secondaryKeywords: ["plumber marketing", "plumbing lead generation", "emergency plumber SEO", "plumber Google reviews"],
  },
  "industry-roofing": {
    path: "/industries/roofing/",
    title: "Roofing Lead Generation AI & Local SEO Tools | Adboex",
    description:
      "Roofing lead generation AI that grows your map rankings, publishes city pages, replies to reviews and answers storm-season calls 24/7. Get a free roofing audit.",
    primaryKeyword: "roofing lead generation AI",
    secondaryKeywords: ["roofing SEO", "roofer marketing", "storm damage leads", "roofing Google Business Profile"],
  },
  "industry-remodeling": {
    path: "/industries/remodeling/",
    title: "Remodeling Contractor Marketing Software Tools | Adboex",
    description:
      "Remodeling contractor marketing software that showcases projects, ranks you locally and in AI search, and turns inquiries into consults. Book a free audit now.",
    primaryKeyword: "remodeling contractor marketing",
    secondaryKeywords: ["kitchen remodeler SEO", "bathroom remodeling leads", "home renovation marketing", "remodeler reviews"],
  },
  "industry-car-rental": {
    path: "/industries/car-rental/",
    title: "Car Rental Marketing & Local SEO Platform | Adboex",
    description:
      "Car rental marketing that puts your fleet in front of travelers on Google Maps and AI search, answers booking questions 24/7 and grows direct bookings. Start.",
    primaryKeyword: "car rental marketing",
    secondaryKeywords: ["car rental SEO", "rental car direct bookings", "car rental Google Business Profile", "vehicle rental advertising"],
  },
  "industry-real-estate": {
    path: "/industries/real-estate/",
    title: "Real Estate Local SEO for Agents and Teams | Adboex",
    description:
      "Real estate local SEO for agents and teams: neighborhood pages, Google profile posts, AI search visibility and 24/7 lead capture. Book a free real estate audit.",
    primaryKeyword: "real estate local SEO",
    secondaryKeywords: ["realtor SEO", "real estate agent marketing", "real estate lead capture", "neighborhood pages SEO"],
  },
  "industry-charter-rentals": {
    path: "/industries/charter-rentals/",
    title: "Charter Rental Marketing & Booking Growth | Adboex",
    description:
      "Charter rental marketing for boat, yacht, bus and jet charters: rank for local searches, win AI recommendations and answer booking inquiries 24/7. Get an audit.",
    primaryKeyword: "charter rental marketing",
    secondaryKeywords: ["boat charter SEO", "yacht charter marketing", "charter booking inquiries", "charter company Google reviews"],
  },
  "industry-carpet-dyeing": {
    path: "/industries/carpet-dyeing/",
    title: "Carpet Dyeing Business Marketing & Local SEO | Adboex",
    description:
      "Carpet dyeing marketing that ranks you for color repair and restoration searches, publishes service-area pages and books more estimates. Get a free audit today.",
    primaryKeyword: "carpet dyeing marketing",
    secondaryKeywords: ["carpet dyeing SEO", "carpet color repair leads", "carpet restoration marketing", "carpet cleaning upsell"],
  },
  "industry-auto-repair": {
    path: "/industries/auto-repair/",
    title: "Auto Repair Shop SEO & Marketing Software | Adboex",
    description:
      "Auto repair shop SEO that ranks your shop in Maps and AI search, replies to reviews, answers calls 24/7 and books service appointments. Get a free shop audit.",
    primaryKeyword: "auto repair shop SEO",
    secondaryKeywords: ["mechanic marketing", "auto shop Google reviews", "car repair leads", "auto repair appointment booking"],
  },
  "industry-excavation": {
    path: "/industries/excavation/",
    title: "Excavation Contractor Marketing & Local SEO | Adboex",
    description:
      "Excavation contractor marketing that wins commercial and residential bids: service-area pages, Google profile automation and 24/7 inquiry capture. Get an audit.",
    primaryKeyword: "excavation contractor marketing",
    secondaryKeywords: ["excavation SEO", "site prep contractor leads", "grading contractor marketing", "excavation company reviews"],
  },


  /* ============================ BLOG CATEGORIES ============================
     key = "category-<slug>" — the slug must match a post's `category` field */
  "category-local-seo": {
    path: "/insights/category/local-seo/",
    title: "Local SEO Guides for Local Service Businesses | Adboex",
    description:
      "Local SEO guides for service businesses: checklists, ranking factors, city pages and website fixes that help you win more nearby customers. Browse the guides.",
    primaryKeyword: "local SEO guides",
    secondaryKeywords: ["local ranking factors", "service area pages"],
  },
  "category-ai-search": {
    path: "/insights/category/ai-search/",
    title: "AI Search & GEO Articles for Local Brands | Adboex",
    description:
      "AI search and GEO articles that explain how ChatGPT, Gemini and Perplexity choose which local businesses to recommend, and how to get picked. Read the latest.",
    primaryKeyword: "AI search articles",
    secondaryKeywords: ["GEO tips", "ChatGPT local recommendations"],
  },
  "category-google-business-profile": {
    path: "/insights/category/google-business-profile/",
    title: "Google Business Profile Tips and Tutorials | Adboex",
    description:
      "Google Business Profile tips and tutorials: posts, photos, categories, reviews and map pack ranking tactics for local service businesses. Explore the articles.",
    primaryKeyword: "Google Business Profile tips",
    secondaryKeywords: ["GBP posts", "map pack ranking"],
  },
  "category-ai-tools": {
    path: "/insights/category/ai-tools/",
    title: "AI Tools for Small Business Owners Explained | Adboex",
    description:
      "AI tools for small business owners explained in plain English: receptionists, schedulers, content and video tools that save hours every week. Read the guides.",
    primaryKeyword: "AI tools for small business",
    secondaryKeywords: ["AI receptionist", "AI scheduling tool"],
  },
  "category-marketing-insights": {
    path: "/insights/category/marketing-insights/",
    title: "Marketing Insights for Small and Local Businesses | Adboex",
    description:
      "Marketing insights for small and local businesses: marketing data, AI email marketing, emotional advertising and predictive analytics, explained simply.",
    primaryKeyword: "marketing insights",
    secondaryKeywords: ["small business marketing", "marketing analytics"],
  },

  /* ============================ LEGAL PAGES ============================ */
  privacy: {
    path: "/privacy-policy/",
    title: "Privacy Policy: How We Protect Your Information | Adboex",
    description:
      "Read the Adboex privacy policy to learn what information we collect, how we use and protect it, and the choices and rights you have. Contact us with questions.",
    primaryKeyword: "privacy policy",
    secondaryKeywords: ["data privacy", "GDPR", "CCPA"],
  },
  terms: {
    path: "/terms-of-use/",
    title: "Terms of Use for the Adboex Website and Apps | Adboex",
    description:
      "Read the Adboex terms of use covering your account, subscriptions, acceptable use, intellectual property and limits of liability. Contact us with any questions.",
    primaryKeyword: "terms of use",
    secondaryKeywords: ["terms of service", "subscription terms"],
  },
  refund: {
    path: "/refund-policy/",
    title: "Refund and Cancellation Policy, Explained | Adboex",
    description:
      "Read the Adboex refund and cancellation policy: no lock-in contracts, how to cancel your subscription anytime and when refunds apply. Contact us with questions.",
    primaryKeyword: "refund policy",
    secondaryKeywords: ["cancellation policy", "subscription refund"],
  },
  security: {
    path: "/security/",
    title: "Platform Security and Responsible Disclosure | Adboex",
    description:
      "Learn how Adboex secures its platform with encryption, access controls and monitoring, and how to report a vulnerability responsibly. Read our security policy.",
    primaryKeyword: "security",
    secondaryKeywords: ["responsible disclosure", "platform security"],
  },
  dataSecurity: {
    path: "/data-security/",
    title: "Data Security: How Customer Data Is Handled | Adboex",
    description:
      "See how Adboex stores, encrypts and handles customer data, why we never sell or share leads, and how to request deletion. Read our data security commitments.",
    primaryKeyword: "data security",
    secondaryKeywords: ["customer data protection", "data deletion request"],
  },
  smsTerms: {
    path: "/sms-terms/",
    title: "Get Text Updates from Adboex | SMS Opt-In and Terms",
    description:
      "Sign up for text updates from Adboex: account updates, support and offers by SMS. Read our SMS terms, message frequency and how to opt out by replying STOP.",
    primaryKeyword: "text updates from Adboex",
    secondaryKeywords: ["SMS terms", "SMS opt out"],
  },

  /* ============================ SYSTEM PAGES ============================ */
  notFound: {
    path: "/404/",
    title: "Page Not Found: Let's Get You Back on Track | Adboex",
    description:
      "The page you were looking for has moved or no longer exists. Visit the Adboex homepage, platform, pricing or industry pages to find what you need right now.",
    primaryKeyword: "page not found",
    secondaryKeywords: [],
    noindex: true,
  },
} satisfies Record<string, PageSeo>;

export type SeoKey = keyof typeof seo;

/**
 * BLOG POST KEYWORDS (reference only — the real values are in each .mdx file).
 * Never give a new post a primary keyword already used above or below.
 *
 *  local-seo-checklist-for-service-businesses  → "local SEO checklist for service businesses"
 *  generative-engine-optimization-guide        → "generative engine optimization for local businesses"
 *  google-business-profile-optimization        → "Google Business Profile optimization"
 *  ai-receptionist-for-small-business          → "AI receptionist for small business"
 */
