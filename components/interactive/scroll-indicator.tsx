'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-tertiary)]">
      <ChevronDown size={24} strokeWidth={1.5} />
    </div>
  )
}
