import { buildMetadata } from "@/lib/seo";
import { LegalPageView } from "@/components/sections/shared/LegalPageView";

/* Text for this page lives in /content/legal.ts → seoKey "privacy" */
export const metadata = buildMetadata("privacy");

export default function PrivacyPolicyPage() {
  return <LegalPageView seoKey="privacy" />;
}
