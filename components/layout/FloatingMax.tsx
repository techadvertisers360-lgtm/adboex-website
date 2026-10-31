"use client";

import { site } from "@/content/site";
import { useDemo } from "@/components/demo/DemoContext";
import { Orb } from "@/components/visuals/Orb";

/**
 * Bottom-right assistant pill (reference style: white pill, glowing orb
 * avatar, small label + name). Opens the demo popup until Max is live.
 * Text: /content/site.ts → assistant.
 */
export function FloatingMax() {
  const { openDemo } = useDemo();
  if (!site.assistant.enabled) return null;
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => openDemo("Talk to Max")}
      aria-label={site.assistant.label}
      className="fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-white py-2 pr-6 pl-2 text-left shadow-[0_10px_40px_-8px_rgb(0_0_0/0.55)] transition-transform hover:-translate-y-0.5 md:right-6 md:bottom-6"
    >
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-[#04050a]">
        <Orb src={site.assistant.avatar} seconds={10} glow={false} sizes="48px" className="absolute inset-[-8%]" />
        <span className="pulse-dot absolute! right-0.5 bottom-0.5 size-2.5! border-2 border-white" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-mono text-[10px] tracking-[0.12em] text-black/45 uppercase">{site.assistant.eyebrow}</span>
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#131313]">{site.assistant.name}</span>
      </span>
    </button>
  );
}
