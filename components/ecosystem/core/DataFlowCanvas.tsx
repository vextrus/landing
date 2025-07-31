'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface DataFlowCanvasProps {
  activeModule?: string | null
  hoveredModule?: string | null
  modulePositions?: Record<string, { x: number; y: number }>
  showBackground?: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  speed: number
  color: string
  size: number
  opacity: number
  trail: { x: number; y: number; opacity: number }[]
  type: 'data' | 'neural' | 'ambient'
  lifetime: number
  maxLifetime: number
  sourceModule?: string
  targetModule?: string
}

interface NeuralPulse {
  x: number
  y: number
  radius: number
  opacity: number
  color: string
}

const moduleColors: Record<string, string> = {
  command: '#0F172A',
  financial: '#14B8A6',
  sales: '#22C55E',
  procurement: '#F59E0B',
  quality: '#8B5CF6',
  hr: '#EF4444',
  analytics: '#06B6D4',
  brain: '#a855f7'
}

export default function DataFlowCanvas({ 
  activeModule, 
  hoveredModule, 
  modulePositions,
  showBackground = true 
}: DataFlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const pulsesRef = useRef<NeuralPulse[]>([])
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const timeRef = useRef(0)

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let particleId = 0

    // Create ambient particles
    const createAmbientParticle = () => {
      // Use predefined colors instead of HSL for compatibility
      const colors = ['#6366f1', '#a855f7', '#ec4899', '#06b6d4', '#8b5cf6']
      return {
        id: particleId++,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        targetX: 0,
        targetY: 0,
        speed: 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        trail: [],
        type: 'ambient' as const,
        lifetime: 0,
        maxLifetime: 1000
      }
    }

    // Create data flow particle
    const createDataParticle = (source: string, target: string) => {
      if (!modulePositions || !modulePositions[source] || !modulePositions[target]) return null
      
      const sourcePos = modulePositions[source]
      const targetPos = modulePositions[target]
      
      return {
        id: particleId++,
        x: sourcePos.x,
        y: sourcePos.y,
        vx: 0,
        vy: 0,
        targetX: targetPos.x,
        targetY: targetPos.y,
        speed: 2 + Math.random() * 2,
        color: moduleColors[target] || '#a855f7',
        size: 3 + Math.random() * 2,
        opacity: 0.8,
        trail: [],
        type: 'data' as const,
        lifetime: 0,
        maxLifetime: 200,
        sourceModule: source,
        targetModule: target
      }
    }

    // Initialize ambient particles
    for (let i = 0; i < 50; i++) {
      const particle = createAmbientParticle()
      if (particle) particlesRef.current.push(particle)
    }

    const animate = () => {
      timeRef.current += 1
      
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = showBackground ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Background grid effect
      if (showBackground && timeRef.current % 5 === 0) {
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.02)'
        ctx.lineWidth = 0.5
        
        // Draw subtle grid
        const gridSize = 50
        for (let x = 0; x < dimensions.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, dimensions.height)
          ctx.stroke()
        }
        for (let y = 0; y < dimensions.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(dimensions.width, y)
          ctx.stroke()
        }
      }

      // Create data particles when modules are active
      if (modulePositions && hoveredModule && Math.random() > 0.9) {
        const connections = Object.keys(modulePositions).filter(m => m !== hoveredModule)
        const target = connections[Math.floor(Math.random() * connections.length)]
        const particle = createDataParticle('brain', target)
        if (particle) particlesRef.current.push(particle)
      }

      // Update and draw neural pulses
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = pulsesRef.current[i]
        pulse.radius += 2
        pulse.opacity -= 0.01
        
        if (pulse.opacity <= 0) {
          pulsesRef.current.splice(i, 1)
          continue
        }
        
        ctx.strokeStyle = pulse.color + Math.floor(pulse.opacity * 255).toString(16).padStart(2, '0')
        ctx.lineWidth = 2 * pulse.opacity
        ctx.beginPath()
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i]
        particle.lifetime++

        // Remove old particles
        if (particle.lifetime > particle.maxLifetime) {
          particlesRef.current.splice(i, 1)
          
          // Create pulse at destination for data particles
          if (particle.type === 'data' && modulePositions && particle.targetModule) {
            const pos = modulePositions[particle.targetModule]
            pulsesRef.current.push({
              x: pos.x,
              y: pos.y,
              radius: 5,
              opacity: 0.5,
              color: particle.color
            })
          }
          continue
        }

        // Update position based on type
        if (particle.type === 'ambient') {
          // Ambient particles float randomly
          particle.x += particle.vx
          particle.y += particle.vy
          
          // Wrap around edges
          if (particle.x < 0) particle.x = dimensions.width
          if (particle.x > dimensions.width) particle.x = 0
          if (particle.y < 0) particle.y = dimensions.height
          if (particle.y > dimensions.height) particle.y = 0
          
          // Add slight randomness
          particle.vx += (Math.random() - 0.5) * 0.01
          particle.vy += (Math.random() - 0.5) * 0.01
          
          // Damping
          particle.vx *= 0.99
          particle.vy *= 0.99
        } else if (particle.type === 'data') {
          // Data particles move towards target
          const dx = particle.targetX - particle.x
          const dy = particle.targetY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 5) {
            const moveX = (dx / distance) * particle.speed
            const moveY = (dy / distance) * particle.speed
            particle.x += moveX
            particle.y += moveY
            particle.vx = moveX
            particle.vy = moveY
          } else {
            particle.lifetime = particle.maxLifetime // Trigger removal
          }
        }

        // Update trail
        particle.trail.push({ 
          x: particle.x, 
          y: particle.y, 
          opacity: particle.opacity 
        })
        
        if (particle.trail.length > 20) {
          particle.trail.shift()
        }

        // Draw trail
        if (particle.type === 'data') {
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          
          for (let j = 1; j < particle.trail.length; j++) {
            const prevPoint = particle.trail[j - 1]
            const point = particle.trail[j]
            const progress = j / particle.trail.length
            
            ctx.strokeStyle = particle.color + Math.floor(progress * particle.opacity * 100).toString(16).padStart(2, '0')
            ctx.lineWidth = particle.size * progress
            
            ctx.beginPath()
            ctx.moveTo(prevPoint.x, prevPoint.y)
            ctx.lineTo(point.x, point.y)
            ctx.stroke()
          }
        }

        // Draw particle
        const glowSize = particle.type === 'data' ? 3 : 2
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * glowSize
        )
        gradient.addColorStop(0, particle.color + 'ff')
        gradient.addColorStop(0.5, particle.color + '40')
        gradient.addColorStop(1, particle.color + '00')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * glowSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Core
        ctx.fillStyle = particle.type === 'data' ? '#ffffff' : particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Maintain particle count
      while (particlesRef.current.filter(p => p.type === 'ambient').length < 50) {
        const particle = createAmbientParticle()
        if (particle) particlesRef.current.push(particle)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, hoveredModule, activeModule, modulePositions, showBackground])

  return (
    <motion.canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ 
        mixBlendMode: 'screen',
        filter: 'contrast(1.1) brightness(1.1)'
      }}
    />
  )
}