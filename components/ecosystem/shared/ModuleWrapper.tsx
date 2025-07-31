'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, ChevronRight, Zap, Eye, ArrowRight } from 'lucide-react'
import { createPortal } from 'react-dom'
import { GlassCard, AnimatedButton, AuroraBackground, NeuralParticles } from './ui'

interface ModuleWrapperProps {
  children: React.ReactNode
  moduleName: string
  moduleIcon: React.ComponentType<{ className?: string }>
  moduleDescription: string
  features: Array<{
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
  }>
  metrics?: Array<{
    label: string
    value: string
    trend?: string
  }>
  directAccess?: boolean // New prop for single-click access
  autoLaunch?: boolean // Skip launch card and open directly
  accentColor?: string
  onClose?: () => void
}

export default function ModuleWrapper({
  children,
  moduleName,
  moduleIcon: ModuleIcon,
  moduleDescription,
  features,
  metrics,
  directAccess = true, // Default to single-click like CommandCenter
  autoLaunch = false, // Default to showing launch card
  accentColor = '#14B8A6',
  onClose
}: ModuleWrapperProps) {
  const [isOpen, setIsOpen] = useState(autoLaunch)
  const [isLoading, setIsLoading] = useState(autoLaunch)
  const [showPreview, setShowPreview] = useState(false)

  // Handle auto-launch on mount
  useEffect(() => {
    if (autoLaunch) {
      setTimeout(() => setIsLoading(false), 800) // Shorter loading for auto-launch
    }
  }, [autoLaunch])

  const handleDirectOpen = () => {
    if (directAccess) {
      setIsLoading(true)
      setIsOpen(true)
      // Simulate realistic loading time for enterprise dashboard
      setTimeout(() => setIsLoading(false), 1200)
    } else {
      setShowPreview(true)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setShowPreview(false)
    onClose?.()
  }

  const handleLaunchFromPreview = () => {
    setShowPreview(false)
    setIsLoading(true)
    setIsOpen(true)
    setTimeout(() => setIsLoading(false), 1200)
  }

  // Add keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen || showPreview) {
        if (e.key === 'Escape' || (e.key === 'Backspace' && e.target === document.body)) {
          e.preventDefault()
          handleClose()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, showPreview])

  return (
    <>
      {/* Enhanced Launch Card with Liquid Glass Design */}
      {!autoLaunch && (
        <GlassCard
        className="group cursor-pointer overflow-hidden"
        variant="liquid"
        intensity="medium"
        hover
        glow
        interactive
        onClick={handleDirectOpen}
      >
        <div className="p-8">
          {/* Header Section */}
          <div className="flex items-start gap-6 mb-6">
            <motion.div
              className="relative p-4 rounded-2xl overflow-hidden"
              style={{ 
                backgroundColor: `${accentColor}20`,
                border: `1px solid ${accentColor}30`
              }}
              whileHover={{ 
                rotate: [0, -8, 8, 0], 
                scale: 1.1,
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
            >
              {/* Liquid Glass highlight on icon */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl" />
              <div style={{ color: accentColor }}>
                <ModuleIcon className="w-8 h-8 relative z-10" />
              </div>
            </motion.div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 glass-text-primary">
                {moduleName}
              </h3>
              <p className="glass-text-muted leading-relaxed">
                {moduleDescription}
              </p>
            </div>

            {/* Access indicator */}
            <div className="flex flex-col items-center gap-2">
              {directAccess ? (
                <motion.div
                  className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <Zap className="w-4 h-4 text-green-400" />
                </motion.div>
              ) : (
                <motion.div
                  className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <Eye className="w-4 h-4 text-blue-400" />
                </motion.div>
              )}
              <span className="text-xs glass-text-muted">
                {directAccess ? 'Quick Access' : 'Preview Mode'}
              </span>
            </div>
          </div>

          {/* Features Grid with Enhanced Liquid Glass */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl liquid-glass-light hover:liquid-glass-medium transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <feature.icon className="w-4 h-4 text-white/80" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm glass-text-primary mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs glass-text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Metrics with Enhanced Visualization */}
          {metrics && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="text-center p-3 rounded-xl liquid-glass-light"
                >
                  <motion.p 
                    className="text-xl font-bold"
                    style={{ color: accentColor }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {metric.value}
                  </motion.p>
                  <p className="text-xs glass-text-muted mt-1">{metric.label}</p>
                  {metric.trend && (
                    <p className="text-xs text-green-400 mt-0.5">{metric.trend}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Removed Action Button - Card is now clickable for single-click access */}

          {/* Hover Effect Indicator */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs glass-text-muted flex items-center justify-center gap-2">
              {directAccess ? (
                <>
                  <Zap className="w-3 h-3" />
                  Click anywhere for instant access
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" />
                  Click to preview features
                </>
              )}
            </p>
          </motion.div>
        </div>

        {/* Enhanced hover effect with Liquid Glass */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div 
            className="absolute inset-0 bg-gradient-to-br opacity-10"
            style={{
              background: `linear-gradient(135deg, ${accentColor}40 0%, transparent 70%)`
            }}
          />
        </div>
        </GlassCard>
      )}

      {/* Preview Modal for non-direct access */}
      {showPreview && !directAccess && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-4xl liquid-glass-strong rounded-3xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold glass-text-primary">
                  {moduleName} Preview
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl liquid-glass-light hover:liquid-glass-medium transition-all"
                >
                  <X className="w-6 h-6 glass-text-primary" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold glass-text-primary mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div style={{ color: accentColor }}>
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <span className="glass-text-primary">{feature.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {metrics && (
                  <div>
                    <h3 className="text-xl font-semibold glass-text-primary mb-4">Live Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {metrics.map((metric, index) => (
                        <div key={index} className="text-center p-4 liquid-glass-light rounded-xl">
                          <p className="text-2xl font-bold" style={{ color: accentColor }}>
                            {metric.value}
                          </p>
                          <p className="text-sm glass-text-muted">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <AnimatedButton
                variant="premium"
                size="xl"
                className="w-full"
                onClick={handleLaunchFromPreview}
              >
                <span>Launch Full Dashboard</span>
                <ChevronRight className="w-6 h-6" />
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {/* Full Screen Modal */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black"
          >
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0">
              <AuroraBackground intensity={0.4} className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
              <NeuralParticles count={40} colors={[accentColor, '#ffffff20']} />
            </div>

            {/* Close functionality through keyboard shortcuts only (Escape/Backspace) */}

            {/* Loading State with Enhanced Animation */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center">
                    {/* Enhanced Orbital Loading Animation */}
                    <div className="relative w-40 h-40 mx-auto mb-8">
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-transparent"
                        style={{ 
                          borderTopColor: accentColor, 
                          borderRightColor: accentColor,
                          filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.4))'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-3 rounded-full border-4 border-transparent"
                        style={{ 
                          borderBottomColor: accentColor, 
                          borderLeftColor: accentColor,
                          filter: 'drop-shadow(0 0 15px rgba(6,182,212,0.3))'
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-6 rounded-full"
                        style={{ backgroundColor: accentColor }}
                        animate={{ 
                          scale: [0.8, 1.3, 0.8], 
                          opacity: [0.4, 1, 0.4],
                          filter: ['drop-shadow(0 0 10px rgba(6,182,212,0.2))', 'drop-shadow(0 0 30px rgba(6,182,212,0.6))', 'drop-shadow(0 0 10px rgba(6,182,212,0.2))']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-bold text-white mb-3"
                    >
                      Initializing {moduleName}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/70 text-lg"
                    >
                      Preparing your intelligent workspace...
                    </motion.p>
                    
                    {/* Loading progress indicators */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 space-y-2"
                    >
                      {['Loading AI modules', 'Connecting to data sources', 'Optimizing performance'].map((step, index) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.2 }}
                          className="flex items-center justify-center gap-3 text-sm text-white/60"
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: accentColor }}
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity, 
                              delay: index * 0.3 
                            }}
                          />
                          {step}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full overflow-hidden"
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}