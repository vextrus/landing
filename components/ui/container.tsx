import { type ReactNode } from 'react'

export function Container({
  className = '',
  children,
  narrow = false,
}: {
  className?: string
  children: ReactNode
  narrow?: boolean
}) {
  return (
    <div
      className={`mx-auto w-full px-[var(--grid-gutter)] ${
        narrow ? 'max-w-3xl' : 'max-w-content'
      } ${className}`}
    >
      {children}
    </div>
  )
}
