import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, type FaqItem } from "@/lib/schema";

/**
 * FAQ (reference layout): label, heading and text on the left with a
 * "Still have questions?" card at the bottom; question rows on the right.
 * Also outputs FAQPage schema from the same questions.
 */
export function FaqSection({
  id = "faq",
  pill = "FAQ",
  heading,
  text,
  contactHeading = "Still have questions?",
  contactText,
  contactCta = { label: "Contact Us", href: "/contact-us/" },
  items,
}: {
  id?: string;
  pill?: string;
  heading: string;
  text?: string;
  contactHeading?: string;
  contactText?: string;
  contactCta?: { label: string; href: string };
  items: FaqItem[];
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="section">
      <div className="container-x grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-14">
        <div className="flex flex-col justify-between gap-10">
          {/* reference: label, heading and text slide in from the left */}
          <Reveal stagger effect="left" className="flex flex-col items-start gap-5">
            <p className="label">{pill}</p>
            <h2 id={headingId} className="type-h2">
              {heading}
            </h2>
            {text && <p className="text-soft">{text}</p>}
          </Reveal>
          {/* reference: the contact card zooms in */}
          <Reveal as="aside" effect="zoom" className="flex flex-col items-start gap-5 rounded-[24px] bg-[rgb(236_236_236/0.1)] p-5">
            <p className="text-[22px] leading-tight font-medium tracking-[-0.04em] text-white">{contactHeading}</p>
            {contactText && <p className="text-soft -mt-2 text-[15px]">{contactText}</p>}
            <Link href={contactCta.href} className={buttonClasses("blue")}>
              {contactCta.label}
            </Link>
          </Reveal>
        </div>
        <Reveal>
          <Accordion items={items} headingLevel={3} />
        </Reveal>
      </div>
      <JsonLd data={faqSchema(items)} />
    </section>
  );
}
