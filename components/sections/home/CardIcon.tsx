import {
  BarChart3, Code2, Flame, Globe, Heart, Lightbulb, MapPin, Megaphone, Phone, Rocket, Search, Settings, Smartphone, Sparkles, Star, Target,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Small rounded square with an icon (top of each reference card). */
const icons: Record<string, LucideIcon> = {
  sparkles: Sparkles, globe: Globe, map: MapPin, chart: BarChart3, phone: Phone, settings: Settings,
  smartphone: Smartphone, rocket: Rocket, star: Star, flame: Flame, lightbulb: Lightbulb,
  target: Target, megaphone: Megaphone, search: Search, heart: Heart, code: Code2,
};

export function CardIcon({ name, light = false, className }: { name: string; light?: boolean; className?: string }) {
  const Icon = icons[name] ?? Sparkles;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-[10px]",
        light ? "bg-black/[0.06] text-azure" : "bg-white/10 text-white",
        className
      )}
    >
      <Icon className="size-[18px]" />
    </span>
  );
}
