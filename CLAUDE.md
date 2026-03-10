# Portfolio — Oliver Kenwright

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **Fonts**: DM Serif Display, Sora, JetBrains Mono (Google Fonts via next/font)
- **Deployment**: Vercel

## Design Tokens
- Primary: `#2B2BFF` (blue)
- Accents: Gold `#FFD43B`, Teal `#00C9A7`, Purple `#7C3AED`
- Fonts: `font-display` (serif), `font-sans` (Sora), `font-mono` (JetBrains Mono)

## Project Structure
- `app/` — Next.js App Router pages
- `components/` — React components (Nav, Hero, CaseStudy, etc.)
- `components/ui/` — Utility components (Reveal, AnimNumber)
- `public/images/` — Static assets

## Conventions
- All interactive components use `"use client"` directive
- Scroll animations use IntersectionObserver via `Reveal` wrapper
- Color tokens defined in `globals.css` using Tailwind v4 `@theme inline`
