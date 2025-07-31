'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AuroraNeuralGridProps {
  intensity?: number
  colorScheme?: 'purple' | 'blue' | 'green'
}

export default function AuroraNeuralGrid({ 
  intensity = 0.3, 
  colorScheme = 'purple' 
}: AuroraNeuralGridProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const colors = {
    purple: {
      primary: 'rgba(139, 92, 246, $opacity)',
      secondary: 'rgba(236, 72, 153, $opacity)',
      tertiary: 'rgba(168, 85, 247, $opacity)'
    },
    blue: {
      primary: 'rgba(99, 102, 241, $opacity)',
      secondary: 'rgba(6, 182, 212, $opacity)',
      tertiary: 'rgba(59, 130, 246, $opacity)'
    },
    green: {
      primary: 'rgba(34, 197, 94, $opacity)',
      secondary: 'rgba(20, 184, 166, $opacity)',
      tertiary: 'rgba(16, 185, 129, $opacity)'
    }
  }

  const getColor = (color: string, opacity: number) => {
    return color.replace('$opacity', opacity.toString())
  }

  const scheme = colors[colorScheme]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora waves - multiple layers for depth */}
      <div className="absolute inset-0">
        {/* Layer 1 - Slow moving background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse at 0% 0%, ${getColor(scheme.primary, intensity * 0.3)} 0%, transparent 50%)`,
              `radial-gradient(ellipse at 100% 100%, ${getColor(scheme.secondary, intensity * 0.3)} 0%, transparent 50%)`,
              `radial-gradient(ellipse at 0% 100%, ${getColor(scheme.tertiary, intensity * 0.3)} 0%, transparent 50%)`,
              `radial-gradient(ellipse at 100% 0%, ${getColor(scheme.primary, intensity * 0.3)} 0%, transparent 50%)`,
              `radial-gradient(ellipse at 0% 0%, ${getColor(scheme.primary, intensity * 0.3)} 0%, transparent 50%)`
            ]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ filter: 'blur(100px)' }}
        />
        
        {/* Layer 2 - Medium speed aurora */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse at 20% 80%, ${getColor(scheme.secondary, intensity * 0.4)} 0%, transparent 40%)`,
              `radial-gradient(ellipse at 80% 20%, ${getColor(scheme.primary, intensity * 0.4)} 0%, transparent 40%)`,
              `radial-gradient(ellipse at 50% 50%, ${getColor(scheme.tertiary, intensity * 0.4)} 0%, transparent 40%)`,
              `radial-gradient(ellipse at 20% 80%, ${getColor(scheme.secondary, intensity * 0.4)} 0%, transparent 40%)`
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: 'blur(80px)' }}
        />
        
        {/* Layer 3 - Fast moving highlights */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 30% 30%, ${getColor(scheme.tertiary, intensity * 0.2)} 0%, transparent 30%)`,
              `radial-gradient(circle at 70% 70%, ${getColor(scheme.primary, intensity * 0.2)} 0%, transparent 30%)`,
              `radial-gradient(circle at 30% 70%, ${getColor(scheme.secondary, intensity * 0.2)} 0%, transparent 30%)`,
              `radial-gradient(circle at 70% 30%, ${getColor(scheme.tertiary, intensity * 0.2)} 0%, transparent 30%)`,
              `radial-gradient(circle at 30% 30%, ${getColor(scheme.tertiary, intensity * 0.2)} 0%, transparent 30%)`
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: 'blur(60px)' }}
        />
      </div>
      
      {/* Neural grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: intensity * 0.1 }}
      >
        <defs>
          <pattern
            id="neural-grid"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Grid lines */}
            <line x1="0" y1="0" x2="0" y2="100" stroke={getColor(scheme.primary, 0.3)} strokeWidth="0.5" />
            <line x1="0" y1="0" x2="100" y2="0" stroke={getColor(scheme.primary, 0.3)} strokeWidth="0.5" />
            
            {/* Neural nodes at intersections */}
            <circle cx="0" cy="0" r="2" fill={getColor(scheme.secondary, 0.5)} />
            <circle cx="100" cy="0" r="2" fill={getColor(scheme.secondary, 0.5)} />
            <circle cx="0" cy="100" r="2" fill={getColor(scheme.secondary, 0.5)} />
            <circle cx="100" cy="100" r="2" fill={getColor(scheme.secondary, 0.5)} />
          </pattern>
          
          {/* Pulsing gradient for grid */}
          <radialGradient id="grid-pulse">
            <stop offset="0%" stopColor={getColor(scheme.primary, 0.3)}>
              <animate
                attributeName="stop-opacity"
                values="0.1;0.3;0.1"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor={getColor(scheme.primary, 0)} />
          </radialGradient>
        </defs>
        
        {/* Apply the grid pattern */}
        <rect width="100%" height="100%" fill="url(#neural-grid)" />
        
        {/* Animated pulse overlay */}
        <motion.circle
          r="300"
          fill="url(#grid-pulse)"
          animate={{
            cx: [0, dimensions.width, dimensions.width, 0, 0],
            cy: [0, 0, dimensions.height, dimensions.height, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      
      {/* Depth enhancement - subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(255, 255, 255, ${intensity * 0.05}) 100%)`
        }}
      />
    </div>
  )
}