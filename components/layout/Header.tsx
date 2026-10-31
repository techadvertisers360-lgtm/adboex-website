import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { MegaMenu, SimpleMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { DemoButton } from "@/components/demo/DemoButton";

/**
 * Site header (styled like the reference): logo | glass capsule menu | blue pill button.
 * Menu labels and links come from /content/site.ts → nav.
 */
export function Header() {
  const n = site.nav;

  return (
    <HeaderShell>
      <Link href="/" className="shrink-0 pl-1" aria-label={`${site.name} home`}>
        <Image
          src={site.logo.src}
          alt={site.logo.alt}
          width={site.logo.width}
          height={site.logo.height}
          priority
          unoptimized
          className="h-9 w-auto transition-all duration-300 group-data-[scrolled=true]/header:h-8"
        />
      </Link>

      {/* centre menu in a glass capsule (capsule merges into the bar once scrolled).
          The glass lives on ::before (like the reference) so the dropdown panels
          inside can still blur the page behind them. */}
      <nav
        aria-label="Main"
        className="relative isolate hidden rounded-full px-5 lg:block before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white/[0.11] before:backdrop-blur-[20px] before:transition-opacity before:duration-300 before:content-[''] group-data-[scrolled=true]/header:before:opacity-0"
      >
        <ul className="flex items-center">
          <NavDropdown label={n.about.label}>
            <SimpleMenu items={n.about.items} />
          </NavDropdown>
          <li>
            <Link href={n.platform.href} className="nav-link">
              {n.platform.label}
            </Link>
          </li>
          <NavDropdown label={n.industries.label} align="center" bare>
            <MegaMenu />
          </NavDropdown>
          <NavDropdown label={n.resources.label}>
            <SimpleMenu items={n.resources.items} />
          </NavDropdown>
          <li>
            <Link href={n.pricing.href} className="nav-link">
              {n.pricing.label}
            </Link>
          </li>
          <li>
            <Link href={n.contact.href} className="nav-link">
              {n.contact.label}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <DemoButton variant="nav" arrow={false} source="Header" className="hidden sm:inline-flex">
          {n.cta}
        </DemoButton>
        <MobileMenu />
      </div>
    </HeaderShell>
  );
}
