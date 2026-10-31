import { seo } from "@/content/seo";
import { ogContentType, ogImage, ogSize, ogTitle } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = seo.refund.title;

export default function Image() {
  return ogImage({ title: ogTitle(seo.refund.title), eyebrow: "Legal" });
}
