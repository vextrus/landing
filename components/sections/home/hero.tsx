'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { Container } from '../../ui/section'
import { Button } from '../../ui/button'
import { Icon } from '../../ui/icon'
import { SystemProof } from '../../system-proof'
import { SystemCore } from '../../signature/system-core'
import { EnemyMarquee } from '../enemy-marquee'

function Identity() {
  return (
    <div>
      {/* Eyebrow — brand poetry + category (mono, the annotation voice). */}
      <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-raised py-1.5 pl-2.5 pr-3.5">
        <Icon name="spark" size={14} className="text-accent" />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          Structural Intelligence · built for Bangladesh
        </span>
      </div>

      {/* H1 — plain BD-owner English; brand poetry stays out of it (spec §2).
          Static + always visible (The Calm System — no fragile kinetic stagger). */}
      <h1 className="t-hero m-0 text-ink">
        <span className="block">The AI-native ERP for</span>
        <span className="block">Bangladesh construction</span>
        <span className="block">&amp; real estate.</span>
      </h1>

      {/* Subhead — the mechanism, in one breath (spec §2). */}
      <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-ink-soft">
        One system of record for everything you build — with an AI workforce that does the work on
        it. Starting with the Estimator: a structural drawing becomes a priced BOQ and bar-bending
        schedule, posted to your books with one approval.
      </p>

      {/* The trust pillar — paired with the autonomy claim, always. */}
      <p className="mt-5 flex items-start gap-2.5 text-[14px] leading-snug text-ink">
        <Icon name="shield-check" size={17} className="mt-0.5 shrink-0 text-accent" />
        <span>
          No agent changes your books on its own.{' '}
          <span className="font-semibold">You approve every taka.</span>
        </span>
      </p>

      <div className="mt-8 flex flex-wrap gap-3.5">
        <Button href="/contact" size="md" icon="arrow-right" iconRight>
          Book a call
        </Button>
        <Button href="/proof" size="md" variant="ghost">
          See it work
        </Button>
      </div>
    </div>
  )
}

// The right column: the REAL Estimator output in a drafting frame, with a copper
// dimension line annotating the real concrete volume — the un-fakeable thesis.
function EstimatorVignette() {
  return (
    <div className="relative">
      {/* faint structural watermark — the copper signature strokes in once */}
      <SystemCore className="pointer-events-none absolute -right-6 -top-10 -z-0 w-[78%] opacity-[0.07]" />

      <div className="draft-frame relative z-10">
        <SystemProof
          eager
          poster="/media/estimator/c1-estimator-draft-100pct.webp"
          width={1280}
          height={720}
          status="live"
          frame={{ url: '/ai/drafts/019edff9' }}
          alt="A real VextrusAI Estimator draft at 100% confidence: pile-cap takeoff, priced Bill of Quantities and Bar Bending Schedule, ready for 4-Eyes approval."
          caption="Real Estimator output — Pile Cap PC4, 14.70 m³ concrete, priced BOQ + Bar Bending Schedule, in a 4-Eyes draft."
        />

        {/* Copper dimension line on the real metric — draws on view. */}
        <DimensionTag value="14.70 m³" label="computed concrete volume" />
      </div>
    </div>
  )
}

function DimensionTag({ value, label }: { value: string; label: string }) {
  const reduce = useReducedMotion() ?? false
  return (
    <div className="mt-3 flex items-center gap-3" aria-hidden>
      <LazyMotion features={domAnimation}>
        <svg viewBox="0 0 120 12" width="120" height="12" className="shrink-0">
          <m.line
            x1="2"
            y1="6"
            x2="118"
            y2="6"
            stroke="var(--line-cut)"
            strokeWidth="1.5"
            initial={reduce ? undefined : { pathLength: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <line x1="2" y1="2" x2="2" y2="10" stroke="var(--line-cut)" strokeWidth="1.5" />
          <line x1="118" y1="2" x2="118" y2="10" stroke="var(--line-cut)" strokeWidth="1.5" />
        </svg>
      </LazyMotion>
      <span className="font-mono text-[12px] text-ink">
        <span className="font-semibold text-accent">{value}</span>
        <span className="text-ink-dim"> · {label}</span>
      </span>
    </div>
  )
}

// Thin BD-native legitimacy strip — honest, non-numeric (spec §3.2).
function LegitimacyStrip() {
  const items = [
    'The full construction lifecycle, one system of record',
    'NBR · RAJUK · BNBC built in',
    'Tenant-isolated',
    'One flagship agent live',
  ]
  return (
    <div className="mt-[clamp(2.5rem,4vw,3.5rem)] flex flex-wrap items-center gap-x-3 gap-y-2.5 border-t border-line pt-[26px]">
      {items.map((label, i) => (
        <span key={label} className="inline-flex items-center gap-3">
          {i > 0 && (
            <span className="text-[11px] text-ink-dim" aria-hidden="true">
              ·
            </span>
          )}
          <span className="font-mono text-[11.5px] tracking-[0.02em] text-ink-soft">{label}</span>
        </span>
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <header className="relative overflow-hidden pb-[clamp(3.5rem,7vw,5.5rem)] pt-[clamp(2.25rem,5vw,4.5rem)]">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="bg-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-[54px]">
          <Identity />
          <EstimatorVignette />
        </div>

        <LegitimacyStrip />
      </Container>

      <Container className="relative mt-[clamp(3rem,6vw,4.5rem)]">
        <EnemyMarquee />
      </Container>
    </header>
  )
}
