# Maison Noir

A premium, cinematic restaurant website for a fictional three-Michelin-star
establishment. Built to feel like an evening at the restaurant itself: dark,
deliberate, gold-leafed, and quietly theatrical.

## Stack

- **Next.js 14** (App Router, RSC) + TypeScript
- **Tailwind CSS** with a custom noir / champagne / wine palette
- **Framer Motion** for orchestrated reveals, hover choreography and curtains
- **GSAP** available for advanced timeline work
- **Lenis** smooth scrolling
- **Turso (libSQL)** for reservations storage
- **Vercel** for deployment (Paris region by default)

## Sections

- Cinematic hero with parallax, animated headline, floating gold particles
- Marquee of Michelin / 50-Best distinctions
- Story of the house with stat block
- Tabbed tasting menu with hover-preview imagery and wine pairings
- Chef portrait with timeline and signature
- Parallax editorial gallery
- Press & awards
- Reservation form wired to a Turso-backed API route
- Editorial footer

## Local development

```bash
npm install
npm run dev
```

The site is fully usable locally without any database; the reservation
endpoint will fall back to a "preview" response. To enable persistent
reservations, copy `.env.example` to `.env.local` and provide your Turso
credentials.

## Deploying to Vercel + Turso

1. Push this repo to GitHub.
2. Import into Vercel — the framework auto-detects.
3. In Turso, create a database and a token:
   ```bash
   turso db create maison-noir
   turso db tokens create maison-noir
   ```
4. Add the following environment variables in Vercel:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
5. Deploy. The `reservations` table is created automatically on first POST.

## Design notes

- Typography: Italiana (display) + Cormorant Garamond (serif) + Inter (UI).
- Custom cursor with magnetic ring on interactive elements.
- Loader curtain on initial paint.
- All decorative imagery is loaded from Unsplash CDN — swap for your own
  photography in production.
