/**
 * Structured data (JSON-LD) builders. Every value comes from /content files,
 * so editing content keeps the schema in sync automatically.
 * Validate at https://search.google.com/test/rich-results after deploy.
 */
import { site, SITE_URL } from "@/content/site";
import { presence } from "@/content/presence";
import { absoluteUrl } from "@/lib/utils";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl(site.logo.dark), width: 695, height: 256 },
    description: site.shortDescription,
    email: site.email,
    telephone: site.phone.tel,
    foundingDate: site.foundingYear,
    address: postalAddress(),
    sameAs: site.socials.map((s) => s.href),
    ...officeLocations(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.phone.tel,
        email: site.email,
        areaServed: "US",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: site.phone.tel,
        email: site.email,
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
  };
}

/** Offices from /content/presence.ts that have a real `address` filled in. */
function officeLocations() {
  const places = presence.offices
    .filter((o) => o.address)
    .map((o) => ({
      "@type": "Place",
      name: `${site.name} ${o.title}`,
      geo: { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng },
      address: {
        "@type": "PostalAddress",
        ...(o.address!.street ? { streetAddress: o.address!.street } : {}),
        addressLocality: o.address!.locality,
        ...(o.address!.region ? { addressRegion: o.address!.region } : {}),
        ...(o.address!.postalCode ? { postalCode: o.address!.postalCode } : {}),
        addressCountry: o.address!.country,
      },
    }));
  return places.length ? { location: places } : {};
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.name,
    description: site.shortDescription,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

export function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Adboex as a software product, with one Offer per pricing plan. Used on Home and Platform. */
export function softwareApplicationSchema(plans: { name: string; price: number; tagline: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: site.name,
    description: site.shortDescription,
    url: absoluteUrl("/platform/"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Local SEO and marketing automation",
    operatingSystem: "Web, iOS, Android",
    publisher: { "@id": ORG_ID },
    offers: plans.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.tagline,
      price: p.price.toFixed(2),
      priceCurrency: "USD",
      url: absoluteUrl("/pricing/"),
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.price.toFixed(2),
        priceCurrency: "USD",
        unitText: "MONTH",
        billingDuration: "P1M",
      },
    })),
    ...(site.schema.showAggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: site.schema.ratingValue,
            ratingCount: site.schema.ratingCount,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  };
}

/** Industry pages: the Adboex service tailored to one industry. */
export function serviceSchema({ name, serviceType, description, path, audience }: { name: string; serviceType: string; description: string; path: string; audience: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID, "@type": "Organization", name: site.name, url: absoluteUrl("/") },
    areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "BusinessAudience", audienceType: audience },
    offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: "285", url: absoluteUrl("/pricing/") },
  };
}

/** Generic Article schema (case studies). */
export function articleSchema({ headline, description, path, image, datePublished, dateModified }: { headline: string; description: string; path: string; image: string; datePublished: string; dateModified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: absoluteUrl(path),
    image: [absoluteUrl(image)],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
    publisher: { "@id": ORG_ID, "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl(site.logo.dark) } },
  };
}

export const schemaIds = { ORG_ID, WEBSITE_ID };
