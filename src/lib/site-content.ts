import type { CollapsedCopy } from "@/lib/bilingualDoc";
import type {
  About,
  AiCore,
  Contact,
  Cta,
  Faq,
  Footer,
  Header,
  Home,
  Media,
  Solution,
} from "@/payload-types";

/** Visitor-facing CMS shapes (logical `title`, not `title_en` / `title_ar`). */
export type SiteAbout = CollapsedCopy<About>;
export type SiteAiCore = CollapsedCopy<AiCore>;
export type SiteContact = CollapsedCopy<Contact>;
export type SiteCta = CollapsedCopy<Cta>;
export type SiteFaq = CollapsedCopy<Faq>;
export type SiteFooter = CollapsedCopy<Footer>;
export type SiteHeader = CollapsedCopy<Header>;
export type SiteHome = CollapsedCopy<Home>;
export type SiteSolution = CollapsedCopy<Solution>;
export type SiteMedia = CollapsedCopy<Media>;
