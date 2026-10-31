/**
 * LEGAL PAGES — controls /privacy-policy/, /terms-of-use/, /refund-policy/,
 * /data-security/ and the terms under the form on /sms-terms/.
 * (/security/ has its own designed page: /content/security.ts.)
 *
 * ⚠️ PLACEHOLDER TEXT — replace with lawyer-reviewed text before launch.
 * Each page: title (H1), updated date, intro and sections (heading + paragraphs).
 */
import { site } from "@/content/site";

export type LegalPage = {
  seoKey: "privacy" | "terms" | "refund" | "dataSecurity" | "smsTerms";
  path: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const contactLine = `Questions? Contact us at ${site.email} or ${site.phone.display}, or write to ${site.legalName}, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`;

export const legalPages: LegalPage[] = [
  {
    seoKey: "privacy",
    path: "/privacy-policy/",
    title: "Privacy Policy",
    updated: "2026-10-01",
    intro: `This Privacy Policy explains how ${site.legalName} ("Adboex", "we", "us") collects, uses and protects information when you use our website, web dashboard and mobile apps.`,
    sections: [
      { heading: "1. Information we collect", paragraphs: ["Information you provide, such as your name, business name, email, phone number and website when you request a demo, contact us or create an account.", "Information from connected services, such as your Google Business Profile and website data, which you authorize us to access to deliver the service.", "Usage and device information, such as pages visited, browser type and approximate location, collected through cookies and similar technologies."] },
      { heading: "2. How we use your information", paragraphs: ["To provide, maintain and improve the Adboex platform; to respond to inquiries and schedule demos; to send service and, with consent, marketing messages; and to protect the security of our services."] },
      { heading: "3. Legal basis for processing (GDPR)", paragraphs: ["Where GDPR applies, we process personal data based on contract performance, legitimate interests, legal obligations and, where required, your consent."] },
      { heading: "4. Sharing of information", paragraphs: ["We do not sell or share your leads or customer data. We share information only with service providers who help us operate the platform under confidentiality obligations, when required by law, or as part of a business transfer."] },
      { heading: "5. Data security and retention", paragraphs: ["We use industry-standard safeguards including encryption in transit and at rest. We keep personal data only as long as needed for the purposes described or as required by law."] },
      { heading: "6. Your rights (GDPR and CCPA)", paragraphs: ["Depending on where you live, you may have rights to access, correct, delete or export your data, and to object to or restrict certain processing. California residents may request information about data collection and opt out of any sale or sharing; we do not sell personal information."] },
      { heading: "7. Cookies", paragraphs: ["We use essential cookies to run the site and, where enabled, analytics cookies to understand usage. You can control cookies through your browser settings."] },
      { heading: "8. SMS communications", paragraphs: ["If you opt in to text messages, we use your phone number only to send the messages you agreed to. Mobile opt-in data and consent are never shared with third parties for marketing. See our SMS Terms for details."] },
      { heading: "9. Changes and contact", paragraphs: ["We may update this policy and will post the new date above.", contactLine] },
    ],
  },
  {
    seoKey: "terms",
    path: "/terms-of-use/",
    title: "Terms of Use",
    updated: "2026-10-01",
    intro: `These Terms of Use govern your access to and use of the Adboex website, platform and mobile apps provided by ${site.legalName}. By using our services you agree to these terms.`,
    sections: [
      { heading: "1. Accounts", paragraphs: ["You are responsible for the accuracy of your account information and for keeping your login credentials secure."] },
      { heading: "2. Subscriptions and billing", paragraphs: ["Plans are billed monthly or yearly in advance. There are no setup fees. You may cancel at any time; see our Refund Policy for how cancellations and refunds work."] },
      { heading: "3. Acceptable use", paragraphs: ["You agree not to misuse the service, including attempting to access other accounts, posting unlawful content, or using automation to generate fake reviews or misleading content."] },
      { heading: "4. Your content and connected accounts", paragraphs: ["You keep ownership of your content. You grant Adboex permission to use it, and to act on connected accounts you authorize, solely to provide the service."] },
      { heading: "5. No guaranteed results", paragraphs: ["Search engines and AI platforms control their own results. Adboex does not guarantee specific rankings, traffic or revenue."] },
      { heading: "6. Intellectual property", paragraphs: ["The Adboex platform, brand and materials are owned by us and protected by law. You may not copy or resell them without permission."] },
      { heading: "7. Limitation of liability", paragraphs: ["To the extent permitted by law, Adboex is not liable for indirect or consequential damages, and our total liability is limited to the fees you paid in the previous 12 months."] },
      { heading: "8. Changes and contact", paragraphs: ["We may update these terms and will post the new date above.", contactLine] },
    ],
  },
  {
    seoKey: "refund",
    path: "/refund-policy/",
    title: "Refund Policy",
    updated: "2026-10-01",
    intro: "Adboex has no setup fees and no lock-in contracts. This policy explains how cancellations and refunds work.",
    sections: [
      { heading: "1. Cancelling your subscription", paragraphs: ["You can cancel anytime from your account or by contacting support. Your plan stays active until the end of the current billing period."] },
      { heading: "2. Monthly plans", paragraphs: ["Monthly payments are non-refundable once a billing period has started, but you will not be charged again after cancelling."] },
      { heading: "3. Yearly plans", paragraphs: ["Yearly plans may be refunded on a prorated basis within the first 30 days. After 30 days, yearly plans remain active until the end of the paid term."] },
      { heading: "4. Billing errors", paragraphs: ["If you believe you were charged in error, contact us within 30 days and we will investigate and correct any mistake."] },
      { heading: "5. Contact", paragraphs: [contactLine] },
    ],
  },
  {
    seoKey: "dataSecurity",
    path: "/data-security/",
    title: "Data Security",
    updated: "2026-10-01",
    intro: "Your business data and your customers' data belong to you. This page explains how Adboex stores, protects and handles it.",
    sections: [
      { heading: "1. We never sell or share leads", paragraphs: ["Adboex does not sell or share your leads, customer contact details or call and chat data with third parties for their own use."] },
      { heading: "2. How data is stored", paragraphs: ["Data is stored in secure cloud data centers, encrypted at rest and backed up regularly."] },
      { heading: "3. Who can access it", paragraphs: ["Only you, the users you invite and authorized Adboex staff who need access to support you can view your data."] },
      { heading: "4. AI processing", paragraphs: ["We use AI providers to generate content and handle conversations under agreements that prohibit using your data to train their public models."] },
      { heading: "5. Deleting your data", paragraphs: ["You can request export or deletion of your data at any time. We delete account data within 30 days of a verified request, except where we must keep records by law.", contactLine] },
    ],
  },
  {
    seoKey: "smsTerms",
    path: "/sms-terms/",
    title: "SMS Terms",
    updated: "2026-10-01",
    intro: `These SMS Terms apply to text messages sent by ${site.name} to people who opt in through our website forms or app.`,
    sections: [
      { heading: "1. What you'll receive", paragraphs: ["Messages about your demo or audit, account notifications, appointment reminders and, if you agreed, occasional updates about Adboex services."] },
      { heading: "2. Message frequency and costs", paragraphs: ["Message frequency varies. Message and data rates may apply according to your mobile plan."] },
      { heading: "3. How to opt out", paragraphs: ["Reply STOP to any message to unsubscribe. You will receive one confirmation message and no further texts. Reply HELP for help."] },
      { heading: "4. Consent", paragraphs: ["Consent to receive text messages is not a condition of purchase. Mobile information is not shared with third parties or affiliates for marketing or promotional purposes."] },
      { heading: "5. Support", paragraphs: [contactLine] },
    ],
  },
];

export const getLegalPage = (seoKey: LegalPage["seoKey"]) => legalPages.find((p) => p.seoKey === seoKey)!;

/** /sms-terms/ — text of the SMS opt-in form shown above the SMS Terms. */
export const smsOptIn = {
  heading: `Get text updates from ${site.name}`,
  text: `Enter your mobile number to receive account updates, support messages and offers from ${site.name} by text.`,
  phoneLabel: "Mobile phone number",
  phonePlaceholder: "(555) 123-4567",
  nameLabel: "Name",
  namePlaceholder: "Full name",
  consent: `By checking this box, I agree to receive recurring SMS/MMS messages from ${site.name} at the number provided, including account updates, customer support and promotional offers. Consent is not a condition of purchase. Message frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out. We will not share your mobile information with third parties for marketing purposes.`,
  submit: "Confirm and save preferences",
  sending: "Saving…",
  success: "You're subscribed. Reply STOP at any time to opt out.",
  error: "Something went wrong. Please try again.",
};
