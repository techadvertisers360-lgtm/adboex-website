"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Loads only the small "domAnimation" part of Framer Motion and respects
 * the visitor's "reduce motion" setting. Use `m.div` (not `motion.div`) inside.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
