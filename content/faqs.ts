/**
 * FAQS — controls the questions and answers in every FAQ section.
 * Each list also becomes FAQPage schema for Google (rich results / AI answers),
 * so keep answers factual, plain text and 1–3 sentences.
 *
 * Where it appears: home → Home page, platform → Platform page.
 * Industry FAQs live in /content/industries.ts.
 */
import type { FaqItem } from "@/lib/schema";

export const faqs: Record<string, FaqItem[]> = {
  /* ---------- Home page (7 questions) ---------- */
  home: [
    {
      question: "Do I need marketing knowledge to use Adboex?",
      answer:
        "No. Adboex is built for busy business owners, not marketers. Once your website and Google Business Profile are connected, the platform handles optimization, posting, review replies and reporting automatically, and explains results in plain English.",
    },
    {
      question: "What do I need to connect to get started?",
      answer:
        "Just two things: your website and your Google Business Profile. Setup takes under 10 minutes and our team walks you through it on your onboarding call. Everything else runs from there.",
    },
    {
      question: "Will Adboex work with my website?",
      answer:
        "Adboex works best with WordPress, where our plugin can optimize meta tags, schema, sitemaps and site health and publish new service and city pages directly. For other website builders we provide tracking, audits and step-by-step fixes, or can help you move to WordPress.",
    },
    {
      question: "How fast will I see results?",
      answer:
        "Many businesses see quick wins like fixed website errors and a more active Google profile in the first weeks. Rankings, AI search visibility and inquiry growth usually build over 60 to 90 days, depending on your market and competition.",
    },
    {
      question: "Can Adboex replace my marketing agency?",
      answer:
        "For most local service businesses, yes. Adboex replaces five or more separate tools and the routine work an agency does: local SEO, Google profile management, content, review replies, reporting and inquiry capture, for a predictable monthly price.",
    },
    {
      question: "Do you guarantee rankings?",
      answer:
        "No, and you should be cautious of anyone who does. Google and AI engines control their own results. Adboex improves the signals they use, such as website health, profile activity, reviews and content, and shows you exactly what is changing.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. There are no setup fees and no lock-in contracts. Plans are billed monthly (or yearly if you choose the discount), and you can cancel at any time from your account.",
    },
  ],

  /* ---------- Platform page (7 questions) ---------- */
  platform: [
    {
      question: "What is Adboex?",
      answer:
        "Adboex is all-in-one local SEO software and an AI operating system for local business visibility. It combines website optimization, Google Business Profile automation, AI search visibility, reporting and a 24/7 AI receptionist in one web dashboard and mobile app.",
    },
    {
      question: "What does Adboex actually do day to day?",
      answer:
        "It fixes website errors, publishes service and city pages, posts to your Google profile weekly, replies to reviews, tracks rankings and AI visibility, answers calls and chats, books appointments and reports results in plain English.",
    },
    {
      question: "Is Adboex a single tool or a replacement for my marketing stack?",
      answer:
        "It replaces the stack. Most customers cancel a separate SEO tool, review manager, social scheduler, call answering service and reporting tool after switching, because Adboex covers all of them in one connected system.",
    },
    {
      question: "How is Adboex different from hiring an agency?",
      answer:
        "Agencies bill for hours and report monthly. Adboex works every day, shows you everything in real time and costs a predictable monthly fee with no lock-in contract. You still get human specialists when you want advice.",
    },
    {
      question: "Do I need technical knowledge to use it?",
      answer:
        "No. You connect your website and Google Business Profile once, which takes under 10 minutes, and our team helps on your onboarding call. Everything after that is automated.",
    },
    {
      question: "What's included in the mobile app?",
      answer:
        "The iOS and Android app includes Max the voice assistant, AI image generation, the AI Video Studio, the AI Scheduler, on-the-go invoicing, live competitor tracking, performance alerts and website fixes from your phone.",
    },
    {
      question: "Who is Max?",
      answer:
        "Max is the voice-activated AI assistant inside the Adboex app. You can ask Max about your calls, rankings and reviews, or tell Max to create a post, schedule a job or make a promo video, all hands-free.",
    },
  ],
};
