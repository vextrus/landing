import type { CSSProperties, ReactNode } from 'react'

/**
 * Small mono pill. `tone`:
 *  - 'outline'  → hairline border (tags)
 *  - 'accent'   → translucent copper wash (status, e.g. PENDING 4-EYES)
 *  - 'warm'     → warm-section hairline (on light backgrounds)
 */
export function Badge({
  children,
  tone = 'outline',
  color,
  className = '',
  style,
}: {
  children: ReactNode
  tone?: 'outline' | 'accent' | 'warm'
  color?: string
  className?: string
  style?: CSSProperties
}) {
  const toneStyle: CSSProperties =
    tone === 'accent'
      ? {
          background: `oklch(from ${color ?? 'var(--color-accent)'} l c h / 0.16)`,
          color: color ?? 'var(--color-accent)',
        }
      : tone === 'warm'
        ? { border: '1px solid var(--color-line-warm)', color: 'var(--color-ink-dark-soft)' }
        : { border: '1px solid var(--color-line)', color: color ?? 'var(--color-ink-soft)' }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg font-mono text-[11px] leading-none tracking-[0.06em] ${className}`}
      style={{ padding: '6px 11px', ...toneStyle, ...style }}
    >
      {children}
    </span>
  )
}
