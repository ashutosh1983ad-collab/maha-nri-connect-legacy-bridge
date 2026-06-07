## What's actually wrong right now

**Launch Moment layout bug.** The grid is `md:grid-cols-12` with children `md:col-span-8` + `md:col-span-5` = 13 columns. That overflows the 12-col track, so the right panel wraps under the image at most widths. That's why "beside" is not holding.

**Everything is in a box.** Hero portrait, CM video, Davos photo, founder cards — each sits inside a hard-edged rectangle with rings, borders, and corner marks. Boxed imagery reads as a brochure, not as cinema. Premium editorial work (Aesop, Monocle, Loro Piana) lets photographs **bleed** — into the page edge, into typography, into adjacent color fields — so the image becomes the surface, not a tile on the surface.

**Hero feels cluttered.** Eyebrow + 60px serif headline + sub-paragraph + two heavy CTAs + an "MNRI · PATRONS · 2026" mono reference line + 4:5 portrait with bottom badges + 3 stacked background layers. Nothing breathes.

**Tone isn't stakeholder-intimate.** Nav pill shouts "INVITE ONLY — ADVISORY TEAM & PATRONS". File-tag chrome ("Vol. 01", "Master Archive // Scene 04") is costume jewelry on a CM moment. The Personal Invitation section signs off "— Ashutosh & Rahul" but shows only an "A&R" monogram bubble — the founders never actually appear.

**Section rhythm is dense.** 16 bands before the form. `CMVideoBanner` + `LaunchMoment` are thematic duplicates (both Davos / both CM).

## Plan

### 1. Blend imagery into the page — kill the boxes

Adopt one consistent treatment: photographs are **full-bleed, masked, and feather-faded into the navy ground**, with typography sitting **on** the image rather than next to a framed tile.

- **Hero portrait**: drop the rounded box, ring, orange blur halo, and bottom badge strip. Render the portrait full-height of the hero, bleeding off the right edge of the screen, with a left-to-right gradient mask so it dissolves into the headline column.
- **Launch Moment (CM at Davos)**: remove the viewfinder frame, corner marks, "Master Archive" tag, and "Vol. 01" badge. Render as a wide cinematic plate that bleeds off the left edge of the viewport with a right-side soft fade into navy. Headline sits on the lower-right of the image with a subtle navy-950 gradient under it for legibility.
- **CM Video Banner**: remove the heavy ring + drop shadow on the thumbnail. Same feather-mask treatment — thumbnail bleeds into the section ground, only the saffron play button breaks the surface.
- **Founders section**: replace the initial-bubble cards with two portrait-led blocks using the existing `rahulTulpuleAsset` and `ashutoshDeshpandeAsset` images, masked into the section ground, name typeset over the lower edge.
- Add shared CSS utilities in `src/styles.css`: `mask-fade-r`, `mask-fade-l`, `mask-fade-b`, `mask-vignette` — same blend language used everywhere.

### 2. Personal Invitation — founders appear, not just sign off

- Replace the "A&R" monogram bubble on the left column with **two stacked circular portrait thumbnails** of Ashutosh Deshpande and Rahul Tulpule (existing assets), ~64–72px each, slightly overlapping in a stacked-avatar pattern.
- Below the portraits: the names in serif, role line in small uppercase ("Co-founders, Maha NRI Connect"), and "Signed in person" caption preserved.
- Treatment matches the blend language: portraits are circular, subtle saffron ring on hover only, no hard card around them. They feel like a real signature block, not a logo lockup.
- The closing right-side "— Ashutosh Deshpande & Rahul Tulpule" line stays, so the section opens with their faces and closes with their names.

### 3. Fix Launch Moment — text truly beside (and on) image

- Switch the inner grid to a clean two-track: `md:grid-cols-[1.4fr_1fr]` with `items-center gap-12 lg:gap-16`. Drop the 12-col math.
- Remove `border`, `bg-navy-900`, `p-3`, `shadow-2xl` around the photo. Unframed, bleeds left.
- Right track: eyebrow rule, headline, one paragraph, one metadata line. Cut the duplicate "Public Unveiling / WEF" stack.

### 4. Declutter the Hero

- Collapse the three background layers to one (`bg-cinematic-glow`).
- Remove "Reference: MNRI · PATRONS · 2026" and the portrait bottom caption.
- Demote secondary CTA to a quiet text link ("Read the vision →"). One primary action.
- Tighten headline leading to `1.02`, more left air.

### 5. Stakeholder-intimate tone

- Nav pill → "By personal invitation".
- Hero eyebrow reads as direct address rather than category tag.
- Move `PersonalInvitation` higher — directly after `Vision` — so the founders speak before the data wall.

### 6. Section rhythm — remove duplication

- Keep `CMVideoBanner` at top (spoken word).
- Move `LaunchMoment` down to sit just before `CredibilityWall` as the archival beat.
- Merge the two `Impact` sections into one two-column "For Maharashtra / For the Diaspora" band.

### 7. Premium finish

- Standardize rhythm: `py-24 md:py-32` on hero-class bands, `py-20 md:py-24` elsewhere.
- One accent rule site-wide: 10px uppercase eyebrow + single 12px saffron underline. Retire mixed hairlines and 2px bars.
- Standardize uppercase tracking to a single `0.22em`.
- Remove all `Vol. 01` / `Scene 04` / file-reference chrome.

## Out of scope

- No copy rewrites beyond nav pill + hero eyebrow.
- No new imagery generation — re-treat existing CM, Davos, Rahul, Ashutosh assets.
- No backend / data changes.

## Files touched

- `src/components/mnc/LandingPage.tsx` — Hero, Nav, LaunchMoment, CMVideoBanner, FoundingTeam, PersonalInvitation, section order, Impact merge.
- `src/styles.css` — add four shared `mask-fade-*` utilities.
