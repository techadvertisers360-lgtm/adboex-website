/**
 * Cuts the glowing orb out of /public/images/hero/ai-orb.jpg into a round,
 * transparent image (soft edge, glow kept) so it can spin without showing
 * the photo's corners.  Output: public/images/brand/orb.webp (900×900)
 *
 *   npm run orb-image
 */
import sharp from "sharp";

const SRC = "public/images/hero/ai-orb.jpg";
const OUT = "public/images/brand/orb.webp";
const SIZE = 900;

const meta = await sharp(SRC).metadata();
// the sphere sits in the middle of the photo; its radius is ~37% of the photo height
const cx = Math.round(meta.width / 2);
const cy = Math.round(meta.height / 2);
const half = Math.round(meta.height * 0.46); // sphere + glow
const crop = await sharp(SRC)
  .extract({ left: cx - half, top: cy - half, width: half * 2, height: half * 2 })
  .resize(SIZE, SIZE)
  .toBuffer();

// round mask: solid inside, soft fade at the edge (keeps the outer glow, drops the black)
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
  <defs><radialGradient id="m"><stop offset="78%" stop-color="#fff"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
  <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="url(#m)"/>
</svg>`);

await sharp(crop)
  .ensureAlpha()
  .composite([{ input: await sharp(mask).resize(SIZE, SIZE).toBuffer(), blend: "dest-in" }])
  .webp({ quality: 86, alphaQuality: 90 })
  .toFile(OUT);
console.log(`Orb written → ${OUT}`);
