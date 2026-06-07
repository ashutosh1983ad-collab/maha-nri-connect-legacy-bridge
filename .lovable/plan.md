## Goal
Wire the three new portraits into the role landing pages: the CM-announcing photo as a launch-moment strip, and Rahul/Ashutosh as a Founding Team section. No palette or layout system changes.

## 1. Upload assets to CDN
Using `lovable-assets create` from `/mnt/user-uploads/`, then write the pointer JSON into `src/assets/`:
- `cm-announcing-davos.png.asset.json` ← `cm_sir_annoucing_maha_nri.png` (tighter crop of CM, less projector glare than the other one)
- `rahul-tulpule.png.asset.json` ← `rahul.png`
- `ashutosh-deshpande.jpeg.asset.json` ← `ashutosh.jpeg`

## 2. New `LaunchMoment` section (between Hero and Vision)
Editorial strip on `bg-navy-900` with the existing saffron hairline + `bg-warm-right` ambient layer to keep brightness consistent.

Layout: `md:grid-cols-[1.1fr_1fr]`
- **Left**: portrait of CM (tight square crop, `object-cover object-top`, 6px radius, `ring-1 ring-accent-orange/15`, soft saffron bloom behind). Small overlay badge: `Davos · January 19, 2026`.
- **Right**: eyebrow `Launch Moment`, saffron 2px rule, headline (serif): *"Announced to the world at Davos."*, supporting line: *"Hon'ble Chief Minister Shri Devendra Fadnavis ji unveiling Maha NRI Connect to the global stage — January 19, 2026."*, tertiary caption: `Vol. 01 · Public Unveiling`.

Added once in `LandingPage` between `<Hero />` and `<Vision />`. CM video banner stays as-is above hero.

## 3. New `FoundingTeam` section (after `CredibilityWall`, before `Mandate`)
Establishes a third tier: Patrons → Founders → Mandate. Same `bg-navy-800` rhythm with `bg-warm-left` to avoid a darker dip.

Header:
- Eyebrow (saffron): `The Founding Team`
- 2px saffron rule
- Headline (serif): *"Built by Maharashtrians, for Maharashtrians worldwide."*
- Sub: *"Two co-founders driving Maha NRI Connect from vision to launch."*

Two cards (`md:grid-cols-2`):
| Portrait | Name | Suffix | Role line |
|---|---|---|---|
| `rahul-tulpule` | Rahul Tulpule | — | Co-Founder · Maha NRI Connect |
| `ashutosh-deshpande` | Ashutosh Deshpande | — | Co-Founder · Maha NRI Connect |

Card spec (matches Credibility Wall visual language, no play button — these are people, not videos):
- `rounded-[6px] border border-cream/10 bg-navy-900` with hover saffron edge.
- Portrait: square aspect, `object-cover object-top`, soft top-down navy gradient at bottom for text legibility.
- Below portrait: name in serif (no `Hon'ble` honorific — they aren't ministers), role line in `text-text-tertiary` uppercase smallcaps, a short pull-quote each:
  - Rahul: *"Maharashtra's diaspora has waited a long time for a serious bridge home. We're building that bridge."*
  - Ashutosh: *"This platform is engineered for trust, scale and longevity — not as a campaign, but as institution."*

## 4. Files touched
- `src/components/mnc/LandingPage.tsx` — add `LaunchMoment` + `FoundingTeam` components, wire into the section sequence, import the three new asset JSONs.
- `src/assets/cm-announcing-davos.png.asset.json` (new)
- `src/assets/rahul-tulpule.png.asset.json` (new)
- `src/assets/ashutosh-deshpande.jpeg.asset.json` (new)

No changes to: color tokens, `role-data.tsx`, routes, server functions, existing Credibility Wall, Video Storytelling section, or CM Video Banner.

## Out of scope
- Real videos for Rahul/Ashutosh (no play buttons on those cards).
- Editing CredibilityWall patron content or VideoStorytelling content.
- Any palette/typography changes.