/**
 * Animated product scenes shown inside the service / feature cards
 * (the reference uses looping videos; these are built in code — no download,
 * crisp at any size, and they never block the page).
 *
 * Pure CSS animations (see "Animated product scenes" in app/globals.css):
 * pieces pop in one after another, bars/rings fill, charts draw, then loop.
 *
 * To use your own looping video instead, set `video: "/videos/your-file.mp4"`
 * on that card in /content/home.ts — it then plays muted, looped, inline.
 */
import { BarChart3, Bell, Mail, Megaphone, Trophy, CalendarCheck, Check, FileText, Globe, MapPin, MessageSquare, Phone, Sparkles, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SceneFrame } from "./SceneFrame";
import { Bar, card, d, Glow, Label, Ring } from "./sceneKit";
import { AdsScene, AppDevScene, LeadsScene, SeoScene, SocialScene, WebDevScene } from "./ServiceScenes";

export type VisualKind =
  | "search" | "website" | "gbp" | "analytics" | "receptionist" | "mobile" | "outreach" | "competitors"
  | "leads" | "ads" | "seo" | "social" | "webdev" | "appdev";

/** colour theme of each scene background (see "Scene colour themes" in globals.css) */
const themes: Partial<Record<VisualKind, string>> = { leads: "teal", ads: "amber", seo: "emerald", social: "rose", webdev: "cyan", appdev: "violet" };

export function ProductVisual({ kind, video, label, className }: { kind: VisualKind; video?: string; label: string; className?: string }) {
  if (video) {
    return (
      <div className={cn("relative aspect-[3/2] overflow-hidden rounded-[12px] bg-black", className)}>
        <video className="size-full object-cover" src={video} autoPlay muted loop playsInline preload="metadata" aria-label={label} />
      </div>
    );
  }
  const Scene = scenes[kind];
  return (
    <SceneFrame label={label} theme={themes[kind]} className={className}>
      <Scene />
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ */
/* scenes                                                              */
/* ------------------------------------------------------------------ */

/** AI Search Visibility: score ring, 90-day trend line, AI engine mentions */
function SearchScene() {
  return (
    <>
      <Glow className="top-[10%] right-[12%] size-[30cqw] bg-[#a855f7]" />
      <Glow className="bottom-[5%] left-[10%] size-[26cqw] bg-[#2563eb]" />
      <div className="vz-card vz-pop top-[26%] left-[6%] w-[58%]" style={card(0.5, "rotateY(10deg) rotateX(4deg)", 8)}>
        <p className="text-[2.4cqw] font-semibold">90-Day AI Visibility Trend</p>
        <p className="text-[1.6cqw] text-white/55">Mentions across AI answers</p>
        <svg viewBox="0 0 300 120" className="mt-[1.5cqw] w-full">
          {[20, 50, 80, 110].map((y) => (
            <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgb(255 255 255 / .07)" />
          ))}
          <path
            d="M0 100 C40 96 60 92 90 84 S150 70 180 58 S240 36 300 18"
            fill="none"
            stroke="#4089f0"
            strokeWidth="3"
            strokeLinecap="round"
            className="vz-draw"
            style={{ "--len": 360, ...d(0.9) } as React.CSSProperties}
          />
        </svg>
        <div className="mt-[0.8cqw] flex justify-between text-[1.4cqw] text-white/40">
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
        </div>
      </div>

      <div className="vz-card vz-pop top-[8%] right-[7%] flex w-[30%] flex-col items-center gap-[1cqw]" style={card(0.2, "rotateY(-12deg) rotateX(6deg)", 6.5)}>
        <Label>AI visibility score</Label>
        <div className="relative grid place-items-center">
          <Ring value={72} delay={0.4} />
          <span className="absolute text-[3.6cqw] font-semibold">72</span>
        </div>
        <div className="flex w-full justify-between text-[1.5cqw]">
          <span className="text-white/55">Upside</span>
          <span className="text-[#8fbcf8]">+18%</span>
        </div>
      </div>

      <div className="vz-card vz-pop right-[7%] bottom-[8%] w-[34%]" style={card(1.3, undefined, 7.5)}>
        <Label>Recommended by</Label>
        <ul className="mt-[1cqw] flex flex-col gap-[0.9cqw] text-[1.8cqw]">
          {[
            ["ChatGPT", true],
            ["Gemini", true],
            ["Perplexity", false],
          ].map(([n, ok], i) => (
            <li key={String(n)} className="vz-pop flex items-center justify-between" style={d(1.9 + i * 0.35)}>
              {n}
              {ok ? (
                <span className="grid size-[2.6cqw] place-items-center rounded-full bg-[#4ade80]/20 text-[#4ade80]">
                  <Check className="size-[1.7cqw]" strokeWidth={3} />
                </span>
              ) : (
                <span className="vz-blink text-[1.5cqw] text-[#fbbf24]">improving</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** Website optimization: site health, keywords ranked, AI pages published */
function WebsiteScene() {
  return (
    <>
      <Glow className="top-[5%] right-[20%] size-[28cqw] bg-[#c026d3]" />
      <Glow className="bottom-[0%] left-[15%] size-[24cqw] bg-[#2563eb]" />
      <div className="vz-card vz-pop top-[14%] left-[16%] w-[34%]" style={card(0.2, "rotateY(8deg)", 7)}>
        <div className="flex items-start justify-between">
          <div>
            <Label>SEO score</Label>
            <p className="text-[2.3cqw] font-semibold">Site Health</p>
          </div>
          <span className="grid size-[4cqw] place-items-center rounded-[1cqw] bg-white/10 text-[#a3e635]">
            <Zap className="size-[2.2cqw]" />
          </span>
        </div>
        <p className="mt-[1.4cqw] text-right text-[1.6cqw] text-white/70">92%</p>
        <Bar value={92} delay={0.5} tone="lime" />
      </div>

      <div className="vz-card light vz-pop top-[12%] right-[9%] w-[31%]" style={card(0.7, "rotateY(-18deg) rotateX(10deg) rotateZ(-7deg)", 6)}>
        <p className="text-[2.1cqw] font-semibold">Keywords Ranked</p>
        <p className="mt-[0.4cqw] flex items-end gap-[1cqw]">
          <span className="text-[5cqw] leading-none font-semibold">247</span>
          <span className="text-[1.5cqw] text-black/45">in the top 10</span>
        </p>
        <div className="mt-[1.4cqw] flex h-[5cqw] items-end gap-[0.6cqw]">
          {[22, 30, 26, 38, 44, 40, 56, 64, 72, 88].map((h, i) => (
            <span key={i} className="vz-fill-y flex-1 rounded-full bg-[#4089f0]" style={{ height: `${h}%`, opacity: 0.35 + i * 0.065, ...d(1 + i * 0.06) }} />
          ))}
        </div>
      </div>

      <div className="vz-card vz-pop bottom-[9%] left-[16%] w-[46%]" style={card(1.2, "rotateY(6deg) rotateX(-3deg)", 8)}>
        <p className="flex items-center gap-[1cqw] text-[2cqw] font-semibold">
          <FileText className="size-[2.2cqw] text-white/60" /> AI Pages Published
        </p>
        <div className="mt-[1.4cqw] flex flex-col gap-[1.3cqw] text-[1.6cqw] text-white/60">
          {[
            ["Service pages", 42, 70],
            ["City pages", 18, 40],
            ["Schema markup", 60, 92],
          ].map(([n, v, w], i) => (
            <div key={String(n)}>
              <p className="mb-[0.6cqw] flex justify-between">
                <span>{n}</span>
                <span className="text-white">{v}</span>
              </p>
              <Bar value={Number(w)} delay={1.7 + i * 0.25} tone={i === 2 ? "lime" : "brand"} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/** Google Business Profile: overview with rating, auto-post toggle, new post + AI reply */
function GbpScene() {
  return (
    <>
      <Glow className="top-[0%] right-[10%] size-[30cqw] bg-[#9333ea]" />
      <Glow className="bottom-[0%] left-[0%] size-[28cqw] bg-[#1d4ed8]" />
      <div className="vz-card vz-pop top-[22%] left-[8%] w-[50%]" style={card(0.2, "rotateY(10deg) rotateX(4deg)", 8)}>
        <p className="flex items-center gap-[1cqw] text-[2.2cqw] font-semibold">
          <MapPin className="size-[2.2cqw] text-[#4089f0]" /> Profile Overview
        </p>
        <div className="mt-[1.6cqw] grid grid-cols-2 gap-[1.4cqw]">
          <div>
            <p className="text-[4.4cqw] leading-none font-semibold">
              4.8<span className="text-[2cqw] text-white/50">/5</span>
            </p>
            <p className="mt-[0.6cqw] flex gap-[0.3cqw] text-[#fbbf24]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="vz-pop size-[1.8cqw] fill-current" style={d(0.5 + i * 0.12)} />
              ))}
            </p>
          </div>
          <div>
            <p className="text-[4.4cqw] leading-none font-semibold">#2</p>
            <p className="mt-[0.6cqw] text-[1.5cqw] text-white/55">Average map rank</p>
          </div>
        </div>
        <div className="mt-[1.6cqw] flex h-[5.5cqw] items-end gap-[0.7cqw]">
          {[30, 42, 38, 55, 61, 58, 74, 80].map((h, i) => (
            <span key={i} className="vz-fill-y flex-1 rounded-[0.5cqw] bg-gradient-to-t from-[#4089f0]/40 to-[#4089f0]" style={{ height: `${h}%`, ...d(0.8 + i * 0.07) }} />
          ))}
        </div>
      </div>

      <div className="vz-card vz-pop top-[9%] right-[9%] flex items-center gap-[1.4cqw] rounded-full py-[1.4cqw]" style={card(0.8, "rotateZ(8deg) rotateY(-10deg)", 6)}>
        <span className="relative h-[3cqw] w-[5.4cqw] rounded-full bg-[#4089f0]">
          <span className="vz-pop absolute top-[0.4cqw] right-[0.4cqw] size-[2.2cqw] rounded-full bg-white" style={d(1.1)} />
        </span>
        <span className="text-[2cqw]">Auto-post weekly</span>
      </div>

      <div className="vz-card vz-pop right-[8%] bottom-[30%] w-[34%]" style={card(1.4, "rotateY(-8deg)", 7.5)}>
        <Label>New post published</Label>
        <p className="mt-[0.6cqw] text-[1.8cqw]">Winter tune-up special: book before Friday</p>
      </div>

      <div className="vz-card light vz-pop right-[14%] bottom-[8%] flex w-[34%] items-start gap-[1cqw]" style={card(2, "rotateY(-12deg) rotateX(6deg)", 6.5)}>
        <span className="grid size-[3.4cqw] shrink-0 place-items-center rounded-full bg-[#4089f0] text-white">
          <MessageSquare className="size-[1.8cqw]" />
        </span>
        <div>
          <p className="text-[1.8cqw] font-semibold">AI reply sent</p>
          <p className="text-[1.5cqw] text-black/55">“Thanks Sarah, glad we could help!”</p>
        </div>
      </div>
    </>
  );
}

/** Visibility intelligence: KPI tiles, weekly bars, rank movement */
function AnalyticsScene() {
  const kpis: [string, string, string][] = [
    ["Calls", "+38%", "#4ade80"],
    ["Website clicks", "1,284", "#8fbcf8"],
    ["Inquiries", "64", "#c084fc"],
  ];
  return (
    <>
      <div className="absolute top-[9%] left-[7%] flex w-[86%] gap-[2cqw]">
        {kpis.map(([k, v, c], i) => (
          <div key={k} className="vz-card vz-pop relative! flex-1" style={card(0.2 + i * 0.2, undefined, 6 + i)}>
            <Label>{k}</Label>
            <p className="mt-[0.6cqw] text-[3.8cqw] leading-none font-semibold" style={{ color: c }}>
              {v}
            </p>
          </div>
        ))}
      </div>

      <Glow className="bottom-[0%] left-[10%] size-[30cqw] bg-[#2563eb]" />
      <Glow className="top-[0%] right-[0%] size-[26cqw] bg-[#c026d3]" />
      <div className="vz-card vz-pop bottom-[9%] left-[7%] w-[52%]" style={card(0.9, "rotateY(8deg) rotateX(3deg)", 8)}>
        <p className="flex items-center gap-[1cqw] text-[2cqw] font-semibold">
          <BarChart3 className="size-[2.2cqw] text-white/60" /> Weekly visibility
        </p>
        <div className="mt-[1.6cqw] flex h-[14cqw] items-end gap-[1.2cqw]">
          {[34, 48, 42, 60, 68, 64, 82].map((h, i) => (
            <span key={i} className="vz-fill-y flex-1 rounded-t-[0.7cqw] bg-gradient-to-t from-[#a855f7]/50 to-[#4089f0]" style={{ height: `${h}%`, ...d(1.2 + i * 0.08) }} />
          ))}
        </div>
      </div>

      <div className="vz-card vz-pop right-[7%] bottom-[9%] w-[31%]" style={card(1.5, "rotateY(-10deg)", 7)}>
        <Label>Keyword ranks</Label>
        <ul className="mt-[1cqw] flex flex-col gap-[1cqw] text-[1.7cqw]">
          {[
            ["ac repair", "3 → 1"],
            ["hvac near me", "8 → 2"],
            ["furnace repair", "12 → 4"],
          ].map(([k, v], i) => (
            <li key={k} className="vz-pop flex justify-between gap-[1cqw]" style={d(2.1 + i * 0.3)}>
              <span className="truncate text-white/70">{k}</span>
              <span className="text-[#4ade80]">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** AI receptionist: incoming call with waveform, chat, booked toast */
function ReceptionistScene() {
  return (
    <>
      <Glow className="top-[5%] left-[10%] size-[26cqw] bg-[#16a34a]" />
      <Glow className="bottom-[0%] right-[5%] size-[30cqw] bg-[#7c3aed]" />
      <div className="vz-card vz-pop top-[10%] left-[7%] w-[40%]" style={card(0.2, "rotateY(10deg) rotateX(4deg)", 7)}>
        <div className="flex items-center gap-[1.2cqw]">
          <span className="vz-pulse grid size-[4.4cqw] place-items-center rounded-full bg-[#4ade80]/20 text-[#4ade80]">
            <Phone className="size-[2.2cqw]" />
          </span>
          <div>
            <p className="text-[2cqw] font-semibold">Incoming call</p>
            <p className="text-[1.5cqw] text-white/55">2:14 AM · answered by Max</p>
          </div>
        </div>
        <div className="mt-[1.6cqw] flex h-[4.5cqw] items-center gap-[0.5cqw]">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="vz-blink w-[0.6cqw] rounded-full bg-[#8fbcf8]"
              style={{ height: `${25 + ((i * 37) % 75)}%`, animationDelay: `${(i % 6) * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-[12%] right-[7%] flex w-[44%] flex-col gap-[1.4cqw]">
        <p className="vz-pop self-end rounded-[2cqw] rounded-br-[0.6cqw] bg-[#4089f0] px-[2cqw] py-[1.4cqw] text-[1.8cqw] text-white" style={d(0.8)}>
          My AC stopped working, can someone come today?
        </p>
        <p className="vz-pop rounded-[2cqw] rounded-bl-[0.6cqw] bg-white/10 px-[2cqw] py-[1.4cqw] text-[1.8cqw] text-white backdrop-blur" style={d(1.5)}>
          Sorry about that! I have a 9:00 AM slot. What&apos;s your address?
        </p>
        <p className="vz-pop self-end rounded-[2cqw] rounded-br-[0.6cqw] bg-[#4089f0] px-[2cqw] py-[1.4cqw] text-[1.8cqw] text-white" style={d(2.2)}>
          42 Oak Street. 9 works!
        </p>
      </div>

      <div className="vz-card light vz-pop bottom-[10%] left-[7%] flex items-center gap-[1.4cqw]" style={card(2.6, "rotateY(10deg) rotateX(-4deg)", 6.5)}>
        <span className="grid size-[4.4cqw] place-items-center rounded-full bg-[#4ade80] text-white">
          <CalendarCheck className="size-[2.2cqw]" />
        </span>
        <div>
          <p className="text-[2cqw] font-semibold">Appointment booked</p>
          <p className="text-[1.5cqw] text-black/55">Tue 9:00 AM · lead sent to your phone</p>
        </div>
      </div>
    </>
  );
}

/** Mobile app: phone with app UI + floating notification pills */
function MobileScene() {
  return (
    <>
      <Glow className="top-[10%] left-[30%] size-[40cqw] bg-[#9333ea]" />
      <div className="vz-pop absolute top-[6%] left-[33%] h-[110%] w-[34%] rounded-[4cqw] border border-white/15 bg-[#0c0c18] p-[1.6cqw] shadow-[0_40px_80px_-20px_rgb(0_0_0/0.9)]" style={d(0.1)}>
        <div className="h-full overflow-hidden rounded-[3cqw] bg-gradient-to-b from-[#3b1d6e] via-[#1a1640] to-[#0d0f24] p-[2cqw] text-white">
          <div className="flex justify-between text-[1.5cqw] text-white/70">
            <span>9:41</span>
            <span>●●●</span>
          </div>
          <p className="mt-[2cqw] text-[2.6cqw] font-semibold">Hi, Jordan</p>
          <p className="text-[1.5cqw] text-white/60">How can Max help today?</p>
          <div className="vz-pop mt-[2cqw] rounded-[1.6cqw] bg-white/10 p-[1.6cqw]" style={d(0.7)}>
            <span className="inline-flex items-center gap-[0.6cqw] rounded-full bg-[#4089f0] px-[1.2cqw] py-[0.3cqw] text-[1.3cqw]">
              <Sparkles className="size-[1.4cqw]" /> AI recommendation
            </span>
            <p className="mt-[1cqw] text-[1.8cqw] font-semibold">Post your winter offer</p>
            <p className="text-[1.3cqw] text-white/60">Searches for furnace repair are up 40% this week.</p>
          </div>
          <div className="mt-[1.6cqw] grid grid-cols-2 gap-[1.2cqw]">
            <div className="vz-pop rounded-[1.4cqw] bg-[#4089f0] p-[1.4cqw]" style={d(1.2)}>
              <p className="text-[1.3cqw]">Google profile</p>
              <p className="text-[2.4cqw] font-semibold">4.8★</p>
            </div>
            <div className="vz-pop rounded-[1.4cqw] bg-[#be185d] p-[1.4cqw]" style={d(1.4)}>
              <p className="text-[1.3cqw]">Website</p>
              <p className="text-[2.4cqw] font-semibold">15K</p>
            </div>
          </div>
        </div>
      </div>

      <div className="vz-card vz-pop top-[28%] right-[8%] flex items-center gap-[1.2cqw] rounded-[2cqw]" style={card(1.5, "rotateZ(6deg) rotateY(-14deg)", 6)}>
        <span className="grid size-[3.6cqw] place-items-center rounded-full bg-white/10">
          <Bell className="size-[1.8cqw]" />
        </span>
        <span className="text-[1.9cqw] font-medium">New call booked</span>
      </div>
      <div className="vz-card vz-pop bottom-[18%] left-[7%] flex items-center gap-[1.2cqw] rounded-[2cqw]" style={card(2, "rotateZ(-6deg) rotateY(14deg)", 7)}>
        <span className="grid size-[3.6cqw] place-items-center rounded-full bg-white/10">
          <Globe className="size-[1.8cqw]" />
        </span>
        <span className="text-[1.9cqw] font-medium">Synced with your dashboard</span>
      </div>
    </>
  );
}

/** PR distribution + email campaigns: press release sent, outlets, email stats */
function OutreachScene() {
  return (
    <>
      <Glow className="top-[5%] left-[20%] size-[30cqw] bg-[#db2777]" />
      <Glow className="bottom-[0%] right-[10%] size-[28cqw] bg-[#2563eb]" />
      <div className="vz-card vz-pop top-[10%] left-[7%] w-[46%]" style={card(0.2, "rotateY(10deg) rotateX(4deg)", 7.5)}>
        <p className="flex items-center gap-[1cqw] text-[2cqw] font-semibold">
          <Megaphone className="size-[2.2cqw] text-[#f472b6]" /> Press release distributed
        </p>
        <p className="mt-[0.6cqw] text-[1.6cqw] text-white/60">“Local HVAC leader launches 24/7 booking”</p>
        <div className="mt-[1.6cqw] flex flex-wrap gap-[0.8cqw]">
          {["News", "Local TV", "Business", "Industry", "Radio"].map((o, i) => (
            <span key={o} className="vz-pop rounded-full bg-white/10 px-[1.2cqw] py-[0.4cqw] text-[1.4cqw]" style={d(0.6 + i * 0.12)}>
              {o}
            </span>
          ))}
        </div>
        <p className="mt-[1.4cqw] text-[3.6cqw] leading-none font-semibold">120+<span className="ml-[1cqw] text-[1.6cqw] font-normal text-white/55">outlets reached</span></p>
      </div>
      <div className="vz-card light vz-pop top-[14%] right-[7%] w-[36%]" style={card(0.8, "rotateY(-16deg) rotateX(8deg) rotateZ(4deg)", 6)}>
        <p className="flex items-center gap-[1cqw] text-[2cqw] font-semibold">
          <Mail className="size-[2.2cqw] text-[#4089f0]" /> Spring campaign
        </p>
        <div className="mt-[1.4cqw] grid grid-cols-2 gap-[1.2cqw]">
          <div>
            <p className="text-[1.4cqw] text-black/50">Open rate</p>
            <p className="text-[3.4cqw] leading-none font-semibold">48%</p>
          </div>
          <div>
            <p className="text-[1.4cqw] text-black/50">Bookings</p>
            <p className="text-[3.4cqw] leading-none font-semibold text-[#16a34a]">+31</p>
          </div>
        </div>
      </div>
      <div className="vz-card vz-pop right-[10%] bottom-[9%] w-[48%]" style={card(1.4, "rotateY(-8deg)", 8)}>
        <Label>Authority score</Label>
        <div className="mt-[1cqw] flex flex-col gap-[1.2cqw]">
          {[["Mentions", 78], ["Backlinks", 64], ["AI citations", 52]].map(([n, v], i) => (
            <div key={String(n)}>
              <p className="mb-[0.5cqw] flex justify-between text-[1.5cqw] text-white/65">
                <span>{n}</span>
                <span className="text-white">{v}</span>
              </p>
              <Bar value={Number(v)} delay={1.7 + i * 0.2} tone={i === 0 ? "pink" : "brand"} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/** Competitor analysis: local map with pins, ranking table */
function CompetitorsScene() {
  const rows: [string, string, string][] = [
    ["Your business", "#1", "4.9★"],
    ["Northside Heating", "#2", "4.6★"],
    ["City Air Pros", "#3", "4.4★"],
    ["Comfort Kings", "#5", "4.1★"],
  ];
  return (
    <>
      <Glow className="top-[0%] left-[5%] size-[30cqw] bg-[#2563eb]" />
      <Glow className="bottom-[0%] right-[0%] size-[30cqw] bg-[#9333ea]" />
      <div className="vz-card vz-pop top-[9%] left-[6%] h-[62%] w-[46%] overflow-hidden p-0!" style={card(0.2, "rotateY(12deg) rotateX(5deg)", 8)}>
        <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/.05)_1px,transparent_1px)] bg-[size:3cqw_3cqw]" />
        <svg viewBox="0 0 100 70" className="absolute inset-0 size-full">
          <path d="M0 40 Q30 30 50 38 T100 30" stroke="rgb(255 255 255 / .12)" strokeWidth="3" fill="none" />
          <path d="M40 0 Q45 35 38 70" stroke="rgb(255 255 255 / .12)" strokeWidth="2.5" fill="none" />
        </svg>
        {[["44%", "48%", "#4ade80", 0.5], ["20%", "26%", "#f87171", 0.8], ["70%", "30%", "#f87171", 1], ["66%", "70%", "#f87171", 1.2], ["28%", "72%", "#f87171", 1.4]].map(([l, t, c, dl], i) => (
          <span key={i} className={i === 0 ? "vz-pop vz-pulse absolute size-[3cqw] rounded-full border-2 border-white" : "vz-pop absolute size-[2.2cqw] rounded-full border-2 border-white/70"} style={{ left: String(l), top: String(t), background: String(c), ...d(Number(dl)) }} />
        ))}
        <span className="absolute bottom-[1.4cqw] left-[1.6cqw] text-[1.5cqw] text-white/60">Map pack · 5 km radius</span>
      </div>
      <div className="vz-card vz-pop top-[12%] right-[6%] w-[42%]" style={card(0.7, "rotateY(-12deg) rotateX(4deg)", 7)}>
        <p className="flex items-center gap-[1cqw] text-[2cqw] font-semibold">
          <Trophy className="size-[2.2cqw] text-[#facc15]" /> Local ranking
        </p>
        <ul className="mt-[1.2cqw] flex flex-col gap-[0.9cqw] text-[1.6cqw]">
          {rows.map(([n, r, s], i) => (
            <li key={n} className={cn("vz-pop flex items-center justify-between rounded-[1cqw] px-[1cqw] py-[0.6cqw]", i === 0 ? "bg-[#4ade80]/15 text-white" : "text-white/70")} style={d(1 + i * 0.2)}>
              <span className="truncate">{n}</span>
              <span className="flex gap-[1.2cqw]">
                <span>{s}</span>
                <span className={i === 0 ? "font-semibold text-[#4ade80]" : ""}>{r}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="vz-card light vz-pop bottom-[8%] left-[20%] flex items-center gap-[1.2cqw]" style={card(1.9, "rotateY(8deg) rotateX(-4deg)", 6.5)}>
        <span className="grid size-[4cqw] place-items-center rounded-full bg-[#4089f0] text-white">
          <BarChart3 className="size-[2cqw]" />
        </span>
        <div>
          <p className="text-[1.9cqw] font-semibold">Keyword gap found</p>
          <p className="text-[1.5cqw] text-black/55">“emergency ac repair” · 3 competitors rank, you don&apos;t</p>
        </div>
      </div>
    </>
  );
}

const scenes: Record<VisualKind, () => React.ReactNode> = {
  search: SearchScene,
  website: WebsiteScene,
  gbp: GbpScene,
  analytics: AnalyticsScene,
  receptionist: ReceptionistScene,
  mobile: MobileScene,
  outreach: OutreachScene,
  competitors: CompetitorsScene,
  leads: LeadsScene,
  ads: AdsScene,
  seo: SeoScene,
  social: SocialScene,
  webdev: WebDevScene,
  appdev: AppDevScene,
};
