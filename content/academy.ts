/**
 * ACADEMY — controls /academy/: page text and the seven learning sessions
 * (reference layout: alternating rows of text + checklist + animated card).
 *
 * EACH SESSION: title, text, checklist and `visual` (the animated card,
 * see VisualKind in components/visuals/ProductVisual.tsx). To show your own
 * screen recording instead, set `video: "/videos/<file>.mp4"`.
 */
import type { VisualKind } from "@/components/visuals/ProductVisual";

export type Session = { id: string; title: string; text: string; points: string[]; visual: VisualKind; video?: string };

export const academy = {
  hero: {
    pill: "Academic sessions",
    heading: "Adboex Academy: Local SEO Video Tutorials",
    highlight: [] as string[],
    text: "Your command center for understanding, using and getting the most from Adboex. From setup walkthroughs to advanced local SEO automation, this is where owners and teams learn to take full control of their online growth.",
  },

  sessions: [
    {
      id: "getting-started",
      title: "Getting Started with Adboex",
      text: "Begin with the essentials. This session walks you through the core setup steps to connect, configure and activate your Adboex dashboard.",
      points: ["Account Setup & Login", "Connect Your Website with Adboex", "Link Business Profiles & Channels"],
      visual: "search",
    },
    {
      id: "web-analysis",
      title: "Live Web Analysis and Fixes",
      text: "Find performance issues instantly. Adboex continuously scans your site and offers one-click fixes to keep your website optimized and compliant.",
      points: ["SEO Audit (Meta Tags, Headers, Schema and More)", "Loading Speed, Responsiveness & Mobile Optimization", "Content Audit (Duplication, Relevance, Freshness)", "AI-Powered One-Click Fix Recommendations"],
      visual: "website",
    },
    {
      id: "ads-audit",
      title: "Ad Campaign Audit and Tune-Ups",
      text: "Track how your ads perform across Google and Meta. Get AI-driven audits, insights and real-time suggestions to cut waste and improve return.",
      points: ["Budget Usage, CPC Trends & CTR Drop-Offs", "Targeting, Audience Reach & Ad Fatigue Signals", "Campaign Goal Tracking & Deviation Alerts", "AI-Suggested Fixes for Copy, Creatives & Bidding"],
      visual: "ads",
    },
    {
      id: "gbp",
      title: "Google Business Profile Management and Optimization",
      text: "Automate your local presence with built-in tools for posting, review handling and reputation growth, all synced to your Google Business Profile.",
      points: ["Auto-Posting to Google Business Profile", "Review Monitoring & AI Replies", "Profile Accuracy Checks (Hours, Categories, Photos)", "Local Ranking & Map Pack Tracking"],
      visual: "gbp",
    },
    {
      id: "content-studio",
      title: "Content Studio",
      text: "Create on-brand blogs, social posts and short videos in minutes, then schedule them across your channels from one place.",
      points: ["AI Blog & Service Page Writer", "Social Post & Caption Generator", "AI Video Studio for Short Promos", "Content Calendar & Scheduling"],
      visual: "social",
    },
    {
      id: "reports",
      title: "Reports & Insights",
      text: "Monitor performance across every channel with automated reports, visual dashboards and data you can share, export or act on instantly.",
      points: ["Weekly Auto-Sent Reports with Key Metrics", "Visual Dashboards for Traffic, Inquiries & Conversions", "Exportable Charts in PDF & CSV", "Team Sharing & Summary Highlights"],
      visual: "analytics",
    },
    {
      id: "mobile",
      title: "Manage Your Business On The Move",
      text: "Get the Adboex mobile app with every dashboard account. Monitor campaigns, talk to Max, view live performance and reply to customers wherever you are.",
      points: ["Live Calls, Leads & Review Alerts", "Voice Commands with Max", "On-the-Go Invoicing & Scheduling", "Available on iOS and Android"],
      visual: "mobile",
    },
  ] satisfies Session[] as Session[],
};
