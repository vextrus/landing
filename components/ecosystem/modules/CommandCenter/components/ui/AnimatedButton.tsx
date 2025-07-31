'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps extends MotionProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  glow?: boolean
  ripple?: boolean
  onClick?: () => void
}

export default function AnimatedButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  pulse = false,
  glow = false,
  ripple = true,
  onClick,
  ...motionProps
}: AnimatedButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-gray-900 hover:from-indigo-700 hover:to-purple-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 text-gray-900 hover:from-red-700 hover:to-rose-700',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-gray-900 hover:from-green-700 hover:to-emerald-700'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <motion.button
      className={cn(
        'relative rounded-xl font-medium transition-all duration-300 overflow-hidden',
        'shadow-lg hover:shadow-xl active:shadow-md',
        variants[variant],
        sizes[size],
        pulse && 'animate-pulse',
        glow && 'shadow-[0_0_20px_rgba(99,102,241,0.5)]',
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...motionProps}
    >
      {/* Ripple effect container */}
      {ripple && (
        <motion.span
          className="absolute inset-0 -z-10"
          initial={false}
          animate={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 2, opacity: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="absolute inset-0 bg-white rounded-full" />
        </motion.span>
      )}

      {/* Gradient overlay for depth */}
      <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}