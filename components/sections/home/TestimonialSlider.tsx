"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";
import { YouTubeFacade } from "@/components/ui/Facades";
import { cn } from "@/lib/utils";

/**
 * Reference-style testimonial slider: quote card (left) + large photo (right),
 * ← → buttons, autoplay that pauses on hover/focus. Every quote is in the HTML
 * (inactive ones are faded out and `inert`), so Google can read all of them.
 * If a testimonial has a YouTube `video`, a play button appears on the photo.
 */
export function TestimonialSlider({ items, autoplaySeconds = 6 }: { items: Testimonial[]; autoplaySeconds?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!autoplaySeconds || paused || playing !== null || reduce.current || items.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), autoplaySeconds * 1000);
    return () => clearTimeout(t);
  }, [index, paused, playing, autoplaySeconds, items.length]);

  const go = (dir: 1 | -1) => {
    setPlaying(null);
    setIndex((i) => (i + dir + items.length) % items.length);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="surface-1 grid gap-3 rounded-[24px] p-3 md:grid-cols-2"
    >
      {/* quote card */}
      <div className="flex min-h-[380px] flex-col rounded-[12px] bg-white/[0.04] p-6 md:min-h-[500px]">
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-[10px] bg-white/10 text-white">
          <Quote className="size-5 fill-current" />
        </span>
        <div className="mt-10 grid flex-1">
          {items.map((t, i) => (
            <figure
              key={t.name}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              inert={i !== index}
              className={cn("[grid-area:1/1] transition-opacity duration-500", i === index ? "opacity-100" : "opacity-0")}
            >
              <blockquote className="max-w-[460px] text-[18px] leading-[28px] tracking-[-0.02em] text-white">“{t.short}”</blockquote>
              <figcaption className="mt-6 text-[14px] text-white/80">
                {t.name}
                <span className="text-white/50">
                  {" "}
                  · {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid size-9 place-items-center rounded-[10px] bg-white/10 text-white transition-colors hover:bg-white/20">
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid size-9 place-items-center rounded-[10px] bg-white/10 text-white transition-colors hover:bg-white/20">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* photo side */}
      <div className="relative min-h-[320px] overflow-hidden rounded-[12px] bg-white/[0.04] md:min-h-[500px]">
        {items.map((t, i) => (
          <div key={t.name} className={cn("absolute inset-0 transition-opacity duration-500", i === index ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={i !== index}>
            {playing === i && t.video ? (
              <div className="grid size-full place-items-center bg-black">
                <YouTubeFacade id={t.video} title={`Video testimonial from ${t.name}`} thumbnail={t.photo ?? t.image} />
              </div>
            ) : (
              <>
                <Image src={t.photo ?? t.image} alt={`${t.name}, ${t.role} at ${t.company}`} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
                {t.video && (
                  <button
                    type="button"
                    onClick={() => setPlaying(i)}
                    aria-label={`Play video testimonial from ${t.name}`}
                    tabIndex={i === index ? 0 : -1}
                    className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 size-4 fill-current">
                      <path d="M7 4.5v15l12-7.5-12-7.5Z" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
