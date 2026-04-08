import { type ReactNode } from 'react'

type SectionVariant = 'dark' | 'warm' | 'atmospheric' | 'atmospheric-intense'

const variantClasses: Record<SectionVariant, string> = {
  dark: 'bg-canvas',
  warm: 'bg-[var(--canvas-warm)] text-[var(--text-dark)]',
  atmospheric: 'bg-atmospheric',
  'atmospheric-intense': 'bg-atmospheric-intense',
}

export function Section({
  variant = 'dark',
  className = '',
  children,
  id,
  fullHeight = false,
}: {
  variant?: SectionVariant
  className?: string
  children: ReactNode
  id?: string
  fullHeight?: boolean
}) {
  return (
    <section
      id={id}
      className={`${variantClasses[variant]} ${fullHeight ? 'min-h-screen' : ''} py-[var(--section-py)] ${className}`}
    >
      {children}
    </section>
  )
}
