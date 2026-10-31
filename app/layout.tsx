import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site, SITE_URL } from "@/content/site";
import { animations } from "@/content/animations";
import { seo } from "@/content/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader, headScript } from "@/components/layout/Preloader";
import { FloatingMax } from "@/components/layout/FloatingMax";
import { Analytics } from "@/components/layout/Analytics";
import { DemoProvider } from "@/components/demo/DemoContext";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

/* Font: self-hosted at build time by next/font (no Google request at runtime).
   To change font, swap Plus_Jakarta_Sans for another next/font/google import. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
  preload: true,
});

/* Mono font used by the navbar and its buttons (same as the reference design) */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-geist-mono",
});

const verificationOther: Record<string, string> = {};
if (site.verification.bing) verificationOther["msvalidate.01"] = site.verification.bing;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.home.title, template: `%s | ${site.name}` },
  description: seo.home.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(Object.keys(verificationOther).length ? { other: verificationOther } : {}),
  },
  alternates: {
    types: { "application/rss+xml": [{ url: "/rss.xml", title: `${site.name} Insights` }] },
  },
};

export const viewport: Viewport = {
  themeColor: "#131313",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const motionVars = {
  "--reveal-duration": `${animations.reveal.durationS}s`,
  "--reveal-distance": animations.reveal.enabled ? `${animations.reveal.distancePx}px` : "0px",
  "--reveal-stagger": `${animations.reveal.staggerS}s`,
} as React.CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${geistMono.variable}`} style={motionVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript() }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) add attributes to <body> */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-lime px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Preloader />
        <MotionProvider>
          <DemoProvider>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <FloatingMax />
          </DemoProvider>
        </MotionProvider>
        <RevealObserver />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Analytics />
      </body>
    </html>
  );
}
