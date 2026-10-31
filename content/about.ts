/**
 * ABOUT PAGE — controls every heading, paragraph, stat, journey card and FAQ
 * on /about-us/, in page order (reference layout).
 *
 * SEO keyword: "local business growth" (keep it in hero.heading).
 * Photos: /public/images/about/ (hero 1600×820, experts 832×624, mission 1216×974).
 * ⚠️ Numbers and the journey are placeholders — replace with your real story.
 */

export const aboutSections = ["hero", "experts", "mission", "journey", "presence", "faq"] as const;

export const about = {
  hero: {
    heading: "We spent years mastering local business growth. Then we put it in a box.",
    text: "We're the people local businesses used to hire when they wanted to win: the strategists, the closers, the ones who actually moved the numbers. We took everything we know and built it into one AI platform. Now you don't have to hire us. You just have to turn it on.",
    cta: "Book a Live Demo",
    image: { src: "/images/about/hero.webp", alt: "Audience at a local business marketing conference hosted by Adboex" },
  },

  experts: {
    pill: "About us",
    heading: "The experts you'd want in the room.",
    headingMuted: "Now living in your dashboard.",
    avatars: ["/images/testimonials/hero-face-1.webp", "/images/testimonials/hero-face-2.webp", "/images/testimonials/hero-face-3.webp", "/images/testimonials/hero-face-4.webp", "/images/testimonials/avatar-01.webp"],
    trusted: "Trusted by 400+ businesses",
    stats: [
      { value: 400, suffix: "+", label: "Businesses Who Stopped Overpaying" },
      { value: 100, suffix: "+", label: "Strategic Partnerships" },
    ],
    image: { src: "/images/about/experts.webp", alt: "Adboex team talking with business owners at an expo booth" },
  },

  mission: {
    pill: "Our mission",
    heading: "Make expert-level marketing something you own, not something you rent.",
    text: "For decades, great marketing was a luxury, locked behind agencies, consultants and people who charged by the hour to do what software should. We think that's backwards. Our mission is to take the playbook the pros use to win and hand it to every local business owner, at a price that doesn't flinch. You shouldn't need a marketing department. You should just need Adboex.",
    image: { src: "/images/about/mission.webp", alt: "Local business owner reviewing Adboex visibility results on a tablet" },
  },

  journey: {
    pill: "Our journey",
    items: [
      { year: "2022", lead: "We were winning. For everyone else.", text: "Years deep in local marketing, getting businesses found, booked and ahead. We were good at it. Maybe too good to keep doing it one client at a time." },
      { year: "2023", lead: "We saw the ceiling.", text: "There are only so many hours in a day, and only so many businesses the best people can help by hand. The expertise worked; it just didn't scale. So we asked: what if it could?" },
      { year: "2024", lead: "We bottled it.", text: "We took everything we knew and built it into AI: the strategy, the instincts, the moves that actually move numbers. Not a tool. An operator." },
      { year: "2025", lead: "Everyone gets the edge.", text: "Hundreds of businesses now run on the same expertise that used to cost a fortune. The pros aren't behind a paywall anymore. They're in the app." },
    ],
    tagline: "We didn't learn marketing from a machine. The machine learned it from us.",
  },

  faq: {
    heading: "Frequently asked questions",
    text: "Everything you'd want to know before you trust us with your growth.",
    items: [
      { question: "Who's actually behind Adboex?", answer: "A team of local marketing strategists, engineers and SEO specialists who spent years growing service businesses by hand before turning that playbook into software." },
      { question: "Do I need to know anything about marketing?", answer: "No. Adboex explains everything in plain English and handles the work automatically. You approve what matters and run your business." },
      { question: "What do I actually connect?", answer: "Your website and Google Business Profile, plus optional ad and social accounts. Setup takes under 10 minutes and needs no code." },
      { question: "Will this work with my website?", answer: "Yes. Adboex works with WordPress through our plugin and with most other website builders through a simple connection." },
      { question: "How fast will I see results?", answer: "Website fixes and profile activity start in the first week. Rankings, calls and AI visibility usually build over 60 to 90 days." },
      { question: "Why not just hire an agency?", answer: "Agencies charge more each month and work on your account a few hours a week. Adboex works every day, costs less and shows you exactly what it's doing." },
      { question: "Can I cancel anytime?", answer: "Yes. There are no lock-in contracts on monthly plans." },
    ],
  },
};
