import type { NextConfig } from "next";
import { SITE_URL } from "./content/site";

/**
 * Next.js settings for Hostinger Node.js hosting (Deploy from Git).
 * Pages are still pre-rendered at build time (static HTML) for speed and SEO,
 * but a real Node server runs them, so next/image optimisation, the
 * /api/contact form handler, headers and redirects all work.
 */

const isDev = process.env.NODE_ENV !== "production";
const canonicalHost = new URL(SITE_URL).host; // e.g. www.adboex.com
const otherHost = canonicalHost.startsWith("www.") ? canonicalHost.slice(4) : `www.${canonicalHost}`;

/* Content-Security-Policy: allows our own files, Google Fonts, GA4/GTM and
   YouTube embeds. Add a domain here if you embed another service. */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://i.ytimg.com https://www.google-analytics.com https://www.googletagmanager.com https://*.google.com https://*.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://www.googletagmanager.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  trailingSlash: true, // /pricing → /pricing/ (one canonical URL per page)
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // images/icons in /public: cached 7 days (replacing a file with the same name updates within a week)
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/:file(favicon.ico|icon.svg|apple-touch-icon.png)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
      // never cache form responses
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },

  async redirects() {
    // Send the wrong host (adboex.com vs www.adboex.com, set by SITE_URL in
    // /content/site.ts) to the canonical URL in ONE hop, keeping the trailing
    // slash on page URLs. HTTP → HTTPS is handled by Hostinger: hPanel →
    // Security → SSL → "Force HTTPS" (plus the HSTS header above).
    const has = [{ type: "host" as const, value: otherHost }];
    return [
      { source: "/", has, destination: `${SITE_URL}/`, permanent: true },
      { source: "/:path*/", has, destination: `${SITE_URL}/:path*/`, permanent: true },
      { source: "/:path*", has, destination: `${SITE_URL}/:path*`, permanent: true },
      // old case study detail pages → the case studies grid
      { source: "/case-studies/:slug((?!opengraph-image)[^/]+)/", destination: "/case-studies/", permanent: true },
    ];
  },
};

export default nextConfig;
