'use client'

import { useState, useEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import OrbitalGrid from './core/OrbitalGrid'
import DataFlowCanvas from './core/DataFlowCanvas'
import AIBrainCenter from './core/AIBrainCenter'
import { fadeInUp, staggerContainer } from './utils/animations'
import { Loader2, ChevronRight, Layers, Cpu, Shield, TrendingUp, Brain, Zap, Network, Activity } from 'lucide-react'
import FullScreenModal from './modules/CommandCenter/components/FullScreenModal'

// Lazy load module dashboards directly for single-click access
const CommandCenterDashboard = lazy(() => import('./modules/CommandCenter/CommandCenterDashboard'))
const FinancialSuiteDashboard = lazy(() => import('./modules/FinancialSuite/FinancialSuiteDashboard'))
const SalesCRMDashboard = lazy(() => import('./modules/SalesCRM/SalesCRMDashboard'))
const ProcurementDashboard = lazy(() => import('./modules/Procurement/ProcurementDashboard'))
const QualityControlDashboard = lazy(() => import('./modules/QualityControl/QualityControlDashboard'))
const HRWorkforceDashboard = lazy(() => import('./modules/HRWorkforce/HRWorkforceDashboard'))
const AnalyticsBIDashboard = lazy(() => import('./modules/AnalyticsBI/AnalyticsBIDashboard'))

const moduleComponents: Record<string, React.ComponentType> = {
  'financial': FinancialSuiteDashboard,
  'sales': SalesCRMDashboard,
  'procurement': ProcurementDashboard,
  'quality': QualityControlDashboard,
  'hr': HRWorkforceDashboard,
  'analytics': AnalyticsBIDashboard,
}

export default function VextrusEcosystem2D() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [showModuleModal, setShowModuleModal] = useState(false)
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)
  const [showDataFlow, setShowDataFlow] = useState(false)
  const [aiDecisions, setAiDecisions] = useState(524)
  const [parent] = useAutoAnimate()
  
  // Simulate AI activity
  useEffect(() => {
    const interval = setInterval(() => {
      setAiDecisions(prev => prev + Math.floor(Math.random() * 5))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId)
    setShowModuleModal(true)
  }

  const closeModal = () => {
    setShowModuleModal(false)
    setTimeout(() => setSelectedModule(null), 300) // Clear selection after animation
  }

  const ModuleComponent = selectedModule ? 
    (selectedModule === 'command' ? CommandCenterDashboard : moduleComponents[selectedModule]) 
    : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 opacity-50 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 opacity-50 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          ref={parent}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Cpu className="w-4 h-4" />
              AI-Powered ERP System
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent mb-4">
              The Vextrus Ecosystem
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Seven intelligent modules orchestrated by AI, transforming Bangladesh's construction industry 
              with real-time insights and automated decision-making
            </p>
          </motion.div>

          {/* Architecture View */}
          <AnimatePresence mode="wait">
            {(
              <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Main visualization container with enhanced glass morphism */}
                <div className="relative bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-purple-950/80 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden min-h-[950px] border border-white/5">
                  {/* Enhanced gradient mesh background */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-cyan-900/20" />
                    
                    {/* Animated gradient orbs */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)',
                          'radial-gradient(circle at 100% 100%, rgba(14,165,233,0.15) 0%, transparent 70%)',
                          'radial-gradient(circle at 0% 100%, rgba(168,85,247,0.15) 0%, transparent 70%)',
                          'radial-gradient(circle at 100% 0%, rgba(34,211,238,0.15) 0%, transparent 70%)',
                          'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)'
                        ]
                      }}
                      transition={{ duration: 20, repeat: Infinity }}
                    />
                    
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf610_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf610_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
                    
                    {/* Floating particles effect */}
                    <div className="absolute inset-0">
                      <motion.div
                        className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full blur-sm"
                        animate={{
                          y: [-20, 20, -20],
                          x: [-10, 10, -10],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute top-3/4 right-1/3 w-3 h-3 bg-cyan-400/20 rounded-full blur-sm"
                        animate={{
                          y: [20, -20, 20],
                          x: [10, -10, 10],
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-indigo-400/25 rounded-full blur-sm"
                        animate={{
                          y: [-15, 15, -15],
                          x: [-20, 20, -20],
                          opacity: [0.25, 0.5, 0.25]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    
                    {/* Glass shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)'
                      }}
                      animate={{
                        x: [-1000, 1000]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  {/* Modern Orbital Grid Layout */}
                  <OrbitalGrid 
                    onModuleClick={handleModuleClick}
                    activeConnections={[]}
                    onModuleHover={setHoveredModule}
                  />
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Module Modal - All modules now use fullscreen */}
      <FullScreenModal 
        isOpen={showModuleModal} 
        onClose={closeModal}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        }>
          {ModuleComponent && <ModuleComponent onClose={closeModal} />}
        </Suspense>
      </FullScreenModal>
    </div>
  )
}