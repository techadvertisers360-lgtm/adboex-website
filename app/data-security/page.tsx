import { buildMetadata } from "@/lib/seo";
import { LegalPageView } from "@/components/sections/shared/LegalPageView";

/* Text for this page lives in /content/legal.ts → seoKey "dataSecurity" */
export const metadata = buildMetadata("dataSecurity");

export default function DataSecurityPage() {
  return <LegalPageView seoKey="dataSecurity" />;
}
