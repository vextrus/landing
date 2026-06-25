'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'

import type { ConfidenceFactor } from '@/lib/agents'
export type { ConfidenceFactor }

interface Props {
  score: number // 0–100, shown to ONE decimal, never rounded
  factors?: ConfidenceFactor[]
  sentence?: string
  className?: string
}

// 270° radial gauge: success ≥90 / warning ≥70 / destructive <70. The number is
// the engine's certainty, shown to one decimal. Factor weights read in words.
function band(score: number) {
  if (score >= 90) return { color: 'var(--color-success)', verdict: 'Strong' }
  if (score >= 70) return { color: 'var(--color-warning)', verdict: 'Review' }
  return { color: 'var(--color-overdue)', verdict: 'Low' }
}

function weightWord(w: number) {
  if (w >= 0.7) return 'major weight'
  if (w >= 0.45) return 'moderate weight'
  return 'minor weight'
}
function scoreWord(s: number) {
  if (s >= 0.85) return 'strong'
  if (s >= 0.7) return 'good'
  return 'fair'
}

const TRACK = 240 // 270° of an r=51 circle (circumference ≈ 320)

export function ConfidenceMeter({ score, factors = [], sentence, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const reduce = useReducedMotion()
  const { color, verdict } = band(score)
  const offset = TRACK * (1 - Math.min(100, Math.max(0, score)) / 100)
  const animate = reduce || inView

  return (
    <div
      ref={ref}
      className={`rounded-[16px] border border-line bg-raised p-6 ${className}`}
      role="img"
      aria-label={`Confidence ${score.toFixed(1)} percent — ${verdict.toLowerCase()}`}
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <svg width="124" height="124" viewBox="0 0 120 120" className="shrink-0" aria-hidden="true">
          <g transform="rotate(135 60 60)">
            <circle
              cx="60"
              cy="60"
              r="51"
              fill="none"
              stroke="oklch(0.30 0.01 270)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${TRACK} 320`}
            />
            <m.circle
              cx="60"
              cy="60"
              r="51"
              fill="none"
              stroke={color}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${TRACK} 320`}
              initial={{ strokeDashoffset: TRACK }}
              animate={{ strokeDashoffset: animate ? offset : TRACK }}
              transition={{ duration: reduce ? 0 : 1.2, ease: [0.25, 1, 0.5, 1] }}
            />
          </g>
          <text
            x="60"
            y="57"
            textAnchor="middle"
            className="font-mono"
            fontWeight="700"
            fontSize="26"
            fill="var(--color-ink)"
          >
            {score.toFixed(1)}
          </text>
          <text x="60" y="75" textAnchor="middle" fontSize="9.5" fill="var(--color-ink-soft)">
            % confident
          </text>
        </svg>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2.5">
            <span
              className="rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
              style={{ background: `oklch(from ${color} l c h / 0.16)`, color }}
            >
              {verdict} · {score >= 90 ? 'safe to apply' : score >= 70 ? 'second look' : 'check it'}
            </span>
          </div>
          {sentence && (
            <p className="m-0 mb-3 text-[13px] leading-snug text-ink-soft">{sentence}</p>
          )}

          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {factors.map((f, i) => {
              const fc = band(f.score * 100).color
              return (
                <li key={f.name}>
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="text-[12px] text-ink">{f.name}</span>
                    <span className="shrink-0 font-mono text-[10.5px] text-ink-soft">
                      {scoreWord(f.score)} · {weightWord(f.weight)}
                    </span>
                  </div>
                  <div className="h-[5px] overflow-hidden rounded-full bg-[oklch(0.28_0.01_270)]">
                    <m.div
                      className="h-full rounded-full"
                      style={{ background: fc }}
                      initial={{ width: 0 }}
                      animate={{ width: animate ? `${f.score * 100}%` : 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.9,
                        delay: reduce ? 0 : 0.3 + i * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
