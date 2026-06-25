import type { CSSProperties } from 'react'
import { solutions } from '@/lib/solutions'
import { Icon, type IconName } from '../ui/icon'
import { Reveal } from '../ui/reveal'

// The 4 named bundle cards. `detailed` adds the recovered-value + land-and-expand
// copy for the /solutions page; the home variant shows just the problem it kills.
export function SolutionsGrid({
  detailed = false,
  className = '',
}: {
  detailed?: boolean
  className?: string
}) {
  return (
    <div className={`grid gap-[18px] md:grid-cols-2 ${className}`}>
      {solutions.map((s, i) => (
        <Reveal key={s.id} delay={i * 0.07} className="h-full">
          <article
            className="vxtile flex h-full flex-col rounded-[16px] border border-line bg-raised p-7"
            style={{ '--tile-accent': s.accent } as CSSProperties}
          >
            <div className="mb-3.5 flex items-center justify-between">
              <span
                className="vxtile-ic inline-grid h-[38px] w-[38px] place-items-center rounded-[11px] border border-line"
                style={{ color: s.accent }}
              >
                <Icon name={s.iconId as IconName} size={20} />
              </span>
              <span className="font-mono text-[11px]" style={{ color: s.accent }}>
                {s.kicker}
              </span>
            </div>
            <h3 className="m-0 mb-2 font-heading text-[22px] font-semibold">{s.name}</h3>
            <p className="m-0 text-sm leading-normal text-ink-soft">
              Kills <em>“{s.kills}”</em>
            </p>

            {detailed && (
              <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
                <p className="m-0 text-[13px] leading-normal text-ink-soft">{s.recovered}</p>
                <p className="m-0 text-[12.5px] leading-normal text-ink/70">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-accent">
                    Land &amp; expand ·{' '}
                  </span>
                  {s.expand}
                </p>
                {s.roadmapNote && (
                  <p
                    className="m-0 rounded-lg border border-line p-3 text-[12px] leading-normal text-ink-soft"
                    style={{ background: 'oklch(0.72 0.14 44 / 0.06)' }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
                      Honest frame ·{' '}
                    </span>
                    {s.roadmapNote}
                  </p>
                )}
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {s.agents.map((a) => (
                    <span
                      key={a}
                      className="rounded-md border border-line px-2 py-1 font-mono text-[10.5px] text-ink-soft"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  )
}
