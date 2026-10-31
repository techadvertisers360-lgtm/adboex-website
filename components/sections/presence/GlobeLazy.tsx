"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { Office } from "@/content/presence";
import { cn } from "@/lib/utils";

/**
 * Shows the static globe image first (also for no-JS and reduced motion),
 * then downloads the 3D network globe (three.js) only when the section scrolls near the
 * viewport, and cross-fades to it once its first frame is drawn.
 */
const GlobeNetwork = dynamic(() => import("./GlobeNetwork"), { ssr: false });

export function GlobeLazy({ image, offices, arcs }: { image: string; offices: Office[]; arcs: [number, number][] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // keep the still image
    let supportsWebGL = false;
    try {
      supportsWebGL = !!document.createElement("canvas").getContext("webgl2") || !!document.createElement("canvas").getContext("webgl");
    } catch {
      supportsWebGL = false;
    }
    if (!supportsWebGL) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 768px) 90vw, 620px"
        className={cn("object-contain transition-opacity duration-700", ready && "opacity-0")}
      />
      {load && <GlobeNetwork offices={offices} arcs={arcs} onReady={() => setReady(true)} />}
    </div>
  );
}
