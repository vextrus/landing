'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    step: 1,
    title: 'Event Triggers',
    visual: (
      <div className="rounded-lg bg-[oklch(0.10_0.008_270)] p-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[oklch(0.75_0.14_75)]" />
          <span className="font-mono text-[11px] text-[var(--text-secondary)]">
            invoice.received
          </span>
        </div>
        <p className="mt-2 font-mono text-[10px] text-[var(--text-tertiary)]">
          vendor: &quot;Eastern Steel Ltd&quot;
          <br />
          amount: ৳4,52,000
        </p>
      </div>
    ),
  },
  {
    step: 1.5,
    title: 'Memory Lookup',
    visual: (
      <div className="rounded-lg border border-dashed border-[oklch(0.55_0.14_275_/_0.3)] bg-[oklch(0.55_0.14_275_/_0.06)] p-3">
        <p className="font-mono text-[9px] text-[oklch(0.55_0.14_275)]">pgvector</p>
        <p className="mt-1.5 font-mono text-[10px] text-[var(--text-primary)]">
          47 similar transactions
        </p>
        <p className="mt-0.5 font-mono text-[9px] text-[var(--text-tertiary)]">
          Last: GL 4110, 93% confidence
        </p>
      </div>
    ),
  },
  {
    step: 2,
    title: 'AI Analyzes',
    visual: (
      <div className="rounded-lg border border-dashed border-[var(--border-medium)] p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[var(--text-tertiary)]">DRAFT</span>
          <span className="font-mono text-[11px] font-medium text-[var(--accent)]">93%</span>
        </div>
        {/* Confidence meter */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[oklch(1_0_0_/_0.06)]">
          <div
            className="confidence-meter h-full rounded-full"
            style={
              {
                '--meter-value': '0.93',
                background: 'linear-gradient(90deg, var(--indigo), var(--accent))',
              } as React.CSSProperties
            }
          />
        </div>
        <div className="mt-2.5 space-y-1">
          <p className="font-mono text-[10px] text-[var(--text-secondary)]">
            GL: <span className="text-[var(--text-primary)]">4110</span> Raw Materials
          </p>
          <p className="font-mono text-[10px] text-[var(--text-secondary)]">
            VAT: <span className="text-[var(--text-primary)]">15%</span> Standard Rate
          </p>
        </div>
      </div>
    ),
  },
  {
    step: 3,
    title: 'Human Reviews',
    visual: (
      <div className="space-y-2.5 p-1">
        <p className="text-center text-[10px] font-medium text-[var(--text-secondary)]">
          Reviewer decides:
        </p>
        <div className="flex gap-2">
          <span className="flex-1 rounded-md bg-[var(--accent)] px-2 py-1.5 text-center text-[10px] font-semibold text-[oklch(0.15_0.03_44)]">
            Confirm
          </span>
          <span className="flex-1 rounded-md border border-[var(--border-medium)] px-2 py-1.5 text-center text-[10px] font-medium text-[var(--text-secondary)]">
            Modify
          </span>
          <span className="flex-1 rounded-md px-2 py-1.5 text-center text-[10px] text-[var(--text-tertiary)]">
            Reject
          </span>
        </div>
        <p className="text-center font-mono text-[9px] text-[var(--text-tertiary)]">
          self-confirmation blocked
        </p>
      </div>
    ),
  },
  {
    step: 4,
    title: 'Execute & Learn',
    visual: (
      <div className="space-y-2 p-1">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--success-muted)]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 5.5L4 7.5L8 3"
                stroke="oklch(0.62 0.14 155)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-xs font-medium text-[var(--text-primary)]">Posted to GL</span>
        </div>
        <div className="rounded-md bg-[oklch(0.10_0.008_270)] px-2.5 py-1.5">
          <p className="font-mono text-[10px] text-[var(--text-secondary)]">
            journal: <span className="text-[var(--success)]">JV-2026-0847</span>
          </p>
        </div>
        <div className="mt-1.5 rounded-md border border-[oklch(0.72_0.15_44_/_0.2)] bg-[oklch(0.72_0.15_44_/_0.06)] px-2.5 py-1.5">
          <p className="font-mono text-[10px] font-medium text-[var(--accent)]">
            Pattern stored &rarr; confidence +2%
          </p>
          <p className="font-mono text-[9px] text-[var(--text-tertiary)]">
            Next similar invoice: faster, better
          </p>
        </div>
      </div>
    ),
  },
]

export function FourEyesFlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="mt-16">
      {/* Flow cards */}
      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s.step} className="relative">
            {/* Arrow connector (desktop only) */}
            {i < steps.length - 1 && (
              <svg
                className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block"
                width="24"
                height="12"
                viewBox="0 0 24 12"
                fill="none"
              >
                <line
                  x1="0"
                  y1="6"
                  x2="18"
                  y2="6"
                  stroke="oklch(0.72 0.15 44)"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  className={visible ? 'flow-arrow' : ''}
                  style={
                    {
                      '--arrow-length': '24',
                      animationDelay: `${400 + i * 200}ms`,
                      opacity: visible ? 1 : 0,
                    } as React.CSSProperties
                  }
                />
                <polygon
                  points="17,3 22,6 17,9"
                  fill="oklch(0.72 0.15 44)"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 300ms',
                    transitionDelay: `${600 + i * 200}ms`,
                  }}
                />
              </svg>
            )}

            {/* Card */}
            <div
              className="h-full rounded-xl border border-[var(--border-subtle)] bg-[var(--canvas-raised)] p-4 transition-opacity duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                Step {s.step}
              </p>
              <h3 className="mt-1.5 font-heading text-base font-semibold text-[var(--text-primary)]">
                {s.title}
              </h3>
              <div className="mt-3">{s.visual}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
