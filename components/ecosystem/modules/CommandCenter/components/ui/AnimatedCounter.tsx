'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, useSpring, useMotionValueEvent } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  format?: (value: number) => string
  springConfig?: {
    stiffness?: number
    damping?: number
  }
}

export default function AnimatedCounter({ 
  value, 
  duration = 2,
  className = '',
  format = (v) => Math.floor(v).toLocaleString(),
  springConfig = { stiffness: 100, damping: 20 }
}: AnimatedCounterProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, format)
  const springValue = useSpring(count, springConfig)
  const ref = useRef<HTMLSpanElement>(null)
  const prevValue = useRef(0)
  const [displayValue, setDisplayValue] = useState(format(0))
  
  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayValue(latest)
  })
  
  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        // Add shake effect on significant changes
        if (ref.current && Math.abs(latest - prevValue.current) > value * 0.1) {
          ref.current.style.transform = `translateX(${Math.random() * 2 - 1}px)`
          setTimeout(() => {
            if (ref.current) ref.current.style.transform = 'translateX(0)'
          }, 50)
        }
        prevValue.current = latest
      }
    })
    
    return controls.stop
  }, [value, count, duration])
  
  return (
    <motion.span 
      ref={ref}
      className={`inline-block tabular-nums ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", ...springConfig }}
    >
      {/* Number with gradient effect */}
      <motion.span
        className="relative"
        animate={{ 
          filter: count.get() > prevValue.current ? "hue-rotate(0deg)" : "hue-rotate(180deg)"
        }}
        transition={{ duration: 0.5 }}
      >
        {displayValue}
        
        {/* Pulse effect on change */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={{ 
            opacity: [0, 0.5, 0],
            x: ["-100%", "100%"]
          }}
          transition={{ 
            duration: 0.6,
            repeat: 0,
            repeatDelay: 2
          }}
        />
      </motion.span>
      
      {/* Rising/falling indicator */}
      <motion.span
        className="absolute -right-6 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: count.get() !== prevValue.current ? 1 : 0,
          y: count.get() > prevValue.current ? -10 : 10
        }}
        transition={{ duration: 0.5 }}
      >
        {count.get() > prevValue.current ? (
          <span className="text-green-500 text-xs">↑</span>
        ) : (
          <span className="text-red-500 text-xs">↓</span>
        )}
      </motion.span>
    </motion.span>
  )
}