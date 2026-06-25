import { Reveal } from '@/components/ui/reveal'
import { Icon } from '@/components/ui/icon'
import { OutcomeCounter } from '@/components/ui/outcome-counter'
import type { IconName } from '@/components/ui/icon'

// The honest time-to-value wedge. The real competitor for a greenfield Tier-2/3
// firm is NOT SAP — it is Excel, WhatsApp, and manual process. So the wedge is
// framed against the status quo, not a named rival. Server-safe (no 'use
// client'): the only animated piece is the OutcomeCounter's inner CountUp.

type Point = { icon: IconName; t: string; b: string }

const POINTS: Point[] = [
  {
    icon: 'gauge',
    t: 'Live in weeks, not 18–24 months',
    b: 'You land on one agent solving one problem on your own data. No two-year rollout, no consultants camped in your office. You see recovered taka before you commit further.',
  },
  {
    icon: 'branch',
    t: 'No rip-and-replace',
    b: 'Keep working the way you work. Vextrus runs alongside what you have and takes over the painful parts first. Nothing gets ripped out on day one.',
  },
  {
    icon: 'file-check',
    t: 'Replace Excel and WhatsApp',
    b: 'Costing spreadsheets, payment chases on WhatsApp, BOQs retyped by hand — that is where money leaks. The agents take that work over and leave a clean audit trail.',
  },
]

export function TimeToValue({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-3">
        {POINTS.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.05} className="h-full">
            <div
              className="vxtile h-full rounded-[14px] border border-line bg-raised p-6"
              style={{ ['--tile-accent' as string]: 'var(--color-accent)' }}
            >
              <span
                className="mb-4 inline-grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-line text-accent"
                aria-hidden="true"
              >
                <Icon name={p.icon} size={18} strokeWidth={2} />
              </span>
              <h3 className="font-heading text-[16px] font-semibold leading-snug text-ink">
                {p.t}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{p.b}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10">
        <div className="grid gap-6 rounded-[16px] border border-line bg-raised p-7 sm:grid-cols-3 sm:gap-4">
          <OutcomeCounter
            value={8}
            suffix=" min"
            label="Drawing to priced BOQ"
            was="~3 days by hand"
          />
          <OutcomeCounter value={20} label="Modules in one system" />
          <OutcomeCounter value={0} label="Servers you have to buy" />
        </div>
      </Reveal>
    </div>
  )
}
