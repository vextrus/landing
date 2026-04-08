'use client'

import { useEffect, useRef, useState } from 'react'

const journalRows = [
  {
    date: 'Apr 07',
    desc: 'Eastern Steel Ltd — Invoice',
    amount: '\u09F34,52,000',
    status: 'draft' as const,
  },
  {
    date: 'Apr 07',
    desc: 'Cement purchase — Site B',
    amount: '\u09F31,85,000',
    status: 'confirmed' as const,
  },
  {
    date: 'Apr 06',
    desc: 'Payroll — March cycle',
    amount: '\u09F312,40,000',
    status: 'pending' as const,
  },
]

const statusStyles = {
  draft: 'bg-[oklch(0.72_0.15_44_/_0.12)] text-[oklch(0.72_0.15_44)]',
  confirmed: 'bg-[oklch(0.62_0.14_155_/_0.12)] text-[oklch(0.62_0.14_155)]',
  pending: 'bg-[oklch(0.55_0.14_275_/_0.12)] text-[oklch(0.55_0.14_275)]',
}

const statusLabels = {
  draft: 'AI Draft',
  confirmed: 'Confirmed',
  pending: 'Pending',
}

const sidebarModules = [
  { label: 'GL', active: true },
  { label: 'AP', active: false },
  { label: 'AR', active: false },
  { label: 'RE', active: false },
  { label: 'HR', active: false },
]

export function ProductUIMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`product-mockup-frame transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-[oklch(1_0_0_/_0.04)] px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-[7px] w-[7px] rounded-full bg-[#f55]" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#fb0]" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#0c4]" />
        </div>
        <span className="flex-1 text-center font-mono text-[10px] text-[var(--text-tertiary)]">
          app.vextrus.com
        </span>
      </div>

      {/* App body */}
      <div className="grid grid-cols-[40px_1fr_200px]" style={{ minHeight: 220 }}>
        {/* Sidebar */}
        <div className="flex flex-col items-center gap-1.5 border-r border-[oklch(1_0_0_/_0.04)] bg-[oklch(1_0_0_/_0.02)] py-2">
          <svg viewBox="0 0 64 64" fill="none" width={18} height={18} className="mb-1">
            <defs>
              <linearGradient id="mock-l" x1="0" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="oklch(0.42 0.14 275)" />
                <stop offset="100%" stopColor="oklch(0.55 0.14 275)" />
              </linearGradient>
              <linearGradient id="mock-r" x1="0.5" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.55 0.14 275)" />
                <stop offset="100%" stopColor="oklch(0.72 0.15 44)" />
              </linearGradient>
            </defs>
            <polygon points="32,10 12,50 32,42" fill="url(#mock-l)" />
            <polygon points="32,10 52,50 32,42" fill="url(#mock-r)" />
          </svg>
          {sidebarModules.map((m) => (
            <div
              key={m.label}
              className={`flex h-7 w-7 items-center justify-center rounded-lg font-mono text-[9px] ${
                m.active
                  ? 'bg-[oklch(0.55_0.14_275_/_0.15)] text-[oklch(0.65_0.12_275)]'
                  : 'text-[var(--text-tertiary)]'
              }`}
            >
              {m.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="p-3">
          <p className="font-heading text-[11px] font-semibold text-[var(--text-primary)]">
            General Ledger — Journal Entries
          </p>
          {/* Table header */}
          <div className="mt-2 grid grid-cols-[60px_1fr_72px_56px] gap-1 border-b border-[oklch(1_0_0_/_0.04)] pb-1.5 font-mono text-[8px] uppercase tracking-wider text-[var(--text-tertiary)]">
            <span>Date</span>
            <span>Description</span>
            <span className="text-right">Amount</span>
            <span className="text-center">Status</span>
          </div>
          {/* Rows */}
          {journalRows.map((row) => (
            <div
              key={row.desc}
              className="grid grid-cols-[60px_1fr_72px_56px] gap-1 border-b border-[oklch(1_0_0_/_0.03)] py-1.5 text-[10px]"
            >
              <span className="font-mono text-[var(--text-tertiary)]">{row.date}</span>
              <span className="truncate text-[var(--text-primary)]">{row.desc}</span>
              <span className="text-right font-mono text-[var(--text-secondary)]">
                {row.amount}
              </span>
              <span
                className={`rounded px-1 py-0.5 text-center text-[8px] font-medium ${statusStyles[row.status]}`}
              >
                {statusLabels[row.status]}
              </span>
            </div>
          ))}
        </div>

        {/* AI Panel */}
        <div className="border-l border-[oklch(1_0_0_/_0.04)] bg-[oklch(1_0_0_/_0.015)] p-3">
          <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-[oklch(0.55_0.14_275)]">
            <div className="ai-pulse-dot h-[5px] w-[5px] rounded-full bg-[oklch(0.55_0.14_275)]" />
            Vextrus AI
          </div>

          {/* GL Suggestion */}
          <div className="mt-2.5 rounded-lg border border-dashed border-[oklch(0.55_0.14_275_/_0.2)] bg-[oklch(0.55_0.14_275_/_0.06)] p-2">
            <p className="text-[9px] text-[var(--text-tertiary)]">Suggested GL Account</p>
            <p className="mt-0.5 font-mono text-[10px] text-[var(--text-primary)]">
              4110 — Raw Materials
            </p>
          </div>

          {/* VAT */}
          <div className="mt-1.5 rounded-lg border border-dashed border-[oklch(0.55_0.14_275_/_0.2)] bg-[oklch(0.55_0.14_275_/_0.06)] p-2">
            <p className="text-[9px] text-[var(--text-tertiary)]">VAT Classification</p>
            <p className="mt-0.5 font-mono text-[10px] text-[var(--text-primary)]">
              15% Standard Rate
            </p>
          </div>

          {/* Confidence bar */}
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-[oklch(1_0_0_/_0.06)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: '93%',
                  background: 'linear-gradient(90deg, oklch(0.55 0.14 275), oklch(0.72 0.15 44))',
                }}
              />
            </div>
            <span className="font-mono text-[9px] font-medium text-[var(--accent)]">93%</span>
          </div>

          {/* Action buttons */}
          <div className="mt-2.5 flex gap-1.5">
            <button className="rounded-md bg-[var(--accent)] px-2 py-1 font-heading text-[9px] font-semibold text-[oklch(0.15_0.03_44)]">
              Confirm
            </button>
            <button className="rounded-md border border-[var(--border-subtle)] px-2 py-1 font-heading text-[9px] font-medium text-[var(--text-secondary)]">
              Modify
            </button>
            <button className="px-1.5 py-1 font-heading text-[9px] text-[var(--text-tertiary)]">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
