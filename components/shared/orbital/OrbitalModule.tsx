'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { useState } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OrbitalModuleProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  icon: LucideIcon
  title: string
  description?: string
  color: string
  gradient: string
  metrics?: { label: string; value: string }[]
  size?: 'sm' | 'md' | 'lg'
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export default function OrbitalModule({
  icon: Icon,
  title,
  description,
  color,
  gradient,
  metrics,
  size = 'md',
  isActive = false,
  onClick,
  className,
  ...props
}: OrbitalModuleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-44 h-44',
    lg: 'w-56 h-56'
  }

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }

  return (
    <motion.div
      style={{
        transform: isHovered 
          ? `perspective(1000px) translateX(${-mousePos.x * 2}px) translateY(${-mousePos.y * 2}px) scale(1.12) rotateX(${mousePos.y * 0.15}deg) rotateY(${-mousePos.x * 0.15}deg)`
          : isActive 
          ? 'scale(1.05)' 
          : 'scale(1)'
      }}
      className={cn("relative cursor-pointer transition-transform duration-300", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      {...props}
    >
      <motion.div
        className="relative group"
        animate={isHovered ? {
          filter: [
            'drop-shadow(0 10px 30px rgba(139, 92, 246, 0.3))',
            'drop-shadow(0 20px 40px rgba(236, 72, 153, 0.4))',
            'drop-shadow(0 10px 30px rgba(139, 92, 246, 0.3))'
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Module card */}
        <div className={cn(
          "relative rounded-3xl overflow-hidden bg-white border-2 border-gray-200 shadow-xl transition-all duration-500",
          sizes[size],
          isHovered && "bg-white border-purple-400 shadow-2xl",
          isActive && "border-purple-500 shadow-purple-500/20"
        )}>
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={isHovered ? {
              background: [
                `linear-gradient(135deg, ${color}20 0%, transparent 100%)`,
                `linear-gradient(225deg, ${color}30 0%, transparent 100%)`,
                `linear-gradient(315deg, ${color}20 0%, transparent 100%)`,
                `linear-gradient(45deg, ${color}20 0%, transparent 100%)`
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Holographic shimmer effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: `linear-gradient(105deg, transparent 40%, ${color} 50%, transparent 60%)`,
                filter: 'blur(0.5px)'
              }}
              animate={{
                transform: ['translateX(-100%)', 'translateX(100%)']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )}
          
          {/* Content */}
          <div className="relative z-10 p-5 h-full flex flex-col items-center justify-center text-center">
            {/* Icon */}
            <motion.div
              className={cn("inline-flex p-4 rounded-2xl bg-gradient-to-r shadow-lg mb-3", gradient)}
              animate={isHovered ? { 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 1 }}
            >
              <Icon className={cn("text-white", iconSizes[size])} />
            </motion.div>
            
            {/* Title */}
            <h3 className={cn(
              "font-bold text-gray-800 mb-1",
              size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
            )}>{title}</h3>
            
            {/* Metrics or Description */}
            <motion.div
              animate={{ opacity: isHovered ? 0 : 1 }}
              className="space-y-1"
            >
              {metrics && metrics.slice(0, 1).map((metric) => (
                <div key={metric.label} className="text-xs">
                  <span className="text-gray-600">{metric.label}: </span>
                  <span className="font-semibold text-gray-800">{metric.value}</span>
                </div>
              ))}
              {!metrics && description && (
                <p className="text-xs text-gray-600">{description}</p>
              )}
            </motion.div>
          </div>
          
          {/* Hover overlay */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-sm"
            >
              <motion.button
                className="px-4 py-2 rounded-full bg-white text-purple-700 text-sm font-semibold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore →
              </motion.button>
            </motion.div>
          )}
        </div>
        
        {/* Orbit ring animation */}
        {(isHovered || isActive) && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-[-20px] rounded-full border-2 border-purple-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-[-10px] rounded-full border border-pink-400/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}