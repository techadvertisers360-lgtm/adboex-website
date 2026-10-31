import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";

/** Site footer (reference: rounded card). All text and links come from /content/site.ts → footer, socials. */
export function Footer() {
  const f = site.footer;

  return (
    <footer className="px-3 pt-3 pb-3">
      <div className="rounded-[24px] bg-[#262626] px-6 pt-10 pb-10 md:px-10 md:pb-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_800px]">
          {/* Brand column */}
          <div className="max-w-[410px]">
            <Link href="/" aria-label={`${site.name} home`} className="inline-block">
              <Image src={site.logo.src} alt={site.logo.alt} width={site.logo.width} height={site.logo.height} unoptimized />
            </Link>
            <p className="mt-7 text-[16px] tracking-[-0.02em] text-white/85">{f.tagline}</p>
            <p className="mt-4 text-[14px] leading-[24px] text-[#c7c7c7]">{f.description}</p>
            <p className="mt-4 text-[14px] leading-[24px] text-white">{f.dataNote}</p>
            <p className="mt-6 text-[17px] tracking-[-0.02em] text-white">{f.followLabel}</p>
            <ul className="mt-4 flex gap-2.5" aria-label="Social media">
              {site.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${s.name}`}
                    className="grid size-[30px] place-items-center rounded-full bg-white text-[#131313] transition-transform hover:scale-110"
                  >
                    <SocialIcon name={s.icon} className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {f.columns.map((col) => (
              <div key={col.title}>
                <p className="text-[18px] font-medium tracking-[-0.03em] text-white">{col.title}</p>
                <ul className="mt-6 flex flex-col gap-5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[16px] tracking-[-0.02em] text-[#c7c7c7] transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-4 text-[14px] text-[#c7c7c7] md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {f.bottomLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[16px]">{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
