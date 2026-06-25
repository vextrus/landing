import { Icon, type IconName } from './icon'
import { CountUp } from './count-up'

/**
 * Hero stat: icon tile + figure + label. Numeric values count up on view;
 * string values (e.g. "4-Eyes") render as-is.
 */
export function Stat({
  icon,
  value,
  label,
  accent = 'var(--color-accent)',
  decimals = 0,
  suffix = '',
}: {
  icon: IconName
  value: number | string
  label: string
  accent?: string
  decimals?: number
  suffix?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-grid h-[30px] w-[30px] place-items-center rounded-[9px] border border-line"
        style={{ color: accent }}
      >
        <Icon name={icon} size={16} />
      </span>
      <div>
        <div className="font-mono text-2xl font-semibold leading-none tracking-[-0.02em]">
          {typeof value === 'number' ? (
            <CountUp to={value} decimals={decimals} suffix={suffix} />
          ) : (
            value
          )}
        </div>
        <div className="mt-0.5 text-[11.5px] text-ink-soft">{label}</div>
      </div>
    </div>
  )
}
