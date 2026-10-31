import Image from "next/image";
import { ArrowUp, Plus } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { about, aboutSections } from "@/content/about";
import { DemoButton } from "@/components/demo/DemoButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Img } from "@/components/ui/Img";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { PresenceSection } from "@/components/sections/presence/PresenceSection";

export const metadata = buildMetadata("about");

const delay = (s: number) => ({ "--fx-delay": `${s}s` }) as React.CSSProperties;

/** Reference layout: photo hero, experts + stats, mission, journey, offices (globe), FAQ. */
const sections: Record<(typeof aboutSections)[number], () => React.ReactNode> = {
  hero: () => {
    const h = about.hero;
    return (
      <section aria-labelledby="page-heading" className="px-3 pt-3">
        <Breadcrumbs items={[{ name: "About Us", path: "/about-us/" }]} className="sr-only" />
        <div className="relative isolate flex min-h-[640px] items-end overflow-hidden rounded-[24px] md:h-[calc(100svh-24px)] md:max-h-[820px] md:items-center">
          <Img src={h.image.src} alt={h.image.alt} width={1600} height={820} priority sizes="100vw" className="absolute inset-0 -z-10 size-full object-cover object-[center_80%]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(0_0_0/0.78)_0%,rgb(0_0_0/0.45)_45%,rgb(0_0_0/0.15)_100%)]" />
          <div className="w-full px-6 pb-14 md:px-[30px] md:pb-0 lg:px-[30px]">
            <div className="max-w-[620px]">
              <h1 id="page-heading" className="fx-zoom-load text-[34px] leading-[1.15] font-medium tracking-[-0.06em] text-white md:text-[44px] md:leading-[52px]" style={delay(0)}>
                {h.heading}
              </h1>
              <p className="fx-zoom-load mt-5 max-w-[600px] text-[14px] leading-[22px] text-white/90" style={delay(0.15)}>
                {h.text}
              </p>
              <div className="fx-zoom-load mt-7" style={delay(0.25)}>
                <DemoButton variant="light" arrow={false} source="About hero">
                  {h.cta}
                </DemoButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },

  experts: () => {
    const e = about.experts;
    return (
      <section aria-labelledby="experts-heading" className="section">
        <div className="container-x">
          <Reveal stagger effect="left" className="flex flex-col items-start gap-6">
            <p className="label">{e.pill}</p>
            <h2 id="experts-heading" className="type-h2 tracking-[-0.06em]">
              {e.heading}
              <br />
              <span className="text-white/45">{e.headingMuted}</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_416px]">
            <div className="flex flex-col gap-16">
              <Reveal className="flex flex-col gap-4">
                <div className="flex items-center">
                  {e.avatars.map((src) => (
                    <Image key={src} src={src} alt="" width={40} height={40} className="-mr-2.5 size-10 rounded-full border-2 border-page object-cover" />
                  ))}
                  <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-lime text-white">
                    <Plus className="size-5" />
                  </span>
                </div>
                <p className="text-[16px] tracking-[-0.03em] text-white">{e.trusted}</p>
              </Reveal>
              <Reveal stagger as="ul" className="grid gap-8 sm:grid-cols-2">
                {e.stats.map((s) => (
                  <li key={s.label} className="flex flex-col gap-4">
                    <span className="flex items-center gap-4">
                      <span aria-hidden="true" className="grid size-8 place-items-center rounded-[8px] bg-white/[0.08] text-white">
                        <ArrowUp className="size-4" />
                      </span>
                      <span className="text-[40px] leading-none font-medium tracking-[-0.05em] text-white">
                        <CountUp value={s.value} suffix={s.suffix} />
                      </span>
                    </span>
                    <span className="text-[16px] tracking-[-0.03em] text-white">{s.label}</span>
                  </li>
                ))}
              </Reveal>
            </div>
            <Reveal effect="zoom" className="overflow-hidden rounded-[16px]">
              <Img src={e.image.src} alt={e.image.alt} width={832} height={624} sizes="(max-width: 1024px) 100vw, 416px" className="aspect-[416/312] h-auto w-full object-cover" />
            </Reveal>
          </div>
        </div>
      </section>
    );
  },

  mission: () => {
    const m = about.mission;
    return (
      <section aria-labelledby="mission-heading" className="section pt-0">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[726px_1fr]">
          <Reveal effect="left" className="overflow-hidden rounded-[24px]">
            <Img src={m.image.src} alt={m.image.alt} width={1216} height={974} sizes="(max-width: 1024px) 100vw, 726px" className="aspect-[726/490] h-auto w-full object-cover" />
          </Reveal>
          <Reveal stagger effect="right" className="flex flex-col items-start gap-6">
            <p className="label">{m.pill}</p>
            <h2 id="mission-heading" className="text-[34px] leading-[1.2] font-medium tracking-[-0.06em] text-white md:text-[44px] md:leading-[52px]">
              {m.heading}
            </h2>
            <p className="text-[16px] leading-[26px] tracking-[-0.02em] text-[#c7c7c7]">{m.text}</p>
          </Reveal>
        </div>
      </section>
    );
  },

  journey: () => {
    const j = about.journey;
    return (
      <section aria-labelledby="journey-heading" className="section pt-0">
        <div className="container-x">
          <Reveal className="flex justify-center">
            <h2 id="journey-heading" className="label">
              {j.pill}
            </h2>
          </Reveal>
          <Reveal stagger effect="zoom" as="ol" className="surface-1 mt-14 grid gap-3 rounded-[24px] p-3 sm:grid-cols-2 lg:grid-cols-4">
            {j.items.map((item) => (
              <li key={item.year} className="surface-2 flex flex-col gap-6 rounded-[16px] p-2 pb-5">
                <span className="rounded-[10px] bg-white py-2.5 text-center text-[26px] leading-tight font-medium tracking-[-0.03em] text-[#131313]">{item.year}</span>
                <p className="px-2 text-center text-[16px] leading-[26px] tracking-[-0.02em] text-[#c7c7c7]">
                  <strong className="font-semibold text-white">{item.lead}</strong> {item.text}
                </p>
              </li>
            ))}
          </Reveal>
          <Reveal>
            <p className="mt-16 text-center text-[16px] tracking-[-0.02em] text-[#ededed]">{j.tagline}</p>
          </Reveal>
        </div>
      </section>
    );
  },

  presence: () => <PresenceSection id="about-presence" />,

  faq: () => <FaqSection heading={about.faq.heading} text={about.faq.text} items={about.faq.items} />,
};

export default function AboutPage() {
  return (
    <>
      {aboutSections.map((key) => {
        const Section = sections[key];
        return <Section key={key} />;
      })}
    </>
  );
}
