/**
 * TEMPORARY DEMO IMAGES — downloads free placeholder photos/logos from the web
 * and replaces the grey "replace me" images so the site looks finished.
 *
 *   npm run demo-images            (only replaces grey placeholders)
 *   npm run demo-images -- --force (re-download everything in the list)
 *
 * Sources (free to use as placeholders — replace with your own before launch):
 *   - images.unsplash.com → free photos under the Unsplash licence (topic-matched)
 *   - i.pravatar.cc    → placeholder portrait photos
 *   - cdn.simpleicons.org → technology logos (white SVG)
 * A file you uploaded yourself is never touched unless you pass --force.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = join(process.cwd(), "public", "images");
const FORCE = process.argv.includes("--force");
/** keyword photo: resolved through Openverse at download time (see photoUrl) */
const flickr = (w, h, tags, lock) => `openverse:${tags}:${lock}:${w}x${h}`;
const avatar = (n, size = 600) => `https://i.pravatar.cc/${size}?img=${n}`;

/** Unsplash photo (free Unsplash licence), cropped to size by Unsplash itself */
const us = (id, w, h) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=faces,entropy&q=80&auto=format`;

/** [file, width, height, url] */
const photos = [];
const two = (n) => String(n).padStart(2, "0");

// strip under the hero: local business owners in their shops, facing the camera
["1753351052363-53ce102830eb", "1764173039192-2bbd508d5211", "1764173039506-c5cc7b8ec14b", "1586447751596-6c2050a0d335", "1635139883265-2fe4bccce747",
 "1672748341520-6a839e6c05bb", "1742844019488-12a9356a7ace", "1579005007697-75b2fe2c88e7", "1770199105692-9e52ff137cad", "1484863137850-59afcfe05386"].forEach((id, i) =>
  photos.push([`marquee/owner-${two(i + 1)}.webp`, 800, 800, us(id, 800, 800).replace("crop=faces,entropy", "crop=faces&facepad=3")])
);
// testimonial avatars (pravatar) + large photos (Unsplash portraits)
[[12], [47], [44]].forEach(([n], i) => photos.push([`testimonials/client-${two(i + 1)}.webp`, 280, 280, avatar(n, 300)]));
["1560250097-0b93528c311a", "1573496359142-b8d87734a5a2", "1614786269829-d24616faf56d"].forEach((id, i) =>
  photos.push([`testimonials/client-${two(i + 1)}-photo.webp`, 1216, 1000, us(id, 1216, 1000)])
);
[[15], [5], [33], [9]].forEach(([n], i) => photos.push([`testimonials/avatar-${two(i + 1)}.webp`, 160, 160, avatar(n, 200)]));
// blog author
photos.push(["team/author-adboex.webp", 200, 200, avatar(60, 200)]);
// industries
const ind = {
  hvac: "1718203862467-c33159fdc504", plumbing: "1676210134188-4c05dd172f89", roofing: "1635424709845-3a85ad5e1f5e",
  remodeling: "1484154218962-a197022b5858", "car-rental": "1568605117036-5fe5e7bab0b7", "real-estate": "1570129477492-45c003edd2be",
  "charter-rentals": "1569263979104-865ab7cd8d13", "carpet-dyeing": "1660394585016-508f949df960", "auto-repair": "1492144534655-ae79c964c9d7",
  excavation: "1628645419184-26a1f2757340",
};
Object.entries(ind).forEach(([slug, id]) => photos.push([`industries/${slug}.webp`, 1200, 750, us(id, 1200, 750)]));
// blog covers: abstract 3D art like the reference (1200×1000, cropped per card)
[["local-seo-checklist-for-service-businesses", "1637825891028-564f672aa42c"], ["generative-engine-optimization-guide", "1622737133809-d95047b9e673"],
 ["google-business-profile-optimization", "1709626011485-6fe000ea2dbc"], ["ai-receptionist-for-small-business", "1650943574955-ac02c65cfc71"],
 ["marketing-data-guide", "1627637819794-fba32f82be16"], ["ai-email-marketing", "1620121692029-d088224ddc74"],
 ["emotional-advertising-for-small-business", "1617791160505-6f00504e3519"], ["predictive-analytics-marketing", "1668681919287-7367677cdc4c"]].forEach(([s, id]) =>
  photos.push([`blog/cover-${s}.webp`, 1200, 1000, us(id, 1200, 1000).replace("crop=faces,entropy", "crop=entropy")])
);
// case studies: client portraits (Case Studies grid)
["1627161683077-e34782c24d81", "1629425733761-caae3b5f2e50", "1500648767791-00dcc994a43e", "1573497019940-1c28c88b4f3e", "1519085360753-af0119f7cbe7", "1781888681811-332968760c2a",
 "1595211877493-41a4e5f236b3", "1760543998147-117ae5649c5c", "1765005204058-10418f5123c5", "1624395213043-fa2e123b2656", "1780733059130-fd07a8bc5256", "1699899657680-421c2c2d5064"].forEach((id, i) =>
  photos.push([`case-studies/client-${two(i + 1)}.webp`, 820, 920, us(id, 820, 920).replace("crop=faces,entropy", "crop=faces&facepad=2.5")])
);
// about / careers / platform
photos.push(["about/mission.webp", 1216, 974, us("1556740758-90de374c12ad", 1216, 974)]);
photos.push(["about/hero.webp", 1600, 820, us("1540575467063-178a50c2df87", 1600, 820)]);
photos.push(["about/experts.webp", 832, 624, us("1761195689615-9469b65dac01", 832, 624)]);
photos.push(["careers/hero.webp", 1600, 760, us("1572021335469-31706a17aaef", 1600, 760)]);
[["team-01", 1200, 760, "1603201667230-bd139210db18"], ["team-02", 600, 760, "1581092568395-d68050c2ab43"],
 ["team-03", 900, 1000, "1587825140708-dfaf72ae4b04"], ["team-04", 900, 1000, "1630487656049-6db93a53a7e9"]].forEach(([n, w, h, id]) =>
  photos.push([`careers/${n}.webp`, w, h, us(id, w, h)])
);
photos.push(["platform/ai-human.webp", 1216, 974, us("1521737604893-d14cc237f11d", 1216, 974)]);

/** technology logos → [file, simple-icons slug] (order matches /content/home.ts techMarquee) */
const logos = ["openai", "googlegemini", "perplexity", "anthropic", "meta", "googlecloud", "amazonwebservices", "microsoftazure", "nvidia", "huggingface", "langchain", "llamaindex", "pytorch", "tensorflow", "python", "wordpress", "googlesearchconsole", "googlemybusiness", "twilio"];

/* ------------------------------------------------------------------ */
const isPlaceholder = (file) => {
  if (!existsSync(file)) return true;
  if (FORCE) return true;
  // generated placeholders are small, flat images
  return statSync(file).size < 30_000 && !file.endsWith(".svg");
};

async function get(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 25_000);
  try {
    const res = await fetch(url, { redirect: "follow", signal: ctl.signal, headers: { "User-Agent": "Mozilla/5.0 (demo-image-fetch)" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } finally {
    clearTimeout(t);
  }
}

let ok = 0, skipped = 0;
const failed = [];

const searchCache = new Map();
/** Turn "openverse:tags:lock:WxH" into a real image URL (Openverse search → pick by lock). */
async function photoCandidates(url) {
  if (!url.startsWith("openverse:")) return [url];
  const [, tags, lock, size] = url.split(":");
  const [w, h] = size.split("x");
  const q = tags.replace(/,/g, " ");
  if (!searchCache.has(q)) {
    const api = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial&page_size=20&mature=false`;
    searchCache.set(q, get(api).then((b) => JSON.parse(b.toString("utf8")).results ?? []).catch(() => []));
  }
  const results = await searchCache.get(q);
  const n = Number(lock);
  const picks = results.length ? [0, 1, 2].map((k) => results[(n + k) % results.length]?.url).filter(Boolean) : [];
  return [...picks, `https://picsum.photos/seed/adboex-${lock}/${w}/${h}`];
}

async function doPhoto([rel, w, h, url]) {
  const out = join(ROOT, rel);
  if (!isPlaceholder(out)) return skipped++;
  try {
    let buf = null;
    let lastErr = null;
    for (const candidate of await photoCandidates(url)) {
      try {
        buf = await get(candidate);
        await sharp(buf).metadata(); // make sure it is a real image
        break;
      } catch (e) {
        buf = null;
        lastErr = e;
      }
    }
    if (!buf) throw lastErr ?? new Error("no image");
    mkdirSync(dirname(out), { recursive: true });
    await sharp(buf).resize(w, h, { fit: "cover", position: "attention" }).webp({ quality: 78 }).toFile(out);
    ok++;
  } catch (e) {
    failed.push(`${rel} (${e.message})`);
  }
}

async function doLogo(slug, i) {
  const rel = `tech-logos/tech-${two(i + 1)}.svg`;
  const out = join(ROOT, rel);
  const current = existsSync(out) ? readFileSync(out, "utf8") : "";
  if (!FORCE && current && !current.includes('rx="7"')) return skipped++; // not our placeholder
  try {
    const svg = (await get(`https://cdn.simpleicons.org/${slug}/ffffff`)).toString("utf8");
    if (!svg.startsWith("<svg")) throw new Error("not an svg");
    writeFileSync(out, svg.replace("<svg", '<svg width="40" height="40"'));
    ok++;
  } catch (e) {
    failed.push(`${rel} ${slug} (${e.message})`);
  }
}

// download a few at a time
const queue = [...photos.map((p) => () => doPhoto(p)), ...logos.map((s, i) => () => doLogo(s, i))];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) await queue.shift()();
});
await Promise.all(workers);

console.log(`Demo images: ${ok} downloaded, ${skipped} kept (your own files).`);
if (failed.length) console.log(`Failed (placeholder kept):\n  - ${failed.join("\n  - ")}`);
