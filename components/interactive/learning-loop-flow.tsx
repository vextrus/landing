'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    step: 1,
    title: 'Event',
    visual: (
      <div className="rounded-lg bg-[oklch(0.10_0.008_270)] p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.14_75)]" />
          <span className="font-mono text-[10px] text-[var(--text-secondary)]">
            invoice.received
          </span>
        </div>
        <p className="mt-1.5 font-mono text-[9px] text-[var(--text-tertiary)]">
          vendor: &quot;Eastern Steel Ltd&quot;
        </p>
      </div>
    ),
  },
  {
    step: 2,
    title: 'Memory Lookup',
    visual: (
      <div className="rounded-lg border border-dashed border-[oklch(0.55_0.14_275_/_0.3)] bg-[oklch(0.55_0.14_275_/_0.06)] p-2.5">
        <p className="font-mono text-[9px] text-[oklch(0.55_0.14_275)]">pgvector</p>
        <p className="mt-1 font-mono text-[10px] text-[var(--text-primary)]">
          47 similar transactions
        </p>
        <p className="mt-0.5 font-mono text-[9px] text-[var(--text-tertiary)]">
          Last pattern: GL 4110, 93%
        </p>
      </div>
    ),
  },
  {
    step: 3,
    title: 'AI Suggests',
    visual: (
      <div className="space-y-1.5 rounded-lg border border-dashed border-[var(--border-medium)] p-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-[var(--text-tertiary)]">DRAFT</span>
          <span className="font-mono text-[10px] font-medium text-[var(--accent)]">93%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[oklch(1_0_0_/_0.06)]">
          <div
            className="h-full w-[93%] rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--indigo), var(--accent))',
            }}
          />
        </div>
        <p className="font-mono text-[9px] text-[var(--text-secondary)]">
          GL: 4110 &middot; VAT: 15%
        </p>
      </div>
    ),
  },
  {
    step: 4,
    title: 'Human Decides',
    visual: (
      <div className="space-y-2 p-1">
        <div className="flex gap-1.5">
          <span className="flex-1 rounded-md bg-[var(--accent)] px-2 py-1 text-center text-[9px] font-semibold text-[oklch(0.15_0.03_44)]">
            Confirm
          </span>
          <span className="flex-1 rounded-md border border-[var(--border-medium)] px-2 py-1 text-center text-[9px] text-[var(--text-secondary)]">
            Modify
          </span>
          <span className="flex-1 rounded-md px-2 py-1 text-center text-[9px] text-[var(--text-tertiary)]">
            Reject
          </span>
        </div>
      </div>
    ),
  },
  {
    step: 5,
    title: 'Feedback Stored',
    visual: (
      <div className="space-y-1.5 p-1">
        <div className="flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--success-muted)]">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 5.5L4 7.5L8 3"
                stroke="oklch(0.62 0.14 155)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[10px] font-medium text-[var(--text-primary)]">
            Pattern learned
          </span>
        </div>
        <div className="rounded-md bg-[oklch(0.10_0.008_270)] px-2 py-1.5">
          <p className="font-mono text-[9px] text-[var(--accent)]">confidence +2% &rarr; 95%</p>
          <p className="font-mono text-[9px] text-[var(--text-tertiary)]">
            next suggestion: faster, better
          </p>
        </div>
      </div>
    ),
  },
]

export function LearningLoopFlow() {
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
    <div ref={containerRef} className="mt-12">
      <div className="grid gap-3 md:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s.step} className="relative">
            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <svg
                className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 md:block"
                width="20"
                height="10"
                viewBox="0 0 20 10"
                fill="none"
              >
                <line
                  x1="0"
                  y1="5"
                  x2="14"
                  y2="5"
                  stroke="oklch(0.72 0.15 44)"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  className={visible ? 'loop-arrow' : ''}
                  style={
                    {
                      '--arrow-length': '20',
                      animationDelay: `${400 + i * 150}ms`,
                      opacity: visible ? 1 : 0,
                    } as React.CSSProperties
                  }
                />
                <polygon
                  points="13,2.5 18,5 13,7.5"
                  fill="oklch(0.72 0.15 44)"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 300ms',
                    transitionDelay: `${600 + i * 150}ms`,
                  }}
                />
              </svg>
            )}

            <div
              className="h-full rounded-xl border border-[var(--border-subtle)] bg-[var(--canvas-raised)] p-3 transition-opacity duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--accent)]">
                Step {s.step}
              </p>
              <h3 className="mt-1 font-heading text-[13px] font-semibold text-[var(--text-primary)]">
                {s.title}
              </h3>
              <div className="mt-2">{s.visual}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Loop arrow indicator */}
      <div className="mt-4 flex justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M13 8A5 5 0 1 1 8 3"
            stroke="oklch(0.72 0.15 44 / 0.5)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <polygon points="8,1 10,3 8,5" fill="oklch(0.72 0.15 44 / 0.5)" />
        </svg>
      </div>
    </div>
  )
}
