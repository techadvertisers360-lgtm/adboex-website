import { Clock, MapPin, Send } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { careers } from "@/content/careers";
import { buttonClasses } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FaqSection } from "@/components/sections/shared/FaqSection";

export const metadata = buildMetadata("careers");

/** Reference layout: hero + big photo, team text + photo grid, open positions, FAQ. */
export default function CareersPage() {
  const c = careers;
  const [p1, p2, p3, p4] = c.team.photos;
  return (
    <>
      <PageHero crumbs={[{ name: "Careers", path: "/careers/" }]} pill={c.hero.pill} title={c.hero.heading} highlight={c.hero.highlight} text={<p>{c.hero.text}</p>} />

      <div className="container-x">
        <Reveal effect="zoom" className="overflow-hidden rounded-[12px]">
          <Img src={c.hero.image.src} alt={c.hero.image.alt} width={1600} height={760} eager sizes="(max-width: 1320px) 100vw, 1280px" className="aspect-[1280/600] h-auto w-full object-cover" />
        </Reveal>
      </div>

      <section aria-labelledby="team-heading" className="section">
        <div className="container-x">
          <Reveal stagger className="mx-auto flex max-w-[420px] flex-col items-center gap-6 text-center">
            <h2 id="team-heading" className="text-[28px] leading-[1.25] font-medium tracking-[-0.05em] text-white/80">
              {c.team.heading}
            </h2>
            <p className="max-w-[300px] text-[13px] leading-[1.6] text-[#c7c7c7]">{c.team.text}</p>
          </Reveal>

          <Reveal effect="zoom" className="surface-1 mt-14 grid gap-3 rounded-[24px] p-3">
            <div className="grid gap-3 md:grid-cols-[2.7fr_1fr]">
              {[p1, p2].map((p) => (
                <Img key={p.src} src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 768px) 100vw, 900px" className="h-[240px] w-full rounded-[12px] object-cover md:h-[380px]" />
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[p3, p4].map((p) => (
                <Img key={p.src} src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 768px) 100vw, 640px" className="h-[300px] w-full rounded-[12px] object-cover md:h-[600px]" />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="open-positions" aria-labelledby="openings-heading" className="section scroll-mt-24 pt-0">
        <div className="container-x">
          <Reveal stagger className="mx-auto flex max-w-[420px] flex-col items-center gap-5 text-center">
            <p className="label">{c.openingsPill}</p>
            <h2 id="openings-heading" className="type-h2 tracking-[-0.06em]">
              {c.openingsHeading}
            </h2>
            <p className="text-[13px] leading-[1.6] text-[#c7c7c7]">{c.openingsText}</p>
          </Reveal>

          <Reveal stagger effect="zoom" as="ul" className="mt-14 flex flex-col gap-[30px]">
            {c.openings.map((job) => (
              <li key={job.id} id={job.id} className="surface-1 flex scroll-mt-28 flex-col justify-between gap-6 rounded-[24px] p-8 md:flex-row md:items-center">
                <div>
                  <h3 className="text-[24px] leading-[1.3] font-medium tracking-[-0.04em] text-white">{job.title}</h3>
                  <p className="mt-5 flex flex-wrap gap-5 text-[15px] text-white">
                    <span className="flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-1.5">
                      <MapPin aria-hidden="true" className="size-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-1.5">
                      <Clock aria-hidden="true" className="size-4" />
                      {job.workplace}
                    </span>
                  </p>
                </div>
                <a href={`mailto:${c.applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`} className={buttonClasses("blue", "md", "shrink-0 gap-3 self-start md:self-auto")}>
                  {c.applyLabel}
                  <span className="sr-only"> for {job.title}</span>
                  <Send aria-hidden="true" className="size-4" />
                </a>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqSection heading={c.faq.heading} text={c.faq.text} items={c.faq.items} />
    </>
  );
}
