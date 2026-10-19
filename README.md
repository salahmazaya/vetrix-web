# Vetrix website

Marketing site for Vetrix, built from the "Vetrix Website" Figma file.

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4
- **3D:** React Three Fiber / Three.js (`src/components/three`), loaded client-side only and paused when offscreen
- **Fonts:** Sora and Poppins via `next/font`

## Phase 1 (current)

The pages as designed in Figma, with 3D touches:

- Hero: interactive particle wave (replaces the stock photo)
- Meet Ve: live 3D glass orb that follows the pointer
- Proven Impact: globe tilts in 3D toward the pointer
- Our Process: diagram tilts on hover with a pulse on the Ve hub

Phase 2 will grow the `three/` components into a fully 3D experience.

## Content (Payload CMS)

Every page (Home, AI Core, About, Solutions, Contact), the navigation, the FAQ, the call-to-action band and
the footer are edited in the admin at `/admin`. Contact form messages land in **Messages**. Payload runs inside this Next.js app (`src/app/(payload)`), with its config in `src/payload.config.ts`
and the fields in `src/payload/globals`.

- **Database:** Postgres (Neon). Copy `.env.example` to `.env` and set `DATABASE_URL` and `PAYLOAD_SECRET`.
- **First start:** the admin is filled with the site's current content and images (`src/payload/seed`), then
  `/admin` asks you to create the first user.
- **Edits** show on the site straight away: each save clears that global's cached copy.
- After changing fields, run `npm run generate:types` to refresh `src/payload-types.ts`, then
  `npm run payload migrate:create <name>` and commit the new file in `src/migrations`.

Deploying to a server: see [DEPLOY.md](DEPLOY.md).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000, admin at /admin
npm run build   # production build
npm run lint
```

## Structure

```
src/app/                 routes and global styles (design tokens in globals.css)
src/components/layout/   navbar, footer, CTA band shared by every page
src/components/home/     Home page sections
src/components/inner/    shared pieces of the inner pages (blue header, FAQ, page shell)
src/components/ai-core/  AI Core sections (likewise about/, solutions/, contact/)
src/payload/             admin fields (globals, collections) and the first-start seed
src/migrations/          database migrations, applied automatically in production
src/components/three/    WebGL scenes (hero wave, orb) and 3D helpers
src/components/ui/       small building blocks (buttons, headings, stat badges)
public/images/           artwork exported from Figma
```
