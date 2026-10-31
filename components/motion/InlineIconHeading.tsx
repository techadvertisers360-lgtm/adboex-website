import {
  BarChart3, Bot, Briefcase, CalendarCheck, Globe, MapPin, MessageSquare, Network, Phone, Search, Sparkles, Star, Wrench, Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Heading with round icons placed between words and an optional grey part
 * (like the reference About section). Icons are decorative (aria-hidden), so
 * the heading text reads normally for Google and screen readers.
 *
 * In a content file write the heading as a list of parts:
 *   ["White text", { icon: "network", color: "blue" }, { muted: "grey text" }]
 */
const icons: Record<string, LucideIcon> = {
  search: Search, wrench: Wrench, globe: Globe, map: MapPin, star: Star, bot: Bot, phone: Phone,
  chart: BarChart3, calendar: CalendarCheck, message: MessageSquare, sparkles: Sparkles, zap: Zap,
  network: Network, briefcase: Briefcase,
};
export type IconName = keyof typeof icons;
export type HeadingPart = string | { muted: string } | { icon: IconName; color?: "blue" | "white" | "lime" };

export function InlineIconHeading({
  parts,
  as: Tag = "h2",
  id,
  className,
}: {
  parts: HeadingPart[];
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}) {
  return (
    <Tag id={id} className={cn("type-h2", className)}>
      {parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part} </span>;
        if ("muted" in part)
          return (
            <span key={i} className="text-white/45">
              {part.muted}{" "}
            </span>
          );
        const Icon = icons[part.icon] ?? Sparkles;
        const tone = part.color === "white" ? "bg-white text-azure" : "bg-lime text-white";
        return (
          <span
            key={i}
            aria-hidden="true"
            className={cn("mr-[0.25em] inline-grid size-[1.05em] -translate-y-[0.05em] place-items-center rounded-full align-middle", tone)}
          >
            <Icon className="size-[0.48em]" strokeWidth={2.2} />
          </span>
        );
      })}
    </Tag>
  );
}
