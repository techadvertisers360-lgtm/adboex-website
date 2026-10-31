import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type Stat = { value?: number; prefix?: string; suffix?: string; decimals?: number; display?: string; label: string };

/** Grid of big numbers that count up on scroll (final value already in the HTML). */
export function StatsGrid({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <Reveal stagger as="ul" className={cn("grid gap-4 sm:grid-cols-2", stats.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3", className)}>
      {stats.map((s) => (
        <li key={s.label} className="card flex flex-col items-center gap-2 px-6 py-10 text-center">
          <span className="text-gradient text-5xl font-semibold tracking-tight">
            {s.value !== undefined ? <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} /> : s.display}
          </span>
          <span className="text-copy">{s.label}</span>
        </li>
      ))}
    </Reveal>
  );
}
