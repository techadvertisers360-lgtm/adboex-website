/**
 * PRICING — controls plan names, prices, features and the yearly discount.
 *
 * Where it appears: Home page pricing section, /pricing page (hero + cards) and the SoftwareApplication / Product schema for Google.
 * Prices are numbers in US dollars per month. oldPrice = crossed-out price
 * (leave null for none). The yearly price is calculated automatically.
 */

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice: number | null;
  popular?: boolean;
  cta: string;
  features: string[];
};

export const pricing = {
  currency: "USD",
  /** 0.2 = 20% off when billed yearly. Set to 0 to hide the yearly option. */
  yearlyDiscount: 0.2,
  perMonthLabel: "/month",
  popularLabel: "Most Popular",

  plans: [
    {
      id: "steady-and-solid",
      name: "Steady & Solid",
      tagline: "Get your local presence connected, optimized and found.",
      price: 285,
      oldPrice: null,
      cta: "Book a Demo",
      features: [
        "Google Business Profile automation with weekly posts",
        "Website optimization plugin with one-click fixes",
        "AI search visibility tracking (ChatGPT, Gemini, Perplexity)",
        "Review monitoring with AI-written replies",
        "Monthly performance report in plain English",
      ],
    },
    {
      id: "crush-my-competition",
      name: "Crush My Competition",
      tagline: "Outrank nearby competitors and pull ahead in your market.",
      price: 388,
      oldPrice: 485,
      popular: true,
      cta: "Book a Demo",
      features: [
        "Everything in Steady & Solid",
        "AI receptionist answering calls and chats 24/7",
        "AI-written service pages and city pages",
        "Competitor analysis and keyword rank tracking",
        "PR distribution and email campaigns",
        "Adboex mobile app with Max, your AI assistant",
      ],
    },
    {
      id: "rush-and-rank",
      name: "Rush and Rank",
      tagline: "For multi-location brands going all-in on growth.",
      price: 676,
      oldPrice: 845,
      cta: "Book a Demo",
      features: [
        "Everything in Crush My Competition",
        "Multi-location management from one dashboard",
        "Meta and Google Ads management",
        "AI Video Studio and full content creation",
        "Priority strategist support",
      ],
    },
  ] satisfies Plan[],
};

/* ---------- /pricing page text (cards and plans come from above) ---------- */
export const pricingPage = {
  hero: {
    pill: "Pricing",
    heading: "Local SEO Software Pricing That Pays for Itself",
    highlight: [] as string[],
    text: "Simple local SEO software pricing with three plans, no setup fees and no lock-in contracts. Every plan replaces separate tools and agency work with one connected AI system.",
  },
};

/** Yearly price per month, rounded to whole dollars. */
export function yearlyPrice(monthly: number) {
  return Math.round(monthly * (1 - pricing.yearlyDiscount));
}
