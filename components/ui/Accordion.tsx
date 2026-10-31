"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion (reference style: dark rounded rows, thin + that turns into −).
 * Closed answers stay in the HTML (marked `inert`), so Google and AI crawlers
 * can read every answer and the FAQPage schema matches visible content.
 * Height animates via CSS grid rows.
 */
export type AccordionItem = { question: string; answer: React.ReactNode };

export function Accordion({
  items,
  headingLevel = 3,
  defaultOpen = -1,
  className,
}: {
  items: AccordionItem[];
  headingLevel?: 2 | 3 | 4;
  /** index open on load, or -1 for all closed (reference: all closed) */
  defaultOpen?: number;
  className?: string;
}) {
  const [open, setOpen] = useState<number>(defaultOpen);
  const baseId = useId();
  const Heading = `h${headingLevel}` as "h3";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={item.question} className={cn("surface-1 rounded-[24px] border transition-colors duration-300", isOpen ? "border-white/10" : "border-transparent")}>
            <Heading className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-[17px] leading-[26px] font-medium tracking-[-0.04em] text-white md:text-[19px]">{item.question}</span>
                <span aria-hidden="true" className="relative grid size-6 shrink-0 place-items-center text-white">
                  <span className="absolute h-[1.5px] w-[14px] rounded bg-current" />
                  <span className={cn("absolute h-[14px] w-[1.5px] rounded bg-current transition-transform duration-300 ease-brand", isOpen && "rotate-90 scale-y-0")} />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={cn("grid transition-[grid-template-rows,opacity] duration-400 ease-brand", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden">
                <div className="text-soft px-5 pb-5">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
