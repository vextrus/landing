'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  error?: string
  success?: boolean
}

export default function FloatingInput({
  label,
  icon: Icon,
  error,
  success,
  className,
  onFocus,
  onBlur,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    setHasValue(e.target.value !== '')
    onBlur?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== '')
    props.onChange?.(e)
  }

  return (
    <div className="relative">
      <motion.div
        className={cn(
          'relative rounded-xl transition-all duration-300',
          'bg-white/80 backdrop-blur-xl',
          'border-2',
          error ? 'border-red-500' : success ? 'border-green-500' : 
          isFocused ? 'border-indigo-500' : 
          'border-gray-200',
          'shadow-lg hover:shadow-xl',
          className
        )}
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Icon */}
        {Icon && (
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            animate={{
              color: isFocused ? '#6366F1' : '#9CA3AF',
              scale: isFocused ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          className={cn(
            'w-full bg-transparent px-4 py-4 outline-none transition-all',
            Icon && 'pl-12',
            'text-gray-900 placeholder-transparent'
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={label}
          {...props}
        />

        {/* Floating Label */}
        <motion.label
          className={cn(
            'absolute left-4 cursor-text pointer-events-none',
            'text-gray-500',
            Icon && 'left-12'
          )}
          animate={{
            top: isFocused || hasValue ? '0.5rem' : '50%',
            fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
            color: isFocused ? '#6366F1' : error ? '#EF4444' : success ? '#22C55E' : '#9CA3AF',
            y: isFocused || hasValue ? 0 : '-50%',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
        </motion.label>

        {/* Focus Ring Animation */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={false}
          animate={{
            boxShadow: isFocused
              ? '0 0 0 4px rgba(99, 102, 241, 0.1), 0 0 20px rgba(99, 102, 241, 0.2)'
              : '0 0 0 0px rgba(99, 102, 241, 0)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Error/Success Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-red-500 pl-4"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}