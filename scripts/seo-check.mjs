/**
 * SEO CHECK — run with `npm run seo:check` (builds first) or
 * `npm run seo:report` (uses the last build).
 *
 * Reads every pre-rendered page in .next/server/app and verifies:
 *   ✔ exactly one <h1>
 *   ✔ title 50–60 characters and unique
 *   ✔ meta description 140–160 characters and unique
 *   ✔ absolute canonical URL with trailing slash
 *   ✔ og:image present
 *   ✔ every <img> has an alt attribute
 *   ✔ all JSON-LD blocks are valid JSON
 *   ✔ no broken internal links
 *   ✔ sitemap.xml lists every indexable page (and nothing that 404s)
 *   ✔ robots.txt, llms.txt and rss.xml exist; robots blocks /api/
 *   ✔ primary keywords are unique (no cannibalisation)
 *   ⚠ primary keyword appears in the H1 (warning only)
 *
 * Errors fail the command (exit code 1) — the GitHub check workflow uses this.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP = path.join(ROOT, ".next", "server", "app");
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

if (!fs.existsSync(APP)) {
  console.error("No build found. Run `npm run seo:check` (it builds first).");
  process.exit(1);
}

/* ---------- site URL from content/site.ts ---------- */
const siteTs = fs.readFileSync(path.join(ROOT, "content", "site.ts"), "utf8");
const SITE_URL = (siteTs.match(/export const SITE_URL = "([^"]+)"/) || [])[1];
if (!SITE_URL) err("Could not read SITE_URL from content/site.ts");

/* ---------- collect pages ---------- */
const pages = {};
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) {
      let route = "/" + path.relative(APP, p).split(path.sep).join("/").replace(/\.html$/, "").replace(/(^|\/)index$/, "");
      if (route.includes("_not-found") || route === "/404" || route === "/500") continue;
      if (!route.endsWith("/")) route += "/";
      pages[route] = fs.readFileSync(p, "utf8");
    }
  }
})(APP);

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const textOf = (html) => decode(html.replace(/<[^>]+>/g, " ").replace(/ |&nbsp;/g, " ").replace(/\s+/g, " ").trim());

/* ---------- primary keywords (seo.ts + post frontmatter) ---------- */
const seoTs = fs.readFileSync(path.join(ROOT, "content", "seo.ts"), "utf8");
const keywordByPath = {};
for (const m of seoTs.matchAll(/path:\s*"([^"]+)"[\s\S]*?primaryKeyword:\s*"([^"]+)"/g)) keywordByPath[m[1]] = m[2];
const postsDir = path.join(ROOT, "content", "posts");
for (const f of fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))) {
  const raw = fs.readFileSync(path.join(postsDir, f), "utf8");
  const slug = (raw.match(/^slug:\s*"?([^"\n]+)"?/m) || [])[1] || f.replace(/\.mdx$/, "");
  const kw = (raw.match(/^keywords:\s*(\[.*\])/m) || [])[1];
  if (kw) keywordByPath[`/insights/${slug}/`] = JSON.parse(kw)[0];
}
const seen = {};
for (const [p, kw] of Object.entries(keywordByPath)) {
  const k = kw.toLowerCase();
  if (seen[k]) err(`Duplicate primary keyword "${kw}" on ${seen[k]} and ${p}`);
  seen[k] = p;
}

/* ---------- per-page checks ---------- */
const titles = {};
const descriptions = {};
const links = [];
let indexable = [];

for (const [route, html] of Object.entries(pages)) {
  const body = html.replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/g, "");
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (!noindex) indexable.push(route);

  const h1s = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) err(`${route}: has ${h1s.length} <h1> tags (must be exactly 1)`);

  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  if (!title) err(`${route}: missing <title>`);
  else if (title.length < 50 || title.length > 60) err(`${route}: title is ${title.length} chars (50–60): "${title}"`);
  (titles[title] ||= []).push(route);

  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  if (!desc) err(`${route}: missing meta description`);
  else if (desc.length < 140 || desc.length > 160) err(`${route}: description is ${desc.length} chars (140–160)`);
  (descriptions[desc] ||= []).push(route);

  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (!canonical) err(`${route}: missing canonical`);
  else if (!canonical.startsWith(SITE_URL) || !canonical.endsWith("/")) err(`${route}: canonical "${canonical}" must be absolute (${SITE_URL}) with a trailing slash`);
  else if (!noindex && canonical !== SITE_URL + route) warn(`${route}: canonical points elsewhere (${canonical})`);

  if (!/<meta property="og:image"/.test(html)) err(`${route}: missing og:image`);

  const noAlt = [...body.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\balt=/.test(m[0])).length;
  if (noAlt) err(`${route}: ${noAlt} <img> without alt attribute`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      err(`${route}: invalid JSON-LD block`);
    }
  }

  for (const m of body.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g)) links.push([m[1], route]);

  const kw = keywordByPath[route];
  if (kw && h1s[0] && !textOf(h1s[0][1]).toLowerCase().includes(kw.toLowerCase()))
    warn(`${route}: H1 doesn't contain the primary keyword "${kw}"`);
}

for (const [t, r] of Object.entries(titles)) if (t && r.length > 1) err(`Duplicate title "${t}" on ${r.join(", ")}`);
for (const [d, r] of Object.entries(descriptions)) if (d && r.length > 1) err(`Duplicate description on ${r.join(", ")}`);

/* ---------- internal links ---------- */
const known = new Set(Object.keys(pages));
const staticFiles = (p) => /^\/(_next|images|api)\//.test(p) || /\.(png|jpe?g|webp|svg|ico|xml|txt|webmanifest|pdf)$/.test(p);
const broken = {};
for (const [href, from] of links) {
  if (staticFiles(href)) {
    if (href.startsWith("/images/") && !fs.existsSync(path.join(ROOT, "public", href))) (broken[href] ||= new Set()).add(from);
    continue;
  }
  if (!known.has(href)) (broken[href] ||= new Set()).add(from);
}
for (const [href, from] of Object.entries(broken)) err(`Broken link ${href} (on ${[...from].slice(0, 3).join(", ")})`);

/* ---------- sitemap / robots / llms / rss ---------- */
const readBody = (name) => {
  const f = path.join(APP, `${name}.body`);
  return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
};
const sitemap = readBody("sitemap.xml");
if (!sitemap) err("sitemap.xml was not generated");
else {
  const urls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE_URL, "")));
  for (const r of indexable) if (!urls.has(r)) err(`Sitemap is missing ${r}`);
  for (const u of urls) if (!known.has(u)) err(`Sitemap lists ${u}, which is not a page`);
}
const robots = readBody("robots.txt");
if (!robots) err("robots.txt was not generated");
else {
  if (!/Disallow: \/api\//.test(robots)) err("robots.txt must disallow /api/");
  if (!/Sitemap: /.test(robots)) err("robots.txt must point to the sitemap");
}
if (!readBody("llms.txt")) err("llms.txt was not generated");
if (!readBody("rss.xml")) err("rss.xml was not generated");

/* ---------- report ---------- */
console.log(`\nSEO check — ${Object.keys(pages).length} pages, ${indexable.length} indexable\n`);
for (const w of warnings) console.log("  ⚠ " + w);
for (const e of errors) console.log("  ✖ " + e);
if (errors.length) {
  console.log(`\n✖ ${errors.length} error(s), ${warnings.length} warning(s). Fix the errors above.\n`);
  process.exit(1);
}
console.log(`\n✔ All checks passed (${warnings.length} warning(s)).\n`);
