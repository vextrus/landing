'use client'

import { useEffect, useRef, useState } from 'react'
import { realityBeats, anthropicData, bdMarketStats } from '@/lib/reality-data'
import { Container } from '@/components/ui/container'
import { VextrusLogo } from '@/components/ui/vextrus-logo'

function AnthropicChartVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
        AI Capability vs. Actual Usage by Industry
      </p>
      {anthropicData.map((item, i) => (
        <div key={item.category} className="space-y-1">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium ${item.highlight ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
            >
              {item.category}
            </span>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <span className="text-[var(--text-tertiary)]">{item.theoretical}%</span>
              <span
                className={
                  item.highlight
                    ? 'font-semibold text-[var(--accent)]'
                    : 'text-[var(--text-primary)]'
                }
              >
                {item.actual}%
              </span>
            </div>
          </div>
          {/* Theoretical bar (faded) */}
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[oklch(1_0_0_/_0.04)]">
            <div
              className={`absolute inset-y-0 left-0 rounded-full ${visible ? 'bar-horizontal' : ''}`}
              style={{
                width: `${item.theoretical}%`,
                background: item.highlight
                  ? 'oklch(0.72 0.15 44 / 0.2)'
                  : 'oklch(0.55 0.14 275 / 0.15)',
                animationDelay: `${i * 100}ms`,
              }}
            />
            {/* Actual bar (solid, overlaid) */}
            <div
              className={`absolute inset-y-0 left-0 rounded-full ${visible ? 'bar-horizontal' : ''}`}
              style={{
                width: `${item.actual}%`,
                background: item.highlight
                  ? 'var(--accent)'
                  : 'linear-gradient(90deg, var(--indigo), var(--indigo-light))',
                animationDelay: `${200 + i * 100}ms`,
              }}
            />
          </div>
        </div>
      ))}
      {/* Legend */}
      <div className="flex gap-4 pt-2 text-[9px] text-[var(--text-tertiary)]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-[oklch(0.55_0.14_275_/_0.15)]" />
          Theoretical Capability
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-[var(--indigo)]" />
          Actual Usage
        </span>
      </div>
      <p className="font-mono text-[8px] text-[var(--text-tertiary)]">
        Source: Anthropic Economic Index, March 2026
      </p>
    </div>
  )
}

function BeforeStateVisual() {
  return (
    <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-lg bg-[oklch(0.10_0.008_270)] p-6">
      {/* Scattered icons representing chaos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-[10%] top-[15%] -rotate-6 font-mono text-[10px] text-green-500">
          Excel
        </div>
        <div className="absolute right-[15%] top-[20%] rotate-3 font-mono text-[10px] text-green-400">
          WhatsApp
        </div>
        <div className="absolute bottom-[25%] left-[20%] rotate-2 font-mono text-[10px] text-[var(--text-tertiary)]">
          paper.pdf
        </div>
        <div className="absolute bottom-[30%] right-[20%] -rotate-3 font-mono text-[10px] text-[var(--text-tertiary)]">
          ledger.xlsx
        </div>
        <div className="absolute left-[40%] top-[40%] rotate-1 font-mono text-[10px] text-[var(--text-tertiary)]">
          calc.app
        </div>
      </div>
      {/* Central stat */}
      <div className="relative z-10 text-center">
        <p className="font-mono text-[clamp(2.5rem,2rem+2vw,4rem)] font-bold tracking-tighter text-[var(--accent)]">
          {bdMarketStats.erpAdoption}
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">use any ERP</p>
        <p className="mt-3 text-xs text-[var(--text-tertiary)]">
          The current reality for {bdMarketStats.companyCount} construction companies
        </p>
      </div>
    </div>
  )
}

function CompetitorPositioningVisual() {
  const competitors = [
    {
      name: 'Procore',
      focus: 'Construction Project Management',
      gap: 'No ERP. No localization.',
    },
    {
      name: 'Yardi',
      focus: 'Property Management',
      gap: 'No construction lifecycle.',
    },
    {
      name: 'SAP',
      focus: 'Enterprise ERP',
      gap: '$500K+ implementation. No BD compliance.',
    },
  ]

  return (
    <div className="space-y-3">
      {competitors.map((c) => (
        <div
          key={c.name}
          className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--canvas-raised)] px-4 py-3"
        >
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{c.name}</p>
            <p className="text-xs text-[var(--text-secondary)]">{c.focus}</p>
          </div>
          <p className="text-right text-[10px] text-[var(--text-tertiary)]">{c.gap}</p>
        </div>
      ))}

      <div className="section-divider my-3" />

      <div className="flex items-center justify-between rounded-lg border border-[oklch(0.72_0.15_44_/_0.2)] bg-[oklch(0.72_0.15_44_/_0.04)] px-4 py-3">
        <div className="flex items-center gap-3">
          <VextrusLogo size={24} />
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Vextrus</p>
            <p className="text-xs text-[var(--accent)]">
              Full Lifecycle &middot; AI-Native &middot; Built for Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PayoffVisual() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <span className="text-gradient-accent font-display text-[clamp(3rem,2rem+3vw,5rem)] font-normal italic tracking-tight">
        Vextrus
      </span>
      <p className="mt-4 font-mono text-xs text-[var(--text-tertiary)]">
        19 modules &middot; 20 AI agents &middot; Built for Bangladesh
      </p>
    </div>
  )
}

const visuals: Record<string, React.ReactNode> = {
  'anthropic-chart': <AnthropicChartVisual />,
  'before-state': <BeforeStateVisual />,
  'competitor-positioning': <CompetitorPositioningVisual />,
  payoff: <PayoffVisual />,
}

export function RealityScrollytelling() {
  const [activeIndex, setActiveIndex] = useState(0)
  const beatRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = realityBeats.map((_, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
      )
      if (beatRefs.current[i]) observer.observe(beatRefs.current[i]!)
      return observer
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <Container>
      {/* Desktop: sticky left + scrolling right */}
      <div className="mt-12 hidden lg:grid lg:grid-cols-5 lg:gap-16">
        <div className="col-span-2">
          <div className="sticky top-[30vh]">
            {realityBeats.map((beat, i) => (
              <div
                key={beat.id}
                className="transition-all duration-500"
                style={{
                  opacity: activeIndex === i ? 1 : 0,
                  position: activeIndex === i ? 'relative' : 'absolute',
                  pointerEvents: activeIndex === i ? 'auto' : 'none',
                }}
              >
                <h3 className="font-heading text-[clamp(1.5rem,1.2rem+1.5vw,2.25rem)] font-bold leading-tight text-[var(--text-primary)]">
                  {beat.heading}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                  {beat.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 space-y-[25vh]">
          {realityBeats.map((beat, i) => (
            <div
              key={beat.id}
              ref={(el) => {
                beatRefs.current[i] = el
              }}
              className="flex min-h-[40vh] items-center"
            >
              <div className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--canvas-raised)] p-8">
                {visuals[beat.visual]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked vertical */}
      <div className="mt-12 space-y-16 lg:hidden">
        {realityBeats.map((beat) => (
          <div key={beat.id}>
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
              {beat.heading}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
              {beat.body}
            </p>
            <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--canvas-raised)] p-6">
              {visuals[beat.visual]}
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
