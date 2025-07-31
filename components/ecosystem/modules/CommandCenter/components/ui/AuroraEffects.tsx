'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLiquidGlassDark } from '../../theme/liquidGlassDark'

// Aurora Background Component
export function AuroraBackground() {
  const theme = useLiquidGlassDark()
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme.gradients.cosmic,
        }}
      />
      
      {/* Animated aurora layers */}
      {theme.effects.auroraLayers.map((layer, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          style={{
            background: layer.gradient,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Nebula overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: theme.gradients.nebula,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}

// Particle System Component
interface ParticleSystemProps {
  count?: number
  color?: string
}

export function ParticleSystem({ count = 50, color }: ParticleSystemProps) {
  const theme = useLiquidGlassDark()
  const particleColor = color || theme.effects.particles.color
  
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particleColor,
            boxShadow: `0 0 ${particle.size * 2}px ${particleColor}`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// Neural Network Grid Component
export function NeuralGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme = useLiquidGlassDark()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    // Grid configuration
    const gridSize = 50
    const nodeRadius = 2
    const connectionDistance = 100
    
    // Create nodes
    const nodes: Array<{ x: number; y: number; connections: number[] }> = []
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        nodes.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          connections: [],
        })
      }
    }
    
    // Find connections
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          )
          if (distance < connectionDistance) {
            node.connections.push(j)
          }
        }
      })
    })
    
    // Animation
    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw connections
      ctx.strokeStyle = theme.effects.neuralNetwork.color
      ctx.lineWidth = theme.effects.neuralNetwork.width
      
      nodes.forEach((node, i) => {
        node.connections.forEach((j) => {
          const other = nodes[j]
          if (!other) return
          
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(other.x, other.y)
          ctx.stroke()
          
          // Pulse effect
          const pulseProgress = (frame + i * 10) % 100 / 100
          if (pulseProgress < 0.1) {
            ctx.strokeStyle = theme.effects.neuralNetwork.pulseColor
            ctx.lineWidth = theme.effects.neuralNetwork.width * 2
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
            ctx.strokeStyle = theme.effects.neuralNetwork.color
            ctx.lineWidth = theme.effects.neuralNetwork.width
          }
        })
      })
      
      // Draw nodes
      ctx.fillStyle = theme.effects.neuralNetwork.color
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)
        ctx.fill()
      })
      
      frame++
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [theme])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20 pointer-events-none"
    />
  )
}

// Glow Orb Component
interface GlowOrbProps {
  color?: string
  size?: number
  intensity?: number
  position?: { x: number; y: number }
}

export function GlowOrb({ color, size = 200, intensity = 0.5, position }: GlowOrbProps) {
  const theme = useLiquidGlassDark()
  const orbColor = color || theme.colors.accent.primary
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: position?.x || '50%',
        top: position?.y || '50%',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${orbColor}${Math.round(intensity * 255).toString(16)} 0%, transparent 70%)`,
        filter: `blur(${size / 4}px)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [intensity * 0.8, intensity, intensity * 0.8],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Energy Beam Component
interface EnergyBeamProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color?: string
  width?: number
  animated?: boolean
}

export function EnergyBeam({ from, to, color, width = 2, animated = true }: EnergyBeamProps) {
  const theme = useLiquidGlassDark()
  const beamColor = color || theme.colors.accent.primary
  
  const distance = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2))
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: from.x,
        top: from.y,
        width: distance,
        height: width,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 50%',
      }}
    >
      {/* Beam core */}
      <div
        className="absolute inset-0"
        style={{
          background: beamColor,
          boxShadow: `0 0 ${width * 4}px ${beamColor}`,
        }}
      />
      
      {/* Animated pulse */}
      {animated && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${beamColor} 50%, transparent 100%)`,
          }}
          animate={{
            x: [-distance, distance],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  )
}

// Holographic Shimmer Component
export function HolographicShimmer() {
  const theme = useLiquidGlassDark()
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `linear-gradient(105deg, 
          transparent 40%, 
          ${theme.colors.accent.primary}20 45%, 
          ${theme.colors.accent.secondary}20 50%, 
          ${theme.colors.accent.tertiary}20 55%, 
          transparent 60%
        )`,
        backgroundSize: '200% 200%',
      }}
      animate={{
        backgroundPosition: ['200% 0%', '-200% 0%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}