# Switch to v3 — Bold Cinematic Blue

Replace the current Institutional Heritage (v1) look with a bolder v3 direction across the four invite pages and the index portal. Keep routes, role data, hero images, and the form serverFn as-is — visual/structural overhaul only.

## Design direction (v3 — Bold Cinematic Blue)

- **Palette**: deep cinematic blue canvas, not black.
  - Canvas: midnight navy `oklch(0.18 0.06 260)` with a second darker layer `oklch(0.13 0.05 262)` for full-bleed sections.
  - Foreground: bone/cream `oklch(0.95 0.02 85)`.
  - Accent: saturated saffron-orange `oklch(0.72 0.20 55)` (used sparingly — eyebrows, rules, CTA, hover).
  - Secondary: electric cobalt `oklch(0.55 0.18 258)` for highlights and link underlines.
  - Subtle radial blue glow behind hero (cinematic depth), no purple gradients.
- **Typography**: oversized editorial. Cormorant Garamond 700 italic for hero, sizes up to `clamp(4rem, 12vw, 11rem)`. Swap Plus Jakarta Sans for **Space Grotesk** (400/500/700) for body and UI.
- **Layout**: asymmetric editorial. Full-bleed hero with image as background + deep blue overlay, headline breaking the grid, eyebrow as rotated vertical marginalia. Sections separated by thin 1px cobalt rules and large numeric section markers (01 / 02 / 03) in outlined serif.
- **Components**: hard edges (radius 0), 1–2px borders in cobalt-tinted white, no soft drop shadows. Buttons are blocky — orange fill on navy with hover invert to cream-on-orange. Cards on the index page are large flat navy tiles with an oversized background numeral.
- **Motion**: restrained — fade-up on scroll, accent underline draw on hover. No parallax.

## Files to change

1. `src/styles.css` — update brand tokens: navy canvas layers, cream foreground, orange accent, cobalt secondary; set `--radius: 0`; map `--font-sans` to Space Grotesk, keep Cormorant on `--font-serif`. Replace existing v1 utilities (`bg-mnc-mesh` etc.) with v3 equivalents (cobalt rule, numeric marker, hover-invert button, blue radial glow).
2. `src/routes/__root.tsx` — swap Google Fonts `<link>` to load `Cormorant Garamond` (700, 700italic) + `Space Grotesk` (400, 500, 700) instead of Plus Jakarta Sans.
3. `src/components/mnc/LandingPage.tsx` — rebuild section-by-section in the v3 register:
   - Hero: full-bleed image with deep navy overlay + radial blue glow, oversized italic serif headline, vertical eyebrow, blocky orange CTA.
   - Each section gets a `01 — Vision` style numeric marker and 1px cobalt top rule.
   - Mandate / Impact / Contribution grids become flat navy bordered tiles, no shadows.
   - Form block sits on a darker navy band with hard-edged cream-on-navy inputs and orange submit.
   - Keep all copy from `role-data.tsx` and the existing serverFn submission flow.
4. `src/routes/index.tsx` — invite portal redone as a 4-tile asymmetric grid on navy: each tile shows huge background numeral (01–04) in outlined cream, role name in serif italic, one-line mandate in Space Grotesk, hover fills the tile cobalt with orange accent.

## Out of scope

- Route files, role data, hero images, form backend logic — unchanged.
- No new dependencies. No database. No email integration yet.

After approval I'll execute these four edits in one pass and verify in preview.
