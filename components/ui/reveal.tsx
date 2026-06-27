import type { ReactNode } from 'react'

/**
 * Scroll-reveal, the calm way: a CSS-only `.reveal-up` (defined in globals.css).
 * Visible by DEFAULT (opacity 1) — it only animates opacity/translateY where
 * `animation-timeline: view()` is supported, and degrades to plain-visible
 * everywhere else (and under prefers-reduced-motion). No JS, no motion runtime,
 * so it can never get stuck at opacity 0 for an above-fold or late-hydrating
 * client child. `delay`/`y`/`amount` are accepted for call-site compatibility;
 * the scroll timeline supersedes time-based delay (siblings stagger by position).
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  amount?: number
}) {
  return <div className={`reveal-up${className ? ` ${className}` : ''}`}>{children}</div>
}
