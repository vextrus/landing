'use client'

import { useRef } from 'react'
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'motion/react'
import { Icon } from '../ui/icon'

// The human-in-the-loop, made obvious. The AI works the whole pipeline; only the
// exceptions land here for a person to clear. This REPLACES the autonomy dial as
// the primary review visualisation: "AI does the work, you approve the exceptions."
//
// The Approve / Reject buttons are non-functional marketing affordances — styled,
// keyboard-operable, with real aria-labels — so the inbox reads as a real control
// without performing any action.

interface InboxItem {
  agent: string
  action: string
  confidence: number // 0–100, shown to one decimal, never rounded
}

// Honest, grounded in real shipped/wired agents. No fabricated crore figure — the
// only number is an NPSB bank charge (a real reconciler line) and a confidence score.
const ITEMS: InboxItem[] = [
  { agent: 'Bank Reconciler', action: 'Post NPSB charge ৳1,150 to Bank Charges', confidence: 93.4 },
  {
    agent: 'AP Anomaly Detector',
    action: 'Hold duplicate bill on PO-2291 for review',
    confidence: 71.2,
  },
  {
    agent: 'Collection Predictor',
    action: 'Flag Project 2 receivable as likely-late',
    confidence: 64.8,
  },
]

// Confidence band → chip colour + a plain-English verdict.
function band(score: number) {
  if (score >= 90) return { color: 'var(--color-success)', verdict: 'safe to apply' }
  if (score >= 70) return { color: 'var(--color-warning)', verdict: 'second look' }
  return { color: 'var(--color-ink-soft)', verdict: 'check it' }
}

function ConfidenceChip({ score }: { score: number }) {
  const { color, verdict } = band(score)
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold leading-none tracking-[0.06em]"
      style={{ background: `oklch(from ${color} l c h / 0.16)`, color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
      {score.toFixed(1)}
      <span className="font-sans text-[10px] font-normal tracking-normal opacity-80">
        · {verdict}
      </span>
    </span>
  )
}

function Row({ item, animate = false }: { item: InboxItem; animate?: boolean }) {
  return (
    <m.li
      initial={animate ? { opacity: 0, transform: 'translateY(-12px)' } : false}
      animate={animate ? { opacity: 1, transform: 'translateY(0px)' } : undefined}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3 rounded-[13px] border border-line bg-raised p-[18px] sm:flex-row sm:items-center sm:gap-4"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span
            className="inline-grid h-6 w-6 shrink-0 place-items-center rounded-md"
            style={{
              background: 'oklch(from var(--color-accent) l c h / 0.16)',
              color: 'var(--color-accent)',
            }}
            aria-hidden="true"
          >
            <Icon name="cpu" size={13} />
          </span>
          <span className="truncate font-heading text-[14px] font-semibold text-ink">
            {item.agent}
          </span>
        </div>
        <p className="m-0 text-[13px] leading-snug text-ink-soft">{item.action}</p>
      </div>

      <div className="flex items-center gap-2.5 sm:flex-col sm:items-end sm:gap-2.5">
        <ConfidenceChip score={item.confidence} />
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={`Approve: ${item.agent} — ${item.action}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[10px] px-3.5 font-heading text-[13px] font-semibold transition-[transform,box-shadow,background] duration-200 ease-spring motion-safe:hover:-translate-y-px active:translate-y-px focus-visible:shadow-[0_0_0_3px_oklch(0.14_0.03_155)] focus-visible:outline-none"
            style={{ background: 'var(--color-success)', color: 'oklch(0.14 0.03 155)' }}
          >
            <Icon name="check" size={14} strokeWidth={2.2} />
            Approve
          </button>
          <button
            type="button"
            aria-label={`Reject: ${item.agent} — ${item.action}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] border border-line px-3.5 font-heading text-[13px] font-semibold text-ink-soft transition-[transform,border-color,color] duration-200 ease-spring hover:border-line-strong hover:text-ink active:translate-y-px focus-visible:outline-none"
          >
            Reject
          </button>
        </div>
      </div>
    </m.li>
  )
}

export function ApprovalInbox({
  className = '',
  tagline = 'Your AI works the pipeline. You only clear the exceptions.',
}: {
  className?: string
  tagline?: string
}) {
  const reduce = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  // One item slides in on view — a single state-change entrance. The first row is
  // the freshly-arrived exception; the rest are static. Reduced motion → static.
  const animate = !reduce && inView

  const [fresh, ...rest] = ITEMS

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={ref}
        className={`glass-card relative p-6 ${className}`}
        style={{ borderRadius: 18, boxShadow: '0 40px 80px -30px rgba(0,0,0,0.75)' }}
      >
        <div className="mb-1 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2.5 font-heading text-[15px] font-semibold text-ink">
            <span
              className="inline-grid h-7 w-7 place-items-center rounded-lg"
              style={{
                background: 'oklch(from var(--color-accent) l c h / 0.16)',
                color: 'var(--color-accent)',
              }}
              aria-hidden="true"
            >
              <Icon name="shield-check" size={15} />
            </span>
            Approvals
          </span>
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold leading-none tracking-[0.06em]"
            style={{
              background: 'oklch(from var(--color-accent) l c h / 0.16)',
              color: 'var(--color-accent)',
            }}
            aria-label={`${ITEMS.length} pending approvals`}
          >
            {ITEMS.length} pending
          </span>
        </div>

        <p className="mb-4 text-[12.5px] leading-snug text-ink-soft">{tagline}</p>

        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          <Row item={fresh} animate={animate} />
          {rest.map((item) => (
            <Row key={item.agent} item={item} />
          ))}
        </ul>
      </div>
    </LazyMotion>
  )
}
