'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  connections: number[]
}

interface NeuralParticlesProps {
  count?: number
  className?: string
  connectionDistance?: number
  speed?: number
  colors?: string[]
}

export default function NeuralParticles({ 
  count = 50,
  className = '',
  connectionDistance = 150,
  speed = 0.5,
  colors = ['#6366F1', '#8B5CF6', '#EC4899', '#14B8A6']
}: NeuralParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  // Initialize particles
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return
    
    // Create particles
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      connections: []
    }))
  }, [count, dimensions, speed, colors])
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = dimensions.width
    canvas.height = dimensions.height
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      
      // Update particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Bounce off walls
        if (particle.x <= 0 || particle.x >= dimensions.width) {
          particle.vx = -particle.vx
        }
        if (particle.y <= 0 || particle.y >= dimensions.height) {
          particle.vy = -particle.vy
        }
        
        // Keep in bounds
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x))
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y))
      })
      
      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            
            // Create gradient for connection
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            )
            gradient.addColorStop(0, particle.color + Math.floor(opacity * 40).toString(16))
            gradient.addColorStop(1, otherParticle.color + Math.floor(opacity * 40).toString(16))
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = opacity * 2
            ctx.stroke()
          }
        })
      })
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        )
        gradient.addColorStop(0, particle.color + 'FF')
        gradient.addColorStop(0.5, particle.color + '40')
        gradient.addColorStop(1, particle.color + '00')
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions, connectionDistance])
  
  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />
      
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0, 0.2, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 via-purple-500/10 to-transparent" />
      </motion.div>
    </div>
  )
}