'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { createPortal } from 'react-dom'

interface FullScreenModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function FullScreenModal({ isOpen, onClose, children }: FullScreenModalProps) {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      // Simulate loading
      setTimeout(() => setIsLoading(false), 1500)
      
      // Add to browser history
      window.history.pushState({ modal: true }, '', window.location.href)
      
      // ESC key handler
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      
      // Back button handler
      const handlePopState = (e: PopStateEvent) => {
        if (isOpen) {
          e.preventDefault()
          onClose()
        }
      }
      
      document.addEventListener('keydown', handleEsc)
      window.addEventListener('popstate', handlePopState)
      
      return () => {
        document.removeEventListener('keydown', handleEsc)
        window.removeEventListener('popstate', handlePopState)
      }
    } else {
      document.body.style.overflow = 'unset'
      setIsLoading(true)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-slate-950"
        >
          {/* Loading Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-[10000] bg-slate-950 flex items-center justify-center"
              >
                <div className="text-center">
                  {/* Loading Animation */}
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    <motion.div
                      className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-2 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-4 border-4 border-purple-500/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-6 border-4 border-t-transparent border-r-purple-500 border-b-transparent border-l-transparent rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Center Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Loading Text */}
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Initializing AI Command Center
                  </motion.h2>
                  <motion.p 
                    className="text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Establishing secure connection...
                  </motion.p>
                  
                  {/* Progress Steps */}
                  <motion.div 
                    className="mt-8 space-y-2 text-sm text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center gap-2"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Loading neural networks...</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full overflow-hidden"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Use portal to render modal at the root level
  return createPortal(modalContent, document.body)
}