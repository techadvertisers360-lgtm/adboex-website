import { Star } from "lucide-react";
import { home } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { CardIcon } from "@/components/sections/home/CardIcon";
import { cn } from "@/lib/utils";

/** One feature row: text + animated scene, sides alternate. */
function FeatureRow({
  icon,
  title,
  text,
  visual,
  video,
  flip,
  children,
}: (typeof home.features.rows)[number] & { flip: boolean; children?: React.ReactNode }) {
  return (
    <article className="surface-2 grid items-center gap-8 rounded-[12px] p-5 md:min-h-[440px] md:grid-cols-2 md:gap-12">
      <div className={cn("flex flex-col items-start gap-5", flip ? "md:order-2 md:pl-4" : "md:pl-7")}>
        <CardIcon name={icon} />
        <h3 className="text-[28px] leading-[1.3] font-medium tracking-[-0.04em] md:text-[32px]">{title}</h3>
        <p className="text-soft max-w-[500px]">{text}</p>
        {children}
      </div>
      <ProductVisual kind={visual} video={video} label={`Animated preview: ${title}`} className={cn(flip && "md:order-1")} />
    </article>
  );
}

/** 8. Features: header + one wrapper card with 4 alternating rows (reference layout). */
export function Features() {
  const f = home.features;
  return (
    <section id="features" aria-labelledby="features-heading" className="section pb-5 md:pb-5">
      <div className="container-x">
        <SectionHeader pill={f.label} id="features-heading" title={f.heading} text={f.text} />
        <Reveal className="surface-1 mt-14 flex flex-col gap-3 rounded-[24px] p-3">
          {f.rows.map((row, i) => (
            <FeatureRow key={row.title} {...row} flip={i % 2 === 1} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* App store badges (light = App Store, dark = Google Play, like the reference) */
function StoreBadge({ kind, label, store, href }: { kind: "apple" | "google"; label: string; store: string; href: string }) {
  const light = kind === "apple";
  const inner = (
    <>
      {kind === "apple" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
          <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1ZM13.9 4.9c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3-1.5Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
          <path d="M3.6 2.3c-.3.3-.4.8-.4 1.3v16.8c0 .5.1 1 .4 1.3l9.4-9.7-9.4-9.7Zm10.4 10.7 2.6 2.7-11.3 6.5 8.7-9.2Zm0-2L5.3 1.8l11.3 6.5-2.6 2.7Zm3.7 3.9-2.9-3 2.9-2.9 3.4 2c1 .6 1 1.4 0 2l-3.4 1.9Z" />
        </svg>
      )}
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] opacity-75">{label}</span>
        <span className="text-[17px] font-semibold tracking-[-0.02em]">{store}</span>
      </span>
    </>
  );
  const cls = cn(
    "flex h-[52px] items-center gap-2.5 rounded-[10px] px-4 transition-transform hover:-translate-y-0.5",
    light ? "bg-[#ececec] text-black" : "bg-white/10 text-white"
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${label} ${store}`}>
      {inner}
    </a>
  ) : (
    <span className={cls}>{inner}</span>
  );
}

/** 9. Mobile App: same big-card style with store badges and rating. */
export function MobileApp() {
  const a = home.mobileApp;
  return (
    <section aria-labelledby="mobile-app-heading" className="pb-20 md:pb-28">
      <div className="container-x">
        <Reveal className="surface-1 rounded-[24px] p-3">
          <div className="surface-2 grid items-center gap-8 rounded-[12px] p-5 md:min-h-[440px] md:grid-cols-2 md:gap-12">
            <div className="flex flex-col items-start gap-5 md:pl-7">
              <CardIcon name={a.icon} />
              <h2 id="mobile-app-heading" className="text-[28px] leading-[1.3] font-medium tracking-[-0.04em] md:text-[32px]">
                {a.title}
              </h2>
              <p className="text-soft max-w-[500px]">{a.text}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <StoreBadge kind="apple" {...a.appStore} />
                <StoreBadge kind="google" {...a.googlePlay} />
              </div>
              <p className="mt-2 flex items-center gap-2 text-[14px] text-white/75">
                <span className="flex gap-0.5 text-[#facc15]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                {a.rating}
              </p>
            </div>
            <ProductVisual kind={a.visual} video={a.video} label="Animated preview: Adboex mobile app" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
