import { CircleCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { academy } from "@/content/academy";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ProductVisual } from "@/components/visuals/ProductVisual";

export const metadata = buildMetadata("academy");

/** Reference layout: hero, then seven alternating rows (text + checklist | animated card). */
export default function AcademyPage() {
  const a = academy;
  return (
    <>
      <PageHero crumbs={[{ name: "Academy", path: "/academy/" }]} pill={a.hero.pill} title={a.hero.heading} highlight={a.hero.highlight} text={<p>{a.hero.text}</p>} />
      <section aria-label="Learning sessions" className="pb-20 md:pb-32">
        <div className="container-x flex flex-col gap-[72px]">
          {a.sessions.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="surface-1 grid scroll-mt-28 items-center gap-6 rounded-[24px] p-5 lg:grid-cols-2 lg:gap-10">
                <Reveal stagger effect={flip ? "right" : "left"} className={cn("flex flex-col gap-6 px-3 py-4 lg:px-4", flip && "lg:order-2")}>
                  <h2 id={`${s.id}-heading`} className="text-[28px] leading-[1.25] font-medium tracking-[-0.05em] text-white md:text-[34px] md:leading-[44px]">
                    {s.title}
                  </h2>
                  <p className="text-[17px] leading-[26px] tracking-[-0.02em] text-[#c7c7c7]">{s.text}</p>
                  <ul className="flex flex-col gap-4">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[17px] leading-[24px] tracking-[-0.02em] text-[#ededed]">
                        <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 fill-white text-[#131313]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal effect="zoom" className={cn(flip && "lg:order-1")}>
                  <ProductVisual kind={s.visual} video={s.video} label={`${s.title} in the Adboex dashboard`} />
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
