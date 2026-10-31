/**
 * ANIMATION SETTINGS — turn effects on/off and change their speed.
 *
 * Where it appears: whole website (preloader, scroll reveals, marquees,
 * hero headline, count-up numbers). Visitors who set "reduce motion" in their
 * device settings automatically get no animations, whatever you set here.
 */

export const animations = {
  /* Full-screen logo screen shown on the first page view of a visit */
  preloader: {
    enabled: true,
    oncePerSession: false, // true = only on the first page of a visit; false = on every full page load/refresh
    minMs: 900, // shortest time it stays visible
    maxMs: 1600, // removed after this even if the page is still loading (keep short for speed/SEO)
  },

  /* Fade-up when sections scroll into view */
  reveal: {
    enabled: true,
    durationS: 0.6,
    distancePx: 40,
    staggerS: 0.1, // delay between cards in a group
  },

  /* Hero headline: words appear one by one */
  heroWords: {
    enabled: true,
    perWordS: 0.08,
  },

  /* Infinite scrolling strips — seconds for one full loop (higher = slower) */
  marquee: {
    screenshotsS: 40,
    logosS: 35,
    pillsS: 30,
  },

  /* "Our presence" rotating globe: seconds for one full turn (higher = slower).
     Set to 0 to stop the automatic rotation. */
  globeSpeed: 35,

  /* Numbers counting up in stats sections */
  countUp: {
    enabled: true,
    durationS: 1.8,
  },
};
