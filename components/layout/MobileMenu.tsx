"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronDown, Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { useDemo } from "@/components/demo/DemoContext";
import { Arrow } from "@/components/ui/Button";

/** Slide-in mobile menu (focus trapped, Esc closes, scroll locked). */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openDemo } = useDemo();
  const n = site.nav;

  useEffect(() => setOpen(false), [pathname]);

  const groups = [
    { label: n.about.label, items: n.about.items },
    { label: n.industries.label, items: [...n.industries.items, { label: n.industries.allLabel, href: n.industries.allHref }] },
    { label: n.resources.label, items: n.resources.items },
  ];

  const linkCls = "block rounded-xl px-3 py-3 text-lg font-medium text-title transition-colors hover:bg-white/5";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        aria-label="Open menu"
        className="grid size-11 place-items-center rounded-full border border-line bg-card text-title lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-[60] bg-[var(--color-overlay)] backdrop-blur-sm lg:hidden" />
        <DialogPrimitive.Content className="sheet-content fixed inset-y-0 right-0 z-[61] flex w-[min(400px,100%)] flex-col border-l border-line bg-page lg:hidden">
          <div className="flex h-[var(--header-height)] items-center justify-between border-b border-line px-4">
            <DialogPrimitive.Title className="sr-only">Main menu</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">Site navigation links</DialogPrimitive.Description>
            <Link href="/" aria-label={`${site.name} home`}>
              <Image src={site.logo.src} alt={site.logo.alt} width={site.logo.width} height={site.logo.height} unoptimized />
            </Link>
            <DialogPrimitive.Close
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full border border-line bg-card text-title"
            >
              <X aria-hidden="true" className="size-5" />
            </DialogPrimitive.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="flex flex-col gap-1">
              {groups.map((g) => (
                <li key={g.label}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-lg font-medium text-title hover:bg-white/5 [&::-webkit-details-marker]:hidden">
                      {g.label}
                      <ChevronDown aria-hidden="true" className="size-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mb-2 ml-3 flex flex-col border-l border-line pl-3">
                      {g.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="block rounded-lg px-3 py-2.5 text-copy hover:text-title">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
              <li>
                <Link href={n.platform.href} className={linkCls}>
                  {n.platform.label}
                </Link>
              </li>
              <li>
                <Link href={n.pricing.href} className={linkCls}>
                  {n.pricing.label}
                </Link>
              </li>
              <li>
                <Link href={n.contact.href} className={linkCls}>
                  {n.contact.label}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="border-t border-line p-4">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => {
                setOpen(false);
                openDemo("Mobile menu");
              }}
            >
              {n.cta}
              <Arrow />
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
