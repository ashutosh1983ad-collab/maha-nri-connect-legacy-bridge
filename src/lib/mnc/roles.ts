import type { ReactNode } from "react";

export type RoleSlug = "core" | "advisory" | "ambassadors" | "changemakers";

export interface MandateItem {
  title: string;
  body: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ContributionOption {
  id: string;
  label: string;
}

export interface PersonalInvitation {
  headline: string;
  salutation: string;
  paragraphs: string[];
  closingLine: string;
  cta: string;
}

export interface RoleConfig {
  slug: RoleSlug;
  path: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: ReactNode;
  heroHeadlinePlain: string;
  heroSubheadline: string;
  primaryCta: string;
  secondaryCta: string;
  heroImagePrompt: string;
  mandateHeading: string;
  mandateIntro: string;
  mandateItems: MandateItem[];
  benefitLine: string;
  emotionalCloser: string;
  finalClose: string;
  roleSpecificFaqs: FaqItem[];
  contributionOptions: ContributionOption[];
  personalInvitation: PersonalInvitation;
}
