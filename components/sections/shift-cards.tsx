import type { CSSProperties } from 'react'
import { Icon, type IconName } from '../ui/icon'
import { Reveal } from '../ui/reveal'

// "The shift" — three from→to cards (master spec 1.2 / Appendix F).
const SHIFTS: { accent: string; icon: IconName; from: string; to: string }[] = [
  {
    accent: 'var(--mod-costing)',
    icon: 'rebar',
    from: "a week of an engineer's time per estimate",
    to: 'Minutes, posted to your books.',
  },
  {
    accent: 'var(--mod-ai)',
    icon: 'spark',
    from: 'software you operate',
    to: 'Agents that do the work; you approve the exceptions.',
  },
  {
    accent: 'var(--mod-gl)',
    icon: 'coin',
    from: 'Excel BOQs · WhatsApp approvals · the part-time accountant',
    to: 'One workforce that never sleeps and never re-keys.',
  },
]

export function ShiftCards({ className = '' }: { className?: string }) {
  return (
    <div className={`grid gap-[18px] md:grid-cols-3 ${className}`}>
      {SHIFTS.map((s, i) => (
        <Reveal key={s.to} delay={i * 0.08} className="h-full">
          <div
            className="vxtile h-full rounded-[16px] border border-line bg-raised p-[26px]"
            style={{ '--tile-accent': s.accent } as CSSProperties}
          >
            <span
              className="vxtile-ic mb-4 inline-grid h-[34px] w-[34px] place-items-center rounded-[10px] border border-line"
              style={{ color: s.accent }}
            >
              <Icon name={s.icon} size={18} />
            </span>
            <div
              className="mb-2.5 font-mono text-[12px] line-through"
              style={{ color: 'oklch(0.55 0.02 270)' }}
            >
              {s.from}
            </div>
            <div className="text-[20px] font-semibold leading-snug">{s.to}</div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
