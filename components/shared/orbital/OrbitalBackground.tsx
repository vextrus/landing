'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface OrbitalBackgroundProps {
  variant?: 'aurora' | 'neural' | 'gradient' | 'particles'
  intensity?: number
  color?: string
  className?: string
}

export default function OrbitalBackground({
  variant = 'aurora',
  intensity = 0.6,
  color = 'purple',
  className = ''
}: OrbitalBackgroundProps) {
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

  if (variant === 'aurora') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Aurora layers */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse at 20% 30%, rgba(139,92,246,${intensity * 0.3}) 0%, transparent 70%)`,
              `radial-gradient(ellipse at 80% 60%, rgba(236,72,153,${intensity * 0.3}) 0%, transparent 70%)`,
              `radial-gradient(ellipse at 50% 80%, rgba(6,182,212,${intensity * 0.3}) 0%, transparent 70%)`,
              `radial-gradient(ellipse at 20% 30%, rgba(139,92,246,${intensity * 0.3}) 0%, transparent 70%)`
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              background: `radial-gradient(circle, rgba(139,92,246,${intensity * 0.2}) 0%, transparent 60%)`,
              filter: 'blur(40px)'
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              delay: i * 2
            }}
            initial={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'neural') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={intensity * 0.3} />
              <stop offset="50%" stopColor="#ec4899" stopOpacity={intensity * 0.2} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={intensity * 0.3} />
            </linearGradient>
          </defs>
          
          {/* Neural network connections */}
          {dimensions.width > 0 && [...Array(15)].map((_, i) => {
            const x1 = Math.random() * dimensions.width
            const y1 = Math.random() * dimensions.height
            const x2 = Math.random() * dimensions.width
            const y2 = Math.random() * dimensions.height
            
            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#neural-gradient)"
                strokeWidth="1"
                opacity={0}
                animate={{
                  opacity: [0, intensity * 0.5, 0],
                  pathLength: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            )
          })}
          
          {/* Neural nodes */}
          {dimensions.width > 0 && [...Array(20)].map((_, i) => {
            const cx = Math.random() * dimensions.width
            const cy = Math.random() * dimensions.height
            
            return (
              <motion.circle
                key={`node-${i}`}
                cx={cx}
                cy={cy}
                r="3"
                fill="#8b5cf6"
                opacity={0}
                animate={{
                  opacity: [0, intensity, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            )
          })}
        </svg>
      </div>
    )
  }

  if (variant === 'particles') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-400"
            initial={{
              x: Math.random() * (dimensions.width || 1000),
              y: dimensions.height || 1000
            }}
            animate={{
              y: -50,
              opacity: [0, intensity, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "linear"
            }}
          />
        ))}
      </div>
    )
  }

  // Default gradient variant
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            rgba(139,92,246,${intensity * 0.1}) 0%, 
            rgba(236,72,153,${intensity * 0.05}) 25%, 
            rgba(6,182,212,${intensity * 0.1}) 50%,
            rgba(34,197,94,${intensity * 0.05}) 75%,
            rgba(139,92,246,${intensity * 0.1}) 100%)`,
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}