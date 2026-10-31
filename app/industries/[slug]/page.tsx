import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { fill, getIndustry, industries, industryTemplate as t } from "@/content/industries";
import type { SeoKey } from "@/content/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { IndustryHero } from "@/components/sections/industry/IndustryHero";
import { Challenges, DemoFrame, FullSystem, GeoGrid, IndustryCta, Integrations, Receptionist, Seasons } from "@/components/sections/industry/IndustrySections";
import { PressLogos } from "@/components/sections/home/LogoStrips";
import { PricingSection } from "@/components/sections/home/ClosingSections";
import { FaqSection } from "@/components/sections/shared/FaqSection";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildMetadata(`industry-${slug}` as SeoKey);
}

/** Reference industry landing page: hero, press, demo, problem, geo-grid, system, agent, seasons, integrations, pricing, FAQ, CTA. */
export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();

  return (
    <>
      <IndustryHero industry={industry} />
      <PressLogos />
      <DemoFrame />
      <Challenges industry={industry} />
      <GeoGrid industry={industry} />
      <FullSystem industry={industry} />
      <Receptionist industry={industry} />
      <Seasons industry={industry} />
      <Integrations />
      <PricingSection extra={t.websitePlan} />
      <FaqSection heading={fill(t.faqHeading, industry.name)} text={t.faqText} items={industry.faqs} />
      <IndustryCta industry={industry} />

      <JsonLd
        data={serviceSchema({
          name: `Adboex for ${industry.plural}`,
          serviceType: industry.serviceType,
          description: industry.definition.text,
          path: `/industries/${industry.slug}/`,
          audience: industry.plural,
        })}
      />
    </>
  );
}
