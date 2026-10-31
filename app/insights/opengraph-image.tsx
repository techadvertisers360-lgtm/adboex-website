import { seo } from "@/content/seo";
import { ogContentType, ogImage, ogSize, ogTitle } from "@/lib/og";

/* Social-share image for this page (generated at build time — design in lib/og.tsx). */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = seo.insights.title;

export default function Image() {
  return ogImage({ title: ogTitle(seo.insights.title), eyebrow: "Insights" });
}
