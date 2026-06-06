import type { RoleConfig } from "./roles";

const commonContributions = [
  { id: "introduce", label: "I can introduce organisations" },
  { id: "sponsor", label: "I can support sponsorship conversations" },
  { id: "mentor", label: "I can mentor" },
  { id: "speak", label: "I can speak at events" },
  { id: "outreach", label: "I can support outreach" },
  { id: "visibility", label: "I can support public visibility" },
  { id: "nominate", label: "I can nominate other changemakers" },
];

export const ROLE_CONFIG: Record<string, RoleConfig> = {
  core: {
    slug: "core",
    path: "/core",
    eyebrow: "Core Management Team",
    metaTitle: "Core Management Team — Maha NRI Connect",
    metaDescription:
      "An invitation to help build the execution engine behind Maha NRI Connect, a global platform connecting Maharashtra with its diaspora.",
    heroHeadline: (
      <>
        Help Build the <em className="font-serif italic">Execution Engine</em> Behind Maha NRI Connect
      </>
    ),
    heroHeadlinePlain:
      "Help Build the Execution Engine Behind Maha NRI Connect",
    heroSubheadline:
      "This is not a volunteer role. This is an opportunity to help shape the platform from the inside as it moves from vision to launch.",
    primaryCta: "Join the Core Management Team",
    secondaryCta: "Speak to the Founding Team",
    heroImagePrompt:
      "Cinematic editorial composition: abstract dark-navy world map with delicate orange connection lines arcing from Maharashtra to global hubs, subtle Mumbai skyline silhouette at the base, deep blue gradient, premium and institutional",
    mandateHeading: "The Mandate of the Founding Core",
    mandateIntro:
      "Very few people get to help build a platform that connects millions to their roots, identity and future. This is one of those opportunities.",
    mandateItems: [
      {
        title: "Build the Early Team",
        body: "Be part of the founding cohort building a high-visibility Maharashtra-linked initiative, working directly with the founders.",
      },
      {
        title: "Shape the Institution",
        body: "Help create a long-term institutional platform rather than a short-term campaign. Define standards, governance and tone.",
      },
      {
        title: "Activate Stakeholders",
        body: "Build relationships with global diaspora organisations, sponsors, patrons, ambassadors and changemakers.",
      },
      {
        title: "Own the Launch Roadmap",
        body: "Shape the launch roadmap, ecosystem and growth strategy, and be recognised as one of the people who built Maha NRI Connect from the ground up.",
      },
    ],
    benefitLine:
      "Your name will be associated with the founding chapter of Maha NRI Connect — a movement, not just a website.",
    emotionalCloser:
      "Very few people get the opportunity to help build a platform that connects millions to their roots, identity and future. This is one of those opportunities.",
    finalClose: "Help us build the engine.",
    roleSpecificFaqs: [
      {
        q: "How much time is expected?",
        a: "Core team commitments are negotiated individually and based on the function you take on. We design the role around your bandwidth.",
      },
      {
        q: "Is this a paid role?",
        a: "The founding-phase association may be honorary unless separately agreed in writing. Defined commercial roles will be discussed individually where relevant.",
      },
    ],
    contributionOptions: commonContributions,
  },

  patrons: {
    slug: "patrons",
    path: "/patrons",
    eyebrow: "Advisory Team & Patrons",
    metaTitle: "Advisory & Patron Invitation — Maha NRI Connect",
    metaDescription:
      "An invitation for respected leaders to guide, strengthen and inspire a platform connecting Maharashtra with its global community.",
    heroHeadline: (
      <>
        Lend Your Wisdom, Stature and <em className="font-serif italic">Blessings</em> to a Legacy Initiative
      </>
    ),
    heroHeadlinePlain:
      "Lend Your Wisdom, Stature and Blessings to a Legacy Initiative",
    heroSubheadline:
      "Maha NRI Connect is inviting respected leaders to guide, strengthen and inspire a platform that connects Maharashtra with its global community.",
    primaryCta: "Accept Patron / Advisor Invitation",
    secondaryCta: "Request a Private Briefing",
    heroImagePrompt:
      "Stately cinematic composition: soft cloud-like navy gradient with golden-orange light rays, abstract architectural columns blended with a faint Maharashtra outline, dignified and museum-like atmosphere, no people",
    mandateHeading: "An Honorary Role of Guidance",
    mandateIntro:
      "Your association will amplify your continued commitment to Maharashtra's global outreach, cultural pride and development journey.",
    mandateItems: [
      {
        title: "Strategic Guidance",
        body: "Offer counsel on direction, partnerships and long-term governance without operational responsibility.",
      },
      {
        title: "Institutional Introductions",
        body: "Enable connections across business, education, culture, innovation and philanthropy where they create real value.",
      },
      {
        title: "Credibility and Public Support",
        body: "Lend stature and trust to a platform built for the next generation of global Maharashtrians.",
      },
      {
        title: "Long-Term Vision",
        body: "Support a platform that will benefit Maharashtra and its diaspora for decades — well beyond any single launch moment.",
      },
    ],
    benefitLine:
      "Your association will be visible, dignified and structured — a meaningful way to give back to Maharashtra.",
    emotionalCloser:
      "This is an opportunity to give back to Maharashtra in a structured, visible and meaningful way.",
    finalClose: "Guide us with your wisdom and stature.",
    roleSpecificFaqs: [
      {
        q: "Is this an operational role?",
        a: "No. The Advisory & Patron role is honorary and non-operational. You are not asked to manage day-to-day work.",
      },
      {
        q: "Will my name be used publicly?",
        a: "Only with your explicit consent, and only in formats you approve.",
      },
    ],
    contributionOptions: commonContributions,
  },

  ambassadors: {
    slug: "ambassadors",
    path: "/ambassadors",
    eyebrow: "Brand Ambassadors & Influencers",
    metaTitle: "Brand Ambassador Invitation — Maha NRI Connect",
    metaDescription:
      "Use your voice to bring global Maharashtrians closer to home through Maha NRI Connect — a movement of cultural belonging.",
    heroHeadline: (
      <>
        Use Your Voice to Bring Global Maharashtrians <em className="font-serif italic">Closer to Home</em>
      </>
    ),
    heroHeadlinePlain:
      "Use Your Voice to Bring Global Maharashtrians Closer to Home",
    heroSubheadline:
      "The diaspora connects not only through policy or technology, but through emotion, identity, culture, language, music, cinema, festivals, stories and shared memories.",
    primaryCta: "Become a Maha NRI Connect Ambassador",
    secondaryCta: "Watch the Movement Reel",
    heroImagePrompt:
      "Cinematic warm cultural composition: silhouetted traditional Maharashtra fort against a deep navy sky with soft orange sunrise, faint constellation lines connecting to global cities, emotional and prestigious, no people visible",
    mandateHeading: "How Your Voice Can Help",
    mandateIntro:
      "For millions abroad, Maharashtra is not just a state. It is home. A familiar voice can bring them back to that feeling.",
    mandateItems: [
      {
        title: "Cultural Pride",
        body: "Strengthen pride in identity, language and heritage among Maharashtrians across the world.",
      },
      {
        title: "Inspire Reconnection",
        body: "Inspire youth, families and second-generation communities to rediscover their roots and contribute back.",
      },
      {
        title: "Amplify Launch Moments",
        body: "Share launch messages, record short endorsement videos and support cultural campaigns at key moments.",
      },
      {
        title: "Reach Global Audiences",
        body: "Help Maha NRI Connect reach Maharashtrian audiences in cities and countries where the platform needs presence.",
      },
    ],
    benefitLine:
      "Your association will position your voice as part of a larger movement celebrating Maharashtra's identity, pride and global presence.",
    emotionalCloser:
      "For millions abroad, Maharashtra is not just a state. It is home. A familiar voice can bring them back to that feeling.",
    finalClose: "Lend your voice to a movement of belonging.",
    roleSpecificFaqs: [
      {
        q: "What kind of content will I be asked to share?",
        a: "Short, approved messages, occasional videos around launch milestones, and selective public-facing moments. Always coordinated, never overwhelming.",
      },
      {
        q: "Will I be asked to attend many events?",
        a: "No. Participation is selective and on mutually convenient terms.",
      },
    ],
    contributionOptions: commonContributions,
  },

  changemakers: {
    slug: "changemakers",
    path: "/changemakers",
    eyebrow: "Global Changemakers / Bright Minds",
    metaTitle: "Global Changemakers Network — Maha NRI Connect",
    metaDescription:
      "Join a curated global network of bright minds shaping Maharashtra's future through Maha NRI Connect.",
    heroHeadline: (
      <>
        Join a Curated Network of <em className="font-serif italic">Bright Minds</em> Shaping Maharashtra's Future
      </>
    ),
    heroHeadlinePlain:
      "Join a Curated Global Network of Bright Minds Shaping Maharashtra's Future",
    heroSubheadline:
      "Maharashtra's global talent should not remain scattered. It should become a connected force.",
    primaryCta: "Join the Global Changemakers Network",
    secondaryCta: "View the Vision",
    heroImagePrompt:
      "Intellectual editorial composition: dark navy starfield with subtle orange constellation lines forming a network across continents, central glow over Maharashtra, premium, future-facing, no people",
    mandateHeading: "How Your Knowledge Can Travel",
    mandateIntro:
      "Success becomes more meaningful when it creates pathways for others.",
    mandateItems: [
      {
        title: "Mentorship",
        body: "Share expertise with students, startups, professionals and institutions through a structured platform.",
      },
      {
        title: "One Talk, One Masterclass",
        body: "Commit to as little as one talk, webinar or masterclass — your knowledge reaches thousands.",
      },
      {
        title: "Sector Insights",
        body: "Contribute sector-specific insights, research and thought leadership that shape Maharashtra's growth story.",
      },
      {
        title: "A Curated Network",
        body: "Build meaningful connections with other global Maharashtrian leaders, scientists and founders.",
      },
    ],
    benefitLine:
      "Your association will give your expertise a structured platform to create visible, meaningful and long-term impact.",
    emotionalCloser:
      "Success becomes more meaningful when it creates pathways for others.",
    finalClose: "Let your knowledge create pathways for others.",
    roleSpecificFaqs: [
      {
        q: "What is the minimum commitment?",
        a: "As little as one mentorship session, masterclass or insight contribution per year. The role is designed to respect your time.",
      },
      {
        q: "Can I propose my own contribution format?",
        a: "Absolutely. We design contributions around what is meaningful and easy for you.",
      },
    ],
    contributionOptions: commonContributions,
  },
};
