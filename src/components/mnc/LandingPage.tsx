import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { submitInvitation, type InvitationInput } from "@/lib/mnc/invitations.functions";
import type { RoleConfig } from "@/lib/mnc/roles";
import jaikumarRawalImg from "@/assets/jaikumar-rawal.jpeg";
import udaySamantImg from "@/assets/uday-samant.jpeg";
import cmAnnouncingImg from "@/assets/cm-announcing-davos.png";
import rahulTulpuleImg from "@/assets/rahul-tulpule.png";
import ashutoshDeshpandeImg from "@/assets/ashutosh-deshpande.jpeg";

const jaikumarRawalAsset = { url: jaikumarRawalImg };
const udaySamantAsset = { url: udaySamantImg };
const cmAnnouncingAsset = { url: cmAnnouncingImg };
const rahulTulpuleAsset = { url: rahulTulpuleImg };
const ashutoshDeshpandeAsset = { url: ashutoshDeshpandeImg };

const CM_YOUTUBE_ID = "ewOoOCtApB4";

/** Dignified honorific rendering: "Hon'ble Shri" eyebrow, name in serif, "ji" italic. */
function PatronName({
  honorific,
  name,
  suffix = "ji",
  className = "",
}: {
  honorific: string;
  name: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-[0.28em] text-text-tertiary">{honorific}</p>
      <h3 className="mt-1 font-serif text-2xl leading-tight text-cream md:text-3xl">
        {name} <span className="font-serif text-lg italic text-accent-orange-soft">{suffix}</span>
      </h3>
    </div>
  );
}

/** Lightweight YouTube modal — autoplay on open, click backdrop to close. */
function YouTubeModal({
  videoId,
  open,
  onClose,
}: {
  videoId: string;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-navy-950/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[6px] border border-cream/15 bg-navy-950 shadow-[0_60px_120px_-20px_oklch(0.13_0.05_262/0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-navy-900/80 text-cream backdrop-blur-sm transition hover:bg-accent-orange hover:text-navy-950"
        >
          ✕
        </button>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="Hon'ble Chief Minister's Address"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        </div>
      </div>
    </div>
  );
}

interface LandingPageProps {
  config: RoleConfig;
  heroImage: string;
}

const ALL_ROLES: { slug: string; path: string; short: string }[] = [
  { slug: "core", path: "/core", short: "Core Team" },
  { slug: "patrons", path: "/patrons", short: "Patrons" },
  { slug: "ambassadors", path: "/ambassadors", short: "Ambassadors" },
  { slug: "changemakers", path: "/changemakers", short: "Changemakers" },
];

const MAHARASHTRA_BENEFITS = [
  {
    title: "Global Talent Mapping",
    body: "Identify and connect Maharashtrian professionals, experts, entrepreneurs, scientists and leaders worldwide.",
  },
  {
    title: "Investment & Industry",
    body: "Create structured pathways for diaspora-led investment, partnerships, innovation and business.",
  },
  {
    title: "Cultural Continuity",
    body: "Preserve Marathi language, heritage, festivals, literature and identity for future generations abroad.",
  },
  {
    title: "Knowledge Transfer",
    body: "Enable global experts to mentor students, startups, institutions and professionals in Maharashtra.",
  },
  {
    title: "Tourism & Roots",
    body: "Encourage global Maharashtrians to rediscover Maharashtra through curated tourism and heritage experiences.",
  },
  {
    title: "Philanthropy & Impact",
    body: "Channel diaspora goodwill into education, healthcare, rural development, skilling and community welfare.",
  },
  {
    title: "Crisis Communication",
    body: "A trusted channel for structured outreach during emergencies, events and major public initiatives.",
  },
  {
    title: "Policy Engagement",
    body: "A direct mechanism for diaspora insights, participation and feedback into policy.",
  },
];

const DIASPORA_BENEFITS = [
  {
    title: "A Digital Home",
    body: "One trusted place to reconnect with Maharashtra, culture, community and opportunity.",
  },
  {
    title: "Trusted Information",
    body: "Updates on schemes, policies, events, tourism, investment and cultural initiatives.",
  },
  {
    title: "Community Discovery",
    body: "Find Marathi Mandals, organisations and professional networks globally.",
  },
  {
    title: "Business & Mentorship",
    body: "Connect with entrepreneurs, investors, mentors, professionals and institutions.",
  },
  {
    title: "Cultural Belonging",
    body: "Stay connected to Marathi language, festivals, literature, heritage and traditions.",
  },
  {
    title: "Next Generations",
    body: "Help younger generations understand, celebrate and carry forward their Maharashtrian identity.",
  },
  {
    title: "Ways to Contribute",
    body: "Mentor, invest, volunteer, sponsor, teach, advise or support meaningful initiatives.",
  },
  {
    title: "Recognition",
    body: "Celebrate global Maharashtrian achievers and their contributions.",
  },
];

const METRICS = [
  { value: "5 lakh+", label: "Global Maharashtrians to connect", note: "Target" },
  { value: "50+", label: "Countries", note: "Vision" },
  { value: "500+", label: "Organisations", note: "Target" },
  { value: "100+", label: "Global changemakers", note: "Target" },
  { value: "25+", label: "Patrons & ambassadors", note: "Target" },
  { value: "₹500 cr+", label: "Investment facilitation", note: "Ambition" },
];

const PLATFORM_FEATURES = [
  "Global Maharashtrian directory",
  "Marathi Mandal & organisation network",
  "Business & mentorship network",
  "Cultural hub",
  "Tourism & roots discovery",
  "Policy & scheme updates",
  "Investment facilitation",
  "Philanthropy & volunteering",
  "Education & skill development",
  "Diaspora analytics dashboard",
  "Partner & sponsor ecosystem",
  "Emergency communication",
];

const COMMON_FAQS = [
  {
    q: "Is this a paid role?",
    a: "The association may be honorary unless separately agreed in writing.",
  },
  {
    q: "Is this a government appointment?",
    a: "No. Maha NRI Connect is a platform initiative and the association does not create any government position, employment, agency or fiduciary role.",
  },
  {
    q: "Will I be asked for money?",
    a: "No. These stakeholder roles are not financial commitments. Sponsorship conversations are separate and only where relevant.",
  },
  {
    q: "Can I opt out later?",
    a: "Yes. The association can be discontinued through a simple written communication.",
  },
];

export function LandingPage({ config, heroImage }: LandingPageProps) {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 text-cream">
      <Nav config={config} />
      <PersonalInvitation config={config} />
      <CMVideoBanner />
      <PlatformVisionNarrative />
      <Hero config={config} heroImage={heroImage} />
      <Vision />
      <LaunchMoment />
      <CredibilityWall />
      <FoundingTeam />
      <Mandate config={config} />
      <VideoStorytelling />
      <PlatformPreview />
      <Metrics />
      <WhyNow />
      <InvitationForm config={config} />
      <FAQs config={config} />
      <EmotionalClose config={config} />
      <Footer />
      <StickyCta config={config} visible={showSticky} />
    </div>
  );
}

/* --------------------------- CM Video Banner --------------------------- */

function CMVideoBanner() {
  const [open, setOpen] = useState(false);
  const thumb = `https://img.youtube.com/vi/${CM_YOUTUBE_ID}/maxresdefault.jpg`;
  return (
    <section className="relative overflow-hidden bg-navy-950 px-5 py-20 md:px-8 md:py-24">
      <div className="bg-cinematic-glow absolute inset-0 pointer-events-none opacity-60" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play Hon'ble Chief Minister's address"
          className="group relative block aspect-video w-full overflow-hidden"
        >
          <img
            src={thumb}
            alt="Hon'ble Chief Minister Shri Devendra Fadnavis — official address"
            className="mask-vignette absolute inset-0 size-full object-cover opacity-85 transition-opacity group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/70 via-transparent to-transparent" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="relative grid size-20 place-items-center rounded-full bg-accent-orange shadow-[0_0_50px_oklch(0.72_0.20_55/0.7)] transition-transform group-hover:scale-105">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent-orange/40" />
              <span className="relative ml-1.5 size-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-white" />
            </span>
          </div>
        </button>
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-orange">
            Message from Hon'ble Chief Minister
          </span>
          <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
            Hon'ble Shri
          </p>
          <h2 className="mt-1 font-serif text-3xl leading-[1.05] text-cream md:text-4xl">
            Devendra Fadnavis{" "}
            <span className="font-serif text-2xl italic text-accent-orange-soft">ji</span>
          </h2>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-text-secondary">
            Chief Minister of Maharashtra
          </p>
          <p className="mt-6 max-w-[42ch] font-serif text-[18px] italic leading-relaxed text-cream/90">
            "Maharashtra's strength has always been its people — wherever in the world they choose
            to live."
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-2 border-b border-accent-orange pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-orange transition hover:text-cream"
          >
            Play Full Address →
          </button>
        </div>
      </div>
      <YouTubeModal videoId={CM_YOUTUBE_ID} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

/* ----------------------- Platform Vision Narrative --------------------- */

function PlatformVisionNarrative() {
  return (
    <section className="relative overflow-hidden bg-navy-800 px-5 py-20 md:px-8 md:py-28">
      <div className="bg-warm-right absolute inset-0 pointer-events-none opacity-60" />
      <div className="relative mx-auto max-w-3xl">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
          The Platform You Would Help Shape
        </span>
        <div className="mt-3 h-[2px] w-10 bg-accent-orange" />

        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-cream/85 md:text-[17px]">
          <p>
            Maha NRI Connect is being built as a first-of-its-kind institutional bridge connecting the
            global Maharashtrian diaspora — professionals, entrepreneurs, investors, academics, artists
            and community leaders — spread across more than 50 countries, back to Maharashtra and to
            each other.
          </p>
          <p>
            The platform creates structured pathways for investment and mentorship, enables cultural
            continuity and identity preservation for generations growing up abroad, and gives global
            Maharashtrians meaningful ways to contribute to the state they carry in their hearts —
            through education, philanthropy, skill development and rural impact.
          </p>
          <p>
            At the policy level, it opens a trusted channel for diaspora voices to inform governance,
            engage with state initiatives, and participate in Maharashtra's ambitious development
            agenda — while offering a credible platform for philanthropic capital to flow with
            accountability and purpose.
          </p>
          <p className="font-serif italic text-cream">
            What you would be supporting is not a product launch. It is the founding of a trusted
            institution — one designed to serve Maharashtra and its global family for generations to
            come.
          </p>
        </div>

        {/* Expandable: full original detail */}
        <details className="group mt-10 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-orange hover:text-cream transition-colors">
            <span>See the full platform vision</span>
            <span className="transition-transform group-open:rotate-90">→</span>
          </summary>

          <div className="mt-8 space-y-10 border-t border-cream/10 pt-8">
            {/* Original list 1 */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream mb-5">
                How Maha NRI Connect Helps Maharashtra
              </h3>
              <div className="grid gap-px overflow-hidden bg-cream/10 md:grid-cols-2">
                {MAHARASHTRA_BENEFITS.map((it, i) => (
                  <div key={it.title} className="bg-navy-800 p-5 group hover:bg-navy-700 transition-colors">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-orange/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mt-2 font-serif text-base text-cream">{it.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-cream-soft">{it.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Original list 2 */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream mb-5">
                How Maha NRI Connect Helps Global Maharashtrians
              </h3>
              <div className="grid gap-px overflow-hidden bg-cream/10 md:grid-cols-2">
                {DIASPORA_BENEFITS.map((it, i) => (
                  <div key={it.title} className="bg-navy-800 p-5 group hover:bg-navy-700 transition-colors">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-orange/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mt-2 font-serif text-base text-cream">{it.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-cream-soft">{it.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 12-feature platform list (from PlatformPreview) */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream mb-5">
                What the platform brings together
              </h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                {PLATFORM_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 py-1.5 text-[14px] text-cream-soft">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-orange" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}

/* ------------------------ Personal Invitation -------------------------- */

function useUrlName(): string {
  const [name, setName] = useState("Respected Leader");
  useEffect(() => {
    // URLSearchParams decodes %20 but treats + as literal; replace + with space first
    const raw = new URLSearchParams(window.location.search).get("name");
    if (raw?.trim()) setName(raw.trim().replace(/\+/g, " "));
  }, []);
  return name;
}

function PersonalInvitation({ config }: { config: RoleConfig }) {
  const pi = config.personalInvitation;
  const addressee = useUrlName();
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-navy-950 px-5 pb-20 pt-8 md:px-8 md:pb-28 md:pt-12">
      {/* Layered ambient glows */}
      <div className="bg-cinematic-glow absolute inset-0 pointer-events-none" />
      <div className="bg-warm-left absolute inset-0 pointer-events-none opacity-60" />

      <div className="relative mx-auto w-full max-w-6xl animate-mnc-fade-up">

        {/* ── LETTERHEAD SALUTATION — full-width, first thing seen ── */}
        <div className="mb-14 md:mb-18">
          {/* Top rule with flanking labels */}
          <div className="flex items-center justify-between gap-4 pb-5">
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-cream/35">
              Private &amp; Personal
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent-orange/60 via-accent-orange/20 to-transparent" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-cream/35">
              MNRI · 2026
            </span>
          </div>

          {/* The salutation itself */}
          <div className="space-y-1">
            <p className="font-serif text-[1.35rem] italic leading-none text-cream/55 md:text-[1.6rem]">
              Dear
            </p>
            <h1
              className="font-serif leading-[1.04] text-cream"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              {addressee},
            </h1>
          </div>

          {/* Bottom rule */}
          <div className="mt-6 h-px w-full bg-gradient-to-r from-accent-orange/50 via-accent-orange/15 to-transparent" />
          <div className="mt-1.5 h-px w-2/3 bg-gradient-to-r from-accent-orange/20 to-transparent" />
        </div>

        {/* ── LETTER BODY — two columns below the salutation ── */}
        <div className="grid gap-14 md:grid-cols-[1fr_1.45fr] md:gap-24">

          {/* Left column — headline + founder identity */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
                A Personal Invitation
              </span>
              <div className="mt-3 h-[2px] w-10 bg-accent-orange" />
              <p className="mt-6 font-serif text-2xl leading-[1.15] text-cream text-balance md:text-3xl lg:text-[2rem]">
                {pi.headline}
              </p>
            </div>

            {/* Founders signature block */}
            <div className="mt-10 md:mt-0">
              <div className="flex -space-x-3">
                <div className="relative size-[68px] overflow-hidden rounded-full bg-navy-900 ring-2 ring-navy-950 md:size-[76px]">
                  <img
                    src={ashutoshDeshpandeAsset.url}
                    alt="Ashutosh Deshpande, Co-founder, Maha NRI Connect"
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                </div>
                <div className="relative size-[68px] overflow-hidden rounded-full bg-navy-900 ring-2 ring-navy-950 md:size-[76px]">
                  <img
                    src={rahulTulpuleAsset.url}
                    alt="Rahul Tulpule, Co-founder, Maha NRI Connect"
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                </div>
              </div>
              <p className="mt-4 font-serif text-[16px] italic text-cream">
                Ashutosh Deshpande &amp; Rahul Tulpule
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-cream-soft">
                Co-founders · Maha NRI Connect
              </p>
            </div>
          </div>

          {/* Right column — letter paragraphs */}
          <div className="flex flex-col justify-center">
            <div className="space-y-5 text-[16px] leading-[1.8] tracking-[0.005em] text-cream/82 md:text-[17px]">
              {pi.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "drop-cap-orange" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <p className="mt-9 border-l-2 border-accent-orange pl-5 font-serif text-lg italic leading-relaxed text-cream md:text-xl">
              {pi.closingLine}
            </p>

            <div className="mt-10">
              <a
                href="#invitation"
                className="group inline-flex items-center justify-between gap-4 bg-accent-orange px-6 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white shadow-saffron-glow transition-all hover:translate-y-[-1px]"
              >
                <span>{pi.cta}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25" aria-hidden>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
          <path d="M7 3L7 19M2 14L7 19L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cream" />
        </svg>
      </div>
    </section>
  );
}

/* ------------------------------- Nav ----------------------------------- */

function Nav({ config }: { config: RoleConfig }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-cream/8 bg-navy-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-navy-900">
            <div className="size-3.5 rounded-full border border-prestige/30" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
              Maha NRI Connect
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-cream-soft">
              Global Maharashtra Movement
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 px-3 py-1.5 md:flex">
          <span className="size-1.5 rounded-full bg-accent-orange" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-cream-soft">
            By personal invitation
          </span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 md:hidden">
          <span className="size-1.5 rounded-full bg-accent-orange" />
          <span className="text-[9px] uppercase tracking-[0.22em] text-cream-soft">
            By invitation
          </span>
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------ Hero ----------------------------------- */

function Hero({ config, heroImage }: { config: RoleConfig; heroImage: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="bg-cinematic-glow absolute inset-0 pointer-events-none" />

      {/* Full-bleed portrait, feathered into the navy ground on the right side */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block lg:w-[52%]">
        <img
          src={heroImage}
          alt=""
          className="mask-fade-l size-full object-cover object-[30%_center] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/30" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-14 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-8 md:pb-32 md:pt-24">
        <div className="flex flex-col justify-center animate-mnc-fade-up">
          <span className="mb-6 inline-block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-orange">
            {config.eyebrow}
          </span>
          <h1 className="font-serif text-[2.5rem] leading-[1.02] text-cream text-balance md:text-[3.5rem]">
            {config.heroHeadline}
          </h1>
          <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-text-secondary md:text-base">
            {config.heroSubheadline}
          </p>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a
              href="#invitation"
              className="group inline-flex items-center justify-between gap-4 bg-accent-orange px-6 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white shadow-saffron-glow transition-all hover:translate-y-[-1px]"
            >
              <span>{config.primaryCta}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#vision"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream-soft transition-colors hover:text-cream"
            >
              {config.secondaryCta}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Mobile portrait — small bleed at top */}
        <div className="relative md:hidden">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img src={heroImage} alt="" className="mask-fade-b size-full object-cover opacity-95" />
          </div>
        </div>

        {/* Desktop spacer to reserve image room */}
        <div className="hidden md:block" />
      </div>

      <div className="relative border-t border-cream/10 bg-navy-900/60">
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-cream-soft md:px-8">
          <span className="shrink-0 font-semibold text-cream">
            Government-appreciated initiative
          </span>
          <span className="text-cream/20">·</span>
          <span className="shrink-0">Founded in Maharashtra</span>
          <span className="text-cream/20">·</span>
          <span className="shrink-0">Built for the global diaspora</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Vision --------------------------------- */

function Vision() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden border-t border-cream/10 bg-navy-800 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="bg-warm-right absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
          The Vision
        </span>
        <h2 className="mt-4 font-serif text-3xl leading-[1.15] text-cream text-balance md:text-5xl">
          Maharashtra is no longer limited by geography. It lives wherever Maharashtrians lead,
          build, create and contribute.
        </h2>
        <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-cream-soft md:text-base">
          <p>
            Maha NRI Connect is being built as the trusted digital bridge between Maharashtra and
            its global diaspora — entrepreneurs, professionals, students, investors, artists,
            scientists, cultural leaders, institutions and friends of Maharashtra across the world.
          </p>
          <p>
            The platform enables meaningful engagement across investment, industry, innovation,
            education, mentorship, culture, tourism, philanthropy, community welfare and global
            collaboration.
          </p>
          <p className="font-serif italic text-cream">
            This is not only a digital platform. It is an ecosystem for belonging, contribution and
            impact.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Credibility Wall ---------------------------- */

const CREDIBILITY = [
  {
    eyebrow: "Patron",
    honorific: "Hon'ble Shri",
    name: "Jaykumar Rawal",
    suffix: "ji",
    role: "Minister · Government of Maharashtra",
    quote: "A platform like this can become a true bridge for our global Maharashtrian family.",
    image: jaikumarRawalAsset.url,
  },
  {
    eyebrow: "Patron",
    honorific: "Hon'ble Dr.",
    name: "Uday Samant",
    suffix: "ji",
    role: "Minister · Industries, Government of Maharashtra",
    quote: "Maharashtra's diaspora is a powerful force. Connecting them with home is essential.",
    image: udaySamantAsset.url,
  },
];

function CredibilityWall() {
  return (
    <section className="relative overflow-hidden bg-navy-900 px-5 py-20 text-prestige md:px-8 md:py-28">
      <div className="bg-warm-left absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
              Leadership & Credibility
            </span>
            <div className="mt-2 h-[2px] w-12 bg-accent-orange" />
            <h2 className="mt-4 max-w-[22ch] font-serif text-3xl leading-[1.1] text-balance md:text-5xl">
              Appreciated at the highest levels of state leadership.
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-cream/10 md:block" />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {CREDIBILITY.map((c) => (
            <article
              key={c.name}
              className="group grid grid-cols-[140px_1fr] gap-5 overflow-hidden rounded-[6px] border border-cream/10 bg-navy-800 p-5 transition-all hover:border-accent-orange/30 hover:shadow-[0_30px_60px_-20px_oklch(0.72_0.20_55/0.25)] md:grid-cols-[180px_1fr] md:gap-6 md:p-6"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-navy-900 ring-1 ring-cream/10">
                <img
                  src={c.image}
                  alt={`${c.honorific} ${c.name} ${c.suffix}`}
                  className="absolute inset-0 size-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/80 to-transparent" />
                <div className="absolute left-2 top-2 rounded-sm bg-navy-950/70 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-accent-orange-soft backdrop-blur-sm">
                  {c.eyebrow}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <PatronName honorific={c.honorific} name={c.name} suffix={c.suffix} />
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
                  {c.role}
                </p>
                <p className="mt-4 border-l-2 border-accent-orange/60 pl-3 font-serif text-[14px] italic leading-relaxed text-text-secondary">
                  "{c.quote}"
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

function FounderCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-navy-900 ring-1 ring-cream/15">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 size-full object-cover object-top"
        />
      </div>
      <div className="min-w-0">
        <p className="font-serif text-lg text-prestige">{name}</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-prestige/55">{role}</p>
      </div>
    </div>
  );
}

/* --------------------------- Launch Moment ----------------------------- */

function LaunchMoment() {
  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-navy-950 py-24 md:py-32">
      <div className="bg-cinematic-glow absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-[1.5fr_1fr] md:gap-16 md:px-10 lg:gap-20">
        {/* Left: unframed cinematic plate that bleeds left */}
        <div className="relative -ml-5 md:-ml-10">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <img
              src={cmAnnouncingAsset.url}
              alt="Hon'ble Chief Minister Shri Devendra Fadnavis ji announcing Maha NRI Connect at Davos, January 19, 2026"
              className="mask-fade-r size-full object-cover contrast-[1.04] saturate-[0.92]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-navy-950/40" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/70 to-transparent" />
            <div className="absolute bottom-5 left-5 md:bottom-7 md:left-10">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/90">
                Davos · January 19, 2026
              </span>
            </div>
          </div>
        </div>

        {/* Right: editorial copy */}
        <div className="relative">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-accent-orange/70" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-orange">
              Launch Moment
            </span>
          </div>

          <h2 className="mt-6 font-serif text-4xl leading-[1.04] tracking-tight text-cream md:text-5xl lg:text-[3.5rem]">
            Announced to the world{" "}
            <em className="font-serif italic font-normal text-accent-orange-soft">at Davos.</em>
          </h2>

          <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-text-secondary md:text-base">
            Hon'ble Chief Minister Shri Devendra Fadnavis <span className="italic">ji</span>{" "}
            unveiling Maha NRI Connect to the global stage — a public commitment to the worldwide
            Maharashtrian community.
          </p>

          <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
            World Economic Forum · Switzerland
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Founding Team ----------------------------- */

const FOUNDERS = [
  {
    name: "Rahul Tulpule",
    role: "Co-Founder · Maha NRI Connect",
    quote:
      "Maharashtra's diaspora has waited a long time for a serious bridge home. We're building that bridge.",
    image: rahulTulpuleAsset.url,
  },
  {
    name: "Ashutosh Deshpande",
    role: "Co-Founder · Maha NRI Connect",
    quote:
      "This platform is engineered for trust, scale and longevity — not as a campaign, but as an institution.",
    image: ashutoshDeshpandeAsset.url,
  },
];

function FoundingTeam() {
  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-navy-800 px-5 py-20 md:px-8 md:py-28">
      <div className="bg-warm-left absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
              The Founding Team
            </span>
            <div className="mt-2 h-[2px] w-12 bg-accent-orange" />
            <h2 className="mt-5 max-w-[24ch] font-serif text-3xl leading-[1.1] text-cream text-balance md:text-5xl">
              Built by Maharashtrians, for Maharashtrians worldwide.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-text-secondary">
              Two co-founders driving Maha NRI Connect from vision to launch.
            </p>
          </div>
          <div className="hidden h-px flex-1 bg-cream/10 md:block" />
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {FOUNDERS.map((f) => (
            <article key={f.name} className="group">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={f.image}
                  alt={f.name}
                  className="mask-fade-b absolute inset-0 size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                />
              </div>
              <div className="-mt-4 relative">
                <h3 className="font-serif text-3xl leading-tight text-cream md:text-4xl">
                  {f.name}
                </h3>
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
                  {f.role}
                </p>
                <p className="mt-5 max-w-[44ch] font-serif text-base italic leading-relaxed text-text-secondary">
                  "{f.quote}"
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Mandate --------------------------------- */

function Mandate({ config }: { config: RoleConfig }) {
  return (
    <section className="relative overflow-hidden border-y border-cream/10 bg-navy-700 px-5 py-20 md:px-8 md:py-28">
      <div className="bg-warm-right absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
          {config.eyebrow}
        </span>
        <h2 className="mt-3 font-serif text-3xl leading-[1.1] text-cream text-balance md:text-4xl">
          {config.mandateHeading}
        </h2>
        <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-text-secondary md:text-base">
          {config.mandateIntro}
        </p>

        <div className="mt-12 space-y-10">
          {config.mandateItems.map((item, i) => (
            <div key={item.title} className="grid grid-cols-[auto_1fr] gap-5 md:gap-8">
              <span className="font-serif text-3xl text-accent-orange md:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-xl text-cream md:text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-cream-soft">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border-l-2 border-accent-orange pl-5">
          <p className="font-serif text-lg italic text-cream md:text-xl">{config.benefitLine}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Impact --------------------------------- */

function Impact({
  title,
  items,
  invert,
}: {
  title: string;
  items: { title: string; body: string }[];
  invert?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden px-5 py-20 md:px-8 md:py-28 ${
        invert ? "bg-navy-900 text-prestige" : "bg-navy-800 text-cream"
      }`}
    >
      <div
        className={`${invert ? "bg-warm-left" : "bg-warm-right"} absolute inset-0 pointer-events-none`}
      />
      <div className="relative mx-auto max-w-6xl">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
          {invert ? "For the Diaspora" : "For Maharashtra"}
        </span>
        <div className="mt-2 h-[2px] w-12 bg-accent-orange" />
        <h2
          className={`mt-5 max-w-[22ch] font-serif text-3xl leading-[1.1] text-balance md:text-5xl ${
            invert ? "text-prestige" : "text-cream"
          }`}
        >
          {title}
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden bg-cream/10 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <div
              key={it.title}
              className={`group relative p-6 transition-colors hover:bg-navy-700 ${
                invert ? "bg-navy-900" : "bg-navy-800"
              }`}
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-orange/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`mt-2 font-serif text-lg ${invert ? "text-prestige" : "text-cream"}`}>
                {it.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  invert ? "text-prestige/60" : "text-cream-soft"
                }`}
              >
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Video Storytelling ------------------------- */

const VIDEO_CARDS = [
  {
    honorific: "Hon'ble Shri",
    name: "Jaykumar Rawal",
    suffix: "ji",
    summary: "On preserving identity and culture across generations abroad.",
    image: jaikumarRawalAsset.url,
  },
  {
    honorific: "Hon'ble Dr.",
    name: "Uday Samant",
    suffix: "ji",
    summary: "On industry, investment and global Maharashtrian engagement.",
    image: udaySamantAsset.url,
  },
];

function VideoStorytelling() {
  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-navy-800 px-5 py-20 md:px-8 md:py-28">
      <div className="bg-warm-left absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
              Messages from our Patrons
            </span>
            <div className="mt-2 h-[2px] w-12 bg-accent-orange" />
            <h2 className="mt-5 max-w-[24ch] font-serif text-3xl leading-[1.1] text-cream text-balance md:text-5xl">
              Words of guidance from those who back this journey.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {VIDEO_CARDS.map((v) => (
            <article
              key={v.name}
              className="group overflow-hidden rounded-[6px] border border-cream/10 bg-navy-900 transition-all hover:border-accent-orange/30 hover:shadow-[0_30px_60px_-20px_oklch(0.72_0.20_55/0.3)]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-navy-900">
                <img
                  src={v.image}
                  alt={`${v.honorific} ${v.name} ${v.suffix}`}
                  className="absolute inset-0 size-full object-cover object-top opacity-80 transition-all duration-500 group-hover:opacity-95 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/85 via-navy-950/35 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid size-16 place-items-center rounded-full bg-accent-orange/90 shadow-[0_0_30px_oklch(0.72_0.20_55/0.55)] transition-transform group-hover:scale-110">
                    <div className="ml-1 size-0 border-y-[10px] border-l-[14px] border-y-transparent border-l-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 rounded-sm bg-navy-950/70 px-2 py-1 text-[9px] uppercase tracking-[0.22em] text-accent-orange-soft backdrop-blur-sm">
                  Video · Coming Soon
                </div>
              </div>
              <div className="p-6">
                <PatronName honorific={v.honorific} name={v.name} suffix={v.suffix} />
                <p className="mt-3 font-serif text-base italic leading-relaxed text-text-secondary">
                  "{v.summary}"
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Platform Preview -------------------------- */

function PlatformPreview() {
  return (
    <section className="relative overflow-hidden bg-navy-900 px-5 py-20 md:px-8 md:py-28">
      <div className="bg-cool-top absolute inset-0 pointer-events-none" />
      <div className="bg-warm-right absolute inset-0 pointer-events-none opacity-70" />
      <div className="relative mx-auto max-w-6xl">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
          The Platform
        </span>
        <h2 className="mt-3 max-w-[22ch] font-serif text-3xl leading-[1.1] text-cream text-balance md:text-4xl">
          One unified ecosystem for the global Maharashtra movement.
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <div className="grid gap-4">
            <BeforeAfter
              eyebrow="Before"
              tone="muted"
              items={[
                "Fragmented communities",
                "Limited discoverability",
                "Scattered communication",
                "No structured diaspora database",
                "Missed opportunities",
              ]}
            />
            <BeforeAfter
              eyebrow="After Maha NRI Connect"
              tone="accent"
              items={[
                "Unified global platform",
                "Direct Maharashtra–diaspora bridge",
                "Higher discoverability",
                "Structured engagement",
                "Measurable impact",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({
  eyebrow,
  items,
  tone,
}: {
  eyebrow: string;
  items: string[];
  tone: "muted" | "accent";
}) {
  const isAccent = tone === "accent";
  return (
    <div
      className={`rounded-[6px] border p-6 ${
        isAccent
          ? "border-cream/15 bg-navy-950 text-prestige"
          : "border-cream/10 bg-navy-800 text-cream"
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
          isAccent ? "text-accent-orange-soft" : "text-cream-soft"
        }`}
      >
        {eyebrow}
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((it) => (
          <li
            key={it}
            className={`flex items-start gap-3 text-sm ${
              isAccent ? "text-prestige/85" : "text-cream-soft"
            }`}
          >
            <span
              className={`mt-2 size-1 shrink-0 rounded-full ${
                isAccent ? "bg-accent-orange" : "bg-ink-soft/40"
              }`}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------- Metrics --------------------------------- */

function Metrics() {
  return (
    <section className="relative overflow-hidden border-y border-cream/10 bg-navy-700 px-5 py-20 md:px-8 md:py-28">
      <div className="bg-cool-top absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
            Targets & Ambition
          </span>
          <div className="mt-2 h-[2px] w-12 bg-accent-orange" />
          <h2 className="mt-5 font-serif text-3xl leading-[1.1] text-cream text-balance md:text-5xl">
            What we are building toward.
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="group relative bg-navy-800 p-6 transition-colors hover:bg-navy-600"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-4xl text-accent-orange md:text-5xl">
                  {m.value}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-accent-orange">
                  {m.note}
                </span>
              </div>
              <p className="mt-3 text-sm text-cream-soft">{m.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-cream-soft/45">
          Numbers represent vision and ambition for the platform — not achieved metrics.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ Why Now -------------------------------- */

function WhyNow() {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-5 py-20 text-prestige md:px-8 md:py-28">
      <div className="bg-warm-left absolute inset-0 pointer-events-none" />
      <div className="bg-cinematic-grain absolute inset-0 pointer-events-none opacity-30" />
      <div className="relative mx-auto max-w-3xl">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
          Why Now
        </span>
        <h2 className="mt-3 font-serif text-3xl leading-[1.1] text-balance md:text-5xl">
          The people who join now will shape the DNA of the platform.
        </h2>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-prestige/70 md:text-base">
          <p>
            Maharashtra is entering a new phase of global ambition across industry, innovation,
            infrastructure, education, culture and investment.
          </p>
          <p>
            At the same time, Maharashtrians across the world are achieving extraordinary success
            but remain scattered across disconnected communities and networks.
          </p>
          <p className="font-serif italic text-prestige">
            Maha NRI Connect is the missing bridge — and the founding phase is the moment to shape
            it.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Invitation Form --------------------------- */

function InvitationForm({ config }: { config: RoleConfig }) {
  const submit = useServerFn(submitInvitation);
  const [showOptional, setShowOptional] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: (data: InvitationInput) => submit({ data }),
  });

  function toggleArea(id: string) {
    setSelectedAreas((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const consent = fd.get("consent") === "on";
    if (!consent) return;
    const payload = {
      role: config.slug,
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      city: String(fd.get("city") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      linkedin: String(fd.get("linkedin") ?? ""),
      contribution: String(fd.get("contribution") ?? ""),
      preferredTime: String(fd.get("preferredTime") ?? ""),
      contributionAreas: selectedAreas,
      consent: true as const,
    };
    mutation.mutate(payload);
  }

  const success = mutation.data?.ok;

  return (
    <section
      id="invitation"
      className="relative overflow-hidden bg-navy-950 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="bg-cobalt-bloom absolute inset-0 pointer-events-none opacity-70" />
      <div className="bg-warm-right absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-2xl">
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
            Personal Invitation
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-[1.1] text-cream text-balance md:text-4xl">
            An invitation to help shape the beginning.
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-[15px] leading-relaxed text-cream-soft">
            This is not a mass invitation. It is a call to those whose experience, credibility,
            influence or achievements can help transform Maha NRI Connect from a platform into a
            movement.
          </p>
          <p className="mx-auto mt-8 max-w-[52ch] font-serif text-[17px] italic leading-relaxed text-cream/90">
            To formally accept, please share your details below. Ashutosh and Rahul will write to
            you personally within 48 hours.
          </p>
        </div>

        {success ? (
          <div className="mt-12 rounded-[6px] border border-accent-orange/30 bg-navy-800 p-8 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-accent-orange/10">
              <div className="size-3 rotate-45 border-b-2 border-r-2 border-accent-orange" />
            </div>
            <h3 className="mt-5 font-serif text-2xl text-cream">Received.</h3>
            <p className="mx-auto mt-3 max-w-[44ch] text-sm text-cream-soft">
              {mutation.data?.message}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-5 rounded-[6px] border border-cream/10 bg-navy-800 p-6 md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name" name="fullName" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Phone / WhatsApp" name="phone" type="tel" required autoComplete="tel" />
              <Field label="Country" name="country" required autoComplete="country-name" />
              <Field label="City" name="city" required autoComplete="address-level2" />
              <div className="flex items-end">
                <div className="rounded-sm border border-cream/10 bg-navy-800 px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] text-cream">
                  Role · {config.eyebrow}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowOptional((s) => !s)}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-orange underline-offset-4 hover:underline"
            >
              {showOptional ? "Hide" : "Tell us more"} (optional)
            </button>

            {showOptional && (
              <div className="space-y-5 border-t border-cream/10 pt-5">
                <Field label="Organisation / designation" name="organisation" />
                <Field label="LinkedIn URL" name="linkedin" type="url" placeholder="https://" />
                <Field
                  label="Preferred time for a call"
                  name="preferredTime"
                  placeholder="e.g. weekday evenings IST"
                />
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-soft">
                    How would you like to contribute?
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {config.contributionOptions.map((opt) => {
                      const selected = selectedAreas.includes(opt.id);
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => toggleArea(opt.id)}
                          className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                            selected
                              ? "border-accent-orange bg-accent-orange text-white"
                              : "border-cream/15 bg-navy-800 text-cream-soft hover:border-accent-orange/40"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-soft">
                    Anything else
                  </label>
                  <textarea
                    name="contribution"
                    rows={3}
                    className="mt-2 w-full rounded-sm border border-cream/15 bg-navy-900 px-3 py-2 text-sm focus:border-accent-orange focus:outline-none"
                  />
                </div>
              </div>
            )}

            <label className="flex items-start gap-3 border-t border-cream/10 pt-5 text-xs text-cream-soft">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 size-4 accent-accent-orange"
              />
              <span>
                I consent to being contacted by the Maha NRI Connect founding team about this
                invitation.
              </span>
            </label>

            {mutation.isError && (
              <p className="text-sm text-destructive">
                Something went wrong. Please try again in a moment.
              </p>
            )}

            <p className="text-center text-[10px] uppercase tracking-[0.22em] text-cream-soft/60">
              MNRI · {config.slug.toUpperCase()} · 2026
            </p>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="group flex w-full items-center justify-between bg-accent-orange px-6 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-saffron-glow transition-all hover:translate-y-[-1px] disabled:opacity-60"
            >
              <span>{mutation.isPending ? "Submitting…" : config.primaryCta}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-soft">
        {label}
        {required && <span className="ml-1 text-accent-orange">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-cream/15 bg-navy-900 px-3 py-2.5 text-sm focus:border-accent-orange focus:outline-none"
      />
    </label>
  );
}

/* -------------------------------- FAQs --------------------------------- */

function FAQs({ config }: { config: RoleConfig }) {
  const all = [...config.roleSpecificFaqs, ...COMMON_FAQS];
  return (
    <section className="border-t border-cream/10 bg-navy-900 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange">
          Frequently Asked
        </span>
        <h2 className="mt-3 font-serif text-3xl leading-[1.1] text-cream text-balance md:text-4xl">
          What you may be wondering.
        </h2>
        <dl className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
          {all.map((item) => (
            <details key={item.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <dt className="font-serif text-lg text-cream">{item.q}</dt>
                <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-cream/15 text-cream transition-transform group-open:rotate-45">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <dd className="mt-3 max-w-[60ch] text-sm leading-relaxed text-cream-soft">
                {item.a}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------- Emotional Close ----------------------------- */

function EmotionalClose({ config }: { config: RoleConfig }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-5 py-24 text-prestige md:px-8 md:py-32">
      <div className="absolute inset-0 bg-mnc-mesh opacity-30" />
      <div className="absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-accent-orange/15 blur-[120px] animate-mnc-pulse" />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange-soft">
          {config.finalClose}
        </span>
        <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-balance md:text-6xl">
          Maha NRI Connect is not just launching a website. It is building the most trusted global
          bridge between Maharashtra and its diaspora.
        </h2>
        <p className="mx-auto mt-6 max-w-[44ch] font-serif text-lg italic text-prestige/80">
          {config.emotionalCloser}
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#invitation"
            className="group inline-flex items-center justify-between gap-4 bg-accent-orange px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-saffron-glow transition-all hover:translate-y-[-1px]"
          >
            <span>{config.primaryCta}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-prestige/15 bg-transparent px-6 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-prestige transition-colors hover:bg-cream/5"
          >
            Explore all invitations
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-navy-900 px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="grid size-8 place-items-center rounded-full bg-navy-900">
            <div className="size-3 rounded-full border border-prestige/30" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream">
              Maha NRI Connect
            </p>
            <p className="text-[9px] uppercase tracking-[0.22em] text-cream-soft">
              Global Maharashtra Movement
            </p>
          </div>
        </div>
        <nav className="flex gap-2 flex-wrap justify-center text-[10px] uppercase tracking-[0.22em] text-cream-soft">
          {ALL_ROLES.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              className="rounded-full border border-cream/10 px-3 py-1.5 transition-colors hover:border-accent-orange hover:text-cream"
            >
              {r.short}
            </Link>
          ))}
        </nav>
        <p className="text-[10px] uppercase tracking-[0.22em] text-cream-soft">
          © {new Date().getFullYear()} · Invite Only
        </p>
      </div>
    </footer>
  );
}

/* --------------------------- Sticky CTA -------------------------------- */

function StickyCta({ config, visible }: { config: RoleConfig; visible: boolean }) {
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <a
        href="#invitation"
        className="pointer-events-auto flex items-center justify-between gap-4 rounded-full bg-navy-950 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-prestige shadow-2xl ring-1 ring-black/20 backdrop-blur-xl"
      >
        <span className="truncate">{config.primaryCta}</span>
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-orange text-white">
          →
        </span>
      </a>
    </div>
  );
}
