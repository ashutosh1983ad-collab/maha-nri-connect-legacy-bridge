import { createFileRoute, Link } from "@tanstack/react-router";
import { ROLE_CONFIG } from "@/lib/mnc/role-data";

const ORDER = ["core", "advisory", "ambassadors", "changemakers"] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maha NRI Connect — By Invitation" },
      {
        name: "description",
        content:
          "A private invitation portal for the founding circle of Maha NRI Connect — connecting Maharashtra with its global diaspora.",
      },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Maha NRI Connect — By Invitation" },
      {
        property: "og:description",
        content:
          "A private invitation portal for the founding circle of Maha NRI Connect.",
      },
      { property: "og:url", content: "/" },
    ],
  }),
  component: InvitePortal,
});

function InvitePortal() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-navy-900 text-cream">
      {/* cinematic backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-cinematic-glow" />
      <div className="pointer-events-none absolute inset-0 bg-cinematic-grain opacity-60" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 md:px-12 md:py-16">
        {/* header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center border border-cream/20">
              <div className="size-2.5 bg-accent-orange" />
            </div>
            <div className="leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cream">
                Maha NRI Connect
              </p>
              <p className="text-[9px] uppercase tracking-[0.3em] text-cream/50">
                Global Maharashtra Movement
              </p>
            </div>
          </div>
          <span className="hidden items-center gap-2 border border-cream/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-cream/80 md:inline-flex">
            <span className="size-1.5 animate-mnc-pulse bg-accent-orange" />
            Invite Only · 2026
          </span>
        </header>

        {/* hero */}
        <section className="mt-16 max-w-5xl animate-mnc-fade-up md:mt-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-accent-orange">
            — By Invitation Only
          </p>
          <h1 className="mt-6 font-serif text-[clamp(3rem,11vw,9rem)] font-bold leading-[0.9] tracking-tight text-cream text-balance">
            A private <em className="font-serif italic text-accent-orange">portal</em><br />
            for those building the<br />
            global Maharashtra movement.
          </h1>
          <p className="mt-8 max-w-2xl text-base text-cream/70 md:text-lg">
            Continue to the invitation you received. Each pathway represents a
            distinct role in the founding chapter of Maha NRI Connect.
          </p>
        </section>

        {/* role grid */}
        <main className="mt-16 grid flex-1 grid-cols-1 gap-px bg-cream/10 md:mt-24 md:grid-cols-2">
          {ORDER.map((slug, i) => {
            const r = ROLE_CONFIG[slug];
            const num = String(i + 1).padStart(2, "0");
            return (
              <Link
                key={slug}
                to={r.path}
                className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-navy-900 p-8 transition-colors duration-300 hover:bg-navy-950 md:min-h-[340px] md:p-12"
              >
                {/* oversized numeral */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[12rem] font-bold leading-none text-cream/[0.04] transition-colors duration-300 group-hover:text-accent-orange/20 md:-right-6 md:-top-16 md:text-[16rem]"
                >
                  {num}
                </span>

                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-orange">
                    {num} — {r.eyebrow}
                  </p>
                  <h2 className="mt-5 max-w-[20ch] font-serif text-3xl font-medium italic leading-[1.05] text-cream md:text-4xl">
                    {r.heroHeadlinePlain}
                  </h2>
                </div>

                <div className="relative mt-10 flex items-center justify-between border-t border-cream/10 pt-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/70 transition-colors group-hover:text-accent-orange">
                    Open invitation
                  </span>
                  <span
                    aria-hidden
                    className="text-xl text-cream/60 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-accent-orange"
                  >
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </main>

        {/* footer */}
        <footer className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-6 text-[10px] uppercase tracking-[0.28em] text-cream/45 md:mt-24 md:flex-row md:items-center">
          <span>If you reached this page without an invitation, please write to the founding team.</span>
          <span className="font-mono">MNRI · INDEX · 2026</span>
        </footer>
      </div>
    </div>
  );
}
