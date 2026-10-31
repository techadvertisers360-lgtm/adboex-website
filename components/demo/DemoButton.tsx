"use client";

import { useDemo } from "@/components/demo/DemoContext";
import { Arrow, buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

/** Any "Book a Demo / Audit / Check …" button. Opens the global demo popup. */
export function DemoButton({
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  source,
  className,
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  /** where the click came from — sent with the form so you know which button converts */
  source?: string;
  className?: string;
}) {
  const { openDemo } = useDemo();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => openDemo(source ?? (typeof children === "string" ? children : ""))}
      className={buttonClasses(variant, size, className)}
    >
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
