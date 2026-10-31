import { buildMetadata } from "@/lib/seo";
import { softwareApplicationSchema } from "@/lib/schema";
import { home, homeSections, type HomeSection } from "@/content/home";
import { faqs } from "@/content/faqs";
import { pricing } from "@/content/pricing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/home/Hero";
import { DashboardMarquee, PressLogos, TechMarquee } from "@/components/sections/home/LogoStrips";
import { About, Stats } from "@/components/sections/home/About";
import { Services } from "@/components/sections/home/Services";
import { Features, MobileApp } from "@/components/sections/home/Features";
import { CtaTagline, PricingSection, TestimonialsSection } from "@/components/sections/home/ClosingSections";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { PresenceSection } from "@/components/sections/presence/PresenceSection";

export const metadata = buildMetadata("home");

/* Section key (from /content/home.ts → homeSections) → component */
const sectionMap: Record<HomeSection, () => React.ReactNode> = {
  hero: Hero,
  dashboardMarquee: DashboardMarquee,
  pressLogos: PressLogos,
  about: About,
  stats: Stats,
  techMarquee: TechMarquee,
  services: Services,
  features: Features,
  mobileApp: MobileApp,
  pricing: PricingSection,
  testimonials: TestimonialsSection,
  presence: () => <PresenceSection />,
  ctaTagline: CtaTagline,
  faq: () => (
    <FaqSection
      pill={home.faq.label}
      heading={home.faq.heading}
      text={home.faq.text}
      contactHeading={home.faq.contactHeading}
      contactCta={home.faq.contactCta}
      items={faqs.home}
    />
  ),
};

export default function HomePage() {
  return (
    <>
      {homeSections.map((key) => {
        const Section = sectionMap[key];
        return <Section key={key} />;
      })}
      <JsonLd data={softwareApplicationSchema(pricing.plans)} />
    </>
  );
}
