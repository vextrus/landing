'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

export interface GlassCardProps extends MotionProps {
  children: ReactNode
  className?: string
  variant?: 'liquid' | 'enterprise' | 'premium' | 'minimal' | 'accent'
  intensity?: 'light' | 'medium' | 'strong' | 'ultra'
  hover?: boolean
  glow?: boolean
  interactive?: boolean
  gradient?: string
  onClick?: () => void
}

export default function GlassCard({
  children,
  className,
  variant = 'liquid',
  intensity = 'medium',
  hover = true,
  glow = false,
  interactive = false,
  gradient,
  onClick,
  ...motionProps
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Apple Liquid Glass intensity levels
  const intensityStyles = {
    light: {
      backdrop: 'backdrop-blur-md',
      background: 'bg-white/5',
      border: 'border-white/10',
      shadow: 'shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
    },
    medium: {
      backdrop: 'backdrop-blur-xl',
      background: 'bg-white/8',
      border: 'border-white/15',
      shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
    },
    strong: {
      backdrop: 'backdrop-blur-2xl',
      background: 'bg-white/12',
      border: 'border-white/20',
      shadow: 'shadow-[0_12px_48px_rgba(0,0,0,0.12)]'
    },
    ultra: {
      backdrop: 'backdrop-blur-3xl',
      background: 'bg-white/18',
      border: 'border-white/25',
      shadow: 'shadow-[0_16px_64px_rgba(0,0,0,0.16)]'
    }
  }

  // WCAG AA compliant variants for professional enterprise use
  const variants = {
    liquid: {
      base: 'bg-white/10 border-white/20',
      hover: 'hover:bg-white/15 hover:border-white/30',
      text: 'text-white',
      glow: 'shadow-[0_0_32px_rgba(6,182,212,0.15)]'
    },
    enterprise: {
      base: 'bg-slate-900/95 border-slate-700/50',
      hover: 'hover:bg-slate-800/95 hover:border-slate-600/60',
      text: 'text-slate-100',
      glow: 'shadow-[0_0_32px_rgba(99,102,241,0.2)]'
    },
    premium: {
      base: 'bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 border-slate-600/40',
      hover: 'hover:from-slate-800/95 hover:via-slate-700/90 hover:to-slate-800/95 hover:border-slate-500/50',
      text: 'text-slate-50',
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.25)]'
    },
    minimal: {
      base: 'bg-white/95 border-gray-200/60',
      hover: 'hover:bg-white/98 hover:border-gray-300/70',
      text: 'text-gray-900',
      glow: 'shadow-[0_0_24px_rgba(6,182,212,0.1)]'
    },
    accent: {
      base: gradient || 'bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-indigo-500/20 border-cyan-400/30',
      hover: 'hover:from-cyan-500/30 hover:via-blue-500/25 hover:to-indigo-500/30 hover:border-cyan-400/40',
      text: 'text-cyan-50',
      glow: 'shadow-[0_0_48px_rgba(6,182,212,0.3)]'
    }
  }

  const currentIntensity = intensityStyles[intensity]
  const currentVariant = variants[variant]

  return (
    <motion.div
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-500',
        // Apple Liquid Glass base styles
        currentIntensity.backdrop,
        currentIntensity.border,
        currentIntensity.shadow,
        // Variant-specific styles
        currentVariant.base,
        // Hover effects with enhanced glass morphism
        hover && [
          'transition-all duration-300 ease-out',
          currentVariant.hover,
          'hover:shadow-[0_20px_64px_rgba(0,0,0,0.15)]',
          'hover:scale-[1.02]',
          'hover:-translate-y-1'
        ],
        // Interactive feedback
        interactive && 'cursor-pointer active:scale-[0.98]',
        // Glow effect for premium feel
        glow && currentVariant.glow,
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hover ? { 
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      {...motionProps}
    >
      {/* Liquid Glass specular highlights - Apple inspired */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {/* Primary highlight */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-full blur-3xl"
          animate={isHovered ? {
            x: [0, 10, 0],
            y: [0, -5, 0],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Secondary highlight for depth */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-cyan-400/10 via-blue-400/5 to-transparent rounded-full blur-2xl"
          animate={isHovered ? {
            x: [0, -8, 0],
            y: [0, 8, 0],
            opacity: [0.2, 0.4, 0.2]
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Real-time reaction to mouse movement */}
        {isHovered && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-cyan-500/5 rounded-2xl" />
          </motion.div>
        )}
      </div>

      {/* Professional noise texture for premium glass effect */}
      <div 
        className="absolute inset-0 opacity-[0.008] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='professionalNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch' seed='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23professionalNoise)' opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Enhanced border for liquid glass effect */}
      <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Content with proper text contrast */}
      <div className={cn('relative z-10', currentVariant.text)}>
        {children}
      </div>

      {/* Interactive ripple effect */}
      {interactive && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ background: 'radial-gradient(circle at center, transparent 0%, transparent 100%)' }}
          animate={{ 
            background: [
              'radial-gradient(circle at center, rgba(6,182,212,0.1) 0%, transparent 70%)',
              'radial-gradient(circle at center, transparent 0%, transparent 100%)'
            ]
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}
    </motion.div>
  )
}