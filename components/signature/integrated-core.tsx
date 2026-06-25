'use client'

import { useRef } from 'react'
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'motion/react'
import { pillars, modulesByPillar, type Pillar } from '../../lib/modules'

// ════════════════════════════════════════════════════════════════════════
// The Integrated Core — the hero signature for "a native AI-integrated ERP".
//
// One living system, not a scatter of agents: a COPPER hexagonal AI core
// (the brand's negative-V ascent spark) at the centre, the seven pillars on an
// inner ring, and all twenty modules on an outer ring. A connector runs core →
// pillar → module, and a small data-flow pulse travels INWARD along it — AI is
// woven THROUGH every module, reading from and writing back to the core.
//
// Motion = state change only ("The Calm System"):
//   • assemble-on-view (once): connectors draw out, nodes fade+settle in, the
//     core hex draws + the spark lands.
//   • then a CALM ambient loop: pulses drift core↔module (it is a live system),
//     and the core halo breathes — gentle, low-opacity, transform/opacity only.
//   • prefers-reduced-motion → the fully-assembled static graphic, no motion at
//     all (every animated node is rendered in its final state; no pulses).
//
// Pure SVG; LazyMotion + m for the one assemble transition + the ambient drift.
// Geometry is computed once at module load (deterministic, no layout reads).
// ════════════════════════════════════════════════════════════════════════

const W = 560
const H = 560
const CX = W / 2
const CY = H / 2

const R_PILLAR = 118 // inner ring — the 7 pillars
const R_MODULE = 218 // outer ring — the 20 modules

const HEX_R = 46 // core hexagon circumradius

// ── Palette (brand axis: copper = AI cue, indigo = structure) ──
const COPPER = 'oklch(0.74 0.14 44)'
const COPPER_HI = 'oklch(0.80 0.15 44)'
const INDIGO = 'oklch(0.60 0.12 275)'
const PILLAR_FILL = 'oklch(0.16 0.012 270)'
const LINE_SOFT = 'oklch(1 0 0 / 0.07)'

// Per-pillar accent hue (from the .theme-landing Atmosphere palette family).
const PILLAR_ACCENT: Record<Pillar, string> = {
  'Financial Command': 'oklch(0.68 0.10 49)',
  'Project Delivery': 'oklch(0.66 0.10 200)',
  'Procurement, Materials & Assets': 'oklch(0.69 0.10 30)',
  'Property Sales & Customer Lifecycle': 'oklch(0.66 0.10 260)',
  'People & Safety': 'oklch(0.67 0.10 190)',
  'Trust Platform': 'oklch(0.65 0.10 285)',
  'Intelligence Spine': COPPER,
}

// Short one-word ring labels for the pillars (kept iconic, not the full name).
const PILLAR_LABEL: Record<Pillar, string> = {
  'Financial Command': 'Finance',
  'Project Delivery': 'Projects',
  'Procurement, Materials & Assets': 'Supply',
  'Property Sales & Customer Lifecycle': 'Sales',
  'People & Safety': 'People',
  'Trust Platform': 'Trust',
  'Intelligence Spine': 'AI Spine',
}

function polar(angle: number, radius: number): [number, number] {
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)]
}

interface PillarNode {
  pillar: Pillar
  label: string
  accent: string
  angle: number
  x: number
  y: number
}
interface ModuleNode {
  id: string
  pillar: Pillar
  accent: string
  parentAngle: number
  angle: number
  x: number
  y: number
}

// Build the two rings once. Pillars are spread evenly; each pillar's modules are
// clustered as a small arc around that pillar's angle so the ring reads grouped.
function buildGeometry() {
  const pillarNodes: PillarNode[] = []
  const moduleNodes: ModuleNode[] = []

  const n = pillars.length
  pillars.forEach((p, i) => {
    // Start at top (−90°), go clockwise.
    const angle = -Math.PI / 2 + (i * (2 * Math.PI)) / n
    const [px, py] = polar(angle, R_PILLAR)
    pillarNodes.push({
      pillar: p,
      label: PILLAR_LABEL[p],
      accent: PILLAR_ACCENT[p],
      angle,
      x: px,
      y: py,
    })

    const mods = modulesByPillar(p)
    const slice = (2 * Math.PI) / n
    // Cluster the pillar's modules across ~64% of its slice, centred on the angle.
    const spread = slice * 0.64
    const count = mods.length
    mods.forEach((mod, j) => {
      const t = count === 1 ? 0 : j / (count - 1) - 0.5 // −0.5..0.5
      const ma = angle + t * spread
      const [mx, my] = polar(ma, R_MODULE)
      moduleNodes.push({
        id: mod.id,
        pillar: p,
        accent: PILLAR_ACCENT[p],
        parentAngle: angle,
        angle: ma,
        x: mx,
        y: my,
      })
    })
  })

  return { pillarNodes, moduleNodes }
}

const { pillarNodes, moduleNodes } = buildGeometry()

// Flat-topped hexagon points for the core.
function hexPoints(): string {
  const pts: string[] = []
  for (let k = 0; k < 6; k++) {
    const a = Math.PI / 6 + (k * Math.PI) / 3
    pts.push(`${(CX + HEX_R * Math.cos(a)).toFixed(2)},${(CY + HEX_R * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}

// The negative-V ascent spark inside the core (echoes the brand mark).
function sparkPath(): string {
  const s = 15
  return [
    `M ${CX - s} ${CY + s * 0.62}`,
    `L ${CX} ${CY - s * 0.78}`,
    `L ${CX + s} ${CY + s * 0.62}`,
    `L ${CX + s * 0.46} ${CY + s * 0.62}`,
    `L ${CX} ${CY - s * 0.06}`,
    `L ${CX - s * 0.46} ${CY + s * 0.62}`,
    'Z',
  ].join(' ')
}

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function IntegratedCore({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  // A second, NON-once observer tracks live on-screen state so the ambient loop
  // can pause when the graphic is scrolled away (no forever-compositing offscreen).
  const inViewNow = useInView(ref, { amount: 0.2 })
  // Assemble exactly once, when the graphic scrolls into view.
  const play = !reduce && inView
  // The calm ambient loop (pulses + halo breathe) runs only while motion is
  // allowed AND the graphic is actually on screen; offscreen it stays fully
  // assembled but stops compositing.
  const ambient = play && inViewNow

  // When motion is off we render every node/connector in its final state and run
  // no loops; when on, `play` gates the assemble + the ambient drift.
  const initialNode = play ? { opacity: 0, scale: 0 } : false
  const initialEdge = play ? { strokeDashoffset: 1 } : false

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref} className={className} style={{ display: 'block', lineHeight: 0 }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', overflow: 'visible' }}
          role="img"
          aria-label="Vextrus: a native AI-integrated ERP — a copper AI core connected through seven pillars to all twenty modules, with data flowing between the core and every module."
        >
          <title>
            Vextrus — a native AI-integrated ERP. A central AI core is woven through twenty modules
            across the business; data flows continuously between the core and each module.
          </title>

          <defs>
            {/* Soft copper glow for the core. */}
            <radialGradient id="ic-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={COPPER} stopOpacity="0.42" />
              <stop offset="55%" stopColor={COPPER} stopOpacity="0.14" />
              <stop offset="100%" stopColor={COPPER} stopOpacity="0" />
            </radialGradient>
            {/* Faint indigo wash behind the rings. */}
            <radialGradient id="ic-ring-wash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={INDIGO} stopOpacity="0" />
              <stop offset="62%" stopColor={INDIGO} stopOpacity="0.05" />
              <stop offset="100%" stopColor={INDIGO} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Structural blueprint grid (construction cue), clipped to a disc ── */}
          <clipPath id="ic-grid-clip">
            <circle cx={CX} cy={CY} r={R_MODULE + 34} />
          </clipPath>
          <g clipPath="url(#ic-grid-clip)" aria-hidden="true">
            <rect x="0" y="0" width={W} height={H} fill="url(#ic-ring-wash)" />
            <g stroke="oklch(1 0 0 / 0.045)" strokeWidth="1">
              {Array.from({ length: 13 }, (_, i) => {
                const v = 32 + i * 40
                return <line key={`gv${i}`} x1={v} y1={0} x2={v} y2={H} />
              })}
              {Array.from({ length: 13 }, (_, i) => {
                const v = 32 + i * 40
                return <line key={`gh${i}`} x1={0} y1={v} x2={W} y2={v} />
              })}
            </g>
          </g>

          {/* ── Faint orbit rings (the two structural orbits) ── */}
          <circle
            cx={CX}
            cy={CY}
            r={R_PILLAR}
            fill="none"
            stroke="oklch(0.60 0.10 275 / 0.16)"
            strokeWidth="1"
            strokeDasharray="2 6"
            aria-hidden="true"
          />
          <circle
            cx={CX}
            cy={CY}
            r={R_MODULE}
            fill="none"
            stroke="oklch(0.60 0.10 275 / 0.12)"
            strokeWidth="1"
            strokeDasharray="2 7"
            aria-hidden="true"
          />

          {/* ── Connectors: pillar → its modules (outer spokes) ── */}
          <g aria-hidden="true">
            {moduleNodes.map((mn, i) => {
              const parent = pillarNodes.find((p) => p.pillar === mn.pillar)
              if (!parent) return null
              return (
                <m.line
                  key={`me${mn.id}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={mn.x}
                  y2={mn.y}
                  stroke={LINE_SOFT}
                  strokeWidth="1"
                  pathLength={1}
                  strokeDasharray={1}
                  initial={initialEdge}
                  animate={play ? { strokeDashoffset: 0 } : undefined}
                  transition={{
                    duration: 0.55,
                    ease: EASE_EXPO,
                    delay: 0.5 + (i % 5) * 0.04,
                  }}
                  style={play ? undefined : { strokeDashoffset: 0 }}
                />
              )
            })}
          </g>

          {/* ── Connectors: core → pillar (inner spokes, brighter) ── */}
          <g aria-hidden="true">
            {pillarNodes.map((pn, i) => (
              <m.line
                key={`pe${pn.pillar}`}
                x1={CX}
                y1={CY}
                x2={pn.x}
                y2={pn.y}
                stroke="oklch(0.72 0.14 44 / 0.30)"
                strokeWidth="1.4"
                pathLength={1}
                strokeDasharray={1}
                initial={initialEdge}
                animate={play ? { strokeDashoffset: 0 } : undefined}
                transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.15 + i * 0.05 }}
                style={play ? undefined : { strokeDashoffset: 0 }}
              />
            ))}
          </g>

          {/* ── Data-flow pulses: a dot drifts core ↔ module along each spoke ──
              Composited transform on <m.g>; opacity fades at both ends so the trip
              reads as continuous flow. Ambient loop ONLY when motion is allowed AND
              the graphic is on screen (so it stops compositing once scrolled away). */}
          {ambient && (
            <g aria-hidden="true">
              {moduleNodes.map((mn, i) => {
                // Inward feel: dot starts at the module, glides through the pillar
                // to the core, then resets. Three-point path (module→pillar→core).
                const parent = pillarNodes.find((p) => p.pillar === mn.pillar)
                if (!parent) return null
                const xs = [mn.x, parent.x, CX]
                const ys = [mn.y, parent.y, CY]
                const dur = 3.4 + (i % 6) * 0.28
                return (
                  <m.g
                    key={`pulse${mn.id}`}
                    initial={{ x: mn.x, y: mn.y, opacity: 0 }}
                    animate={{
                      x: xs,
                      y: ys,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: dur,
                      times: [0, 0.5, 1],
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 0.6,
                      delay: 1.1 + (i % 8) * 0.22,
                    }}
                  >
                    <circle r="2.4" fill={COPPER_HI} />
                  </m.g>
                )
              })}
            </g>
          )}

          {/* ── Outer ring: 20 module dots ── */}
          <g>
            {moduleNodes.map((mn, i) => (
              <m.circle
                key={`mn${mn.id}`}
                cx={mn.x}
                cy={mn.y}
                r="4.6"
                fill={PILLAR_FILL}
                stroke={mn.accent}
                strokeWidth="1.5"
                initial={initialNode}
                animate={play ? { opacity: 1, scale: 1 } : undefined}
                transition={{
                  duration: 0.45,
                  ease: EASE_EXPO,
                  delay: 0.65 + (i % moduleNodes.length) * 0.022,
                }}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  opacity: play ? undefined : 1,
                }}
              />
            ))}
          </g>

          {/* ── Inner ring: 7 pillar nodes + labels ── */}
          <g>
            {pillarNodes.map((pn, i) => {
              const isAI = pn.pillar === 'Intelligence Spine'
              // Push the label outward along the radius so it sits just outside
              // the dot, and align the anchor to which half it's on.
              const lr = R_PILLAR + 16
              const [lx, ly] = polar(pn.angle, lr)
              const right = Math.cos(pn.angle) > 0.15
              const left = Math.cos(pn.angle) < -0.15
              const anchor = right ? 'start' : left ? 'end' : 'middle'
              return (
                <m.g
                  key={`pn${pn.pillar}`}
                  initial={initialNode}
                  animate={play ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.32 + i * 0.05 }}
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    opacity: play ? undefined : 1,
                  }}
                >
                  <circle
                    cx={pn.x}
                    cy={pn.y}
                    r={isAI ? 8 : 7}
                    fill={isAI ? pn.accent : 'oklch(0.18 0.012 270)'}
                    stroke={pn.accent}
                    strokeWidth={isAI ? 2 : 1.6}
                  />
                  <text
                    x={lx}
                    y={ly + 3}
                    textAnchor={anchor}
                    className="font-mono"
                    fontSize="8.5"
                    fontWeight={isAI ? 600 : 500}
                    fill={isAI ? COPPER_HI : 'oklch(0.74 0.07 275)'}
                  >
                    {pn.label}
                  </text>
                </m.g>
              )
            })}
          </g>

          {/* ── The central copper AI core (hex + ascent spark) ── */}
          <g>
            {/* Breathing glow — gentle ambient, neutralised under reduced motion.
                Paused (not removed) when scrolled offscreen so it stops compositing
                while staying at its current frame; resumes on re-entry. */}
            <circle
              cx={CX}
              cy={CY}
              r={HEX_R + 30}
              fill="url(#ic-core-glow)"
              style={
                play
                  ? {
                      transformBox: 'fill-box',
                      transformOrigin: 'center',
                      animation: 'vx-breathe 4.2s ease-in-out infinite',
                      animationPlayState: ambient ? 'running' : 'paused',
                    }
                  : undefined
              }
            />
            <m.polygon
              points={hexPoints()}
              fill="oklch(0.74 0.14 44 / 0.14)"
              stroke={COPPER}
              strokeWidth="2"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              initial={play ? { strokeDashoffset: 1, opacity: 0 } : false}
              animate={play ? { strokeDashoffset: 0, opacity: 1 } : undefined}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.05 }}
              style={play ? undefined : { strokeDashoffset: 0, opacity: 1 }}
            />
            <m.path
              d={sparkPath()}
              fill={COPPER_HI}
              initial={play ? { opacity: 0, scale: 0.4 } : false}
              animate={play ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.55 }}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                opacity: play ? undefined : 1,
              }}
            />
            <text
              x={CX}
              y={CY + HEX_R + 18}
              textAnchor="middle"
              className="font-mono"
              fontSize="9.5"
              fontWeight={600}
              letterSpacing="0.14em"
              fill={COPPER_HI}
            >
              AI CORE
            </text>
          </g>
        </svg>
      </div>
    </LazyMotion>
  )
}
