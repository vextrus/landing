'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import type { Variants } from 'motion/react'
import { Container } from '../../ui/section'
import { Button } from '../../ui/button'
import { Stat } from '../../ui/stat'
import { Icon } from '../../ui/icon'
import { ShaderBackdrop } from '../../ui/shader-backdrop'
import { IntegratedCore } from '../../signature/integrated-core'
import { EnemyMarquee } from '../enemy-marquee'

// ── The one kinetic moment ─────────────────────────────────────────────────
// Two headline lines rise + settle once, staggered. Transform/opacity only, so
// there is no layout shift — the real text is always in the DOM (reserved
// space). Under reduced motion the parent renders static (no variants applied).
const headlineGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const headlineLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

// The left identity column. Kept in its own component so the kinetic moment can
// be reduced-motion gated cleanly.
function Identity() {
  const reduce = useReducedMotion() ?? false

  // Eyebrow chip — what Vextrus IS, in one line.
  const eyebrow = (
    <div
      className="mb-[26px] inline-flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-2.5 pr-3.5"
      style={{ background: 'oklch(0.14 0.012 270 / 0.72)' }}
    >
      <Icon name="spark" size={15} className="text-accent" />
      <span className="font-mono text-[11.5px] tracking-[0.06em] text-ink-soft">
        Native AI-integrated ERP · built for Bangladesh
      </span>
    </div>
  )

  // Real DOM text always present (reserved space). Animation rides on top. The
  // H1 states the category outright; line 2 (accent serif) carries the sector.
  const line1 = 'The AI-native ERP for'
  const line2 = 'real estate & construction.'

  return (
    <div>
      {eyebrow}

      <LazyMotion features={domAnimation}>
        <m.h1
          className="t-hero-kinetic m-0 text-ink"
          variants={reduce ? undefined : headlineGroup}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? false : 'show'}
        >
          <m.span className="block" variants={reduce ? undefined : headlineLine}>
            {line1}
          </m.span>
          <m.span
            className="block font-serif italic text-gradient"
            style={{ fontWeight: 400 }}
            variants={reduce ? undefined : headlineLine}
          >
            {line2}
          </m.span>
        </m.h1>
      </LazyMotion>

      {/* Punchline — short, plain, strong. */}
      <p className="mt-[22px] text-[19px] font-semibold leading-snug text-ink">
        Twenty modules. One brain. Built for Bangladesh.
      </p>

      {/* Plain subcopy — what it does + the approval guarantee. */}
      <p className="mt-[18px] max-w-[500px] text-[17px] leading-relaxed text-ink-soft">
        Estimating, procurement, finance, sales, site — every department in one Bangladesh-native
        system, with AI woven through it. It does the work; you approve every taka.
      </p>

      <div className="mt-[34px] flex flex-wrap gap-3.5">
        <Button href="/contact" size="md" icon="arrow-right" iconRight>
          Book a demo
        </Button>
        <Button href="/engine" size="md" variant="ghost">
          See the platform
        </Button>
      </div>

      <div className="mt-[46px] flex flex-wrap gap-x-6 gap-y-4">
        <Stat icon="network" value={23} label="AI agents" accent="var(--mod-ai)" />
        <Stat icon="layers" value={20} label="module engine" accent="var(--mod-project)" />
        <Stat icon="shield-check" value="4-Eyes" label="on every write-back" />
      </div>
    </div>
  )
}

// Thin BD-native trust strip beneath the two columns — honest, uncluttered.
function TrustStrip() {
  const items = ['One system of record', 'Approval-gated AI', 'Mushak', 'RAJUK', 'BBS']
  return (
    <div className="mt-[clamp(2.25rem,4vw,3.25rem)] flex flex-wrap items-center gap-x-3 gap-y-2.5 border-t border-line pt-[26px]">
      {items.map((label, i) => (
        <span key={label} className="inline-flex items-center gap-3">
          {i > 0 && (
            <span className="text-[11px] text-ink-dim" aria-hidden="true">
              ·
            </span>
          )}
          <span className="font-mono text-[11.5px] tracking-[0.04em] text-ink-soft">{label}</span>
        </span>
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <header className="relative overflow-hidden pb-[clamp(3.5rem,7vw,5.75rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
      {/* Backdrop stack (all aria-hidden, behind content):
          1. The animated copper/indigo shader (LCP-safe static fallback baked in).
          2. A scrim that darkens the left + bottom so headline keeps AA contrast
             over the saturated mesh — ink (oklch 0.93) over ~oklch 0.12 canvas.
          3. .bg-atmosphere reinforces the brand orbs without lifting text bg. */}
      <ShaderBackdrop />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(100deg, oklch(0.11 0.01 270 / 0.92) 0%, oklch(0.11 0.01 270 / 0.7) 42%, oklch(0.11 0.01 270 / 0.32) 72%, transparent 100%), linear-gradient(to top, oklch(0.11 0.01 270 / 0.85), transparent 55%)',
        }}
      />
      <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[54px]">
          <Identity />
          {/* The Integrated Core fills the visual column on desktop. On mobile it
              sits below the identity — constrained so it is neither cropped nor
              too tall (the SVG is square and scales to its container width). */}
          <div className="flex justify-center lg:block">
            <IntegratedCore className="w-full max-w-[clamp(300px,72vw,560px)] lg:max-w-none" />
          </div>
        </div>

        <TrustStrip />
      </Container>

      <Container className="relative mt-[clamp(3rem,6vw,4.5rem)]">
        <EnemyMarquee />
      </Container>
    </header>
  )
}
