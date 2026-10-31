import { getLegalPage, type LegalPage } from "@/content/legal";
import { formatDate } from "@/lib/posts";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

/** Shared layout for all legal pages (reference style; text in /content/legal.ts). */
export function LegalPageView({ seoKey }: { seoKey: LegalPage["seoKey"] }) {
  const page = getLegalPage(seoKey);
  return (
    <article aria-labelledby="page-heading" className="pt-32 pb-20 md:pt-[180px] md:pb-28">
      <div className="container-x">
        <Breadcrumbs items={[{ name: page.title, path: page.path }]} className="sr-only" />
        <header className="fx-zoom-load flex flex-col items-center text-center">
          <h1 id="page-heading" className="text-[34px] leading-[1.2] font-medium tracking-[-0.06em] text-white md:text-[48px] md:leading-[58px]">
            {page.title}
          </h1>
          <p className="mt-4 text-[14px] text-white">
            Last updated: <time dateTime={page.updated}>{formatDate(page.updated)}</time>
          </p>
        </header>
        <div className="legal-text mt-16 md:mt-20">
          <p>{page.intro}</p>
          {page.sections.map((s) => (
            <section key={s.heading} aria-label={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
