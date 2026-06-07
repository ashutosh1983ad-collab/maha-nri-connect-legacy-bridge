
# Lift the cinematic blue — premium, less dark, same palette

The page currently stacks navy-900 / navy-950 sections back-to-back, so scrolling feels like falling into a tunnel. We keep the exact palette (navy, cream, saffron-orange, cobalt) but rework **rhythm, light, warmth, and imagery** so the page reads as premium editorial cinema instead of a dark slab.

## 1. Section rhythm — break the navy wall

Currently 13 of ~15 sections sit on `bg-navy-900` or `bg-navy-950`. We alternate three surface tiers so the eye gets relief:

- **Tier A — Deep canvas** (`bg-navy-950`): hero, CM banner, final CTA only. Used sparingly as "cinema black" bookends.
- **Tier B — Mid stage** (`bg-navy-900`): primary content sections, with a soft top-down cobalt glow overlay.
- **Tier C — Lifted stage** (new `bg-navy-800` + warm vignette): every 2nd–3rd section (Mandate, Patron messages, Metrics, Invitation form). Feels noticeably brighter without leaving the palette.

Between tiers, add **a 1px cream/15 hairline + 80px gradient fade** (`from-navy-950 via-navy-900 to-navy-800`) so transitions feel like film cuts, not hard walls.

## 2. Introduce warmth — saffron-orange as a light source, not just a button color

Right now orange only appears on CTAs. We use it as **ambient warmth** to balance the cool blue:

- **Warm vignettes**: every Tier-C section gets a soft `radial-gradient` of `accent-orange / 8–12%` anchored in one corner (alternating left/right per section). Reads like golden-hour light spilling in.
- **Saffron hairlines**: replace the cream/10 top borders on hero, mandate, invitation, and final CTA with a 1px `accent-orange/40` rule that fades to transparent across the width. Tiny detail, huge premium signal.
- **Numerals & eyebrows in orange**: the giant 12rem role numeral, section eyebrows ("01 / Mandate", "Messages from our Patrons"), and metric values switch from cream to `accent-orange`. Adds rhythm of warm punctuation down the scroll.
- **Drop caps**: first paragraph of Personal Invitation and Mandate intro gets a serif italic orange drop-cap (4–5 line height). Editorial, magazine-grade.
- **Glow accents**: hero, CM banner video frames, and metric tiles get a subtle `box-shadow` ring in `accent-orange/15` instead of pure black shadow. Light feels emitted, not absorbed.

## 3. Add cobalt as a secondary cool highlight

Cobalt is in the palette but unused. Apply as **atmospheric backlight**:

- Sticky nav: thin cobalt-to-transparent underline on scroll.
- Quote marks on Patron messages, decorative chevrons, and the active step indicator on the form — all in cobalt.
- Hero backdrop swaps the current single radial for a **two-light setup**: cobalt key light from upper-left (15% opacity), orange rim from lower-right (10% opacity). Same `bg-cinematic-glow` utility, more dramatic ratio.

## 4. Imagery — replace empty navy placeholders with real visual weight

The page has multiple empty navy boxes (CM video, patron videos, hero, role tiles) that currently read as dark holes. We swap to **dummy placeholder images** so the design can be evaluated:

- **CM banner**: 16:9 still of Mantralaya / Mumbai skyline at dusk (warm tones balance the navy band) with a centered play glyph and lower-third name plate.
- **Hero**: full-bleed editorial image (Maharashtra coastline / Sahyadris at golden hour, treated with a navy duotone + 30% orange highlight) behind the serif headline, with a strong dark gradient at the bottom for text legibility.
- **Patron message cards (2-up)**: portrait-orientation portraits with duotone treatment (navy shadows, cream midtones, orange highlights), name + designation overlaid at bottom.
- **Personal Invitation**: small signature-style portrait pair (Ashutosh + Rahul) or a wax-seal/letterpress decorative mark beside the signature block.
- **Mandate items**: thin orange numeric counters (01–08) replacing plain bullets, on a subtle navy-800 card.
- **Metrics grid**: each tile gets a faint background icon glyph (globe, handshake, building) in cream/5 so the grid isn't 6 identical dark squares.

All images sourced as Unsplash dummy URLs (`https://images.unsplash.com/...`) with role-appropriate queries — clearly placeholder, easy to swap later.

## 5. Typography lift

- Body copy moves from `text-cream` (96% L) to `text-cream` at normal weight but with **letter-spacing +0.01em** and **line-height 1.7** on long-form paragraphs (Personal Invitation, Mandate intro). Reads less dense.
- Section headlines: keep Cormorant italic but add a **subtle orange underline** (`h-[2px] w-12 bg-accent-orange`) under each eyebrow. Recurring editorial motif.
- Cream-soft (`oklch(0.82 0.02 85)`) replaces full cream on secondary paragraphs so primary headlines pop brighter by contrast — actually feels lighter even though we lowered one value.

## 6. Micro-interactions for "wow"

- Hero headline: stagger-fade letters in on mount using existing `mnc-fade-up` keyframe, 60ms stagger.
- Role tiles on home: hover lifts the numeral 4px and ignites an orange glow ring.
- Sticky nav: shrinks from 72px → 56px after 200px scroll; orange underline grows under active section.
- Patron quote cards: on hover, image desaturates slightly and an orange corner mark draws in.

## Files touched

- `src/styles.css` — add `bg-warm-vignette-left/right`, `bg-tier-fade`, `text-shadow-warm`, drop-cap utility; refine `bg-cinematic-glow` to two-light setup.
- `src/components/mnc/LandingPage.tsx` — re-tier section backgrounds, add hairline dividers, orange eyebrows/numerals/drop-caps, wire placeholder Unsplash images into CM banner, Hero, Patron cards, Invitation signature, Metrics.
- `src/routes/index.tsx` — apply matching warmth (orange numerals, vignette) to home portal for consistency.

## Out of scope

- Palette changes (locked: navy / cream / orange / cobalt).
- New routes, data model, server functions, copy edits.
- Final photography — Unsplash dummies are visual scaffolding only.
