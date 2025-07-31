'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, 
  TrendingDown,
  Link,
  Brain,
  Globe,
  Bell,
  Search,
  Settings,
  X
} from 'lucide-react'
import { 
  AnimatedButton
} from '../../shared/ui'
import { suppliers } from '../../../../lib/mockDatabase'

// Import views
import SupplierNetwork from './views/SupplierNetwork'
import PricePredictor from './views/PricePredictor'
import BlockchainTracking from './views/BlockchainTracking'
import AIInsights from './views/AIInsights'

interface ProcurementDashboardProps {
  onClose?: () => void
}

export default function ProcurementDashboard({ onClose }: ProcurementDashboardProps) {
  const [activeView, setActiveView] = useState<'suppliers' | 'prices' | 'blockchain' | 'ai-insights'>('suppliers')
  const [realtimeSuppliers, setRealtimeSuppliers] = useState(suppliers.length)

  // Simulate real-time supplier updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeSuppliers(prev => Math.max(1, prev + Math.floor((Math.random() - 0.5) * 3)))
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  // Calculate aggregate metrics from suppliers data
  const avgRating = suppliers.reduce((sum, s) => sum + (s.rating || 0), 0) / suppliers.length
  
  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Enhanced Header Navigation with Liquid Glass */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-20 px-8 flex items-center justify-between relative"
      >
        {/* Liquid Glass Background */}
        <div className="absolute inset-0 liquid-glass-medium border-b border-white/10" />

        <div className="flex items-center gap-8 relative z-10">
          {/* Module Identity */}
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Package className="w-7 h-7 text-green-400" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold glass-text-primary">Procurement Intelligence</h1>
              <p className="text-sm glass-text-muted">AI-powered supply chain optimization</p>
            </div>
          </div>

          {/* Enhanced Navigation Pills */}
          <div className="flex items-center gap-3 ml-8">
            {[
              { 
                id: 'suppliers', 
                label: 'Supplier Network', 
                icon: Globe,
                description: 'Verified vendor management',
                color: '#22C55E'
              },
              { 
                id: 'prices', 
                label: 'Price Predictor', 
                icon: TrendingDown,
                description: 'ML-powered forecasting',
                color: '#06B6D4' 
              },
              { 
                id: 'blockchain', 
                label: 'Blockchain', 
                icon: Link,
                description: 'Supply chain verification',
                color: '#8B5CF6'
              },
              { 
                id: 'ai-insights', 
                label: 'AI Analytics', 
                icon: Brain,
                description: 'Intelligent insights',
                color: '#EC4899'
              }
            ].map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedButton
                  onClick={() => setActiveView(item.id as any)}
                  variant={activeView === item.id ? 'liquid' : 'ghost'}
                  size="md"
                  className={
                    activeView === item.id 
                      ? 'bg-gradient-to-r from-green-500/90 to-emerald-600/90 border-green-400/30' 
                      : 'hover:bg-white/10 border-white/10'
                  }
                  style={
                    activeView === item.id 
                      ? { backgroundColor: `${item.color}20`, borderColor: `${item.color}30` }
                      : {}
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </AnimatedButton>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Action Controls */}
        <div className="flex items-center gap-4 relative z-10">
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl liquid-glass-light border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs glass-text-muted">
              {realtimeSuppliers} Active
            </span>
          </motion.div>

          <AnimatedButton variant="ghost" size="sm" className="p-3 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </AnimatedButton>
          
          <AnimatedButton variant="ghost" size="sm" className="p-3">
            <Search className="w-5 h-5" />
          </AnimatedButton>

          <AnimatedButton variant="ghost" size="sm" className="p-3">
            <Settings className="w-5 h-5" />
          </AnimatedButton>

          {onClose && (
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-3 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </AnimatedButton>
          )}
        </div>
      </motion.div>

      {/* Enhanced Main Content Area with Better Transitions */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        <AnimatePresence mode="wait">
          {activeView === 'suppliers' && (
            <motion.div
              key="suppliers"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <SupplierNetwork />
            </motion.div>
          )}

          {activeView === 'prices' && (
            <motion.div
              key="prices"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <PricePredictor />
            </motion.div>
          )}

          {activeView === 'blockchain' && (
            <motion.div
              key="blockchain"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <BlockchainTracking />
            </motion.div>
          )}

          {activeView === 'ai-insights' && (
            <motion.div
              key="ai-insights"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <AIInsights />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Floating Procurement Metrics */}
      <motion.div
        className="absolute bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="p-4 rounded-2xl liquid-glass-strong border border-white/20"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-green-400">
                {realtimeSuppliers}
              </div>
              <div className="text-xs glass-text-muted">Suppliers</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-cyan-400">
                94%
              </div>
              <div className="text-xs glass-text-muted">On-time</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-purple-400">
                {avgRating.toFixed(1)}
              </div>
              <div className="text-xs glass-text-muted">Rating</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Liquid Glass Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
    </div>
  )
}