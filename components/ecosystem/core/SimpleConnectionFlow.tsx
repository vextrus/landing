'use client'

import { motion } from 'framer-motion'

interface SimpleConnectionFlowProps {
  connections: Array<{
    from: { x: number; y: number; id: string }
    to: { x: number; y: number; id: string }
    active: boolean
    color?: string
  }>
  hoveredModule?: string | null
}

export default function SimpleConnectionFlow({ connections, hoveredModule }: SimpleConnectionFlowProps) {
  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Gradient for connections */}
        <linearGradient id="connection-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Animated gradient for active connections */}
        <linearGradient id="connection-active" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7">
            <animate attributeName="stop-opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#c084fc">
            <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#e879f9">
            <animate attributeName="stop-opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Draw all connections */}
      {connections.map((conn, index) => {
        const isActive = conn.active || conn.from.id === hoveredModule || conn.to.id === hoveredModule
        
        return (
          <g key={`connection-${index}`}>
            {/* Base connection line - always visible with animation */}
            <motion.line
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke={isActive ? "url(#connection-active)" : "url(#connection-purple)"}
              strokeWidth={isActive ? 5 : 2}
              opacity={isActive ? 1 : 0.3}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                opacity: isActive ? [1, 1, 1] : [0.2, 0.4, 0.2],
                strokeWidth: isActive ? [5, 5, 5] : [2, 2.5, 2]
              }}
              transition={{ 
                pathLength: { duration: 1, ease: "easeOut" },
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                strokeWidth: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Always animating particles - for all connections */}
            <motion.circle
              r={isActive ? "5" : "3"}
              fill={isActive ? "#ffffff" : "#e9d5ff"}
              filter={isActive ? "url(#glow)" : undefined}
              initial={{
                cx: conn.from.x,
                cy: conn.from.y
              }}
              animate={{
                cx: [conn.from.x, conn.to.x, conn.from.x],
                cy: [conn.from.y, conn.to.y, conn.from.y]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5 // Stagger the animations
              }}
            >
              <animate
                attributeName="opacity"
                values={isActive ? "0;1;1;0" : "0;0.6;0.6;0"}
                dur="4s"
                repeatCount="indefinite"
              />
            </motion.circle>
            
            {/* Secondary particle with opposite direction */}
            <motion.circle
              r={isActive ? "4" : "2"}
              fill={isActive ? "#e9d5ff" : "#f3e8ff"}
              initial={{
                cx: conn.to.x,
                cy: conn.to.y
              }}
              animate={{
                cx: [conn.to.x, conn.from.x, conn.to.x],
                cy: [conn.to.y, conn.from.y, conn.to.y]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5 + 2 // Offset from first particle
              }}
            >
              <animate
                attributeName="opacity"
                values={isActive ? "0;0.8;0.8;0" : "0;0.4;0.4;0"}
                dur="4s"
                repeatCount="indefinite"
              />
            </motion.circle>
          </g>
        )
      })}
      
      {/* Enhanced connection effects - always visible but stronger on hover */}
      {connections.map((conn, index) => {
        const isActive = conn.active || conn.from.id === hoveredModule || conn.to.id === hoveredModule
        
        return (
          <g key={`effects-${index}`}>
            {/* Energy pulse at connection points */}
            <motion.circle
              cx={conn.to.x}
              cy={conn.to.y}
              r="8"
              fill={conn.color || '#a855f7'}
              opacity="0"
              animate={{
                r: isActive ? [8, 20, 8] : [8, 12, 8],
                opacity: isActive ? [0.4, 0, 0.4] : [0.2, 0, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.4
              }}
            />
          </g>
        )
      })}
    </svg>
  )
}