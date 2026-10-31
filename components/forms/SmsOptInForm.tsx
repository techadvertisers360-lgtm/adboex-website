"use client";

import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { smsOptIn as t } from "@/content/legal";
import { Honeypot } from "@/components/forms/Field";
import { useContactForm } from "@/components/forms/useContactForm";

/** SMS opt-in (reference: light inputs on the dark page). Posts to /api/contact (form_type=sms). */
export function SmsOptInForm() {
  const { status, errors, serverMessage, onSubmit } = useContactForm(["phone", "name", "sms_consent"]);

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle2 aria-hidden="true" className="size-12 text-lime" />
        <p className="max-w-sm text-white">{t.success}</p>
      </div>
    );
  }

  const input = "h-10 w-full rounded-[6px] border border-black/10 bg-white px-3 text-[14px] text-[#131313] placeholder:text-black/40 focus:outline-2 focus:outline-lime";
  const err = (name: string) =>
    errors[name] ? (
      <span id={`sms-${name}-error`} className="text-[12px] text-bad">
        {errors[name]}
      </span>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4">
      <input type="hidden" name="form_type" value="sms" />
      <input type="hidden" name="source" value="SMS opt-in page" />
      <Honeypot />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="sms-phone" className="text-[12px] font-semibold text-white">
          {t.phoneLabel}
        </label>
        <input id="sms-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={t.phonePlaceholder} aria-required aria-invalid={errors.phone ? true : undefined} aria-describedby={errors.phone ? "sms-phone-error" : undefined} className={input} />
        {err("phone")}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="sms-name" className="text-[12px] font-semibold text-white">
          {t.nameLabel}
        </label>
        <input id="sms-name" name="name" autoComplete="name" placeholder={t.namePlaceholder} aria-required aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "sms-name-error" : undefined} className={input} />
        {err("name")}
      </div>
      <label htmlFor="sms-consent" className="flex items-start gap-3 rounded-[8px] bg-[#f2f2f2] p-4 text-[11px] leading-[1.6] text-[#333]">
        <input id="sms-consent" name="sms_consent" type="checkbox" value="yes" aria-describedby={errors.sms_consent ? "sms-sms_consent-error" : undefined} className="mt-0.5 size-4 shrink-0 accent-[var(--color-accent)]" />
        <span>
          {t.consent} See our{" "}
          <Link href="/privacy-policy/" className="text-azure underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <a href="#sms-terms" className="text-azure underline">
            SMS Terms &amp; Conditions
          </a>
          .
        </span>
      </label>
      {err("sms_consent")}
      <button type="submit" disabled={status === "sending"} className="flex h-11 w-full items-center justify-center gap-2 rounded-[6px] bg-lime text-[14px] font-medium text-white transition-colors hover:bg-azure disabled:opacity-70">
        {status === "sending" ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            {t.sending}
          </>
        ) : (
          t.submit
        )}
      </button>
      <p aria-live="polite" className="text-sm text-bad">
        {status === "error" && (serverMessage || t.error)}
      </p>
    </form>
  );
}
