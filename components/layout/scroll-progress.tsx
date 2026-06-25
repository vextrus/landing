'use client'

import { m, useScroll, useSpring } from 'motion/react'

// Thin top scroll-progress cue (indigo→copper). Reliable across browsers via
// motion's useScroll (no scroll-timeline dependency).
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
    />
  )
}
