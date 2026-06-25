'use client'

import { useRef, useState } from 'react'
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'motion/react'
import type { Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { Icon } from '../ui/icon'

// LiveEstimatorFlow — the auto-playing upgrade of the flagship Estimator visual.
// A model reads an RCC pile-cap drawing (scan line sweeps once), a deterministic
// engine returns a priced BOQ + Bar Bending Schedule + cutting-stock nesting, and
// one 4-Eyes approval flips to "Posted to your books". A six-beat, scroll-triggered
// sequence (The Calm System — animate state changes only, transform/opacity only,
// no layout shift). Reuses the exact markup + demo numbers from estimator-demo.tsx.

const INK = 'var(--color-ink-dark)'
const INK_SOFT = 'var(--color-ink-dark-soft)'
const WARM_LINE = 'var(--color-line-warm)'
const COPPER = 'oklch(0.52 0.14 44)'
const INDIGO = 'oklch(0.42 0.12 275)'
const GREEN = 'oklch(0.40 0.12 155)'

// ── Beat sequencing ──────────────────────────────────────────────────────
// Parent staggers its direct children; each beat is a child group, so the six
// beats arrive in order: scan → chips → BOQ rows → BBS → confidence/approve → posted.
const STAGGER = 0.12

function makeContainer(reduce: boolean): Variants {
  return {
    hidden: {},
    show: {
      transition: reduce ? {} : { staggerChildren: STAGGER, delayChildren: 0.1 },
    },
  }
}

// Rise-in: opacity + small translate only (compositor-friendly, no layout shift).
const rise: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

// Chips / pulse-in: opacity + scale only.
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

// ── Drawing panel (beat 1 scan + beat 2 chips) ─────────────────────────────
function DrawingPanel({ reduce, started }: { reduce: boolean; started: boolean }) {
  return (
    <m.div
      variants={rise}
      className="flex flex-col rounded-[18px] border p-5"
      style={{
        borderColor: WARM_LINE,
        background: 'oklch(0.99 0.004 70)',
        boxShadow: '0 24px 50px -26px rgba(40,30,20,0.3)',
      }}
    >
      <div className="mb-3.5 flex items-center justify-between">
        <span className="font-mono text-[11px]" style={{ color: INK_SOFT }}>
          RCC-PILE-CAP · PC-3.dwg
        </span>
        <span
          className="flex items-center gap-1.5 font-mono text-[10.5px]"
          style={{ color: COPPER }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: 'oklch(0.62 0.14 44)',
              animation: reduce ? undefined : 'vx-blink 1.4s ease-in-out infinite',
            }}
          />
          vision · reading
        </span>
      </div>

      <div
        className="relative flex-1 overflow-hidden rounded-[11px] border"
        style={{ background: 'oklch(0.965 0.006 70)', borderColor: WARM_LINE }}
      >
        <svg viewBox="0 0 420 260" width="100%" style={{ display: 'block' }} aria-hidden="true">
          <defs>
            <linearGradient id="vx-scan-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="oklch(0.62 0.14 44 / 0.45)" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* isometric footing */}
          <g stroke="oklch(0.50 0.12 275)" fill="none">
            <polygon
              points="120,70 300,70 360,120 180,120"
              fill="oklch(0.50 0.12 275 / 0.05)"
              strokeWidth="1.5"
            />
            <polygon
              points="120,70 180,120 180,200 120,150"
              fill="oklch(0.50 0.12 275 / 0.08)"
              strokeWidth="1.5"
            />
            <polygon
              points="300,70 360,120 360,200 300,150"
              fill="oklch(0.50 0.12 275 / 0.03)"
              strokeWidth="1.5"
            />
            <path d="M180 120 L180 200 L360 200 L360 120" strokeWidth="1.5" />
            <path d="M120 150 L180 200 M300 150 L360 200" strokeWidth="1" />
          </g>
          {/* rebar mats */}
          <g stroke="oklch(0.62 0.14 44)" strokeWidth="1" opacity="0.85">
            <path d="M140 82 L320 82 M160 94 L340 94 M180 106 L360 106" />
            <path d="M150 76 L210 124 M190 73 L250 121 M230 71 L290 119 M270 71 L330 119" />
          </g>
          {/* column stub */}
          <g stroke="oklch(0.74 0.14 44)" strokeWidth="1.4" fill="oklch(0.70 0.14 44 / 0.1)">
            <polygon points="215,95 265,95 285,113 235,113" />
            <path d="M215 95 L215 55 M265 95 L265 55 M235 113 L235 73 M285 113 L285 73" />
            <polygon points="215,55 265,55 285,73 235,73" fill="oklch(0.70 0.14 44 / 0.18)" />
          </g>
          {/* dimension */}
          <g
            stroke="oklch(0.50 0.02 270)"
            strokeWidth="0.7"
            className="font-mono"
            fontSize="8.5"
            fill={INK_SOFT}
          >
            <path d="M120 222 L300 222" />
            <path d="M120 218 L120 226 M300 218 L300 226" />
            <rect
              x="186"
              y="215"
              width="48"
              height="13"
              fill="oklch(0.965 0.006 70)"
              stroke="none"
            />
            <text x="210" y="225" textAnchor="middle">
              3600 mm
            </text>
          </g>
          {/* scan line — beat 1: a one-time sweep (transform/opacity only). Reduced
              motion or once it has played, it rests invisible at the bottom. */}
          {reduce ? null : (
            <m.g
              initial={{ y: 0, opacity: 0 }}
              animate={started ? { y: 168, opacity: [0, 1, 1, 0] } : { y: 0, opacity: 0 }}
              transition={{ duration: 2.0, ease: [0.25, 1, 0.5, 1], times: [0, 0.08, 0.92, 1] }}
            >
              <rect x="110" y="55" width="260" height="2" fill="oklch(0.62 0.14 44)" />
              <rect
                x="110"
                y="55"
                width="260"
                height="18"
                fill="url(#vx-scan-grad)"
                opacity="0.4"
              />
            </m.g>
          )}
        </svg>
      </div>

      <div className="mt-3.5">
        <div
          className="mb-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: INK_SOFT }}
        >
          Model extracts — dimensions only
        </div>
        {/* beat 2: dimension chips pop in */}
        <m.div className="flex flex-wrap gap-1.5" variants={makeContainer(reduce)}>
          {['3600×2000×670', '16⌀ @ 150 c/c'].map((c) => (
            <m.span
              key={c}
              variants={pop}
              className="rounded-md px-2.5 py-1 font-mono text-[11px]"
              style={{ background: 'oklch(0.50 0.12 275 / 0.08)', color: INDIGO }}
            >
              {c}
            </m.span>
          ))}
          <m.span
            variants={pop}
            className="rounded-md px-2.5 py-1 font-mono text-[11px]"
            style={{ background: 'oklch(0.40 0.12 155 / 0.1)', color: 'oklch(0.38 0.12 155)' }}
          >
            read 0.97
          </m.span>
        </m.div>
      </div>
    </m.div>
  )
}

const BOQ_ROWS = [
  { item: 'Concrete · M25', qty: '4.82 m³', amount: '59,768' },
  { item: 'Reinforcement · 16⌀ (BBS)', qty: '312 kg', amount: '30,576' },
  { item: 'Formwork · footing face', qty: '38.4 m²', amount: '16,128' },
]

// ── Bar Bending Schedule (beat 4: shapes draw on) ──────────────────────────
function BBSDiagram({ reduce }: { reduce: boolean }) {
  return (
    <m.div
      variants={rise}
      className="mt-4 rounded-xl border p-4"
      style={{ borderColor: WARM_LINE, background: 'oklch(0.975 0.005 70)' }}
    >
      <div className="mb-2.5 font-mono text-[10px] tracking-[0.06em]" style={{ color: INK_SOFT }}>
        BAR BENDING SCHEDULE · BS 8666 · shapes &amp; cutting lengths
      </div>
      <m.div className="flex items-end gap-4" variants={makeContainer(reduce)}>
        <Shape label="16⌀ · 32" topText="2940" color={COPPER}>
          <path
            d="M8 32 L8 12 L76 12 L76 32"
            fill="none"
            stroke={COPPER}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Shape>
        <Shape label="12⌀ · 18" topText="stirrup" color={INDIGO}>
          <path
            d="M12 32 L12 14 L72 14 L72 32 L12 32"
            fill="none"
            stroke={INDIGO}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </Shape>
        <Shape label="20⌀ · 9" topText="cranked" color="oklch(0.55 0.10 200)">
          <path
            d="M8 22 L20 12 L76 12"
            fill="none"
            stroke="oklch(0.55 0.10 200)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 22 L8 32"
            stroke="oklch(0.55 0.10 200)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Shape>
        <m.div className="ml-auto text-right" variants={pop}>
          <div className="font-mono text-[9px]" style={{ color: INK_SOFT }}>
            weight · d²/162
          </div>
          <div className="font-mono text-xl font-bold leading-tight" style={{ color: INK }}>
            542 kg
          </div>
        </m.div>
      </m.div>
    </m.div>
  )
}

function Shape({
  label,
  topText,
  children,
}: {
  label: string
  topText: string
  color: string
  children: ReactNode
}) {
  return (
    <m.div className="text-center" variants={pop}>
      <svg width="84" height="40" viewBox="0 0 84 40">
        <text
          x="42"
          y="9"
          textAnchor="middle"
          className="font-mono"
          fontSize="7"
          fill="oklch(0.45 0.02 70)"
        >
          {topText}
        </text>
        {children}
      </svg>
      <div className="mt-0.5 font-mono text-[10px]" style={{ color: INK }}>
        {label}
      </div>
    </m.div>
  )
}

// ── Output panel (beats 3–6) ───────────────────────────────────────────────
function OutputPanel({
  reduce,
  variant,
  posted,
  onApproveBeatDone,
}: {
  reduce: boolean
  variant: 'hero' | 'full'
  posted: boolean
  onApproveBeatDone: () => void
}) {
  const showWaste = variant === 'full'
  return (
    <m.div
      variants={rise}
      className="flex flex-col rounded-[18px] border p-6"
      style={{
        borderColor: WARM_LINE,
        background: 'oklch(0.99 0.004 70)',
        boxShadow: '0 24px 50px -26px rgba(40,30,20,0.3)',
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-heading text-base font-semibold" style={{ color: INK }}>
          Priced Bill of Quantities
        </span>
        <span className="font-mono text-[10.5px]" style={{ color: INK_SOFT }}>
          engine-computed · PWD/RHD SOR
        </span>
      </div>

      {/* beat 3: BOQ rows stagger in */}
      <table className="mt-2.5 w-full border-collapse text-[13px]">
        <thead>
          <tr className="text-left font-mono text-[10.5px]" style={{ color: INK_SOFT }}>
            <th className="py-1.5 font-medium">ITEM</th>
            <th className="py-1.5 text-right font-medium">QTY</th>
            <th className="py-1.5 text-right font-medium">AMOUNT ৳</th>
          </tr>
        </thead>
        <m.tbody variants={makeContainer(reduce)}>
          {BOQ_ROWS.map((r) => (
            <m.tr key={r.item} variants={rise} style={{ borderTop: `1px solid ${WARM_LINE}` }}>
              <td className="py-2" style={{ color: INK }}>
                {r.item}
              </td>
              <td className="py-2 text-right font-mono" style={{ color: INK_SOFT }}>
                {r.qty}
              </td>
              <td className="py-2 text-right font-mono" style={{ color: INK }}>
                {r.amount}
              </td>
            </m.tr>
          ))}
          <m.tr variants={rise} style={{ borderTop: '1.5px solid oklch(0.62 0.14 44 / 0.5)' }}>
            <td className="py-2.5 font-bold" style={{ color: INK }} colSpan={2}>
              Line total · PC-3
            </td>
            <td className="py-2.5 text-right font-mono font-bold" style={{ color: COPPER }}>
              1,22,120
            </td>
          </m.tr>
        </m.tbody>
      </table>

      {/* beat 4: BBS */}
      <BBSDiagram reduce={reduce} />

      {/* beat 5 (full only): nesting + waste */}
      {showWaste ? (
        <m.div className="mt-3 grid grid-cols-[1.3fr_1fr] gap-3" variants={rise}>
          <div className="rounded-xl border p-3.5" style={{ borderColor: WARM_LINE }}>
            <div
              className="mb-2 font-mono text-[9.5px] tracking-[0.06em]"
              style={{ color: INK_SOFT }}
            >
              CUTTING-STOCK NESTING · 12 m bars
            </div>
            <div className="flex flex-col gap-1.5">
              <NestRow widths={[24, 24, 40]} />
              <NestRow widths={[33, 33, 30]} />
            </div>
            <div className="mt-1.5 text-[10.5px]" style={{ color: INK_SOFT }}>
              offcut <span style={{ color: 'oklch(0.55 0.18 25)' }}>▮</span> minimised
            </div>
          </div>
          <div
            className="flex flex-col justify-center rounded-xl border p-3.5"
            style={{
              borderColor: 'oklch(0.62 0.14 155 / 0.3)',
              background: 'oklch(0.62 0.14 155 / 0.06)',
            }}
          >
            <div className="mb-1 font-mono text-[9.5px] tracking-[0.06em]" style={{ color: GREEN }}>
              STEEL WASTE
            </div>
            <div className="font-mono text-[26px] font-bold leading-none" style={{ color: GREEN }}>
              3.1%
            </div>
            <div className="mt-1 text-[10.5px]" style={{ color: INK_SOFT }}>
              vs ~8% naive
            </div>
          </div>
        </m.div>
      ) : null}

      {/* beats 5–6: confidence + Approve → Posted */}
      <m.div
        variants={pop}
        onAnimationComplete={onApproveBeatDone}
        className="mt-4 flex items-center justify-between gap-3.5 pt-3.5"
        style={{ borderTop: `1px solid ${WARM_LINE}` }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: 'oklch(0.62 0.14 155)' }} />
          <span className="text-[12px]" style={{ color: INK_SOFT }}>
            <strong style={{ color: INK }}>93.4%</strong> · the engine&apos;s number, never the
            model&apos;s
          </span>
        </div>
        <ApproveChip reduce={reduce} posted={posted} />
      </m.div>
    </m.div>
  )
}

// The 4-Eyes write-back chip: pulses on Approve, then flips ONCE (state change,
// not a loop) to the green "Posted to your books" confirmation.
function ApproveChip({ reduce, posted }: { reduce: boolean; posted: boolean }) {
  if (posted) {
    return (
      <m.span
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-4 py-2.5 font-heading text-[12.5px] font-semibold text-white"
        style={{ background: 'oklch(0.46 0.13 155)' }}
      >
        <Icon name="check" size={13} strokeWidth={2.4} />
        Posted to your books · JE drafted
      </m.span>
    )
  }
  return (
    <m.span
      animate={reduce ? undefined : { scale: [1, 1.045, 1] }}
      transition={reduce ? undefined : { duration: 1.1, ease: 'easeInOut', repeat: Infinity }}
      className="flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-4 py-2.5 font-heading text-[12.5px] font-semibold text-white"
      style={{ background: 'oklch(0.50 0.12 275)' }}
    >
      <Icon name="check" size={13} strokeWidth={2.2} />
      Approve &amp; import to Costing
    </m.span>
  )
}

function NestRow({ widths }: { widths: number[] }) {
  const colors = ['oklch(0.52 0.14 44)', 'oklch(0.42 0.12 275)', 'oklch(0.55 0.10 200)']
  return (
    <div
      className="flex h-[9px] overflow-hidden rounded-[3px]"
      style={{ background: 'oklch(0.94 0.006 70)' }}
    >
      {widths.map((w, i) => (
        <span key={i} style={{ width: `${w}%`, background: colors[i], marginLeft: i ? 1 : 0 }} />
      ))}
      <span style={{ flex: 1, background: 'oklch(0.85 0.04 25)', marginLeft: 1 }} />
    </div>
  )
}

export interface LiveEstimatorFlowProps {
  /** 'full' (default) shows the nesting/waste detail; 'hero' is a compact column cut. */
  variant?: 'hero' | 'full'
  className?: string
}

export function LiveEstimatorFlow({ variant = 'full', className = '' }: LiveEstimatorFlowProps) {
  const reduceRaw = useReducedMotion()
  const reduce = reduceRaw ?? false
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  // Drives the scan-line sweep + the staggered beats.
  const started = reduce || inView
  // The Approve → Posted flip: a one-time state change. Under reduced motion it is
  // shown immediately; otherwise it flips after the confidence/approve beat lands.
  const [posted, setPosted] = useState(false)
  const showPosted = reduce || posted

  const handleApproveBeatDone = () => {
    if (!reduce) {
      // Let the Approve chip pulse read for a moment, then commit the write-back.
      window.setTimeout(() => setPosted(true), 900)
    }
  }

  const showWaste = variant === 'full'
  const aria =
    `Estimator flow: a pile-cap drawing PC-3 is scanned for dimensions; the engine returns a priced ` +
    `Bill of Quantities with a line total of ৳1,22,120, a Bar Bending Schedule` +
    (showWaste
      ? `, and a cutting-stock nesting pass at 3.1% steel waste versus about 8% naive`
      : '') +
    `, at 93.4% confidence. One 4-Eyes approval posts it to your costing books — a journal entry is drafted.`

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        role="img"
        aria-label={aria}
        variants={makeContainer(reduce)}
        initial="hidden"
        animate={started ? 'show' : 'hidden'}
        className={`grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr] ${className}`}
      >
        <DrawingPanel reduce={reduce} started={started} />
        <OutputPanel
          reduce={reduce}
          variant={variant}
          posted={showPosted}
          onApproveBeatDone={handleApproveBeatDone}
        />
      </m.div>
    </LazyMotion>
  )
}
