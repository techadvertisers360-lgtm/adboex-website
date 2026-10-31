import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Visible breadcrumb trail + BreadcrumbList schema.
 * Pass every level after Home; the last one is the current page.
 *   <Breadcrumbs items={[{ name: "Industries", path: "/industries/" }, { name: "HVAC", path: "/industries/hvac/" }]} />
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("type-small", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-subtle">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-copy">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="transition-colors hover:text-title">
                      {c.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
