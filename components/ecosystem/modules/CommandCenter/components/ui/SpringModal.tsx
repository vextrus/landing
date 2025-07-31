'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface SpringModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function SpringModal({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = 'md' 
}: SpringModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.75,
              y: 100,
              rotateX: -15
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              rotateX: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              y: 50,
              rotateX: 15,
              transition: {
                duration: 0.2
              }
            }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${sizes[size]} z-50 px-4`}
            style={{ perspective: 1000 }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-2xl p-[2px] -z-10"
                animate={{
                  background: [
                    'linear-gradient(0deg, #6366F1, #8B5CF6)',
                    'linear-gradient(90deg, #8B5CF6, #EC4899)',
                    'linear-gradient(180deg, #EC4899, #6366F1)',
                    'linear-gradient(270deg, #6366F1, #8B5CF6)',
                    'linear-gradient(360deg, #8B5CF6, #6366F1)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Header */}
              {title && (
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                </div>
              )}
              
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
              
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6"
              >
                {children}
              </motion.div>
              
              {/* Bottom gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
            
            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-indigo-500 rounded-full"
                initial={{ 
                  x: Math.random() * 200 - 100,
                  y: 100,
                  opacity: 0
                }}
                animate={{ 
                  y: -100,
                  opacity: [0, 1, 0],
                  x: Math.random() * 200 - 100
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}