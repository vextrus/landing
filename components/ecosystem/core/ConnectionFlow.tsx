'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ConnectionFlowProps {
  connections: Array<{
    from: { x: number; y: number; id: string }
    to: { x: number; y: number; id: string }
    active: boolean
    color?: string
  }>
  hoveredModule?: string | null
  centerPosition: { x: number; y: number }
}

export default function ConnectionFlow({ connections, hoveredModule, centerPosition }: ConnectionFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  
  useEffect(() => {
    console.log('🔴 ConnectionFlow mounted with:', {
      connections: connections.length,
      hoveredModule,
      centerPosition
    })
    
    const canvas = canvasRef.current
    if (!canvas) {
      console.error('🔴 ConnectionFlow: Canvas ref is null!')
      return
    }
    
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) {
      console.error('🔴 ConnectionFlow: Cannot get 2D context!')
      return
    }
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      console.log('🔴 Canvas rect:', rect)
      
      if (rect.width === 0 || rect.height === 0) {
        console.error('🔴 Canvas has zero dimensions!')
        // Try parent dimensions
        const parent = canvas.parentElement
        if (parent) {
          const parentRect = parent.getBoundingClientRect()
          console.log('🔴 Parent rect:', parentRect)
          canvas.style.width = parentRect.width + 'px'
          canvas.style.height = parentRect.height + 'px'
          canvas.width = parentRect.width * window.devicePixelRatio
          canvas.height = parentRect.height * window.devicePixelRatio
        }
      } else {
        canvas.width = rect.width * window.devicePixelRatio
        canvas.height = rect.height * window.devicePixelRatio
      }
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Energy flow particles
    interface EnergyParticle {
      position: number // 0 to 1 along the path
      speed: number
      size: number
      opacity: number
      color: string
      connectionIndex: number
    }
    
    const particles: EnergyParticle[] = []
    
    // Initialize particles for ALL connections for better visibility
    connections.forEach((conn, index) => {
      // Create continuous stream of particles for all connections
      const particleCount = conn.active || conn.from.id === hoveredModule || conn.to.id === hoveredModule ? 20 : 10
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          position: i / particleCount,
          speed: 0.004 + Math.random() * 0.003,
          size: 4 + Math.random() * 4,
          opacity: (conn.active || conn.from.id === hoveredModule || conn.to.id === hoveredModule) ? 0.7 + Math.random() * 0.3 : 0.4 + Math.random() * 0.2,
          color: conn.color || '#a855f7',
          connectionIndex: index
        })
      }
    })
    
    console.log('🔴 Starting animation with', particles.length, 'particles')
    
    const animate = () => {
      timeRef.current += 0.016 // ~60fps
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Debug: Draw a visible rectangle to ensure canvas is working
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
      ctx.fillRect(0, 0, 100, 100)
      
      // Draw connections
      connections.forEach((conn, index) => {
        const isActive = conn.active || conn.from.id === hoveredModule || conn.to.id === hoveredModule
        
        // Calculate curved path
        const dx = conn.to.x - conn.from.x
        const dy = conn.to.y - conn.from.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Control point for quadratic curve
        const midX = (conn.from.x + conn.to.x) / 2
        const midY = (conn.from.y + conn.to.y) / 2
        const offsetX = -dy / distance * 30
        const offsetY = dx / distance * 30
        const ctrlX = midX + offsetX
        const ctrlY = midY + offsetY
        
        // Draw base connection line - VERY VISIBLE for debugging
        ctx.strokeStyle = isActive ? '#ff00ff' : '#00ff00'
        ctx.lineWidth = isActive ? 8 : 4
        ctx.beginPath()
        ctx.moveTo(conn.from.x, conn.from.y)
        ctx.quadraticCurveTo(ctrlX, ctrlY, conn.to.x, conn.to.y)
        ctx.stroke()
        
        // Debug: Draw endpoints
        ctx.fillStyle = '#ff0000'
        ctx.beginPath()
        ctx.arc(conn.from.x, conn.from.y, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(conn.to.x, conn.to.y, 5, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw flowing gradient for active connections
        if (isActive) {
          const gradient = ctx.createLinearGradient(conn.from.x, conn.from.y, conn.to.x, conn.to.y)
          const offset = (timeRef.current * 0.5) % 1
          
          gradient.addColorStop(Math.max(0, offset - 0.2), 'transparent')
          gradient.addColorStop(offset, conn.color || '#a855f7')
          gradient.addColorStop(Math.min(1, offset + 0.2), 'transparent')
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = 4
          ctx.globalAlpha = 0.8
          ctx.beginPath()
          ctx.moveTo(conn.from.x, conn.from.y)
          ctx.quadraticCurveTo(ctrlX, ctrlY, conn.to.x, conn.to.y)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      })
      
      // Draw energy particles
      particles.forEach((particle) => {
        const conn = connections[particle.connectionIndex]
        if (!conn) return
        
        // Update particle position
        particle.position += particle.speed
        if (particle.position > 1) {
          particle.position = 0
          particle.size = 4 + Math.random() * 4
          particle.opacity = 0.7 + Math.random() * 0.3
        }
        
        // Calculate position on curve
        const t = particle.position
        const dx = conn.to.x - conn.from.x
        const dy = conn.to.y - conn.from.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const midX = (conn.from.x + conn.to.x) / 2
        const midY = (conn.from.y + conn.to.y) / 2
        const offsetX = -dy / distance * 30
        const offsetY = dx / distance * 30
        const ctrlX = midX + offsetX
        const ctrlY = midY + offsetY
        
        // Quadratic Bezier curve calculation
        const x = (1 - t) * (1 - t) * conn.from.x + 2 * (1 - t) * t * ctrlX + t * t * conn.to.x
        const y = (1 - t) * (1 - t) * conn.from.y + 2 * (1 - t) * t * ctrlY + t * t * conn.to.y
        
        // Draw particle with enhanced glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 4)
        glow.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`)
        glow.addColorStop(0.2, `${particle.color}B0`)
        glow.addColorStop(0.5, `${particle.color}60`)
        glow.addColorStop(1, 'transparent')
        
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, particle.size * 4, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw particle core
        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = 0.9
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })
      
      // Draw neural pulses from center
      if (hoveredModule) {
        const pulseRadius = (timeRef.current * 100) % 200
        const pulseOpacity = Math.max(0, 1 - pulseRadius / 200)
        
        ctx.strokeStyle = `rgba(168, 85, 247, ${pulseOpacity * 0.5})`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(centerPosition.x, centerPosition.y, pulseRadius, 0, Math.PI * 2)
        ctx.stroke()
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [connections, hoveredModule, centerPosition])
  
  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255, 0, 0, 0.05)' }}
      />
      
      {/* SVG for enhanced effects */}
      <svg className="absolute inset-0 pointer-events-none">
        <defs>
          {/* Animated gradient for quantum effect */}
          <linearGradient id="quantum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="connection-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Quantum entanglement effect for hovered connections */}
        {hoveredModule && connections.map((conn, index) => {
          if (conn.from.id !== hoveredModule && conn.to.id !== hoveredModule) return null
          
          return (
            <motion.line
              key={`quantum-${index}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="url(#quantum-gradient)"
              strokeWidth="2"
              filter="url(#connection-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )
        })}
      </svg>
    </>
  )
}