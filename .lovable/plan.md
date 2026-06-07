
# Cinematic Blue — Color Audit & Brightness Lift

## Verdict (the honest critique)

The palette is sound — navy + cobalt + saffron + cream is a proven luxury formula (think Aman, Rimowa, Cunard). But three things are flattening it:

1. **Value range too narrow.** Three navies (950 / 900 / 800) all sit between L 0.13–0.24. The eye reads that as one continuous dark wall when scrolling. Premium dark sites (Linear, Vercel, Arc) always include one near-black floor AND one genuinely *light* tier (L > 0.35) to create rhythm.
2. **Saffron is rationed too thinly.** At ~10% vignette opacity it reads as a smudge, not a light source. Award-winning dark sites use accents at two registers: ambient (5–8%) AND committed (full saturation on numerals, rules, single objects).
3. **Cream foreground (L 0.96) on navy-900 is correct, but everything secondary collapses to one muted tone** (`oklch(0.7 0.04 250)`). No tonal hierarchy in body copy = "heavy" feel.

## The 6 Moves (no palette change, only refinement & redistribution)

### Move 1 — Add a "Moonlight" tier (the missing brightness)
Introduce `--navy-600: oklch(0.42 0.06 250)` — a true mid-tone slate-blue. Use it for:
- Card surfaces on the brightest sections (Mandate, Metrics, Form)
- Hairline borders that need to *show* (currently `oklch(1 0 0 / 12%)` disappears)
- Hover states on Patron cards

This single addition breaks the dark wall without warming the palette.

### Move 2 — Rebalance the section rhythm to ABA, not AAA
Current flow is navy-950 → 900 → 800 → 900 → 800 (all dark). Proposed:

```text
Hero            navy-950   (cinema floor)
CM Banner       navy-900 + cool-top glow
Mandate         navy-700   ← genuinely lighter, surprises the eye
Patrons         navy-900   (return to depth)
Personal Letter cream-tinted navy-800 + saffron wash  ← warmest moment
Metrics         navy-700   ← lift again
Form            navy-950   (focus, contrast)
```

The rhythm — dark, mid, dark, warm, mid, dark — is what makes Aesop, Loro Piana, and Hermès dark pages feel "fresh" instead of oppressive.

### Move 3 — Promote saffron from vignette to *light source*
- Keep ambient warm-left/right at 10%, but ADD one **committed saffron object per section**: a 1px full-opacity rule, an oversized numeral, a single icon, or a corner bracket. The eye needs one anchor of pure color per scroll-screen.
- Introduce `--accent-orange-glow: oklch(0.78 0.16 58 / 0.4)` for soft box-shadow halos around primary CTAs and the CM video play button — gives lensflare/anamorphic feel.

### Move 4 — Add a pearl/champagne neutral (the "premium" tell)
Add `--pearl: oklch(0.88 0.03 80)` — a warm off-white sitting between cream and saffron. Use sparingly for:
- Section eyebrows / kickers (currently cream — too bright, competes with H1)
- Quote marks, signatures (Ashutosh & Rahul initials)
- Metric labels under numerals

This warm-neutral is what separates Bottega Veneta-tier sites from generic dark themes.

### Move 5 — Tonal hierarchy in text (three weights, not one)
Replace single `muted-foreground` with:
- `--text-primary: cream` (headlines, key body)
- `--text-secondary: oklch(0.78 0.03 250)` (paragraphs — currently too dim)
- `--text-tertiary: oklch(0.62 0.04 250)` (captions, metadata)

Brightens long-form reading (Personal Invitation letters especially) without changing tone.

### Move 6 — Replace the grain + add subtle cobalt bloom
- Current grain is monochrome dots at 28px — reads as noise on retina.
- Replace with a finer (1.5px) **dichroic grain**: alternating cobalt-tint and saffron-tint specks at 3% opacity. Apple's product pages, Rolls-Royce, and Ferrari Configurator all use dichroic noise — it's why their darks "shimmer".
- Add a single `bg-cobalt-bloom` utility (large soft cobalt radial at 18% behind hero headline) to push the depth-of-field cinematic feel.

## Files Affected (in build mode)

- `src/styles.css` — add `--navy-600`, `--pearl`, `--accent-orange-glow`, refined text tiers, new grain + bloom utilities.
- `src/components/mnc/LandingPage.tsx` — re-tier section backgrounds per Move 2, add committed saffron objects per Move 3, swap eyebrows/captions to pearl, apply text tiers, swap grain class.

## What Stays Locked
- Navy + Cobalt + Saffron + Cream palette identity
- Cinematic Blue branding
- Hard edges (radius 0)
- Space Grotesk + Cormorant Garamond
- All copy, structure, routes, components

## Out of Scope
- New routes, data, server functions
- Photography (still Unsplash placeholders)
- Component restructuring

## Expected Result
The page will *feel* roughly 25% brighter without lightening the palette — purely from rhythm, hierarchy, and committed accent use. Same cinematic mood, more "fresh" and "premium-air" between sections.

Approve to implement, or tell me which moves to drop / reorder.
