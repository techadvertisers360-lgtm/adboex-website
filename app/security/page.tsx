import { buildMetadata } from "@/lib/seo";
import { securityPage as s } from "@/content/security";
import { DemoButton } from "@/components/demo/DemoButton";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/shared/PageHero";

/* Text for this page lives in /content/security.ts */
export const metadata = buildMetadata("security");

/** Reference layout: hero, six practice cards (3×2), privacy-first block with demo button. */
export default function SecurityPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Security", path: "/security/" }]} pill={s.hero.pill} title={s.hero.heading} text={<p>{s.hero.text}</p>} />

      <section aria-labelledby="practices-heading" className="pb-20 md:pb-28">
        <div className="container-x">
          <h2 id="practices-heading" className="sr-only">
            Our security practices
          </h2>
          <Reveal stagger effect="zoom" as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.cards.map((c) => (
              <li key={c.title} className="surface-1 flex flex-col gap-5 rounded-[24px] p-8">
                <h3 className="text-[20px] leading-[1.2] font-medium tracking-[-0.04em] text-white">{c.title}</h3>
                <p className="text-[16px] leading-[26px] tracking-[-0.02em] text-[#c7c7c7]">{c.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="privacy-heading" className="section pt-0">
        <Reveal stagger className="container-x flex flex-col items-center gap-6 text-center">
          <p className="label">{s.closing.pill}</p>
          <h2 id="privacy-heading" className="type-h2 max-w-[560px] tracking-[-0.06em]">
            {s.closing.heading}
          </h2>
          <p className="max-w-[600px] text-[#ededed]">{s.closing.text}</p>
          <div className="mt-2">
            <DemoButton variant="blue" arrow={false} source="Security page">
              {s.closing.cta}
            </DemoButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
