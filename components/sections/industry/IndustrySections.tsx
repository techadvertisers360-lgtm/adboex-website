import {
  ArrowRight,
  BarChart3,
  Bell,
  Code2,
  FileText,
  Gauge,
  Globe,
  LayoutDashboard,
  Map,
  MapPin,
  Megaphone,
  MessageSquare,
  Mic,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Swords,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { fill, industryTemplate as t, type Industry } from "@/content/industries";
import { site } from "@/content/site";
import { DemoButton } from "@/components/demo/DemoButton";
import { Reveal } from "@/components/motion/Reveal";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { MonoLabel, TwoToneHeading } from "@/components/sections/industry/IndustryHero";
import { cn } from "@/lib/utils";

/* ---------- Demo frame (reference: big glowing product video) ---------- */
export function DemoFrame() {
  return (
    <section aria-label={t.demoVideoLabel} className="pb-8">
      <Reveal effect="zoom" className="container-x">
        <div className="relative rounded-[24px] border border-white/10 bg-[#0d0d14] p-3 shadow-[0_0_80px_-20px_rgb(64_137_240/0.55),0_0_120px_-40px_rgb(236_72_153/0.45)]">
          <ProductVisual kind="analytics" label={t.demoVideoLabel} className="rounded-[16px]" />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Problem: heading left + 4 stat cards (first one white) ---------- */
const statGradients = ["", "from-[#60a5fa] to-[#a855f7]", "from-[#818cf8] to-[#c084fc]", "from-[#e5e7eb] to-[#93c5fd]"];

export function Challenges({ industry }: { industry: Industry }) {
  const c = industry.challenges;
  return (
    <section aria-labelledby="challenges-heading" className="section">
      <div className="container-x">
        <Reveal stagger effect="left" className="flex max-w-[720px] flex-col items-start gap-5">
          <MonoLabel>{industry.hero.pill}</MonoLabel>
          <h2 id="challenges-heading" className="type-h2 tracking-[-0.06em]">
            <TwoToneHeading text={c.heading} />
          </h2>
          <p className="text-[15px] leading-[24px] text-[#c7c7c7]">{c.intro}</p>
        </Reveal>
        <Reveal stagger effect="zoom" as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item, i) => (
            <li key={item.title} className={cn("flex flex-col gap-3 rounded-[16px] p-6", i === 0 ? "bg-white text-[#131313]" : "border border-white/10 bg-[#161616] text-white")}>
              <span className={cn("text-[40px] leading-none font-medium tracking-[-0.05em]", i > 0 && `bg-gradient-to-r bg-clip-text text-transparent ${statGradients[i % 4]}`)}>{item.stat}</span>
              <h3 className={cn("mt-2 text-[15px] font-semibold", i === 0 ? "text-[#131313]" : "text-white")}>{item.title}</h3>
              <p className={cn("text-[13px] leading-[20px]", i === 0 ? "text-black/65" : "text-white/60")}>{item.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 7×7 geo-grid (red / amber / green cells pop in) ---------- */
function gridRanks(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => ((h = (h * 1103515245 + 12345) >>> 0) % 1000) / 1000;
  return Array.from({ length: 49 }, (_, i) => {
    const x = (i % 7) - 3;
    const y = Math.floor(i / 7) - 3;
    const dist = Math.sqrt(x * x + y * y);
    return Math.max(1, Math.round(1 + dist * 3.4 + rand() * 4 - 1.5));
  });
}
const cellTone = (r: number) => (r <= 3 ? "bg-[#3fb47a]" : r <= 10 ? "bg-[#d9a441]" : "bg-[#dc5a50]");

export function GeoGrid({ industry }: { industry: Industry }) {
  const g = industry.geoGrid;
  const ranks = gridRanks(industry.slug);
  return (
    <section aria-labelledby="geo-heading" className="section pt-0">
      <div className="container-x">
        <div className="grid items-center gap-10 rounded-[24px] border border-white/[0.06] bg-[#141414] p-6 md:p-12 lg:grid-cols-[1fr_480px]">
          <Reveal stagger effect="left" className="flex flex-col items-start gap-5">
            <MonoLabel>{t.geoPill}</MonoLabel>
            <h2 id="geo-heading" className="text-[28px] leading-[1.2] font-medium tracking-[-0.05em] text-white md:text-[32px] md:leading-[40px]">
              {g.heading}
            </h2>
            <p className="text-[15px] leading-[24px] text-[#c7c7c7]">{g.text}</p>
            <ul className="flex flex-wrap gap-5 font-mono text-[11px] tracking-[0.14em] text-white/70 uppercase">
              {t.geoLegend.map((l, i) => (
                <li key={l.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className={cn("size-3 rounded-[3px]", i === 0 ? "bg-[#3fb47a]" : i === 1 ? "bg-[#d9a441]" : "bg-[#dc5a50]")} />
                  {l.label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal effect="zoom">
            <figure className="rounded-[16px] border border-white/10 bg-[#1a1a24] p-4 md:p-5">
              <figcaption className="mb-4 flex items-center justify-between font-mono text-[11px] text-white/60">
                <span>
                  tracking <span className="text-white">{industry.hero.keywords[0]}</span>
                </span>
                <span className="flex items-center gap-1.5 tracking-[0.14em] uppercase">
                  <span aria-hidden="true" className="size-2 bg-lime" />
                  7×7 grid
                </span>
              </figcaption>
              <div
                role="img"
                aria-label={`Example geo-grid for ${g.city}: rank 1 to 3 near the business, dropping further out.`}
                data-reveal-stagger="zoom"
                style={{ "--reveal-stagger": ".018s", "--fx-duration": ".6s" } as React.CSSProperties}
                className="grid aspect-square grid-cols-7 gap-1.5 md:gap-2"
              >
                {ranks.map((r, i) => (
                  <span key={i} aria-hidden="true" className={cn("grid place-items-center rounded-[8px] text-[11px] font-semibold text-white md:text-[13px]", i === 24 ? "bg-[#3fb47a] ring-2 ring-white/80" : cellTone(r))}>
                    {i === 24 ? <MapPin className="size-4" /> : r > 20 ? "20" : r}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-white/40">{t.geoNote}</p>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- The full system: 4 rows (label left, 2×2 feature cards right) ---------- */
const pillarIcons: LucideIcon[][] = [
  [FileText, Map, Search, BarChart3],
  [Megaphone, Star, ShieldCheck, Sparkles],
  [Wrench, Gauge, Globe, Smartphone],
  [Swords, LayoutDashboard, Bell, Code2],
];

export function FullSystem({ industry }: { industry: Industry }) {
  const s = t.system;
  return (
    <section aria-labelledby="system-heading" className="section pt-0">
      <div className="container-x">
        <Reveal stagger className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
          <MonoLabel>{s.pill}</MonoLabel>
          <h2 id="system-heading" className="type-h2 tracking-[-0.06em]">
            {fill(s.heading, industry.name)}
          </h2>
          <p className="text-[15px] leading-[24px] text-[#c7c7c7]">{s.text}</p>
        </Reveal>
        <div className="mt-14 flex flex-col gap-14">
          {s.pillars.map((p, pi) => (
            <div key={p.number} className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-10">
              <Reveal stagger effect="left" className="flex flex-col gap-3">
                <p className="font-mono text-[12px] tracking-[0.14em] text-lime uppercase">
                  {p.number} — {p.title}
                </p>
                <h3 className="text-[24px] leading-[1.25] font-medium tracking-[-0.04em] text-white">{p.subtitle}</h3>
              </Reveal>
              <Reveal stagger effect="zoom" as="ul" className="grid gap-4 sm:grid-cols-2">
                {p.cards.map((c, ci) => {
                  const Icon = pillarIcons[pi]?.[ci] ?? Sparkles;
                  return (
                    <li key={c.title} className="flex flex-col gap-3 rounded-[16px] border border-white/[0.06] bg-[#161616] p-6 transition-colors hover:border-white/15">
                      <p className="flex items-center gap-3">
                        <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-lime text-white">
                          <Icon className="size-4" />
                        </span>
                        <span className="text-[15px] font-semibold text-white">{c.title}</span>
                      </p>
                      <p className="text-[13px] leading-[20px] text-white/60">{fill(c.text, industry.name)}</p>
                    </li>
                  );
                })}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Meet Max: AI agent card + chat widget ---------- */
export function Receptionist({ industry }: { industry: Industry }) {
  const r = industry.receptionist;
  const ui = t.chatUi;
  // last sentence of the heading in blue (reference: "…every call. Ash can.")
  const parts = r.heading.split(/(?<=[.!?])\s+/);
  const last = parts.length > 1 ? parts.pop() : "";
  return (
    <section aria-labelledby="receptionist-heading" className="section pt-0">
      <div className="container-x">
        <div className="grid items-center gap-10 rounded-[24px] border border-white/[0.06] bg-[#141414] p-6 md:p-12 lg:grid-cols-2">
          <Reveal stagger effect="left" className="flex flex-col items-start gap-5">
            <MonoLabel>{t.receptionistPill}</MonoLabel>
            <h2 id="receptionist-heading" className="text-[32px] leading-[1.15] font-medium tracking-[-0.05em] text-white md:text-[44px] md:leading-[52px]">
              {parts.join(" ")} {last && <span className="text-lime">{last}</span>}
            </h2>
            <p className="text-[15px] leading-[24px] text-[#c7c7c7]">{r.text}</p>
            <ul className="flex flex-col gap-3">
              {r.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14px] text-white/85">
                  <ArrowRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-lime" />
                  {b}
                </li>
              ))}
            </ul>
            <DemoButton variant="blue" arrow={false} source={`${industry.name} receptionist`} className="mt-2">
              {t.receptionistCta}
            </DemoButton>
          </Reveal>
          <Reveal effect="zoom">
            <figure className="mx-auto flex max-w-[480px] flex-col overflow-hidden rounded-[16px] border border-white/10 bg-[#15151c]" aria-label={`Example AI agent conversation for a ${industry.name} business`}>
              <div className="flex items-center justify-between border-b border-white/[0.06] p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-[10px] bg-[linear-gradient(135deg,#6366f1,#a855f7)] font-semibold text-white">M</span>
                  <div>
                    <p className="flex items-center gap-2 text-[14px] font-semibold text-white">
                      {ui.name}
                      <span className="size-1.5 rounded-full bg-[#4ade80]" aria-hidden="true" />
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.06em] text-white/45">
                      Your AI Agent · 24/7 {industry.name}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-white/45">{ui.status}</span>
              </div>
              <div className="flex gap-1 p-4 pb-0 text-[12px]" aria-hidden="true">
                <span className="flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-white/55">
                  <Mic className="size-3.5" />
                  {ui.voice}
                </span>
                <span className="flex items-center gap-1.5 rounded-[8px] bg-lime px-3 py-1.5 text-white">
                  <MessageSquare className="size-3.5" />
                  {ui.chat}
                </span>
              </div>
              <div data-reveal-stagger="" style={{ "--reveal-stagger": ".6s", "--reveal-distance": "14px" } as React.CSSProperties} className="flex flex-col gap-3 p-4">
                <div className="max-w-[88%] rounded-[12px] bg-[#1e2a4a] px-4 py-3">
                  <p className="font-mono text-[10px] tracking-[0.08em] text-white/45 uppercase">Customer</p>
                  <p className="mt-1 text-[13px] text-white">{r.chat.visitor}</p>
                </div>
                <div className="max-w-[88%] self-end rounded-[12px] bg-white/[0.06] px-4 py-3">
                  <p className="font-mono text-[10px] tracking-[0.08em] text-white/45 uppercase">{ui.name}</p>
                  <p className="mt-1 text-[13px] text-white">{r.chat.reply}</p>
                </div>
                <div className="flex items-center gap-2 rounded-[10px] bg-[#4ade80]/10 px-4 py-2.5 text-[12px] font-medium text-[#4ade80]">
                  <span className="size-1.5 rounded-full bg-[#4ade80]" aria-hidden="true" />
                  {ui.leadSent}: {r.chat.lead}
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Seasons: text + demand chart (solid blue = with Adboex, dashed red = without) ---------- */
export function Seasons({ industry }: { industry: Industry }) {
  const s = industry.seasons;
  const n = s.items.length;
  // demand curve follows the peak months; the "without" line dips where demand peaks
  const ys = s.items.map((it) => (it.peak ? 30 : 75));
  const xs = s.items.map((_, i) => 30 + (i * 440) / Math.max(1, n - 1));
  const path = (vals: number[]) =>
    vals.reduce((d, y, i) => {
      if (i === 0) return `M${xs[0]} ${y}`;
      const cx = (xs[i - 1] + xs[i]) / 2;
      return `${d} C${cx} ${vals[i - 1]} ${cx} ${y} ${xs[i]} ${y}`;
    }, "");
  const withUs = path(ys.map((y) => y - 10));
  const without = path(ys.map((y) => 160 - y * 0.9));
  return (
    <section aria-labelledby="seasons-heading" className="section pt-0">
      <div className="container-x">
        <div className="grid items-center gap-10 rounded-[24px] border border-white/[0.06] bg-[#141414] p-6 md:p-12 lg:grid-cols-[1fr_480px]">
          <Reveal stagger effect="left" className="flex flex-col items-start gap-5">
            <MonoLabel>{t.seasonsPill}</MonoLabel>
            <h2 id="seasons-heading" className="text-[32px] leading-[1.15] font-medium tracking-[-0.05em] text-white md:text-[44px] md:leading-[52px]">
              {s.heading}
            </h2>
            <p className="text-[15px] leading-[24px] text-[#c7c7c7]">{s.text}</p>
          </Reveal>
          <Reveal effect="zoom">
            <figure className="rounded-[16px] border border-white/10 bg-[#1a1a2a] p-5" aria-label={`Seasonal demand for ${industry.name} services: ${s.items.filter((i) => i.peak).map((i) => i.label).join(", ")} are peak periods.`}>
              <svg viewBox="0 0 500 170" className="w-full" aria-hidden="true">
                <path d={without} fill="none" stroke="#f87171" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" className="season-line" style={{ "--len": 1400 } as React.CSSProperties} />
                <path d={withUs} fill="none" stroke="#4089f0" strokeWidth="3" strokeLinecap="round" className="season-line" style={{ "--len": 1400, animationDelay: ".3s" } as React.CSSProperties} />
              </svg>
              <figcaption className="mt-2 flex justify-between font-mono text-[9px] tracking-[0.1em] text-white/45 uppercase md:text-[10px]">
                {s.items.map((it) => (
                  <span key={it.label} className={it.peak ? "text-white/80" : undefined}>
                    {it.label}
                  </span>
                ))}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Integrations: centred heading + 3 pills ---------- */
export function Integrations() {
  const i = t.integrations;
  return (
    <section aria-labelledby="integrations-heading" className="section pb-0">
      <Reveal stagger className="container-x flex flex-col items-center gap-6 text-center">
        <MonoLabel>{i.pill}</MonoLabel>
        <h2 id="integrations-heading" className="type-h2 tracking-[-0.06em]">
          {i.heading}
        </h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {i.items.map((item) => (
            <li key={item.name} className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1b1b1b] px-5 py-2.5 text-[14px] text-white">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-lime" />
              {item.name}
            </li>
          ))}
        </ul>
        <p className="text-[14px] text-white/60">{i.caption}</p>
      </Reveal>
    </section>
  );
}

/* ---------- Closing CTA banner (gradient card, white button, phone) ---------- */
export function IndustryCta({ industry }: { industry: Industry }) {
  return (
    <section aria-labelledby="industry-cta-heading" className="section pt-0">
      <div className="container-x">
        <Reveal effect="zoom" className="relative overflow-hidden rounded-[24px] bg-[#141414] px-6 py-16 text-center md:py-20">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_90%_at_15%_10%,rgb(64_137_240/0.55),transparent_60%),radial-gradient(50%_80%_at_45%_0%,rgb(168_85_247/0.45),transparent_60%),radial-gradient(40%_70%_at_60%_10%,rgb(236_72_153/0.25),transparent_60%)]" />
          <div className="relative mx-auto flex max-w-[640px] flex-col items-center gap-5">
            <h2 id="industry-cta-heading" className="type-h2 tracking-[-0.06em] text-white">
              {industry.cta.heading}
            </h2>
            <p className="text-[15px] leading-[24px] text-white/85">{industry.cta.text}</p>
            <DemoButton variant="light" arrow={false} source={`${industry.name} closing CTA`} className="mt-2">
              Book a Live Demo
            </DemoButton>
            <p className="text-[13px] text-white/70">
              {t.ctaNote}{" "}
              <a href={`tel:${site.phone.tel}`} className="text-lime hover:underline">
                {site.phone.display}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
