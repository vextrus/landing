'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export default function ParallaxCard({ 
  children, 
  className = '',
  intensity = 10
}: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity])
  
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    mouseX.set(x)
    mouseY.set(y)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      animate={{ 
        scale: isHovered ? 1.05 : 1,
        z: isHovered ? 50 : 0
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative ${className}`}
    >
      {/* Background gradient that moves with mouse */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${
            mouseX.get() * 100 + 50
          }% ${
            mouseY.get() * 100 + 50
          }%, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(105deg, 
            transparent 0%, 
            transparent 40%, 
            rgba(255, 255, 255, 0.1) 50%, 
            transparent 60%, 
            transparent 100%)`,
          transform: `translateX(${mouseX.get() * 100}%) translateY(${mouseY.get() * 100}%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card content with depth */}
      <motion.div
        style={{ 
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d'
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
      
      {/* Shadow that responds to tilt */}
      <motion.div
        className="absolute -bottom-4 left-4 right-4 h-8 rounded-2xl blur-xl bg-black/20"
        style={{
          transform: `translateX(${-mouseX.get() * 20}px) translateY(${-mouseY.get() * 20}px)`,
          opacity: isHovered ? 0.3 : 0.1
        }}
      />
    </motion.div>
  )
}