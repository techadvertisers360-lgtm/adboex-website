"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for the whole site. Adds `.is-visible` to every
 * [data-reveal] / [data-reveal-stagger] element when it scrolls into view
 * (once). The fade-up itself is pure CSS in globals.css, so the text is always
 * present in the static HTML and the page works without JavaScript.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible), [data-reveal-stagger]:not(.is-visible)"));
    els.forEach((el) => {
      if (el.hasAttribute("data-reveal-stagger")) {
        Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
      }
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
