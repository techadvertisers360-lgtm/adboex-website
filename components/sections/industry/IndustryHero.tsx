import { Star } from "lucide-react";
import { industryTemplate as t, type Industry } from "@/content/industries";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { DemoButton } from "@/components/demo/DemoButton";

const delay = (s: number) => ({ "--fx-delay": `${s}s` }) as React.CSSProperties;

/** Mono label with a small blue square (reference industry pages). */
export function MonoLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-white/55 uppercase md:text-[12px] ${className}`}>
      <span aria-hidden="true" className="size-1.5 bg-lime" />
      {children}
    </p>
  );
}

/** Heading in two tones: first half white, rest grey; `highlight` words get the brand gradient. */
export function TwoToneHeading({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const words = text.split(" ");
  const half = Math.ceil(words.length / 2);
  const marks = new Set(highlight.map((w) => w.toLowerCase()));
  return (
    <>
      {words.map((w, i) => {
        const hl = marks.has(w.toLowerCase().replace(/[^\w-]/g, ""));
        return (
          <span key={i} className={hl ? "bg-[linear-gradient(90deg,#4089f0,#a855f7)] bg-clip-text text-transparent" : i < half ? "text-white" : "text-white/55"}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

/** Industry hero (reference): text left, "Local visibility score" gauge card right. */
export function IndustryHero({ industry }: { industry: Industry }) {
  const h = industry.hero;
  const s = h.score;
  // semicircle gauge: arc length of a half circle with r = 80
  const len = Math.PI * 80;
  return (
    <section aria-labelledby="page-heading" className="relative overflow-hidden pt-32 pb-16 md:pt-[150px] md:pb-20">
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_440px] lg:gap-16">
        <div className="flex flex-col items-start">
          <Breadcrumbs
            items={[
              { name: "Industries", path: "/industries/" },
              { name: industry.name, path: `/industries/${industry.slug}/` },
            ]}
            className="sr-only"
          />
          <div className="fx-zoom-load" style={delay(0)}>
            <MonoLabel>{h.pill}</MonoLabel>
          </div>
          <h1 id="page-heading" className="fx-zoom-load mt-5 text-[38px] leading-[1.1] font-medium tracking-[-0.05em] md:text-[60px] md:leading-[66px]" style={delay(0.05)}>
            <TwoToneHeading text={h.heading} highlight={h.highlight} />
          </h1>
          <p className="fx-zoom-load mt-6 max-w-[540px] text-[15px] leading-[24px] text-[#c7c7c7]" style={delay(0.15)}>
            {h.text}
          </p>
          <div className="fx-zoom-load mt-8 flex flex-col gap-6" style={delay(0.25)}>
            <div>
              <DemoButton variant="blue" arrow={false} source={`${industry.name} hero`}>
                Book a Live Demo
              </DemoButton>
            </div>
            <p className="flex items-center gap-3 text-[13px] text-white/75">
              <span className="flex gap-1 text-lime" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </span>
              Rated 4.9/5 by 400+ local business clients
            </p>
          </div>
        </div>

        {/* example score card (illustrative numbers) */}
        <figure className="fx-zoom-load rounded-[24px] border border-white/10 bg-[#161616] p-6" style={delay(0.35)} aria-label={`Example ${t.scoreCard.title} for a ${industry.name} business`}>
          <div className="flex items-center justify-between">
            <MonoLabel className="!text-[10px]">{t.scoreCard.title}</MonoLabel>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-lime uppercase">
              <span className="pulse-dot" aria-hidden="true" />
              {t.scoreCard.live}
            </span>
          </div>
          <div className="relative mx-auto mt-6 w-full max-w-[300px]">
            <svg viewBox="0 0 200 112" className="w-full" aria-hidden="true">
              <defs>
                <linearGradient id={`gauge-${industry.slug}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#4089f0" />
                  <stop offset="0.55" stopColor="#a855f7" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="rgb(255 255 255 / .08)" strokeWidth="14" strokeLinecap="round" />
              <path
                d="M20 100 A80 80 0 0 1 180 100"
                fill="none"
                stroke={`url(#gauge-${industry.slug})`}
                strokeWidth="14"
                strokeLinecap="round"
                className="gauge-arc"
                style={{ "--len": len, "--to": len * (1 - s.value / 100) } as React.CSSProperties}
              />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
              <span className="text-[56px] leading-none font-medium tracking-[-0.05em] text-white">{s.value}</span>
              <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-white/45">OUT OF 100</span>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-2.5">
            <div className="flex flex-col rounded-[12px] border border-white/10 bg-white/[0.03] p-3">
              <dt className="mt-1 text-[11px] text-white/50">{t.scoreCard.rankLabel}</dt>
              <dd className="order-first text-[20px] font-medium tracking-[-0.03em] text-[#4ade80]">{s.rank}</dd>
            </div>
            <div className="flex flex-col rounded-[12px] border border-white/10 bg-white/[0.03] p-3">
              <dt className="mt-1 text-[11px] text-white/50">
                {s.reviews} {t.scoreCard.reviewsLabel}
              </dt>
              <dd className="order-first text-[20px] font-medium tracking-[-0.03em] text-[#f472b6]">{s.rating}★</dd>
            </div>
            <div className="flex flex-col rounded-[12px] border border-white/10 bg-white/[0.03] p-3">
              <dt className="mt-1 text-[11px] text-white/50">{t.scoreCard.callsLabel}</dt>
              <dd className="order-first text-[20px] font-medium tracking-[-0.03em] text-[#60a5fa]">{s.calls}</dd>
            </div>
          </dl>
          <figcaption className="sr-only">Illustrative example dashboard values</figcaption>
        </figure>
      </div>
    </section>
  );
}
