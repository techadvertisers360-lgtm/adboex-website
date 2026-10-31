import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { postalAddress, schemaIds } from "@/lib/schema";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = buildMetadata("contact");

const delay = (s: number) => ({ "--fx-delay": `${s}s` }) as React.CSSProperties;

/**
 * Reference layout: full-width two panels under the navbar — dark info card
 * (heading, email, phone, office, socials) and a blue→purple panel holding
 * the white form card.
 */
export default function ContactPage() {
  const a = site.address;
  const fullAddress = `${a.street} ${a.city}, ${a.region} ${a.postalCode}`;
  const l = contact.labels;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl("/contact-us/"),
    name: contact.hero.heading,
    mainEntity: {
      "@type": "Organization",
      "@id": schemaIds.ORG_ID,
      name: site.name,
      url: absoluteUrl("/"),
      email: site.email,
      telephone: site.phone.tel,
      address: postalAddress(),
      openingHours: site.hours,
    },
  };

  const row = "flex flex-col gap-3";
  const rowLabel = "text-[17px] text-white/85";

  return (
    <>
      <Breadcrumbs items={[{ name: "Contact Us", path: "/contact-us/" }]} className="sr-only" />
      <div className="grid gap-2.5 px-3 pt-[100px] md:pt-[120px] lg:grid-cols-[1fr_2fr]">
        <section aria-labelledby="page-heading" className="flex flex-col justify-between gap-12 rounded-[24px] bg-[#262626] px-6 py-10 md:px-10 md:py-[50px]">
          <div className="fx-zoom-load" style={delay(0)}>
            <h1 id="page-heading" className="text-[34px] leading-[1.15] font-medium tracking-[-0.06em] text-white md:text-[40px]">
              {contact.hero.heading}
            </h1>
            <p className="mt-3 text-[13px] font-medium text-white">{contact.hero.subheading}</p>
            <p className="mt-6 max-w-[400px] text-[14px] leading-[22px] text-[#c7c7c7]">{contact.hero.text}</p>
          </div>

          {/* NAP — identical to footer and schema (from /content/site.ts) */}
          <address className="fx-zoom-load flex flex-col gap-6 not-italic" style={delay(0.15)}>
            <div className={row}>
              <span className={rowLabel}>{l.email}</span>
              <a href={`mailto:${site.email}`} className="text-[20px] text-white hover:text-lime">
                {site.email}
              </a>
            </div>
            <div className={row}>
              <span className={rowLabel}>{l.phone}</span>
              <a href={`tel:${site.phone.tel}`} className="text-[20px] text-white hover:text-lime">
                {site.phone.display}
              </a>
            </div>
            <div className={row}>
              <span className={rowLabel}>{l.office}</span>
              <span className="text-[22px] leading-snug tracking-[-0.03em] text-white">{fullAddress}</span>
            </div>
            <div className={row}>
              <span className={rowLabel}>{l.follow}</span>
              <ul className="flex flex-wrap gap-3" aria-label="Social media">
                {site.socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${s.name}`}
                      className="grid size-9 place-items-center rounded-full bg-white text-[#131313] transition-transform hover:scale-110"
                    >
                      <SocialIcon name={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </address>
        </section>

        <section aria-label="Contact form" className="flex items-center justify-center rounded-[24px] bg-[linear-gradient(90deg,#3c4a8e_0%,#55306f_55%,#6b2463_100%)] p-4 md:p-5">
          <div className="fx-zoom-load w-full max-w-[610px] rounded-[22px] bg-white/70 p-3" style={delay(0.1)}>
            <div className="rounded-[16px] bg-white p-5 md:p-5">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
      <JsonLd data={schema} />
    </>
  );
}
