/**
 * Builds every favicon / app icon from ONE SVG (the gradient "O" from the
 * Adboex logo on the dark brand background).
 *
 *   npm run icons
 *
 * To use your own icon: paste your SVG into SOURCE below (or set SOURCE = ""
 * and put your design in app/icon.svg), then run the command.
 * Outputs: app/icon.svg, app/favicon.ico, app/apple-icon.png,
 *          public/icon-192.png, public/icon-512.png
 */
import sharp from "sharp";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="o" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2B8CF0"/>
      <stop offset=".5" stop-color="#9446C8"/>
      <stop offset="1" stop-color="#E80B8C"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="#131313"/>
  <ellipse cx="256" cy="256" rx="150" ry="132" fill="none" stroke="url(#o)" stroke-width="84"/>
</svg>`;

const svg = SOURCE || (existsSync("app/icon.svg") ? readFileSync("app/icon.svg", "utf8") : "");
if (!svg) throw new Error("No icon source found");
writeFileSync("app/icon.svg", svg);

const png = (size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

writeFileSync("app/apple-icon.png", await sharp(Buffer.from(svg)).resize(180, 180).flatten({ background: "#131313" }).png().toBuffer());
writeFileSync("public/icon-192.png", await png(192));
writeFileSync("public/icon-512.png", await png(512));

/* favicon.ico = 16, 32 and 48 px PNGs packed into one ICO file */
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
writeFileSync("app/favicon.ico", Buffer.concat([header, ...images]));
console.log("Icons written: app/icon.svg, app/favicon.ico, app/apple-icon.png, public/icon-192.png, public/icon-512.png");
