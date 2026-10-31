"use client";

import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DemoForm } from "@/components/demo/DemoForm";

/** Popup content. Loaded lazily by DemoProvider the first time it opens. */
export default function DemoDialog({
  open,
  onOpenChange,
  source,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: string;
}) {
  const c = site.demoPopup;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl" closeLabel="Close audit form">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden border-b border-line p-6 md:border-r md:border-b-0 md:p-10">
            <div aria-hidden="true" className="glow-hero pointer-events-none absolute inset-0 opacity-80" />
            <div className="relative">
              <DialogTitle className="type-h3 pr-10 md:pr-0">{c.heading}</DialogTitle>
              <DialogDescription className="mt-4 text-copy">{c.subtext}</DialogDescription>
              <ul className="mt-6 flex flex-col gap-3">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-title">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-lime text-ink">
                      <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-subtle">{c.reassurance}</p>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <DemoForm source={source} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
