import Link from "next/link";
import { Check } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import { DemoButton } from "@/components/demo/DemoButton";
import { cn } from "@/lib/utils";
import { ProductVisual, type VisualKind } from "@/components/visuals/ProductVisual";

export type FeatureRow = {
  id: string;
  pill?: string;
  title: string;
  text: string;
  bullets?: string[];
  cta?: string;
  link?: { label: string; href: string };
  /** animated product scene (preferred) … */
  visual?: VisualKind;
  video?: string;
  /** … or a picture */
  image?: { src: string; alt: string };
};

/** Alternating image-left / image-right feature blocks (Platform page, About page …). */
export function FeatureRows({ rows, headingLevel = 2 }: { rows: FeatureRow[]; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2";
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      {rows.map((row, i) => (
        <article key={row.id} id={row.id} aria-labelledby={`${row.id}-title`} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal effect={i % 2 === 1 ? "right" : "left"} className={cn("flex flex-col items-start gap-5", i % 2 === 1 && "md:order-2")}>
            {row.pill && <p className="label">{row.pill}</p>}
            <H id={`${row.id}-title`} className={headingLevel === 2 ? "type-h2" : "type-h3"}>
              {row.title}
            </H>
            <p className="text-soft md:text-[17px]">{row.text}</p>
            {row.bullets && (
              <ul className="flex flex-col gap-3">
                {row.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-title">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-lime/15 text-lime">
                      <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-5">
              {row.cta && <DemoButton source={row.title}>{row.cta}</DemoButton>}
              {row.link && (
                <Link href={row.link.href} className="font-semibold text-lime underline-offset-4 hover:underline">
                  {row.link.label}
                </Link>
              )}
            </div>
          </Reveal>
          <Reveal effect="zoom" className={cn(i % 2 === 1 && "md:order-1")}>
            <div className="surface-1 overflow-hidden rounded-[24px] p-3">
              {row.visual || row.video ? (
                <ProductVisual kind={row.visual ?? "website"} video={row.video} label={`Animated preview: ${row.title}`} />
              ) : row.image ? (
                <Img src={row.image.src} alt={row.image.alt} width={1216} height={974} sizes="(max-width: 768px) 100vw, 600px" className="h-auto w-full rounded-[12px]" />
              ) : null}
            </div>
          </Reveal>
        </article>
      ))}
    </div>
  );
}
