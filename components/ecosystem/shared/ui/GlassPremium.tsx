'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassPremiumProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'colored' | 'dark' | 'holographic'
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  intensity?: number
}

export default function GlassPremium({ 
  children, 
  className = '',
  variant = 'default',
  blur = 'lg',
  intensity = 1
}: GlassPremiumProps) {
  const blurValues = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  }
  
  const variants = {
    default: {
      background: `rgba(255, 255, 255, ${0.95 * intensity})`,
      border: `1px solid rgba(229, 231, 235, ${1 * intensity})`
    },
    colored: {
      background: `linear-gradient(135deg, 
        rgba(99, 102, 241, ${0.15 * intensity}) 0%, 
        rgba(139, 92, 246, ${0.1 * intensity}) 50%,
        rgba(236, 72, 153, ${0.15 * intensity}) 100%)`,
      border: `1px solid rgba(139, 92, 246, ${0.4 * intensity})`
    },
    dark: {
      background: `rgba(249, 250, 251, ${0.95 * intensity})`,
      border: `1px solid rgba(229, 231, 235, ${1 * intensity})`
    },
    holographic: {
      background: `linear-gradient(135deg,
        rgba(255, 255, 255, ${0.95 * intensity}) 0%,
        rgba(249, 250, 251, ${0.9 * intensity}) 100%)`,
      border: `2px solid transparent`
    }
  }
  
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Main Glass Container */}
      <div
        className={`relative overflow-hidden rounded-2xl ${blurValues[blur]}`}
        style={variants[variant]}
      >
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
        
        {/* Holographic Effect for variant */}
        {variant === 'holographic' && (
          <>
            {/* Animated Gradient Border */}
            <motion.div
              className="absolute inset-0 rounded-2xl p-[2px] -z-10"
              animate={{
                background: [
                  'linear-gradient(0deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00CED1, #FF0080)',
                  'linear-gradient(60deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00CED1, #FF0080)',
                  'linear-gradient(120deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00CED1, #FF0080)',
                  'linear-gradient(180deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00CED1, #FF0080)',
                  'linear-gradient(240deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00CED1, #FF0080)',
                  'linear-gradient(300deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00CED1, #FF0080)',
                  'linear-gradient(360deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00CED1, #FF0080)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Holographic Shine */}
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              animate={{
                background: [
                  'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)',
                  'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)'
                ],
                transform: ['translateX(-100%) translateY(-100%)', 'translateX(100%) translateY(100%)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />
          </>
        )}
        
        {/* Inner Glow */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 20px rgba(255, 255, 255, ${0.1 * intensity})`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Reflection Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{
            background: `linear-gradient(to top, 
              rgba(255, 255, 255, ${0.05 * intensity}) 0%, 
              transparent 100%)`,
            transform: 'scaleY(-1)',
            transformOrigin: 'bottom'
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* External Glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: variant === 'colored' 
            ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 70%)',
          filter: 'blur(20px)'
        }}
      />
    </motion.div>
  )
}