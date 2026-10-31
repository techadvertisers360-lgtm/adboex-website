import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { industries, industryTemplate as t } from "@/content/industries";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/shared/PageHero";
import { DemoButton } from "@/components/demo/DemoButton";
import { CtaBlock } from "@/components/sections/shared/CtaBlock";

export const metadata = buildMetadata("industries");

export default function IndustriesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Industries", path: "/industries/" }]} pill={t.hubHero.pill} title={t.hubHero.heading} text={<p>{t.hubHero.text}</p>}>
        <DemoButton variant="blue" arrow={false} source="Industries hero">Book a Live Visibility Audit</DemoButton>
      </PageHero>

      <section aria-labelledby="grid-heading" className="pb-20 md:pb-28">
        <div className="container-x">
          <h2 id="grid-heading" className="type-h3 mb-10 text-center">
            {t.hubGrid.heading}
          </h2>
          <Reveal stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link href={`/industries/${ind.slug}/`} className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden border-b border-line">
                    <Img src={ind.image.src} alt={ind.image.alt} width={800} height={500} sizes="(max-width: 768px) 100vw, 400px" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="type-h4">{ind.serviceType}</h3>
                    <p className="text-[15px] text-copy">{ind.hero.text}</p>
                    <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-semibold text-lime">
                      {t.hubGrid.cta}
                      <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBlock heading="Don't see your industry?" text="Adboex works for most local service businesses, including dental and chiropractic practices. Book a live audit and we'll show you how." />
    </>
  );
}
