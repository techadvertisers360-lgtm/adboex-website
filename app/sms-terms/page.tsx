import { buildMetadata } from "@/lib/seo";
import { getLegalPage, smsOptIn } from "@/content/legal";
import { formatDate } from "@/lib/posts";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SmsOptInForm } from "@/components/forms/SmsOptInForm";

/* Form text and SMS Terms live in /content/legal.ts (smsOptIn + seoKey "smsTerms") */
export const metadata = buildMetadata("smsTerms");

/** Reference layout: narrow SMS opt-in form; the SMS Terms follow below it. */
export default function SmsTermsPage() {
  const terms = getLegalPage("smsTerms");
  return (
    <div className="pt-32 pb-20 md:pt-[150px] md:pb-28">
      <Breadcrumbs items={[{ name: terms.title, path: terms.path }]} className="sr-only" />
      <section aria-labelledby="page-heading" className="container-x max-w-[558px]">
        <h1 id="page-heading" className="text-[20px] leading-[1.3] font-bold text-white">
          {smsOptIn.heading}
        </h1>
        <p className="mt-3 mb-6 text-[13px] leading-[1.6] text-[#c7c7c7]">{smsOptIn.text}</p>
        <SmsOptInForm />
      </section>

      <section id="sms-terms" aria-labelledby="sms-terms-heading" className="container-x mt-24 max-w-[558px] scroll-mt-28">
        <h2 id="sms-terms-heading" className="text-[20px] leading-[1.3] font-bold text-white">
          {terms.title}
        </h2>
        <p className="mt-2 text-[12px] text-[#c7c7c7]">
          Last updated: <time dateTime={terms.updated}>{formatDate(terms.updated)}</time>
        </p>
        <div className="mt-5 flex flex-col gap-4 text-[13px] leading-[1.6] text-[#c7c7c7]">
          <p>{terms.intro}</p>
          {terms.sections.map((s) => (
            <div key={s.heading}>
              <h3 className="font-semibold text-white">{s.heading}</h3>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 30)} className="mt-1">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
