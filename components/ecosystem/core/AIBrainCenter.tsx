'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { Brain, Sparkles, Zap, Activity, Cpu, Network } from 'lucide-react'

interface AIBrainCenterProps {
  isActive?: boolean
  insights?: number
  decisions?: number
  showDetails?: boolean
}

export default function AIBrainCenter({ 
  isActive = true, 
  insights = 1247, 
  decisions = 524,
  showDetails = true 
}: AIBrainCenterProps) {
  const [pulseScale, setPulseScale] = useState(1)
  const [showInsight, setShowInsight] = useState(false)
  const [activeRing, setActiveRing] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // Animated counter for decisions
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: decisions },
    config: { duration: 2000 }
  })

  // Modern orbital animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Orbital rings configuration
    const rings = [
      { radius: 50, nodes: 6, speed: 0.01, color: 'rgba(99, 102, 241, 0.6)' },
      { radius: 75, nodes: 8, speed: -0.008, color: 'rgba(139, 92, 246, 0.5)' },
      { radius: 100, nodes: 10, speed: 0.006, color: 'rgba(236, 72, 153, 0.4)' }
    ]
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    let phase = 0
    
    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = []

    const animate = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      phase += 0.01

      // Draw orbital rings
      rings.forEach((ring, ringIndex) => {
        const isActiveRing = ringIndex === activeRing
        
        // Draw ring path
        ctx.strokeStyle = isActiveRing ? ring.color : `${ring.color}33`
        ctx.lineWidth = isActiveRing ? 2 : 1
        ctx.setLineDash(isActiveRing ? [] : [5, 10])
        ctx.beginPath()
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
        
        // Draw nodes on ring
        for (let i = 0; i < ring.nodes; i++) {
          const angle = (i / ring.nodes) * Math.PI * 2 + phase * ring.speed
          const x = centerX + Math.cos(angle) * ring.radius
          const y = centerY + Math.sin(angle) * ring.radius
          
          // Node connections to center
          if (isActiveRing || Math.random() > 0.95) {
            const gradient = ctx.createLinearGradient(centerX, centerY, x, y)
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
            gradient.addColorStop(1, ring.color)
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(x, y)
            ctx.stroke()
            
            // Create particle at connection
            if (Math.random() > 0.98) {
              particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                color: ring.color
              })
            }
          }
          
          // Draw node
          const nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, isActiveRing ? 6 : 4)
          nodeGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
          nodeGradient.addColorStop(0.5, ring.color)
          nodeGradient.addColorStop(1, 'transparent')
          
          ctx.fillStyle = nodeGradient
          ctx.beginPath()
          ctx.arc(x, y, isActiveRing ? 6 : 4, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.02
        particle.vx *= 0.98
        particle.vy *= 0.98
        
        if (particle.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        
        ctx.fillStyle = particle.color.replace('0.4)', `${particle.life * 0.4})`)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.life * 3, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Central glow
      const centralGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40)
      centralGradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)')
      centralGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.1)')
      centralGradient.addColorStop(1, 'transparent')
      
      ctx.fillStyle = centralGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2)
      ctx.fill()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    
    // Rotate active ring
    const ringInterval = setInterval(() => {
      setActiveRing((prev) => (prev + 1) % rings.length)
    }, 3000)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearInterval(ringInterval)
    }
  }, [activeRing])

  // Pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(1.05)
      setTimeout(() => setPulseScale(1), 500)
      
      // Show insight bubble occasionally
      if (Math.random() > 0.8) {
        setShowInsight(true)
        setTimeout(() => setShowInsight(false), 3000)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-64 h-64">
      {/* Orbital animation canvas */}
      <canvas
        ref={canvasRef}
        width={256}
        height={256}
        className="absolute inset-0"
      />
      
      {/* Central brain container */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: pulseScale }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          {/* Multi-layer glow effect */}
          <motion.div
            className="absolute -inset-12 rounded-full"
            animate={{
              background: [
                'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)',
                'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 60%)',
                'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 60%)',
                'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          {/* Glass morphism core */}
          <div className="relative w-28 h-28 rounded-full backdrop-blur-xl bg-white/10 shadow-2xl border border-white/20 flex items-center justify-center overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-indigo-600/80 to-pink-600/80" />
            
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  'linear-gradient(225deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  'linear-gradient(315deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Icon container */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                  rotateY: [0, 360]
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity },
                  rotateY: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Brain className="w-14 h-14 text-white drop-shadow-lg" />
              </motion.div>
              
              {/* Neural activity indicators */}
              <div className="absolute -top-2 -right-2">
                <motion.div
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Cpu className="w-4 h-4 text-cyan-300" />
                </motion.div>
              </div>
              
              <div className="absolute -bottom-2 -left-2">
                <motion.div
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Network className="w-4 h-4 text-pink-300" />
                </motion.div>
              </div>
            </div>
            
            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.3, 1.3],
                opacity: [0.3, 0, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats display with glass morphism */}
      {showDetails && (
        <motion.div 
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-white/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <Activity className="w-4 h-4 text-purple-600" />
                <div className="flex items-baseline gap-1">
                  <animated.span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {number.to(n => Math.floor(n))}
                  </animated.span>
                  <span className="text-xs text-gray-600">decisions/hour</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Insight notification with modern design */}
      <AnimatePresence>
        {showInsight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-[1px] rounded-2xl">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Insight Generated
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 
                            border-l-[6px] border-l-transparent 
                            border-r-[6px] border-r-transparent 
                            border-t-[6px] border-t-purple-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}