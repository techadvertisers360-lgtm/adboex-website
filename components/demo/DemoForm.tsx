"use client";

import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/content/site";
import { Field, Honeypot } from "@/components/forms/Field";
import { useContactForm } from "@/components/forms/useContactForm";
import { Arrow } from "@/components/ui/Button";

/** The audit request form inside the demo popup. Posts to /api/contact. */
export function DemoForm({ source = "", idPrefix = "demo" }: { source?: string; idPrefix?: string }) {
  const c = site.demoPopup;
  const { status, errors, serverMessage, onSubmit } = useContactForm(["name", "business", "email", "phone"]);
  const id = (n: string) => `${idPrefix}-${n}`;

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle2 aria-hidden="true" className="size-12 text-lime" />
        <p className="type-h4">You&apos;re booked in.</p>
        <p className="max-w-sm text-copy">{c.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4">
      <input type="hidden" name="form_type" value="demo" />
      <input type="hidden" name="source" value={source} />
      <Honeypot />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id("name")} name="name" label="Full name" autoComplete="name" required error={errors.name} />
        <Field id={id("business")} name="business" label="Business name" autoComplete="organization" required error={errors.business} />
        <Field id={id("email")} name="email" label="Email" type="email" autoComplete="email" inputMode="email" required error={errors.email} />
        <Field id={id("phone")} name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" required error={errors.phone} />
        <Field id={id("website")} name="website" label="Website" type="url" autoComplete="url" inputMode="url" placeholder="yourbusiness.com" error={errors.website} />
        <Field id={id("industry")} name="industry" label="Industry" as="select" options={c.industries} placeholder="Select your industry" />
      </div>
      <Field id={id("message")} name="message" label="Anything we should know? (optional)" as="textarea" />

      <label htmlFor={id("consent")} className="flex items-start gap-3 text-xs leading-relaxed text-subtle">
        <input id={id("consent")} name="sms_consent" type="checkbox" value="yes" className="mt-0.5 size-4 shrink-0 accent-[var(--color-accent)]" />
        <span>
          {c.smsConsent} See our{" "}
          <Link href="/privacy-policy/" className="text-copy underline underline-offset-2 hover:text-title">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-of-use/" className="text-copy underline underline-offset-2 hover:text-title">
            Terms of Use
          </Link>
          .
        </span>
      </label>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70">
        {status === "sending" ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            {c.sending}
          </>
        ) : (
          <>
            {c.submit}
            <Arrow />
          </>
        )}
      </button>

      <p aria-live="polite" className="min-h-0 text-sm text-bad">
        {status === "error" && (serverMessage || c.error) + ` (${site.email})`}
      </p>
    </form>
  );
}
