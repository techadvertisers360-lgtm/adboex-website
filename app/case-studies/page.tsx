import { buildMetadata } from "@/lib/seo";
import { caseClients, caseStudiesPage as p } from "@/content/case-studies";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CaseStudyGrid } from "@/components/sections/shared/CaseStudyGrid";

export const metadata = buildMetadata("caseStudies");

/** Reference layout: hero, then the client photo grid — nothing else. */
export default function CaseStudiesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Case Studies", path: "/case-studies/" }]} pill={p.hero.pill} title={p.hero.heading} highlight={p.hero.highlight} text={<p>{p.hero.text}</p>} />
      <section aria-label="Client success stories" className="pb-20 md:pb-32">
        <div className="container-x">
          <CaseStudyGrid clients={caseClients} playLabel={p.playLabel} />
        </div>
      </section>
    </>
  );
}
