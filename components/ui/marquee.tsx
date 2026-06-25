import type { ReactNode } from 'react'

/**
 * Auto-scrolling ticker with mask-faded edges (the "enemy" marquee). The row
 * content is rendered twice; translateX(-50%) over `durationSec` makes a
 * seamless loop. Reduced-motion stops the scroll (content stays readable).
 * `children` should end with a trailing separator so the seam tiles cleanly.
 */
export function Marquee({
  children,
  durationSec = 36,
  gap = 42,
  className = '',
}: {
  children: ReactNode
  durationSec?: number
  gap?: number
  className?: string
}) {
  const unit = (hidden?: boolean) => (
    <div
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={hidden}
    >
      {children}
    </div>
  )
  return (
    <div className={`mask-x relative overflow-hidden ${className}`}>
      <div
        className="flex w-max items-center"
        style={{ animation: `vx-marquee ${durationSec}s linear infinite` }}
      >
        {unit()}
        {unit(true)}
      </div>
    </div>
  )
}
