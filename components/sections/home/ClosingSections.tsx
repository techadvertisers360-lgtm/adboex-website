import Image from "next/image";
import { Info } from "lucide-react";
import { home } from "@/content/home";
import { pricing } from "@/content/pricing";
import { testimonials } from "@/content/testimonials";
import { DemoButton } from "@/components/demo/DemoButton";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { CardIcon } from "@/components/sections/home/CardIcon";
import { TestimonialSlider } from "@/components/sections/home/TestimonialSlider";
import { Orb } from "@/components/visuals/Orb";
import { cn } from "@/lib/utils";

/**
 * 10. Pricing (reference layout): header + button + note on the left,
 * plans stacked as horizontal cards on the right (popular plan = white card).
 */
export type ExtraPlan = { name: string; price: number; unit: string; text: string };

/** `extra` adds a one-time plan card under the monthly plans (industry pages: custom website). */
export function PricingSection({ extra }: { extra?: ExtraPlan } = {}) {
  const p = home.pricing;
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <SectionHeader pill={p.label} id="pricing-heading" title={p.heading} text={p.text} align="left">
          <DemoButton variant="blue" arrow={false} source="Pricing header" className="mt-3">
            {p.cta}
          </DemoButton>
          <p className="surface-1 mt-4 flex items-start gap-3 rounded-[12px] px-4 py-3.5 text-[13px] leading-relaxed text-white/85">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {p.note}
          </p>
        </SectionHeader>

        <Reveal stagger as="ul" className="flex flex-col gap-4">
          {pricing.plans.map((plan, i) => {
            const popular = !!plan.popular;
            return (
              <li key={plan.id}>
                <article
                  className={cn(
                    "card-hover relative flex flex-col gap-4 rounded-[12px] p-5",
                    popular ? "bg-white text-[#131313]" : "bg-white/[0.04] text-white"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <CardIcon name={p.planIcons[i] ?? "star"} light={popular} className="size-8 rounded-[8px]" />
                      <h3 className={cn("font-mono text-[15px] leading-[22px] font-medium tracking-[1px] uppercase", popular ? "text-[#131313]" : "text-white")}>
                        {plan.name}
                        {popular && <span className="sr-only"> ({pricing.popularLabel})</span>}
                      </h3>
                    </div>
                    <p className="flex items-baseline gap-2">
                      {plan.oldPrice && (
                        <s className={cn("text-[24px] font-medium tracking-[-0.04em]", popular ? "text-black/40" : "text-white/40")}>
                          <span className="sr-only">Was </span>${plan.oldPrice}
                        </s>
                      )}
                      <span className="text-[32px] leading-none font-medium tracking-[-0.05em]">
                        {plan.oldPrice && <span className="sr-only">Now </span>}${plan.price}
                      </span>
                      <span className={cn("text-[15px]", popular ? "text-black/60" : "text-white/60")}>{pricing.perMonthLabel}</span>
                    </p>
                  </div>
                  <p className={cn("text-[15px]", popular ? "text-black/75" : "text-white/80")}>{plan.tagline}</p>
                  <DemoButton variant={popular ? "blue" : "outline"} arrow={false} source={`Pricing: ${plan.name}`} className="w-full">
                    {p.planCta}
                  </DemoButton>
                </article>
              </li>
            );
          })}
          {extra && (
            <li>
              <article className="card-hover relative flex flex-col gap-4 rounded-[12px] bg-white/[0.04] p-5 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CardIcon name="code" className="size-8 rounded-[8px]" />
                    <h3 className="font-mono text-[15px] leading-[22px] font-medium tracking-[1px] uppercase">{extra.name}</h3>
                  </div>
                  <p className="flex items-baseline gap-2">
                    <span className="text-[32px] leading-none font-medium tracking-[-0.05em]">${extra.price}</span>
                    <span className="text-[15px] text-white/60">{extra.unit}</span>
                  </p>
                </div>
                <p className="text-[15px] text-white/80">{extra.text}</p>
                <DemoButton variant="outline" arrow={false} source={`Pricing: ${extra.name}`} className="w-full">
                  {p.planCta}
                </DemoButton>
              </article>
            </li>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** 11. Testimonials: centred header + reference-style slider. */
export function TestimonialsSection() {
  const t = home.testimonials;
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="section">
      <div className="container-x">
        <SectionHeader pill={t.label} id="testimonials-heading" title={t.heading} text={t.text} />
        <Reveal className="mt-14">
          <TestimonialSlider items={testimonials} autoplaySeconds={t.autoplaySeconds} />
        </Reveal>
      </div>
    </section>
  );
}

/** 12. CTA + tagline: text, avatars and button left; photo card with the tagline right. */
export function CtaTagline() {
  const c = home.ctaTagline;
  return (
    <section aria-labelledby="cta-heading" className="pb-20 md:pb-28">
      <div className="container-x grid items-center gap-10 md:grid-cols-2">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 id="cta-heading" className="text-[20px] leading-[30px] font-normal tracking-normal">
            {c.heading}
          </h2>
          <span className="flex -space-x-3" aria-hidden="true">
            {c.avatars.map((src) => (
              <Image key={src} src={src} alt="" width={44} height={44} className="size-11 rounded-full border-2 border-page object-cover" />
            ))}
          </span>
          <p className="text-soft">{c.text}</p>
          <DemoButton variant="blue" arrow={false} source="CTA banner">
            {c.cta}
          </DemoButton>
        </Reveal>
        <Reveal className="relative isolate flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-[24px] bg-[#04050a] p-10 text-center md:min-h-[487px]">
          {c.card.spin ? (
            <Orb src={c.card.image} className="absolute top-1/2 left-1/2 -z-10 h-[92%] -translate-x-1/2 -translate-y-1/2" sizes="520px" />
          ) : (
            <Image src={c.card.image} alt="" fill sizes="(max-width: 768px) 100vw, 640px" className="-z-10 object-cover" />
          )}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/25" />
          <p className="label">{c.card.label}</p>
          <p className="mt-4 max-w-[400px] text-[34px] leading-[1.2] font-medium tracking-[-0.06em] text-white md:text-[40px]">{c.card.tagline}</p>
        </Reveal>
      </div>
    </section>
  );
}
