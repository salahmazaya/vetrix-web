"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { isLocale } from "@/lib/i18n";
import { copyFor } from "@/lib/ui-copy";

export type SendState = { status: "idle" | "sent" | "error"; message?: string; fields?: Record<string, string> };

const limits = { name: 120, email: 200, subject: 200, message: 5000 };

/** Saves a Contact form message into the admin's Messages list. */
export async function sendMessage(_prev: SendState, form: FormData): Promise<SendState> {
  const localeValue = String(form.get("locale") ?? "");
  const copy = copyFor(isLocale(localeValue) ? localeValue : "en");
  const fields = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    subject: String(form.get("subject") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
  };
  // A hidden field real people never fill in; bots usually do
  if (form.get("website")) return { status: "sent" };

  const missing = (Object.keys(limits) as (keyof typeof limits)[]).find((k) => !fields[k]);
  if (missing) return { status: "error", message: copy.form.missing, fields };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return { status: "error", message: copy.form.email, fields };
  if ((Object.keys(limits) as (keyof typeof limits)[]).some((k) => fields[k].length > limits[k]))
    return { status: "error", message: copy.form.long, fields };

  try {
    const payload = await getPayload({ config });
    await payload.create({ collection: "messages", data: fields });
    return { status: "sent" };
  } catch (err) {
    console.error("Contact form failed to save", err);
    return { status: "error", message: copy.form.failed, fields };
  }
}
