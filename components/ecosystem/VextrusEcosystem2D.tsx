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
                {/* Main visualization container with modern glass morphism */}
                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden min-h-[950px] border border-white/10">
                  {/* Gradient mesh background */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-cyan-50 opacity-50" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 100%, rgba(139,92,246,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 0% 100%, rgba(139,92,246,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 0%, rgba(139,92,246,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.1) 0%, transparent 50%)'
                        ]
                      }}
                      transition={{ duration: 20, repeat: Infinity }}
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
          {ModuleComponent && <ModuleComponent />}
        </Suspense>
      </FullScreenModal>
    </div>
  )
}