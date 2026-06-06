# Finish Maha NRI Connect

Wire up the routes so the already-built `LandingPage` component is reachable.

## Files to create

1. `src/routes/core.tsx` — renders `<LandingPage role="core" />` with role-specific `head()` (title, description, og:title/description, `noindex,nofollow` robots).
2. `src/routes/patrons.tsx` — same shape, `role="patrons"`.
3. `src/routes/ambassadors.tsx` — same shape, `role="ambassadors"`.
4. `src/routes/changemakers.tsx` — same shape, `role="changemakers"`.

Each route pulls its title/description from `src/lib/mnc/role-data.tsx` so copy stays single-sourced.

## Files to replace

5. `src/routes/index.tsx` — replace placeholder with an invite-type selector:
   - Brand mark + "Maha NRI Connect" wordmark (Cormorant Garamond)
   - Short one-line framing ("By invitation only.")
   - Four cards (Core / Patrons / Ambassadors / Changemakers), each a `<Link>` to its route, with the role's one-line mandate from `role-data`
   - Navy canvas, orange accent on hover, matches v1 Institutional Heritage tokens
   - `head()` with site title + `noindex,nofollow`

## Out of scope (already covered earlier)

- Design tokens, fonts, hero images, `LandingPage` component, form serverFn — all already in place.
- Real email sending, database, subdomain routing — deferred.

After these 5 files land, the four invite pages are live at `/core`, `/patrons`, `/ambassadors`, `/changemakers`, and `/` is the invite-type chooser.