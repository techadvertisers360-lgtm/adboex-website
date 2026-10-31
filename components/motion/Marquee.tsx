import { cn } from "@/lib/utils";

/**
 * Infinite CSS marquee (server component, no JavaScript).
 * Renders the items twice; the second copy is aria-hidden and receives
 * `duplicate = true` so images can use alt="" there.
 *
 *   <Marquee items={logos} seconds={35} renderItem={(logo, dup) => <img alt={dup ? "" : logo.alt} … />} />
 */
type MarqueeProps<T> = {
  items: T[];
  renderItem: (item: T, duplicate: boolean, index: number) => React.ReactNode;
  seconds?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gap?: number;
  className?: string;
  label?: string;
};

export function Marquee<T>({
  items,
  renderItem,
  seconds = 40,
  reverse = false,
  pauseOnHover = true,
  gap = 24,
  className,
  label,
}: MarqueeProps<T>) {
  return (
    <div
      className={cn("marquee", className)}
      data-reverse={reverse}
      data-pause={pauseOnHover}
      role={label ? "region" : undefined}
      aria-label={label}
      style={{ "--marquee-duration": `${seconds}s`, "--marquee-gap": `${gap}px` } as React.CSSProperties}
    >
      <div className="marquee-track">
        <ul className="m-0 list-none p-0">
          {items.map((item, i) => (
            <li key={i}>{renderItem(item, false, i)}</li>
          ))}
        </ul>
        <ul className="m-0 list-none p-0" aria-hidden="true">
          {items.map((item, i) => (
            <li key={i}>{renderItem(item, true, i)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
