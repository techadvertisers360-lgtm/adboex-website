import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { DemoButton } from "@/components/demo/DemoButton";
import { Orb } from "@/components/visuals/Orb";

/**
 * Industries mega menu (reference layout): 700px frosted-glass panel —
 * dark card with heading, tagline and illustration on the left; two columns
 * of industry links and a full-width button on the right.
 * Text and links: /content/site.ts → nav.industries. Illustration: `image` there.
 */
export function MegaMenu() {
  const ind = site.nav.industries;
  return (
    <div className="grid w-[700px] max-w-[calc(100vw-48px)] grid-cols-[298px_1fr] gap-[30px] rounded-[20px] border border-white/[0.06] bg-white/[0.11] p-6 shadow-[0_25px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-[20px]">
      {/* left card */}
      <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[15px] bg-card p-5">
        <p className="text-[18px] leading-tight font-medium tracking-normal text-white">{ind.heading}</p>
        <p className="mt-3 text-[13px] leading-relaxed tracking-[-0.02em] text-[#c7c7c7]">{ind.tagline}</p>
        <Link href={ind.allHref} className="relative z-10 mt-3 inline-flex w-fit items-center gap-1 text-[13px] font-medium text-lime hover:underline">
          {ind.allLabel}
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
        <Orb src={ind.image} seconds={24} className="absolute -bottom-[22%] left-1/2 w-[78%] -translate-x-1/2" sizes="240px" />
      </div>

      {/* right: links + button */}
      <div className="flex flex-col justify-between gap-6 py-1">
        <ul className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-4">
          {ind.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-[7px] text-[15px] tracking-[-0.02em] text-[#e7e7e7] transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <DemoButton variant="nav" arrow={false} source="Mega menu" className="w-full">
          {ind.cta}
        </DemoButton>
      </div>
    </div>
  );
}

/** Small dropdown list (About Us, Resources) — mono text like the reference submenu. */
export function SimpleMenu({ items }: { items: { label: string; href: string; description?: string }[] }) {
  return (
    <ul className="flex w-64 flex-col">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="block rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.06]">
            <span className="block font-mono text-[15px] text-[#e0e0e0] uppercase tracking-[0.5px]">{item.label}</span>
            {item.description && <span className="mt-1 block text-[13px] text-subtle">{item.description}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
