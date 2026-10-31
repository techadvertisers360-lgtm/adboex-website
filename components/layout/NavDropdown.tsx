"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop dropdown / mega menu (reference style: no arrow on the label,
 * panel fades in and slides down 10px in 0.4s on hover).
 * The panel's links are always in the HTML (hidden with CSS `invisible`),
 * so crawlers see real <a href> links. Click/Enter also opens it; Esc closes.
 * `bare` = the child brings its own panel background (the mega menu).
 */
export function NavDropdown({
  label,
  children,
  align = "left",
  bare = false,
}: {
  label: string;
  children: React.ReactNode;
  align?: "left" | "center";
  bare?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const id = useId();
  const wrapRef = useRef<HTMLLIElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const enter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    timer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <li
      ref={wrapRef}
      className="relative"
      onPointerEnter={enter}
      onPointerLeave={leave}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          btnRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button ref={btnRef} type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} className="nav-link">
        {label}
      </button>
      <div
        id={id}
        className={cn(
          "absolute top-full pt-5 transition-[opacity,translate,visibility] duration-400 ease-brand",
          align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
          open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2.5 opacity-0"
        )}
      >
        {bare ? (
          children
        ) : (
          <div className="rounded-[24px] border border-white/[0.06] bg-black/90 p-2 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.7)] backdrop-blur-[20px]">
            {children}
          </div>
        )}
      </div>
    </li>
  );
}
