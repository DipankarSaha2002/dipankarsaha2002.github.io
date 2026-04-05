# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nivedita Vocal Academy — a static marketing/landing page website for a singing academy in Pune, India. Single-page site with sections: Hero, About, Classes, Gallery (photo carousel), Contact (with interest form, WhatsApp CTA, and embedded Google Map).

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

No test framework or linter is configured.

## Architecture

This is a vanilla HTML/CSS/JS project using Vite as the build tool. There is no framework (no React, Vue, etc.).

### Key files

- `index.html` — The entire site content lives here as a single HTML file. This is the Vite entry point.
- `main.js` — Root-level JS with mobile menu toggle, navbar scroll border effect, IntersectionObserver-based scroll-reveal animations, gallery carousel logic (slide transitions, auto-advance, swipe), and interest form validation/submission. Referenced directly by `index.html` (not `src/main.js`).
- `style.css` — Root-level Tailwind CSS entry point with custom theme colors, fonts, and component classes. Referenced directly by `index.html` (not `src/style.css`).
- `vite.config.js` — Minimal config, sets `base: '/'`.
- `postcss.config.js` — Configures `@tailwindcss/postcss` and `autoprefixer`.

### Important note

The `src/` directory contains Vite scaffold boilerplate (`src/main.js`, `src/style.css`, `src/counter.js`) that is **not used** by the site. The actual site uses root-level `main.js`, `style.css`, and `index.html`.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin (not the older `tailwind.config.js` approach)
- Custom theme defined with `@theme` directive in `style.css`:
  - **Colors**: Warm earthy palette — `cream`, `sand`, `terracotta`, `rust`, `gold`, `charcoal`, `warm-brown`, `warm-text`, `warm-muted`, `border-warm` (use these via Tailwind classes like `text-terracotta`, `bg-cream`, etc.)
  - **Fonts**: `--font-display` (Cormorant, serif) for headings and `--font-body` (Karla, sans-serif) for body text
- Google Fonts loaded in `index.html`: Cormorant (ital/wght 400-700) and Karla (wght 300-700)
- Tailwind utility classes in `index.html` + custom CSS component classes in `style.css` (`.btn-primary`, `.btn-outline`, `.btn-whatsapp`, `.btn-form-submit`, `.genre-pill`, `.credential-card`, `.nav-link`, `.link-underline`, `.heading-display`, `.heading-italic`, `.ornament`, `.hr-warm`, `.reveal`, `.gallery-carousel`, `.gallery-slide`, `.gallery-arrow`, `.gallery-dot`, `.form-card`, `.form-input`, `.form-label`, `.interest-pill`, `.form-error`, `.form-success`)
- Scroll-reveal animation system: add `.reveal` class to elements; JS adds `.visible` on scroll. Use `.reveal-delay-1` through `.reveal-delay-4` for staggered timing. Hero uses CSS `@keyframes fadeUp` with nth-child delays.
- Subtle grain texture overlay applied via `body::after` pseudo-element

## Gallery Carousel

- Center-focus carousel in `#gallery` section between Classes and Contact
- Active slide is full-size with box shadow; adjacent slides are scaled down and dimmed
- Navigation: prev/next arrow buttons (desktop only), dot indicators, click on adjacent slides
- Auto-advances every 5 seconds, pauses on hover/touch
- Touch swipe support for mobile (single-image view, arrows hidden)
- CSS classes: `.gallery-carousel`, `.gallery-track`, `.gallery-slide` (with `.active`, `.prev`, `.next` states), `.gallery-arrow`, `.gallery-dots`, `.gallery-dot`
- Currently uses placeholder Unsplash images — replace with real academy photos

## Interest Form

- Located inside the Contact section (`#contact`), in the left column above phone/address details
- Fields: Name (text), Mobile Number (tel), Interested In (multi-select toggle pills: Classical, Ghazal, Bollywood, Bhajan, Harmonium)
- Submits to Google Forms via hidden `<iframe>` (no page redirect). Shows thank-you message on success.
- **Google Forms setup required**: Replace `FORM_ID` and `entry.XXXXXX` placeholder values in `index.html` with actual Google Form IDs. See the HTML comment block in the form for instructions. Enable email notifications in Google Forms settings.
- CSS classes: `.form-card`, `.form-input`, `.form-label`, `.interest-pill` (with `.selected` state), `.btn-form-submit`, `.form-error`, `.form-success`

## Deployment

Previously configured for GitHub Pages (workflows deleted from working tree). Domain: `niveditavocalacademy.com`.
