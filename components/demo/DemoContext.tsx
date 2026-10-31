"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useState } from "react";

/**
 * Global "Book a Demo" popup. Any button on the site calls useDemo().openDemo()
 * (or just use <DemoButton>). The popup code is only downloaded the first
 * time someone opens it, so it adds nothing to the initial page load.
 */
const DemoDialog = dynamic(() => import("./DemoDialog"), { ssr: false });

type DemoCtx = { openDemo: (source?: string) => void };
const Ctx = createContext<DemoCtx>({ openDemo: () => {} });

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [source, setSource] = useState("");

  const openDemo = useCallback((src = "") => {
    setSource(src);
    setMounted(true);
    setOpen(true);
  }, []);

  return (
    <Ctx.Provider value={{ openDemo }}>
      {children}
      {mounted && <DemoDialog open={open} onOpenChange={setOpen} source={source} />}
    </Ctx.Provider>
  );
}

export const useDemo = () => useContext(Ctx);
