export type RoleSlug = "core" | "patrons" | "ambassadors" | "changemakers";

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

export interface RoleConfig {
  slug: RoleSlug;
  path: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: React.ReactNode;
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
}
