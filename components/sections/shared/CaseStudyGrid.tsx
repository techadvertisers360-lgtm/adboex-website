"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Quote } from "lucide-react";
import type { CaseClient } from "@/content/case-studies";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

/**
 * Client grid (reference): portrait photo cards with a blurred glass panel —
 * name, role, location and a play button. The button plays the client's video
 * (YouTube, loaded only on click) or shows their quote when no video is set.
 */
export function CaseStudyGrid({ clients, playLabel }: { clients: CaseClient[]; playLabel: string }) {
  const [open, setOpen] = useState<CaseClient | null>(null);

  return (
    <>
      <ul data-reveal-stagger="zoom" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c, i) => (
          <li key={c.name}>
            <article className="relative h-[460px] overflow-hidden rounded-[12px] bg-[#1c1c1c]">
              <Image
                src={c.image}
                alt={`${c.name}, ${c.role} of ${c.business}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 413px"
                loading={i < 3 ? "eager" : "lazy"}
                className="object-cover object-top"
              />
              <div className="absolute inset-x-1.5 bottom-1.5 flex h-[160px] flex-col justify-between rounded-[12px] bg-[rgb(28_28_28/0.6)] p-4 backdrop-blur-[30px]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[22px] leading-tight font-medium tracking-[-0.04em] text-white">{c.name}</h2>
                    <p className="mt-1.5 text-[13px] text-white/70">{c.role}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(c)}
                    aria-label={`${playLabel} ${c.name}`}
                    className="grid size-[46px] shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
                  >
                    <Play aria-hidden="true" className="size-4 translate-x-px fill-current" />
                  </button>
                </div>
                <p className="text-[13px] text-white">{c.location}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className={open?.video ? "max-w-3xl p-3" : "max-w-xl p-8 md:p-10"} closeLabel="Close">
          {open && (
            <>
              <DialogTitle className="sr-only">
                {open.name}, {open.business}
              </DialogTitle>
              {open.video ? (
                <div className="aspect-video overflow-hidden rounded-[10px] bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${open.video}?autoplay=1&rel=0`}
                    title={`${open.name}, ${open.business}`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                </div>
              ) : (
                <>
                  <Quote aria-hidden="true" className="size-9 text-lime" />
                  <DialogDescription asChild>
                    <blockquote className="mt-5 text-lg leading-relaxed text-title md:text-xl">“{open.quote}”</blockquote>
                  </DialogDescription>
                  <div className="mt-7 flex items-center gap-4 border-t border-line pt-5">
                    <Image src={open.image} alt="" width={56} height={56} className="size-14 rounded-full object-cover object-top" />
                    <div>
                      <p className="font-semibold text-title">{open.name}</p>
                      <p className="text-sm text-subtle">
                        {open.role}, {open.business}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
