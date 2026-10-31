import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

/* Real 404: Next.js returns HTTP status 404 for this page. */
export const metadata: Metadata = {
  title: { absolute: seo.notFound.title },
  description: seo.notFound.description,
  robots: { index: false, follow: true },
};

const links = [
  { label: "Adboex Platform", href: "/platform/", text: "Every automation in one AI system" },
  { label: "Pricing", href: "/pricing/", text: "Plans from $285/month, no contracts" },
  { label: "Industries", href: "/industries/", text: "HVAC, plumbing, roofing and more" },
  { label: "Insights blog", href: "/insights/", text: "Local SEO and AI search guides" },
  { label: "Case studies", href: "/case-studies/", text: "Results from local businesses" },
  { label: "Contact us", href: "/contact-us/", text: "Real people, real fast" },
];

export default function NotFound() {
  return (
    <section aria-labelledby="page-heading" className="relative overflow-hidden pt-36 pb-24 md:pt-44">
      <div aria-hidden="true" className="glow-hero pointer-events-none absolute inset-x-0 top-0 h-[600px]" />
      <div className="container-x relative flex flex-col items-center text-center">
        <p className="text-gradient text-8xl font-semibold tracking-tighter md:text-9xl">404</p>
        <h1 id="page-heading" className="type-h2 mt-4">
          This page took a wrong turn
        </h1>
        <p className="mt-4 max-w-xl text-copy">
          The page you were looking for has moved or no longer exists. Here are the most useful places to go next on {site.name}.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back to the homepage
        </ButtonLink>
        <nav aria-label="Popular pages" className="mt-14 w-full max-w-4xl">
          <ul className="grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="card card-hover flex h-full flex-col gap-1 p-5">
                  <span className="flex items-center justify-between font-semibold text-title">
                    {l.label}
                    <ArrowUpRight aria-hidden="true" className="size-4 text-lime" />
                  </span>
                  <span className="text-sm text-copy">{l.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
