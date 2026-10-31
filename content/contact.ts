/**
 * CONTACT PAGE — controls the text on /contact-us/.
 * Email, phone, address and socials come from /content/site.ts (keep NAP identical
 * to your Google Business Profile). The form sends to /api/contact.
 */

export const contact = {
  hero: {
    heading: "Real people. Real fast.",
    subheading: "(The AI's great, but sometimes you want a human.)",
    text: "Call us, text us or drop a line below. No phone trees and no ticket purgatory, just our local SEO company team, ready to help you win.",
  },
  labels: { email: "Email:", phone: "Phone:", office: "Office:", follow: "Follow Us:" },
  form: {
    name: "Full name",
    namePlaceholder: "Your full name",
    email: "Email address",
    emailPlaceholder: "Your email address",
    message: "Messages",
    messagePlaceholder: "Your messages here...",
  },
  submit: "Submit",
  sending: "Sending…",
  success: "Thanks! Your message is on its way. We'll reply within one business day.",
  error: "Something went wrong. Please try again or email us directly.",
};
