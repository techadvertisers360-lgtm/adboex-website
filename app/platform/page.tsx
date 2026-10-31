import { CalendarCheck, Check, Clapperboard, Mic, Receipt, Swords, type LucideIcon } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { softwareApplicationSchema } from "@/lib/schema";
import { platform, platformSections } from "@/content/platform";
import { faqs } from "@/content/faqs";
import { pricing } from "@/content/pricing";
import { JsonLd } from "@/components/seo/JsonLd";
import { DemoButton } from "@/components/demo/DemoButton";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { FeatureRows } from "@/components/sections/shared/FeatureRows";
import { CardSlider } from "@/components/sections/shared/CardSlider";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { StatsGrid } from "@/components/sections/shared/StatsGrid";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBlock } from "@/components/sections/shared/CtaBlock";
import { TechMarquee } from "@/components/sections/home/LogoStrips";

export const metadata = buildMetadata("platform");

const icons: Record<string, LucideIcon> = { mic: Mic, swords: Swords, receipt: Receipt, clapperboard: Clapperboard, calendar: CalendarCheck };

const sections: Record<(typeof platformSections)[number], () => React.ReactNode> = {
  hero: () => (
    <PageHero
      crumbs={[{ name: "Platform", path: "/platform/" }]}
      pill={platform.hero.pill}
      title={platform.hero.heading}
      highlight={platform.hero.highlight}
      text={<p>{platform.hero.text}</p>}
      backgroundVideo={platform.hero.backgroundVideo || undefined}
    >
      <DemoButton variant="blue" arrow={false} source="Platform hero">{platform.hero.cta}</DemoButton>
    </PageHero>
  ),

  slider: () => {
    const s = platform.slider;
    return <CardSlider id="growth" pill={s.pill} heading={s.heading} text={s.text} cards={s.cards} />;
  },

  features: () => (
    <section aria-labelledby="features-heading" className="section">
      <div className="container-x">
        <SectionHeader pill={platform.features.pill} id="features-heading" title={platform.features.heading} />
        <div className="mt-20">
          <FeatureRows rows={platform.features.rows} headingLevel={3} />
        </div>
      </div>
    </section>
  ),

  tech: TechMarquee,

  max: () => {
    const m = platform.max;
    return (
      <section id="max" aria-labelledby="max-heading" className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal effect="left">
            <SectionHeader pill={m.pill} id="max-heading" title={m.heading} text={m.text} align="left" />
            <Reveal stagger effect="zoom" as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
              {m.cards.map((c) => {
                const Icon = icons[c.icon] ?? Mic;
                return (
                  <li key={c.title} className="card card-hover flex flex-col gap-3 p-6 last:sm:col-span-2">
                    <span className="grid size-10 place-items-center rounded-full bg-lime/15 text-lime">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="text-lg font-semibold text-title">{c.title}</h3>
                    <p className="text-[15px] text-copy">{c.text}</p>
                  </li>
                );
              })}
            </Reveal>
            <div className="mt-8">
              <DemoButton source="Platform: Max">{m.cta}</DemoButton>
            </div>
          </Reveal>
          <Reveal effect="right" className="relative mx-auto w-full max-w-xl">
            <div aria-hidden="true" className="absolute inset-10 rounded-full bg-azure/20 blur-[80px]" />
            <div className="surface-1 relative rounded-[24px] p-3">
              <ProductVisual kind={m.visual} label="Animated preview: Max in the Adboex mobile app" />
            </div>
          </Reveal>
        </div>
      </section>
    );
  },

  aiHuman: () => {
    const a = platform.aiHuman;
    return (
      <section aria-labelledby="ai-human-heading" className="section">
        <div className="container-x grid items-center gap-12 md:grid-cols-2">
          <Reveal effect="left" className="card overflow-hidden p-2">
            <Img src={a.image.src} alt={a.image.alt} width={1216} height={974} sizes="(max-width: 768px) 100vw, 600px" className="h-auto w-full rounded-[calc(var(--radius-card)-6px)]" />
          </Reveal>
          <Reveal effect="right" className="flex flex-col items-start gap-5">
            <p className="label">{a.pill}</p>
            <h2 id="ai-human-heading" className="type-h2">
              {a.heading}
            </h2>
            <p className="text-copy md:text-[17px]">{a.text}</p>
            <ul className="flex flex-col gap-3">
              {a.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-title">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-lime" strokeWidth={3} />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    );
  },

  stats: () => (
    <section aria-labelledby="stats-heading" className="section pt-0">
      <div className="container-x">
        <SectionHeader pill={platform.stats.pill} id="stats-heading" title={platform.stats.heading} />
        <StatsGrid stats={platform.stats.items} className="mt-12" />
      </div>
    </section>
  ),

  faq: () => <FaqSection heading={platform.faq.heading} text={platform.faq.text} items={faqs.platform} />,

  cta: () => <CtaBlock heading={platform.cta.heading} text={platform.cta.text} cta={platform.cta.cta} />,
};

export default function PlatformPage() {
  return (
    <>
      {platformSections.map((key) => {
        const Section = sections[key];
        return <Section key={key} />;
      })}
      <JsonLd data={softwareApplicationSchema(pricing.plans)} />
    </>
  );
}
