'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ModuleHexagonProps {
  module: {
    id: string
    title: string
    tagline: string
    icon: LucideIcon
    color: string
    features: string[]
    impact: string
  }
  index: number
  isActive: boolean
  onClick: () => void
}

export default function ModuleHexagon({ module, index, isActive, onClick }: ModuleHexagonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = module.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "hexagon relative cursor-pointer transition-all duration-300",
        isActive && "active",
        isHovered && "hovered"
      )}
      style={{
        '--module-color': module.color,
      } as React.CSSProperties}
    >
      <div className="hexagon-inner">
        <div className="hexagon-content">
          <Icon className="w-12 h-12 mb-3 text-white" />
          <h3 className="text-lg font-bold text-white mb-1">{module.title}</h3>
          <p className="text-xs text-white/80 text-center px-2">{module.tagline}</p>
          
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-2 rounded-lg text-xs whitespace-nowrap z-10"
            >
              Click to explore features
            </motion.div>
          )}
        </div>
      </div>
      
      {isActive && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          className="absolute inset-0 hexagon-glow"
        />
      )}
    </motion.div>
  )
}