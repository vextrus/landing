import { CountUp } from '@/components/ui/count-up'

/**
 * A one-decimal outcome stat for the estimator page. Mirrors the OutcomeCounter
 * look, but passes `decimals={1}` to CountUp so a value like 3.1 renders as
 * "3.1%" — OutcomeCounter rounds to whole numbers, which would show "3%".
 * Presentational; only the inner CountUp is a client component.
 */
export function WasteCounter({
  value,
  label,
  was,
  suffix = '',
}: {
  value: number
  label: string
  was?: string
  suffix?: string
}) {
  return (
    <div>
      <div className="font-mono text-stat font-bold tabular-nums text-ink">
        <CountUp to={value} decimals={1} suffix={suffix} />
      </div>
      <div className="mt-1 text-[13px] text-ink-soft">
        {label}
        {was && <span className="ml-2 text-ink-dim line-through">was {was}</span>}
      </div>
    </div>
  )
}
