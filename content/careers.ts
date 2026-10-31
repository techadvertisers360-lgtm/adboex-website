/**
 * CAREERS PAGE — controls /careers/ in page order: hero + photo, team text +
 * photo grid, open positions and the careers FAQ.
 *
 * ADD A JOB: copy one object in `openings` and give it a unique `id`.
 * "Apply now" opens an email to `applyEmail` with the job title as subject.
 * Remove jobs once they are filled.
 * Photos: /public/images/careers/ (hero 1600×760, team-01…04).
 */

export const careers = {
  hero: {
    pill: "Career",
    heading: "AI Marketing Jobs for People Who Build Fast and Think Forward",
    highlight: [] as string[],
    text: "Explore AI marketing jobs at Adboex and take your career to full speed.",
    image: { src: "/images/careers/hero.webp", alt: "Adboex team members smiling around a laptop in the office" },
  },

  team: {
    heading: "One team building AI to power the future of local business",
    text: "We believe AI is essential to solving the biggest challenges local businesses face. At Adboex we build intelligent, scalable systems that help real companies grow ahead of the curve.",
    // grid: first row wide + narrow, second row two equal photos
    photos: [
      { src: "/images/careers/team-01.webp", alt: "Adboex team collaborating around a laptop", width: 1200, height: 760 },
      { src: "/images/careers/team-02.webp", alt: "Two Adboex teammates reviewing a project", width: 600, height: 760 },
      { src: "/images/careers/team-03.webp", alt: "Adboex speaker presenting on stage at a conference", width: 900, height: 1000 },
      { src: "/images/careers/team-04.webp", alt: "Adboex team reviewing documents at a workshop table", width: 900, height: 1000 },
    ],
  },

  openingsPill: "Career",
  openingsHeading: "Open positions",
  openingsText:
    "We're building intelligent systems that power the future of local business. Adboex is always looking for people who work at the intersection of innovation and execution. If you thrive on solving hard problems with AI, this is where you'll do work that matters.",
  applyEmail: "info@adboex.com",
  applyLabel: "Apply now",
  openings: [
    { id: "senior-data-scientist", title: "Senior Data Scientist", location: "St. Petersburg, FL", workplace: "On-site" },
    { id: "senior-ml-engineer", title: "Senior Machine Learning Engineer", location: "St. Petersburg, FL", workplace: "On-site" },
  ],

  faq: {
    heading: "Frequently asked questions",
    text: "Quick answers to help you get to know Adboex.",
    items: [
      { question: "What is Adboex?", answer: "Adboex is an AI operating system for local business visibility. It connects websites, Google Business Profiles, reviews, content and AI search in one platform." },
      { question: "Who does Adboex help?", answer: "Local service businesses such as HVAC companies, plumbers, roofers, remodelers, real estate agents and auto repair shops that depend on local customers finding them." },
      { question: "Does Adboex help track performance?", answer: "Yes. Calls, clicks, rankings, reviews and AI visibility are tracked in one plain-English dashboard, with automatic reports." },
      { question: "What kind of roles do you hire for?", answer: "Mostly engineering, data science, product and customer success roles. If no open position fits, email your CV and a short note about what you'd like to work on." },
    ],
  },
};

export type Opening = (typeof careers.openings)[number];
