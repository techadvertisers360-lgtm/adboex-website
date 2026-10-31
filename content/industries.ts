/**
 * INDUSTRY PAGES — controls /industries/ and every /industries/<slug>/ page.
 *
 * - `industryTemplate`: text shared by every industry page (section labels,
 *   the 16 feature cards, integrations). "{name}" is replaced with the
 *   industry's name (e.g. "HVAC").
 * - `industries`: one object per industry with its UNIQUE copy. Keep at
 *   least ~600 words of unique text per industry (no copy-paste between
 *   pages) so Google treats each page as valuable.
 *
 * ADD AN INDUSTRY: copy one object, change slug/name/all text, then add an
 * SEO entry "industry-<slug>" in /content/seo.ts and a menu link in
 * /content/site.ts (nav.industries + footer).
 *
 * SEO: each page's H1 (hero.heading) must contain its primary keyword from
 * /content/seo.ts, e.g. "HVAC marketing software".
 */

export type Industry = {
  slug: string;
  name: string; // short name used in sentences, e.g. "HVAC"
  plural: string; // e.g. "HVAC contractors"
  serviceType: string; // Service schema serviceType
  image: { src: string; alt: string }; // card image on /industries/
  hero: {
    pill: string;
    heading: string;
    highlight: string[];
    text: string;
    score: { value: number; rank: string; rating: string; reviews: string; calls: string };
    keywords: string[]; // scrolling chips under the score card
  };
  whoItsFor: { heading: string; text: string; list: string[] };
  definition: { term: string; text: string };
  challenges: { heading: string; intro: string; items: { stat: string; title: string; text: string }[] };
  geoGrid: { heading: string; text: string; city: string };
  receptionist: { heading: string; text: string; bullets: string[]; chat: { visitor: string; reply: string; lead: string } };
  seasons: { heading: string; text: string; items: { label: string; note: string; peak?: boolean }[] };
  faqs: { question: string; answer: string }[];
  related: { posts: string[]; label: string };
  cta: { heading: string; text: string };
};

/* ============================ SHARED TEMPLATE ============================ */
export const industryTemplate = {
  hubHero: {
    pill: "Industries",
    heading: "Marketing Software for Service Businesses in Every Trade",
    text:
      "Adboex is marketing software for service businesses that live and die by local search. Pick your industry to see how we tune local SEO, Google Business Profile automation, AI search visibility and 24/7 inquiry capture to the way your customers search and buy.",
  },
  hubGrid: { heading: "Choose your industry", cta: "See how it works" },
  scoreCard: { title: "Local Visibility Score", live: "Live", rankLabel: "Map pack rank", reviewsLabel: "reviews", callsLabel: "calls this month" },
  geoLegend: [
    { label: "Rank 1–3", tone: "lime" },
    { label: "Rank 4–10", tone: "azure" },
    { label: "Rank 11+", tone: "muted" },
  ],
  geoPill: "Geo-grid rank tracking",
  geoNote: "Example geo-grid. Your live grid is generated from real rankings after setup.",
  system: {
    pill: "The full system",
    heading: "Everything {name} businesses need to get found, chosen and booked",
    text: "Sixteen automations grouped into four jobs, all running from one dashboard.",
    pillars: [
      {
        number: "01",
        title: "Get Found",
        subtitle: "Show up wherever local customers search.",
        cards: [
          { title: "City and service pages", text: "AI-written pages for every {name} service and city you cover, published to WordPress." },
          { title: "Technical SEO", text: "Meta tags, schema, sitemaps and site speed handled automatically." },
          { title: "AI search visibility", text: "Track and improve how ChatGPT, Gemini and Perplexity recommend you." },
          { title: "Rank tracking", text: "Keyword and geo-grid rankings across your whole service area." },
        ],
      },
      {
        number: "02",
        title: "Get Chosen",
        subtitle: "Look like the obvious choice.",
        cards: [
          { title: "Weekly profile posts", text: "Fresh Google Business Profile posts that show you're active and trusted." },
          { title: "AI review replies", text: "Every review answered quickly, in your voice." },
          { title: "Accurate business info", text: "Hours, services and categories kept consistent everywhere." },
          { title: "PR and authority", text: "Press distribution that builds credibility with Google and AI engines." },
        ],
      },
      {
        number: "03",
        title: "Fix the Site",
        subtitle: "Turn visitors into booked jobs.",
        cards: [
          { title: "One-click fixes", text: "Broken links, missing tags and errors found and fixed instantly." },
          { title: "Site health monitoring", text: "Continuous checks so problems never sit unnoticed." },
          { title: "Conversion-ready pages", text: "Clear calls to action and click-to-call on every page." },
          { title: "Fix from your phone", text: "Approve and apply website fixes from the Adboex app." },
        ],
      },
      {
        number: "04",
        title: "Stay Ahead",
        subtitle: "Know more than the competition.",
        cards: [
          { title: "Competitor analysis", text: "See which {name} competitors rank near you and why." },
          { title: "Performance reports", text: "Calls, clicks and inquiries explained in plain English." },
          { title: "Performance alerts", text: "Get notified the moment something important changes." },
          { title: "Ads management", text: "Meta and Google Ads managed alongside your organic growth." },
        ],
      },
    ],
  },
  receptionistPill: "Meet Max",
  receptionistCta: "Book a Live Demo",
  chatUi: { name: "Max", status: "online", voice: "Voice", chat: "Chat", leadSent: "Lead sent to your phone" },
  seasonsPill: "Built for the season, not the sale",
  integrations: {
    pill: "Connects to what you already use",
    heading: "No new software to learn.",
    items: [
      { name: "Google Business Profile", src: "/images/tech-logos/tech-18.svg" },
      { name: "Google Search Console", src: "/images/tech-logos/tech-17.svg" },
      { name: "WordPress", src: "/images/tech-logos/tech-16.svg" },
    ],
    caption: "Connect once in under 10 minutes. Adboex does the rest.",
  },
  websitePlan: {
    name: "Custom Website Development",
    price: 1380,
    unit: "/one-time",
    text: "Don't have a site built to carry Max and this system yet? One-time build, designed around your real services and photos, and yours to keep.",
  },
  demoVideoLabel: "Adboex dashboard demo",
  ctaNote: "No commitment · takes about 15 minutes ·",
  faqHeading: "{name} marketing questions, answered",
  faqText: "Everything you need to know before you connect.",
};

/* ============================ INDUSTRIES ============================ */
export const industries: Industry[] = [
  /* ------------------------------ HVAC ------------------------------ */
  {
    slug: "hvac",
    name: "HVAC",
    plural: "HVAC contractors",
    serviceType: "HVAC marketing software",
    image: { src: "/images/industries/hvac.webp", alt: "HVAC technician servicing an air conditioning unit" },
    hero: {
      pill: "Local SEO + AI visibility for HVAC contractors",
      heading: "HVAC Marketing Software That Fills Your Schedule Year-Round",
      highlight: ["HVAC"],
      text:
        "Adboex is HVAC marketing software that ranks your company in Google Maps and AI answers, keeps your profile active and answers every no-heat and no-cool call, even at 2am.",
      score: { value: 92, rank: "#2", rating: "4.8", reviews: "212", calls: "+38%" },
      keywords: ["ac repair near me", "furnace repair", "hvac company near me", "heat pump install", "emergency ac service", "duct cleaning"],
    },
    whoItsFor: {
      heading: "Built for heating and cooling companies that want more booked calls",
      text:
        "Adboex fits residential and light-commercial HVAC companies with one to fifty trucks, owner-operators who are tired of paying for leads they share with three competitors, and growing shops that want to own their local visibility instead of renting it from an agency.",
      list: ["Residential AC and furnace repair", "Heat pump and mini-split installers", "Commercial HVAC service contractors", "Duct cleaning and indoor air quality"],
    },
    definition: {
      term: "What is HVAC marketing software?",
      text:
        "HVAC marketing software is a platform that automates how a heating and cooling company gets found and booked online. Adboex combines local SEO, Google Business Profile management, AI search visibility, review replies and a 24/7 AI receptionist, so homeowners searching for repairs find and call you first.",
    },
    challenges: {
      heading: "Why HVAC companies lose calls they should win",
      intro: "Demand for heating and cooling is urgent and seasonal. When a system fails, homeowners call the first credible company they find.",
      items: [
        { stat: "Map pack", title: "Top-3 or invisible", text: "Most repair calls go to the three companies in the Google map pack. Ranking fourth feels close but books far fewer jobs." },
        { stat: "After hours", title: "Missed emergency calls", text: "No-heat calls at night go to whoever answers. A voicemail usually means a lost job and a lost maintenance customer." },
        { stat: "AI answers", title: "New search habits", text: "Homeowners now ask ChatGPT for a reliable HVAC company near them. If AI doesn't know you, you're not in the answer." },
        { stat: "Reviews", title: "Trust decides the call", text: "Unanswered reviews and a quiet profile make a company look closed, even when crews are fully booked." },
      ],
    },
    geoGrid: {
      heading: "See exactly where you rank across your HVAC service area",
      text: "A geo-grid checks your ranking for terms like “AC repair” from dozens of points across town, so you can see which neighborhoods you win and where competitors take the calls.",
      city: "Dallas, TX",
    },
    receptionist: {
      heading: "Max answers every no-heat call, day or night",
      text:
        "The Adboex AI receptionist picks up calls and website chats 24/7, asks the right qualifying questions, captures the address and system details, and books the visit or texts the lead to your on-call tech.",
      bullets: ["Qualifies emergency vs. routine service", "Captures system type, age and symptoms", "Books maintenance plans and tune-ups"],
      chat: {
        visitor: "Our furnace stopped working and it's 28 degrees outside. Can someone come tonight?",
        reply: "I'm sorry, that's urgent. I can get a technician out tonight. What's your address and is the furnace gas or electric?",
        lead: "Emergency furnace call · Plano",
      },
    },
    seasons: {
      heading: "Visibility that follows the HVAC calendar",
      text: "Adboex shifts your posts, pages and offers ahead of each demand spike so you rank before the rush, not after.",
      items: [
        { label: "Spring", note: "AC tune-up campaigns" },
        { label: "Summer", note: "No-cool emergencies", peak: true },
        { label: "Peak", note: "Heat-wave call volume", peak: true },
        { label: "Fall", note: "Furnace safety checks" },
        { label: "Winter Peak", note: "No-heat emergencies", peak: true },
      ],
    },
    faqs: [
      { question: "How does Adboex get my HVAC company more calls?", answer: "It improves the three things that drive HVAC calls: map pack rankings, a trusted and active Google profile, and answering every call. Website fixes, city pages, weekly posts, review replies and the AI receptionist work together on all three." },
      { question: "Can the AI receptionist handle emergency HVAC calls?", answer: "Yes. Max answers 24/7, identifies urgent no-heat or no-cool situations, collects the address and system details, and either books the visit or alerts your on-call technician immediately." },
      { question: "Will Adboex create pages for every city I serve?", answer: "Yes. On WordPress sites Adboex writes and publishes service and city pages, such as AC repair in each suburb you cover, so you can rank across your whole service area rather than only your home city." },
      { question: "Do I still need to buy HVAC leads?", answer: "Many customers reduce or stop paid lead services because their own visibility brings exclusive calls. Results vary by market, and they usually build over 60 to 90 days." },
      { question: "Does Adboex work for commercial HVAC?", answer: "Yes. Commercial contractors use the same system with pages, posts and keywords focused on rooftop units, maintenance contracts and property managers." },
    ],
    related: { posts: ["local-seo-checklist-for-service-businesses", "ai-receptionist-for-small-business"], label: "HVAC marketing guides" },
    cta: { heading: "Find out why the HVAC company down the street gets the call", text: "Book a free live audit of your website, Google profile, rankings and AI visibility." },
  },

  /* ------------------------------ PLUMBING ------------------------------ */
  {
    slug: "plumbing",
    name: "Plumbing",
    plural: "plumbers",
    serviceType: "SEO for plumbers",
    image: { src: "/images/industries/plumbing.webp", alt: "Plumber repairing pipes under a kitchen sink" },
    hero: {
      pill: "Local SEO + AI visibility for plumbers",
      heading: "SEO for Plumbers That Turns Emergencies Into Booked Jobs",
      highlight: ["Plumbers"],
      text:
        "Adboex delivers SEO for plumbers on autopilot: higher map rankings, city pages for every suburb you serve, active Google profiles and an AI receptionist that answers burst-pipe calls the moment they come in.",
      score: { value: 89, rank: "#3", rating: "4.9", reviews: "167", calls: "+41%" },
      keywords: ["plumber near me", "emergency plumber", "drain cleaning", "water heater repair", "leak detection", "sewer line repair"],
    },
    whoItsFor: {
      heading: "For plumbing companies that win on speed and trust",
      text:
        "Adboex is designed for residential plumbing companies, emergency and 24-hour plumbers, drain and sewer specialists, and water heater installers. It suits a solo plumber who answers the phone from under a sink just as well as a multi-van team with a dispatcher.",
      list: ["24-hour emergency plumbers", "Drain cleaning and sewer specialists", "Water heater and tankless installers", "Repipe and remodel plumbing contractors"],
    },
    definition: {
      term: "What is SEO for plumbers?",
      text:
        "SEO for plumbers is the work of making a plumbing company appear when people nearby search for plumbing help on Google, Google Maps and AI assistants. It covers website optimization, service-area pages, Google Business Profile activity, reviews and fast response to the calls that visibility creates.",
    },
    challenges: {
      heading: "Where plumbing companies leak revenue online",
      intro: "Plumbing searches are urgent, local and decided in minutes. Small gaps cost real jobs.",
      items: [
        { stat: "Minutes", title: "Speed wins the job", text: "Someone with water on the floor calls until a plumber answers. Slow callbacks hand the job to a competitor." },
        { stat: "Suburbs", title: "One page, many towns", text: "A single service page rarely ranks in every suburb. Without city pages you're invisible outside your home town." },
        { stat: "Spam", title: "Fake listings crowd maps", text: "Lead-gen listings compete for the map pack. A complete, active real profile is your strongest defense." },
        { stat: "AI", title: "AI picks a favorite", text: "Ask an AI assistant for a trusted plumber and it names a few businesses. Strong reviews and citations decide which." },
      ],
    },
    geoGrid: {
      heading: "Know which neighborhoods call you, and which call someone else",
      text: "Track rankings for “emergency plumber” and “drain cleaning” across a grid of locations to spot the suburbs where a city page or more reviews would win you calls.",
      city: "Phoenix, AZ",
    },
    receptionist: {
      heading: "Max picks up when the pipe bursts",
      text:
        "Plumbing emergencies don't wait for office hours. Max answers calls and chats instantly, gives callers clear next steps such as finding the shut-off valve, captures their details and gets the job to your on-call plumber.",
      bullets: ["Instant answers for burst pipes and backups", "Shares shut-off guidance while help is on the way", "Books water heater and drain appointments"],
      chat: {
        visitor: "Water is pouring from under my kitchen sink. Can you help right now?",
        reply: "Yes. First, turn off the shut-off valve under the sink. I'm alerting our on-call plumber now. What's your address?",
        lead: "Active leak · Scottsdale",
      },
    },
    seasons: {
      heading: "Ready for every plumbing rush",
      text: "Adboex times your content and offers to the moments demand spikes, from frozen pipes to holiday drain clogs.",
      items: [
        { label: "Spring", note: "Sump pumps and outdoor lines" },
        { label: "Summer", note: "Sprinklers and water heaters" },
        { label: "Holidays", note: "Kitchen drain clogs", peak: true },
        { label: "Fall", note: "Water heater flushes" },
        { label: "Winter Peak", note: "Frozen and burst pipes", peak: true },
      ],
    },
    faqs: [
      { question: "How long does SEO for plumbers take to work?", answer: "Website fixes and profile activity start immediately. Rankings and call growth usually build over 60 to 90 days, faster in less competitive areas and slower in large metros." },
      { question: "Can Adboex help me rank in nearby towns?", answer: "Yes. Adboex publishes city and service-area pages for the towns you serve and tracks your rankings across a geo-grid, so you can expand beyond the area around your shop address." },
      { question: "What happens to calls after hours?", answer: "The AI receptionist answers 24/7, gathers the caller's details and urgency, and either books the job or alerts your on-call plumber by text so emergencies are never sent to voicemail." },
      { question: "Will Adboex reply to my Google reviews?", answer: "Yes. It monitors new reviews and writes professional replies in your voice, including careful responses to negative reviews, which you can approve or let post automatically." },
      { question: "I already pay an SEO agency. Why switch?", answer: "Adboex covers the routine work agencies charge for, plus call answering and AI visibility, for one predictable monthly price with no contract, and you see everything in real time." },
    ],
    related: { posts: ["google-business-profile-optimization", "ai-receptionist-for-small-business"], label: "Plumbing marketing guides" },
    cta: { heading: "See which plumbing calls you're missing right now", text: "Get a free live audit of your rankings, Google profile and AI visibility in under 30 minutes." },
  },

  /* ------------------------------ ROOFING ------------------------------ */
  {
    slug: "roofing",
    name: "Roofing",
    plural: "roofers",
    serviceType: "Roofing lead generation AI",
    image: { src: "/images/industries/roofing.webp", alt: "Roofer installing shingles on a residential roof" },
    hero: {
      pill: "Local SEO + AI visibility for roofers",
      heading: "Roofing Lead Generation AI That Wins Inspections, Not Clicks",
      highlight: ["AI"],
      text:
        "Adboex is roofing lead generation AI that builds your own pipeline: top map rankings in every city you cover, storm-ready pages, active Google profiles and a receptionist that books inspections around the clock.",
      score: { value: 87, rank: "#2", rating: "4.9", reviews: "304", calls: "+52%" },
      keywords: ["roofer near me", "roof replacement", "storm damage roof repair", "roof inspection", "metal roofing", "roof leak repair"],
    },
    whoItsFor: {
      heading: "For roofing contractors who want exclusive leads",
      text:
        "Adboex works for residential re-roofers, storm restoration companies, commercial flat-roof contractors and gutter and siding add-on businesses. It's especially useful for roofers who rely on shared lead services and want inspections that come only to them.",
      list: ["Residential replacement roofers", "Storm and insurance restoration companies", "Commercial and flat-roof contractors", "Metal roofing specialists"],
    },
    definition: {
      term: "What is roofing lead generation AI?",
      text:
        "Roofing lead generation AI uses automation to attract and capture homeowners who need roof work. Instead of buying shared leads, Adboex grows your own visibility in Google, Maps and AI assistants, then answers every call and chat so inspections land on your calendar.",
    },
    challenges: {
      heading: "Why roofing leads get expensive",
      intro: "Roofing jobs are high-value and highly competitive, so every missed opportunity is costly.",
      items: [
        { stat: "Shared", title: "Leads sold to five roofers", text: "Paid lead services often sell the same homeowner to several contractors, forcing a race to the bottom on price." },
        { stat: "Storms", title: "Demand spikes overnight", text: "After hail or wind, search volume surges. Companies that already rank and answer fast take most of the work." },
        { stat: "Cities", title: "Large service areas", text: "Roofers cover many towns. Without city pages and geo-grid tracking you rank well in only a few." },
        { stat: "Proof", title: "Homeowners want evidence", text: "A big purchase needs trust. Recent reviews, photos and posts show homeowners you're established." },
      ],
    },
    geoGrid: {
      heading: "Map your rankings across every town you roof",
      text: "See where you hold the map pack for “roof replacement” and “storm damage repair” across your territory, then target the gaps with city pages and fresh profile posts.",
      city: "Denver, CO",
    },
    receptionist: {
      heading: "Max books inspections while your crews are on the roof",
      text:
        "Max answers calls and chats when you can't, collects the address, roof age, damage type and insurance details, and books the inspection directly, so storm-season leads never wait for a callback.",
      bullets: ["Captures damage type and insurance claim status", "Books inspections into your calendar", "Follows up with homeowners who don't book"],
      chat: {
        visitor: "We had hail last night and I think there's damage to our roof. Do you do inspections?",
        reply: "We do, and they're free. I have openings tomorrow at 9am or 2pm. Will you be filing an insurance claim?",
        lead: "Hail inspection · Aurora",
      },
    },
    seasons: {
      heading: "Visibility that's ready before the storm",
      text: "Adboex prepares storm, replacement and maintenance content ahead of each season so you rank when homeowners start searching.",
      items: [
        { label: "Spring", note: "Hail and wind storms", peak: true },
        { label: "Summer", note: "Replacement season", peak: true },
        { label: "Storm Peak", note: "Insurance restoration", peak: true },
        { label: "Fall", note: "Pre-winter inspections" },
        { label: "Winter", note: "Ice dams and leaks" },
      ],
    },
    faqs: [
      { question: "Is Adboex better than buying roofing leads?", answer: "It's different: instead of paying per shared lead, you build visibility that sends exclusive inquiries to you. Many roofers use both at first, then reduce paid leads as organic calls grow over 60 to 90 days." },
      { question: "Can Adboex help after a storm?", answer: "Yes. Storm-damage pages, timely profile posts and a 24/7 receptionist mean you're visible and responsive when search demand spikes after hail or high winds." },
      { question: "Will it work if I cover 20 or more cities?", answer: "Yes. Adboex creates city pages for each area you serve and tracks your rankings across all of them, so you can see and close gaps town by town." },
      { question: "Does Adboex help with roofing reviews?", answer: "It monitors your reviews, replies with AI-written responses in your voice and keeps your Google profile active with project photos and posts that build trust." },
      { question: "Can I manage it from a job site?", answer: "Yes. The Adboex app lets you check calls, approve posts, track competitors and create promo videos from completed jobs right from your phone." },
    ],
    related: { posts: ["local-seo-checklist-for-service-businesses", "google-business-profile-optimization"], label: "Roofing marketing guides" },
    cta: { heading: "Stop sharing roofing leads with your competitors", text: "Book a free live audit and see how many inspections your own visibility could bring in." },
  },

  /* ------------------------------ REMODELING ------------------------------ */
  {
    slug: "remodeling",
    name: "Remodeling",
    plural: "remodelers",
    serviceType: "Remodeling contractor marketing",
    image: { src: "/images/industries/remodeling.webp", alt: "Newly remodeled modern kitchen with island" },
    hero: {
      pill: "Local SEO + AI visibility for remodelers",
      heading: "Remodeling Contractor Marketing That Books Better Projects",
      highlight: ["Remodeling"],
      text:
        "Adboex automates remodeling contractor marketing so homeowners planning kitchens, baths and additions find your work, trust your reviews and book a consultation, without you managing five tools.",
      score: { value: 84, rank: "#3", rating: "4.9", reviews: "128", calls: "+33%" },
      keywords: ["kitchen remodel near me", "bathroom remodeling", "home renovation contractor", "basement finishing", "home addition", "design build"],
    },
    whoItsFor: {
      heading: "For remodelers who sell quality, not the lowest bid",
      text:
        "Adboex suits kitchen and bath remodelers, design-build firms, basement and addition contractors and whole-home renovation companies. It helps businesses with longer sales cycles stay visible during months of research and turn interest into qualified consultations.",
      list: ["Kitchen and bathroom remodelers", "Design-build firms", "Basement finishing and additions", "Whole-home renovation contractors"],
    },
    definition: {
      term: "What is remodeling contractor marketing?",
      text:
        "Remodeling contractor marketing is how renovation companies attract homeowners who are planning projects. Because homeowners research for weeks, it relies on strong local rankings, project-focused pages, reviews, an active Google profile and quick, helpful replies to inquiries.",
    },
    challenges: {
      heading: "Why great remodelers still struggle to get found",
      intro: "Remodeling buyers research for weeks and compare several contractors before they call.",
      items: [
        { stat: "Weeks", title: "Long research cycles", text: "Homeowners save ideas and compare portfolios for weeks. If you disappear from search, you disappear from the shortlist." },
        { stat: "Projects", title: "Work is hard to show", text: "Beautiful projects buried in a gallery don't rank. Project and service pages need the right structure to be found." },
        { stat: "Budget", title: "Unqualified inquiries", text: "Price shoppers waste estimating time. Clear intake questions filter for real budgets and timelines." },
        { stat: "Reviews", title: "Trust is the product", text: "A remodel lives in someone's home. Recent, detailed reviews often decide who gets the consultation." },
      ],
    },
    geoGrid: {
      heading: "See where homeowners can find your remodeling business",
      text: "Track “kitchen remodel” and “bathroom remodeling” rankings across affluent neighborhoods in your area, then focus pages and posts where the best projects are.",
      city: "Charlotte, NC",
    },
    receptionist: {
      heading: "Max qualifies remodeling inquiries before you drive out",
      text:
        "Max answers calls and chats, asks about project type, rough budget and timeline, and books consultations only when the fit is right, so your estimating time goes to serious homeowners.",
      bullets: ["Asks project scope, budget and timeline", "Books in-home or virtual consultations", "Sends portfolio links to interested homeowners"],
      chat: {
        visitor: "We're thinking about redoing our kitchen next spring. Do you do full remodels?",
        reply: "We do full kitchen remodels, from design to finish. Roughly what budget range and timeline are you considering?",
        lead: "Kitchen remodel consult · Ballantyne",
      },
    },
    seasons: {
      heading: "Stay visible through the planning season",
      text: "Adboex publishes inspiration and planning content when homeowners start dreaming, so you're top of mind when they're ready to hire.",
      items: [
        { label: "New Year", note: "Planning and budgeting", peak: true },
        { label: "Spring", note: "Kitchens and additions", peak: true },
        { label: "Summer", note: "Outdoor living projects" },
        { label: "Fall", note: "Finish before the holidays", peak: true },
        { label: "Winter", note: "Basements and interiors" },
      ],
    },
    faqs: [
      { question: "How does Adboex help remodelers get better leads?", answer: "It attracts homeowners actively searching for remodeling services in your area, builds trust with reviews and posts, and uses the AI receptionist to qualify budget and timeline before booking a consultation." },
      { question: "Can I showcase projects on my site?", answer: "Yes. Adboex helps publish project and service pages structured for search, so each kitchen, bath or addition can rank for the services and neighborhoods it represents." },
      { question: "Do remodelers need AI search visibility?", answer: "Increasingly, yes. Homeowners ask AI assistants for recommended contractors, and those answers draw on reviews, citations and content that Adboex helps strengthen." },
      { question: "Will Adboex post photos of my work?", answer: "Adboex schedules weekly Google Business Profile posts, and you can add project photos from the mobile app or turn them into short promo videos with the AI Video Studio." },
      { question: "Is there a long contract?", answer: "No. There are no setup fees or lock-in contracts and you can cancel anytime. Most remodelers see momentum build over 60 to 90 days." },
    ],
    related: { posts: ["local-seo-checklist-for-service-businesses", "generative-engine-optimization-guide"], label: "Remodeling marketing guides" },
    cta: { heading: "Get on the shortlist for your area's best projects", text: "Book a free live audit of how homeowners find, and miss, your remodeling business." },
  },

  /* ------------------------------ CAR RENTAL ------------------------------ */
  {
    slug: "car-rental",
    name: "Car Rental",
    plural: "car rental companies",
    serviceType: "Car rental marketing",
    image: { src: "/images/industries/car-rental.webp", alt: "Row of clean rental cars ready for pickup" },
    hero: {
      pill: "Local SEO + AI visibility for car rental companies",
      heading: "Car Rental Marketing That Drives Direct Bookings",
      highlight: ["Direct"],
      text:
        "Adboex automates car rental marketing for independent agencies: rank in Maps near airports and hotels, appear in AI travel answers, answer booking questions 24/7 and keep more revenue away from aggregator commissions.",
      score: { value: 86, rank: "#2", rating: "4.7", reviews: "389", calls: "+29%" },
      keywords: ["car rental near me", "airport car rental", "cheap car rental", "suv rental", "van rental", "luxury car rental"],
    },
    whoItsFor: {
      heading: "For independent rental agencies competing with big brands",
      text:
        "Adboex fits independent and franchise car rental locations, exotic and luxury rental fleets, van and truck rental companies and peer-to-peer fleet owners who want direct bookings rather than paying commission to travel sites on every rental.",
      list: ["Airport and downtown rental agencies", "Luxury and exotic car rentals", "Van, truck and SUV rentals", "Long-term and replacement rentals"],
    },
    definition: {
      term: "What is car rental marketing?",
      text:
        "Car rental marketing is how a rental company attracts travelers and locals who need a vehicle. Local search matters because renters search near airports, hotels and neighborhoods. Strong Maps rankings, reviews, fast answers and direct booking paths reduce reliance on commission-based aggregators.",
    },
    challenges: {
      heading: "What's costing rental agencies direct bookings",
      intro: "Renters compare options fast, often on a phone at the airport or the night before a trip.",
      items: [
        { stat: "Commission", title: "Aggregators take a cut", text: "Booking sites charge commission on every rental. Direct visibility keeps that margin in your business." },
        { stat: "Location", title: "Searches are hyper-local", text: "“Car rental near airport” searches reward nearby, well-reviewed listings with accurate hours and pins." },
        { stat: "Questions", title: "Pre-booking questions", text: "Deposits, insurance, mileage and age rules generate calls. Slow answers send renters elsewhere." },
        { stat: "AI travel", title: "AI trip planning", text: "Travelers ask AI assistants to plan trips, including where to rent. Being cited in those answers is new visibility." },
      ],
    },
    geoGrid: {
      heading: "See how you rank near airports, hotels and stations",
      text: "Track “car rental near me” across the places travelers search from, so you know where your listing appears and where big brands take every booking.",
      city: "Orlando, FL",
    },
    receptionist: {
      heading: "Max answers rental questions at any hour",
      text:
        "Max handles the questions that come before every booking, such as deposits, insurance, age requirements and availability, then captures the reservation request or sends the renter your direct booking link.",
      bullets: ["Answers deposit, insurance and mileage questions", "Checks dates and vehicle preferences", "Sends direct booking links instead of aggregators"],
      chat: {
        visitor: "Do you have an SUV available from Friday to Monday? I land at 10pm.",
        reply: "We do have SUVs that weekend, and we offer late pickup for evening flights. Can I take your flight number and name?",
        lead: "SUV rental Fri–Mon · MCO",
      },
    },
    seasons: {
      heading: "Visibility that tracks travel demand",
      text: "Adboex adjusts your content and offers for school breaks, holidays and local events so you're found when demand peaks.",
      items: [
        { label: "Spring Break", note: "Family and student travel", peak: true },
        { label: "Summer", note: "Road trips and vacations", peak: true },
        { label: "Events", note: "Conventions and games" },
        { label: "Fall", note: "Business travel" },
        { label: "Holidays", note: "Family visits", peak: true },
      ],
    },
    faqs: [
      { question: "Can Adboex reduce my reliance on booking sites?", answer: "It helps by growing your direct visibility in Google Maps, search and AI travel answers, and by sending renters your own booking link. The balance between direct and aggregator bookings varies by market." },
      { question: "Does the AI receptionist know my rental policies?", answer: "Yes. You add your deposit, insurance, age, mileage and pickup rules during setup, and Max uses them to answer renters accurately 24/7." },
      { question: "Will Adboex help with airport searches?", answer: "It optimizes your Google profile, location pages and content for airport and neighborhood searches, and tracks your rankings from the places renters search." },
      { question: "Can it manage reviews from renters?", answer: "Yes. Adboex monitors reviews across your profile and writes timely, professional replies, which matters in an industry where renters read reviews closely." },
      { question: "Do you manage ads too?", answer: "On the Rush and Rank plan, Adboex manages Meta and Google Ads alongside your organic visibility, useful for seasonal promotions." },
    ],
    related: { posts: ["google-business-profile-optimization", "generative-engine-optimization-guide"], label: "Rental marketing guides" },
    cta: { heading: "Win more bookings without paying more commission", text: "Book a free live audit of your rental agency's visibility near airports, hotels and AI travel answers." },
  },

  /* ------------------------------ REAL ESTATE ------------------------------ */
  {
    slug: "real-estate",
    name: "Real Estate",
    plural: "real estate agents",
    serviceType: "Real estate local SEO",
    image: { src: "/images/industries/real-estate.webp", alt: "Real estate agent showing a home to buyers" },
    hero: {
      pill: "Local SEO + AI visibility for agents and teams",
      heading: "Real Estate Local SEO That Wins Sellers in Your Neighborhoods",
      highlight: ["Local", "SEO"],
      text:
        "Adboex delivers real estate local SEO for agents and teams: neighborhood pages, an active Google profile, AI search visibility and instant replies to buyer and seller inquiries, all without hiring a marketing assistant.",
      score: { value: 90, rank: "#1", rating: "5.0", reviews: "96", calls: "+63%" },
      keywords: ["realtor near me", "sell my house", "homes for sale", "best real estate agent", "home valuation", "listing agent"],
    },
    whoItsFor: {
      heading: "For agents who want to be the name locals recommend",
      text:
        "Adboex helps solo agents, small teams and boutique brokerages build visibility they own. It suits listing agents focused on specific neighborhoods, relocation specialists and teams who want consistent seller leads without relying only on portal leads.",
      list: ["Listing agents and seller specialists", "Real estate teams and boutique brokerages", "Relocation and new-construction agents", "Luxury and neighborhood specialists"],
    },
    definition: {
      term: "What is real estate local SEO?",
      text:
        "Real estate local SEO is the practice of making an agent or brokerage visible when people search for agents, home values or neighborhoods nearby. It includes neighborhood pages, a strong Google Business Profile, reviews, local citations and content that search engines and AI assistants trust.",
    },
    challenges: {
      heading: "Why agents struggle to own their local market",
      intro: "Sellers choose an agent they've seen, trust and can reach quickly.",
      items: [
        { stat: "Portals", title: "Portals own the traffic", text: "Big listing portals dominate search and resell leads. Your own visibility means relationships you don't pay for twice." },
        { stat: "Hyper-local", title: "Neighborhood expertise", text: "Sellers want someone who knows their street. Neighborhood pages prove it to both buyers and search engines." },
        { stat: "Speed", title: "Inquiries go cold fast", text: "Online leads that wait hours for a reply often choose another agent. Instant response matters." },
        { stat: "AI", title: "AI recommends agents", text: "People now ask AI who the best agent in their area is. Reviews, citations and content shape the answer." },
      ],
    },
    geoGrid: {
      heading: "See where sellers can find you, street by street",
      text: "Track “realtor near me” and “sell my house” across your farm areas to see which neighborhoods know your name and where a neighborhood page could win listings.",
      city: "Austin, TX",
    },
    receptionist: {
      heading: "Max responds to buyers and sellers in seconds",
      text:
        "Max answers calls and website chats 24/7, asks whether the person is buying or selling, their timeline and area, and books a valuation or showing call, so every lead hears back while they're still interested.",
      bullets: ["Separates buyers, sellers and renters", "Books home valuations and consultations", "Sends leads to your phone instantly"],
      chat: {
        visitor: "I'm thinking about selling my house in Mueller this year. What could it be worth?",
        reply: "Great area. I can set up a free valuation with our agent. When are you hoping to sell, and is it a single-family home?",
        lead: "Seller valuation · Mueller",
      },
    },
    seasons: {
      heading: "Visibility that matches the market cycle",
      text: "Adboex publishes seller guides, market updates and neighborhood content ahead of each season so you're the agent people remember.",
      items: [
        { label: "Winter", note: "Pre-listing preparation" },
        { label: "Spring Peak", note: "Listing season", peak: true },
        { label: "Summer", note: "Relocations and families", peak: true },
        { label: "Fall", note: "Second listing wave" },
        { label: "Year-end", note: "Market reports" },
      ],
    },
    faqs: [
      { question: "How is Adboex different from buying portal leads?", answer: "Portal leads are rented and often shared. Adboex builds your own visibility in Google, Maps and AI answers so inquiries come directly to you, and it answers them instantly." },
      { question: "Can Adboex create neighborhood pages?", answer: "Yes. On WordPress sites Adboex writes and publishes neighborhood and service pages that show local expertise and help you rank for area-specific searches." },
      { question: "Does it work with my brokerage website?", answer: "If your site runs on WordPress, the plugin can optimize and publish pages directly. For other brokerage platforms, Adboex still manages your Google profile, reviews, AI visibility and inquiries." },
      { question: "Will it reply to my reviews?", answer: "Yes. Adboex monitors new reviews and drafts thoughtful replies in your voice, which you can approve or let post automatically." },
      { question: "Can my whole team use it?", answer: "Yes. Teams can manage multiple agents' visibility, and the Rush and Rank plan supports multi-location brokerages from one dashboard." },
    ],
    related: { posts: ["generative-engine-optimization-guide", "google-business-profile-optimization"], label: "Real estate marketing guides" },
    cta: { heading: "Become the agent your neighborhood recommends", text: "Book a free live audit of your visibility in search, Maps and AI answers." },
  },

  /* ------------------------------ CHARTER RENTALS ------------------------------ */
  {
    slug: "charter-rentals",
    name: "Charter Rental",
    plural: "charter companies",
    serviceType: "Charter rental marketing",
    image: { src: "/images/industries/charter-rentals.webp", alt: "Charter yacht anchored in clear blue water" },
    hero: {
      pill: "Local SEO + AI visibility for charter companies",
      heading: "Charter Rental Marketing That Fills Your Calendar",
      highlight: ["Charter"],
      text:
        "Adboex automates charter rental marketing for boat, yacht, fishing, party bus and private jet operators, so travelers and event planners find you, trust your reviews and book directly instead of through commission platforms.",
      score: { value: 88, rank: "#2", rating: "4.9", reviews: "241", calls: "+36%" },
      keywords: ["boat charter near me", "yacht rental", "fishing charter", "party bus rental", "private charter", "sunset cruise"],
    },
    whoItsFor: {
      heading: "For charter operators who sell experiences",
      text:
        "Adboex is built for yacht and boat charters, fishing guides, sightseeing and sunset cruises, party bus and limo companies and private aviation charters. It suits owner-operators who captain the trip and still need someone to answer the booking inquiries.",
      list: ["Yacht and boat charters", "Fishing and sightseeing tours", "Party bus and limo charters", "Private and group air charters"],
    },
    definition: {
      term: "What is charter rental marketing?",
      text:
        "Charter rental marketing is how charter operators attract people planning trips, celebrations and corporate events. It blends local search visibility, strong reviews and photos, seasonal content and fast answers about availability, capacity and pricing so inquiries become confirmed bookings.",
    },
    challenges: {
      heading: "Where charter bookings slip away",
      intro: "Charter customers plan around dates, group size and budget, and they book whoever gives clear answers first.",
      items: [
        { stat: "Platforms", title: "Booking site fees", text: "Marketplaces charge high fees per booking. Direct visibility protects your margin on every trip." },
        { stat: "Questions", title: "Lots of pre-trip questions", text: "Capacity, catering, weather policy and deposits create back-and-forth that eats your day." },
        { stat: "Photos", title: "Visuals sell the trip", text: "An outdated profile with old photos loses to operators posting fresh trips every week." },
        { stat: "Travelers", title: "Visitors don't know you", text: "Tourists search on arrival or ask AI. Without strong local signals, they never see your name." },
      ],
    },
    geoGrid: {
      heading: "See how visible you are to visitors and locals",
      text: "Track “boat charter near me” and “sunset cruise” from hotels, marinas and downtown so you know where travelers can find you during their stay.",
      city: "Miami, FL",
    },
    receptionist: {
      heading: "Max handles inquiries while you're on the water",
      text:
        "You can't answer the phone mid-trip. Max responds to calls and chats instantly with availability, capacity and pricing details, captures the date and group size, and sends booking links or holds the slot for you.",
      bullets: ["Answers capacity, catering and weather questions", "Captures date, group size and occasion", "Sends direct booking and deposit links"],
      chat: {
        visitor: "Can we book a boat for 10 people for a birthday on Saturday afternoon?",
        reply: "Happy birthday in advance! Our 45-foot yacht fits 12 and is free Saturday from 2 to 6pm. Shall I hold it for you?",
        lead: "Birthday charter, 10 guests · Saturday",
      },
    },
    seasons: {
      heading: "Ready for every booking season",
      text: "Adboex promotes the right trips at the right time, from spring break to holiday parties, so your calendar fills early.",
      items: [
        { label: "Spring Break", note: "Group trips", peak: true },
        { label: "Summer Peak", note: "Vacation charters", peak: true },
        { label: "Weddings", note: "Events and celebrations" },
        { label: "Fall", note: "Fishing and corporate" },
        { label: "Holidays", note: "Parties and private events", peak: true },
      ],
    },
    faqs: [
      { question: "Can Adboex help me get more direct charter bookings?", answer: "Yes. It grows your visibility in Google, Maps and AI travel answers and points customers to your own booking process, which reduces reliance on fee-based marketplaces over time." },
      { question: "Does the AI receptionist understand charter details?", answer: "You set up your vessels or vehicles, capacity, pricing, deposits and weather policy, and Max uses that information to answer questions and capture booking requests 24/7." },
      { question: "Can I post trip photos easily?", answer: "Yes. Upload photos from the Adboex app to your Google profile, or turn them into short promo videos with voiceover in the AI Video Studio." },
      { question: "Does it work for party buses and limos?", answer: "Yes. The same system works for ground charters, with content and pages focused on events like weddings, proms, concerts and corporate outings." },
      { question: "How quickly can I see results?", answer: "Profile activity and faster inquiry responses help immediately. Ranking and booking growth usually build over 60 to 90 days, so starting before your peak season helps." },
    ],
    related: { posts: ["google-business-profile-optimization", "ai-receptionist-for-small-business"], label: "Charter marketing guides" },
    cta: { heading: "Fill your charter calendar before peak season", text: "Book a free live audit of how travelers and locals find your charter business." },
  },

  /* ------------------------------ CARPET DYEING ------------------------------ */
  {
    slug: "carpet-dyeing",
    name: "Carpet Dyeing",
    plural: "carpet dyeing businesses",
    serviceType: "Carpet dyeing marketing",
    image: { src: "/images/industries/carpet-dyeing.webp", alt: "Technician restoring color to a stained carpet" },
    hero: {
      pill: "Local SEO + AI visibility for carpet dyeing",
      heading: "Carpet Dyeing Marketing That Books More Color Repairs",
      highlight: ["Carpet", "Dyeing"],
      text:
        "Adboex automates carpet dyeing marketing so property managers and homeowners searching for bleach-spot repair, color restoration and carpet re-dyeing find you, see your before-and-after results and book an estimate.",
      score: { value: 91, rank: "#1", rating: "4.9", reviews: "88", calls: "+47%" },
      keywords: ["carpet dyeing near me", "bleach spot repair", "carpet color restoration", "carpet re-dye", "apartment carpet repair", "carpet stain repair"],
    },
    whoItsFor: {
      heading: "For specialists in a niche customers don't know exists",
      text:
        "Adboex fits carpet dyeing and color repair specialists, carpet cleaners adding dyeing as an upsell, and restoration companies serving apartments, hotels and rental properties where replacing carpet is far more expensive than restoring it.",
      list: ["Carpet dyeing and color repair specialists", "Carpet cleaners offering dye services", "Apartment turnover and property services", "Hotel and commercial carpet restoration"],
    },
    definition: {
      term: "What is carpet dyeing marketing?",
      text:
        "Carpet dyeing marketing helps color repair specialists reach people who don't yet know carpet can be restored instead of replaced. It relies on explaining the service clearly, ranking for problem-based searches like bleach spots, showing before-and-after proof and targeting property managers.",
    },
    challenges: {
      heading: "Why carpet dyeing businesses are hard to find",
      intro: "Most customers search for the problem, not the solution, so visibility has to meet them there.",
      items: [
        { stat: "Awareness", title: "Customers search the problem", text: "People search “bleach stain on carpet” rather than “carpet dyeing”. Your pages must answer those questions." },
        { stat: "B2B", title: "Property managers buy repeatedly", text: "Apartment and hotel managers can send steady work, but only if they find and trust you." },
        { stat: "Proof", title: "Results must be seen", text: "Before-and-after photos convince skeptics. Without them, customers assume replacement is the only option." },
        { stat: "Small niche", title: "Fewer searches, higher stakes", text: "In a niche, every search counts. Ranking first across your whole area matters more than in big markets." },
      ],
    },
    geoGrid: {
      heading: "See where you rank for color repair searches",
      text: "Track “carpet dyeing” and “bleach spot repair” across apartment-dense areas of your city to find the neighborhoods where property managers can't yet find you.",
      city: "Las Vegas, NV",
    },
    receptionist: {
      heading: "Max explains your service and books estimates",
      text:
        "Many callers aren't sure whether their carpet can be fixed. Max explains how color restoration works, asks for photos, size and carpet type, and books an estimate, so curious callers become customers.",
      bullets: ["Explains dyeing vs. replacement costs", "Requests photos of stains and spots", "Books residential and property-manager estimates"],
      chat: {
        visitor: "I spilled bleach on my beige carpet and now there's a white spot. Can that be fixed?",
        reply: "Usually, yes. We can re-dye the spot to match your carpet. Could you send a photo so we can confirm and book a visit?",
        lead: "Bleach spot repair · Henderson",
      },
    },
    seasons: {
      heading: "Visibility for move-outs, holidays and turnovers",
      text: "Adboex targets the moments carpet damage peaks, such as summer move-outs and holiday spills, with timely posts and pages.",
      items: [
        { label: "Spring", note: "Spring cleaning repairs" },
        { label: "Summer Peak", note: "Apartment move-outs", peak: true },
        { label: "Back to School", note: "Student rental turnovers", peak: true },
        { label: "Fall", note: "Pre-holiday refresh" },
        { label: "Holidays", note: "Spills and stains" },
      ],
    },
    faqs: [
      { question: "Can Adboex help a niche service like carpet dyeing?", answer: "Yes. Niche services benefit greatly from ranking for problem-based searches and explaining the service clearly. Adboex builds pages and posts around the questions customers actually search." },
      { question: "Can I reach property managers?", answer: "Adboex can publish pages aimed at apartment communities, hotels and property managers, and tracks your visibility for commercial carpet repair searches in your area." },
      { question: "How do I show before-and-after results?", answer: "Upload photos from the Adboex app to your Google profile and website, or turn them into short promo videos with voiceover in the AI Video Studio." },
      { question: "Will the AI receptionist know my pricing?", answer: "You add your service details and price ranges during setup, so Max can give general guidance and book an estimate for an exact quote." },
      { question: "Does Adboex replace my carpet cleaning marketing?", answer: "It can cover both. If you offer cleaning and dyeing, Adboex creates pages and posts for each service so you rank for both types of searches." },
    ],
    related: { posts: ["local-seo-checklist-for-service-businesses", "google-business-profile-optimization"], label: "Niche service marketing guides" },
    cta: { heading: "Get found by everyone who thinks their carpet is ruined", text: "Book a free live audit and see which color repair searches you could win." },
  },

  /* ------------------------------ AUTO REPAIR ------------------------------ */
  {
    slug: "auto-repair",
    name: "Auto Repair",
    plural: "auto repair shops",
    serviceType: "Auto repair shop SEO",
    image: { src: "/images/industries/auto-repair.webp", alt: "Mechanic inspecting a car engine in a repair shop" },
    hero: {
      pill: "Local SEO + AI visibility for auto shops",
      heading: "Auto Repair Shop SEO That Keeps Your Bays Full",
      highlight: ["SEO"],
      text:
        "Adboex automates auto repair shop SEO so drivers searching for brakes, diagnostics and oil changes find your shop first, trust your reviews and book service, while Max answers calls you can't get to from the bay.",
      score: { value: 90, rank: "#1", rating: "4.8", reviews: "276", calls: "+31%" },
      keywords: ["auto repair near me", "mechanic near me", "brake repair", "check engine light", "oil change", "transmission repair"],
    },
    whoItsFor: {
      heading: "For independent shops competing with dealers and chains",
      text:
        "Adboex fits independent auto repair shops, specialty shops for European, diesel or performance vehicles, tire and brake centers and mobile mechanics. It helps owner-run shops show the trust and convenience that drivers expect from big chains.",
      list: ["Independent general repair shops", "European, diesel and specialty shops", "Tire, brake and alignment centers", "Mobile mechanics"],
    },
    definition: {
      term: "What is auto repair shop SEO?",
      text:
        "Auto repair shop SEO is the practice of making a repair shop appear when nearby drivers search for car service. It combines a strong Google Business Profile, service-specific pages, plenty of recent reviews and fast responses, because drivers usually choose a shop that is close, trusted and available.",
    },
    challenges: {
      heading: "Why good shops lose customers to chains",
      intro: "Drivers pick shops on proximity, reviews and how easy it is to book.",
      items: [
        { stat: "Trust", title: "Fear of being overcharged", text: "Drivers worry about honesty. Many detailed reviews and quick, polite replies ease that fear." },
        { stat: "Phones", title: "Calls missed in the bay", text: "Technicians can't answer while under a car. Missed calls become appointments at another shop." },
        { stat: "Services", title: "Specific symptom searches", text: "People search “grinding brakes” or “check engine light”. Service pages need to match those searches." },
        { stat: "Chains", title: "Big brands dominate", text: "Chains have big ad budgets. Strong local signals let independent shops outrank them nearby." },
      ],
    },
    geoGrid: {
      heading: "See how your shop ranks around town",
      text: "Track “auto repair near me” and “brake repair” across your area to see where drivers find you and where dealers and chains get the call instead.",
      city: "Columbus, OH",
    },
    receptionist: {
      heading: "Max books appointments while your techs keep working",
      text:
        "Max answers calls and chats, asks about the vehicle and symptoms, explains your services and books an appointment or drop-off, so your team can stay focused on the cars in the bays.",
      bullets: ["Captures vehicle make, model and symptoms", "Books drop-offs and diagnostics", "Answers hours, warranty and pricing questions"],
      chat: {
        visitor: "My brakes are grinding when I stop. Can you look at my 2016 Honda Civic this week?",
        reply: "We can. Grinding usually means worn pads. I have a drop-off slot tomorrow at 8am or Thursday at noon. Which works?",
        lead: "Brake inspection, 2016 Civic · Thursday",
      },
    },
    seasons: {
      heading: "Visibility for every season on the road",
      text: "Adboex promotes the right services at the right time, from summer A/C checks to winter battery and tire service.",
      items: [
        { label: "Spring", note: "Alignment and tire swaps" },
        { label: "Summer", note: "A/C repair and road trips", peak: true },
        { label: "Back to School", note: "Safety inspections" },
        { label: "Fall", note: "Brakes and batteries" },
        { label: "Winter Peak", note: "Batteries, tires, no-starts", peak: true },
      ],
    },
    faqs: [
      { question: "How does Adboex help my auto shop get more customers?", answer: "It improves your Google Maps ranking, publishes service pages for the repairs drivers search for, keeps your profile active, replies to reviews and answers every call, all of which help drivers choose your shop." },
      { question: "Can it answer calls while my techs are busy?", answer: "Yes. Max answers calls and chats 24/7, collects vehicle and symptom details and books appointments, so phones don't interrupt work in the bays." },
      { question: "Do reviews really matter for auto repair?", answer: "Very much. Drivers rely on reviews to judge honesty and quality. Adboex monitors reviews and replies quickly and professionally to every one." },
      { question: "Can I compete with dealerships and chains?", answer: "Yes. Strong local signals such as proximity, reviews, accurate details and relevant pages often let independent shops outrank larger brands in nearby searches." },
      { question: "Is there a contract?", answer: "No. Adboex has no setup fees and no lock-in contracts. Cancel anytime. Rankings and call growth usually build over 60 to 90 days." },
    ],
    related: { posts: ["google-business-profile-optimization", "ai-receptionist-for-small-business"], label: "Auto shop marketing guides" },
    cta: { heading: "Keep every bay busy with drivers who chose you", text: "Book a free live audit of your shop's visibility in Maps, search and AI answers." },
  },

  /* ------------------------------ EXCAVATION ------------------------------ */
  {
    slug: "excavation",
    name: "Excavation",
    plural: "excavation contractors",
    serviceType: "Excavation contractor marketing",
    image: { src: "/images/industries/excavation.webp", alt: "Excavator digging a foundation on a construction site" },
    hero: {
      pill: "Local SEO + AI visibility for excavation contractors",
      heading: "Excavation Contractor Marketing That Wins Bigger Bids",
      highlight: ["Excavation"],
      text:
        "Adboex automates excavation contractor marketing so builders, developers and landowners searching for site prep, grading, trenching and land clearing find your company, see your capability and request a bid.",
      score: { value: 85, rank: "#2", rating: "4.9", reviews: "64", calls: "+44%" },
      keywords: ["excavation contractor near me", "site preparation", "land clearing", "grading contractor", "trenching services", "septic excavation"],
    },
    whoItsFor: {
      heading: "For excavation companies working residential and commercial jobs",
      text:
        "Adboex fits excavation and site work contractors, grading and land clearing companies, septic and utility trenching specialists and demolition firms. It helps companies that win work through builders and developers as well as homeowners planning pools, driveways or new builds.",
      list: ["Site preparation and grading", "Land clearing and demolition", "Utility, septic and drainage trenching", "Pool, foundation and driveway excavation"],
    },
    definition: {
      term: "What is excavation contractor marketing?",
      text:
        "Excavation contractor marketing is how earthmoving companies attract homeowners, builders and developers who need site work. It relies on clear service pages, project photos, strong local rankings across a wide service area, reviews and quick responses to bid requests.",
    },
    challenges: {
      heading: "Why excavation companies miss out on work",
      intro: "Excavation buyers range from homeowners to developers, and each searches differently.",
      items: [
        { stat: "Two buyers", title: "Homeowners and builders", text: "Residential and commercial clients use different words. You need pages and content for both." },
        { stat: "Wide area", title: "Large service radius", text: "Excavators travel far. Ranking only near the yard leaves most of your territory to competitors." },
        { stat: "Capability", title: "Equipment builds trust", text: "Buyers want proof you can handle the job. Project photos and equipment details win bids." },
        { stat: "Bids", title: "Slow responses lose bids", text: "Builders send requests to several contractors. The first clear reply often gets the work." },
      ],
    },
    geoGrid: {
      heading: "See your visibility across your whole territory",
      text: "Track “excavation contractor” and “land clearing” across the counties you serve, so you know where builders and landowners can find you and where to expand.",
      city: "Nashville, TN",
    },
    receptionist: {
      heading: "Max captures bid requests while you're in the cab",
      text:
        "Max answers calls and chats, gathers project type, location, acreage and timeline, requests plans or photos and books a site visit, so bid requests are organized and nothing gets lost while you're operating equipment.",
      bullets: ["Captures project scope, site location and timeline", "Requests plans, surveys and photos", "Books site visits and estimate calls"],
      chat: {
        visitor: "We need about two acres cleared and graded for a new home build next month. Do you do that?",
        reply: "We do land clearing and grading. Could you share the address and any survey or site plan? I can book a site visit this week.",
        lead: "2-acre clearing + grading · Franklin",
      },
    },
    seasons: {
      heading: "Visibility that matches the building season",
      text: "Adboex promotes the right services ahead of each season, so builders and landowners find you when they're planning work.",
      items: [
        { label: "Late Winter", note: "Spring project planning" },
        { label: "Spring Peak", note: "Site prep and foundations", peak: true },
        { label: "Summer Peak", note: "Pools and driveways", peak: true },
        { label: "Fall", note: "Drainage and land clearing" },
        { label: "Winter", note: "Demolition and planning" },
      ],
    },
    faqs: [
      { question: "Can Adboex help me reach builders and developers?", answer: "Yes. Adboex creates pages and content for commercial site work as well as residential projects, and tracks rankings for the terms builders and developers search." },
      { question: "My service area covers several counties. Will that work?", answer: "Yes. Adboex publishes county and city pages for the areas you serve and tracks your rankings across all of them with geo-grid reports." },
      { question: "How do I show my equipment and past projects?", answer: "Upload project photos from the Adboex app to your Google profile and website, or turn them into short promo videos that show your crew and equipment at work." },
      { question: "Can the AI receptionist collect bid details?", answer: "Yes. Max asks for project type, location, size and timeline, requests plans or photos and books site visits, so every bid request arrives organized." },
      { question: "How long until I see more inquiries?", answer: "Profile and website improvements start right away. Ranking and inquiry growth typically build over 60 to 90 days, depending on competition in your area." },
    ],
    related: { posts: ["local-seo-checklist-for-service-businesses", "generative-engine-optimization-guide"], label: "Contractor marketing guides" },
    cta: { heading: "Win the bids that go to whoever answers first", text: "Book a free live audit of your excavation company's visibility across your territory." },
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

/** Replace "{name}" tokens in shared template text. */
export const fill = (text: string, name: string) => text.replaceAll("{name}", name);
