// Real Bangladesh map — geoBoundaries ADM1 (8 divisions) projected by
// `lib/geo.ts` (`buildPaths`). One <path> per division (keyboard-focusable, with
// an aria-label + a CSS :hover/:focus-visible highlight), the national ADM0
// outline drawn on top with a pure-CSS draw-on (stroke-dashoffset, pathLength=1),
// and pulsing city nodes at the projected division centroids.
//
// Server-rendered (no 'use client'): `buildPaths` is pure JS and runs at SSR, and
// every animation is CSS-only. The draw-on keyframe + the division highlight live
// in a component-scoped <style> (namespaced `bdmap-*`), gated behind
// `prefers-reduced-motion: no-preference` — reduced motion paints the outline
// fully drawn (offset 0) and skips the city pulses (the global reduced-motion
// guard already neutralises vx-pulse / vx-breathe). Same public API as v1:
// <BangladeshMap variant?: 'warm' | 'dark' className? />.

import { buildPaths } from '../../lib/geo'

type Variant = 'warm' | 'dark'

const W = 300
const H = 360
const { outline, divisions, cities } = buildPaths(W, H)

// The hub gets a halo + emphasised label; everything else is a quiet city node.
const HUB = 'Dhaka'

export function BangladeshMap({
  className = '',
  variant = 'warm',
}: {
  className?: string
  variant?: Variant
}) {
  const dark = variant === 'dark'
  const stroke = dark ? 'oklch(0.62 0.13 275)' : 'oklch(0.50 0.12 275)'
  const fill = dark ? 'oklch(0.55 0.14 275 / 0.10)' : 'oklch(0.50 0.12 275 / 0.08)'
  const fillHover = dark ? 'oklch(0.60 0.15 275 / 0.26)' : 'oklch(0.52 0.13 275 / 0.20)'
  const grid = dark ? 'oklch(0.62 0.13 275 / 0.18)' : 'oklch(0.50 0.12 275 / 0.18)'
  const hubColor = 'oklch(0.74 0.14 44)'
  const cityColor = dark ? 'oklch(0.66 0.13 275)' : 'oklch(0.55 0.14 275)'
  const labelHub = dark ? 'oklch(0.80 0.13 44)' : 'oklch(0.42 0.04 44)'
  const labelCity = dark ? 'oklch(0.74 0.10 275)' : 'oklch(0.42 0.04 275)'

  // A stable id keeps the scoped <style> tied to this instance's variant (warm
  // and dark can both be on one page — /bangladesh uses dark, / uses warm).
  const uid = `bdmap-${variant}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="78%"
      className={className}
      style={{ display: 'block' }}
      role="img"
      aria-label="Map of Bangladesh showing its eight administrative divisions, with city nodes at Dhaka and other divisional capitals."
    >
      <style
        // Component-scoped: division highlight on hover/focus + the outline
        // draw-on. Draw-on only under no-preference; default state (and reduced
        // motion) is the fully-drawn outline (stroke-dashoffset: 0).
        dangerouslySetInnerHTML={{
          __html: `
            .${uid}-div {
              cursor: default;
              transition: fill 240ms ease, stroke-width 240ms ease;
              outline: none;
            }
            .${uid}-div:hover {
              fill: ${fillHover};
              stroke-width: 1.4;
            }
            .${uid}-div:focus-visible {
              fill: ${fillHover} !important;
              stroke: var(--color-accent) !important;
              stroke-width: 2.4 !important;
            }
            .${uid}-outline {
              stroke-dashoffset: 0;
            }
            @media (prefers-reduced-motion: no-preference) {
              .${uid}-outline {
                stroke-dasharray: 1;
                stroke-dashoffset: 1;
                animation: ${uid}-draw 2.4s ease-in-out 0.15s forwards;
              }
            }
            @keyframes ${uid}-draw {
              to { stroke-dashoffset: 0; }
            }
          `,
        }}
      />

      {/* Faint reference grid (behind the geometry) — purely decorative. */}
      <g stroke={grid} strokeWidth="0.5" aria-hidden="true">
        <path d="M40 70 H260 M30 130 H266 M28 190 H252 M34 250 H240 M48 310 H224 M150 24 V346 M100 30 V340 M200 36 V338" />
      </g>

      {/* One focusable path per division (real geoBoundaries geometry). */}
      <g>
        {divisions.map((d) => (
          <path
            key={d.name}
            className={`${uid}-div`}
            d={d.d}
            fill={fill}
            stroke={stroke}
            strokeWidth="0.8"
            strokeLinejoin="round"
            tabIndex={0}
            role="img"
            aria-label={d.name}
          >
            <title>{d.name}</title>
          </path>
        ))}
      </g>

      {/* The national ADM0 outline, drawn on top with a thicker stroke + draw-on.
          pathLength=1 normalises the (dynamic) path so dasharray/offset of 1 is
          the whole perimeter regardless of the projected geometry length. */}
      <path
        className={`${uid}-outline`}
        d={outline}
        pathLength={1}
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
      />

      {/* City nodes at projected division centroids; Dhaka is the emphasised hub.
          Pulses reuse the global vx-pulse / vx-breathe keyframes, which the global
          prefers-reduced-motion guard already neutralises. */}
      {cities.map((c) => {
        const hub = c.name === HUB
        const r = hub ? 5 : 3.5
        // Keep labels inside the viewBox: flip the anchor for cities near the
        // right edge so the text reads leftward off the node.
        const rightEdge = c.cx > W * 0.62
        const anchor = rightEdge ? ('end' as const) : ('start' as const)
        const lx = rightEdge ? c.cx - (r + 4) : c.cx + (r + 4)
        const ly = c.cy + 3
        return (
          <g key={c.name}>
            {hub && (
              <circle
                cx={c.cx}
                cy={c.cy}
                r={r + 4}
                fill="none"
                stroke={hubColor}
                strokeWidth="1"
                opacity="0.4"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animation: 'vx-pulse 2.6s ease-in-out infinite',
                }}
              />
            )}
            <circle
              cx={c.cx}
              cy={c.cy}
              r={r}
              fill={hub ? hubColor : cityColor}
              style={hub ? undefined : { animation: 'vx-breathe 3.2s ease-in-out infinite' }}
            />
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              className="font-mono"
              fontSize={hub ? 9 : 8.5}
              fontWeight={hub ? 600 : 400}
              fill={hub ? labelHub : labelCity}
            >
              {c.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
