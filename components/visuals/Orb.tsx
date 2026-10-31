import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The glowing orb, spinning slowly with a soft "breathing" glow (pure CSS).
 * Uses the round transparent cut-out made by `npm run orb-image`
 * (/public/images/brand/orb.webp). mix-blend-mode: screen removes any dark
 * edge so it sits cleanly on dark backgrounds. Decorative (aria-hidden).
 *   <Orb className="size-72" />               spins once every 30 s
 *   <Orb seconds={12} glow={false} />          faster, no glow
 */
export function Orb({
  src = "/images/brand/orb.webp",
  seconds = 30,
  glow = true,
  sizes = "400px",
  className,
}: {
  src?: string;
  seconds?: number;
  glow?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("orb pointer-events-none relative block aspect-square", className)}>
      {glow && <span className="orb-glow absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgb(124_58_237/0.55)_0%,rgb(64_137_240/0.35)_45%,transparent_70%)] blur-2xl" />}
      <Image src={src} alt="" fill sizes={sizes} className="orb-spin object-contain mix-blend-screen" style={{ animationDuration: `${seconds}s` }} />
    </span>
  );
}
