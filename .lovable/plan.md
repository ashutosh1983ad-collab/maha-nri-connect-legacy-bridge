# Maha NRI Connect — Stakeholder Landing Pages

Build four invite-only landing pages on a shared design system based on the v1 Institutional Heritage direction. Mobile-first (80–90% of visitors arrive via WhatsApp/LinkedIn on mobile), navy/white/orange palette, Cormorant Garamond + Plus Jakarta Sans.

## Routing

Single project with four routes — recommended approach. Subdomains map to routes at DNS/hosting time later (`core.mahanri.com → /core`, etc.).

```text
/core           → Core Management Team
/patrons        → Advisory Team & Patrons
/ambassadors    → Brand Ambassadors & Influencers
/changemakers   → Global Changemakers / Bright Minds
/               → Index router that redirects to /core (default) or shows a tasteful disambiguation
```

Each route file has its own `head()` metadata (title, description, og:title, og:description) — never reused across pages. All four pages set `<meta name="robots" content="noindex,nofollow">` since these are invite-only.

## Shared Design System

Defined once in `src/styles.css` so all four pages stay visually consistent.

- Fonts: Cormorant Garamond (serif headlines), Plus Jakarta Sans (body) — loaded via `<link>` in `__root.tsx`
- Tokens: `--navy-950`, `--navy-900`, `--navy-800`, `--accent-orange`, `--prestige-grey`, plus radius and shadow scales
- Components live in `src/components/mnc/`:
  - `MncNav` — sticky top nav with logo + "Invite Only" pill
  - `Hero` — role-specific cinematic hero with eyebrow, headline, image placeholder
  - `VisionSection` — platform vision copy block
  - `CredibilityWall` — labeled video/profile placeholder cards for CM, dignitaries, founders
  - `RoleMandate` — numbered role-specific "Why join" cards (props-driven, distinct copy per page)
  - `MaharashtraImpactGrid` — "How it helps Maharashtra" 8-point grid
  - `DiasporaImpactGrid` — "How it helps Global Maharashtrians" grid
  - `VideoStorytelling` — labeled video placeholder cards
  - `PlatformFeatures` — feature preview with before/after mobile card stack
  - `ImpactMetrics` — target metrics card grid (labeled "target/vision/ambition")
  - `WhyNow` — urgency section
  - `InvitationForm` — progressive disclosure form, thumb-friendly
  - `FAQ` — accordion with role-specific + common questions
  - `EmotionalClose` — closing CTA block
  - `StickyBottomCTA` — mobile sticky "Accept Invitation" bar
  - `MncFooter` — minimal institutional footer

Each landing page is a thin route file that composes these components with role-specific props (headline, subheadline, mandate items, CTA copy, FAQs).

## Role-Specific Content

All copy from your brief, slotted per page:

| Page | Headline | Primary CTA | Tone |
|---|---|---|---|
| /core | Help Build the Execution Engine Behind Maha NRI Connect | Join the Core Management Team | Founder-level, execution-led |
| /patrons | Lend Your Wisdom, Stature and Blessings to a Legacy Initiative | Accept Patron / Advisor Invitation | Dignified, legacy-led |
| /ambassadors | Use Your Voice to Bring Global Maharashtrians Closer to Home | Become a Maha NRI Connect Ambassador | Emotional, cultural |
| /changemakers | Join a Curated Global Network of Bright Minds Shaping Maharashtra's Future | Join the Global Changemakers Network | Intellectual, contribution-led |

## Form (Email-only)

Server route at `src/routes/api/invitations.ts` (POST). Validates with Zod (name, email, phone, country, city, role, organisation, LinkedIn, contribution areas, preferred time, consent), then sends a formatted email via Lovable's built-in email infrastructure to a designated recipient address. No database, no CRM webhook for now. On success the form shows a confirmation state; on error a graceful retry message.

Form UX: single mobile-first column, large thumb targets, optional fields collapsed under "Tell us more (optional)", consent checkbox above submit. Role is prefilled from the page the form is on.

## Asset Strategy

Every dignitary, founder, video, and patron block uses a tasteful labeled placeholder card (navy/grey panel with an uppercase eyebrow like "Message from Hon'ble Chief Minister — video pending approval"). No fabricated endorsements. One generated abstract hero image per page (Mumbai-skyline / Maharashtra-to-world network motif) — these vary subtly per role to give each page its own visual signature without breaking the system.

## Mobile-First Notes

- Hero fills the first viewport on mobile, CTA visible without scrolling
- Sticky bottom CTA appears after the hero scrolls out
- Video and credibility cards stack vertically on mobile, become a 3-column grid ≥ md
- Form uses progressive disclosure; max 5 fields visible initially
- Images use `loading="lazy"` except the hero
- No heavy animations — only soft fade-in on scroll and a slow pulse on accent glow

## Technical Details

- TanStack Start routes under `src/routes/`
- Shared layout via `__root.tsx`; no auth gate (these are public-but-noindexed invitation pages)
- Email sending: requires the project's Lovable email domain to be configured. If not yet set up, the form route returns a clear "Email infrastructure not yet configured" state and the agent prompts the user to set it up before going live.
- Numbers framed as "target / vision / ambition" everywhere

## Out of Scope (For Now)

- Real subdomain routing (handled by DNS at deploy time)
- Database storage of submissions
- CRM integration
- Actual dignitary photos/videos (placeholders until approved)
- Analytics wiring (can be added in a follow-up)
- Multi-language (English only for now)
