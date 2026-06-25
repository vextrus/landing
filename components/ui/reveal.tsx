'use client'

import { m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Scroll-reveal: opacity 0→1 + translateY(18px)→0 over 0.8s expo-out, once.
 * Stagger siblings by passing an increasing `delay`. Fully respects
 * prefers-reduced-motion (renders static, no transform).
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  amount = 0.15,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  amount?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px', amount }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </m.div>
  )
}
