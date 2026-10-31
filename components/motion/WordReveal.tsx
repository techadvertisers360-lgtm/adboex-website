import { animations } from "@/content/animations";
import { cn } from "@/lib/utils";

/**
 * Splits text into words that fade/blur in one by one (pure CSS).
 * Use INSIDE a real heading so the full sentence stays one <h1> in the HTML:
 *   <h1><WordReveal text="The AI Operating System" highlight={["AI"]} /></h1>
 * Words listed in `highlight` get the brand gradient.
 */
export function WordReveal({
  text,
  highlight = [],
  startIndex = 0,
  className,
}: {
  text: string;
  highlight?: string[];
  startIndex?: number;
  className?: string;
}) {
  if (!animations.heroWords.enabled) return <span className={className}>{text}</span>;
  const words = text.split(" ");
  const marks = new Set(highlight.map((w) => w.toLowerCase()));
  return (
    <span
      className={cn("word-reveal", className)}
      style={{ "--word-delay": `${animations.heroWords.perWordS}s` } as React.CSSProperties}
    >
      {words.map((word, i) => (
        <span key={i} style={{ "--w": i + startIndex } as React.CSSProperties} className={cn(marks.has(word.toLowerCase().replace(/[^\w-]/g, "")) && "text-gradient")}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
