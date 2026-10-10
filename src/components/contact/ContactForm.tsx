"use client";

import { useActionState } from "react";
import { sendMessage, type SendState } from "@/app/(frontend)/contact/actions";
import type { Contact } from "@/payload-types";

const input =
  "contact-input w-full rounded-[10px] border border-[#d6e2ec] bg-white/70 px-5 text-sm text-navy placeholder:text-[#9aa5b1] outline-none";

/** The consultation form. Messages are saved to the admin; a thank-you replaces the form once sent. */
export function ContactForm({ content }: { content: Contact["form"] }) {
  const [state, action, pending] = useActionState<SendState, FormData>(sendMessage, { status: "idle" });
  const v = state.fields ?? {};

  return (
    <div className="contact-card relative overflow-hidden rounded-[24px] border border-[#dceaf5] bg-white/85 p-5 shadow-[0_30px_70px_-40px_rgba(0,60,140,0.5)] backdrop-blur-md md:p-6">
      {state.status === "sent" ? (
        <div role="status" className="contact-success flex flex-col items-center gap-4 py-16 text-center">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
            <circle cx="36" cy="36" r="33" className="contact-check-ring" pathLength={1} />
            <path d="M23 37l9 9 17-19" className="contact-check" pathLength={1} />
          </svg>
          <h2 className="text-2xl font-medium text-navy">{content.successTitle}</h2>
          <p className="max-w-[460px] text-sm leading-relaxed text-muted">{content.successMessage}</p>
        </div>
      ) : (
        <form action={action} className="flex flex-col gap-4" noValidate={false}>
          <h2 className="text-lg font-medium text-ink">{content.title}</h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-3">
            <Field label={content.nameLabel} name="name" autoComplete="name" defaultValue={v.name} />
            <Field label={content.emailLabel} name="email" type="email" autoComplete="email" defaultValue={v.email} />
          </div>
          <Field label={content.subjectLabel} name="subject" defaultValue={v.subject} />
          <label className="flex flex-col gap-2.5">
            <span className="text-sm text-ink">{content.messageLabel}</span>
            <textarea name="message" required rows={3} maxLength={5000} defaultValue={v.message} className={`${input} min-h-[72px] resize-y py-3`} />
          </label>
          {/* Leave empty: catches spam bots */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          {state.status === "error" && (
            <p role="alert" className="text-sm text-red-600">
              {state.message}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="contact-submit relative mt-2 h-[38px] overflow-hidden rounded-full bg-brand text-base text-white transition-colors hover:bg-brand-bright disabled:cursor-wait"
          >
            <span className={pending ? "opacity-0" : ""}>{content.submitLabel}</span>
            {pending && (
              <span aria-label="Sending" className="absolute inset-0 flex items-center justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="contact-dot size-1.5 rounded-full bg-white" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="text-sm text-ink">{label}</span>
      <input
        type={type}
        name={name}
        required
        maxLength={200}
        autoComplete={autoComplete}
        placeholder={label}
        defaultValue={defaultValue}
        className={`${input} h-[38px]`}
      />
    </label>
  );
}
