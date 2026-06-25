'use client'

import { useRef } from 'react'
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'motion/react'
import { Icon } from '../ui/icon'

// Degree-of-autonomy, made concrete. One agent proposal forks on confidence:
// high → the engine runs it itself (green); low → it lands in your approvals
// inbox (amber). This REPLACES the abstract autonomy dial with a single, legible
// branch — "high confidence runs itself, the rest comes to you."
//
// One state-change only: a dot travels the amber branch once on view, ending at
// the inbox node. Reduced motion → both branches fully drawn + labelled, static.

// SVG geometry (viewBox 0 0 360 180). The source node sits left-centre; two
// cubic paths fan out to the right — top to the green terminus, bottom to amber.
const SRC = { x: 40, y: 90 }
const TOP = { x: 296, y: 36 }
const BOT = { x: 296, y: 144 }
const TOP_PATH = `M${SRC.x} ${SRC.y} C 150 ${SRC.y}, 150 ${TOP.y}, ${TOP.x} ${TOP.y}`
const BOT_PATH = `M${SRC.x} ${SRC.y} C 150 ${SRC.y}, 150 ${BOT.y}, ${BOT.x} ${BOT.y}`

const GREEN = 'var(--color-success)'
const AMBER = 'var(--color-warning)'

// The travelling dot follows the amber cubic by transform only (composited) —
// 13 points sampled along the Bézier (P0 40,90 · P1 150,90 · P2 150,144 · P3 296,144).
const DOT_X = [40, 65.4, 87, 105.9, 122.8, 138.7, 154.5, 171, 189.2, 209.9, 234, 262.4, 296]
const DOT_Y = [90, 91.1, 94, 98.4, 104, 110.3, 117, 123.7, 130, 135.6, 140, 142.9, 144]
const DOT_OPACITY = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]

export function ConfidenceFork({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  // The dot animates exactly once, when the diagram scrolls into view.
  const play = !reduce && inView

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={ref}
        className={`glass-card relative p-6 ${className}`}
        style={{ borderRadius: 18, boxShadow: '0 40px 80px -30px rgba(0,0,0,0.75)' }}
      >
        <div className="mb-4 flex items-center gap-2.5">
          <span
            className="inline-grid h-7 w-7 place-items-center rounded-lg"
            style={{
              background: 'oklch(from var(--color-accent) l c h / 0.16)',
              color: 'var(--color-accent)',
            }}
            aria-hidden="true"
          >
            <Icon name="branch" size={15} />
          </span>
          <span className="font-heading text-[15px] font-semibold text-ink">
            How much it does on its own
          </span>
        </div>

        <svg
          viewBox="0 0 360 180"
          width="100%"
          style={{ display: 'block', overflow: 'visible' }}
          role="img"
          aria-label="An agent proposes a change. High-confidence proposals run automatically; low-confidence proposals are sent to you to approve."
        >
          <title>
            An agent proposes a change. High-confidence proposals run automatically; the rest are
            sent to you to approve.
          </title>

          {/* ── Branches (stroke-dashoffset draw-on; GPU-composited) ── */}
          <m.path
            d={TOP_PATH}
            fill="none"
            stroke={GREEN}
            strokeWidth={2.5}
            strokeLinecap="round"
            pathLength={1}
            initial={play ? { strokeDasharray: 1, strokeDashoffset: 1 } : false}
            animate={play ? { strokeDashoffset: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <m.path
            d={BOT_PATH}
            fill="none"
            stroke={AMBER}
            strokeWidth={2.5}
            strokeLinecap="round"
            pathLength={1}
            initial={play ? { strokeDasharray: 1, strokeDashoffset: 1 } : false}
            animate={play ? { strokeDashoffset: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />

          {/* The travelling dot — one trip down the amber branch, into the inbox.
              transform/opacity only (composited); no offset-path attribute pitfalls. */}
          {play && (
            <m.g
              initial={{ x: DOT_X[0], y: DOT_Y[0], opacity: 0 }}
              animate={{ x: DOT_X, y: DOT_Y, opacity: DOT_OPACITY }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.55 }}
            >
              <circle r={5} fill={AMBER} />
            </m.g>
          )}

          {/* ── Source node: the agent proposal ── */}
          <circle cx={SRC.x} cy={SRC.y} r={9} fill="oklch(0.30 0.01 270)" />
          <circle cx={SRC.x} cy={SRC.y} r={4.5} fill="var(--color-accent)" />

          {/* ── Top terminus (green / automatic) ── */}
          <circle cx={TOP.x} cy={TOP.y} r={8} fill={GREEN} />
          <path
            d={`M${TOP.x - 3.6} ${TOP.y} l2.4 2.4 4.4-4.6`}
            fill="none"
            stroke="oklch(0.14 0.03 155)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ── Bottom terminus (amber / to your inbox) ── */}
          <circle cx={BOT.x} cy={BOT.y} r={8} fill={AMBER} />
          <path
            d={`M${BOT.x - 4} ${BOT.y - 3} h8 v6 h-8 z M${BOT.x - 4} ${BOT.y - 3} l4 3.5 4-3.5`}
            fill="none"
            stroke="oklch(0.18 0.04 75)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* ── Real text labels (outside the SVG, for legibility + a11y) ── */}
        <div className="-mt-1 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.06em] text-ink-soft">
              An agent proposes a change
            </span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <div
              className="rounded-[12px] p-3.5"
              style={{
                border: `1px solid oklch(from ${GREEN} l c h / 0.35)`,
                background: `oklch(from ${GREEN} l c h / 0.07)`,
              }}
            >
              <div
                className="mb-0.5 flex items-center gap-1.5 font-heading text-[14px] font-semibold"
                style={{ color: GREEN }}
              >
                <Icon name="check" size={14} strokeWidth={2.2} />
                Done automatically
              </div>
              <p className="m-0 text-[12px] leading-snug text-ink-soft">
                High confidence — the engine runs it.
              </p>
            </div>
            <div
              className="rounded-[12px] p-3.5"
              style={{
                border: `1px solid oklch(from ${AMBER} l c h / 0.35)`,
                background: `oklch(from ${AMBER} l c h / 0.07)`,
              }}
            >
              <div
                className="mb-0.5 flex items-center gap-1.5 font-heading text-[14px] font-semibold"
                style={{ color: AMBER }}
              >
                <Icon name="user" size={14} />
                Sent to you to approve
              </div>
              <p className="m-0 text-[12px] leading-snug text-ink-soft">
                The rest lands in your approvals inbox.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[12.5px] leading-snug text-ink-soft">
          High confidence runs itself. The rest comes to you.
        </p>
      </div>
    </LazyMotion>
  )
}
