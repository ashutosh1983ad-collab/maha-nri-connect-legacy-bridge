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
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-tertiary">
        {honorific}
      </p>
      <h3 className="mt-1 font-serif text-[1.5rem] leading-[1.1] tracking-[-0.02em] text-cream md:text-[1.75rem]">
        {name} <span className="font-serif text-base italic text-accent-orange-soft">{suffix}</span>
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
        className="relative w-full max-w-5xl overflow-hidden rounded-[6px] border border-cream/15 bg-navy-950 shadow-[0_60px_120px_-20px_oklch(0.10_0.055_255/0.92)]"
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
  { slug: "advisory", path: "/advisory", short: "Advisory Board" },
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
  const [acceptStage, setAcceptStage] = useState<"cta" | "reply" | "confirmed">("cta");

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openAcceptance() {
    setAcceptStage("reply");
    setTimeout(() => {
      document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div className="min-h-screen bg-navy-950 text-cream">
      <Nav config={config} />
      <PersonalInvitation config={config} onAccept={openAcceptance} />
      <Mandate config={config} />
      <CMVideoBanner />
      <CredibilityWall />
      <Hero config={config} heroImage={heroImage} onAccept={openAcceptance} />
      <Vision />
      <FoundingTeam />
      <PlatformPreview />
      <InvitationForm config={config} stage={acceptStage} setStage={setAcceptStage} />
      <FAQs config={config} />
      <EmotionalClose config={config} onAccept={openAcceptance} />
      <Footer />
      <StickyCta config={config} visible={showSticky} onAccept={openAcceptance} />
    </div>
  );
}

/* --------------------------- CM Video Banner --------------------------- */

function CMVideoBanner() {
  const [open, setOpen] = useState(false);
  const thumb = cmAnnouncingAsset.url;
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
            alt="Hon'ble Chief Minister Shri Devendra Fadnavis announcing Maha NRI Connect at Davos"
            className="absolute inset-0 size-full object-cover object-center opacity-88 transition-opacity group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/75 via-navy-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
          {/* Davos caption */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
            <div className="h-px w-6 bg-accent-orange/80" />
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-cream/80">
              Davos · January 19, 2026
            </span>
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <span className="relative grid size-20 place-items-center rounded-full bg-accent-orange shadow-[0_0_50px_oklch(0.76_0.22_48/0.75)] transition-transform group-hover:scale-105">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent-orange/40" />
              <span className="relative ml-1.5 size-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-white" />
            </span>
          </div>
        </button>
        <div>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-accent-orange">
            Message from Hon'ble Chief Minister
          </span>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-text-tertiary">
            Hon'ble Shri
          </p>
          <h2 className="mt-1 font-serif text-[1.875rem] leading-[1.05] tracking-[-0.02em] text-cream md:text-[2.5rem]">
            Devendra Fadnavis{" "}
            <span className="font-serif text-xl italic text-accent-orange-soft">ji</span>
          </h2>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-text-secondary">
            Chief Minister of Maharashtra
          </p>
          <p className="mt-6 max-w-[42ch] font-serif text-lg italic leading-[1.7] text-cream/90">
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

/* ------------------------ Personal Invitation -------------------------- */

function useUrlParams() {
  const [params, setParams] = useState({
    name: "Respected Leader",
    email: "",
    phone: "",
    country: "",
    city: "",
  });
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const get = (k: string) => sp.get(k)?.trim().replace(/\+/g, " ") ?? "";
    setParams({
      name: get("name") || "Respected Leader",
      email: get("email"),
      phone: get("phone"),
      country: get("country"),
      city: get("city"),
    });
  }, []);
  return params;
}

function PersonalInvitation({ config, onAccept }: { config: RoleConfig; onAccept: () => void }) {
  const pi = config.personalInvitation;
  const { name: addressee } = useUrlParams();
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-navy-950">
      {/* ── Atmosphere layers ── */}
      <div className="pointer-events-none absolute inset-0 bg-cinematic-glow" />
      {/* Central name glow — the page's light source */}
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[55vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.58 0.185 232 / 0.22) 0%, oklch(0.76 0.22 48 / 0.08) 45%, transparent 72%)",
        }}
        aria-hidden
      />
      {/* Saffron rim light — bottom right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[45vh] w-[50vw] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 80% 100%, oklch(0.76 0.22 48 / 0.14) 0%, transparent 62%)",
        }}
        aria-hidden
      />
      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />

      {/* ── MASTHEAD ── */}
      <div
        className="relative z-10 flex items-center justify-between px-6 pt-8 animate-mnc-fade-up md:px-14 md:pt-10"
        style={{ animationDelay: "0ms", animationFillMode: "both" }}
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.38em] text-cream/25">
          Private &amp; Personal
        </span>
        <div className="h-px flex-1 mx-6 bg-gradient-to-r from-transparent via-accent-orange/20 to-transparent" />
        <span className="font-mono text-[8px] uppercase tracking-[0.38em] text-cream/25">
          MNRI · 2026
        </span>
      </div>

      {/* ── NAME — the centrepiece ── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 md:px-14">
        <div
          className="animate-mnc-fade-up"
          style={{ animationDelay: "80ms", animationFillMode: "both" }}
        >
          <p
            className="font-serif italic text-cream/38 leading-none mb-2"
            style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.35rem)" }}
          >
            Dear
          </p>
          <h1
            className="font-serif text-cream leading-[0.97] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 6.5rem)" }}
          >
            {addressee},
          </h1>
        </div>

        {/* Saffron rule beneath the name */}
        <div
          className="animate-mnc-fade-up mt-5 md:mt-7"
          style={{ animationDelay: "160ms", animationFillMode: "both" }}
        >
          <div className="h-px w-full bg-gradient-to-r from-accent-orange/65 via-accent-orange/25 to-transparent" />
          <div className="mt-1.5 h-px w-2/5 bg-gradient-to-r from-accent-orange/28 to-transparent" />
        </div>

        {/* ── BODY — 2 emotional lines only ── */}
        <div
          className="animate-mnc-fade-up mt-7 max-w-xl md:mt-9"
          style={{ animationDelay: "240ms", animationFillMode: "both" }}
        >
          <p className="text-base leading-[1.82] tracking-[0.004em] text-cream/68 md:text-[17px]">
            {pi.paragraphs[1]}
          </p>
          <p className="mt-4 text-base leading-[1.82] tracking-[0.004em] text-cream/68 md:text-[17px]">
            {pi.paragraphs[2]}
          </p>
        </div>

        {/* Closing quote */}
        <div
          className="animate-mnc-fade-up mt-7 max-w-xl md:mt-9"
          style={{ animationDelay: "320ms", animationFillMode: "both" }}
        >
          <p className="border-l-2 border-accent-orange pl-5 font-serif text-lg italic leading-relaxed text-cream/85">
            {pi.closingLine}
          </p>
        </div>

        {/* ── FOUNDERS + CTA — signed letter bottom ── */}
        <div
          className="animate-mnc-fade-up mt-9 md:mt-11"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          {/* Founders row */}
          <div className="flex flex-wrap items-center gap-5 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-accent-orange/30 md:size-[60px]">
                <img
                  src={ashutoshDeshpandeAsset.url}
                  alt="Ashutosh Deshpande"
                  className="absolute inset-0 size-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-serif text-[15px] leading-snug text-cream">Ashutosh Deshpande</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-cream/40 mt-1">
                  Co-founder
                </p>
              </div>
            </div>

            <div className="h-10 w-px bg-cream/12 hidden sm:block" />

            <div className="flex items-center gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-accent-orange/30 md:size-[60px]">
                <img
                  src={rahulTulpuleAsset.url}
                  alt="Rahul Tulpule"
                  className="absolute inset-0 size-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-serif text-[15px] leading-snug text-cream">Rahul Tulpule</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-cream/40 mt-1">
                  Co-founder
                </p>
              </div>
            </div>
          </div>

          {/* CTA below founders — natural reading flow */}
          <div className="mt-7">
            <button
              onClick={onAccept}
              className="group inline-flex items-center gap-4 bg-accent-orange px-7 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-navy-950 shadow-saffron-glow transition-all duration-200 hover:-translate-y-px hover:shadow-saffron-glow-lg"
            >
              <span>{pi.cta}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="relative z-10 flex flex-col items-center gap-2 pb-8 opacity-[0.18]"
        aria-hidden
      >
        <div className="h-8 w-px bg-gradient-to-b from-transparent to-cream/60" />
        <div className="size-1 rounded-full bg-cream/60" />
      </div>
    </section>
  );
}

/* ------------------------------- Nav ----------------------------------- */

function Nav({ config }: { config: RoleConfig }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-cream/8 bg-navy-950/85 backdrop-blur-md">
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

function Hero({ config, heroImage, onAccept }: { config: RoleConfig; heroImage: string; onAccept: () => void }) {
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
          <h1 className="font-serif text-[1.875rem] leading-[1.02] text-cream text-balance md:text-[3rem]">
            {config.heroHeadline}
          </h1>
          <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-text-secondary">
            {config.heroSubheadline}
          </p>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <button
              onClick={onAccept}
              className="group inline-flex items-center justify-between gap-4 bg-accent-orange px-6 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-navy-950 shadow-saffron-glow transition-all hover:translate-y-[-1px]"
            >
              <span>{config.primaryCta}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
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

      <div className="relative border-t border-cream/10 bg-navy-950/60">
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
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-accent-orange">
          The Vision
        </span>
        <h2 className="mt-4 font-serif text-[1.875rem] leading-[1.1] tracking-[-0.02em] text-cream text-balance md:text-5xl">
          Maharashtra is no longer limited by geography. It lives wherever Maharashtrians lead,
          build, create and contribute.
        </h2>
        <div className="mt-10 space-y-5 text-base leading-relaxed text-cream-soft">
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
    eyebrow: "Advisor",
    honorific: "Hon'ble Shri",
    name: "Jaykumar Rawal",
    suffix: "ji",
    role: "Minister · Government of Maharashtra",
    quote: "A platform like this can become a true bridge for our global Maharashtrian family.",
    image: jaikumarRawalAsset.url,
  },
  {
    eyebrow: "Advisor",
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
    <section className="relative overflow-hidden bg-navy-950 px-5 py-20 text-prestige md:px-10 md:py-32">
      <div className="bg-cinematic-glow absolute inset-0 pointer-events-none opacity-60" />
      <div className="bg-warm-right absolute inset-0 pointer-events-none opacity-40" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 md:mb-18">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.35em] text-accent-orange">
            Elite Advisory Board
          </span>
          <div className="mt-2.5 h-[2px] w-10 bg-accent-orange" />
          <h2 className="mt-5 max-w-[26ch] font-serif text-[1.875rem] leading-[1.08] text-cream text-balance md:text-5xl">
            Endorsed at the highest levels of Maharashtra's state leadership.
          </h2>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-cream/55">
            Both ministers are active members of the Elite Advisory Board — a testament to the
            platform's mandate within government.
          </p>
        </div>

        {/* Editorial portrait grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {CREDIBILITY.map((c) => (
            <article
              key={c.name}
              className="group relative overflow-hidden rounded-[4px] bg-navy-950"
            >
              {/* Full-bleed portrait — fills the card */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src={c.image}
                  alt={`${c.honorific} ${c.name} ${c.suffix}`}
                  className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Deep cinematic gradient from bottom — holds the text */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 via-[55%] to-transparent" />
                {/* Subtle vignette on sides */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/30 to-transparent" />

                {/* Eyebrow badge — top left */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <div className="h-px w-5 bg-accent-orange" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-accent-orange">
                    {c.eyebrow}
                  </span>
                </div>

                {/* Content overlaid at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  {/* Pull quote — headline size, the centrepiece */}
                  <blockquote className="mb-6">
                    <p className="font-serif text-lg italic leading-[1.45] text-cream">
                      "{c.quote}"
                    </p>
                  </blockquote>

                  {/* Horizontal rule */}
                  <div className="mb-5 h-px w-full bg-gradient-to-r from-accent-orange/50 to-transparent" />

                  {/* Name + role — editorial byline */}
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.28em] text-accent-orange/70">
                        {c.honorific}
                      </p>
                      <h3 className="mt-0.5 font-serif text-[1.5rem] leading-tight text-cream md:text-[1.75rem]">
                        {c.name}{" "}
                        <span className="font-serif text-base italic text-accent-orange/80">
                          {c.suffix}
                        </span>
                      </h3>
                      <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-cream/45">
                        {c.role}
                      </p>
                    </div>
                    {/* Decorative corner accent */}
                    <div className="shrink-0 flex flex-col items-end gap-1 mb-1">
                      <div className="h-px w-8 bg-accent-orange/40" />
                      <div className="h-px w-5 bg-accent-orange/25" />
                    </div>
                  </div>
                </div>
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
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-accent-orange">
              The Founding Team
            </span>
            <div className="mt-2 h-[2px] w-12 bg-accent-orange" />
            <h2 className="mt-5 max-w-[24ch] font-serif text-3xl leading-[1.08] tracking-[-0.02em] text-cream text-balance md:text-5xl">
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
                <h3 className="font-serif text-[1.875rem] leading-tight text-cream md:text-[2.5rem]">
                  {f.name}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
                  {f.role}
                </p>
                <p className="mt-5 max-w-[44ch] font-serif text-lg italic leading-relaxed text-text-secondary">
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
    <section className="relative overflow-hidden border-y border-cream/10 bg-navy-800 px-5 py-20 md:px-8 md:py-28">
      <div className="bg-warm-right absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-accent-orange">
          {config.eyebrow}
        </span>
        <h2 className="mt-3 font-serif text-[1.875rem] leading-[1.08] tracking-[-0.02em] text-cream text-balance md:text-5xl">
          {config.mandateHeading}
        </h2>
        <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-text-secondary">
          {config.mandateIntro}
        </p>

        <div className="mt-12 space-y-10">
          {config.mandateItems.map((item, i) => (
            <div key={item.title} className="grid grid-cols-[auto_1fr] gap-5 md:gap-8">
              <span className="font-mono text-[1.5rem] text-accent-orange md:text-[2rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-xl leading-snug text-cream">{item.title}</h3>
                <p className="mt-2 max-w-[56ch] text-base leading-relaxed text-cream-soft">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border-l-2 border-accent-orange pl-5">
          <p className="font-serif text-lg italic text-cream">{config.benefitLine}</p>
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
        invert ? "bg-navy-950 text-prestige" : "bg-navy-800 text-cream"
      }`}
    >
      <div
        className={`${invert ? "bg-warm-left" : "bg-warm-right"} absolute inset-0 pointer-events-none`}
      />
      <div className="relative mx-auto max-w-6xl">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-accent-orange">
          {invert ? "For the Diaspora" : "For Maharashtra"}
        </span>
        <div className="mt-2 h-[2px] w-12 bg-accent-orange" />
        <h2
          className={`mt-5 max-w-[22ch] font-serif text-[1.875rem] leading-[1.08] tracking-[-0.02em] text-balance md:text-5xl ${
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
                invert ? "bg-navy-950" : "bg-navy-800"
              }`}
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-orange/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-2 font-serif text-xl leading-snug ${invert ? "text-prestige" : "text-cream"}`}
              >
                {it.title}
              </h3>
              <p
                className={`mt-3 text-[13px] leading-relaxed ${
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

/* --------------------------- Platform Preview -------------------------- */

const PLATFORM_CAPABILITIES = [
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    label: "Global Directory",
  },
  {
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "50+ Countries",
  },
  {
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    label: "Organisation Network",
  },
  {
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "Investment Pathways",
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    label: "Mentorship Network",
  },
  {
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    label: "Cultural Heritage Hub",
  },
  {
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
    label: "Policy Engagement",
  },
  {
    icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    label: "Education & Skills",
  },
  {
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    label: "Tourism & Roots",
  },
  {
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    label: "Philanthropy",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    label: "Analytics Dashboard",
  },
  {
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    label: "Emergency Comms",
  },
];

function PlatformPreview() {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-5 py-20 md:px-8 md:py-28">
      {/* Ambient background layers */}
      <div className="bg-cinematic-glow absolute inset-0 pointer-events-none opacity-50" />
      <div className="bg-warm-right absolute inset-0 pointer-events-none opacity-40" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-accent-orange">
              The Platform
            </span>
            <div className="mt-3 h-[2px] w-10 bg-accent-orange" />
            <h2 className="mt-5 max-w-[26ch] font-serif text-[1.875rem] leading-[1.08] text-cream text-balance md:text-5xl">
              One unified ecosystem for the global Maharashtra movement.
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-cream/8 md:block" />
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {/* [A] Large stat — Countries — col-span-1, row-span-2 */}
          <div className="group relative col-span-1 row-span-2 flex flex-col justify-between overflow-hidden rounded-[8px] border border-cream/10 bg-navy-800 p-6 transition-all duration-300 hover:border-accent-orange/30 hover:bg-navy-700 md:p-8">
            <div className="absolute -right-6 -top-6 size-32 rounded-full bg-accent-orange/6 blur-2xl" />
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-accent-orange">
              Global Reach
            </span>
            <div>
              <p
                className="font-mono leading-none text-cream"
                style={{ fontSize: "clamp(3.5rem,6vw,5.5rem)", letterSpacing: "-0.03em" }}
              >
                50<span className="text-accent-orange">+</span>
              </p>
              <p className="mt-2 text-[13px] leading-snug text-cream-soft">
                Countries represented in the Maharashtrian diaspora
              </p>
            </div>
          </div>

          {/* [B] Large stat — Community — col-span-1, row-span-2 */}
          <div className="group relative col-span-1 row-span-2 flex flex-col justify-between overflow-hidden rounded-[8px] border border-cream/10 bg-navy-800 p-6 transition-all duration-300 hover:border-accent-orange/30 hover:bg-navy-700 md:p-8">
            <div className="absolute -left-6 -top-6 size-32 rounded-full bg-accent-orange/5 blur-2xl" />
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-accent-orange">
              Community Scale
            </span>
            <div>
              <p
                className="font-mono leading-none text-cream"
                style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", letterSpacing: "-0.03em" }}
              >
                5 lakh<span className="text-accent-orange">+</span>
              </p>
              <p className="mt-2 text-[13px] leading-snug text-cream-soft">
                Global Maharashtrians to connect, mobilise and inspire
              </p>
            </div>
          </div>

          {/* [C] Capabilities grid — col-span-2, row-span-2 */}
          <div className="col-span-2 row-span-2 rounded-[8px] border border-cream/10 bg-navy-800/60 p-6 md:p-7">
            <p className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-accent-orange">
              Platform Capabilities
            </p>
            <div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-4">
              {PLATFORM_CAPABILITIES.map((cap) => (
                <div key={cap.label} className="group/cap flex flex-col items-start gap-2">
                  <div className="grid size-9 shrink-0 place-items-center rounded-[6px] border border-cream/10 bg-navy-900 transition-colors group-hover/cap:border-accent-orange/40 group-hover/cap:bg-navy-800">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="size-4 text-accent-orange/70 transition-colors group-hover/cap:text-accent-orange"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={cap.icon} />
                    </svg>
                  </div>
                  <span className="text-[10px] leading-tight text-cream-soft">{cap.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* [D] "The shift" — cinematic transformation card — col-span-full */}
          <div className="col-span-full overflow-hidden rounded-[8px] border border-cream/10 bg-navy-800">
            <div className="grid md:grid-cols-[1fr_auto_1fr]">
              {/* Before */}
              <div className="p-6 md:p-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-cream/35">
                  Without a bridge
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Diaspora scattered across disconnected networks",
                    "Maharashtra unable to reach its global talent",
                    "Investment intent with no structured pathway",
                    "Cultural identity fading across generations",
                    "Missed policy and philanthropic impact",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[13px] leading-relaxed text-cream/40"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-0.5 size-3.5 shrink-0 text-cream/25"
                      >
                        <path
                          d="M4 8h8M8 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider with arrow */}
              <div className="flex items-center justify-center border-x border-cream/8 px-4 py-6 md:px-6">
                <div className="flex flex-col items-center gap-3 md:flex-row">
                  <div className="h-16 w-px bg-gradient-to-b from-transparent via-accent-orange/40 to-transparent md:h-px md:w-16 md:bg-gradient-to-r" />
                  <div className="grid size-10 place-items-center rounded-full border border-accent-orange/30 bg-navy-950 shadow-[0_0_24px_oklch(0.76_0.22_48/0.25)]">
                    <svg viewBox="0 0 16 16" fill="none" className="size-4 text-accent-orange">
                      <path
                        d="M3 8h10M8 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="h-16 w-px bg-gradient-to-b from-transparent via-accent-orange/40 to-transparent md:h-px md:w-16 md:bg-gradient-to-r" />
                </div>
              </div>

              {/* After */}
              <div className="p-6 md:p-8">
                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-accent-orange">
                  Maha NRI Connect
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "One trusted platform connecting diaspora globally",
                    "Direct Maharashtra–diaspora engagement channel",
                    "Structured investment and mentorship pathways",
                    "Cultural continuity for future generations",
                    "Measurable philanthropic and policy impact",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[13px] leading-relaxed text-cream/85"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-0.5 size-3.5 shrink-0 text-accent-orange"
                      >
                        <path
                          d="M3 8.5l3.5 3.5 6.5-7"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /BENTO GRID */}
      </div>
    </section>
  );
}

/* --------------------------- Invitation Form --------------------------- */

function InvitationForm({
  config,
  stage,
  setStage,
}: {
  config: RoleConfig;
  stage: "cta" | "reply" | "confirmed";
  setStage: (s: "cta" | "reply" | "confirmed") => void;
}) {
  const submit = useServerFn(submitInvitation);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [replyText, setReplyText] = useState("");
  const urlParams = useUrlParams();

  const mutation = useMutation({
    mutationFn: (data: InvitationInput) => submit({ data }),
    onSuccess: (data) => {
      if (data?.ok) setStage("confirmed");
    },
  });

  function toggleArea(id: string) {
    setSelectedAreas((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  async function handleConfirm() {
    const payload: InvitationInput = {
      role: config.slug as InvitationInput["role"],
      fullName: urlParams.name === "Respected Leader" ? "" : urlParams.name,
      email: urlParams.email,
      phone: urlParams.phone,
      country: urlParams.country,
      city: urlParams.city,
      organisation: "",
      linkedin: "",
      contribution: replyText,
      preferredTime: "",
      contributionAreas: selectedAreas,
      consent: true,
    };
    mutation.mutate(payload);
  }

  return (
    <section
      id="invitation"
      className="relative overflow-hidden bg-navy-950 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="bg-cobalt-bloom absolute inset-0 pointer-events-none opacity-70" />
      <div className="bg-warm-right absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-2xl">
        {/* ── Stage: CTA ── */}
        {stage === "cta" && (
          <div className="text-center">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-accent-orange">
              Your Invitation
            </span>
            <h2 className="mt-4 font-serif text-[1.875rem] leading-[1.08] tracking-[-0.02em] text-cream text-balance md:text-5xl">
              The founding chapter begins with a single reply.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] font-serif text-lg italic leading-relaxed text-cream/70">
              This invitation was extended to you personally. A single acceptance is all that is
              needed — Ashutosh and Rahul will write to you within 48 hours.
            </p>
            <div className="mt-10">
              <button
                onClick={() => setStage("reply")}
                className="group inline-flex items-center gap-4 bg-accent-orange px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-navy-950 shadow-saffron-glow transition-all hover:translate-y-[-1px] hover:shadow-saffron-glow-lg"
              >
                <span>{config.primaryCta}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-cream/30">
              No form. One click to accept.
            </p>
          </div>
        )}

        {/* ── Stage: Reply panel ── */}
        {stage === "reply" && (
          <div className="animate-mnc-fade-up">
            {/* Header */}
            <div className="mb-10 text-center">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-accent-orange">
                Your Reply
              </span>
              <h2 className="mt-3 font-serif text-[1.875rem] leading-[1.08] text-cream text-balance md:text-4xl">
                Confirm your acceptance.
              </h2>
              <p className="mx-auto mt-4 max-w-[48ch] text-base leading-relaxed text-cream/60">
                Both fields below are entirely optional. A word from you makes the founding team's
                day — but the acceptance stands either way.
              </p>
            </div>

            <div className="space-y-6 border border-cream/10 bg-navy-900/60 p-6 md:p-8">
              {/* Letter reply box */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/50">
                  Your reply to the founding team&ensp;·&ensp;Optional
                </label>
                <textarea
                  rows={5}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={"I am honoured to accept this invitation…"}
                  className="mt-3 w-full border border-cream/10 bg-navy-950 px-4 py-3 font-serif text-base italic leading-relaxed text-cream placeholder:text-cream/25 focus:border-accent-orange/50 focus:outline-none resize-none"
                />
              </div>

              {/* Intent signals */}
              <div className="border-t border-cream/10 pt-6">
                <label className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/50">
                  How you'd like to contribute initially&ensp;·&ensp;Optional
                </label>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {config.contributionOptions.slice(0, 6).map((opt) => {
                    const on = selectedAreas.includes(opt.id);
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => toggleArea(opt.id)}
                        className={`flex items-center gap-3 border px-4 py-3 text-left text-[13px] transition-colors ${
                          on
                            ? "border-accent-orange/60 bg-accent-orange/8 text-cream"
                            : "border-cream/10 bg-navy-950 text-cream/60 hover:border-cream/25 hover:text-cream/80"
                        }`}
                      >
                        {/* initialling mark */}
                        <span
                          className={`grid size-4 shrink-0 place-items-center border text-[9px] font-bold transition-colors ${
                            on
                              ? "border-accent-orange bg-accent-orange text-navy-950"
                              : "border-cream/20 text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error */}
              {mutation.isError && (
                <p className="text-[13px] text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}

              {/* Confirm CTA */}
              <div className="border-t border-cream/10 pt-6">
                <button
                  onClick={handleConfirm}
                  disabled={mutation.isPending}
                  className="group flex w-full items-center justify-between bg-accent-orange px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-950 shadow-saffron-glow transition-all hover:translate-y-[-1px] disabled:opacity-60"
                >
                  <span>{mutation.isPending ? "Confirming…" : "Confirm Acceptance"}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStage("cta")}
                  className="mt-4 w-full text-center text-[10px] uppercase tracking-[0.22em] text-cream/30 hover:text-cream/50 transition-colors"
                >
                  ← Go back
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.22em] text-cream/20">
              MNRI · {config.slug.toUpperCase()} · 2026
            </p>
          </div>
        )}

        {/* ── Stage: Confirmed ── */}
        {stage === "confirmed" && (
          <div className="animate-mnc-fade-up text-center">
            {/* Wax seal mark */}
            <div className="mx-auto grid size-16 place-items-center border border-accent-orange/40 bg-accent-orange/8">
              <div className="size-4 rotate-45 border-b-2 border-r-2 border-accent-orange" />
            </div>
            <h2 className="mt-8 font-serif text-[1.875rem] leading-[1.08] text-cream md:text-5xl">
              Your acceptance has been received.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] font-serif text-lg italic leading-relaxed text-cream/60">
              {mutation.data?.message ??
                "Ashutosh and Rahul will write to you personally within 48 hours."}
            </p>
            <div className="mx-auto mt-10 h-[1px] max-w-[120px] bg-gradient-to-r from-transparent via-accent-orange/50 to-transparent" />
            <p className="mt-6 text-[10px] uppercase tracking-[0.32em] text-cream/25">
              MNRI · {config.eyebrow.toUpperCase()} · 2026
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------- FAQs --------------------------------- */

function FAQs({ config }: { config: RoleConfig }) {
  const all = [...config.roleSpecificFaqs, ...COMMON_FAQS];
  return (
    <section className="border-t border-cream/10 bg-navy-800 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-accent-orange">
          Frequently Asked
        </span>
        <h2 className="mt-3 font-serif text-[1.875rem] leading-[1.08] tracking-[-0.02em] text-cream text-balance md:text-5xl">
          What you may be wondering.
        </h2>
        <dl className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
          {all.map((item) => (
            <details key={item.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <dt className="font-serif text-xl leading-snug text-cream">{item.q}</dt>
                <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-cream/15 text-cream transition-transform group-open:rotate-45">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <dd className="mt-3 max-w-[60ch] text-base leading-relaxed text-cream-soft">
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

function EmotionalClose({ config, onAccept }: { config: RoleConfig; onAccept: () => void }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-5 py-24 text-prestige md:px-8 md:py-32">
      <div className="absolute inset-0 bg-mnc-mesh opacity-30" />
      <div className="absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-accent-orange/15 blur-[120px] animate-mnc-pulse" />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-orange-soft">
          {config.finalClose}
        </span>
        <h2 className="mt-5 font-serif text-4xl leading-[1.03] tracking-[-0.025em] text-balance md:text-6xl">
          Maha NRI Connect is not just launching a website. It is building the most trusted global
          bridge between Maharashtra and its diaspora.
        </h2>
        <p className="mx-auto mt-6 max-w-[44ch] font-serif text-lg italic text-prestige/80">
          {config.emotionalCloser}
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onAccept}
            className="group inline-flex items-center justify-between gap-4 bg-accent-orange px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-950 shadow-saffron-glow transition-all hover:translate-y-[-1px]"
          >
            <span>{config.primaryCta}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-prestige/15 bg-transparent px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-prestige transition-colors hover:bg-cream/5"
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
    <footer className="border-t border-cream/10 bg-navy-950 px-5 py-10 md:px-8">
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

function StickyCta({
  config,
  visible,
  onAccept,
}: {
  config: RoleConfig;
  visible: boolean;
  onAccept: () => void;
}) {
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <button
        onClick={onAccept}
        className="pointer-events-auto flex w-full items-center justify-between gap-4 rounded-full bg-navy-950 px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-prestige shadow-2xl ring-1 ring-black/20 backdrop-blur-xl"
      >
        <span className="truncate">{config.primaryCta}</span>
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-orange text-white">
          →
        </span>
      </button>
    </div>
  );
}
