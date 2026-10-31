import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { schemaIds } from "@/lib/schema";
import { pricing, pricingPage as pp } from "@/content/pricing";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/shared/PageHero";
import { PricingCards } from "@/components/sections/shared/PricingCards";

export const metadata = buildMetadata("pricing");

/** Product + monthly Offer per plan for Google (matches the prices shown). */
function productSchema() {
  return pricing.plans.map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${site.name} ${plan.name}`,
    description: plan.tagline,
    brand: { "@type": "Brand", name: site.name },
    image: absoluteUrl(site.logo.dark),
    offers: {
      "@type": "Offer",
      name: `${plan.name} (monthly)`,
      price: plan.price.toFixed(2),
      priceCurrency: pricing.currency,
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing/"),
      seller: { "@id": schemaIds.ORG_ID },
      priceSpecification: { "@type": "UnitPriceSpecification", price: plan.price.toFixed(2), priceCurrency: pricing.currency, billingDuration: "P1M", unitText: "MONTH" },
    },
  }));
}

/** Reference layout: hero, then the three plans in one wrapper — nothing else. */
export default function PricingPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Pricing", path: "/pricing/" }]} pill={pp.hero.pill} title={pp.hero.heading} highlight={pp.hero.highlight} text={<p>{pp.hero.text}</p>} />

      <section aria-labelledby="plans-heading" className="pb-20 md:pb-32">
        <div className="container-x">
          <h2 id="plans-heading" className="sr-only">
            Plans
          </h2>
          <div className="surface-1 rounded-[24px] p-3">
            <PricingCards />
          </div>
        </div>
      </section>
      <JsonLd data={productSchema()} />
    </>
  );
}
