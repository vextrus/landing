'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends MotionProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'light' | 'gradient'
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  hover?: boolean
  glow?: boolean
  gradient?: string
}

export default function GlassCard({
  children,
  className,
  variant = 'primary',
  blur = 'xl',
  hover = true,
  glow = false,
  gradient,
  ...motionProps
}: GlassCardProps) {
  const blurValues = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl'
  }

  const variants = {
    primary: 'bg-white/98 border-gray-200/80',
    secondary: 'bg-gray-50/98 border-gray-300/80',
    light: 'bg-white border-gray-100/50',
    gradient: gradient || 'bg-gradient-to-br from-white/98 via-white/95 to-white/92 border-gray-200/80'
  }

  return (
    <motion.div
      className={cn(
        'relative rounded-2xl border overflow-hidden',
        'shadow-[0_2px_20px_-2px_rgba(0,0,0,0.06),0_4px_12px_-2px_rgba(0,0,0,0.04)]',
        blurValues[blur],
        variants[variant],
        hover && 'transition-all duration-300 hover:shadow-[0_8px_30px_-2px_rgba(0,0,0,0.10),0_12px_20px_-4px_rgba(0,0,0,0.06)] hover:scale-[1.01] hover:border-gray-300/80',
        glow && 'before:absolute before:inset-0 before:rounded-2xl before:p-[2px] before:bg-gradient-to-br before:from-indigo-500/20 before:via-purple-500/20 before:to-pink-500/20 before:-z-10 before:blur-xl',
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...motionProps}
    >
      {/* Noise texture overlay for glass effect */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}