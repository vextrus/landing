# Vextrus Marketing Site (`www.vextrus.com`)

The production marketing site for **VextrusAI — your AI workforce for construction & real estate.**
An 8-page, dark-dominant "Structural Intelligence" site built from the approved design handoff
(`design_handoff_vextrus_marketing/`). Agents-first story: agents do the work, you approve the
exceptions — on a 20-module Bangladesh-native engine, gated by 4-Eyes write-back.

## v2 — "Structural Intelligence" redesign (2026-06-25)

Spec/plan: `docs/superpowers/specs/2026-06-24-vextrus-marketing-site-v2-design.md` +
`docs/superpowers/plans/2026-06-24-vextrus-marketing-site-v2.md`. Built via Subagent-Driven
Development (Tasks 1–15) then Ultracode dynamic workflows (hero + page waves).

- **New hero — "The Integrated Core":** identity-first ("The AI-native ERP for real estate &
  construction." · "Twenty modules. One brain. Built for Bangladesh.") with the signature
  `IntegratedCore` animation — a copper AI core + 7 pillars + 20 modules with data-flow pulses
  (`components/signature/integrated-core.tsx`). Replaces the old split/Estimator-card hero.
- **New signature kit:** `IntegratedCore`, `LiveEstimatorFlow` (auto-play drawing→BOQ→approve→posted),
  `WorkforceRoster` + department filter (role-titled cards, Reads→Does→Writes-to-module),
  `ApprovalInbox` + `ConfidenceFork` (the human-in-the-loop — **replaced the confusing autonomy dial**),
  `CapabilityMatrix` (honest 5×5 — **replaced the 2×2**), `ModuleExplorer` (interactive per-module
  features/outcomes/agents on `/engine`), `OutcomeCounter`, and `BangladeshMap` v2 (**real
  geoBoundaries geometry**, 8 divisions — replaced the hand-drawn blob).
- **Retired:** `AutonomyDial`, `AgentConstellation`, `TierLegend`, `TwoByTwo`, `EstimatorDemo`.
- **Bangladesh map data:** `lib/bd-divisions.topo.json` (geoBoundaries ADM1, **CC BY 4.0**,
  mapshaper-simplified TopoJSON) rendered via `lib/geo.ts` (d3-geo `geoMercator().fitSize`); old/
  misspelled division names normalised to modern spellings. Attribution in the footer.
- **Motion/tech:** `motion` v12 (LazyMotion + `m`, transform/opacity only) + CSS reveals; one lazy
  Paper-Shaders hero backdrop (`ShaderBackdrop`, `ssr:false` + reduced-motion/coarse-pointer gate +
  static fallback); all signature motion is reduced-motion-safe.
- **AI-readability layer:** `public/llms.txt`, `public/agents.json`, + a SoftwareApplication JSON-LD
  alongside the Organization node in `app/layout.tsx`.
- **Verification:** `pnpm --filter @vextrus/landing typecheck` 0; ESLint clean; all 8 routes 200 via
  `scripts/verify.mjs` (Playwright assert + screenshot harness); honesty guardrails enforced (mechanism
  not the retired ~1.17Cr figure; only the Estimator shipped; no logos/prices; lakh/crore).

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first `@theme` in `app/globals.css` (no JS config). Colors in **OKLCh**.
- **Motion** (Framer Motion) for scroll reveals + signature animations; `prefers-reduced-motion` respected throughout.
- **next/font** — Instrument Serif, Syne, Outfit, Plus Jakarta Sans, JetBrains Mono, Noto Sans Bengali.
- **lucide-react** available; the site ships a bespoke 2px line-icon set (`components/ui/icon.tsx`).
- **zod** for the contact route handler.

## Run

```bash
pnpm --filter @vextrus/landing dev     # http://localhost:3002
pnpm --filter @vextrus/landing build   # production build
pnpm --filter @vextrus/landing start
pnpm --filter @vextrus/landing typecheck
```

## Deploy (Vercel)

Server runtime (the `/contact` form posts to a route handler, so this is **not** a static export).

1. Import `apps/landing` as a Vercel project (root directory `apps/landing`, framework Next.js).
2. Set env vars (both optional — the form degrades to logging the lead if unset):
   - `CONTACT_WEBHOOK_URL` — POST target for demo requests (Slack / CRM / Zapier / Make hook).
   - `CONTACT_EMAIL` — notification address (default `ceo@vextrus.com`).
3. Build command `next build`, output served by the Next server. `sitemap.xml` / `robots.txt` are generated at `/sitemap.ts` and `/robots.ts`.

> Deviation from handoff infra: the handoff folder also contains GCP/Firebase configs, but those
> target the **ERP web app** (`vextrus-web` on Cloud Run), not this marketing site. Per the build
> decision, the marketing site is deployed to **Vercel** (server runtime). It can also run on GCP
> Cloud Run unchanged (same Next server); only the host differs.

## Token mapping (design-tokens → Tailwind `@theme`)

All tokens are mapped CSS-first in `app/globals.css`. Source = `design_handoff_vextrus_marketing/design-tokens/`.

| Handoff token (`landing.css` / `colors.css`) | `@theme` key → utility | Notes |
|---|---|---|
| `--canvas` / `--canvas-raised` / `--canvas-deep` | `--color-canvas` / `--color-raised` / `--color-deep` → `bg-canvas` … | dark surface hierarchy |
| `--canvas-warm` / `-warm-raised` | `--color-warm` / `--color-warm-raised` → `bg-warm` | warm "structural" light breaks |
| `--accent` (copper) / hover | `--color-accent` / `--color-accent-hi` → `text-accent`, `bg-accent` | the AI cue (hue 44) |
| `--indigo` | `--color-indigo` | structural lines / atmosphere (hue 275) |
| `--text-primary` / `-secondary` | `--color-ink` / `--color-ink-soft` | + `--color-ink-dim`, `--color-ink-dark`, `--color-ink-dark-soft` (warm sections) |
| `--border-subtle` / `-warm` | `--color-line` / `--color-line-warm` (+ `--color-line-strong`) | hairlines |
| financial palette | `--color-credit` / `--color-debit` / `--color-overdue` / `--color-success` | colorblind-safe |
| module accents | `--mod-*` (in `.theme-landing`) | the "Atmosphere"; dynamic per-card via `--tile-accent` |
| font stacks | `--font-serif` / `-heading` / `-wordmark` / `-body` / `-mono` / `-bengali` → `font-*` | resolve to next/font `--ff-*` vars |
| easings | `--ease-expo` / `-quart` / `-spring` → `ease-*` | The Calm System |
| type scale | `--text-hero` / `-section` / `-display` / `-stat` | fluid `clamp()`; used by `.t-*` helpers |

`.theme-landing` (the marketing scope) also holds the raw vars components reference directly
(`--accent-glow`, `--mod-*`, gradients, `--maxw`). Heading helper classes: `.t-hero` (Syne),
`.t-section` (Syne), `.t-display` (Instrument Serif), `.t-overline` (copper eyebrow), `.text-gradient`.

## Architecture

```
app/
  layout.tsx                 root — fonts, base metadata, Organization JSON-LD
  globals.css                Tailwind v4 @theme + .theme-landing + utilities + keyframes
  sitemap.ts / robots.ts     SEO
  api/contact/route.ts       demo-request handler (zod + honeypot + env webhook)
  (marketing)/
    layout.tsx               .theme-landing wrapper + SiteNav + SiteFooter + ScrollProgress + skip link
    page.tsx                 / (home — immersive scroll)
    workforce|solutions|engine|why|bangladesh|estimator|contact/page.tsx
components/
  ui/        primitives — Section, Container, Overline, Button, Badge, Icon, Reveal,
             CountUp, Marquee, Stat, LinkArrow, OutcomeCounter, ShaderBackdrop
  layout/    BrandMark, SiteNav (sticky glass + mobile drawer + active link), SiteFooter, ScrollProgress
  signature/ IntegratedCore, LiveEstimatorFlow, WorkforceRoster, ApprovalInbox, ConfidenceFork,
             CapabilityMatrix, ModuleExplorer, BangladeshMap (real geo), GlassBoxPipeline, ConfidenceMeter
  sections/  EnemyMarquee, ShiftCards, SolutionsGrid, ModuleBento/ModuleTile,
             + per-page section pieces under sections/<route>/
lib/
  site.ts        siteConfig, nav, footer, pageMeta() helper
  agents.ts      the 23 agents (tier + module + write-back command), tiers, roadmap lanes, confidence demo data
  modules.ts     the 20 modules (pillar + accent)
  solutions.ts   the 4 bundles + the custom-build upsell
  fonts.ts       next/font → --ff-* variables
```

Content renders **from typed data** (`lib/*`), not hardcoded markup, so the agent catalogue, module
index, and bundles stay in one place.

## Beyond the mockups

- **Responsive**: mobile-first stacks, mobile nav drawer, fluid type, ≥44px touch targets (mockups were desktop-only).
- **Accessibility**: semantic landmarks, skip link, focus-visible rings (3px @ accent/35%), `aria-label` on icon/gauge SVGs, AA contrast, keyboard nav, full `prefers-reduced-motion` variants, `prefers-reduced-transparency` glass fallback.
- **SEO**: per-route `metadata` + canonical, Open Graph / Twitter cards, Organization JSON-LD, `sitemap.xml`, `robots.txt`.
- **Performance**: server components by default (only Reveal / CountUp / SiteNav / ScrollProgress / ConfidenceMeter / DemoForm are client), `next/font` display swap, no raster images (all inline SVG), no layout shift.
- **Motion** ("The Calm System"): scroll-reveal stagger, gauge/number count-ups on view, sticky scroll-progress cue, hover micro-interactions, marquee. No autoplay video, no infinite decorative loops on content.
- **i18n-ready**: Bengali accents kept (`font-bengali`); copy structured so a future `bn` locale is feasible.

## Honesty guardrails (enforced in copy)

Calm/precise/confident voice; Taka in lakh/crore; July–June FY; correct NBR/RAJUK/BBS terms; no hype, no emoji.
Pre-first-customer: lead with the live write-back **mechanism** — no customer logos, no fabricated case
studies, no internal prices. Only the **Drawing Estimator** is a shipped flagship; the 13 elevatable
agents are roadmap (write-back wired), the 9 embedded are advisory.

## Deviations from the mockup

All deviations are intentional — to honor the design-system conventions, the honesty guardrails, or
the "beyond the mockups" brief. None change the visual intent.

- **Deploy/runtime**: Vercel **server runtime** instead of the handoff folder's static-export config,
  so `/contact` can post to a real route handler. (The GCP/Firebase configs in the repo target the
  ERP web app, not this site.) Runs unchanged on Cloud Run if preferred.
- **Tone alternation**: where a mockup placed two adjacent dark sections, several pages insert a
  **warm structural break** (e.g. Solutions' *Flagship Custom Build*, Why's *in-house/DIY*) to honor
  "no two adjacent sections share a background." Treatment (gradient/border) is preserved on the warm canvas.
- **Data-driven rendering**: the agent catalogue, the 20 modules, and the bundles render from
  `lib/*` (single source of truth) instead of the mockups' hardcoded markup, so copy stays consistent
  site-wide. Signature visualizations are the shared components, not per-page rebuilds.
- **Added bands**: a few pages gain a final CTA band the desktop mockup omitted, matching the
  home/contact rhythm. Each page also gains real mobile breakpoints, a mobile nav drawer, scroll
  reveals, a scroll-progress cue, and the contact route handler — additive, no mockup to deviate from.
- **Honesty framing**: the write-back is cited as the **mechanism** (registered command, proven on
  the Estimator + Bank Reconciler; wired across 14 of 23 agents) — never the retired ~1.17-crore
  "keystone" figure, no customer logos, no internal prices. Tiers labelled exactly: 1 shipped
  flagship, 13 elevatable (roadmap), 9 embedded (advisory).
- **Tokens**: mockups referenced `--module-*`; the codebase canonicalizes these as `--mod-*`
  (consumed by `lib/*` + `--tile-accent`). Same hues, renamed namespace.
