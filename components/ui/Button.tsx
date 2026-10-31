import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "nav" | "light" | "outline" | "blue";
export type ButtonSize = "md" | "sm";

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  if (variant === "nav") return cn("btn-nav", className);
  // reference-style mono pill buttons
  if (variant === "light" || variant === "outline" || variant === "blue") return cn("btn-mono", `btn-${variant}`, className);
  return cn("btn", variant === "primary" ? "btn-primary" : "btn-secondary", size === "sm" && "btn-sm", className);
}

export function Arrow() {
  return <ArrowRight aria-hidden="true" className="btn-arrow size-4" strokeWidth={2.25} />;
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
};

/** A link styled as a button (internal links use next/link). */
export function ButtonLink({ href, children, variant = "primary", size = "md", arrow = true, className }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}
