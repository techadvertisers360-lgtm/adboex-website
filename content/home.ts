/**
 * HOME PAGE — controls every heading, paragraph, button, image and stat on the
 * Home page (/), in the order they appear.
 *
 * SECTION ORDER: the `homeSections` list below. Delete or comment out a line to
 * remove that section; move a line to reorder.
 *
 * SEO: the page's main keyword is "AI marketing platform for local businesses"
 * (see /content/seo.ts). Keep it in the hero H1, the hero text, at least one
 * section heading (services) and the first dashboard image's alt text.
 *
 * Pricing plans, testimonials and FAQs come from /content/pricing.ts,
 * /content/testimonials.ts and /content/faqs.ts.
 *
 * ANIMATED CARD SCENES: `visual` picks the animated scene shown inside a card:
 * "search" | "website" | "gbp" | "analytics" | "receptionist" | "mobile".
 * Add `video: "/videos/file.mp4"` to play your own looping video instead.
 */
import type { HeadingPart } from "@/components/motion/InlineIconHeading";
import type { VisualKind } from "@/components/visuals/ProductVisual";

export const homeSections = [
  "hero",
  "dashboardMarquee",
  "pressLogos",
  "about",
  "stats",
  "techMarquee",
  "services",
  "features",
  "mobileApp",
  "pricing",
  "testimonials",
  "presence", // rotating globe — text in /content/presence.ts
  "ctaTagline",
  "faq",
] as const;

export type HomeSection = (typeof homeSections)[number];

type CardVisual = { visual: VisualKind; video?: string };

export const home = {
  /* ---------- 1. Hero ---------- */
  hero: {
    // Background image behind the hero (16:9, at least 1920×1080).
    // overlay   = darkness over the WHOLE image (0 = none, 1 = black)
    // spotlight = extra darkness just behind the centred text (keeps text readable)
    // Set src to "" to remove the image.
    background: {
      src: "/images/hero/hero-robot.webp",
      overlay: 0.4,
      spotlight: 0.75,
      position: "center 30%", // which part of the image stays visible on phones
    },
    pill: "AI marketing platform for local businesses", // keeps the page keyword near the top (SEO)
    // The H1. Words listed in `highlight` get the brand gradient.
    heading: "The AI Operating System for Local Business Visibility",
    highlight: ["AI"],
    text:
      "Adboex connects your website, Google Business Profile, content, reviews, AI search visibility and customer inquiries into one system — so your business stays optimized, discoverable and ready to be chosen.",
    primaryCta: "Book a Live Visibility Audit",
    secondaryCta: { label: "See How Adboex Works", href: "/platform/" },
    bullet: "Built for local service businesses that want to be found across Google, Maps and AI-powered search.",
    rating: {
      text: "Rated 4.9/5 by 400+ local business clients",
      avatars: [
        "/images/testimonials/hero-face-1.webp",
        "/images/testimonials/hero-face-2.webp",
        "/images/testimonials/hero-face-3.webp",
        "/images/testimonials/hero-face-4.webp",
      ],
    },
  },

  /* ---------- 2. Image strip under the hero (square tiles with a caption, 10) ----------
     Photos: /public/images/marquee/owner-01.webp … owner-10.webp (square, 800×800).
     ⚠️ Current photos are free Unsplash placeholders — replace with your real clients. */
  dashboardMarquee: {
    label: "Adboex in action",
    images: [
      { src: "/images/marquee/owner-01.webp", alt: "Café owner who uses Adboex, the AI marketing platform for local businesses", title: "AI visibility score", caption: "tracked every day" },
      { src: "/images/marquee/owner-02.webp", alt: "Hardware store owner standing in his shop", title: "Recommended by AI", caption: "ChatGPT, Gemini, Perplexity" },
      { src: "/images/marquee/owner-03.webp", alt: "Smiling boutique owner in her clothing store", title: "One-click fixes", caption: "website health on autopilot" },
      { src: "/images/marquee/owner-04.webp", alt: "Auto repair shop owner in his garage", title: "Weekly posts", caption: "Google profile always active" },
      { src: "/images/marquee/owner-05.webp", alt: "Young chef smiling in his restaurant kitchen", title: "AI review replies", caption: "every review answered" },
      { src: "/images/marquee/owner-06.webp", alt: "Construction contractor wearing a red hard hat", title: "Rank tracking", caption: "across your service area" },
      { src: "/images/marquee/owner-07.webp", alt: "Lumberyard owner smiling between timber racks", title: "24/7 receptionist", caption: "calls and chats answered" },
      { src: "/images/marquee/owner-08.webp", alt: "Bakery owner behind a counter of fresh pastries", title: "Competitor insights", caption: "see who ranks near you" },
      { src: "/images/marquee/owner-09.webp", alt: "Real estate agent holding up house keys", title: "Plain-English reports", caption: "calls, clicks, inquiries" },
      { src: "/images/marquee/owner-10.webp", alt: "Small business owner smiling in her studio", title: "Talk to Max", caption: "your AI assistant on the go" },
    ],
  },

  /* ---------- 3. "As seen on" press logos ----------
     ⚠️ PLACEHOLDERS: these outlet names are invented. Replace them with real
     coverage (logo file + article link) or remove this section before launch.
     href: link to the article (optional). Paid placements are marked rel="sponsored". */
  pressLogos: {
    label: "As seen on",
    logos: [
      { src: "/images/press/press-01.svg", alt: "The Daily Ledger logo", href: "" },
      { src: "/images/press/press-02.svg", alt: "Metro Business logo", href: "" },
      { src: "/images/press/press-03.svg", alt: "TechPulse logo", href: "" },
      { src: "/images/press/press-04.svg", alt: "Local Times logo", href: "" },
      { src: "/images/press/press-05.svg", alt: "NewsWire logo", href: "" },
      { src: "/images/press/press-06.svg", alt: "Growth Journal logo", href: "" },
      { src: "/images/press/press-07.svg", alt: "The Market Today logo", href: "" },
    ],
  },

  /* ---------- 4. About ----------
     Heading parts: plain text (white), { muted: "text" } (grey), or
     { icon: "search", color: "blue" | "white" } for a round icon between words.
     Icons: search, wrench, globe, map, star, bot, phone, chart, calendar, message, sparkles, zap, network, briefcase. */
  about: {
    label: "About us",
    heading: [
      "Getting found online shouldn't require five tools, scattered",
      { icon: "network", color: "blue" },
      { muted: "profiles and" },
      { icon: "briefcase", color: "white" },
      { muted: "disconnected reports." },
    ] as HeadingPart[],
    text:
      "You're great at running your business. The hard part is that online visibility now needs constant technical updates, fresh content, an active Google profile, steady reviews and a presence in AI answers. Most businesses juggle separate tools, an agency and reports nobody reads. Adboex brings all of it into one connected AI system that keeps your business found, trusted and booked.",
  },

  /* ---------- 5. Stats (4 cards) ---------- */
  stats: {
    brandCard: { alt: "Adboex AI marketing platform" },
    businesses: {
      value: 400,
      suffix: "+",
      text: "Local service businesses improving their visibility with Adboex.",
      // industry pills scroll inside this card; each links to its industry page
      industries: [
        { label: "HVAC", href: "/industries/hvac/" },
        { label: "Plumbing", href: "/industries/plumbing/" },
        { label: "Roofing", href: "/industries/roofing/" },
        { label: "Remodeling", href: "/industries/remodeling/" },
        { label: "Auto Repair", href: "/industries/auto-repair/" },
        { label: "Real Estate", href: "/industries/real-estate/" },
        { label: "Car Rentals", href: "/industries/car-rental/" },
        { label: "Charter Rentals", href: "/industries/charter-rentals/" },
        { label: "Carpet Dyeing", href: "/industries/carpet-dyeing/" },
        { label: "Excavation", href: "/industries/excavation/" },
      ],
    },
    inquiries: { title: "Customer Inquiries", display: "24/7", text: "AI voice and chat capture inquiries after hours." },
    connections: { title: "Core Connections", value: 2, text: "Your website and Google Business Profile power the system." },
  },

  /* ---------- 6. Technology logos strip (19, no heading) ---------- */
  techMarquee: {
    label: "Technology behind Adboex",
    logos: [
      "OpenAI", "Gemini", "Perplexity", "Claude", "Llama", "Google Cloud", "AWS", "Azure", "NVIDIA", "Hugging Face",
      "LangChain", "LlamaIndex", "PyTorch", "TensorFlow", "Python", "WordPress", "Google Search Console",
      "Google Business Profile", "Twilio",
    ].map((name, i) => ({ name, src: `/images/tech-logos/tech-${String(i + 1).padStart(2, "0")}.svg` })),
  },

  /* ---------- 7. Services (9 tabs, each with an animated scene) ---------- */
  services: {
    label: "Services",
    heading: "One AI marketing platform for local businesses, connected in one place",
    text:
      "Adboex connects the visibility channels most local businesses struggle to manage: your website, Google Business Profile, local rankings, AI search presence, reviews and content.",
    tabs: [
      {
        tab: "AI Search Visibility",
        icon: "sparkles",
        title: "AI Search Visibility",
        text:
          "See how your business appears when customers ask AI. They no longer search in one place: they ask Google, ChatGPT, Gemini and Perplexity. Adboex shows where you appear, where competitors show up, and which signals to improve.",
        cta: "Check My AI Visibility",
        visual: "search",
      },
      {
        tab: "Website Optimization",
        icon: "globe",
        title: "Website Optimization",
        text:
          "Your website should work as hard as you do. The Adboex plugin fixes technical SEO, adds schema, keeps sitemaps clean and publishes AI-written service and city pages, so you rank across your whole service area.",
        cta: "Optimize My Website",
        visual: "website",
      },
      {
        tab: "Google Business Profile",
        icon: "map",
        title: "Google Business Profile",
        text:
          "Stay active where local customers decide. Adboex posts weekly, keeps your details accurate, monitors every review and writes thoughtful AI replies, sending the local signals Google rewards with more calls.",
        cta: "Improve My Google Profile",
        visual: "gbp",
      },
      {
        tab: "Lead Generation",
        icon: "target",
        title: "Lead Generation",
        text:
          "Turn visibility into booked jobs. Adboex captures every call, form and chat, qualifies each lead instantly and follows up within seconds, so fewer prospects slip away and your calendar fills with customers who are ready to buy.",
        cta: "Get More Leads",
        visual: "leads",
      },
      {
        tab: "Google Ads",
        icon: "megaphone",
        title: "Google Ads",
        text:
          "Show up first when customers are ready to call. We build and manage local Google Ads and Local Services Ads campaigns with tight targeting, smart bidding and clear tracking, so every dollar you spend is tied to real calls and jobs.",
        cta: "Launch My Google Ads",
        visual: "ads",
      },
      {
        tab: "SEO",
        icon: "search",
        title: "Local SEO",
        text:
          "Rank higher in Google Search and the Map Pack for the services and cities you care about. Adboex handles keyword research, on-page fixes, local citations and content, then tracks every ranking move so you can see the growth.",
        cta: "Improve My SEO",
        visual: "seo",
      },
      {
        tab: "Social Media",
        icon: "heart",
        title: "Social Media",
        text:
          "Stay top of mind between jobs. Adboex plans, writes and schedules on-brand posts for Facebook, Instagram and more, answers comments and tracks reach, so your business looks active and trusted wherever local customers scroll.",
        cta: "Grow My Social Media",
        visual: "social",
      },
      {
        tab: "Web Development",
        icon: "code",
        title: "Web Development",
        text:
          "Get a fast, modern website built to convert. We design and develop mobile-first sites with clear service pages, booking forms and strong Core Web Vitals, ready for SEO from day one and easy for you to update.",
        cta: "Build My Website",
        visual: "webdev",
      },
      {
        tab: "App Development",
        icon: "smartphone",
        title: "App Development",
        text:
          "Give customers a simpler way to book and come back. We build iOS, Android and web apps with online booking, push notifications and loyalty features, connected to the tools you already use to run your business.",
        cta: "Build My App",
        visual: "appdev",
      },
    ] as ({ tab: string; icon: string; title: string; text: string; cta: string } & CardVisual)[],
  },

  /* ---------- 8. Features (4 alternating rows inside one wrapper card) ---------- */
  features: {
    label: "Features & Advantages",
    heading: "Five visibility systems working together, not five disconnected tools.",
    text: "Adboex connects the work local businesses usually manage across separate tools, manual tasks and disconnected reports.",
    rows: [
      {
        icon: "settings",
        title: "Website Optimization Engine",
        text:
          "The part most owners ignore is the part Google cares about most. The Adboex plugin optimizes your website end to end: meta tags, schema, clean sitemaps and AI-written local service and city pages published straight to your site. Connect it once and it keeps your site ranking-ready.",
        visual: "website",
      },
      {
        icon: "map",
        title: "Local Profile Engine",
        text:
          "Your Google Business Profile is often the first thing customers see. Adboex keeps it active with weekly posts, accurate business details, review monitoring and AI replies in your voice, so you look like the obvious choice.",
        visual: "gbp",
      },
      {
        icon: "chart",
        title: "AI Visibility Intelligence",
        text:
          "Search Console data, keyword rank tracking and AI engine visibility in one clear view. See what moved, why it moved and what to do next, explained in plain English instead of a spreadsheet.",
        visual: "analytics",
      },
      {
        icon: "phone",
        title: "AI Receptionist & Customer Inquiries",
        text:
          "Max answers calls and website chats 24/7, asks the right questions, captures customer details and books appointments, so no lead goes cold after hours or while your team is on a job.",
        visual: "receptionist",
      },
    ] as ({ icon: string; title: string; text: string } & CardVisual)[],
  },

  /* ---------- 9. Mobile app card ---------- */
  mobileApp: {
    icon: "smartphone",
    title: "Mobile App",
    text: "Monitor visibility, customer inquiries, activity and performance from your phone, and talk to Max hands-free.",
    visual: "mobile" as VisualKind,
    video: undefined as string | undefined,
    appStore: { label: "Download on the", store: "App Store", href: "" }, // paste your App Store link
    googlePlay: { label: "Get it on", store: "Google Play", href: "" }, // paste your Google Play link
    rating: "Rated 4.9/5 by 400+ local business clients",
  },

  /* ---------- 10. Pricing (plans come from /content/pricing.ts) ---------- */
  pricing: {
    label: "Pricing",
    heading: "Simple plans for every stage of local growth.",
    text: "Start with the visibility foundation your business needs today, then scale as your market, locations and competition grow.",
    cta: "Book a Live Demo",
    note: "Note: No setup fees. Cancel anytime. No one can guarantee rankings; results usually build over 60–90 days depending on competition and your website.",
    planCta: "Book a Demo",
    planIcons: ["rocket", "star", "flame"], // one per plan, in plan order
  },

  /* ---------- 11. Testimonials (quotes come from /content/testimonials.ts) ---------- */
  testimonials: {
    label: "Testimonials",
    heading: "Local businesses are becoming easier to find with Adboex.",
    text: "Here's what they shared about working with Adboex.",
    autoplaySeconds: 6, // 0 = no autoplay
  },

  /* ---------- 12. CTA + tagline card ---------- */
  ctaTagline: {
    heading: "Trusted by 400+ local businesses growing on autopilot.",
    text: "You built a business worth finding. Time the world knew it.",
    cta: "Book a Live Demo",
    avatars: ["/images/testimonials/marcus-bell.webp", "/images/testimonials/dana-ortiz.webp", "/images/testimonials/priya-shah.webp"],
    card: {
      image: "/images/brand/orb.webp", // spinning orb (round cut-out) — or a photo path with spin: false
      spin: true,
      label: "The AI advantage",
      tagline: "Get found. Get chosen. Get booked.",
    },
  },

  /* ---------- 13. FAQ (questions come from /content/faqs.ts → home) ---------- */
  faq: {
    label: "FAQ",
    heading: "Frequently asked questions",
    text: "Everything you need to know before you connect.",
    contactHeading: "Still have questions?",
    contactCta: { label: "Contact Us", href: "/contact-us/" },
  },
};
