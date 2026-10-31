/**
 * Small building blocks shared by every animated product scene
 * (ProductVisual.tsx and ServiceScenes.tsx). Pure markup + CSS classes
 * from the "Animated product scenes" block in app/globals.css.
 */
import { cn } from "@/lib/utils";

/** entrance delay for a piece (seconds) */
export const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/** card style: entrance delay, optional 3D tilt, float speed (seconds) */
export const card = (s: number, tilt?: string, fl = 7) =>
  ({ "--d": `${s}s`, "--fl": `${fl}s`, ...(tilt ? { "--tilt": tilt } : {}) }) as React.CSSProperties;

/** soft coloured light behind the cards */
export function Glow({ className }: { className: string }) {
  return <span className={cn("vz-glow", className)} />;
}

/** small uppercase caption */
export function Label({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={cn("text-[1.6cqw] tracking-[0.08em] uppercase", dark ? "text-black/50" : "text-white/55")}>{children}</p>;
}

/** progress bar that fills once, then shimmers */
export function Bar({ value, delay, tone = "brand" }: { value: number; delay: number; tone?: "brand" | "lime" | "pink" }) {
  const colors = { brand: "from-[#4089f0] to-[#8fbcf8]", lime: "from-[#4ade80] to-[#a3e635]", pink: "from-[#a855f7] to-[#ec4899]" };
  return (
    <div className="h-[0.9cqw] overflow-hidden rounded-full bg-white/10">
      <div className={cn("vz-fill-x h-full rounded-full bg-gradient-to-r", colors[tone])} style={{ width: `${value}%`, ...d(delay) }} />
    </div>
  );
}

/** circular score ring that fills to `value` % */
export function Ring({ value, delay, size = 15 }: { value: number; delay: number; size?: number }) {
  const r = 34;
  const len = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 80 80" style={{ width: `${size}cqw`, height: `${size}cqw` }} className="-rotate-90">
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgb(255 255 255 / .1)" strokeWidth="7" />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={len}
        className="vz-ring"
        style={{ "--len": len, "--to": len * (1 - value / 100), ...d(delay) } as React.CSSProperties}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fbcf8" />
          <stop offset="1" stopColor="#4089f0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
