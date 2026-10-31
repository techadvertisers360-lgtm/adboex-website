/**
 * TESTIMONIALS — controls the client quotes on the Home page (and other pages
 * that show testimonials). `short` shows on the card, `full` in the popup.
 *
 * ⚠️ PLACEHOLDERS: these names and quotes are examples only. Replace them with
 * real, permission-approved client testimonials before launch — publishing
 * invented reviews is misleading and against FTC rules.
 *
 * Photos: image = small square avatar (280×280); photo = large photo shown in the
 * home slider (1216×1000), e.g. /public/images/testimonials/marcus-bell-photo.webp.
 * ⚠️ The current photos are free Unsplash stock portraits used as placeholders.
 * video = optional YouTube video ID — shows a play button on the photo.
 */

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  image: string;
  photo?: string;
  video?: string;
  short: string;
  full: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Marcus Bell",
    role: "Owner",
    company: "Bell Heating & Air",
    image: "/images/testimonials/marcus-bell.webp",
    photo: "/images/testimonials/marcus-bell-photo.webp",
    short:
      "We used to juggle an SEO agency, a review tool and a call service. Adboex replaced all three, and our phone rings more in winter than it ever has.",
    full:
      "We used to juggle an SEO agency, a review tool and a call service, and none of them talked to each other. Adboex replaced all three. Our Google profile posts every week without me thinking about it, reviews get answered the same day, and the AI receptionist books after-hours calls straight into the schedule. Our phone rings more this winter than it ever has, and I finally understand my own marketing report.",
  },
  {
    name: "Dana Ortiz",
    role: "Founder",
    company: "Ortiz Plumbing Co.",
    image: "/images/testimonials/dana-ortiz.webp",
    photo: "/images/testimonials/dana-ortiz-photo.webp",
    short:
      "The website fixes alone were worth it. Then we started showing up when people asked ChatGPT for a plumber near them. That never happened before.",
    full:
      "The website fixes alone were worth it — broken pages, missing schema, slow load times, all sorted in a click. Then the city pages went live and we started showing up when people asked ChatGPT and Perplexity for a plumber near them. That had never happened before. Emergency calls at 2am now get answered and logged, so we stopped losing jobs to whoever picked up first.",
  },
  {
    name: "Priya Shah",
    role: "Broker",
    company: "Shah Realty Group",
    image: "/images/testimonials/priya-shah.webp",
    photo: "/images/testimonials/priya-shah-photo.webp",
    short:
      "Neighborhood pages, weekly profile posts and instant replies to every inquiry. Seller leads are up and I spend less time on marketing than ever.",
    full:
      "Neighborhood pages, weekly profile posts and instant replies to every inquiry — it all runs without me. Seller leads are up, our team shows up in local AI answers, and I spend less time on marketing than ever. The mobile app is the part I use daily: I can check calls, fix a listing page or create a quick promo video between showings.",
  },
];
