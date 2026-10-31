import { industries, getIndustry } from "@/content/industries";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Adboex industry solution";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const industry = getIndustry((await params).slug);
  return ogImage({ title: industry?.hero.heading ?? "Adboex", eyebrow: industry ? `For ${industry.plural}` : undefined });
}
