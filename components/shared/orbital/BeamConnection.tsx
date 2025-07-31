'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Point {
  x: number
  y: number
}

interface BeamConnectionProps {
  from: Point
  to: Point
  active?: boolean
  color?: string
  bidirectional?: boolean
  pulseSpeed?: number
  thickness?: number
}

export default function BeamConnection({
  from,
  to,
  active = false,
  color = '#8b5cf6',
  bidirectional = false,
  pulseSpeed = 2,
  thickness = 2
}: BeamConnectionProps) {
  const [path, setPath] = useState('')

  useEffect(() => {
    // Create a curved path between points
    const dx = to.x - from.x
    const dy = to.y - from.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Control points for the bezier curve
    const midX = (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2
    
    // Add curve based on distance
    const curveOffset = distance * 0.2
    const angle = Math.atan2(dy, dx) + Math.PI / 2
    const ctrlX = midX + Math.cos(angle) * curveOffset
    const ctrlY = midY + Math.sin(angle) * curveOffset
    
    setPath(`M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`)
  }, [from, to])

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        <linearGradient id={`beam-gradient-${from.x}-${from.y}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        
        <filter id={`beam-glow-${from.x}-${from.y}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Base connection line */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        opacity={active ? 0.3 : 0.1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Active beam animation */}
      {active && (
        <>
          {/* Glowing beam */}
          <motion.path
            d={path}
            stroke={`url(#beam-gradient-${from.x}-${from.y})`}
            strokeWidth={thickness * 3}
            fill="none"
            filter={`url(#beam-glow-${from.x}-${from.y})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: pulseSpeed,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Simple pulsing circles */}
          <motion.circle
            cx={from.x + (to.x - from.x) * 0.3}
            cy={from.y + (to.y - from.y) * 0.3}
            r="4"
            fill={color}
            filter={`url(#beam-glow-${from.x}-${from.y})`}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: pulseSpeed,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <motion.circle
            cx={from.x + (to.x - from.x) * 0.7}
            cy={from.y + (to.y - from.y) * 0.7}
            r="4"
            fill={color}
            filter={`url(#beam-glow-${from.x}-${from.y})`}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: pulseSpeed,
              repeat: Infinity,
              ease: "linear",
              delay: pulseSpeed * 0.3
            }}
          />

          {/* Bidirectional pulses */}
          {bidirectional && (
            <>
              <motion.circle
                cx={to.x + (from.x - to.x) * 0.3}
                cy={to.y + (from.y - to.y) * 0.3}
                r="4"
                fill={color}
                filter={`url(#beam-glow-${from.x}-${from.y})`}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: pulseSpeed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: pulseSpeed / 2
                }}
              />
              <motion.circle
                cx={to.x + (from.x - to.x) * 0.7}
                cy={to.y + (from.y - to.y) * 0.7}
                r="4"
                fill={color}
                filter={`url(#beam-glow-${from.x}-${from.y})`}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: pulseSpeed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: pulseSpeed * 0.8
                }}
              />
            </>
          )}
        </>
      )}
    </svg>
  )
}