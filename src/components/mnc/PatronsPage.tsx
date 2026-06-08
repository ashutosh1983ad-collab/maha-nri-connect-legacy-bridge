import { Link, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { submitInvitation, type InvitationInput } from "@/lib/mnc/invitations.functions";
import cmAnnouncingImg from "@/assets/cm-announcing-davos.png";
import rahulTulpuleImg from "@/assets/rahul-tulpule.png";
import ashutoshDeshpandeImg from "@/assets/ashutosh-deshpande.jpeg";
import jaikumarRawalImg from "@/assets/jaikumar-rawal.jpeg";
import udaySamantImg from "@/assets/uday-samant.jpeg";

const CM_YOUTUBE_ID = "ewOoOCtApB4";

/* ─── Ref slug → display name ─── */
const REF_NAMES: Record<string, string> = {
  "devendra-fadnavis": "Shri Devendra Fadnavis",
  "eknath-shinde": "Shri Eknath Shinde",
  "ajit-pawar": "Shri Ajit Pawar",
  "nitin-gadkari": "Shri Nitin Gadkari",
  "suresh-prabhu": "Shri Suresh Prabhu",
};

function resolveRefName(ref: string): string | null {
  if (!ref) return null;
  const lower = ref.toLowerCase();
  if (REF_NAMES[lower]) return REF_NAMES[lower];
  return ref.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/* ─── Scroll-triggered fade-up ─── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // skip animation for reduced-motion users
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.19,1,0.22,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── YouTube Modal ─── */
function YouTubeModal({ videoId, open, onClose }: { videoId: string; open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chief Minister's address"
      className="fixed inset-0 z-[200] grid place-items-center p-4"
      style={{ background: "rgba(10,14,22,0.93)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden"
        style={{ border: "1px solid rgba(160,120,64,0.22)", background: "#0b0e17" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full text-sm cursor-pointer transition-colors"
          style={{ background: "rgba(255,255,255,0.1)", color: "#FAF7F2" }}
        >
          ✕
        </button>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="Hon'ble Chief Minister's Address to Maha NRI Connect"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PATRONS PAGE — Premium invitation experience
   Palette: warm ivory #FAF7F2 · deep navy #0F1A2B · bronze #A07840
   Type: Cormorant (serif display/quotes) · Jost (body/UI)
══════════════════════════════════════════════════════════════════ */
export function PatronsPage() {
  const search = useSearch({ strict: false }) as { ref?: string };
  const refName = resolveRefName(search?.ref ?? "");
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Cormorant + Jost from Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap');
        .patron-page { font-family: 'Jost', ui-sans-serif, system-ui, sans-serif; }
        .patron-serif { font-family: 'Cormorant', ui-serif, Georgia, 'Times New Roman', serif; }
        .patron-details summary::-webkit-details-marker { display: none; }
        .patron-details[open] .patron-plus { transform: rotate(45deg); }
        .patron-plus { transition: transform 200ms ease; }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 1ms !important; animation-duration: 1ms !important; }
        }
      `}</style>

      <div
        className="patron-page min-h-screen antialiased"
        style={{ background: "#FAF7F2", color: "#1A1A1A" }}
      >
        <PatronsNav />
        <InvitationLetter refName={refName} />
        <CredentialBar />
        <CMEndorsement />
        <TheHonour />
        <PatronVoices />
        <DavosMoment />
        <CoFounders />
        <AcceptanceForm />
        <Questions />
        <PatronsFooter />
        <StickyAccept visible={showSticky} />
      </div>
    </>
  );
}

/* ── Nav ── */
function PatronsNav() {
  return (
    <nav
      className="sticky top-0 z-40"
      style={{
        borderBottom: "1px solid rgba(160,120,64,0.15)",
        background: "rgba(250,247,242,0.94)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2" style={{ "--tw-ring-color": "#A07840" } as React.CSSProperties}>
          <div
            className="grid size-8 place-items-center rounded-full"
            style={{ border: "1.5px solid rgba(160,120,64,0.45)" }}
          >
            <div className="size-2.5 rounded-full" style={{ background: "rgba(160,120,64,0.55)" }} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.18em", color: "#1A1A1A" }}>
              Maha NRI Connect
            </span>
            <span className="text-[9px] uppercase" style={{ letterSpacing: "0.2em", color: "#999" }}>
              Global Maharashtra Movement
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full" style={{ background: "#A07840" }} />
          <span className="text-[9px] uppercase" style={{ letterSpacing: "0.25em", color: "#999" }}>
            By personal invitation
          </span>
        </div>
      </div>
    </nav>
  );
}

/* ── §1 Invitation Letter ── */
function InvitationLetter({ refName }: { refName: string | null }) {
  const salutation = refName ? `Dear ${refName},` : "Dear Colleague,";

  return (
    <section
      className="relative flex min-h-[100dvh] items-center"
      style={{ background: "#FAF7F2" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(160,120,64,0.08), transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-2xl px-5 py-24 md:px-10 md:py-32">
        {/* Letterhead */}
        <div className="mb-12" style={{ borderTop: "1px solid rgba(160,120,64,0.35)" }}>
          <div className="mt-3 text-[10px] uppercase" style={{ letterSpacing: "0.32em", color: "#A07840" }}>
            Maha NRI Connect · Advisory & Patrons
          </div>
        </div>

        {/* Letter content fades in on load */}
        <div
          style={{
            animation: "mnc-fade-up 0.9s cubic-bezier(0.19,1,0.22,1) 120ms both",
          }}
        >
          {/* Salutation */}
          <p
            className="patron-serif mb-8 text-xl leading-snug"
            style={{ fontStyle: "italic", color: "#1A1A1A" }}
          >
            {salutation}
          </p>

          {/* Body */}
          <div className="space-y-5 text-[17px] leading-[1.82]" style={{ color: "#2C2C2C" }}>
            <p>
              Maha NRI Connect was announced to the world at Davos on January 19, 2026 — by the
              Hon'ble Chief Minister of Maharashtra, Shri Devendra Fadnavis ji. It is being built
              as the trusted global bridge between Maharashtra and its diaspora.
            </p>
            <p>
              At this defining stage, we are extending a personal invitation to a small number of
              respected leaders — to guide, bless, and lend the weight of their stature to this
              movement.
            </p>
            <p
              className="patron-serif text-[18px] leading-[1.7]"
              style={{ fontStyle: "italic", color: "#1A1A1A" }}
            >
              Your wisdom, standing, and association would honour this platform and inspire
              confidence in the thousands of global Maharashtrians who will find their home here.
            </p>
            <p>
              We would be deeply honoured to have you associated with Maha NRI Connect as an
              Advisor and Patron.
            </p>
          </div>
        </div>

        {/* Signature block */}
        <div className="mt-14">
          <div className="flex -space-x-2 mb-4">
            {[ashutoshDeshpandeImg, rahulTulpuleImg].map((img, i) => (
              <div
                key={i}
                className="relative size-12 overflow-hidden rounded-full"
                style={{ border: "2.5px solid #FAF7F2", boxShadow: "0 0 0 1px rgba(160,120,64,0.3)" }}
              >
                <img
                  src={img}
                  alt={i === 0 ? "Ashutosh Deshpande" : "Rahul Tulpule"}
                  className="absolute inset-0 size-full object-cover object-top"
                />
              </div>
            ))}
          </div>

          {/* Cormorant italic mimics a handwritten signature feel */}
          <p
            className="patron-serif text-xl leading-[1.4]"
            style={{ fontStyle: "italic", color: "#1A1A1A" }}
          >
            Ashutosh Deshpande
            <br />
            Rahul Tulpule
          </p>
          <p className="mt-1.5 text-[10px] uppercase" style={{ letterSpacing: "0.24em", color: "#999" }}>
            Co-founders · Maha NRI Connect
          </p>
          <p
            className="mt-4 text-[10px] uppercase"
            style={{
              letterSpacing: "0.3em",
              color: "#A07840",
              borderTop: "1px solid rgba(160,120,64,0.25)",
              paddingTop: "12px",
              display: "inline-block",
            }}
          >
            MNRI · PATRONS · 2026
          </p>
        </div>

        {/* Scroll chevron */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{ opacity: 0.3 }}
          aria-hidden
        >
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <path d="M7 3 L7 19 M2 14 L7 19 L12 14" stroke="#A07840" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── §2 Credential bar ── */
function CredentialBar() {
  return (
    <FadeUp>
      <div
        className="py-7 text-center"
        style={{
          borderTop: "1px solid rgba(160,120,64,0.2)",
          borderBottom: "1px solid rgba(160,120,64,0.2)",
          background: "#FAF7F2",
        }}
      >
        <p className="text-[11px] uppercase" style={{ letterSpacing: "0.26em", color: "#999" }}>
          Extended by personal selection — not open to the public.
        </p>
      </div>
    </FadeUp>
  );
}

/* ── §3 CM Endorsement ── */
function CMEndorsement() {
  const [open, setOpen] = useState(false);
  const thumb = `https://img.youtube.com/vi/${CM_YOUTUBE_ID}/maxresdefault.jpg`;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0F1A2B", paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <FadeUp>
          <p className="mb-10 text-center text-[10px] uppercase" style={{ letterSpacing: "0.32em", color: "#A07840" }}>
            Message from the Chief Minister of Maharashtra
          </p>
        </FadeUp>

        <FadeUp delay={70}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play Chief Minister Devendra Fadnavis's full address to Maha NRI Connect"
            className="group relative block w-full overflow-hidden cursor-pointer"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={thumb}
              alt="Hon'ble Chief Minister Shri Devendra Fadnavis — official video address"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ filter: "brightness(0.7)" }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,14,22,0.75) 0%, rgba(10,14,22,0.08) 55%, transparent 100%)" }}
            />
            {/* Lower-third title */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-10 md:pb-8">
              <p className="text-[9px] uppercase mb-1" style={{ letterSpacing: "0.28em", color: "rgba(250,247,242,0.65)" }}>
                Hon'ble Shri
              </p>
              <p
                className="patron-serif text-2xl md:text-3xl leading-tight"
                style={{ color: "#FAF7F2", fontWeight: 500 }}
              >
                Devendra Fadnavis{" "}
                <span style={{ fontStyle: "italic", color: "#C9A05A" }}>ji</span>
              </p>
              <p className="text-[10px] uppercase mt-1" style={{ letterSpacing: "0.2em", color: "rgba(250,247,242,0.5)" }}>
                Chief Minister of Maharashtra
              </p>
            </div>
            {/* Play button */}
            <div className="absolute inset-0 grid place-items-center">
              <div
                className="grid size-16 md:size-20 place-items-center rounded-full transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(250,247,242,0.96)", boxShadow: "0 0 60px rgba(250,247,242,0.25)" }}
              >
                <div
                  className="ml-1.5 size-0"
                  style={{
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "16px solid #0F1A2B",
                  }}
                />
              </div>
            </div>
          </button>
        </FadeUp>

        {/* Pull quote */}
        <FadeUp delay={130}>
          <blockquote className="mx-auto mt-14 max-w-xl text-center">
            <p
              className="patron-serif text-[26px] md:text-[32px] leading-[1.4]"
              style={{ fontStyle: "italic", color: "#FAF7F2", fontWeight: 400 }}
            >
              "Maharashtra's strength has always been its people — wherever in the world they choose
              to live."
            </p>
            <cite
              className="mt-5 block text-[10px] uppercase not-italic"
              style={{ letterSpacing: "0.3em", color: "#A07840" }}
            >
              Shri Devendra Fadnavis · Chief Minister of Maharashtra
            </cite>
          </blockquote>
        </FadeUp>
      </div>
      <YouTubeModal videoId={CM_YOUTUBE_ID} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

/* ── §4 The Honour ── */
const PILLARS = [
  { title: "Strategic Guidance", body: "Offer counsel on direction and long-term vision — without any operational responsibility." },
  { title: "Institutional Introductions", body: "Enable connections across business, education, culture and philanthropy where they create enduring value." },
  { title: "Credibility and Public Support", body: "Lend your stature and trust to a platform built for the next generation of global Maharashtrians." },
  { title: "Long-Term Vision", body: "Support a platform that will serve Maharashtra and its diaspora for decades — well beyond any single moment." },
];

function TheHonour() {
  return (
    <section style={{ background: "#FAF7F2", paddingTop: "96px", paddingBottom: "96px" }}>
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <FadeUp>
          <p className="mb-3 text-[10px] uppercase" style={{ letterSpacing: "0.3em", color: "#A07840" }}>
            What this role represents
          </p>
          <h2
            className="patron-serif text-3xl md:text-4xl leading-[1.15] mb-16"
            style={{ color: "#1A1A1A", fontWeight: 500, maxWidth: "24ch" }}
          >
            An honorary role of guidance, legacy, and enduring dignity.
          </h2>
        </FadeUp>

        <div>
          {PILLARS.map((p, i) => (
            <FadeUp key={p.title} delay={i * 55}>
              <div className="py-10" style={{ borderTop: "1px solid rgba(160,120,64,0.2)" }}>
                <p className="mb-2 text-[10px] uppercase" style={{ letterSpacing: "0.3em", color: "#A07840" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="patron-serif text-xl md:text-[22px] mb-3"
                  style={{ color: "#1A1A1A", fontWeight: 500 }}
                >
                  {p.title}
                </h3>
                <p className="text-[15px] leading-relaxed max-w-[52ch]" style={{ color: "#666" }}>
                  {p.body}
                </p>
              </div>
            </FadeUp>
          ))}
          <div style={{ borderTop: "1px solid rgba(160,120,64,0.2)" }} />
        </div>
      </div>
    </section>
  );
}

/* ── §5 Patron Voices ── */
const PATRON_VOICES = [
  { honorific: "Hon'ble Shri", name: "Jaykumar Rawal", suffix: "ji", title: "Minister · Government of Maharashtra", image: jaikumarRawalImg },
  { honorific: "Hon'ble Dr.", name: "Uday Samant", suffix: "ji", title: "Minister, Industries · Government of Maharashtra", image: udaySamantImg },
];

function PatronVoices() {
  return (
    <section
      style={{
        background: "#F3EDE3",
        paddingTop: "96px",
        paddingBottom: "96px",
        borderTop: "1px solid rgba(160,120,64,0.15)",
      }}
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <FadeUp>
          <h2
            className="patron-serif text-2xl md:text-3xl mb-3"
            style={{ color: "#1A1A1A", fontWeight: 500 }}
          >
            Their words, arriving soon.
          </h2>
          <p className="mb-14 text-[14px] leading-relaxed max-w-[52ch]" style={{ color: "#777" }}>
            Several patrons have recorded personal messages for this invitation. They will be
            published here as they are received.
          </p>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-2">
          {PATRON_VOICES.map((v, i) => (
            <FadeUp key={v.name} delay={i * 80}>
              <article className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img
                  src={v.image}
                  alt={`${v.honorific} ${v.name} ${v.suffix}, ${v.title}`}
                  className="absolute inset-0 size-full object-cover object-top"
                  style={{ filter: "brightness(0.6) saturate(0.65)" }}
                />
                {/* Sealed-envelope overlay — intentional frosted placeholder */}
                <div
                  className="absolute inset-0 grid place-items-center"
                  style={{ background: "rgba(15,26,43,0.52)", backdropFilter: "blur(3px)" }}
                >
                  <div className="text-center px-10">
                    <div className="mx-auto mb-5 h-px w-10" style={{ background: "rgba(160,120,64,0.55)" }} />
                    <p className="text-[10px] uppercase mb-1" style={{ letterSpacing: "0.28em", color: "rgba(250,247,242,0.65)" }}>
                      {v.honorific}
                    </p>
                    <p
                      className="patron-serif text-[22px] leading-tight mb-1"
                      style={{ fontStyle: "italic", color: "#FAF7F2" }}
                    >
                      {v.name}{" "}
                      <span style={{ color: "#C9A05A" }}>{v.suffix}</span>
                    </p>
                    <p className="text-[10px] uppercase mb-8" style={{ letterSpacing: "0.18em", color: "rgba(250,247,242,0.45)" }}>
                      {v.title}
                    </p>
                    <p
                      className="patron-serif text-[13px]"
                      style={{ fontStyle: "italic", color: "rgba(250,247,242,0.7)", letterSpacing: "0.02em" }}
                    >
                      Personal message — arriving shortly
                    </p>
                    <div className="mx-auto mt-5 h-px w-10" style={{ background: "rgba(160,120,64,0.4)" }} />
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── §6 Davos Moment ── */
function DavosMoment() {
  return (
    <FadeUp>
      <section className="relative overflow-hidden" style={{ background: "#0F1A2B" }}>
        <div className="relative" style={{ aspectRatio: "16/7", minHeight: "280px" }}>
          <img
            src={cmAnnouncingImg}
            alt="Hon'ble Chief Minister Shri Devendra Fadnavis ji announcing Maha NRI Connect at the World Economic Forum, Davos, January 19, 2026"
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: "center 20%", filter: "contrast(1.04) saturate(0.85)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,14,22,0.7) 0%, transparent 55%)" }}
          />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <p className="text-[11px] uppercase mb-1" style={{ letterSpacing: "0.28em", color: "rgba(250,247,242,0.82)" }}>
              Davos · January 19, 2026
            </p>
            <p className="text-[10px] uppercase" style={{ letterSpacing: "0.2em", color: "rgba(250,247,242,0.42)" }}>
              World Economic Forum · Switzerland
            </p>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

/* ── §7 Co-founders ── */
const FOUNDERS_DATA = [
  {
    name: "Rahul Tulpule",
    role: "Co-Founder · Maha NRI Connect",
    image: rahulTulpuleImg,
    bio: "Rahul Tulpule is a Mumbai-based entrepreneur and institution builder with a track record across media, community, and public engagement. He brings deep understanding of the Maharashtrian diaspora and the institutional relationships needed to give Maha NRI Connect lasting credibility.",
    quote: "Maharashtra's diaspora has waited a long time for a serious bridge home. We are building that bridge — not as a campaign, but as an institution.",
  },
  {
    name: "Ashutosh Deshpande",
    role: "Co-Founder · Maha NRI Connect",
    image: ashutoshDeshpandeImg,
    bio: "Ashutosh Deshpande is a platform architect and digital strategist with over two decades of experience building organisations at scale. He leads the technical and organisational vision for Maha NRI Connect — ensuring the platform is engineered for trust, longevity, and global reach.",
    quote: "This platform is being built for the next fifty years — not the next fifty days. Every founding association shapes its DNA.",
  },
];

function CoFounders() {
  return (
    <section
      style={{
        background: "#FAF7F2",
        paddingTop: "96px",
        paddingBottom: "96px",
        borderTop: "1px solid rgba(160,120,64,0.15)",
      }}
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <FadeUp>
          <p className="mb-3 text-[10px] uppercase" style={{ letterSpacing: "0.3em", color: "#A07840" }}>
            The Founding Team
          </p>
          <h2
            className="patron-serif text-3xl md:text-4xl mb-16 leading-[1.15]"
            style={{ color: "#1A1A1A", fontWeight: 500, maxWidth: "28ch" }}
          >
            Built by Maharashtrians, for Maharashtrians worldwide.
          </h2>
        </FadeUp>

        <div className="grid gap-16 md:grid-cols-2 md:gap-12">
          {FOUNDERS_DATA.map((f, i) => (
            <FadeUp key={f.name} delay={i * 90}>
              <article>
                <div className="relative w-full overflow-hidden mb-8" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={f.image}
                    alt={f.name}
                    className="absolute inset-0 size-full object-cover object-top"
                    style={{ filter: "brightness(0.95) saturate(0.88)" }}
                  />
                </div>
                <h3
                  className="patron-serif text-2xl md:text-3xl mb-1.5 leading-tight"
                  style={{ color: "#1A1A1A", fontWeight: 500 }}
                >
                  {f.name}
                </h3>
                <p className="text-[10px] uppercase mb-5" style={{ letterSpacing: "0.22em", color: "#999" }}>
                  {f.role}
                </p>
                <p className="text-[14px] leading-[1.78] mb-6 max-w-[46ch]" style={{ color: "#666" }}>
                  {f.bio}
                </p>
                <blockquote className="pl-5" style={{ borderLeft: "2px solid rgba(160,120,64,0.45)" }}>
                  <p
                    className="patron-serif text-[16px] leading-[1.65]"
                    style={{ fontStyle: "italic", color: "#1A1A1A" }}
                  >
                    "{f.quote}"
                  </p>
                </blockquote>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── §8 Acceptance Form ── */
function AcceptanceForm() {
  const submit = useServerFn(submitInvitation);
  const mutation = useMutation({ mutationFn: (data: InvitationInput) => submit({ data }) });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("consent") !== "on") return;
    mutation.mutate({
      role: "patrons",
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      city: String(fd.get("city") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      linkedin: "",
      contribution: String(fd.get("note") ?? ""),
      preferredTime: "",
      contributionAreas: [],
      consent: true as const,
    });
  }

  return (
    <section
      id="invitation"
      style={{
        background: "#F3EDE3",
        paddingTop: "96px",
        paddingBottom: "96px",
        borderTop: "1px solid rgba(160,120,64,0.2)",
      }}
    >
      <div className="mx-auto max-w-xl px-5 md:px-8">
        {/* Threshold — visual crossing point */}
        <FadeUp>
          <div className="mb-14 text-center">
            <div
              className="mx-auto mb-5 grid size-10 place-items-center rounded-full"
              style={{ border: "1px solid rgba(160,120,64,0.4)", background: "rgba(160,120,64,0.06)" }}
            >
              <div className="size-2.5 rounded-full" style={{ background: "#A07840", opacity: 0.65 }} />
            </div>
            <div
              className="mx-auto mb-8 h-px w-20"
              style={{ background: "linear-gradient(to right, transparent, rgba(160,120,64,0.5), transparent)" }}
            />
            <p
              className="patron-serif text-[18px] md:text-[20px] leading-[1.7]"
              style={{ fontStyle: "italic", color: "#1A1A1A" }}
            >
              To formally accept, Ashutosh and Rahul will write to you personally within 48 hours of
              receiving your response.
            </p>
          </div>
        </FadeUp>

        {mutation.data?.ok ? (
          <FadeUp>
            <div
              className="p-10 text-center"
              style={{ border: "1px solid rgba(160,120,64,0.3)", background: "#FAF7F2" }}
            >
              <div
                className="mx-auto mb-6 grid size-14 place-items-center rounded-full"
                style={{ border: "1px solid rgba(160,120,64,0.4)" }}
              >
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden>
                  <path d="M1 8 L7 14 L19 2" stroke="#A07840" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="patron-serif text-2xl mb-3" style={{ color: "#1A1A1A" }}>
                Your acceptance has been received.
              </h3>
              <p className="text-[14px] leading-relaxed max-w-[42ch] mx-auto" style={{ color: "#666" }}>
                {mutation.data?.message}
              </p>
              <p className="mt-6 text-[10px] uppercase" style={{ letterSpacing: "0.3em", color: "#A07840" }}>
                MNRI · PATRONS · 2026
              </p>
            </div>
          </FadeUp>
        ) : (
          <FadeUp delay={80}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-8"
              style={{ border: "1px solid rgba(160,120,64,0.22)", background: "#FAF7F2", padding: "40px 36px" }}
            >
              <LetterField label="Full Name" name="fullName" required autoComplete="name" />
              <LetterField label="Designation / Organisation" name="organisation" required autoComplete="organization" />
              <LetterField label="Email" name="email" type="email" required autoComplete="email" />
              <LetterField label="Phone" name="phone" type="tel" required autoComplete="tel" />
              <LetterField label="Country" name="country" required autoComplete="country-name" />

              {/* Optional personal note */}
              <div>
                <label
                  htmlFor="patron-note"
                  className="block text-[11px] uppercase mb-3"
                  style={{ letterSpacing: "0.2em", color: "#999" }}
                >
                  Is there anything you would like Ashutosh or Rahul to know before they write to
                  you?
                </label>
                <textarea
                  id="patron-note"
                  name="note"
                  rows={3}
                  className="w-full text-[15px] leading-relaxed resize-none focus:outline-none bg-transparent"
                  style={{
                    border: "none",
                    borderBottom: "1px solid rgba(160,120,64,0.3)",
                    color: "#1A1A1A",
                    padding: "4px 0 10px",
                    display: "block",
                  }}
                />
              </div>

              {/* Consent */}
              <label
                className="flex items-start gap-3 cursor-pointer"
                style={{ borderTop: "1px solid rgba(160,120,64,0.15)", paddingTop: "20px" }}
              >
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 size-4 cursor-pointer shrink-0"
                  style={{ accentColor: "#A07840" }}
                />
                <span className="text-[12px] leading-relaxed" style={{ color: "#777" }}>
                  I consent to being contacted by the Maha NRI Connect founding team about this
                  invitation.
                </span>
              </label>

              {mutation.isError && (
                <p role="alert" className="text-[13px]" style={{ color: "#8B3030" }}>
                  Something went wrong. Please try again in a moment.
                </p>
              )}

              {/* Reference seal */}
              <p
                className="text-center text-[10px] uppercase pt-1"
                style={{ letterSpacing: "0.3em", color: "#A07840" }}
              >
                MNRI · PATRONS · 2026
              </p>

              {/* Submit — ceremonial weight, not a generic button */}
              <PatronSubmitButton pending={mutation.isPending} />
            </form>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

function PatronSubmitButton({ pending }: { pending: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      disabled={pending}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center justify-between cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2"
      style={{
        background: hovered && !pending ? "#1a2d47" : "#0F1A2B",
        color: "#FAF7F2",
        padding: "18px 28px",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        opacity: pending ? 0.65 : 1,
        border: "none",
        cursor: pending ? "wait" : "pointer",
        "--tw-ring-color": "#A07840",
      } as React.CSSProperties}
    >
      <span>{pending ? "Submitting…" : "Accept Patron / Advisor Invitation"}</span>
      <span aria-hidden>→</span>
    </button>
  );
}

function LetterField({
  label, name, type = "text", required, autoComplete,
}: {
  label: string; name: string; type?: string; required?: boolean; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        htmlFor={`patron-${name}`}
        className="block text-[11px] uppercase mb-2"
        style={{ letterSpacing: "0.2em", color: "#999" }}
      >
        {label}
        {required && <span className="ml-1" style={{ color: "#A07840" }} aria-hidden>*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <input
        id={`patron-${name}`}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full text-[15px] leading-relaxed bg-transparent focus:outline-none"
        style={{
          border: "none",
          borderBottom: `1px solid ${focused ? "#A07840" : "rgba(160,120,64,0.3)"}`,
          color: "#1A1A1A",
          padding: "4px 0 10px",
          minHeight: "44px",
          transition: "border-color 150ms ease",
          display: "block",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

/* ── §9 Questions ── */
const FAQS = [
  { q: "Is this an operational role?", a: "No. The Advisory & Patron role is entirely honorary and non-operational. You are not asked to manage day-to-day work, attend regular meetings, or take on any executive responsibility." },
  { q: "Will my name be used publicly?", a: "Only with your explicit written consent, and only in formats you personally approve. Nothing is published without your direct agreement." },
  { q: "Is this a paid role?", a: "The association is honorary. There is no financial remuneration, and equally, no financial commitment is asked of you in accepting this invitation." },
  { q: "Is this a government appointment?", a: "No. Maha NRI Connect is a platform initiative. The patron association does not create any government position, employment, agency, or fiduciary role." },
  { q: "Will I be asked for money?", a: "No. These roles are not financial commitments. Sponsorship conversations are entirely separate and only arise where genuinely relevant and welcome." },
  { q: "Can I step back later?", a: "Yes. The association can be discontinued at any time through a simple written communication. There is no binding obligation." },
];

function Questions() {
  return (
    <section
      style={{
        background: "#FAF7F2",
        paddingTop: "96px",
        paddingBottom: "96px",
        borderTop: "1px solid rgba(160,120,64,0.15)",
      }}
    >
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <FadeUp>
          <h2
            className="patron-serif text-2xl md:text-3xl mb-12"
            style={{ color: "#1A1A1A", fontWeight: 500 }}
          >
            Questions
          </h2>
        </FadeUp>

        <dl style={{ borderTop: "1px solid rgba(160,120,64,0.2)" }}>
          {FAQS.map((item) => (
            <FadeUp key={item.q}>
              <details
                className="patron-details group"
                style={{ borderBottom: "1px solid rgba(160,120,64,0.2)" }}
              >
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-6">
                  <dt
                    className="patron-serif text-[16px] leading-snug"
                    style={{ color: "#1A1A1A", fontWeight: 500 }}
                  >
                    {item.q}
                  </dt>
                  <span
                    className="patron-plus mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-sm"
                    style={{ border: "1px solid rgba(160,120,64,0.35)", color: "#A07840", flexShrink: 0 }}
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <dd
                  className="pb-6 text-[14px] leading-[1.78] max-w-[58ch]"
                  style={{ color: "#666" }}
                >
                  {item.a}
                </dd>
              </details>
            </FadeUp>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── §10 Footer ── */
function PatronsFooter() {
  return (
    <footer
      style={{
        background: "#FAF7F2",
        borderTop: "1px solid rgba(160,120,64,0.18)",
        padding: "32px 0",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-5 md:flex-row md:px-8">
        <div>
          <p className="text-[11px] uppercase" style={{ letterSpacing: "0.2em", color: "#1A1A1A" }}>
            Maha NRI Connect
          </p>
          <p className="text-[9px] uppercase mt-0.5" style={{ letterSpacing: "0.2em", color: "#999" }}>
            Global Maharashtra Movement
          </p>
        </div>
        <nav className="flex gap-5 flex-wrap justify-center" aria-label="Invite pages">
          {[
            { to: "/core" as const, label: "Core Team" },
            { to: "/patrons" as const, label: "Patrons" },
            { to: "/ambassadors" as const, label: "Ambassadors" },
            { to: "/changemakers" as const, label: "Changemakers" },
          ].map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="text-[10px] uppercase transition-colors"
              style={{ letterSpacing: "0.2em", color: "#999" }}
            >
              {r.label}
            </Link>
          ))}
        </nav>
        <p className="text-[10px] uppercase" style={{ letterSpacing: "0.2em", color: "#999" }}>
          By invitation only
        </p>
      </div>
    </footer>
  );
}

/* ── Sticky Accept ── */
function StickyAccept({ visible }: { visible: boolean }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:hidden transition-all duration-300"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(100%)" }}
    >
      <a
        href="#invitation"
        className="pointer-events-auto flex w-full items-center justify-between gap-4"
        style={{
          background: "#0F1A2B",
          color: "#FAF7F2",
          padding: "16px 20px",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <span>Accept Patron Invitation</span>
        <span
          className="grid size-8 shrink-0 place-items-center rounded-full"
          style={{ background: "#A07840", color: "#FAF7F2", fontSize: "14px" }}
          aria-hidden
        >
          →
        </span>
      </a>
    </div>
  );
}
