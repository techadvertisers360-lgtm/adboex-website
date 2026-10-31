import Image from "next/image";
import { home } from "@/content/home";
import { animations } from "@/content/animations";
import { Marquee } from "@/components/motion/Marquee";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/utils";

/** 2. Image strip under the hero: square tiles with a caption, infinite loop, pauses on hover. */
export function DashboardMarquee() {
  const d = home.dashboardMarquee;
  return (
    <section aria-label={d.label} className="pb-8">
      <Marquee
        items={d.images}
        seconds={animations.marquee.screenshotsS}
        gap={16}
        renderItem={(img, dup, i) => (
          <figure className="relative size-[200px] overflow-hidden rounded-[12px] md:size-[250px]">
            <Img src={img.src} alt={dup ? "" : img.alt} width={500} height={500} sizes="250px" eager={!dup && i < 5} className="size-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pt-10 pb-3.5">
              <span className="block text-[17px] leading-tight font-semibold tracking-[-0.02em] text-white">{img.title}</span>
              <span className="mt-0.5 block text-[13px] text-white/75">{img.caption}</span>
            </figcaption>
          </figure>
        )}
      />
    </section>
  );
}

/** Decorative laurel branch (mirrored on the right). */
function Laurel({ flip = false }: { flip?: boolean }) {
  const leaves = Array.from({ length: 7 }, (_, i) => i);
  return (
    <svg viewBox="0 0 60 120" aria-hidden="true" className={cn("h-[110px] w-auto text-white/55", flip && "-scale-x-100")}>
      <path d="M40 112 C18 92 12 60 26 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {leaves.map((i) => {
        const t = i / 6;
        const y = 104 - t * 88;
        const x = 36 - Math.sin(t * Math.PI * 0.9) * 18;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse cx="-7" cy="-2" rx="8" ry="3.2" transform="rotate(-35)" fill="currentColor" />
            <ellipse cx="7" cy="-4" rx="8" ry="3.2" transform="rotate(35)" fill="currentColor" />
          </g>
        );
      })}
    </svg>
  );
}

/** 3. "As seen on": spaced mono heading between lines, laurels left/right, white logos. */
export function PressLogos() {
  const p = home.pressLogos;
  return (
    <section aria-labelledby="press-heading" className="py-14 md:py-20">
      <div className="container-x">
        <div className="flex items-center gap-6">
          <span aria-hidden="true" className="h-px flex-1 bg-white/60" />
          <h2 id="press-heading" className="font-mono text-[18px] font-semibold tracking-[0.35em] text-white/85 uppercase md:text-[20px]">
            {p.label}
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-white/60" />
        </div>
        <div className="mt-8 flex items-center justify-between gap-6">
          <span className="hidden md:block">
            <Laurel />
          </span>
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-7 gap-y-6 lg:flex-nowrap">
            {p.logos.map((logo) => {
              const img = (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={40}
                  unoptimized
                  className="h-7 w-auto opacity-85 brightness-0 invert transition duration-300 hover:opacity-100 hover:brightness-100 hover:invert-0"
                />
              );
              return (
                <li key={logo.src}>
                  {logo.href ? (
                    <a href={logo.href} target="_blank" rel="sponsored nofollow noopener noreferrer">
                      {img}
                    </a>
                  ) : (
                    img
                  )}
                </li>
              );
            })}
          </ul>
          <span className="hidden md:block">
            <Laurel flip />
          </span>
        </div>
      </div>
    </section>
  );
}

/** 6. Technology logos: plain grey icons, infinite loop, no heading (reference). */
export function TechMarquee() {
  const t = home.techMarquee;
  return (
    <section aria-label={t.label} className="py-10 md:py-14">
      <Marquee
        items={t.logos}
        seconds={animations.marquee.logosS}
        gap={56}
        renderItem={(logo, dup) => (
          <Image
            src={logo.src}
            alt={dup ? "" : `${logo.name} logo`}
            width={160}
            height={40}
            unoptimized
            className="h-9 w-auto opacity-50 grayscale transition-opacity hover:opacity-90"
          />
        )}
      />
    </section>
  );
}
