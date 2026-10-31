/**
 * CONTACT FORM HANDLER — receives the demo popup and contact page forms and
 * emails them to you through Hostinger SMTP.
 *
 * Settings come from environment variables (Hostinger hPanel → your website →
 * Environment variables, or a local .env.local file — see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, (optional) CONTACT_FROM
 */
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- validation ---------- */
const optional = (max: number) => z.string().trim().max(max).optional().default("");

const schema = z
  .object({
    form_type: z.enum(["demo", "contact", "sms"]).default("contact"),
    name: z.string().trim().min(2, "Please enter your name.").max(100),
    // email is optional only for the SMS opt-in form (checked below)
    email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email address.").max(150)]).optional().default(""),
    phone: z
      .string()
      .trim()
      .max(25)
      .regex(/^$|^[+()\-.\s\d]{7,25}$/, "Please enter a valid phone number.")
      .optional()
      .default(""),
    business: optional(150),
    website: optional(200),
    industry: optional(60),
    subject: optional(150),
    message: optional(3000),
    sms_consent: optional(5),
    source: optional(120),
    page: optional(200),
    company_site: optional(200), // honeypot — must stay empty
  })
  .superRefine((v, ctx) => {
    if (v.form_type === "demo" && v.business.length < 2) {
      ctx.addIssue({ code: "custom", path: ["business"], message: "Please enter your business name." });
    }
    if (v.form_type === "demo" && !v.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Please enter your phone number." });
    }
    if (v.form_type !== "sms" && !v.email) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Please enter a valid email address." });
    }
    if (v.form_type === "sms" && !v.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Please enter your mobile number." });
    }
    if (v.form_type === "sms" && v.sms_consent !== "yes") {
      ctx.addIssue({ code: "custom", path: ["sms_consent"], message: "Please tick the box to agree to text messages." });
    }
    if (v.form_type === "contact" && v.message.length < 5) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Please enter a short message." });
    }
  });

/* ---------- simple in-memory rate limit: 5 submissions per IP per 10 minutes ---------- */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const data = parsed.data;

  // Bot filled the hidden field: pretend success, send nothing.
  if (data.company_site) return NextResponse.json({ ok: true });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error("[contact] Missing SMTP environment variables");
    return NextResponse.json({ ok: false, message: "Email is not configured yet." }, { status: 500 });
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const label = { demo: "New audit / demo request", contact: "New contact message", sms: "New SMS opt-in" }[data.form_type];
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Business", data.business],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Website", data.website],
    ["Industry", data.industry],
    ["Subject", data.subject],
    ["Message", data.message],
    ["SMS consent", data.sms_consent === "yes" ? "Yes" : "No"],
    ["Button clicked", data.source],
    ["Page", data.page],
    ["IP", ip],
  ];
  const filled = rows.filter(([, v]) => v);

  try {
    await transporter.sendMail({
      from: `"Adboex Website" <${CONTACT_FROM || SMTP_USER}>`,
      to: CONTACT_TO,
      ...(data.email ? { replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>` } : {}),
      subject: `${label}: ${data.business || data.name}`,
      text: filled.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<h2 style="font-family:sans-serif">${label}</h2><table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${filled
        .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top"><b>${k}</b></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
        .join("")}</table>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Send failed", err);
    return NextResponse.json({ ok: false, message: "We couldn't send your message right now." }, { status: 502 });
  }
}
