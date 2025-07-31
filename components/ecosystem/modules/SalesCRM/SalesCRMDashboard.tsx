'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Target, 
  Building2,
  MessageSquare,
  Brain,
  Eye,
  Sparkles,
  Mic,
  X
} from 'lucide-react'
import { 
  AnimatedButton
} from '../../shared/ui'

// Import views
import PipelineView from './views/PipelineView'
import BuildingVisualization from './views/BuildingVisualization'
import VirtualTours from './views/VirtualTours'
import AILeadIntelligence from './views/AILeadIntelligence'

interface SalesCRMDashboardProps {
  onClose?: () => void
}

export default function SalesCRMDashboard({ onClose }: SalesCRMDashboardProps) {
  const [activeView, setActiveView] = useState<'pipeline' | 'building' | 'tours' | 'ai-leads'>('pipeline')

  return (
    <div className="h-screen bg-gradient-to-br from-vextrus-dark/95 via-vextrus-dark/98 to-purple-900/20 text-white overflow-hidden">
      {/* Header Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-16 border-b border-white/10 px-6 flex items-center justify-between backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/2"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-md border border-white/10 shadow-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                AI Sales Intelligence
              </h1>
              <p className="text-xs text-purple-300/80">Lead Management & Property Visualization</p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-8">
            {[
              { id: 'pipeline', label: 'Lead Pipeline', icon: Target },
              { id: 'building', label: '3D Properties', icon: Building2 },
              { id: 'tours', label: 'Virtual Tours', icon: Eye },
              { id: 'ai-leads', label: 'AI Intelligence', icon: Brain }
            ].map((view) => (
              <AnimatedButton
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                variant={activeView === view.id ? 'primary' : 'ghost'}
                size="sm"
                className={activeView === view.id ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25' : 'hover:bg-white/5'}
              >
                <view.icon className="w-4 h-4" />
                <span>{view.label}</span>
              </AnimatedButton>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* WhatsApp Integration Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">WhatsApp Connected</span>
          </div>

          <AnimatedButton variant="ghost" size="sm" className="relative hover:bg-white/5">
            <MessageSquare className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </AnimatedButton>
          
          <AnimatedButton variant="ghost" size="sm" className="hover:bg-white/5">
            <Mic className="w-4 h-4" />
          </AnimatedButton>

          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25">
            <Sparkles className="w-4 h-4" />
            <span>AI Insights</span>
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
          {activeView === 'pipeline' && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PipelineView />
            </motion.div>
          )}

          {activeView === 'building' && (
            <motion.div
              key="building"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BuildingVisualization />
            </motion.div>
          )}

          {activeView === 'tours' && (
            <motion.div
              key="tours"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VirtualTours />
            </motion.div>
          )}

          {activeView === 'ai-leads' && (
            <motion.div
              key="ai-leads"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AILeadIntelligence />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}