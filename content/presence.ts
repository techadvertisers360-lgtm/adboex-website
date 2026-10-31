/**
 * OUR PRESENCE (rotating globe section) — controls the text, office cards,
 * globe markers and industry pills of the "Our presence" section.
 *
 * Where it appears: Home page (after Testimonials) and About page.
 * Remove/move it by editing the `homeSections` list in /content/home.ts
 * or `aboutSections` in /content/about.ts.
 *
 * OFFICES
 *  - title / city: the text on each floating card (real text in the page HTML)
 *  - lat / lng: where the green dot sits on the globe (find them on Google Maps:
 *    right-click a place → the first number is lat, the second is lng)
 *  - card: where the card floats over the globe on desktop (top/left in %),
 *    and its tilt in degrees (-4 to 4)
 *  - address: OPTIONAL — fill it in to add this office to Google's
 *    Organization data (schema). Leave it out while the city is a placeholder.
 *
 * PILLS: label, optional link (only link to pages that exist), tone =
 * "blue" | "dark" | "purple" (#55196F). They are split into 2 centred rows.
 *
 * Rotation speed lives in /content/animations.ts → globeSpeed.
 */

export type Office = {
  title: string;
  city: string;
  lat: number;
  lng: number;
  card: { top: string; left: string; rotate: number };
  address?: { locality: string; region?: string; country: string; street?: string; postalCode?: string };
};

export type PresencePill = { label: string; href?: string; tone: "blue" | "dark" | "purple" };

export const presence = {
  label: "Our presence",
  heading: "Serving local businesses across the globe",
  text: "Our teams support service businesses in every time zone, with local experts who know your market and AI that never sleeps.",

  offices: [
    {
      title: "Head office",
      city: "[City, Country]", // REPLACE
      lat: 51.5072,
      lng: -0.1276,
      card: { top: "14%", left: "4%", rotate: -4 },
    },
    {
      title: "Regional office",
      city: "[City, Country]", // REPLACE
      lat: 25.2048,
      lng: 55.2708,
      card: { top: "8%", left: "70%", rotate: 3 },
    },
    {
      title: "US office",
      city: "St. Petersburg, FL",
      lat: 27.8403,
      lng: -82.6389,
      card: { top: "48%", left: "76%", rotate: -2 },
      address: { street: "7901 4th St N", locality: "St. Petersburg", region: "FL", postalCode: "33702", country: "US" },
    },
  ] satisfies Office[] as Office[],

  /** Which offices are connected by blue arcs (indexes into `offices`). */
  arcs: [
    [0, 1],
    [0, 2],
    [1, 2],
  ] as [number, number][],

  pills: [
    { label: "Retail", tone: "blue" },
    { label: "Real estate", href: "/industries/real-estate/", tone: "dark" },
    { label: "Food & dining", tone: "purple" },
    { label: "Fashion", tone: "blue" },
    { label: "Beauty", tone: "dark" },
    { label: "E-commerce", tone: "purple" },
    { label: "Education", tone: "blue" },
    { label: "Healthcare", tone: "dark" },
    { label: "SaaS", tone: "purple" },
    { label: "Startups", tone: "blue" },
  ] satisfies PresencePill[] as PresencePill[],

  /** Static globe shown before the 3D globe loads, without JS and for reduced motion.
   *  Regenerate after changing offices: npm run globe-image */
  staticImage: "/images/presence/globe-static.webp",
  srListLabel: "Our office locations",
};
