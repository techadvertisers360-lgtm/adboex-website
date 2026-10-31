import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_URL } from "@/content/site";

/** Merge Tailwind class names, later classes win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Turn a site path ("/pricing/") into a full URL ("https://www.adboex.com/pricing/"). */
export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL + "/").toString();
}

/** "Plumbers" → "plumbers"; used for ids and anchors. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
