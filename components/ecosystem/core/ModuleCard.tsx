'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { Activity, TrendingUp } from 'lucide-react'

interface ModuleCardProps {
  module: {
    id: string
    name: string
    icon: any
    color: string
    gradient: string
    metrics: {
      label: string
      value: string
    }[]
    description: string
  }
  isHovered: boolean
  isConnected: boolean
  isSelected: boolean
  isFocused?: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}

export default function ModuleCard({ 
  module, 
  isHovered, 
  isConnected, 
  isSelected, 
  isFocused = false,
  onHover, 
  onLeave, 
  onClick 
}: ModuleCardProps) {
  const Icon = module.icon

  const springProps = useSpring({
    scale: isHovered ? 1.08 : isConnected ? 1.03 : 1,
    opacity: isFocused && !isSelected ? 0.4 : 1,
    blur: isFocused && !isSelected ? 2 : 0,
    config: { tension: 300, friction: 20 }
  })

  return (
    <animated.div
      style={{
        transform: springProps.scale.to(s => `scale(${s})`),
        opacity: springProps.opacity,
        filter: springProps.blur.to(b => `blur(${b}px)`)
      }}
      className="relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <motion.div
        className={`
          relative group cursor-pointer
          transition-all duration-300
        `}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glass morphism card */}
        <div className="relative w-48 h-56 rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-90`} />
          
          {/* Glass overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/10" />
          
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: isHovered 
                ? 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))' 
                : 'transparent',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            animate={isHovered ? {
              background: [
                'linear-gradient(0deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                'linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                'linear-gradient(360deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))'
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Content */}
          <div className="relative z-10 p-5 h-full flex flex-col">
            {/* Icon */}
            <motion.div
              className="mb-4"
              animate={{ 
                rotate: isHovered ? [0, -10, 10, 0] : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-md">
                <Icon className="w-7 h-7 text-white" />
              </div>
            </motion.div>
            
            {/* Title */}
            <h3 className="font-bold text-white text-lg mb-1">{module.name}</h3>
            <p className="text-white/70 text-xs mb-3">{module.description}</p>
            
            {/* Metrics */}
            <div className="flex-1 space-y-2">
              {module.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-white/60 text-xs">{metric.label}</span>
                  <span className="text-white font-semibold text-sm">{metric.value}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom action area */}
            <motion.div
              className="mt-3 pt-3 border-t border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-xs font-medium">View Details</span>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Glow effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute -inset-4 rounded-3xl"
              style={{
                background: `radial-gradient(circle at center, ${module.color}40 0%, transparent 70%)`,
                filter: 'blur(20px)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
        
        {/* Connection indicator */}
        <AnimatePresence>
          {isConnected && !isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Activity className="w-3 h-3 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-500"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.5, 0, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Live data indicator */}
        {isHovered && (
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/80 text-xs font-medium">Live</span>
            </div>
          </motion.div>
        )}
        
        {/* Shadow and reflection */}
        <div 
          className={`
            absolute -inset-1 rounded-3xl -z-10
            bg-gradient-to-b ${module.gradient}
            opacity-50 blur-xl
            transition-all duration-300
            ${isHovered ? 'opacity-70 blur-2xl -inset-2' : ''}
          `}
        />
      </motion.div>
    </animated.div>
  )
}

// Expanded card variant for selected state
export function ModuleCardExpanded({ module }: { module: any }) {
  const Icon = module.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="w-80 rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient}`} />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-md">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-sm font-medium">Active</span>
          </div>
        </div>
        
        <h3 className="font-bold text-white text-2xl mb-2">{module.name}</h3>
        <p className="text-white/80 text-sm mb-6">{module.description}</p>
        
        {/* Detailed metrics */}
        <div className="space-y-3">
          {module.metrics.map((metric: any) => (
            <div key={metric.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white/70 text-sm">{metric.label}</span>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-white font-bold text-xl">{metric.value}</div>
            </div>
          ))}
        </div>
        
        {/* Action button */}
        <motion.button
          className="w-full mt-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white font-medium
                     hover:bg-white/30 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Open Module Dashboard
        </motion.button>
      </div>
    </motion.div>
  )
}