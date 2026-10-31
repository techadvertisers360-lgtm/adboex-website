/**
 * Creates placeholder images (same aspect ratios as the reference design)
 * for every image the site uses. It NEVER overwrites an existing file —
 * upload your real image with the same name and it simply takes over.
 *
 *   npm run placeholders
 */
import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = join(process.cwd(), "public", "images");

const raster = []; // [path, width, height, label]
const vector = []; // [path, svgString]

/* ---------- Home: dashboard screenshot marquee (square, 400×400 shown) ---------- */
for (let i = 1; i <= 10; i++) raster.push([`marquee/owner-${String(i).padStart(2, "0")}.webp`, 800, 800, `Dashboard ${i}`]);

/* ---------- Services tabs (608×487 shown) ---------- */
for (const n of ["ai-search-visibility", "website-optimization", "google-business-profile"]) raster.push([`services/${n}.webp`, 1216, 974, n]);

/* ---------- Feature bento cards ---------- */
for (const n of ["website-optimization-engine", "local-profile-engine", "ai-visibility-intelligence", "ai-receptionist", "mobile-app"])
  raster.push([`features/${n}.webp`, 1200, 720, n]);

/* ---------- People (square avatars) ---------- */
for (let i = 1; i <= 3; i++) raster.push([`testimonials/client-${String(i).padStart(2, "0")}.webp`, 280, 280, `Client ${i}`]);
for (let i = 1; i <= 3; i++) raster.push([`testimonials/client-${String(i).padStart(2, "0")}-photo.webp`, 1216, 1000, `Client ${i} photo`]);
for (let i = 1; i <= 4; i++) raster.push([`testimonials/avatar-${String(i).padStart(2, "0")}.webp`, 160, 160, `A${i}`]);

/* ---------- Platform page ---------- */
for (const n of ["gmb-automation", "performance-reporting", "pr-email", "geo", "web-autopilot", "competitor-analysis", "ai-human"])
  raster.push([`platform/${n}.webp`, 1216, 974, n]);
raster.push(["platform/max-phone.webp", 760, 1080, "Max mobile app"]);

/* ---------- Industry cards (16:10) ---------- */
for (const n of ["hvac", "plumbing", "roofing", "remodeling", "car-rental", "real-estate", "charter-rentals", "carpet-dyeing", "auto-repair", "excavation"])
  raster.push([`industries/${n}.webp`, 1200, 750, n]);

/* ---------- Blog post covers (1200×1000) + case study client photos (820×920) ---------- */
for (const n of ["local-seo-checklist-for-service-businesses", "generative-engine-optimization-guide", "google-business-profile-optimization", "ai-receptionist-for-small-business",
  "marketing-data-guide", "ai-email-marketing", "emotional-advertising-for-small-business", "predictive-analytics-marketing"])
  raster.push([`blog/cover-${n}.webp`, 1200, 1000, n]);
for (let i = 1; i <= 12; i++) raster.push([`case-studies/client-${String(i).padStart(2, "0")}.webp`, 820, 920, `Client ${i}`]);

/* ---------- About / careers / team ---------- */
raster.push(["about/mission.webp", 1216, 974, "Mission"]);
raster.push(["about/hero.webp", 1600, 820, "About"]);
raster.push(["about/experts.webp", 832, 624, "Experts"]);
raster.push(["careers/hero.webp", 1600, 760, "Careers"]);
for (let i = 1; i <= 4; i++) raster.push([`careers/team-0${i}.webp`, 900, 900, `Team photo ${i}`]);
raster.push(["team/author-adboex.webp", 200, 200, "Author"]);


/* ---------- Press logos ("As seen on") — coloured so the grayscale hover shows ---------- */
const pressColors = ["#3B82F6", "#F97316", "#22C55E", "#E11D48", "#A855F7", "#0EA5E9", "#EAB308"];
pressColors.forEach((c, i) =>
  vector.push([`press/press-${String(i + 1).padStart(2, "0")}.svg`, wordmark(`Press Logo ${i + 1}`, 180, 40, c)])
);

/* ---------- Technology logos (19) ---------- */
const tech = [
  "OpenAI", "Gemini", "Perplexity", "Claude", "Llama", "Google Cloud", "AWS", "Azure", "NVIDIA", "Hugging Face",
  "LangChain", "LlamaIndex", "PyTorch", "TensorFlow", "Python", "WordPress", "Search Console", "Business Profile", "Twilio",
];
tech.forEach((t, i) => vector.push([`tech-logos/tech-${String(i + 1).padStart(2, "0")}.svg`, wordmark(t, 160, 40, "#FFFFFF")]));

/* ---------- App store badges ---------- */
vector.push(["badges/app-store.svg", badge("Download on the", "App Store")]);
vector.push(["badges/google-play.svg", badge("GET IT ON", "Google Play")]);

/* ======================================================================== */

function wordmark(text, w, h, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect x="1" y="7" width="26" height="26" rx="7" fill="${color}" opacity=".9"/><text x="36" y="27" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="-.3">${text}</text></svg>`;
}

function badge(small, big) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="46" viewBox="0 0 150 46"><rect x=".5" y=".5" width="149" height="45" rx="9" fill="#000" stroke="#A6A6A6"/><circle cx="24" cy="23" r="10" fill="#fff"/><text x="42" y="18" fill="#fff" font-family="Arial, sans-serif" font-size="9">${small}</text><text x="42" y="34" fill="#fff" font-family="Arial, sans-serif" font-size="16" font-weight="700">${big}</text></svg>`;
}

function placeholderSvg(w, h, label) {
  const fs = Math.max(14, Math.round(Math.min(w, h) / 14));
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <radialGradient id="g" cx="30%" cy="20%" r="90%"><stop offset="0" stop-color="#16263f"/><stop offset=".5" stop-color="#1b1b1b"/><stop offset="1" stop-color="#14203a"/></radialGradient>
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity=".05"/></pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#p)"/>
  <text x="50%" y="48%" text-anchor="middle" fill="#4089F0" font-family="Arial, sans-serif" font-size="${fs}" font-weight="700">${label}</text>
  <text x="50%" y="${48 + 8}%" text-anchor="middle" fill="#8f8f8f" font-family="Arial, sans-serif" font-size="${Math.round(fs * 0.6)}">${w}×${h} · replace me</text>
</svg>`);
}

let made = 0;
for (const [rel, w, h, label] of raster) {
  const out = join(ROOT, rel);
  if (existsSync(out)) continue;
  mkdirSync(dirname(out), { recursive: true });
  await sharp(placeholderSvg(w, h, label)).webp({ quality: 70 }).toFile(out);
  made++;
}
for (const [rel, svg] of vector) {
  const out = join(ROOT, rel);
  if (existsSync(out)) continue;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg);
  made++;
}
console.log(`Placeholders: created ${made}, kept ${raster.length + vector.length - made} existing.`);
