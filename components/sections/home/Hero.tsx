import Image from "next/image";
import { CheckCircle2, Star } from "lucide-react";
import { home } from "@/content/home";
import { DemoButton } from "@/components/demo/DemoButton";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { WordReveal } from "@/components/motion/WordReveal";

/**
 * Home hero. The H1 is ONE real heading in the HTML (words are animated spans
 * inside it). No JS needed: the animation is CSS, so it never delays LCP.
 */
export function Hero() {
  const h = home.hero;
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
      {/* background image (decorative) + dark overlay so the text stays readable */}
      {h.background.src && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={h.background.src}
            alt=""
            fill
            priority
            quality={70}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: h.background.position }}
          />
          <div className="absolute inset-0 bg-page" style={{ opacity: h.background.overlay }} />
          {/* darker "spotlight" behind the centred text; image stays visible at the sides */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 48% 55% at 50% 48%, rgb(19 19 19 / ${h.background.spotlight}) 0%, rgb(19 19 19 / ${h.background.spotlight * 0.7}) 55%, transparent 100%)`,
            }}
          />
          {/* darker under the header and fades into the page at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-page/60 via-transparent via-40% to-page" />
        </div>
      )}
      {/* soft radial glows */}
      <div aria-hidden="true" className="glow-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-1/2 h-[420px] w-[820px] max-w-full -translate-x-1/2 rounded-full bg-azure/10 blur-[120px]"
      />

      <div className="container-x relative flex flex-col items-center text-center">
        <div className="fade-up-late" style={{ "--late-delay": "0s" } as React.CSSProperties}>
          <Pill>{h.pill}</Pill>
        </div>

        <h1 id="hero-heading" className="type-display mt-7 max-w-4xl">
          <WordReveal text={h.heading} highlight={h.highlight} />
        </h1>

        <p className="fade-up-late mt-6 max-w-2xl text-copy md:text-lg" style={{ "--late-delay": "0.55s" } as React.CSSProperties}>
          {h.text}
        </p>

        <div className="fade-up-late mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row" style={{ "--late-delay": "0.75s" } as React.CSSProperties}>
          <DemoButton source="Hero" className="w-full sm:w-auto">
            {h.primaryCta}
          </DemoButton>
          <ButtonLink href={h.secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
            {h.secondaryCta.label}
          </ButtonLink>
        </div>

        <p className="fade-up-late mt-6 flex items-center gap-2 text-sm text-copy" style={{ "--late-delay": "0.9s" } as React.CSSProperties}>
          <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-lime" />
          {h.bullet}
        </p>

        <div className="fade-up-late mt-8 flex items-center gap-4 rounded-full border border-line bg-card/70 py-2 pr-5 pl-2 backdrop-blur" style={{ "--late-delay": "1s" } as React.CSSProperties}>
          <span className="flex -space-x-3" aria-hidden="true">
            {h.rating.avatars.map((src) => (
              <Image key={src} src={src} alt="" width={36} height={36} className="size-9 rounded-full border-2 border-page object-cover" />
            ))}
          </span>
          <span className="flex flex-col items-start">
            <span className="flex gap-0.5 text-lime" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span className="text-sm font-medium text-title">{h.rating.text}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
