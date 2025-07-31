'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Connection {
  from: { x: number; y: number; id: string }
  to: { x: number; y: number; id: string }
  active?: boolean
  color?: string
}

interface ConnectionLinesProps {
  connections: Connection[]
  showParticles?: boolean
  particleCount?: number
  animationSpeed?: number
}

interface Particle {
  id: string
  connection: Connection
  progress: number
}

export default function ConnectionLines({ 
  connections, 
  showParticles = true,
  particleCount = 3,
  animationSpeed = 2
}: ConnectionLinesProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const animationRef = useRef<number>(0)
  
  useEffect(() => {
    if (!showParticles) return
    
    // Initialize particles
    const initialParticles: Particle[] = []
    connections.forEach((connection, index) => {
      if (connection.active) {
        for (let i = 0; i < particleCount; i++) {
          initialParticles.push({
            id: `${connection.from.id}-${connection.to.id}-${i}`,
            connection,
            progress: (i / particleCount) * 100
          })
        }
      }
    })
    setParticles(initialParticles)
    
    // Animation loop
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        progress: (particle.progress + animationSpeed) % 100
      })))
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [connections, showParticles, particleCount, animationSpeed])
  
  const calculatePath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const dx = to.x - from.x
    const dy = to.y - from.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Calculate control points for curved path
    const midX = (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2
    
    // Perpendicular offset for curve
    const offsetX = -dy / distance * 30
    const offsetY = dx / distance * 30
    
    const controlX = midX + offsetX
    const controlY = midY + offsetY
    
    return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`
  }
  
  const getPointOnPath = (path: string, progress: number) => {
    // Simple linear interpolation for demo
    // In production, you'd use getPointAtLength on SVG path
    const match = path.match(/M (\d+\.?\d*) (\d+\.?\d*) Q (\d+\.?\d*) (\d+\.?\d*) (\d+\.?\d*) (\d+\.?\d*)/)
    if (!match) return { x: 0, y: 0 }
    
    const [, x1, y1, cx, cy, x2, y2] = match.map(Number)
    const t = progress / 100
    
    // Quadratic Bezier curve formula
    const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2
    const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2
    
    return { x, y }
  }
  
  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        {/* Gradient definitions */}
        <linearGradient id="connection-gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
        </linearGradient>
        
        <linearGradient id="connection-gradient-inactive" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.1" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Particle glow */}
        <filter id="particle-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Connection lines */}
      <AnimatePresence>
        {connections.map((connection) => {
          const path = calculatePath(connection.from, connection.to)
          const isActive = connection.active
          
          return (
            <motion.g key={`${connection.from.id}-${connection.to.id}`}>
              {/* Background line */}
              <motion.path
                d={path}
                fill="none"
                stroke={isActive ? "url(#connection-gradient-active)" : "url(#connection-gradient-inactive)"}
                strokeWidth={isActive ? "3" : "1"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: isActive ? 1 : 0.3
                }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                filter={isActive ? "url(#glow)" : undefined}
              />
              
              {/* Animated dash line for active connections */}
              {isActive && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="1"
                  strokeDasharray="5 10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 0.6,
                    strokeDashoffset: [0, -15]
                  }}
                  transition={{ 
                    pathLength: { duration: 0.8 },
                    strokeDashoffset: { 
                      duration: 1, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }
                  }}
                />
              )}
            </motion.g>
          )
        })}
      </AnimatePresence>
      
      {/* Particles */}
      {showParticles && particles.map((particle) => {
        const point = getPointOnPath(
          calculatePath(particle.connection.from, particle.connection.to),
          particle.progress
        )
        
        return (
          <motion.g key={particle.id}>
            {/* Particle glow */}
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="url(#connection-gradient-active)"
              opacity="0.3"
              filter="url(#particle-glow)"
            />
            
            {/* Particle core */}
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              opacity="0.9"
            />
            
            {/* Particle trail */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="none"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </motion.g>
        )
      })}
    </svg>
  )
}

// Animated connection for hover effects
export function HoverConnection({ from, to }: { from: { x: number; y: number }, to: { x: number; y: number } }) {
  const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  
  return (
    <motion.path
      d={path}
      fill="none"
      stroke="url(#connection-gradient-active)"
      strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      exit={{ pathLength: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      strokeDasharray="5 5"
    />
  )
}

// Pulse animation for active data transfer
export function DataPulse({ path, color = "#6366f1" }: { path: string, color?: string }) {
  return (
    <motion.circle r="4" fill={color}>
      <animateMotion dur="2s" repeatCount="indefinite">
        <mpath href={path} />
      </animateMotion>
    </motion.circle>
  )
}