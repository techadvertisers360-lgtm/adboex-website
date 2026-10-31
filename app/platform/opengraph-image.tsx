import { seo } from "@/content/seo";
import { ogContentType, ogImage, ogSize, ogTitle } from "@/lib/og";

/* Social-share image for this page (generated at build time — design in lib/og.tsx). */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = seo.platform.title;

export default function Image() {
  return ogImage({ title: ogTitle(seo.platform.title), eyebrow: "Platform" });
}
