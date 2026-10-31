import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site, SITE_URL } from "@/content/site";

/**
 * Shared design for every social-share image (1200×630), generated at build
 * time by the opengraph-image.tsx files next to each page. Colours match
 * /styles/theme.css; the logo is /public/images/brand/logo-white.png.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

let logo: string | null = null;
function logoDataUrl() {
  if (logo === null) {
    try {
      const file = path.join(process.cwd(), "public", site.logo.src);
      logo = `data:image/png;base64,${fs.readFileSync(file).toString("base64")}`;
    } catch {
      logo = "";
    }
  }
  return logo;
}

/** Strip the " | Adboex" suffix from SEO titles for the image headline. */
export const ogTitle = (title: string) => title.replace(/\s*\|\s*[^|]+$/, "");

export function ogImage({ title, eyebrow }: { title: string; eyebrow?: string }) {
  const src = logoDataUrl();
  const fontSize = title.length > 60 ? 54 : title.length > 40 ? 64 : 74;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#131313",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(64,137,240,0.30), transparent 45%), radial-gradient(circle at 10% 100%, rgba(43,130,247,0.28), transparent 50%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {src ? <img src={src} width={208} height={77} alt="" /> : <div style={{ fontSize: 40, fontWeight: 700 }}>{site.name}</div>}
          {eyebrow && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 24,
                color: "#ffffff",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 999, background: "#4089F0" }} />
              {eyebrow}
            </div>
          )}
        </div>
        <div style={{ display: "flex", fontSize, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 1020 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, color: "#a3a3a3" }}>
          <div style={{ display: "flex" }}>{site.tagline}</div>
          <div
            style={{
              display: "flex",
              padding: "12px 26px",
              borderRadius: 999,
              backgroundImage: "linear-gradient(100deg, #4089f0, #3a82ec, #2f74db)",
              color: "#ffffff",
              fontWeight: 700,
            }}
          >
            {new URL(SITE_URL).host.replace(/^www\./, "")}
          </div>
        </div>
      </div>
    ),
    ogSize
  );
}
