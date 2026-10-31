/**
 * Animated scenes for the extra services (Lead generation, Google Ads, SEO,
 * Social media, Web development, App development). Each has its own layout
 * and colour theme (set in ProductVisual → themes). Same animation system as
 * the other scenes: pieces fly in once when visible, then float gently.
 */
import { Bell, Code2, Heart, MessageCircle, Search, Send, Smartphone, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bar, card, d, Glow, Label, Ring } from "./sceneKit";

/** Lead generation: funnel + new leads arriving */
export function LeadsScene() {
  const funnel: [string, string, number][] = [
    ["Visitors", "2,480", 100],
    ["Inquiries", "312", 74],
    ["Qualified", "148", 52],
    ["Booked jobs", "64", 34],
  ];
  const leads: [string, string, string][] = [
    ["Sarah K.", "AC repair · Plano", "2 min ago"],
    ["Mike R.", "Water heater · Frisco", "9 min ago"],
    ["Ana L.", "Roof inspection · Allen", "21 min ago"],
  ];
  return (
    <>
      <Glow className="top-[5%] right-[10%] size-[30cqw] bg-[#14b8a6]" />
      <Glow className="bottom-[0%] left-[10%] size-[26cqw] bg-[#2563eb]" />
      <div className="vz-card vz-pop top-[10%] left-[6%] w-[46%]" style={card(0.2, "rotateY(12deg) rotateX(4deg)", 8)}>
        <p className="text-[2.1cqw] font-semibold">Lead funnel · this month</p>
        <div className="mt-[1.6cqw] flex flex-col gap-[1cqw]">
          {funnel.map(([n, v, w], i) => (
            <div key={n} className="flex items-center gap-[1.4cqw]">
              <span className="w-[30%] text-[1.5cqw] text-white/60">{n}</span>
              <div className="flex flex-1 justify-center">
                <div className="vz-fill-x h-[3.2cqw] rounded-[0.8cqw] bg-gradient-to-r from-[#14b8a6] to-[#4089f0]" style={{ width: `${w}%`, transformOrigin: "center", ...d(0.5 + i * 0.2) }} />
              </div>
              <span className="w-[16%] text-right text-[1.7cqw] font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-[9%] right-[6%] flex w-[40%] flex-col gap-[1.4cqw]">
        {leads.map(([n, svc, t], i) => (
          <div key={n} className="vz-card vz-pop relative! flex items-center gap-[1.2cqw]" style={card(0.9 + i * 0.45, i % 2 ? "rotateY(-8deg)" : "rotateY(-12deg)", 6 + i)}>
            <span className="grid size-[4cqw] shrink-0 place-items-center rounded-full bg-[#14b8a6]/25 text-[#5eead4]">
              <UserPlus className="size-[2cqw]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[1.8cqw] font-semibold">New lead · {n}</p>
              <p className="truncate text-[1.5cqw] text-white/55">
                {svc} · {t}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="vz-card light vz-pop bottom-[9%] left-[12%] flex items-center gap-[1.4cqw]" style={card(2.4, "rotateY(10deg) rotateX(-4deg)", 6.5)}>
        <span className="text-[4.2cqw] leading-none font-semibold text-[#0d9488]">+38%</span>
        <span className="text-[1.6cqw] leading-tight text-black/60">
          more leads
          <br />
          than last month
        </span>
      </div>
      <div className="vz-card vz-pop right-[8%] bottom-[10%] w-[34%]" style={card(2.8, "rotateY(-10deg) rotateX(-4deg)", 7.5)}>
        <Label>Avg. response time</Label>
        <p className="mt-[0.4cqw] text-[3.4cqw] leading-none font-semibold text-[#5eead4]">12 sec</p>
        <div className="mt-[1cqw]">
          <Bar value={92} delay={3.1} tone="lime" />
        </div>
      </div>
    </>
  );
}

/** Google Ads: sponsored result preview, budget ring, campaign stats */
export function AdsScene() {
  const stats: [string, string, number][] = [
    ["CTR", "6.8%", 68],
    ["Cost / click", "$2.14", 42],
    ["Conversions", "142", 86],
  ];
  return (
    <>
      <Glow className="top-[0%] right-[10%] size-[30cqw] bg-[#f59e0b]" />
      <Glow className="bottom-[0%] left-[5%] size-[28cqw] bg-[#2563eb]" />
      <div className="vz-card light vz-pop top-[8%] left-[6%] w-[54%]" style={card(0.2, "rotateY(10deg) rotateX(5deg)", 8)}>
        <div className="flex items-center gap-[1cqw] rounded-full bg-black/[0.05] px-[1.6cqw] py-[0.8cqw] text-[1.6cqw] text-black/60">
          <Search className="size-[1.8cqw]" /> emergency plumber near me
        </div>
        <p className="mt-[1.6cqw] text-[1.4cqw] font-semibold text-black/80">
          Sponsored <span className="font-normal text-black/50">· ortizplumbing.com</span>
        </p>
        <p className="mt-[0.4cqw] text-[2.3cqw] leading-tight font-semibold text-[#1a0dab]">24/7 Emergency Plumber — Book in 60 Seconds</p>
        <p className="mt-[0.6cqw] text-[1.5cqw] leading-snug text-black/60">Licensed local plumbers. Upfront pricing. Same-day service across your area.</p>
        <p className="mt-[0.8cqw] text-[1.4cqw] text-[#f59e0b]">
          ★★★★★ <span className="text-black/50">4.9 (212)</span>
        </p>
      </div>
      <div className="vz-card vz-pop top-[11%] right-[6%] flex w-[30%] flex-col items-center" style={card(0.8, "rotateY(-14deg) rotateX(6deg)", 6.5)}>
        <Label>Budget used</Label>
        <div className="relative mt-[0.8cqw] grid place-items-center">
          <Ring value={72} delay={1} size={13} />
          <span className="absolute text-[3cqw] font-semibold">72%</span>
        </div>
        <p className="mt-[0.8cqw] text-center text-[1.4cqw] text-white/55">$1,080 of $1,500 · on pace</p>
      </div>
      <div className="vz-card vz-pop bottom-[7%] left-[18%] grid w-[64%] grid-cols-3 gap-[1.6cqw]" style={card(1.4, "rotateY(6deg) rotateX(-3deg)", 7.5)}>
        {stats.map(([k, v, w], i) => (
          <div key={k}>
            <Label>{k}</Label>
            <p className="mt-[0.4cqw] text-[3.2cqw] leading-none font-semibold">{v}</p>
            <div className="mt-[1cqw]">
              <Bar value={w} delay={1.7 + i * 0.2} tone={i === 2 ? "lime" : "brand"} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** SEO: search box typing, results with you at #1, rank chart improving */
export function SeoScene() {
  const results: [string, string, boolean][] = [
    ["Bell Heating & Air", "bellheating.com", true],
    ["Northside Heating", "northsideheat.com", false],
    ["City Air Pros", "cityairpros.com", false],
  ];
  return (
    <>
      <Glow className="top-[0%] left-[30%] size-[32cqw] bg-[#22c55e]" />
      <Glow className="bottom-[0%] right-[5%] size-[28cqw] bg-[#0ea5e9]" />
      <div className="vz-card light vz-pop top-[7%] left-[8%] flex w-[56%] items-center gap-[1.2cqw] rounded-full py-[1.4cqw]" style={card(0.2, "rotateY(8deg)", 7)}>
        <Search className="size-[2.2cqw] text-black/50" />
        <span className="text-[2cqw] text-black/80">
          ac repair near me
          <span className="vz-caret" />
        </span>
      </div>
      <div className="vz-card vz-pop top-[26%] left-[8%] w-[56%]" style={card(0.6, "rotateY(10deg) rotateX(4deg)", 8)}>
        <ul className="flex flex-col gap-[1.2cqw]">
          {results.map(([n, url, you], i) => (
            <li key={n} className={cn("vz-pop rounded-[1.2cqw] p-[1.2cqw]", you && "bg-[#22c55e]/15 ring-1 ring-[#22c55e]/40")} style={d(0.9 + i * 0.25)}>
              <p className="flex items-center justify-between text-[1.4cqw] text-white/50">
                {url}
                {you && <span className="rounded-full bg-[#22c55e] px-[1cqw] py-[0.2cqw] text-[1.3cqw] font-bold text-black">#1 ↑ 7</span>}
              </p>
              <p className={cn("text-[2cqw] font-semibold", you ? "text-[#86efac]" : "text-[#93c5fd]")}>{n}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="vz-card vz-pop top-[13%] right-[6%] w-[28%]" style={card(1.2, "rotateY(-14deg) rotateX(6deg)", 6.5)}>
        <Label>Google position</Label>
        <svg viewBox="0 0 120 80" className="mt-[1cqw] w-full">
          <path
            d="M4 10 C30 14 40 30 60 44 S100 68 116 72"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="vz-draw"
            style={{ "--len": 160, ...d(1.5) } as React.CSSProperties}
          />
        </svg>
        <p className="flex justify-between text-[1.4cqw] text-white/50">
          <span>#18</span>
          <span className="font-semibold text-[#86efac]">#1</span>
        </p>
      </div>
      <div className="vz-card light vz-pop right-[8%] bottom-[9%] w-[30%]" style={card(1.9, "rotateY(-10deg)", 7)}>
        <p className="text-[3.6cqw] leading-none font-semibold text-[#16a34a]">+214%</p>
        <p className="mt-[0.4cqw] text-[1.5cqw] text-black/60">organic traffic in 90 days</p>
      </div>
    </>
  );
}

/** Social media: post card with likes, weekly content calendar, reach */
export function SocialScene() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <>
      <Glow className="top-[0%] right-[15%] size-[32cqw] bg-[#ec4899]" />
      <Glow className="bottom-[0%] left-[5%] size-[28cqw] bg-[#f97316]" />
      <div className="vz-card light vz-pop top-[6%] left-[33%] w-[34%] p-[1.4cqw]!" style={card(0.2, "rotateY(-6deg) rotateX(6deg)", 8)}>
        <div className="flex items-center gap-[1cqw]">
          <span className="size-[3.4cqw] rounded-full bg-gradient-to-br from-[#f97316] to-[#ec4899] p-[0.3cqw]">
            <span className="block size-full rounded-full border-2 border-white bg-[#111]" />
          </span>
          <span className="text-[1.7cqw] font-semibold">bellheating</span>
        </div>
        <div className="mt-[1.2cqw] grid aspect-square place-items-center rounded-[1.2cqw] bg-gradient-to-br from-[#f97316] via-[#ec4899] to-[#8b5cf6] p-[2cqw] text-center">
          <p className="text-[2.8cqw] leading-tight font-bold text-white">Spring tune-up 20% off</p>
        </div>
        <div className="mt-[1.2cqw] flex items-center gap-[1.6cqw] text-black/70">
          <Heart className="vz-blink size-[2.4cqw] fill-[#ef4444] text-[#ef4444]" />
          <MessageCircle className="size-[2.4cqw]" />
          <Send className="size-[2.4cqw]" />
          <span className="ml-auto text-[1.5cqw] font-semibold">1,284 likes</span>
        </div>
      </div>
      <div className="vz-card vz-pop top-[13%] left-[5%] w-[25%]" style={card(0.8, "rotateY(14deg) rotateX(4deg)", 6.5)}>
        <Label>This week</Label>
        <div className="mt-[1cqw] grid grid-cols-7 gap-[0.5cqw] text-center text-[1.3cqw] text-white/50">
          {days.map((day, i) => (
            <span key={i} className="flex flex-col items-center gap-[0.6cqw]">
              {day}
              <span className={cn("vz-pop size-[1.6cqw] rounded-full", [0, 2, 3, 5].includes(i) ? "bg-[#ec4899]" : "bg-white/10")} style={d(1.1 + i * 0.1)} />
            </span>
          ))}
        </div>
        <p className="mt-[1cqw] text-[1.4cqw] text-white/60">4 posts scheduled</p>
      </div>
      <div className="vz-card vz-pop right-[5%] bottom-[12%] w-[28%]" style={card(1.4, "rotateY(-14deg)", 7)}>
        <Label>Reach</Label>
        <p className="mt-[0.4cqw] text-[3.6cqw] leading-none font-semibold text-[#f9a8d4]">+212%</p>
        <div className="mt-[1.2cqw] flex h-[5cqw] items-end gap-[0.6cqw]">
          {[30, 38, 34, 52, 60, 74, 92].map((h, i) => (
            <span key={i} className="vz-fill-y flex-1 rounded-t-[0.5cqw] bg-gradient-to-t from-[#f97316] to-[#ec4899]" style={{ height: `${h}%`, ...d(1.7 + i * 0.07) }} />
          ))}
        </div>
      </div>
      <div className="vz-card vz-pop bottom-[9%] left-[7%] flex items-center gap-[1cqw] rounded-full py-[1.2cqw]" style={card(2, "rotateZ(-5deg) rotateY(10deg)", 6)}>
        <Heart className="size-[2cqw] fill-[#ef4444] text-[#ef4444]" />
        <span className="text-[1.7cqw]">38 new followers today</span>
      </div>
    </>
  );
}

/** Web development: browser building itself, Lighthouse scores, code */
export function WebDevScene() {
  const scores: [string, number][] = [
    ["Speed", 99],
    ["SEO", 100],
    ["Access", 98],
  ];
  return (
    <>
      <Glow className="top-[0%] right-[10%] size-[30cqw] bg-[#06b6d4]" />
      <Glow className="bottom-[0%] left-[10%] size-[30cqw] bg-[#6366f1]" />
      <div className="vz-card vz-pop top-[8%] left-[5%] h-[66%] w-[58%] overflow-hidden p-0!" style={card(0.2, "rotateY(12deg) rotateX(5deg)", 8.5)}>
        <div className="flex items-center gap-[0.8cqw] border-b border-white/10 px-[1.6cqw] py-[1.2cqw]">
          <span className="size-[1.2cqw] rounded-full bg-[#f87171]" />
          <span className="size-[1.2cqw] rounded-full bg-[#fbbf24]" />
          <span className="size-[1.2cqw] rounded-full bg-[#4ade80]" />
          <span className="ml-[1cqw] flex-1 rounded-full bg-white/10 px-[1.4cqw] py-[0.3cqw] text-[1.3cqw] text-white/60">yourbusiness.com</span>
        </div>
        <div className="flex flex-col gap-[1.2cqw] p-[1.8cqw]">
          <div className="vz-pop h-[9cqw] rounded-[1cqw] bg-gradient-to-r from-[#06b6d4]/60 to-[#6366f1]/60 p-[1.4cqw]" style={d(0.6)}>
            <span className="block h-[1.6cqw] w-[55%] rounded-full bg-white/80" />
            <span className="mt-[0.8cqw] block h-[1cqw] w-[38%] rounded-full bg-white/50" />
            <span className="mt-[1.2cqw] block h-[2cqw] w-[18%] rounded-full bg-white" />
          </div>
          <div className="grid grid-cols-3 gap-[1cqw]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="vz-pop h-[6cqw] rounded-[0.8cqw] bg-white/10" style={d(1 + i * 0.2)} />
            ))}
          </div>
          <span className="vz-pop h-[3cqw] w-[70%] rounded-[0.8cqw] bg-white/[0.07]" style={d(1.7)} />
        </div>
      </div>
      <div className="vz-card vz-pop top-[10%] right-[5%] w-[31%]" style={card(1, "rotateY(-14deg) rotateX(6deg)", 6.5)}>
        <Label>Lighthouse</Label>
        <div className="mt-[1cqw] grid grid-cols-3 gap-[0.8cqw]">
          {scores.map(([n, v], i) => (
            <div key={n} className="flex flex-col items-center gap-[0.4cqw]">
              <div className="relative grid place-items-center">
                <Ring value={v} delay={1.3 + i * 0.2} size={7.5} />
                <span className="absolute text-[1.7cqw] font-semibold text-[#86efac]">{v}</span>
              </div>
              <span className="text-[1.2cqw] text-white/55">{n}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="vz-card vz-pop right-[6%] bottom-[8%] w-[37%] font-mono" style={card(1.8, "rotateY(-10deg)", 7.5)}>
        <p className="flex items-center gap-[0.8cqw] text-[1.6cqw] text-[#67e8f9]">
          <Code2 className="size-[1.8cqw]" /> page.tsx
        </p>
        <p className="mt-[0.8cqw] text-[1.4cqw] leading-relaxed text-white/75">
          <span className="text-[#c4b5fd]">{"<Hero"}</span> <span className="text-[#fcd34d]">title</span>=<span className="text-[#86efac]">{'"Book today"'}</span>{" "}
          <span className="text-[#c4b5fd]">{"/>"}</span>
          <br />
          <span className="text-[#c4b5fd]">{"<Services"}</span> <span className="text-[#fcd34d]">city</span>=<span className="text-[#86efac]">{'"Dallas"'}</span>{" "}
          <span className="text-[#c4b5fd]">{"/>"}</span>
          <span className="vz-caret" />
        </p>
      </div>
    </>
  );
}

/** App development: booking app screen, App Store card, push notification */
export function AppDevScene() {
  const slots = ["9:00", "10:30", "1:00", "3:30"];
  return (
    <>
      <Glow className="top-[5%] left-[35%] size-[38cqw] bg-[#8b5cf6]" />
      <Glow className="bottom-[0%] right-[5%] size-[26cqw] bg-[#d946ef]" />
      <div
        className="vz-pop absolute top-[6%] left-[8%] h-[112%] w-[32%] rounded-[4cqw] border border-white/15 bg-[#0c0c18] p-[1.4cqw] shadow-[0_40px_80px_-20px_rgb(0_0_0/0.9)]"
        style={d(0.1)}
      >
        <div className="h-full overflow-hidden rounded-[3cqw] bg-gradient-to-b from-[#2e1065] to-[#0f0a1f] p-[1.8cqw] text-white">
          <div className="flex justify-between text-[1.3cqw] text-white/70">
            <span>9:41</span>
            <span>●●●</span>
          </div>
          <p className="mt-[1.6cqw] text-[2.3cqw] font-semibold">Book a visit</p>
          <p className="text-[1.3cqw] text-white/60">Tuesday, May 14</p>
          <div className="mt-[1.6cqw] grid grid-cols-2 gap-[1cqw]">
            {slots.map((t, i) => (
              <span key={t} className={cn("vz-pop rounded-[1cqw] py-[1cqw] text-center text-[1.6cqw]", i === 1 ? "bg-[#8b5cf6] font-semibold" : "bg-white/10")} style={d(0.6 + i * 0.12)}>
                {t}
              </span>
            ))}
          </div>
          <span className="vz-pop mt-[1.8cqw] block rounded-full bg-white py-[1.1cqw] text-center text-[1.6cqw] font-semibold text-[#2e1065]" style={d(1.2)}>
            Confirm booking
          </span>
        </div>
      </div>
      <div className="vz-card light vz-pop top-[13%] right-[7%] w-[40%]" style={card(1, "rotateY(-14deg) rotateX(6deg)", 7)}>
        <div className="flex items-center gap-[1.2cqw]">
          <span className="grid size-[5.4cqw] place-items-center rounded-[1.4cqw] bg-gradient-to-br from-[#8b5cf6] to-[#d946ef] text-white">
            <Smartphone className="size-[2.6cqw]" />
          </span>
          <div>
            <p className="text-[2cqw] font-semibold">Bell Heating</p>
            <p className="text-[1.4cqw] text-black/50">Home Services</p>
          </div>
        </div>
        <div className="mt-[1.4cqw] flex items-center justify-between">
          <p className="text-[1.5cqw] text-black/60">
            <span className="text-[2.6cqw] font-semibold text-black">4.9</span> ★★★★★
          </p>
          <span className="rounded-full bg-[#4089f0] px-[1.6cqw] py-[0.6cqw] text-[1.4cqw] font-semibold text-white">GET</span>
        </div>
      </div>
      <div className="vz-card vz-pop right-[9%] bottom-[30%] flex w-[42%] items-center gap-[1.2cqw] rounded-[2cqw]" style={card(1.7, "rotateY(-10deg)", 6)}>
        <span className="grid size-[3.6cqw] shrink-0 place-items-center rounded-[1cqw] bg-[#8b5cf6]">
          <Bell className="size-[1.8cqw]" />
        </span>
        <div>
          <p className="text-[1.7cqw] font-semibold">New booking</p>
          <p className="text-[1.4cqw] text-white/60">Tue 10:30 AM · Sarah K.</p>
        </div>
      </div>
      <div className="vz-card vz-pop right-[12%] bottom-[9%] flex gap-[2cqw]" style={card(2.2, "rotateY(-6deg) rotateX(-4deg)", 7.5)}>
        {["iOS", "Android", "Web"].map((p) => (
          <span key={p} className="text-[1.6cqw] text-white/75">
            <span className="text-[#c4b5fd]">✓</span> {p}
          </span>
        ))}
      </div>
    </>
  );
}
