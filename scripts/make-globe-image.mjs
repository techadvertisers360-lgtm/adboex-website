/**
 * Renders the still image of the 3D network globe, shown before the live
 * globe loads, without JavaScript and for visitors who prefer reduced motion.
 * Uses the same settings as the live globe (/content/globe.ts), the same land
 * texture and the office locations in /content/presence.ts.
 *
 *   npm run globe-image
 *
 * Output: public/images/presence/globe-static.webp (1200×1200)
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { globe as G } from "../content/globe.ts";
import { presence } from "../content/presence.ts";

const SIZE = 1200;
const C = SIZE / 2;
const D = Math.PI / 180;
// same framing as the live camera (distance 4.35, fov 35°)
const CAM = 4.35;
const HALF = Math.tan(17.5 * D);
const radiusPx = (r) => ((r / Math.sqrt(CAM * CAM - r * r)) / HALF) * C;
const RE = radiusPx(1);
const RS = radiusPx(G.shellScale);
const startRot = Math.PI / 2 - (G.startLng + 180) * D;

/* ---------- helpers (same maths as GlobeNetwork.tsx) ---------- */
const latLng = (lat, lng, r = 1) => {
  const phi = (lng + 180) * D;
  const th = lat * D;
  return [-Math.cos(phi) * Math.cos(th) * r, Math.sin(th) * r, Math.sin(phi) * Math.cos(th) * r];
};
const rotY = ([x, y, z], a) => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
const rotX = ([x, y, z], a) => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
const toView = (p, spin) => rotX(rotY(p, spin), G.tilt);
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ---------- earth (raster, shaded like the live shader) ---------- */
const land = await sharp("public/images/globe/earth-land.png").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const [oL, oD, lc] = [hex(G.oceanLight), hex(G.oceanDark), hex(G.land)];
const L = (() => {
  const v = [-0.55, 0.35, 0.78];
  const n = Math.hypot(...v);
  return v.map((c) => c / n);
})();
const earth = Buffer.alloc(SIZE * SIZE * 4);
for (let py = 0; py < SIZE; py++) {
  for (let px = 0; px < SIZE; px++) {
    const x = (px + 0.5 - C) / RE;
    const y = -(py + 0.5 - C) / RE;
    const rr = x * x + y * y;
    if (rr > 1.0) continue;
    const z = Math.sqrt(1 - rr);
    // view normal → texture coordinates (undo tilt, then the earth's rotation)
    const p = rotY(rotX([x, y, z], -G.tilt), -startRot);
    const lat = Math.asin(Math.max(-1, Math.min(1, p[1])));
    const phi = Math.atan2(p[2], -p[0]);
    const u = ((((phi / D - 180 + 540) % 360) + 360) % 360) / 360;
    const v = (90 - lat / D) / 180;
    const tx = Math.min(land.info.width - 1, Math.floor(u * land.info.width));
    const ty = Math.min(land.info.height - 1, Math.floor(v * land.info.height));
    const a = land.data[(ty * land.info.width + tx) * 4 + 3] / 255;
    const light = Math.max(0, x * L[0] + y * L[1] + z * L[2]);
    const rim = 1 - z;
    const k = Math.pow(light, 1.35);
    const dark = 1 - 0.45 * Math.pow(rim, 2.2);
    const edge = smooth(1.0, 0.985, Math.sqrt(rr)); // anti-aliased rim
    const i = (py * SIZE + px) * 4;
    for (let c = 0; c < 3; c++) earth[i + c] = Math.round(255 * ((oD[c] + (oL[c] - oD[c]) * k) * dark * (1 - a) + lc[c] * a));
    earth[i + 3] = Math.round(255 * edge);
  }
}
const earthPng = await sharp(earth, { raw: { width: SIZE, height: SIZE, channels: 4 } }).png().toBuffer();

/* ---------- network (same layout as the live globe) ---------- */
const rand = mulberry32(G.seed);
const N = G.nodeCount;
const golden = Math.PI * (3 - Math.sqrt(5));
const pts = [];
for (let i = 0; i < N; i++) {
  const y = 1 - ((i + 0.5) / N) * 2;
  const r = Math.sqrt(1 - y * y);
  const a = i * golden;
  let v = [Math.cos(a) * r, y, Math.sin(a) * r];
  v = v.map((c) => c + (rand() - 0.5) * 0.06);
  const n = Math.hypot(...v);
  pts.push(v.map((c) => (c / n) * G.shellScale));
}
const d2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2;
const hubs = new Set(
  G.hubs.map(([lat, lng]) => {
    const t = latLng(lat, lng, G.shellScale);
    let best = 0;
    pts.forEach((p, i) => {
      if (d2(p, t) < d2(pts[best], t)) best = i;
    });
    return best;
  })
);
const seen = new Set();
const links = [];
pts.forEach((p, i) => {
  const hub = hubs.has(i);
  const k = hub ? 9 : G.neighbours[0] + Math.floor(rand() * (G.neighbours[1] - G.neighbours[0] + 1));
  const near = pts.map((q, j) => [j, d2(p, q)]).filter(([j]) => j !== i).sort((x, y) => x[1] - y[1]).slice(0, k);
  for (const [j] of near) {
    const key = i < j ? `${i}-${j}` : `${j}-${i}`;
    if (seen.has(key)) continue;
    seen.add(key);
    links.push([i, j, hub || hubs.has(j) ? 0.5 : G.lineOpacity[0] + rand() * (G.lineOpacity[1] - G.lineOpacity[0])]);
  }
});
const nodeInfo = pts.map((_, i) => {
  const hub = hubs.has(i);
  const size = hub ? 0.075 : 0.032 + rand() * 0.026;
  rand(); // phase (unused in the still image)
  return { size, bright: hub ? 1.6 : 0.6 + rand() * 0.5 };
});

const view = pts.map((p) => toView(p, startRot));
const scr = (p, R, scale) => [C + (p[0] / scale) * R, C - (p[1] / scale) * R];
const depth = (z) => G.backFade + (1 - G.backFade) * smooth(-0.35, 0.35, z / G.shellScale);
const pxPerWorld = RS / G.shellScale;

function networkSvg(front) {
  let s = "";
  for (const [a, b, op] of links) {
    const pa = view[a];
    const pb = view[b];
    const zMid = (pa[2] + pb[2]) / 2;
    if (front !== zMid >= 0) continue;
    const [x1, y1] = scr(pa, RS, G.shellScale);
    const [x2, y2] = scr(pb, RS, G.shellScale);
    s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${G.line}" stroke-opacity="${(op * depth(zMid)).toFixed(3)}" stroke-width="1.6"/>`;
  }
  view.forEach((p, i) => {
    if (front !== p[2] >= 0) return;
    const [x, y] = scr(p, RS, G.shellScale);
    const al = Math.min(1, depth(p[2]) * nodeInfo[i].bright * 0.85);
    const r = (nodeInfo[i].size * pxPerWorld) / 2;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#node)" fill-opacity="${al.toFixed(3)}"/>`;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 0.35).toFixed(1)}" fill="${G.node}" fill-opacity="${al.toFixed(3)}"/>`;
  });
  return s;
}

/* ---------- offices: arcs + markers (on the earth) ---------- */
let offices = "";
for (const [a, b] of presence.arcs) {
  const oa = presence.offices[a];
  const ob = presence.offices[b];
  if (!oa || !ob) continue;
  const va = latLng(oa.lat, oa.lng);
  const vb = latLng(ob.lat, ob.lng);
  const angle = Math.acos(Math.max(-1, Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2])));
  let path = "";
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    let v = va.map((c, k) => c + (vb[k] - c) * t);
    const n = Math.hypot(...v);
    const h = 1.006 + Math.sin(Math.PI * t) * (0.02 + angle * 0.07);
    v = toView(v.map((c) => (c / n) * h), startRot);
    const [x, y] = scr(v, RE, 1);
    path += v[2] > 0 ? `${path && !path.endsWith("M") ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)} ` : " M";
  }
  path = path.replace(/ M( M)+/g, " M").replace(/M\s*$/, "").replace(/^\s*M\s+M/, "M");
  if (path.trim()) offices += `<path d="${path.trim()}" fill="none" stroke="${G.arc}" stroke-width="3.5" stroke-linecap="round" stroke-opacity=".95"/>`;
}
for (const o of presence.offices) {
  const v = toView(latLng(o.lat, o.lng, 1.012), startRot);
  if (v[2] <= 0.05) continue;
  const [x, y] = scr(v, RE, 1);
  offices += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="26" fill="url(#marker)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="${G.marker}"/>`;
}

const defs = `<defs>
  <radialGradient id="node"><stop offset="0%" stop-color="${G.node}" stop-opacity=".8"/><stop offset="100%" stop-color="${G.node}" stop-opacity="0"/></radialGradient>
  <radialGradient id="marker"><stop offset="0%" stop-color="${G.marker}" stop-opacity=".75"/><stop offset="100%" stop-color="${G.marker}" stop-opacity="0"/></radialGradient>
  <radialGradient id="halo"><stop offset="60%" stop-color="#ffffff" stop-opacity=".07"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
</defs>`;
const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">${defs}${body}</svg>`);

mkdirSync("public/images/presence", { recursive: true });
await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: svg(`<circle cx="${C}" cy="${C}" r="${RS * 1.12}" fill="url(#halo)"/>${networkSvg(false)}`) },
    { input: earthPng },
    { input: svg(offices + networkSvg(true)) },
  ])
  .webp({ quality: 84, alphaQuality: 90 })
  .toFile("public/images/presence/globe-static.webp");
console.log(`Globe image written: ${N} nodes, ${links.length} lines, ${presence.offices.length} offices → public/images/presence/globe-static.webp`);
