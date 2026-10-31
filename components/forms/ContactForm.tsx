"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { Honeypot } from "@/components/forms/Field";
import { useContactForm } from "@/components/forms/useContactForm";
import { buttonClasses } from "@/components/ui/Button";

/** Contact page form (reference: white card, dark labels). Posts to /api/contact (form_type=contact). */
export function ContactForm() {
  const { status, errors, serverMessage, onSubmit } = useContactForm(["name", "email", "message"]);
  const f = contact.form;

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-24 text-center">
        <CheckCircle2 aria-hidden="true" className="size-12 text-lime" />
        <p className="text-[22px] font-medium tracking-[-0.04em] text-[#131313]">Message sent</p>
        <p className="max-w-sm text-[#555]">{contact.success}</p>
      </div>
    );
  }

  const input = "w-full rounded-[10px] border border-black/15 bg-white px-4 text-[15px] text-[#131313] placeholder:text-black/40 focus:border-lime focus:outline-none";
  const field = (name: "name" | "email" | "message", label: string, placeholder: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="flex flex-col gap-3">
      <label htmlFor={`c-${name}`} className="text-[18px] leading-tight font-medium tracking-[-0.03em] text-[#131313]">
        {label}
      </label>
      {name === "message" ? (
        <textarea id={`c-${name}`} name={name} placeholder={placeholder} aria-required aria-invalid={errors[name] ? true : undefined} aria-describedby={errors[name] ? `c-${name}-error` : undefined} className={`${input} h-[263px] resize-y py-4`} />
      ) : (
        <input id={`c-${name}`} name={name} placeholder={placeholder} aria-required aria-invalid={errors[name] ? true : undefined} aria-describedby={errors[name] ? `c-${name}-error` : undefined} className={`${input} h-[62px]`} {...extra} />
      )}
      {errors[name] && (
        <span id={`c-${name}-error`} className="text-[13px] text-bad">
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-[34px]">
      <input type="hidden" name="form_type" value="contact" />
      <input type="hidden" name="source" value="Contact page" />
      <Honeypot />
      {field("name", f.name, f.namePlaceholder, { autoComplete: "name" })}
      {field("email", f.email, f.emailPlaceholder, { type: "email", inputMode: "email", autoComplete: "email" })}
      {field("message", f.message, f.messagePlaceholder)}
      <div>
        <button type="submit" disabled={status === "sending"} className={buttonClasses("blue", "md", "disabled:opacity-70")}>
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              {contact.sending}
            </>
          ) : (
            contact.submit
          )}
        </button>
        <p aria-live="polite" className="mt-3 text-sm text-bad">
          {status === "error" && `${serverMessage || contact.error} (${site.email})`}
        </p>
      </div>
    </form>
  );
}
