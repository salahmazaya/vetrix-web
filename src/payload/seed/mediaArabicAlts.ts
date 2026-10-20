import type { Payload } from "payload";
import { seedContext } from "./media";

/**
 * English alt text from seed → Arabic (same meaning as on the Arabic site).
 * Only fills `alt_ar` when still empty — never overwrites existing Arabic.
 */
const altAr: Record<string, string> = {
  "Energy sphere circled by chrome rings.": "كرة طاقة محاطة بحلقات كروم.",
  "Glass cube holding a glowing circuit sphere.": "مكعب زجاجي يحتوي على كرة دوائر متوهجة.",
  "A core sphere linked to orbiting client panels.": "كرة مركزية مرتبطة بلوحات عملاء تدور حولها.",
  "Glowing control dial with glass rings.": "قرص تحكم متوهج مع حلقات زجاجية.",
  "Glass sphere filled with glowing circuits.": "كرة زجاجية مليئة بدوائر متوهجة.",
  "Ve holding an orb linked to dashboard panels.": "شخصية Ve تحمل كرة مرتبطة بلوحات لوحة التحكم.",
  "Ve at a console sending data streams to connected devices.": "Ve عند وحدة تحكم ترسل تدفقات بيانات إلى أجهزة متصلة.",
  "Digital globe surrounded by data and network icons.": "كرة رقمية محاطة ببيانات وأيقونات شبكة.",
  "Chat between a customer and the Ve assistant.": "محادثة بين عميل ومساعد Ve.",
  "A prompt flowing through to a processed task.": "موجه يمر عبر مهمة معالجة.",
  "Logos of connected apps like Gmail, Slack and Notion.": "شعارات تطبيقات متصلة مثل Gmail وSlack وNotion.",
  "The Ve assistant waving next to an Ask Ve prompt bar.": "مساعد Ve يلوّح بجانب شريط «اسأل Ve».",
  "Phone showing the Ve assistant asking how it can help.": "هاتف يعرض مساعد Ve يسأل كيف يمكنه المساعدة.",
  "Ve connected to design and automation tools.": "Ve متصل بأدوات التصميم والأتمتة.",
};

/** Backfill Arabic alt on media where only English was migrated. Safe to re-run. */
export async function seedMediaArabicAlts(payload: Payload) {
  const { docs } = await payload.find({
    collection: "media",
    limit: 500,
    depth: 0,
  });

  for (const doc of docs) {
    const enAlt = typeof doc.alt_en === "string" ? doc.alt_en.trim() : "";
    if (!enAlt) continue;

    const arAltExisting = typeof doc.alt_ar === "string" ? doc.alt_ar.trim() : "";
    if (arAltExisting) continue;

    const arAlt = altAr[enAlt];
    if (!arAlt) continue;

    await payload.update({
      collection: "media",
      id: doc.id,
      context: seedContext,
      data: { alt_ar: arAlt },
    });
  }
}
