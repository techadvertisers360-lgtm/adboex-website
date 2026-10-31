import Image from "next/image";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { DemoButton } from "@/components/demo/DemoButton";
import { Reveal } from "@/components/motion/Reveal";
import { Orb } from "@/components/visuals/Orb";

/**
 * Closing call-to-action used on inner pages (reference layout):
 * heading, avatar stack, line and button on the left; photo card with the
 * "Get found. Get chosen. Get booked." tagline on the right.
 * The card image/label/tagline come from /content/home.ts → ctaTagline.card.
 */
export function CtaBlock({
  id = "cta",
  heading,
  text,
  cta = "Book a Live Demo",
  note,
  avatars = home.ctaTagline.avatars,
}: {
  id?: string;
  heading: string;
  text: string;
  cta?: string;
  note?: React.ReactNode;
  avatars?: string[];
}) {
  const card = home.ctaTagline.card;
  return (
    <section aria-labelledby={`${id}-heading`} className="pb-20 md:pb-28">
      <div className="container-x grid items-center gap-10 md:grid-cols-2">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 id={`${id}-heading`} className="type-h3 max-w-lg">
            {heading}
          </h2>
          {avatars.length > 0 && (
            <span className="flex -space-x-3" aria-hidden="true">
              {avatars.map((src) => (
                <Image key={src} src={src} alt="" width={44} height={44} className="size-11 rounded-full border-2 border-page object-cover" />
              ))}
            </span>
          )}
          <p className="text-soft max-w-md">{text}</p>
          <DemoButton variant="blue" arrow={false} source={`CTA: ${heading.slice(0, 40)}`}>
            {cta}
          </DemoButton>
          {note && <p className="text-sm text-subtle">{note}</p>}
        </Reveal>
        <Reveal effect="zoom" className="relative isolate flex min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-[24px] bg-[#04050a] p-10 text-center md:min-h-[440px]">
          {card.spin ? (
            <Orb src={card.image} className="absolute top-1/2 left-1/2 -z-10 h-[92%] -translate-x-1/2 -translate-y-1/2" sizes="480px" />
          ) : (
            <Image src={card.image} alt="" fill sizes="(max-width: 768px) 100vw, 640px" className="-z-10 object-cover" />
          )}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/25" />
          <p className="label">{card.label}</p>
          <p className="mt-4 max-w-[400px] text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-white md:text-[38px]">{card.tagline || site.tagline}</p>
        </Reveal>
      </div>
    </section>
  );
}
