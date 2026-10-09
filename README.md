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

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/app/                 routes and global styles (design tokens in globals.css)
src/components/layout/   navbar, footer, CTA band shared by every page
src/components/home/     Home page sections
src/components/three/    WebGL scenes (hero wave, orb) and 3D helpers
src/components/ui/       small building blocks (buttons, headings, stat badges)
public/images/           artwork exported from Figma
```
