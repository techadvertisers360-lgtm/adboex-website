import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Optimised image (next/image → automatic AVIF/WebP, responsive srcset,
 * lazy loading, width/height so nothing jumps while loading).
 *
 * - priority: ONLY for the one above-the-fold hero image (preloaded, fetchpriority high)
 * - everything else lazy-loads automatically
 * - decorative images: pass alt=""
 * - SVGs are served as-is (no conversion needed)
 */
type ImgProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  /** load immediately without preloading (images near the top that are not the main hero image) */
  eager?: boolean;
  quality?: number;
  className?: string;
};

export function Img({ src, alt, width, height, sizes = "100vw", priority = false, eager = false, quality = 80, className }: ImgProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : eager ? "eager" : "lazy"}
      quality={quality}
      unoptimized={src.endsWith(".svg")}
      className={cn(className)}
    />
  );
}
