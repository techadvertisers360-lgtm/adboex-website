"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky header behaviour (same as the reference design):
 *  - at the top: full-width bar, transparent; only the centre menu sits in a glass capsule
 *  - after 50px of scrolling: the whole bar shrinks into one compact floating
 *    glass capsule (logo + menu + button), centred, 20px from the top
 * The header always stays visible. `data-scrolled` lets child elements react
 * (e.g. the menu capsule drops its own background when the bar becomes glass).
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 50);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header data-scrolled={scrolled} className="group/header fixed inset-x-0 top-0 z-50 px-4 md:px-6">
      <div
        className={cn(
          "relative isolate mx-auto flex items-center justify-between gap-4 rounded-full border transition-all duration-300 ease-out",
          scrolled
            ? "mt-3 h-16 max-w-[1116px] border-white/[0.06] pr-2 pl-5 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6)] md:mt-5"
            : "mt-2 h-[84px] max-w-[var(--container-max)] border-transparent px-0 md:mt-3"
        )}
      >
        {/* glass background on its own layer (not on the bar) so dropdowns can blur the page too */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 rounded-full bg-[rgb(38_38_38/0.72)] backdrop-blur-[20px] transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        />
        {children}
      </div>
    </header>
  );
}
