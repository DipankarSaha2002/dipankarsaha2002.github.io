# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nivedita Vocal Academy — a static marketing/landing page website for a singing academy in Pune, India. Single-page site with sections: Hero, About, Classes, Contact (with WhatsApp CTA and embedded Google Map).

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

No test framework or linter is configured.

## Architecture

This is a vanilla HTML/CSS/JS project using Vite as the build tool. There is no framework (no React, Vue, etc.).

### Key files

- `index.html` — The entire site content lives here as a single HTML file. This is the Vite entry point.
- `main.js` — Root-level JS with mobile menu toggle and navbar scroll effects. Referenced directly by `index.html` (not `src/main.js`).
- `style.css` — Root-level Tailwind CSS entry point with custom `brand-*` color theme and `font-display`/`font-sans` custom fonts. Referenced directly by `index.html` (not `src/style.css`).
- `vite.config.js` — Minimal config, sets `base: '/'`.
- `postcss.config.js` — Configures `@tailwindcss/postcss` and `autoprefixer`.

### Important note

The `src/` directory contains Vite scaffold boilerplate (`src/main.js`, `src/style.css`, `src/counter.js`) that is **not used** by the site. The actual site uses root-level `main.js`, `style.css`, and `index.html`.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin (not the older `tailwind.config.js` approach)
- Custom theme defined with `@theme` directive in `style.css` — brand colors (purple palette) and font families
- Google Fonts: Inter (body) and Playfair Display (headings via `font-display`)
- All styling uses Tailwind utility classes directly in `index.html`

## Deployment

Previously configured for GitHub Pages (workflows deleted from working tree). Domain: `niveditavocalacademy.com`.
