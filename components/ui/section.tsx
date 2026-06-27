import type { CSSProperties, ReactNode } from 'react'

type Tone = 'canvas' | 'raised' | 'deep' | 'warm'

const toneCls: Record<Tone, string> = {
  canvas: 'bg-canvas text-ink',
  raised: 'bg-raised text-ink',
  deep: 'bg-deep text-ink-invert', // the ONE dark voltage band — light ink on dark
  warm: 'bg-warm text-ink', // warm structural light break (ink is dark on paper)
}

/** Max-width inner shell — 1200px, fluid horizontal padding. */
export function Container({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${className}`}
      style={{ maxWidth: 'var(--maxw)', ...style }}
    >
      {children}
    </div>
  )
}

/**
 * A page band. Alternating `tone` enforces "no two adjacent sections share a
 * background." Vertical rhythm is fluid (mockup uses ~104–120px desktop).
 */
export function Section({
  children,
  tone = 'canvas',
  className = '',
  id,
  bleed = false,
  style,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  id?: string
  /** full-bleed: caller supplies its own Container */
  bleed?: boolean
  style?: CSSProperties
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-[clamp(4.5rem,9vw,6.75rem)] ${toneCls[tone]} ${className}`}
      style={style}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  )
}
