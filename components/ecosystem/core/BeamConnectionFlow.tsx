'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BeamConnectionFlowProps {
  connections: Array<{
    from: { x: number; y: number; id: string }
    to: { x: number; y: number; id: string }
    active: boolean
    color?: string
  }>
  hoveredModule?: string | null
}

// Module-specific color schemes for vibrant animations
const moduleColors: Record<string, { primary: string; secondary: string; tertiary: string }> = {
  brain: { primary: '#a855f7', secondary: '#ec4899', tertiary: '#6366f1' },
  financial: { primary: '#14b8a6', secondary: '#06b6d4', tertiary: '#22d3ee' },
  sales: { primary: '#22c55e', secondary: '#84cc16', tertiary: '#facc15' },
  procurement: { primary: '#f59e0b', secondary: '#fb923c', tertiary: '#fbbf24' },
  quality: { primary: '#8b5cf6', secondary: '#a855f7', tertiary: '#e879f9' },
  hr: { primary: '#ef4444', secondary: '#f87171', tertiary: '#fb7185' },
  analytics: { primary: '#06b6d4', secondary: '#0ea5e9', tertiary: '#38bdf8' }
}

export default function BeamConnectionFlow({ connections, hoveredModule }: BeamConnectionFlowProps) {
  const [time, setTime] = useState(0)
  
  useEffect(() => {
    console.log('🔗 BeamConnectionFlow - Total connections:', connections.length)
    connections.forEach((conn, idx) => {
      console.log(`  ${idx}: ${conn.from.id} → ${conn.to.id}`, conn.active ? '(active)' : '')
    })
  }, [connections])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.02)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Create unique gradients for each connection */}
        {connections.map((conn, index) => {
          const colors = moduleColors[conn.to.id] || moduleColors.brain
          const isActive = conn.active || conn.from.id === hoveredModule || conn.to.id === hoveredModule
          
          // Calculate gradient direction based on line angle
          const dx = conn.to.x - conn.from.x
          const dy = conn.to.y - conn.from.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Normalize and create gradient that flows along the line
          const nx = distance > 0 ? (dx / distance) * 100 : 100
          const ny = distance > 0 ? (dy / distance) * 100 : 0
          
          // Gradient coordinates - ensure positive values for SVG
          const gradX1 = "0%"
          const gradY1 = "0%"
          const gradX2 = `${Math.max(0, Math.min(100, 50 + nx/2))}%`
          const gradY2 = `${Math.max(0, Math.min(100, 50 + ny/2))}%`
          
          return (
            <g key={`defs-${index}`}>
              {/* Animated gradient for energy beam - properly oriented */}
              <linearGradient 
                id={`beam-gradient-${index}`} 
                x1={gradX1} 
                y1={gradY1} 
                x2={gradX2} 
                y2={gradY2}
              >
                <stop offset="0%" stopColor={colors.primary}>
                  <animate 
                    attributeName="stop-color" 
                    values={`${colors.primary};${colors.secondary};${colors.tertiary};${colors.primary}`}
                    dur="6s"
                    repeatCount="indefinite" 
                  />
                  <animate 
                    attributeName="offset" 
                    values="0%;100%;0%" 
                    dur="8s"
                    repeatCount="indefinite" 
                  />
                </stop>
                <stop offset="50%" stopColor={colors.secondary}>
                  <animate 
                    attributeName="stop-color" 
                    values={`${colors.secondary};${colors.tertiary};${colors.primary};${colors.secondary}`}
                    dur="6s"
                    repeatCount="indefinite" 
                  />
                </stop>
                <stop offset="100%" stopColor={colors.tertiary}>
                  <animate 
                    attributeName="stop-color" 
                    values={`${colors.tertiary};${colors.primary};${colors.secondary};${colors.tertiary}`}
                    dur="6s"
                    repeatCount="indefinite" 
                  />
                  <animate 
                    attributeName="offset" 
                    values="100%;0%;100%" 
                    dur="8s"
                    repeatCount="indefinite" 
                  />
                </stop>
              </linearGradient>
              
              {/* Enhanced glow filter */}
              <filter id={`beam-glow-${index}`}>
                <feGaussianBlur stdDeviation={isActive ? "8" : "4"} result="coloredBlur"/>
                <feColorMatrix in="coloredBlur" type="matrix" 
                  values={`1 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 ${isActive ? 2 : 1} 0`}/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </g>
          )
        })}
      </defs>
      
      {/* Draw all connections as thick energy beams */}
      {connections.map((conn, index) => {
        const isActive = conn.active || conn.from.id === hoveredModule || conn.to.id === hoveredModule
        const beamWidth = isActive ? 6 : 4
        
        return (
          <g key={`connection-${index}`}>
            {/* Outer glow layer */}
            <motion.line
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke={`url(#beam-gradient-${index})`}
              strokeWidth={beamWidth * 1.5}
              opacity={0.3}
              strokeLinecap="round"
              filter={`url(#beam-glow-${index})`}
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                opacity: isActive ? [0.3, 0.5, 0.3] : [0.2, 0.3, 0.2]
              }}
              transition={{ 
                pathLength: { duration: 1.5, ease: "easeOut" },
                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Main energy beam */}
            <motion.line
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke={`url(#beam-gradient-${index})`}
              strokeWidth={beamWidth}
              strokeLinecap="round"
              opacity={1}
              filter={undefined}
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                strokeWidth: isActive ? [beamWidth, beamWidth * 1.2, beamWidth] : beamWidth
              }}
              transition={{ 
                pathLength: { duration: 1.5, ease: "easeOut" },
                strokeWidth: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Energy flow particles */}
            {[0, 0.33, 0.66].map((offset, i) => (
              <motion.circle
                key={`particle-${index}-${i}`}
                r={isActive ? "6" : "4"}
                fill="#ffffff"
                filter={`url(#beam-glow-${index})`}
                initial={{
                  cx: conn.from.x,
                  cy: conn.from.y
                }}
                animate={{
                  cx: [conn.from.x, conn.to.x, conn.from.x],
                  cy: [conn.from.y, conn.to.y, conn.from.y],
                  r: isActive ? [6, 8, 6] : [4, 5, 4],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: offset * 6
                }}
              />
            ))}
            
            {/* Reverse flow particles */}
            {[0.16, 0.5, 0.83].map((offset, i) => (
              <motion.circle
                key={`reverse-particle-${index}-${i}`}
                r={isActive ? "5" : "3"}
                fill={moduleColors[conn.to.id]?.secondary || '#e9d5ff'}
                initial={{
                  cx: conn.to.x,
                  cy: conn.to.y
                }}
                animate={{
                  cx: [conn.to.x, conn.from.x, conn.to.x],
                  cy: [conn.to.y, conn.from.y, conn.to.y],
                  opacity: [0, 0.8, 0.8, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: offset * 6
                }}
              >
                <animate
                  attributeName="fill"
                  values={`${moduleColors[conn.to.id]?.secondary || '#e9d5ff'};${moduleColors[conn.to.id]?.primary || '#a855f7'};${moduleColors[conn.to.id]?.tertiary || '#c084fc'};${moduleColors[conn.to.id]?.secondary || '#e9d5ff'}`}
                  dur="4s"
                  repeatCount="indefinite"
                />
              </motion.circle>
            ))}
            
            {/* Explosion effects at connection points */}
            <motion.circle
              cx={conn.to.x}
              cy={conn.to.y}
              r="5"
              fill={moduleColors[conn.to.id]?.primary || '#a855f7'}
              animate={{
                r: isActive ? [5, 20, 5] : [5, 10, 5],
                opacity: isActive ? [0.8, 0, 0.8] : [0.4, 0, 0.4]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.3
              }}
            />
          </g>
        )
      })}
      
      {/* Central pulse effect for all connections */}
      {hoveredModule && (
        <motion.circle
          cx={connections[0]?.from.x || 0}
          cy={connections[0]?.from.y || 0}
          r="50"
          fill="none"
          stroke="url(#beam-gradient-0)"
          strokeWidth="2"
          initial={{ r: 50, opacity: 0 }}
          animate={{
            r: [50, 200, 50],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      )}
    </svg>
  )
}