/**
 * PLATFORM PAGE — controls every heading, paragraph, step, feature block,
 * Max assistant card, stat and button on /platform/, in page order.
 *
 * SECTION ORDER: the `platformSections` list. Delete/move a line to remove/reorder.
 * SEO keyword: "all-in-one local SEO software" — keep it in hero.heading,
 * hero.text and at least one section heading.
 * FAQs for this page live in /content/faqs.ts → platform.
 */
import type { FeatureRow } from "@/components/sections/shared/FeatureRows";
import type { Stat } from "@/components/sections/shared/StatsGrid";

export const platformSections = [
  "hero",
  "slider",
  "features",
  "tech",
  "max",
  "aiHuman",
  "stats",
  "faq",
  "cta",
] as const;

export const platform = {
  /* ---------- Hero ---------- */
  hero: {
    pill: "Adboex Solutions",
    heading: "Earn More and Spend Less With All-in-One Local SEO Software",
    highlight: ["All-in-One"],
    text:
      "Adboex is all-in-one local SEO software and an AI operating system for local businesses. It connects your website and Google Business Profile, then automates optimization, content, reviews, reporting and customer inquiries, replacing five or more tools and the agency that manages them.",
    cta: "Book a Live Demo",
    // Optional looping background video behind the hero (muted). e.g. "/videos/adboex-demo.mp4"
    backgroundVideo: "",
  },

  /* ---------- Card slider (reference: "Enjoy the Compounding Growth") ----------
     Cards scroll sideways with the ← → buttons (or swipe on phones). */
  slider: {
    pill: "How to get started",
    heading: "Enjoy the compounding growth",
    text: "Adboex brings clarity, control and growth. Connect once, then track what matters, fix what is broken and act on insights that move the needle.",
    cards: [
      { icon: "map", title: "GMB Automation", text: "Automate your whole Google Business Profile, from scheduled weekly posts to AI review replies that build trust around the clock. Stay visible, credible and ahead of nearby competitors." },
      { icon: "trending", title: "Performance Reporting", text: "Know what is working without asking. Traffic, calls, clicks and inquiries land in one plain-English dashboard. You run the business; we handle the numbers." },
      { icon: "send", title: "PR Distribution + Email Campaigns", text: "Distribute press releases, send seasonal email campaigns and build authority from one dashboard, so your message reaches further with zero hassle." },
      { icon: "link", title: "Link everything once", text: "Connect your website and Google Business Profile in under 10 minutes. No code, no shared passwords, no technical knowledge needed." },
      { icon: "zap", title: "Automation kicks in", text: "Adboex audits your presence, fixes website errors, schedules posts, replies to reviews and starts answering calls and chats 24/7." },
      { icon: "trending", title: "Results start rolling", text: "Watch rankings, AI visibility, calls and inquiries grow in one dashboard. Most businesses see momentum build over 60 to 90 days." },
    ],
  },

  /* ---------- Feature rows (text + animated scene, sides alternate) ----------
     visual: "search" | "website" | "gbp" | "analytics" | "receptionist" | "mobile" | "outreach" | "competitors"
     (or set image: { src, alt } instead of visual to show a picture) */
  features: {
    pill: "Everything in one platform",
    heading: "Every local SEO tool you need, working as one system",
    rows: [
      {
        id: "geo",
        pill: "GEO",
        title: "Generative engine optimization for ChatGPT, Gemini and Perplexity",
        text: "When customers ask AI for the best business near them, Adboex shows whether you are recommended, who appears instead, and improves the signals AI engines use to choose.",
        bullets: ["AI visibility tracked across major engines", "Competitor mentions compared side by side", "Content and citations strengthened automatically"],
        link: { label: "Read our GEO guide for local businesses", href: "/insights/generative-engine-optimization-guide/" },
        visual: "search",
      },
      {
        id: "web-autopilot",
        pill: "Website Optimization",
        title: "Put the web on autopilot",
        text: "The Adboex WordPress plugin handles meta tags, schema, sitemaps and site health, and publishes AI-written service and city pages so you rank across your entire service area.",
        bullets: ["Errors found and fixed in one click", "Service pages and city pages published for you", "Fix your website from your phone"],
        cta: "Optimize My Website",
        visual: "website",
      },
      {
        id: "competitor-analysis",
        pill: "Competitor Analysis",
        title: "In-depth competitor analysis",
        text: "See who ranks near you, which keywords they win, how their reviews compare and exactly where you stand, so every move you make is informed.",
        bullets: ["Nearby competitors mapped by ranking", "Keyword gaps you can close fast", "Live competitor tracking in the mobile app"],
        link: { label: "See how it works for HVAC companies", href: "/industries/hvac/" },
        visual: "competitors",
      },
    ] satisfies FeatureRow[],
  },

  /* ---------- Technology marquee (logos come from /content/home.ts → techMarquee) ---------- */

  /* ---------- Talk to Max (5 cards) ---------- */
  max: {
    pill: "Activated AI assistant",
    heading: "Talk to Max, your voice-activated AI assistant",
    text: "Max lives in the Adboex mobile app for iOS and Android. Ask a question out loud and Max answers with your real numbers, then takes action for you.",
    visual: "mobile" as const, // animated phone scene (or set phone image instead)
    cards: [
      { icon: "mic", title: "Built-in Voice Assistant", text: "Ask “How many calls did we get this week?” or “Post a winter special” and Max handles it hands-free." },
      { icon: "swords", title: "Weigh Your Competition", text: "Live competitor tracking shows who moved up, who got new reviews and where you can pull ahead." },
      { icon: "receipt", title: "On-the-go Invoicing", text: "Create and send invoices from the job site and get paid faster, without going back to the office." },
      { icon: "clapperboard", title: "AI Video Studio", text: "Turn photos into short promo videos with voiceover and your branding, ready for social media in minutes." },
      { icon: "calendar", title: "AI Scheduler", text: "Book appointments from calls and chats straight into your calendar, with no double bookings." },
    ],
    cta: "Book a Live Demo",
  },

  /* ---------- AI + human insight ---------- */
  aiHuman: {
    pill: "AI powered up",
    heading: "AI does the heavy lifting. Humans keep it sharp.",
    text: "Automation runs every day, but you are never left alone with a dashboard. Our local marketing specialists review your setup, flag opportunities and answer questions whenever you need a second opinion.",
    bullets: ["Onboarding call to connect everything with you", "Human review of AI-written pages and posts", "Real people available by phone, email and chat"],
    image: { src: "/images/platform/ai-human.webp", alt: "Adboex specialist reviewing AI marketing recommendations with a business owner" },
  },

  /* ---------- Stats (4) ---------- */
  stats: {
    pill: "Get Adboex",
    heading: "Grow faster with fewer moving parts",
    items: [
      { value: 400, suffix: "+", label: "Local businesses on Adboex" },
      { value: 5, suffix: "+", label: "Marketing tools replaced" },
      { value: 10, prefix: "<", suffix: " min", label: "To connect and set up" },
      { display: "24/7", label: "Calls and chats answered" },
    ] satisfies Stat[],
  },

  /* ---------- FAQ (questions in /content/faqs.ts → platform) ---------- */
  faq: {
    heading: "Frequently asked questions",
    text: "Everything you need to know about the Adboex platform.",
  },

  /* ---------- Closing CTA ---------- */
  cta: {
    heading: "See the whole platform on your own business",
    text: "Book a live demo and we'll run Adboex on your website and Google profile, so you see real gaps and real fixes, not a slideshow.",
    cta: "Book a Live Demo",
  },
};
