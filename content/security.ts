/**
 * SECURITY PAGE — controls /security/: hero, the six practice cards and the
 * closing "privacy-first" block with the demo button.
 *
 * ⚠️ Only list practices you really have in place — edit the cards below.
 */

export const securityPage = {
  updated: "2026-10-01",
  hero: {
    pill: "Security",
    heading: "Enterprise-Grade Security for AI-Driven Marketing Automation",
    text: "Protecting your data matters as much as growing your business. Behind every AI insight and automation in Adboex is security infrastructure designed to safeguard your digital footprint.",
  },
  cards: [
    { title: "Employee Access Protocols", text: "Teams work in role-isolated environments. No shared passwords and no unauthorized entry points." },
    { title: "Real-Time Backups", text: "Your campaigns, content and business data are backed up continuously across redundant cloud zones." },
    { title: "Threat Response Pipeline", text: "Intrusion attempts, failed logins and unauthorized API calls are flagged and routed to our security team." },
    { title: "Encrypted End-to-End", text: "From performance reports to AI-generated content, every layer of data is encrypted in transit and at rest." },
    { title: "Security Audits & Pen Testing", text: "Regular third-party testing across the web dashboard and mobile apps, with automated vulnerability scans every week." },
    { title: "Uptime & Monitoring", text: "Systems are monitored around the clock, with alerts that reach our engineers before issues reach you." },
  ],
  closing: {
    pill: "Contact us",
    heading: "Built for Privacy-First Businesses",
    text: "Adboex isn't just powerful, it's responsible. Whether you run a single-location bakery or a multi-location remodeling company, your customer data, business metrics and marketing workflows stay secure.",
    cta: "Book a Live Demo",
  },
};
