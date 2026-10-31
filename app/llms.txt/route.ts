import { site } from "@/content/site";
import { pricing } from "@/content/pricing";
import { faqs } from "@/content/faqs";
import { getAllRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/utils";

/**
 * /llms.txt — a plain-text summary of Adboex for AI crawlers and assistants
 * (llmstxt.org format). Built from the content files, so it is always in sync.
 */
export const dynamic = "force-static";

export function GET() {
  const routes = getAllRoutes();
  const section = (group: string) =>
    routes
      .filter((r) => r.group === group)
      .map((r) => `- [${r.title.replace(/ \| .*$/, "")}](${absoluteUrl(r.path)}): ${r.description}`)
      .join("\n");

  const body = `# ${site.name}

> ${site.shortDescription}

${site.name} is an AI operating system for local business visibility and growth. It replaces 5+ marketing tools and an agency with one platform (web dashboard + iOS/Android app). Businesses connect two things, their website and their Google Business Profile, and ${site.name} automates the rest.

## Key facts
- Who it's for: local service businesses such as HVAC, plumbing, roofing, remodeling, car rental, real estate, charter rentals, carpet dyeing, auto repair, excavation, dental and chiropractic.
- Features: AI search visibility (GEO) for ChatGPT, Gemini and Perplexity; WordPress website optimization engine; Google Business Profile automation; AI visibility intelligence (Search Console, rank tracking); 24/7 AI receptionist for calls and chats; competitor analysis; plain-English performance reporting; PR distribution and email campaigns; Meta and Google Ads management; AI content creation; mobile app with the voice assistant "Max", AI Video Studio, AI Scheduler and invoicing.
- Setup: under 10 minutes, no technical knowledge needed.
- Terms: no setup fees, cancel anytime, no lock-in contracts. No guaranteed rankings; results usually build over 60–90 days.
- Data: ${site.name} does not sell or share leads or customer data.
- Contact: ${site.email}, ${site.phone.display}, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.

## Pricing (USD per month)
${pricing.plans.map((p) => `- ${p.name}: $${p.price}${p.oldPrice ? ` (was $${p.oldPrice})` : ""} — ${p.tagline}`).join("\n")}
- Yearly billing: ${Math.round(pricing.yearlyDiscount * 100)}% off.
- Details: ${absoluteUrl("/pricing/")}

## Core pages
${section("core")}

## Industry solutions
${section("industry")}

## Guides
${section("blog")}

## FAQ
${faqs.platform.map((f) => `- ${f.question} ${f.answer}`).join("\n")}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
