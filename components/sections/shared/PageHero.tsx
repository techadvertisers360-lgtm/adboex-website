import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Hero for inner pages (reference sizes): "▪ LABEL", the page's one H1 (42px),
 * intro text and optional buttons. Breadcrumbs are screen-reader only (the
 * reference shows none) but still output BreadcrumbList schema. Like the reference, each part zooms in on
 * load (pure CSS — starts immediately, no waiting for JavaScript).
 * Optional `backgroundVideo` plays muted and looped behind the text.
 */
const delay = (s: number) => ({ "--fx-delay": `${s}s` }) as React.CSSProperties;

function withHighlights(text: string, highlight: string[]) {
  if (!highlight.length) return text;
  const marks = new Set(highlight.map((w) => w.toLowerCase()));
  return text.split(" ").map((word, i, all) => (
    <span key={i} className={marks.has(word.toLowerCase().replace(/[^\w-]/g, "")) ? "text-gradient" : undefined}>
      {word}
      {i < all.length - 1 ? " " : ""}
    </span>
  ));
}

export function PageHero({
  crumbs,
  pill,
  title,
  highlight = [],
  text,
  children,
  align = "center",
  backgroundVideo,
  className,
}: {
  crumbs: Crumb[];
  pill?: string;
  title: string;
  highlight?: string[];
  text?: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
  /** e.g. "/videos/demo.mp4" — muted, looped, behind the hero text */
  backgroundVideo?: string;
  className?: string;
}) {
  const center = align === "center";
  return (
    <section aria-labelledby="page-heading" className={cn("relative isolate overflow-hidden pt-32 pb-12 md:pt-[180px] md:pb-16", className)}>
      {backgroundVideo && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <video className="size-full object-cover" src={backgroundVideo} autoPlay muted loop playsInline preload="metadata" />
          <div className="absolute inset-0 bg-gradient-to-b from-page/80 via-page/65 to-page" />
        </div>
      )}
      <div aria-hidden="true" className="glow-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]" />
      <div className={cn("container-x relative flex flex-col", center ? "items-center text-center" : "items-start")}>
        <Breadcrumbs items={crumbs} className="sr-only" />
        {pill && (
          <p className="label fx-zoom-load" style={delay(0)}>
            {pill}
          </p>
        )}
        <h1 id="page-heading" className={cn("type-h2 fx-zoom-load mt-5 max-w-[560px] tracking-[-0.06em]", !center && "max-w-3xl")} style={delay(0.05)}>
          {withHighlights(title, highlight)}
        </h1>
        {text && (
          <div className="fx-zoom-load mt-5 max-w-[600px] text-[16px] leading-[26px] tracking-[-0.02em] text-[#ededed]" style={delay(0.15)}>
            {text}
          </div>
        )}
        {children && (
          <div className={cn("fx-zoom-load mt-8 flex flex-wrap gap-3", center && "justify-center")} style={delay(0.25)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
