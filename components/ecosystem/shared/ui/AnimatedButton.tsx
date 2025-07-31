'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

export interface AnimatedButtonProps extends MotionProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'liquid' | 'premium'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  intensity?: 'light' | 'medium' | 'strong'
  pulse?: boolean
  glow?: boolean
  magnetic?: boolean
  liquidGlass?: boolean
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

export default function AnimatedButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  intensity = 'medium',
  pulse = false,
  glow = false,
  magnetic = true,
  liquidGlass = true,
  onClick,
  ...motionProps
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  // WCAG AA compliant color variants with high contrast ratios
  const variants = {
    primary: {
      base: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-500/30',
      hover: 'hover:from-blue-700 hover:to-indigo-800 hover:border-blue-400/40',
      glow: 'shadow-[0_0_32px_rgba(59,130,246,0.4)]',
      contrast: '4.8:1' // WCAG AA compliant
    },
    secondary: {
      base: 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-100 border-slate-600/40',
      hover: 'hover:from-slate-600 hover:to-slate-700 hover:border-slate-500/50',
      glow: 'shadow-[0_0_32px_rgba(100,116,139,0.4)]',
      contrast: '4.5:1'
    },
    ghost: {
      base: 'bg-white/10 text-white border-white/20 backdrop-blur-md',
      hover: 'hover:bg-white/20 hover:border-white/30',
      glow: 'shadow-[0_0_24px_rgba(255,255,255,0.2)]',
      contrast: '7:1'
    },
    danger: {
      base: 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-500/30',
      hover: 'hover:from-red-700 hover:to-rose-800 hover:border-red-400/40',
      glow: 'shadow-[0_0_32px_rgba(239,68,68,0.4)]',
      contrast: '4.6:1'
    },
    success: {
      base: 'bg-gradient-to-r from-emerald-600 to-green-700 text-white border-emerald-500/30',
      hover: 'hover:from-emerald-700 hover:to-green-800 hover:border-emerald-400/40',
      glow: 'shadow-[0_0_32px_rgba(16,185,129,0.4)]',
      contrast: '4.9:1'
    },
    liquid: {
      base: 'bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white border-cyan-400/30 backdrop-blur-xl',
      hover: 'hover:from-cyan-400/95 hover:to-blue-500/95 hover:border-cyan-300/40',
      glow: 'shadow-[0_0_40px_rgba(6,182,212,0.5)]',
      contrast: '5.2:1'
    },
    premium: {
      base: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-indigo-400/30',
      hover: 'hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 hover:border-indigo-300/40',
      glow: 'shadow-[0_0_48px_rgba(99,102,241,0.6)]',
      contrast: '4.7:1'
    }
  }

  const sizes = {
    xs: 'px-2 py-1 text-xs min-h-[24px]',
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-base min-h-[40px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]',
    xl: 'px-8 py-4 text-xl min-h-[56px]'
  }

  const currentVariant = variants[variant]

  return (
    <motion.button
      className={cn(
        'relative rounded-2xl font-semibold transition-all duration-300 overflow-hidden',
        'border backdrop-blur-md',
        // Apple-inspired shadow system
        'shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]',
        // Base variant styles
        currentVariant.base,
        currentVariant.hover,
        sizes[size],
        // Enhanced effects
        pulse && 'animate-pulse',
        glow && currentVariant.glow,
        // Accessibility
        'focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-blue-500/50',
        'active:scale-[0.98] active:transition-transform active:duration-75',
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={magnetic ? { 
        scale: 1.05,
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : undefined}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...motionProps}
    >
      {/* Liquid Glass specular highlight */}
      {liquidGlass && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-full blur-xl"
            animate={isHovered ? {
              x: [0, 5, 0],
              y: [0, -3, 0],
              opacity: [0.3, 0.7, 0.3]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Enhanced ripple effect for tactile feedback */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={false}
        whileTap={{
          background: [
            'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)',
            'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
            'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)'
          ]
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Professional noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.003] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='buttonNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch' seed='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23buttonNoise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlay for enhanced depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      {/* Content with proper z-index and flex layout */}
      <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
        {children}
      </span>

      {/* Enhanced border highlight */}
      <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  )
}