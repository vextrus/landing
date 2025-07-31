'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
  x: number
  y: number
  id: number
}

interface WaveButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function WaveButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}: WaveButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      x,
      y,
      id: Date.now()
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 1000)
    
    onClick?.()
  }
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white',
    secondary: 'bg-white border-2 border-gray-200 text-gray-900',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  }
  
  return (
    <motion.button
      onClick={handleClick}
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ 
          x: ['-100%', '100%'],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear"
        }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ 
              width: 0, 
              height: 0, 
              opacity: 0.5,
              x: '-50%',
              y: '-50%'
            }}
            animate={{ 
              width: 300, 
              height: 300, 
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block w-full h-full rounded-full bg-white/30" />
          </motion.span>
        ))}
      </AnimatePresence>
      
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-600/20 blur-xl" />
      </motion.div>
    </motion.button>
  )
}