import { home } from "@/content/home";
import { AnimatedTabs } from "@/components/motion/AnimatedTabs";
import { DemoButton } from "@/components/demo/DemoButton";
import { Reveal } from "@/components/motion/Reveal";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { CardIcon } from "@/components/sections/home/CardIcon";

/**
 * 7. Services (reference layout): centred header, full-width tab bar, then a
 * wrapper card holding an inner card — text + light button left, animated
 * scene right. All tab text is in the HTML.
 */
export function Services() {
  const s = home.services;
  const panels = s.tabs.map((t) => (
    <div key={t.tab} className="surface-1 rounded-[24px] p-3">
      <div className="surface-2 grid items-center gap-8 rounded-[12px] p-5 md:min-h-[440px] md:grid-cols-2 md:gap-12 md:p-5">
        <div className="flex flex-col items-start gap-5 md:pl-7">
          <CardIcon name={t.icon} />
          <h3 className="text-[28px] leading-[1.3] font-medium tracking-[-0.04em] md:text-[32px]">{t.title}</h3>
          <p className="text-soft max-w-[500px]">{t.text}</p>
          <DemoButton variant="light" arrow={false} source={`Services: ${t.tab}`} className="mt-3">
            {t.cta}
          </DemoButton>
        </div>
        <ProductVisual kind={t.visual} video={t.video} label={`Animated preview: ${t.title}`} />
      </div>
    </div>
  ));

  return (
    <section id="services" aria-labelledby="services-heading" className="section">
      <div className="container-x">
        <SectionHeader pill={s.label} id="services-heading" title={s.heading} text={s.text} />
        <Reveal className="mt-14">
          <AnimatedTabs label="Adboex services" tabs={s.tabs.map((t) => t.tab)} panels={panels} />
        </Reveal>
      </div>
    </section>
  );
}
