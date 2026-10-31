import { cn } from "@/lib/utils";

/**
 * Scroll-reveal wrapper (server component — ships no JavaScript).
 *   <Reveal>…</Reveal>                       fades the block up when it enters view
 *   <Reveal effect="zoom">…</Reveal>         reference "zoomIn" (grows from 30%)
 *   <Reveal effect="left|right">…</Reveal>   reference "fadeInLeft / fadeInRight"
 *   <Reveal stagger as="ul">…</Reveal>       each direct child in turn (cards)
 * Content stays visible in the HTML for crawlers and no-JS visitors.
 */
export type RevealEffect = "up" | "zoom" | "left" | "right";

type RevealProps = {
  as?: "div" | "ul" | "ol" | "section" | "header" | "article" | "li" | "aside" | "figure";
  stagger?: boolean;
  effect?: RevealEffect;
  className?: string;
  id?: string;
  children: React.ReactNode;
  role?: string;
  style?: React.CSSProperties;
};

export function Reveal({ as: Tag = "div", stagger = false, effect = "up", className, children, ...rest }: RevealProps) {
  const value = effect === "up" ? "" : effect;
  const attr = stagger ? { "data-reveal-stagger": value } : { "data-reveal": value };
  return (
    <Tag className={cn(className)} {...attr} {...rest}>
      {children}
    </Tag>
  );
}
