"use client";

import { useRef, useState, type FocusEvent, type FormEvent } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";
type FieldName = "name" | "email" | "brief";
type FieldErrors = Partial<Record<FieldName, string>>;
type ContactResponse = { message?: string; reference?: string; fieldErrors?: FieldErrors };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: FieldName, rawValue: string) {
  const value = rawValue.trim();
  if (name === "name") {
    if (value.length < 2) return "Enter at least 2 characters for your name or studio.";
    if (value.length > 80) return "Keep the name or studio under 80 characters.";
  }
  if (name === "email") {
    if (!emailPattern.test(value)) return "Enter a reply email in the format name@company.com.";
    if (value.length > 160) return "Keep the reply email under 160 characters.";
  }
  if (name === "brief") {
    if (value.length < 20) return "Add at least 20 characters so the project has enough context.";
    if (value.length > 2000) return "Keep the project brief under 2,000 characters.";
  }
  return "";
}

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [briefLength, setBriefLength] = useState(0);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const focusStatus = () => window.requestAnimationFrame(() => statusRef.current?.focus());
  const focusField = (form: HTMLFormElement, name: FieldName) => window.requestAnimationFrame(() => {
    const field = form.elements.namedItem(name) as HTMLElement | null;
    field?.closest("label")?.scrollIntoView({ block: "center", behavior: "auto" });
    field?.focus({ preventScroll: true });
  });

  const validateOne = (name: FieldName, value: string) => {
    const error = validateField(name, value);
    setFieldErrors((current) => ({ ...current, [name]: error || undefined }));
    return error;
  };

  const blur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.currentTarget.name as FieldName;
    if (name === "name" || name === "email" || name === "brief") validateOne(name, event.currentTarget.value);
  };

  const input = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name as FieldName;
    if (name === "brief") setBriefLength(target.value.length);
    if (fieldErrors[name] && !validateField(name, target.value)) {
      setFieldErrors((current) => ({ ...current, [name]: undefined }));
    }
    if (state === "sent") {
      setState("idle");
      setMessage("");
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      brief: String(formData.get("brief") || ""),
    };
    const nextErrors: FieldErrors = {
      name: validateField("name", values.name) || undefined,
      email: validateField("email", values.email) || undefined,
      brief: validateField("brief", values.brief) || undefined,
    };
    const firstInvalid = (Object.keys(nextErrors) as FieldName[]).find((name) => nextErrors[name]);
    if (firstInvalid) {
      setFieldErrors(nextErrors);
      setState("error");
      setMessage("Review the highlighted field, then send the brief again.");
      focusField(form, firstInvalid);
      return;
    }

    setState("sending");
    setMessage("Sending through the private channel…");
    setFieldErrors({});

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);
    let hasServerFieldErrors = false;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
        cache: "no-store",
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({})) as ContactResponse;
      if (result.fieldErrors) {
        hasServerFieldErrors = true;
        setFieldErrors(result.fieldErrors);
        const firstServerField = (Object.keys(result.fieldErrors) as FieldName[])[0];
        focusField(form, firstServerField);
      }
      if (!response.ok) throw new Error(result.message || "The private channel did not confirm delivery. Please try again.");

      form.reset();
      setBriefLength(0);
      setState("sent");
      setMessage(`Brief received privately${result.reference ? ` · reference ${result.reference}` : ""}. Daniyal can reply to the email you supplied.`);
      focusStatus();
    } catch (error) {
      setState("error");
      setMessage(error instanceof DOMException && error.name === "AbortError"
        ? "The private channel timed out. Your text is still here; please try sending it again."
        : error instanceof Error ? error.message : "The private channel did not respond. Your text is still here; please try again.");
      if (!hasServerFieldErrors) focusStatus();
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <form className="contact-form" id="contact-form" onSubmit={submit} onInput={input} aria-labelledby="contact-form-title" aria-busy={state === "sending"} noValidate>
      <div className="contact-form-head">
        <span><small>PRIVATE PROJECT BRIEF</small><strong id="contact-form-title">Start a conversation</strong></span>
        <i aria-hidden="true">06 / INBOX</i>
      </div>
      <div className="contact-form-fields">
        <label className={fieldErrors.name ? "is-invalid" : undefined}>
          <span>Your name</span>
          <input name="name" data-cursor="text" autoComplete="name" required minLength={2} maxLength={80} placeholder="Name / studio" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "contact-name-error" : undefined} onBlur={blur} />
          {fieldErrors.name && <small className="contact-field-error" id="contact-name-error">{fieldErrors.name}</small>}
        </label>
        <label className={fieldErrors.email ? "is-invalid" : undefined}>
          <span>Reply email</span>
          <input name="email" data-cursor="text" type="email" inputMode="email" autoComplete="email" required maxLength={160} placeholder="you@company.com" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "contact-email-error" : undefined} onBlur={blur} />
          {fieldErrors.email && <small className="contact-field-error" id="contact-email-error">{fieldErrors.email}</small>}
        </label>
        <label className={`contact-form-brief${fieldErrors.brief ? " is-invalid" : ""}`}>
          <span>The hard part <small>{briefLength.toLocaleString("en-US")} / 2,000</small></span>
          <textarea name="brief" data-cursor="text" required minLength={20} maxLength={2000} rows={4} placeholder="What are you building, what is difficult, and what would a strong result look like?" aria-invalid={Boolean(fieldErrors.brief)} aria-describedby={`contact-brief-help${fieldErrors.brief ? " contact-brief-error" : ""}`} onBlur={blur} />
          <small className="contact-field-help" id="contact-brief-help">A useful brief names the constraint, the current state, and the result that would matter.</small>
          {fieldErrors.brief && <small className="contact-field-error" id="contact-brief-error">{fieldErrors.brief}</small>}
        </label>
        <label className="contact-honeypot" aria-hidden="true"><span>Company website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="contact-form-action">
        <p>No public post. No account required. Delivery is confirmed before this form reports success.</p>
        <button type="submit" disabled={state === "sending"} data-magnetic data-cursor="action" data-label="SEND ↗"><span>{state === "sending" ? "Sending privately…" : state === "sent" ? "Send another brief" : state === "error" ? "Try private delivery" : "Send private brief"}</span><b aria-hidden="true">↗</b></button>
      </div>
      <p ref={statusRef} tabIndex={-1} className={`contact-form-status is-${state}`} role={state === "error" ? "alert" : "status"} aria-live={state === "error" ? "assertive" : "polite"} aria-atomic="true">{message}</p>
    </form>
  );
}
