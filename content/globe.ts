/**
 * GLOBE SETTINGS — the 3D network globe in the "Our presence" section
 * (components/sections/presence/GlobeNetwork.tsx).
 *
 * Rotation speed: /content/animations.ts → globeSpeed (seconds per full turn).
 * Offices, arcs and pills: /content/presence.ts.
 * After changing colours or offices, refresh the still image shown before the
 * 3D globe loads:  npm run globe-image
 */

export const globe = {
  /* ---------- colours ---------- */
  oceanLight: "#b4b4b4", // grey where the light hits (centre-left of the earth)
  oceanDark: "#363636", // grey towards the edges
  land: "#0f0f0f", // continents
  node: "#ffffff", // network dots
  line: "#ffffff", // network lines
  marker: "#34d399", // office markers (green)
  arc: "#4089f0", // arcs between offices (blue)
  glow: "rgb(255 255 255 / 0.10)", // soft halo behind the globe ("transparent" = none)

  /* ---------- network shell ---------- */
  nodeCount: 300, // desktop (250–350 looks like the reference)
  mobileNodeCount: 150, // phones (and devices with 2 or fewer CPU cores)
  shellScale: 1.25, // network radius ÷ earth radius
  neighbours: [3, 5] as [number, number], // each node links to 3–5 nearest nodes
  lineOpacity: [0.15, 0.35] as [number, number],
  backFade: 0.22, // brightness of nodes/lines on the far side (0–1)
  hubs: [
    // brighter nodes with extra lines, placed over these [lat, lng]
    [42, -100],
    [-12, -58],
    [52, 12],
    [24, 78],
    [36, 112],
    [-25, 134],
  ] as [number, number][],
  pulses: 0.05, // share of lines that carry a travelling light pulse
  seed: 7, // change for a different (but stable) network layout

  /* ---------- motion ---------- */
  tilt: 0.3, // radians, north pole leaning towards the viewer
  shellSpeedFactor: 1.15, // network turns this much faster than the earth (parallax)
  startLng: -90, // longitude facing the viewer at start (-90 = the Americas)
};
