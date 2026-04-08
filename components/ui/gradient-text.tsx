import { type ReactNode } from 'react'

export function GradientText({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <span className={`text-gradient ${className}`}>{children}</span>
}
