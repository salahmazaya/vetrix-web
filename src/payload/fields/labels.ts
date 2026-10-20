import type { Field, StaticLabel, Tab } from "payload";

type Copy = { en: string; ar: string };

/** English admin wording mapped to both dashboard languages. */
const copy: Record<string, Copy> = {
  label: { en: "Label", ar: "التسمية" },
  href: { en: "Link", ar: "الرابط" },
  url: { en: "URL", ar: "الرابط" },
  title: { en: "Title", ar: "العنوان" },
  description: { en: "Description", ar: "الوصف" },
  eyebrow: { en: "Eyebrow", ar: "العنوان الصغير" },
  highlight: { en: "Highlight", ar: "التمييز" },
  caption: { en: "Caption", ar: "التعليق" },
  value: { en: "Value", ar: "القيمة" },
  text: { en: "Text", ar: "النص" },
  color: { en: "Colour", ar: "اللون" },
  name: { en: "Name", ar: "الاسم" },
  body: { en: "Body", ar: "النص" },
  question: { en: "Question", ar: "السؤال" },
  answer: { en: "Answer", ar: "الإجابة" },
  tagline: { en: "Tagline", ar: "الشعار" },
  platform: { en: "Platform", ar: "المنصة" },
  alt: { en: "Alt text", ar: "النص البديل" },
  enabled: { en: "Status", ar: "الحالة" },
  actions: { en: "Actions", ar: "الإجراءات" },
  email: { en: "Email", ar: "البريد الإلكتروني" },
  subject: { en: "Subject", ar: "الموضوع" },
  message: { en: "Message", ar: "الرسالة" },
  image: { en: "Image", ar: "الصورة" },
  logo: { en: "Logo", ar: "الشعار" },
  avatars: { en: "Avatars", ar: "صور الأشخاص" },
  highlighted: { en: "Highlighted", ar: "مميّز" },
  button: { en: "Button", ar: "الزر" },
  links: { en: "Links", ar: "الروابط" },
  intro: { en: "Intro", ar: "المقدمة" },
  content: { en: "Content", ar: "المحتوى" },
  slug: { en: "Slug", ar: "مسار الرابط" },
  headline: { en: "Headline", ar: "العنوان الرئيسي" },
  pills: { en: "Pills", ar: "الشارات" },
  cards: { en: "Cards", ar: "البطاقات" },
  stages: { en: "Stages", ar: "المراحل" },
  categories: { en: "Categories", ar: "التصنيفات" },
  sources: { en: "Sources", ar: "المصادر" },
  chips: { en: "Chips", ar: "الشرائح" },
  groups: { en: "Groups", ar: "المجموعات" },
  stats: { en: "Stats", ar: "الإحصائيات" },
  items: { en: "Items", ar: "العناصر" },
  points: { en: "Points", ar: "النقاط" },
  badges: { en: "Badges", ar: "الشارات" },
  socials: { en: "Social links", ar: "روابط التواصل" },
  columns: { en: "Columns", ar: "الأعمدة" },
  features: { en: "Features", ar: "المزايا" },
  tiles: { en: "Tiles", ar: "المربعات" },
  header: { en: "Page header", ar: "رأس الصفحة" },
  hero: { en: "Hero", ar: "الواجهة" },
  meetVe: { en: "Meet Ve", ar: "تعرّف على في" },
  about: { en: "About", ar: "من نحن" },
  edge: { en: "Vetrix Edge", ar: "ميزة فيتريكس" },
  process: { en: "Our process", ar: "منهجنا" },
  impact: { en: "Proven impact", ar: "الأثر المثبت" },
  scale: { en: "Scale smarter", ar: "توسّع بذكاء" },
  form: { en: "Form", ar: "النموذج" },
  brain: { en: "Meet the brain", ar: "تعرّف على العقل" },
  numbers: { en: "Numbers", ar: "الأرقام" },
  framework: { en: "Framework", ar: "الإطار" },
  steps: { en: "How it works", ar: "كيف يعمل" },
  identity: { en: "Core identity", ar: "الهوية الأساسية" },
  mission: { en: "Mission", ar: "الرسالة" },
  vision: { en: "Vision", ar: "الرؤية" },
  whatWeDo: { en: "What we do", ar: "ماذا نفعل" },
  standard: { en: "Vetrix standard", ar: "معيار فيتريكس" },
  technologies: { en: "Technologies", ar: "التقنيات" },
  deliver: { en: "What we deliver", ar: "ماذا نقدّم" },
  core: { en: "Core solutions", ar: "الحلول الأساسية" },
  methodology: { en: "Methodology", ar: "المنهج" },
  primaryButton: { en: "Main button", ar: "الزر الرئيسي" },
  secondaryButton: { en: "Second button", ar: "الزر الثاني" },
  introCard: { en: "Intro card", ar: "بطاقة المقدمة" },
  trustedCard: { en: "Trusted by card", ar: "بطاقة الثقة" },
  statCard: { en: "Number card", ar: "بطاقة الرقم" },
  heart: { en: "Centre card", ar: "البطاقة الوسطى" },
  reef: { en: "Top right panel", ar: "اللوحة العلوية" },
  generateLabel: { en: "Generate button text", ar: "نص زر التوليد" },
  chipsTitle: { en: "Chips card title", ar: "عنوان بطاقة الشرائح" },
  accessLabel: { en: "Cursor label", ar: "نص المؤشر" },
  toolsTitle: { en: "Bottom right panel title", ar: "عنوان اللوحة السفلية" },
  nameLabel: { en: "Name label", ar: "تسمية الاسم" },
  emailLabel: { en: "Email label", ar: "تسمية البريد" },
  subjectLabel: { en: "Subject label", ar: "تسمية الموضوع" },
  messageLabel: { en: "Message label", ar: "تسمية الرسالة" },
  submitLabel: { en: "Button text", ar: "نص الزر" },
  successTitle: { en: "Thank-you title", ar: "عنوان الشكر" },
  successMessage: { en: "Thank-you message", ar: "رسالة الشكر" },
  "Page header": { en: "Page header", ar: "رأس الصفحة" },
  Hero: { en: "Hero", ar: "الواجهة" },
  "Meet Ve": { en: "Meet Ve", ar: "تعرّف على في" },
  "Intro card": { en: "Intro card", ar: "بطاقة المقدمة" },
  "Trusted by card": { en: "Trusted by card", ar: "بطاقة الثقة" },
  "Generate button text": { en: "Generate button text", ar: "نص زر التوليد" },
  "Number card": { en: "Number card", ar: "بطاقة الرقم" },
  "Chips card title": { en: "Chips card title", ar: "عنوان بطاقة الشرائح" },
  "Centre card": { en: "Centre card", ar: "البطاقة الوسطى" },
  About: { en: "About", ar: "من نحن" },
  "Intro paragraph": { en: "Intro paragraph", ar: "فقرة المقدمة" },
  Button: { en: "Button", ar: "الزر" },
  "Cursor label": { en: "Cursor label", ar: "نص المؤشر" },
  "Vetrix Edge": { en: "Vetrix Edge", ar: "ميزة فيتريكس" },
  "Our Process": { en: "Our process", ar: "منهجنا" },
  "Hub stages": { en: "Hub stages", ar: "مراحل المركز" },
  "Left side labels": { en: "Left side labels", ar: "تسميات الجانب الأيسر" },
  "Source apps (left)": { en: "Source apps (left)", ar: "تطبيقات المصدر (يسار)" },
  "Top right panel": { en: "Top right panel", ar: "اللوحة العلوية" },
  "Bottom right panel title": { en: "Bottom right panel title", ar: "عنوان اللوحة السفلية" },
  "Tool groups": { en: "Tool groups", ar: "مجموعات الأدوات" },
  "Proven Impact": { en: "Proven impact", ar: "الأثر المثبت" },
  "Scale Smarter": { en: "Scale smarter", ar: "توسّع بذكاء" },
  "Meet the brain": { en: "Meet the brain", ar: "تعرّف على العقل" },
  Numbers: { en: "Numbers", ar: "الأرقام" },
  "Built for scale": { en: "Built for scale", ar: "مبني للتوسع" },
  Framework: { en: "Framework", ar: "الإطار" },
  "How it works": { en: "How it works", ar: "كيف يعمل" },
  "Phone image": { en: "Phone image", ar: "صورة الهاتف" },
  Illustration: { en: "Illustration", ar: "الرسم" },
  "Core identity": { en: "Core identity", ar: "الهوية الأساسية" },
  Mission: { en: "Mission", ar: "الرسالة" },
  Vision: { en: "Vision", ar: "الرؤية" },
  "What we do": { en: "What we do", ar: "ماذا نفعل" },
  "Vetrix standard": { en: "Vetrix standard", ar: "معيار فيتريكس" },
  Technologies: { en: "Technologies", ar: "التقنيات" },
  "What we deliver": { en: "What we deliver", ar: "ماذا نقدّم" },
  "Core solutions": { en: "Core solutions", ar: "الحلول الأساسية" },
  Methodology: { en: "Methodology", ar: "المنهج" },
  Form: { en: "Form", ar: "النموذج" },
  "Name label": { en: "Name label", ar: "تسمية الاسم" },
  "Email label": { en: "Email label", ar: "تسمية البريد" },
  "Subject label": { en: "Subject label", ar: "تسمية الموضوع" },
  "Message label": { en: "Message label", ar: "تسمية الرسالة" },
  "Button text": { en: "Button text", ar: "نص الزر" },
  "Thank-you title": { en: "Thank-you title", ar: "عنوان الشكر" },
  "Thank-you message": { en: "Thank-you message", ar: "رسالة الشكر" },
  Questions: { en: "Questions", ar: "الأسئلة" },
  Link: { en: "Link", ar: "الرابط" },
  "Alt text": { en: "Alt text", ar: "النص البديل" },
  "Main button": { en: "Main button", ar: "الزر الرئيسي" },
  "Second button": { en: "Second button", ar: "الزر الثاني" },
  "Avatars image": { en: "Avatars image", ar: "صورة الأشخاص" },
};

const descriptions: Record<string, Copy> = {
  "Shown lit up in the diagram": {
    en: "Shown lit up in the diagram",
    ar: "يظهر مضاءً داخل المخطط",
  },
  "Shown in the blue gradient after the title": {
    en: "Shown in the blue gradient after the title",
    ar: "يظهر بتدرج أزرق بعد العنوان",
  },
  "e.g. 12K, counts up": { en: "e.g. 12K, counts up", ar: "مثال: 12K، يعدّ تصاعديًا" },
  "e.g. 85%, counts up": { en: "e.g. 85%, counts up", ar: "مثال: 85%، يعدّ تصاعديًا" },
  "The paragraph in parts; highlighted parts light up in blue as you scroll": {
    en: "The paragraph in parts; highlighted parts light up in blue as you scroll",
    ar: "الفقرة مقسّمة لأجزاء، والأجزاء المميّزة تضيء بالأزرق مع التمرير",
  },
  "Spark colour, e.g. #f97316": { en: "Spark colour, e.g. #f97316", ar: "لون الوميض، مثال: #f97316" },
  "27 tiles, filled row by row, 3 per row": {
    en: "27 tiles, filled row by row, 3 per row",
    ar: "27 مربعًا، تُملأ صفًا صفًا، 3 في كل صف",
  },
  "New lines are kept": { en: "New lines are kept", ar: "الأسطر الجديدة تُحفظ" },
  "New lines are kept on large screens": {
    en: "New lines are kept on large screens",
    ar: "الأسطر الجديدة تُحفظ على الشاشات الكبيرة",
  },
  "Page name, also used in the breadcrumb": {
    en: "Page name, also used in the breadcrumb",
    ar: "اسم الصفحة، ويظهر أيضًا في مسار التنقل",
  },
  "Wrap the word to colour in *stars*, e.g. Where *Deep* Tech Meets Business Logic": {
    en: "Wrap the word to colour in *stars*, e.g. Where *Deep* Tech Meets Business Logic",
    ar: "ضع الكلمة المراد تلوينها بين *نجمتين*، مثال: حيث تلتقي التقنية *العميقة* بمنطق الأعمال",
  },
  "Wrap the word to colour in *stars*": {
    en: "Wrap the word to colour in *stars*",
    ar: "ضع الكلمة المراد تلوينها بين *نجمتين*",
  },
  "Logos scroll along in a loop": { en: "Logos scroll along in a loop", ar: "الشعارات تتحرك في حلقة مستمرة" },
  "Sent from the Contact page": { en: "Sent from the Contact page", ar: "وصلت من صفحة التواصل" },
};

function copyFieldName(name?: string): string | undefined {
  if (!name) return undefined;
  return name.replace(/(__ui|_en|_ar)$/, "");
}

function lookup(label: unknown, name?: string): StaticLabel | undefined {
  if (typeof label === "string" && copy[label]) return copy[label];
  const base = copyFieldName(name);
  if ((label == null || label === false) && base && copy[base]) return copy[base];
  return undefined;
}

function translateField(field: Field): Field {
  let next: Field = field;

  if ("label" in field || "name" in field) {
    const name = "name" in field ? field.name : undefined;
    const label = "label" in field ? field.label : undefined;
    const translated = lookup(label, name);
    if (translated) next = { ...next, label: translated } as Field;
  }

  if ("admin" in next && next.admin && "description" in next.admin && typeof next.admin.description === "string") {
    const description = descriptions[next.admin.description];
    if (description) next = { ...next, admin: { ...next.admin, description } } as Field;
  }

  if (next.type === "tabs") {
    return {
      ...next,
      tabs: next.tabs.map((tab) => translateTab(tab)),
    };
  }

  if ((next.type === "row" || next.type === "collapsible" || next.type === "group" || next.type === "array") && "fields" in next) {
    return { ...next, fields: translateAdmin(next.fields) };
  }

  return next;
}

function translateTab(tab: Tab): Tab {
  const label = lookup(tab.label, "name" in tab ? tab.name : undefined);
  return { ...tab, ...(label ? { label } : {}), fields: translateAdmin(tab.fields) };
}

/** Gives every dashboard label and hint an English and Arabic wording. */
export function translateAdmin(fields: Field[]): Field[] {
  return fields.map(translateField);
}
