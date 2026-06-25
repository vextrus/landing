import type { ReactNode } from 'react'

// Eyebrow label — Syne 600, 11.5px, uppercase, tracking 0.24em. Copper on dark;
// pass a `color` (CSS var/oklch) for warm sections (the mockup uses a darker copper).
export function Overline({
  children,
  color,
  className = '',
}: {
  children: ReactNode
  color?: string
  className?: string
}) {
  return (
    <p className={`t-overline ${className}`} style={color ? { color } : undefined}>
      {children}
    </p>
  )
}
