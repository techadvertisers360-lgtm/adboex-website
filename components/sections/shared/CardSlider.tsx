"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Link2, MapPin, Send, TrendingUp, Zap, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reference-style card slider: header on the left, text on the right,
 * ← → buttons, cards scroll sideways (swipe on phones, snap to each card).
 * Every card is in the HTML; the slider only scrolls.
 */
const icons: Record<string, LucideIcon> = { map: MapPin, trending: TrendingUp, send: Send, link: Link2, zap: Zap, sparkles: Sparkles };

export function CardSlider({
  id,
  pill,
  heading,
  text,
  cards,
}: {
  id: string;
  pill: string;
  heading: string;
  text: string;
  cards: { icon: string; title: string; text: string }[];
}) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(update, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.querySelector("li");
    const step = first ? first.getBoundingClientRect().width + 16 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const btn = "grid size-9 place-items-center rounded-[10px] bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-35 disabled:hover:bg-white/10";

  return (
    <section aria-labelledby={`${id}-heading`} className="section pt-6">
      <div className="container-x">
        <div className="grid items-end gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div data-reveal="left" className="flex flex-col items-start gap-5">
            <p className="label">{pill}</p>
            <h2 id={`${id}-heading`} className="type-h2">
              {heading}
            </h2>
          </div>
          <p data-reveal="right" className="text-soft">
            {text}
          </p>
        </div>
        <div className="mt-8 flex justify-end gap-2">
          <button type="button" className={btn} onClick={() => go(-1)} disabled={edge.start} aria-label="Previous cards" aria-controls={`${id}-track`}>
            <ChevronLeft className="size-4" />
          </button>
          <button type="button" className={btn} onClick={() => go(1)} disabled={edge.end} aria-label="Next cards" aria-controls={`${id}-track`}>
            <ChevronRight className="size-4" />
          </button>
        </div>
        <ul
          id={`${id}-track`}
          ref={track}
          onScroll={update}
          className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((c) => {
            const Icon = icons[c.icon] ?? Sparkles;
            return (
              <li key={c.title} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]">
                <article className="surface-1 card-hover flex h-full min-h-[260px] flex-col gap-5 rounded-[24px] p-8">
                  <span aria-hidden="true" className="grid size-9 place-items-center rounded-[10px] bg-white/10 text-white">
                    <Icon className="size-[18px]" />
                  </span>
                  <h3 className={cn("text-[24px] leading-[1.25] font-medium tracking-[-0.04em]")}>{c.title}</h3>
                  <p className="text-soft text-[15px]">{c.text}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
