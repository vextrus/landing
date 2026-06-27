'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'

// "The System", as a line-art axonometric structural frame — the engine of record
// drawn as a multi-storey skeleton that strokes itself in once on view (no WebGL,
// no fills; single object weight in ink, one copper "cut" edge = the active level).
// The rising copper diagonal is the Ascent. Reduced-motion → fully drawn, static.
//
// Every line annotates something true: the floors = the modules stacked into one
// system of record; the copper edge = the one shipped flagship working on it.

const INK = 'var(--color-ink, oklch(0.235 0.012 70))'
const COPPER = 'var(--line-cut, oklch(0.62 0.13 50))'
const WITNESS = 'var(--color-copper-witness, oklch(0.62 0.13 50 / 0.25))'

// Iso helpers — a tidy 2-bay frame, three storeys.
const OX = 210
const OY = 250
const W = 92 // half-width in iso x
const D = 52 // depth in iso z
const FLOOR = 56 // storey height

// base diamond (floor plate) corners at a given height h (0 = ground)
function plate(h: number) {
  const y = OY - h
  return {
    l: [OX - W, y] as const, // left
    f: [OX, y + D] as const, // front
    r: [OX + W, y] as const, // right
    b: [OX, y - D] as const, // back
  }
}

function platePath(h: number) {
  const p = plate(h)
  return `M${p.l[0]} ${p.l[1]} L${p.f[0]} ${p.f[1]} L${p.r[0]} ${p.r[1]} L${p.b[0]} ${p.b[1]} Z`
}

export function SystemCore({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion() ?? false
  const levels = [0, FLOOR, FLOOR * 2, FLOOR * 3]
  const draw = (i: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: '-10%' },
          transition: { duration: 0.9, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] as const },
        }

  // corner columns connect plate[0] → plate[top]
  const ground = plate(0)
  const top = plate(FLOOR * 3)
  const cols: Array<[readonly [number, number], readonly [number, number]]> = [
    [ground.l, top.l],
    [ground.f, top.f],
    [ground.r, top.r],
    [ground.b, top.b],
  ]

  return (
    <LazyMotion features={domAnimation}>
      <svg
        viewBox="0 0 420 360"
        width="100%"
        className={className}
        role="img"
        aria-label="An axonometric line drawing of a multi-storey structural frame — the modules stacked into one system of record."
      >
        {/* datum dash-dot baseline */}
        <line
          x1="40"
          y1={OY + 12}
          x2="380"
          y2={OY + 12}
          stroke={WITNESS}
          strokeWidth="0.75"
          strokeDasharray="6 3 1 3"
        />

        {/* floor plates */}
        {levels.map((h, i) => (
          <m.path
            key={`plate-${h}`}
            d={platePath(h)}
            fill="none"
            stroke={i === levels.length - 1 ? COPPER : INK}
            strokeWidth={i === levels.length - 1 ? 1.6 : 1}
            strokeLinejoin="round"
            opacity={i === levels.length - 1 ? 1 : 0.85}
            {...draw(i)}
          />
        ))}

        {/* corner columns */}
        {cols.map(([a, b], i) => (
          <m.line
            key={`col-${i}`}
            x1={a[0]}
            y1={a[1]}
            x2={b[0]}
            y2={b[1]}
            stroke={INK}
            strokeWidth="1"
            opacity="0.7"
            {...draw(i + 1)}
          />
        ))}

        {/* the Ascent — a copper diagonal rising front-ground → back-top */}
        <m.line
          x1={ground.f[0]}
          y1={ground.f[1]}
          x2={top.b[0]}
          y2={top.b[1]}
          stroke={COPPER}
          strokeWidth="1.6"
          {...draw(5)}
        />

        {/* dimension line on the right elevation — annotates the full height */}
        <g stroke={WITNESS} strokeWidth="0.75">
          <line x1={top.r[0] + 22} y1={top.r[1]} x2={ground.r[0] + 22} y2={ground.r[1]} />
          <line x1={top.r[0] + 17} y1={top.r[1]} x2={top.r[0] + 27} y2={top.r[1]} />
          <line x1={ground.r[0] + 17} y1={ground.r[1]} x2={ground.r[0] + 27} y2={ground.r[1]} />
        </g>
        <text
          x={top.r[0] + 32}
          y={(top.r[1] + ground.r[1]) / 2}
          fill="var(--color-ink-dim, oklch(0.52 0.012 70))"
          style={{ font: "9.5px var(--font-mono, monospace)", letterSpacing: '0.08em' }}
          dominantBaseline="middle"
        >
          ONE SYSTEM
        </text>

        {/* datum bubble at the copper level */}
        <circle cx={top.l[0] - 16} cy={top.l[1]} r="8" fill="none" stroke={COPPER} strokeWidth="1" />
        <text
          x={top.l[0] - 16}
          y={top.l[1] + 0.5}
          fill={COPPER}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ font: "9px var(--font-mono, monospace)" }}
        >
          A
        </text>
      </svg>
    </LazyMotion>
  )
}

export default SystemCore
