'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp, Lightbulb, X } from 'lucide-react'
import { useState } from 'react'

interface HolographicCardProps {
  type: 'warning' | 'opportunity' | 'recommendation'
  title: string
  confidence: number
  impact: string
  actions?: string[]
  compact?: boolean
  onDismiss?: () => void
}

export default function HolographicCard({
  type,
  title,
  confidence,
  impact,
  actions = [],
  compact = false,
  onDismiss
}: HolographicCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const getTypeConfig = () => {
    switch (type) {
      case 'warning':
        return {
          icon: AlertTriangle,
          color: '#EF4444',
          gradient: 'from-red-500/20 to-orange-500/20',
          borderGradient: 'from-red-500 to-orange-500'
        }
      case 'opportunity':
        return {
          icon: TrendingUp,
          color: '#22C55E',
          gradient: 'from-green-500/20 to-emerald-500/20',
          borderGradient: 'from-green-500 to-emerald-500'
        }
      case 'recommendation':
        return {
          icon: Lightbulb,
          color: '#3B82F6',
          gradient: 'from-blue-500/20 to-cyan-500/20',
          borderGradient: 'from-blue-500 to-cyan-500'
        }
    }
  }

  const config = getTypeConfig()
  const Icon = config.icon

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  if (compact) {
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`relative bg-gradient-to-br ${config.gradient} backdrop-blur-xl rounded-lg p-3 border border-white/10 shadow-xl`}>
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" style={{ color: config.color }} />
            <p className="text-gray-900 text-sm font-medium flex-1 line-clamp-1">{title}</p>
            <span className="text-xs text-gray-400">{confidence}%</span>
          </div>
          
          {/* Holographic shimmer effect */}
          <div className="absolute inset-0 rounded-lg opacity-30">
            <div className={`absolute inset-0 bg-gradient-to-r ${config.borderGradient} blur-sm animate-pulse`} />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="relative w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Background layers for depth */}
      <div className="absolute inset-0 rounded-xl opacity-20 blur-xl" style={{ backgroundColor: config.color }} />
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${config.gradient} blur-md`} />

      {/* Main card */}
      <div className="relative bg-white backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              `linear-gradient(0deg, ${config.color}40, transparent)`,
              `linear-gradient(180deg, ${config.color}40, transparent)`,
              `linear-gradient(360deg, ${config.color}40, transparent)`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md flex items-center justify-center">
                  <Icon className="w-6 h-6" style={{ color: config.color }} />
                </div>
                
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{ backgroundColor: config.color }}
                  animate={{
                    scale: [1, 1.2, 1.2],
                    opacity: [0.5, 0, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              </div>
              
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{type}</p>
                <p className="text-gray-900 font-semibold">{title}</p>
              </div>
            </div>
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Confidence meter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">AI Confidence</span>
              <span className="text-xs text-gray-900 font-medium">{confidence}%</span>
            </div>
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: config.color }}
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '400%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </div>
          </div>

          {/* Impact */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-1">Projected Impact</p>
            <p className="text-gray-900 font-medium">{impact}</p>
          </div>

          {/* Actions */}
          {actions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-400 mb-2">Recommended Actions</p>
              {actions.map((action, index) => (
                <motion.button
                  key={index}
                  className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-900"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">→</span>
                  {action}
                </motion.button>
              ))}
            </div>
          )}

          {/* Holographic scan lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              backgroundPosition: ['0% 0%', '0% 100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${config.color}10 2px,
                ${config.color}10 4px
              )`,
              backgroundSize: '100% 10px'
            }}
          />
        </div>
      </div>

      {/* 3D shadow effect */}
      <div 
        className="absolute inset-0 rounded-xl -z-10"
        style={{
          transform: 'translateZ(-20px) scale(0.95)',
          background: `linear-gradient(135deg, ${config.color}40, transparent)`,
          filter: 'blur(20px)'
        }}
      />
    </motion.div>
  )
}