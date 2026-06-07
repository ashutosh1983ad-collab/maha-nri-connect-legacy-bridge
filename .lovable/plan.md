# Refine LandingPage — CM video on top, personal invite, trim videos

Changes apply to all four role pages (Core, Patrons, Ambassadors, Changemakers) since they share `src/components/mnc/LandingPage.tsx`. Copy stays role-specific via `ROLE_CONFIG`.

## 1. Hon'ble CM video → top of page (in header band)

- Add a new `CMVideoBanner` section rendered **directly under `<Nav />` and above `<Hero />`** in `LandingPage`.
- Full-width navy band with a 16:9 video placeholder on the left (play glyph, "Video pending" chip), and on the right: eyebrow "Message from Hon'ble Chief Minister", name "Shri Devendra Fadnavis ji", role "Chief Minister of Maharashtra", short line "A vision for Maharashtra's global future."
- Remove the CM card from the `CredibilityWall` 3-card grid; keep only the two Patron messages there (grid becomes 2-up on md+).

## 2. Trim VideoStorytelling

- Remove these two cards from `VIDEO_CARDS`:
  - "Why We Are Building Maha NRI Connect" (founders)
  - "Why We Are Inviting You" (short message)
- Also remove the CM card from `VIDEO_CARDS` (it now lives at the top).
- Remaining cards: the two Patron messages only. Rename section heading to "Messages from our Patrons" so two cards don't look sparse; switch grid to 2-up.

## 3. Personal Invitation section (new) — per role, from Ashutosh & Rahul

- New `PersonalInvitation` section, inserted **between `Mandate` and the first `Impact`** (so it follows the role mandate naturally and precedes the broader platform story).
- Editorial layout: left column = eyebrow "A Personal Invitation", role-specific salutation + headline; right column = body paragraphs + CTA button (anchors to `#invitation`) + signature block "— Ashutosh Deshpande & Rahul Tulpule, Co-founders, Maha NRI Connect".
- Copy is role-specific. Add a `personalInvitation` field to `RoleConfig` (`src/lib/mnc/roles.ts`) and populate in `src/lib/mnc/role-data.tsx` for all four roles using the exact text you provided:
  - **Core** — salutation "Dear Core Team Member,", headline "An Invitation to Build the Beginning", CTA "Join the Core Team".
  - **Patrons** — salutation "Respected Advisor,", headline "An Invitation to Guide a Legacy Initiative", CTA "Accept Advisor / Patron Invitation".
  - **Ambassadors** — salutation "Dear Friend,", headline "An Invitation to Lend Your Voice to Maharashtra", CTA "Become a Maha NRI Ambassador".
  - **Changemakers** — salutation "Dear Changemaker,", headline "An Invitation to Turn Success into Impact", CTA "Join the Changemakers Network".
- Each variant uses the full multi-paragraph body you supplied verbatim.

## Technical notes

- Files touched: `src/components/mnc/LandingPage.tsx`, `src/lib/mnc/roles.ts`, `src/lib/mnc/role-data.tsx`.
- No new dependencies, no route/data/serverFn changes, no hero-image changes.
- Styling reuses existing v3 Cinematic Blue tokens (navy-900/800/950, cream, accent-orange, serif italic).

## Out of scope

- Embedding actual video files (placeholders remain — pending official release).
- Index portal, route files, role hero images, invitation form backend.
