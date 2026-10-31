"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Tabs (reference style): dark rounded bar (wraps onto rows), mono UPPERCASE labels,
 * a grey pill slides under the active tab, content cross-fades.
 * ALL panels are rendered in the HTML (inactive ones use `hidden`), so Google
 * indexes every tab's text. Keyboard: ←/→, Home, End.
 */
export function AnimatedTabs({
  tabs,
  panels,
  label,
  className,
}: {
  tabs: string[];
  panels: React.ReactNode[];
  label: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const b = refs.current[active];
      if (b) setPill({ x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight });
    };
    measure();
    const list = refs.current[0]?.parentElement;
    if (!list) return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  const select = (i: number, focus = false) => {
    setActive(i);
    setTouched(true);
    if (focus) refs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = tabs.length - 1;
    const map: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="surface-1 relative flex w-full flex-wrap justify-center gap-1 rounded-[28px] p-2"
      >
        {/* sliding grey pill — measured from the active button so it also
            works when the tabs wrap onto several rows */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-0 left-0 rounded-[56px] bg-white/20 transition-[transform,width,height] duration-500 ease-brand",
            !pill && "hidden"
          )}
          style={pill ? { width: pill.w, height: pill.h, transform: `translate(${pill.x}px, ${pill.y}px)` } : undefined}
        />
        {tabs.map((t, i) => (
          <button
            key={t}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            className={cn(
              "relative z-10 min-h-[40px] rounded-[56px] px-4 font-mono text-[12px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300 sm:text-[13px] lg:px-5 lg:text-[14px]",
              active === i ? "text-white" : "text-white/75 hover:text-white",
              // shown before JS measures the pill
              active === i && !pill && "bg-white/20"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {panels.map((panel, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="mt-5 focus-visible:outline-offset-8"
        >
          {active === i ? (
            <m.div
              key={`panel-${i}`}
              initial={touched ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {panel}
            </m.div>
          ) : (
            panel
          )}
        </div>
      ))}
    </div>
  );
}
