/**
 * SITE SETTINGS — controls brand name, website address, logo, contact details
 * (name/address/phone — keep these identical everywhere for local SEO),
 * social links, header menu, footer, the "Book a Demo" popup text,
 * Google/Bing verification codes and analytics IDs.
 *
 * Where it appears: header, footer, demo popup, contact page, all structured
 * data (schema) and every page's <head>.
 *
 * Anything marked REPLACE is placeholder text — swap in your real details.
 */

/** Your live website address — no trailing slash. The non-www/www version redirects here (next.config.ts). */
export const SITE_URL = "https://www.adboex.com";

export const site = {
  /* ---------- Brand ---------- */
  name: "Adboex",
  legalName: "Adboex Inc.", // REPLACE with your registered company name
  tagline: "Get found. Get chosen. Get booked.",
  shortDescription:
    "Adboex is the AI operating system for local business visibility and growth — one platform for your website, Google Business Profile, AI search visibility and customer inquiries.",
  foundingYear: "2024", // REPLACE
  logo: {
    src: "/images/brand/logo-white.png", // white logo for the dark site (692×256 file)
    dark: "/images/brand/logo-dark.png", // black logo — used for Google (schema) on white backgrounds
    width: 108, // display size in the header — keep the 692:256 ratio
    height: 40,
    alt: "Adboex",
  },

  /* ---------- Contact details (NAP) — used in footer, contact page and schema ---------- */
  email: "info@adboex.com",
  phone: { display: "+1 727-662-9119", tel: "+17276629119" },
  address: {
    street: "7901 4th St N",
    city: "St. Petersburg",
    region: "FL",
    postalCode: "33702",
    country: "US",
  },
  hours: "Mo-Fr 09:00-18:00", // schema format; shown on the contact page
  hoursDisplay: "Monday – Friday, 9am – 6pm ET",

  /* ---------- Social profiles (also used in Organization schema "sameAs") ---------- */
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/adboex", icon: "facebook" },
    { name: "Instagram", href: "https://www.instagram.com/adboex.official/", icon: "instagram" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/adboex", icon: "linkedin" },
  ],

  /* ---------- Header menu ----------
     Every link here is a real <a href> in the page HTML (crawlable).
     Keep URLs lowercase with a trailing slash. */
  nav: {
    about: {
      label: "About Us",
      items: [
        { label: "About Us", href: "/about-us/", description: "Our mission, story and team" },
        { label: "Careers", href: "/careers/", description: "Build AI for local businesses" },
        { label: "Case Studies", href: "/case-studies/", description: "Real results from real clients" },
      ],
    },
    platform: { label: "Platform", href: "/platform/" },
    industries: {
      label: "Industries",
      heading: "Industries",
      tagline: "Smart AI visibility and 24/7 inquiry capture for every local service industry.",
      image: "/images/brand/orb.webp", // spinning orb in the mega menu card (decorative)
      allLabel: "View all industries",
      allHref: "/industries/",
      cta: "Book a Live Demo",
      items: [
        { label: "HVAC", href: "/industries/hvac/" },
        { label: "Plumbers", href: "/industries/plumbing/" },
        { label: "Roofers", href: "/industries/roofing/" },
        { label: "Remodelers", href: "/industries/remodeling/" },
        { label: "Car Rentals", href: "/industries/car-rental/" },
        { label: "Real Estate", href: "/industries/real-estate/" },
        { label: "Charter Rentals", href: "/industries/charter-rentals/" },
        { label: "Carpet Dyeing", href: "/industries/carpet-dyeing/" },
        { label: "Auto Repair", href: "/industries/auto-repair/" },
        { label: "Excavation", href: "/industries/excavation/" },
      ],
    },
    resources: {
      label: "Resources",
      items: [
        { label: "Insights", href: "/insights/", description: "Local SEO and AI search guides" },
        { label: "Academy", href: "/academy/", description: "Short video lessons" },
      ],
    },
    pricing: { label: "Pricing", href: "/pricing/" },
    contact: { label: "Contact Us", href: "/contact-us/" },
    cta: "Book a Live Demo",
  },

  /* ---------- Footer ---------- */
  footer: {
    tagline: "The AI operating system for local business visibility.",
    description:
      "Adboex helps local businesses improve visibility across websites, Google profiles, reviews, content and AI search experiences, all from one connected system.",
    dataNote: "Adboex is a software platform for local businesses. We do not sell, buy or share leads or customer data.",
    followLabel: "Follow Us",
    copyright: "2026 © Adboex. All rights reserved.",
    columns: [
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about-us/" },
          { label: "Careers", href: "/careers/" },
          { label: "Pricing", href: "/pricing/" },
          { label: "Case Studies", href: "/case-studies/" },
          { label: "Contact Us", href: "/contact-us/" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "Adboex Platform", href: "/platform/" },
          { label: "Industries", href: "/industries/" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Adboex Insights", href: "/insights/" },
          { label: "Adboex Academy", href: "/academy/" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy-policy/" },
          { label: "Security", href: "/security/" },
          { label: "Terms of Use", href: "/terms-of-use/" },
          { label: "Refund Policy", href: "/refund-policy/" },
          { label: "Data Security", href: "/data-security/" },
        ],
      },
    ],
    bottomLinks: [
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Terms of Use", href: "/terms-of-use/" },
      { label: "SMS / Text Updates", href: "/sms-terms/" },
    ],
  },

  /* ---------- "Book a Demo" popup (opens from every demo/audit button) ---------- */
  demoPopup: {
    heading: "See what's holding your business back online.",
    subtext:
      "Book a free live visibility audit. We review your website, Google Business Profile, local search rankings and AI discovery with you — in real time.",
    bullets: [
      "A live review of your entire online presence",
      "Your visibility gaps, ranked by impact",
      "Practical next steps you can act on today",
    ],
    reassurance: "No pressure, no hard sell — just a clear picture of where you stand.",
    industries: [
      "HVAC", "Plumbing", "Roofing", "Remodeling", "Car Rental", "Real Estate",
      "Charter Rentals", "Carpet Dyeing", "Auto Repair", "Excavation",
      "Dental", "Chiropractic", "Other",
    ],
    smsConsent:
      "I agree to receive SMS and email messages from Adboex about my audit and services. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.",
    submit: "Book My Free Audit",
    sending: "Sending…",
    success: "Thanks! We'll be in touch within one business day to schedule your audit.",
    error: "Something went wrong. Please try again or email us directly.",
  },

  /* ---------- Floating assistant pill (bottom-right) ---------- */
  assistant: {
    enabled: true,
    label: "Talk to Max, our AI assistant", // read by screen readers
    eyebrow: "AI assistant", // small grey text above the name
    name: "Talk to Max",
    avatar: "/images/brand/orb.webp", // round glowing avatar (spins)
  },

  /* ---------- Search engine verification (paste only the code, not the whole tag) ---------- */
  verification: {
    google: "", // Google Search Console → HTML tag → content="THIS PART"
    bing: "", // Bing Webmaster Tools → meta tag msvalidate.01 → content="THIS PART"
  },

  /* ---------- Analytics (leave empty to disable) ---------- */
  analytics: {
    ga4Id: "", // e.g. "G-XXXXXXXXXX"
    gtmId: "", // e.g. "GTM-XXXXXXX" (use either GA4 or GTM, not both)
    /** Google Consent Mode default before the visitor chooses. "denied" is stricter (EU/UK). */
    consentDefault: "granted" as "granted" | "denied",
  },

  /* ---------- Crawlers (robots.txt) ----------
     allowAiCrawlers: true lets AI search engines read the site so they can
     recommend Adboex (GEO). Set false to block the bots listed below. */
  crawlers: {
    allowAiCrawlers: true,
    aiBots: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Applebot-Extended", "CCBot"],
    disallow: ["/api/"],
  },

  /* ---------- Structured data switches ---------- */
  schema: {
    /** Set to false to remove the star rating from SoftwareApplication schema */
    showAggregateRating: true,
    ratingValue: "4.9",
    ratingCount: "400",
  },
};

export type NavLink = { label: string; href: string; description?: string };
