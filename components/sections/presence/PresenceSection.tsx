import Link from "next/link";
import { MapPin } from "lucide-react";
import { presence, type PresencePill } from "@/content/presence";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { GlobeLazy } from "@/components/sections/presence/GlobeLazy";
import { globe } from "@/content/globe";
import { cn } from "@/lib/utils";

/**
 * "Our presence" — rotating 3D network globe with floating office cards and
 * industry pills. Text lives in /content/presence.ts.
 * The globe (canvas) rotates; cards and pills stay fixed over it.
 * Office names/cities are real HTML text; a visually-hidden list is added for
 * screen readers (the decorative cards are hidden from them to avoid repeats).
 */
const toneCls: Record<PresencePill["tone"], string> = {
  blue: "bg-lime text-white shadow-[0_8px_24px_-8px_rgb(64_137_240/0.7)] hover:shadow-[0_10px_30px_-6px_rgb(64_137_240/0.9)]",
  dark: "bg-[#0b0b0f] text-white border border-white/10 hover:shadow-[0_10px_30px_-8px_rgb(255_255_255/0.25)]",
  purple: "bg-[#55196f] text-white shadow-[0_8px_24px_-8px_rgb(85_25_111/0.7)] hover:shadow-[0_10px_30px_-6px_rgb(85_25_111/0.95)]",
};

function Pill({ pill }: { pill: PresencePill }) {
  const cls = cn(
    "inline-flex items-center rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition-[translate,box-shadow] duration-300 hover:-translate-y-1 md:px-5 md:py-2.5 md:text-[15px]",
    toneCls[pill.tone]
  );
  return pill.href ? (
    <Link href={pill.href} className={cls}>
      {pill.label}
    </Link>
  ) : (
    <span className={cls}>{pill.label}</span>
  );
}

export function PresenceSection({ id = "presence" }: { id?: string }) {
  const p = presence;
  const half = Math.ceil(p.pills.length / 2);
  const rows = [p.pills.slice(0, half), p.pills.slice(half)];

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="section overflow-hidden">
      <div className="container-x">
        <SectionHeader pill={p.label} id={`${id}-heading`} title={p.heading} text={p.text} />

        {/* screen-reader list of offices (the floating cards below are decorative copies) */}
        <ul className="sr-only" aria-label={p.srListLabel}>
          {p.offices.map((o) => (
            <li key={o.title}>
              {o.title}: {o.city}
            </li>
          ))}
        </ul>

        <div className="relative mx-auto mt-12 max-w-[1100px] md:mt-16">
          {/* office cards — stacked above the globe on mobile, floating over it on desktop */}
          <ul aria-hidden="true" className="presence-cards mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:contents">
            {p.offices.map((o, i) => (
              <li
                key={o.title}
                data-reveal=""
                className="z-20 flex justify-center lg:absolute lg:block"
                style={{ top: o.card.top, left: o.card.left } as React.CSSProperties}
              >
                <div
                  className="vz-float relative w-full max-w-[260px] rounded-[16px] border border-white/40 bg-white/85 px-5 pt-6 pb-4 text-center shadow-[0_20px_45px_-15px_rgb(0_0_0/0.6)] backdrop-blur-md lg:w-[210px]"
                  style={{ "--r": `${o.card.rotate}deg`, "--d": `${i * 0.9}s`, animationDuration: `${5 + i * 1.3}s` } as React.CSSProperties}
                >
                  <span className="pin-drop absolute -top-4 left-1/2 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-[#ef4444] text-white shadow-[0_6px_14px_-4px_rgb(239_68_68/0.8)]" style={{ "--pd": `${0.25 + i * 0.18}s` } as React.CSSProperties}>
                    <MapPin className="size-4" />
                  </span>
                  <p className="text-[16px] font-bold tracking-[-0.02em] text-[#111]">{o.title}</p>
                  <p className="mt-0.5 text-[14px] text-black/60">{o.city}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* globe — height reserved by aspect-square (no layout shift) */}
          <div className="relative mx-auto aspect-square w-full max-w-[620px]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-[6%] rounded-full blur-2xl" style={{ background: `radial-gradient(circle, ${globe.glow} 0%, transparent 70%)` }} />
            <GlobeLazy image={p.staticImage} offices={p.offices} arcs={p.arcs} />
          </div>

          {/* industry pills — 2 centred rows overlapping the lower part of the globe */}
          <div className="relative z-20 -mt-[16%] flex flex-col items-center gap-3 lg:-mt-[13%]">
            {rows.map((row, r) => (
              <Reveal key={r} stagger as="ul" className="presence-pills flex flex-wrap justify-center gap-2.5 md:gap-3">
                {row.map((pill) => (
                  <li key={pill.label}>
                    <Pill pill={pill} />
                  </li>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
