import { Check, Flame, Rocket, Star, type LucideIcon } from "lucide-react";
import { pricing, yearlyPrice, type Plan } from "@/content/pricing";
import { DemoButton } from "@/components/demo/DemoButton";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * The 3 pricing cards (reference style): dark cards, icon square + mono
 * UPPERCASE plan name, price, outline mono button; the popular plan is a
 * white card with a blue button. Old price is struck through.
 * dual = monthly AND yearly prices in the HTML; a parent with class "group"
 * and data-billing="yearly|monthly" decides which shows.
 */
const planIcons: LucideIcon[] = [Rocket, Star, Flame];

export function PricingCards({
  billing = "monthly",
  showFeatures = true,
  headingLevel = 3,
  dual = false,
}: {
  billing?: "monthly" | "yearly";
  showFeatures?: boolean;
  headingLevel?: 2 | 3;
  dual?: boolean;
}) {
  const H = `h${headingLevel}` as "h3";
  return (
    <Reveal stagger effect="zoom" as="ul" className="grid items-stretch gap-4 lg:grid-cols-3">
      {pricing.plans.map((plan: Plan, i) => {
        const popular = !!plan.popular;
        const Icon = planIcons[i] ?? Star;
        const variants = dual ? (["monthly", "yearly"] as const) : ([billing] as const);
        return (
          <li key={plan.id}>
            <article className={cn("card-hover relative flex h-full flex-col rounded-[12px] p-6 md:p-7", popular ? "bg-white text-[#131313]" : "bg-white/[0.04] text-white")}>
              {popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-lime px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-white uppercase shadow-[0_8px_20px_-6px_rgb(64_137_240/0.7)]">
                  {pricing.popularLabel}
                </span>
              )}
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className={cn("grid size-8 place-items-center rounded-[8px]", popular ? "bg-black/[0.06] text-azure" : "bg-white/10 text-white")}>
                  <Icon className="size-4" />
                </span>
                <H className={cn("font-mono text-[15px] leading-[22px] font-medium tracking-[1px] uppercase", popular ? "text-[#131313]" : "text-white")}>{plan.name}</H>
              </div>
              <p className={cn("mt-4 min-h-12 text-[15px]", popular ? "text-black/70" : "text-white/75")}>{plan.tagline}</p>

              {variants.map((v) => {
                const price = v === "yearly" ? yearlyPrice(plan.price) : plan.price;
                const old = plan.oldPrice ? (v === "yearly" ? yearlyPrice(plan.oldPrice) : plan.oldPrice) : null;
                const vis = !dual ? "" : v === "yearly" ? "hidden group-data-[billing=yearly]:block" : "group-data-[billing=yearly]:hidden";
                return (
                  <div key={v} className={vis}>
                    <p className="mt-5 flex items-baseline gap-2">
                      {old && (
                        <s className={cn("text-[24px] font-medium tracking-[-0.04em]", popular ? "text-black/35" : "text-white/40")}>
                          <span className="sr-only">Was </span>${old}
                        </s>
                      )}
                      <span className="text-[44px] leading-none font-medium tracking-[-0.06em]">
                        {old && <span className="sr-only">Now </span>}${price}
                      </span>
                      <span className={cn("text-[15px]", popular ? "text-black/55" : "text-white/55")}>{pricing.perMonthLabel}</span>
                    </p>
                    {v === "yearly" && <p className="mt-1 text-sm text-lime">Billed yearly · save {Math.round(pricing.yearlyDiscount * 100)}%</p>}
                  </div>
                );
              })}

              <DemoButton variant={popular ? "blue" : "outline"} arrow={false} source={`Pricing: ${plan.name}`} className="mt-6 w-full">
                {plan.cta}
              </DemoButton>

              {showFeatures && (
                <ul className={cn("mt-7 flex flex-col gap-3 border-t pt-6", popular ? "border-black/10" : "border-white/10")}>
                  {plan.features.map((f) => (
                    <li key={f} className={cn("flex items-start gap-3 text-[15px]", popular ? "text-black/75" : "text-white/80")}>
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-lime" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        );
      })}
    </Reveal>
  );
}
