'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  Brain,
  LineChart,
  FileText,
  TrendingUp,
  Globe,
  MessageSquare,
  Sparkles,
  Search,
  Bell,
  PieChart,
  Target
} from 'lucide-react'
import ModuleWrapper from '../../shared/ModuleWrapper'
import { 
  GlassCard, 
  AnimatedButton, 
  LoadingSkeleton
} from '../../shared/ui'

// Import views
import ExecutiveDashboard from './views/ExecutiveDashboard'
import PredictiveAnalytics from './views/PredictiveAnalytics'
import MarketIntelligence from './views/MarketIntelligence'
import CustomReports from './views/CustomReports'

export default function AnalyticsBI() {
  const [activeView, setActiveView] = useState<'executive' | 'predictive' | 'market' | 'reports'>('executive')

  const features = [
    {
      icon: Brain,
      title: 'NLP Insights',
      description: 'Natural language business intelligence'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Modeling',
      description: 'ML-powered forecasting & trends'
    },
    {
      icon: Globe,
      title: 'Market Analysis',
      description: 'Competitor & industry intelligence'
    },
    {
      icon: MessageSquare,
      title: 'Ask AI',
      description: 'Query data in plain language'
    }
  ]

  const metrics = [
    { label: 'Insights Generated', value: '1,234', trend: '+89' },
    { label: 'Prediction Accuracy', value: '94%', trend: '+2.3%' },
    { label: 'Reports Created', value: '567', trend: '+45' },
    { label: 'Time Saved', value: '72h/mo', trend: '+18h' }
  ]

  return (
    <ModuleWrapper
      moduleName="AI Business Intelligence"
      moduleIcon={BarChart3}
      moduleDescription="NLP-powered analytics with predictive modeling for strategic decisions"
      features={features}
      metrics={metrics}
      accentColor="#6366F1"
      directAccess={true}
    >
      <div className="h-screen bg-[#0A0A0B] text-white overflow-hidden">
        {/* Header Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-16 border-b border-gray-800 px-6 flex items-center justify-between backdrop-blur-xl bg-black/50"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-md">
                <BarChart3 className="w-6 h-6 text-indigo-400" />
              </div>
              <h1 className="text-xl font-bold">Business Intelligence Hub</h1>
            </div>

            <div className="flex items-center gap-2 ml-8">
              {[
                { id: 'executive', label: 'Executive', icon: PieChart },
                { id: 'predictive', label: 'Predictive', icon: LineChart },
                { id: 'market', label: 'Market Intel', icon: Globe },
                { id: 'reports', label: 'Reports', icon: FileText }
              ].map((view) => (
                <AnimatedButton
                  key={view.id}
                  onClick={() => setActiveView(view.id as any)}
                  variant={activeView === view.id ? 'primary' : 'ghost'}
                  size="sm"
                  className={activeView === view.id ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
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
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            </AnimatedButton>
            <AnimatedButton variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </AnimatedButton>
            <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <Sparkles className="w-4 h-4" />
              <span>Ask AI</span>
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeView === 'executive' && (
              <motion.div
                key="executive"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ExecutiveDashboard />
              </motion.div>
            )}

            {activeView === 'predictive' && (
              <motion.div
                key="predictive"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PredictiveAnalytics />
              </motion.div>
            )}

            {activeView === 'market' && (
              <motion.div
                key="market"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MarketIntelligence />
              </motion.div>
            )}

            {activeView === 'reports' && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CustomReports />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ModuleWrapper>
  )
}