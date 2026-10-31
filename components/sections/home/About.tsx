import Image from "next/image";
import Link from "next/link";
import { BarChart3, Globe, Image as ImageIcon, MapPin, MessageSquare, Search } from "lucide-react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { InlineIconHeading } from "@/components/motion/InlineIconHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

/** 4. About: "▪ ABOUT US" on the left; two-tone heading with round icons + paragraph on the right. */
export function About() {
  const a = home.about;
  return (
    <section aria-labelledby="about-heading" className="section pb-14 md:pb-16">
      <div className="container-x grid gap-8 md:grid-cols-2 md:gap-12">
        <Reveal>
          <p className="label">{a.label}</p>
        </Reveal>
        <Reveal className="flex flex-col gap-8">
          <InlineIconHeading id="about-heading" parts={a.heading} className="leading-[1.28]" />
          <p className="text-soft">{a.text}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** One row of white industry pills scrolling inside the light card. */
function PillRow({ items, reverse = false }: { items: { label: string; href: string }[]; reverse?: boolean }) {
  const copy = (dup: boolean) =>
    items.map((it) => (
      <Link
        key={(dup ? "d-" : "") + it.href}
        href={it.href}
        tabIndex={dup ? -1 : undefined}
        aria-hidden={dup || undefined}
        className="mr-2 rounded-full bg-white px-3 py-2 text-[13px] leading-none whitespace-nowrap text-[#131313] transition-colors hover:bg-black hover:text-white"
      >
        {it.label}
      </Link>
    ));
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="pill-row" data-reverse={reverse} style={{ "--marquee-duration": "26s" } as React.CSSProperties}>
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

/** 5. Stats: 4 cards (brand card · 400+ with industry pills · 24/7 · 2 connections). */
export function Stats() {
  const s = home.stats;
  const half = Math.ceil(s.businesses.industries.length / 2);
  return (
    <section aria-label="Adboex in numbers" className="pb-6">
      <Reveal stagger as="ul" className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* brand card with floating icon tiles */}
        <li className="relative h-[245px] overflow-hidden rounded-[24px] bg-[radial-gradient(90%_80%_at_70%_100%,#2b6fd6_0%,#14204a_45%,#131320_100%)]">
          {[
            { Icon: Search, cls: "top-[14%] left-[12%]", r: "-8deg", dl: "0s" },
            { Icon: ImageIcon, cls: "top-[28%] left-[38%]", r: "6deg", dl: ".6s" },
            { Icon: MessageSquare, cls: "top-[12%] right-[14%]", r: "10deg", dl: "1.1s" },
            { Icon: BarChart3, cls: "top-[46%] left-[18%]", r: "-4deg", dl: "1.6s" },
          ].map(({ Icon, cls, r, dl }, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`vz-float absolute grid size-11 place-items-center rounded-[12px] border border-white/10 bg-white/[0.06] text-[#a5c8fa] backdrop-blur ${cls}`}
              style={{ "--r": r, "--d": dl } as React.CSSProperties}
            >
              <Icon className="size-5" />
            </span>
          ))}
          <div className="absolute right-[-10%] bottom-[-14%] grid h-[62%] w-[78%] rotate-[-8deg] place-items-center rounded-[28px] bg-gradient-to-br from-[#5b9bf5] to-[#2b6fd6] shadow-[0_20px_50px_-10px_rgb(43_111_214/0.7)]">
            <Image src={site.logo.src} alt={s.brandCard.alt} width={site.logo.width * 1.5} height={site.logo.height * 1.5} unoptimized className="w-[62%] rotate-[8deg]" />
          </div>
        </li>

        {/* light card: industry pills + 400+ */}
        <li className="flex h-[245px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#ececec] py-5">
          <div className="flex flex-col gap-2">
            <PillRow items={s.businesses.industries.slice(0, half)} />
            <PillRow items={s.businesses.industries.slice(half)} reverse />
          </div>
          <div className="px-5">
            <p className="text-[40px] leading-[48px] font-medium tracking-[-0.06em] text-black">
              <CountUp value={s.businesses.value} suffix={s.businesses.suffix} />
            </p>
            <p className="mt-1 text-[15px] leading-snug tracking-[-0.02em] text-black/80">{s.businesses.text}</p>
          </div>
        </li>

        {/* dark gradient card: 24/7 */}
        <li className="relative flex h-[245px] flex-col justify-between overflow-hidden rounded-[24px] bg-[radial-gradient(80%_70%_at_80%_0%,#23407a_0%,#16203d_45%,#141418_100%)] p-5">
          <p className="text-[16px] font-medium text-white">{s.inquiries.title}</p>
          <div>
            <p className="text-[40px] leading-[48px] font-medium tracking-[-0.06em] text-white">{s.inquiries.display}</p>
            <p className="text-soft mt-1 text-[15px] leading-snug">{s.inquiries.text}</p>
          </div>
        </li>

        {/* light card: 2 core connections with app icons */}
        <li className="relative flex h-[245px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#ececec] p-5">
          <p className="text-[16px] font-medium text-black">{s.connections.title}</p>
          <span aria-hidden="true" className="vz-float absolute top-4 right-5 grid size-11 place-items-center rounded-[12px] bg-gradient-to-br from-[#7c3aed] to-[#2b6fd6] text-white shadow-lg" style={{ "--r": "8deg" } as React.CSSProperties}>
            <Globe className="size-5" />
          </span>
          <span aria-hidden="true" className="vz-float absolute top-[72px] right-[52px] grid size-14 place-items-center rounded-[14px] bg-gradient-to-br from-[#4089f0] to-[#a855f7] text-white shadow-lg" style={{ "--r": "-6deg", "--d": ".8s" } as React.CSSProperties}>
            <MapPin className="size-6" />
          </span>
          <div>
            <p className="text-[40px] leading-[48px] font-medium tracking-[-0.06em] text-black">
              <CountUp value={s.connections.value} />
            </p>
            <p className="mt-1 text-[15px] leading-snug tracking-[-0.02em] text-black/80">{s.connections.text}</p>
          </div>
        </li>
      </Reveal>
    </section>
  );
}
