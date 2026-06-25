import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon } from './icon'

// Inline "text →" link with a gap/translate micro-interaction on hover.
export function LinkArrow({
  href,
  children,
  color = 'var(--color-accent)',
  className = '',
}: {
  href: string
  children: ReactNode
  color?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-semibold no-underline transition-colors ${className}`}
      style={{ color }}
    >
      <span>{children}</span>
      <Icon
        name="arrow-right"
        size={16}
        className="transition-transform duration-200 ease-quart motion-safe:group-hover:translate-x-1"
      />
    </Link>
  )
}
