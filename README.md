# Suzaku Website

Landing page for [Suzaku](https://suzaku.network) — the **Decentralization Hub for L1s**.

## About Suzaku

Suzaku helps L1 builders secure their networks through progressive decentralization. The Suzaku protocol is tailored for [Avalanche L1s](https://docs.avax.network/protocol/avalanche-l1s), providing security models ranging from PoA to PoS and dual staking — without requiring contract migration.

## Site Structure

The landing page is a single-page site composed of the following sections, in order:

| Component | Description |
|---|---|
| `Nav` | Top navigation bar with logo and links |
| `Hero` | Primary headline and call to action |
| `RiskCarousel` | Carousel surfacing L1 security risks (TVL theft, liveness, censorship, OpSec) |
| `JourneySteps` | Step-by-step decentralization journey from PoA to PoS |
| `Protocol` | Overview of the Suzaku protocol and BalancerValidatorManager |
| `About` | Team and mission |
| `FinalCta` | Closing call to action |
| `Footer` | Social links, legal links, and copyright |

A `404.astro` page handles unknown routes.

## Tech Stack

- [Astro](https://astro.build) — static site framework
- [Tailwind CSS](https://tailwindcss.com) via `@astrojs/tailwind`
- [astro-icon](https://github.com/natemoo-re/astro-icon) with Lucide and Simple Icons icon sets
- [Inconsolata](https://fonts.google.com/specimen/Inconsolata) — single font family throughout
- **pnpm** as the package manager

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io) — install with `npm install -g pnpm` if needed

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

The site will be available at [http://localhost:4321](http://localhost:4321).

### Build for production

```bash
pnpm build
```

The output is written to `dist/`.

### Preview the production build locally

```bash
pnpm preview
```

## Project Structure

```
suzaku-website/
├── public/               # Static assets (fonts, images, favicon)
├── src/
│   ├── components/       # Astro components (one per page section)
│   ├── layouts/          # Base HTML layout
│   ├── pages/            # File-based routes (index.astro, 404.astro)
│   ├── styles/           # Global CSS
│   └── data/             # Static data used by components
├── context/              # Brand guidelines, docs, and articles (not deployed)
├── astro.config.mjs
├── tailwind.config.cjs
└── package.json
```

## Brand & Design

Colors, typography, and logo usage are defined in `context/suzaku-brand/Suzaku-Brand-Guidelines.pdf`. Key rules:

- Background: Deep Black `#101010` (never pure `#000000`)
- Accent gradient: `#00A4AF` → `#43F6AB`
- Font: Inconsolata (Light, Regular, Extrabold)
- Titles use `font-semibold`; `font-extrabold` is reserved for labels, buttons, and data callouts

## License

© 2025 ADDPHO. All rights reserved.
