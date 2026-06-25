'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

/**
 * ShaderBackdrop — the home hero's animated copper/indigo mesh-gradient.
 *
 * LCP-safe by construction:
 * - The root element is the static `.shader-fallback` CSS gradient (defined in
 *   globals.css). It paints on the SSR HTML immediately and is the permanent
 *   fallback, so there is never layout shift and the shader never blocks LCP.
 * - The WebGL `MeshGradient` is loaded via `next/dynamic({ ssr: false })`, so it
 *   stays out of the server render + hydration path entirely.
 * - It only mounts when ALL of: in viewport (IntersectionObserver), motion is
 *   allowed, and the device is capable (not coarse-pointer, ≥4GB memory, not
 *   data-saver). Otherwise the static gradient is all that ever renders.
 *
 * Animate state changes only: under reduced motion we never mount the shader.
 */

// Paper Shaders' color parser (getShaderColorFromString) accepts hex / rgb / hsl
// only — NOT oklch. These are the sRGB-hex equivalents of the brand tokens:
//   canvas  oklch(0.12 0.01 270) → #050609   (--color-canvas)
//   indigo  oklch(0.55 0.14 275) → #5b67c2   (--color-indigo)
//   copper  oklch(0.72 0.15 44)  → #f08250   (--color-accent)
const MESH_COLORS = ['#050609', '#5b67c2', '#f08250'] as const

const MeshGradient = dynamic(
  () => import('@paper-design/shaders-react').then((m) => m.MeshGradient),
  { ssr: false, loading: () => null }
)

// Non-standard, progressively-enhanced navigator fields (not in lib.dom yet).
type CapabilityNavigator = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

function capable(): boolean {
  if (typeof window === 'undefined') return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const nav = navigator as CapabilityNavigator
  const lowMem = typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4
  const saveData = nav.connection?.saveData === true
  return !reduce && !coarse && !lowMem && !saveData
}

export function ShaderBackdrop({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!capable() || !ref.current) return
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), {
      rootMargin: '0px',
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className={`shader-fallback pointer-events-none absolute inset-0 ${className}`}
    >
      {on && (
        <MeshGradient
          className="h-full w-full"
          colors={[...MESH_COLORS]}
          distortion={0.8}
          swirl={0.2}
          speed={0.15}
        />
      )}
    </div>
  )
}
