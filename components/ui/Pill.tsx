import { cn } from "@/lib/utils";

/** Small "• Label" above section headings. A <p>, never a heading (SEO). */
export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("pill", className)}>{children}</p>;
}
