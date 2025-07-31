'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  animationDelay?: number
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    filter: "blur(4px)",
    transition: {
      duration: 0.2
    }
  }
}

export default function StaggeredList({ 
  children, 
  className = '',
  staggerDelay = 0.05,
  animationDelay = 0
}: StaggeredListProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        transition: `staggerChildren ${staggerDelay}s`,
        transitionDelay: `${animationDelay}s`
      }}
    >
      <AnimatePresence mode="popLayout">
        {children.map((child, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            layout
            className="relative"
          >
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Content */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {child}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}