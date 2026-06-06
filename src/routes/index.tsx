import { createFileRoute, Link } from "@tanstack/react-router";
import { ROLE_CONFIG } from "@/lib/mnc/role-data";

const ORDER = ["core", "patrons", "ambassadors", "changemakers"] as const;

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-12 md:py-20">
        <header className="mb-12 md:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            By Invitation Only
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Maha NRI Connect
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            A private portal for those invited to help shape a global platform
            connecting Maharashtra with its diaspora. Please continue to the
            invitation you received.
          </p>
        </header>

        <main className="grid flex-1 gap-4 md:grid-cols-2">
          {ORDER.map((slug) => {
            const r = ROLE_CONFIG[slug];
            return (
              <Link
                key={slug}
                to={r.path}
                className="group relative flex flex-col justify-between rounded-sm border border-border bg-card p-6 transition-colors hover:border-primary hover:bg-primary/[0.03] md:p-8"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-primary">
                    {r.eyebrow}
                  </p>
                  <h2 className="mt-4 font-serif text-2xl leading-snug md:text-3xl">
                    {r.heroHeadlinePlain}
                  </h2>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-foreground/80 transition-colors group-hover:text-primary">
                  <span>Open invitation</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </main>

        <footer className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground md:mt-20">
          If you reached this page without an invitation, please write to the
          founding team for context before proceeding.
        </footer>
      </div>
    </div>
  );
}
