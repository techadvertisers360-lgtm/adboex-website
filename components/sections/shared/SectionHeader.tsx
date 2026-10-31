import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * "▪ LABEL" + heading + optional text, used at the top of most sections
 * (reference style). `id` goes on the heading so <section aria-labelledby>
 * can point to it.
 */
export function SectionHeader({
  pill,
  title,
  id,
  text,
  as: Tag = "h2",
  align = "center",
  className,
  children,
}: {
  /** the small "▪ LABEL" above the heading */
  pill?: string;
  title: React.ReactNode;
  id: string;
  text?: string;
  as?: "h1" | "h2" | "h3";
  align?: "center" | "left";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className={cn("flex flex-col gap-5", align === "center" ? "mx-auto max-w-3xl items-center text-center" : "items-start", className)}>
      {pill && <p className="label">{pill}</p>}
      <Tag id={id} className={Tag === "h1" ? "type-display" : "type-h2"}>
        {title}
      </Tag>
      {text && <p className={cn("text-soft max-w-[560px]", align === "center" && "mx-auto")}>{text}</p>}
      {children}
    </Reveal>
  );
}
