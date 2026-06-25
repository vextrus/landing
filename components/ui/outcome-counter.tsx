import { CountUp } from './count-up'

/**
 * A "count-up on view" outcome stat — e.g. "BOQ ready in 8 min, was ~3 days".
 * Wraps the {@link CountUp} primitive for the figure (which counts up on view
 * and renders the final value immediately under reduced motion), then adds a
 * label and an optional struck "was {was}" comparison beneath it. Tabular mono
 * figures keep large lakh/crore numbers steady while animating.
 *
 * Presentational + server-safe: only the inner `CountUp` is a client component.
 */
export function OutcomeCounter({
  value,
  label,
  was,
  prefix = '',
  suffix = '',
}: {
  value: number
  label: string
  was?: string
  prefix?: string
  suffix?: string
}) {
  return (
    <div>
      <div className="font-mono text-stat font-bold tabular-nums text-ink">
        <CountUp to={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="mt-1 text-[13px] text-ink-soft">
        {label}
        {was && <span className="ml-2 text-ink-dim line-through">was {was}</span>}
      </div>
    </div>
  )
}
