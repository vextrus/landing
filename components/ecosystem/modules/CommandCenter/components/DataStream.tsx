'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface DataStreamProps {
  streams: Array<{
    id: string
    source: string
    target: string
    data: any
    timestamp: Date
  }>
}

interface Particle {
  id: string
  x: number
  y: number
  targetX: number
  targetY: number
  speed: number
  color: string
  size: number
  opacity: number
}

const streamSources = [
  { id: 'iot', name: 'IoT Sensors', x: 100, y: 200, color: '#14B8A6' },
  { id: 'workers', name: 'Worker Systems', x: 100, y: 300, color: '#22C55E' },
  { id: 'equipment', name: 'Equipment GPS', x: 100, y: 400, color: '#F59E0B' },
  { id: 'weather', name: 'Weather API', x: 100, y: 500, color: '#06B6D4' },
  { id: 'finance', name: 'Financial Data', x: 100, y: 600, color: '#8B5CF6' }
]

const streamTargets = [
  { id: 'ai-core', name: 'AI Core', x: 700, y: 350, color: '#8B5CF6' },
  { id: 'analytics', name: 'Analytics Engine', x: 700, y: 250, color: '#3B82F6' },
  { id: 'alerts', name: 'Alert System', x: 700, y: 450, color: '#EF4444' }
]

export default function DataStream({ streams }: DataStreamProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set())
  const particleIdCounter = useRef(0)

  // Create particles for data streams
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly activate connections
      const newConnections = new Set<string>()
      streamSources.forEach(source => {
        if (Math.random() > 0.7) {
          const target = streamTargets[Math.floor(Math.random() * streamTargets.length)]
          newConnections.add(`${source.id}-${target.id}`)
          
          // Create new particle
          const newParticle: Particle = {
            id: `particle-${particleIdCounter.current++}-${source.id}-${target.id}`,
            x: source.x,
            y: source.y,
            targetX: target.x,
            targetY: target.y,
            speed: 0.02 + Math.random() * 0.03,
            color: source.color,
            size: 4 + Math.random() * 4,
            opacity: 0.8
          }
          
          setParticles(prev => [...prev, newParticle])
        }
      })
      
      setActiveConnections(newConnections)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Update particle positions
  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setParticles(prev => {
        return prev.filter(particle => {
          // Calculate distance to target
          const dx = particle.targetX - particle.x
          const dy = particle.targetY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // If reached target, remove particle
          if (distance < 5) {
            return false
          }
          
          // Move particle towards target
          particle.x += dx * particle.speed
          particle.y += dy * particle.speed
          
          // Fade out as it approaches target
          particle.opacity = Math.min(0.8, distance / 100)
          
          return true
        })
      })
      
      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
      <defs>
        {/* Glow filters */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Gradients for connections */}
        {streamSources.map(source => (
          <linearGradient key={`grad-${source.id}`} id={`gradient-${source.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={source.color} stopOpacity="0.2" />
            <stop offset="50%" stopColor={source.color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={source.color} stopOpacity="0.2" />
          </linearGradient>
        ))}
      </defs>

      {/* Connection Lines */}
      {streamSources.map(source => 
        streamTargets.map(target => {
          const connectionId = `${source.id}-${target.id}`
          const isActive = activeConnections.has(connectionId)
          
          return (
            <motion.line
              key={connectionId}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={`url(#gradient-${source.id})`}
              strokeWidth={isActive ? 2 : 1}
              animate={{
                opacity: isActive ? [0.3, 0.6, 0.3] : 0.1,
                strokeWidth: isActive ? [1, 2, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0
              }}
            />
          )
        })
      )}

      {/* Source Nodes */}
      {streamSources.map(source => (
        <g key={source.id}>
          <motion.circle
            cx={source.x}
            cy={source.y}
            r="20"
            fill={`${source.color}20`}
            stroke={source.color}
            strokeWidth="2"
            filter="url(#glow)"
            animate={{
              r: [20, 22, 20],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
          <text
            x={source.x}
            y={source.y - 30}
            textAnchor="middle"
            fill="white"
            fontSize="12"
            className="font-medium"
          >
            {source.name}
          </text>
        </g>
      ))}

      {/* Target Nodes */}
      {streamTargets.map(target => (
        <g key={target.id}>
          <motion.rect
            x={target.x - 25}
            y={target.y - 25}
            width="50"
            height="50"
            rx="10"
            fill={`${target.color}20`}
            stroke={target.color}
            strokeWidth="2"
            filter="url(#glow)"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
          <text
            x={target.x}
            y={target.y - 35}
            textAnchor="middle"
            fill="white"
            fontSize="12"
            className="font-medium"
          >
            {target.name}
          </text>
        </g>
      ))}

      {/* Data Particles */}
      {particles.map(particle => (
        <motion.circle
          key={particle.id}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill={particle.color}
          opacity={particle.opacity}
          filter="url(#glow)"
        />
      ))}

      {/* Stream Labels */}
      <text x="50" y="150" fill="white" fontSize="14" className="font-semibold opacity-70">
        Data Sources
      </text>
      <text x="650" y="150" fill="white" fontSize="14" className="font-semibold opacity-70">
        Processing
      </text>
    </svg>
  )
}