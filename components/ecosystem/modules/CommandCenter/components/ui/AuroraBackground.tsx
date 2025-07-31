'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AuroraBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: number
}

export default function AuroraBackground({ 
  className = '', 
  children,
  intensity = 0.5 
}: AuroraBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora Gradient Layers */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse at top left, #6366F1 0%, transparent 50%)',
            'radial-gradient(ellipse at bottom right, #8B5CF6 0%, transparent 50%)',
            'radial-gradient(ellipse at top right, #EC4899 0%, transparent 50%)',
            'radial-gradient(ellipse at bottom left, #14B8A6 0%, transparent 50%)',
            'radial-gradient(ellipse at center, #6366F1 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ opacity: intensity }}
      />
      
      {/* Flowing Aurora Waves */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 560"
      >
        <defs>
          <linearGradient id="aurora-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="aurora-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* First Wave */}
        <motion.path
          d="M0,200 Q360,100 720,200 T1440,200 L1440,560 L0,560 Z"
          fill="url(#aurora-grad-1)"
          animate={{
            d: [
              "M0,200 Q360,100 720,200 T1440,200 L1440,560 L0,560 Z",
              "M0,150 Q360,250 720,150 T1440,150 L1440,560 L0,560 Z",
              "M0,200 Q360,100 720,200 T1440,200 L1440,560 L0,560 Z"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ opacity: intensity * 0.6 }}
        />
        
        {/* Second Wave */}
        <motion.path
          d="M0,300 Q360,200 720,300 T1440,300 L1440,560 L0,560 Z"
          fill="url(#aurora-grad-2)"
          animate={{
            d: [
              "M0,300 Q360,200 720,300 T1440,300 L1440,560 L0,560 Z",
              "M0,250 Q360,350 720,250 T1440,250 L1440,560 L0,560 Z",
              "M0,300 Q360,200 720,300 T1440,300 L1440,560 L0,560 Z"
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{ opacity: intensity * 0.5 }}
        />
      </svg>
      
      {/* Particle Field */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -20],
              opacity: [0, Math.random() * 0.5 + 0.2, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Light Beams */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(99, 102, 241, 0.1) 60deg, transparent 120deg)',
            'conic-gradient(from 120deg at 50% 50%, transparent 0deg, rgba(139, 92, 246, 0.1) 60deg, transparent 120deg)',
            'conic-gradient(from 240deg at 50% 50%, transparent 0deg, rgba(236, 72, 153, 0.1) 60deg, transparent 120deg)',
            'conic-gradient(from 360deg at 50% 50%, transparent 0deg, rgba(99, 102, 241, 0.1) 60deg, transparent 120deg)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ opacity: intensity * 0.3 }}
      />
      
      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}