import { buildMetadata } from "@/lib/seo";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata = buildMetadata("insights");

export default function InsightsPage() {
  return <BlogIndex page={1} />;
}
