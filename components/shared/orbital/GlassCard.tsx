'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'colored' | 'dark' | 'premium'
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  glow?: boolean
  children: React.ReactNode
  className?: string
}

export default function GlassCard({
  variant = 'default',
  blur = 'md',
  hover = true,
  glow = false,
  children,
  className,
  ...props
}: GlassCardProps) {
  const blurValues = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  }

  const variants = {
    default: 'bg-white/80 border-gray-200/50',
    colored: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200/30',
    dark: 'bg-gray-900/80 border-gray-700/50 text-white',
    premium: 'bg-gradient-to-br from-white/90 via-purple-50/50 to-pink-50/50 border-purple-200/40'
  }

  const glowColors = {
    default: 'shadow-purple-500/20',
    colored: 'shadow-purple-500/30',
    dark: 'shadow-purple-400/20',
    premium: 'shadow-purple-600/25'
  }

  return (
    <motion.div
      className={cn(
        'relative rounded-2xl border overflow-hidden',
        blurValues[blur],
        variants[variant],
        hover && 'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
        glow && `shadow-2xl ${glowColors[variant]}`,
        className
      )}
      whileHover={hover ? { y: -5 } : undefined}
      {...props}
    >
      {/* Shimmer effect on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
              animation: 'shimmer 1s infinite'
            }}
          />
        </motion.div>
      )}
      
      {/* Gradient overlay for premium variant */}
      {variant === 'premium' && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-400 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-400 to-transparent rounded-full blur-3xl" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated border gradient */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent, rgba(139,92,246,0.3), transparent)',
            backgroundSize: '200% 200%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </motion.div>
  )
}