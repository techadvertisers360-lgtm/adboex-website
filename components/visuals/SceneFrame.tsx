"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps an animated product scene and adds `.in-view` the first time it is
 * on screen, so the pieces fly in when the visitor actually sees them (also
 * works inside tabs that mount later). Without JavaScript the scene simply
 * plays immediately.
 */
export function SceneFrame({ label, theme, className, children }: { label: string; theme?: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} role="img" aria-label={label} className={cn("scene aspect-[3/2] rounded-[12px]", inView && "in-view", className)}>
      <div className="scene-bg" data-theme={theme} />
      <div aria-hidden="true" className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
