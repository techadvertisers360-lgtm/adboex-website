"use client";

import { useState } from "react";

/**
 * Shared submit logic for every form (demo popup, contact page).
 * Sends the form as JSON to the /api/contact route (app/api/contact/route.ts),
 * which validates it and emails it via Hostinger SMTP.
 */
export type FormStatus = "idle" | "sending" | "success" | "error";
export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

/** Quick in-browser check so visitors see mistakes instantly (the server checks again). */
export function validate(data: FormData, required: string[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const name of required) {
    if (!String(data.get(name) ?? "").trim()) errors[name] = "This field is required.";
  }
  const email = String(data.get("email") ?? "").trim();
  if (email && !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  const phone = String(data.get("phone") ?? "").trim();
  if (phone && !PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  const website = String(data.get("website") ?? "").trim();
  if (website && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+.*$/i.test(website)) errors.website = "Please enter a valid website address.";
  return errors;
}

export function useContactForm(required: string[]) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data, required);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setServerMessage("");
    const payload = { ...Object.fromEntries(data.entries()), page: window.location.pathname };
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: FieldErrors };
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
      } else {
        if (json.errors) setErrors(json.errors);
        setServerMessage(json.message ?? "");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return { status, errors, serverMessage, onSubmit };
}
