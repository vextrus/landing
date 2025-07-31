'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useLiquidGlassDark } from '../../theme/liquidGlassDark'

// Glass Card Component with intensity levels
interface GlassCardProps extends MotionProps {
  children: ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'strong' | 'ultra'
  hover?: boolean
  shimmer?: boolean
  glow?: boolean
  onClick?: () => void
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, intensity = 'medium', hover = false, shimmer = false, glow = false, onClick, ...props }, ref) => {
    const theme = useLiquidGlassDark()
    const glass = theme.colors.glass[intensity]
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl overflow-hidden transition-all duration-300',
          hover && 'hover:scale-[1.02] cursor-pointer',
          glow && 'animate-pulse-glow',
          className
        )}
        style={{
          background: glass.background,
          border: `1px solid ${glass.border}`,
          boxShadow: glass.shadow,
          backdropFilter: `blur(${glass.blur})`,
          WebkitBackdropFilter: `blur(${glass.blur})`,
        }}
        whileHover={hover ? {
          background: theme.colors.glass.strong.background,
          borderColor: theme.colors.glass.strong.border,
        } : undefined}
        onClick={onClick}
        {...props}
      >
        {/* Glass overlay gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: theme.gradients.glassOverlay,
            opacity: 0.5,
          }}
        />
        
        {/* Shimmer effect */}
        {shimmer && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: theme.gradients.shimmer,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

// Glass Button Component
interface GlassButtonProps extends MotionProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  onClick?: () => void
  disabled?: boolean
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', pulse = false, onClick, disabled = false, ...props }, ref) => {
    const theme = useLiquidGlassDark()
    
    const variantColors = {
      primary: theme.colors.accent.primary,
      secondary: theme.colors.accent.secondary,
      danger: theme.colors.accent.danger,
      success: theme.colors.accent.success,
    }
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative rounded-lg font-medium transition-all duration-300',
          'backdrop-filter backdrop-blur-md',
          sizeClasses[size],
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        style={{
          background: `linear-gradient(135deg, ${variantColors[variant]}20 0%, ${variantColors[variant]}10 100%)`,
          border: `1px solid ${variantColors[variant]}40`,
          color: theme.colors.text.primary,
        }}
        whileHover={!disabled ? {
          scale: 1.05,
          background: `linear-gradient(135deg, ${variantColors[variant]}30 0%, ${variantColors[variant]}15 100%)`,
          borderColor: `${variantColors[variant]}60`,
          boxShadow: `0 0 20px ${variantColors[variant]}40`,
        } : undefined}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {/* Pulse animation */}
        {pulse && !disabled && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              border: `1px solid ${variantColors[variant]}`,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
        
        {children}
      </motion.button>
    )
  }
)

GlassButton.displayName = 'GlassButton'

// Glass Panel Component (larger container)
interface GlassPanelProps {
  children: ReactNode
  className?: string
  aurora?: boolean
  grid?: boolean
}

export function GlassPanel({ children, className, aurora = false, grid = false }: GlassPanelProps) {
  const theme = useLiquidGlassDark()
  
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl',
        aurora && 'aurora-bg',
        grid && 'neural-grid',
        className
      )}
      style={{
        background: theme.colors.glass.medium.background,
        border: `1px solid ${theme.colors.glass.medium.border}`,
        boxShadow: theme.colors.glass.medium.shadow,
        backdropFilter: `blur(${theme.colors.glass.medium.blur})`,
        WebkitBackdropFilter: `blur(${theme.colors.glass.medium.blur})`,
      }}
    >
      {/* Aurora layers */}
      {aurora && (
        <>
          {theme.effects.auroraLayers.map((layer, index) => (
            <div
              key={index}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: layer.gradient,
                animation: layer.animation,
              }}
            />
          ))}
        </>
      )}
      
      {children}
    </div>
  )
}

// Glass Input Component
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  error?: string
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, icon, error, ...props }, ref) => {
    const theme = useLiquidGlassDark()
    
    return (
      <div className="relative">
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-lg px-4 py-2 transition-all duration-300',
              'backdrop-filter backdrop-blur-md',
              'placeholder:text-gray-500',
              icon && 'pl-10',
              error && 'border-red-500',
              className
            )}
            style={{
              background: theme.colors.glass.light.background,
              border: `1px solid ${theme.colors.glass.light.border}`,
              color: theme.colors.text.primary,
            }}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

GlassInput.displayName = 'GlassInput'

// Glow Text Component
interface GlowTextProps {
  children: ReactNode
  className?: string
  color?: 'cyan' | 'magenta' | 'purple' | 'gold'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function GlowText({ children, className, color = 'cyan', size = 'md' }: GlowTextProps) {
  const theme = useLiquidGlassDark()
  
  const colorMap = {
    cyan: theme.colors.accent.primary,
    magenta: theme.colors.accent.secondary,
    purple: '#9333EA',
    gold: theme.colors.accent.quaternary,
  }
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }
  
  return (
    <span
      className={cn(sizeClasses[size], className)}
      style={{
        color: colorMap[color],
        textShadow: `
          0 0 10px ${colorMap[color]}80,
          0 0 20px ${colorMap[color]}50,
          0 0 30px ${colorMap[color]}30
        `,
      }}
    >
      {children}
    </span>
  )
}

// Animated Gradient Text
interface GradientTextProps {
  children: ReactNode
  className?: string
  gradient?: 'aurora' | 'cyan' | 'magenta' | 'gold'
}

export function GradientText({ children, className, gradient = 'aurora' }: GradientTextProps) {
  const theme = useLiquidGlassDark()
  
  const gradientMap = {
    aurora: theme.gradients.auroraGlow,
    cyan: theme.gradients.cyanGlow,
    magenta: theme.gradients.magentaGlow,
    gold: `linear-gradient(135deg, ${theme.colors.accent.quaternary} 0%, #FF6B00 100%)`,
  }
  
  return (
    <span
      className={cn('inline-block font-bold', className)}
      style={{
        background: gradientMap[gradient],
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  )
}