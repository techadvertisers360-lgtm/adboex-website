import { buildMetadata } from "@/lib/seo";
import { LegalPageView } from "@/components/sections/shared/LegalPageView";

/* Text for this page lives in /content/legal.ts → seoKey "refund" */
export const metadata = buildMetadata("refund");

export default function RefundPolicyPage() {
  return <LegalPageView seoKey="refund" />;
}
