'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Camera,
  Activity,
  FileCheck,
  Wrench,
  Bell,
  Search,
  X
} from 'lucide-react'
import { 
  AnimatedButton
} from '../../shared/ui'

// Import views
import DefectDetection from './views/DefectDetection'
import RealTimeMonitoring from './views/RealTimeMonitoring'
import InspectionReports from './views/InspectionReports'
import PredictiveMaintenance from './views/PredictiveMaintenance'

interface QualityControlDashboardProps {
  onClose?: () => void
}

export default function QualityControlDashboard({ onClose }: QualityControlDashboardProps) {
  const [activeView, setActiveView] = useState<'defects' | 'monitoring' | 'inspection' | 'maintenance'>('defects')
  const [qualityScore] = useState(96.8)
  const [realtimeDefects] = useState(234)
  const qualityControl = { dailyInspections: 487 }

  return (
    <div className="h-screen bg-[#0A0A0B] text-white overflow-hidden">
      {/* Header Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-16 border-b border-gray-800 px-6 flex items-center justify-between backdrop-blur-xl bg-black/50"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-md">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-xl font-bold">Quality Intelligence</h1>
          </div>

          <div className="flex items-center gap-2 ml-8">
            {[
              { id: 'defects', label: 'Defect Detection', icon: Camera },
              { id: 'monitoring', label: 'Live Monitor', icon: Activity },
              { id: 'inspection', label: 'Inspections', icon: FileCheck },
              { id: 'maintenance', label: 'Maintenance', icon: Wrench }
            ].map((view) => (
              <AnimatedButton
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                variant={activeView === view.id ? 'primary' : 'ghost'}
                size="sm"
                className={activeView === view.id ? 'bg-gradient-to-r from-amber-600 to-orange-600' : ''}
              >
                <view.icon className="w-4 h-4" />
                <span>{view.label}</span>
              </AnimatedButton>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          </AnimatedButton>
          <AnimatedButton variant="ghost" size="sm">
            <Search className="w-4 h-4" />
          </AnimatedButton>

          {onClose && (
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </AnimatedButton>
          )}
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeView === 'defects' && (
            <motion.div
              key="defects"
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
              <DefectDetection />
            </motion.div>
          )}

          {activeView === 'monitoring' && (
            <motion.div
              key="monitoring"
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
              <RealTimeMonitoring />
            </motion.div>
          )}

          {activeView === 'inspection' && (
            <motion.div
              key="inspection"
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
              <InspectionReports />
            </motion.div>
          )}

          {activeView === 'maintenance' && (
            <motion.div
              key="maintenance"
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
              <PredictiveMaintenance />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Floating Quality Metrics */}
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
              <div className="text-lg font-bold text-amber-400">
                {qualityScore.toFixed(1)}%
              </div>
              <div className="text-xs glass-text-muted">Quality</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-green-400">
                {realtimeDefects}
              </div>
              <div className="text-xs glass-text-muted">Defects</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-blue-400">
                {qualityControl.dailyInspections}
              </div>
              <div className="text-xs glass-text-muted">Daily</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Liquid Glass Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl"
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