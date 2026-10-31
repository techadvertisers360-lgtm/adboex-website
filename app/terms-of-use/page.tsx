import { buildMetadata } from "@/lib/seo";
import { LegalPageView } from "@/components/sections/shared/LegalPageView";

/* Text for this page lives in /content/legal.ts → seoKey "terms" */
export const metadata = buildMetadata("terms");

export default function TermsOfUsePage() {
  return <LegalPageView seoKey="terms" />;
}
