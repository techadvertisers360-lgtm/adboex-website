/**
 * CASE STUDIES — controls the client grid on /case-studies/.
 *
 * ⚠️ These clients are ILLUSTRATIVE PLACEHOLDERS (names, quotes and photos are
 * demo content). Replace them with real clients — with their permission —
 * before launch. Publishing invented testimonials as real is misleading.
 *
 * EACH CLIENT: name, role, location, photo (/public/images/case-studies/,
 * 820×920 portrait), a short quote (shown when the play button is clicked)
 * and optional `video` = YouTube ID — when set, the button plays the video.
 */

export type CaseClient = {
  name: string;
  role: string;
  business: string;
  location: string;
  image: string;
  quote: string;
  video?: string;
};

export const caseStudiesPage = {
  hero: {
    pill: "Case studies",
    heading: "Local SEO Case Studies: Our Success Stories",
    highlight: [] as string[],
    text: "Watch how local business owners grow with Adboex. Real clients, real numbers and real-time transformations powered by automation and smart local SEO strategy.",
  },
  playLabel: "Play story from",
};

export const caseClients: CaseClient[] = [
  { name: "Rachel Moreno", role: "Owner", business: "Moreno Home Cleaning", location: "United States", image: "/images/case-studies/client-01.webp", quote: "Within two months we were showing up in the Map Pack for every suburb we serve. The phone has not stopped." },
  { name: "Daniel Okafor", role: "CEO", business: "Okafor Electric", location: "United States", image: "/images/case-studies/client-02.webp", quote: "I used to pay three different vendors. Adboex replaced all of them and our calls doubled." },
  { name: "Mark Ellison", role: "CEO", business: "Ellison Roofing", location: "United States", image: "/images/case-studies/client-03.webp", quote: "We reached the top three on Google in twelve cities. The weekly reports finally make sense to me." },
  { name: "Lucia Herrera", role: "Owner", business: "Herrera Dental Studio", location: "United States", image: "/images/case-studies/client-04.webp", quote: "Reviews get answered within minutes now, and new patients tell us they found us on Google." },
  { name: "Thomas Reid", role: "CEO", business: "Reid Auto Repair", location: "United States", image: "/images/case-studies/client-05.webp", quote: "The AI receptionist books jobs while we are under the hood. We stopped losing after-hours calls." },
  { name: "Sophia Grant", role: "Founder", business: "Grant Realty Group", location: "United States", image: "/images/case-studies/client-06.webp", quote: "ChatGPT now recommends our team when people ask for agents in our area. That was unthinkable a year ago." },
  { name: "Andre Collins", role: "CEO", business: "Collins Plumbing Co.", location: "United States", image: "/images/case-studies/client-07.webp", quote: "Emergency calls go straight to our calendar. Our technicians are booked out a week in advance." },
  { name: "Emily Carter", role: "Owner", business: "Carter Remodeling", location: "United States", image: "/images/case-studies/client-08.webp", quote: "Our new service pages rank for kitchens and bathrooms in every town we cover." },
  { name: "Grace Mensah", role: "CEO", business: "Mensah HVAC Services", location: "United States", image: "/images/case-studies/client-09.webp", quote: "Inbound calls are up 2x since we started, and I spend zero time on marketing." },
  { name: "Ryan Takeda", role: "Owner", business: "Takeda Excavation", location: "United States", image: "/images/case-studies/client-10.webp", quote: "Commercial contractors find us first now. Adboex paid for itself in the first month." },
  { name: "Hannah Brooks", role: "Founder", business: "Brooks Charter Rentals", location: "United States", image: "/images/case-studies/client-11.webp", quote: "Bookings from Google and AI search grew every month. The dashboard shows exactly where they come from." },
  { name: "Olivia Lindqvist", role: "CEO", business: "Lindqvist Car Rentals", location: "United States", image: "/images/case-studies/client-12.webp", quote: "We finally outrank the big national brands in our own city." },
];
