'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain,
  AlertTriangle,
  Wrench,
  Shield,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  Building,
  Truck,
  Zap,
  Activity,
  BarChart3,
  Eye,
  Bell,
  Sparkles,
  Target,
  Settings,
  Info,
  ChevronRight,
  Hammer,
  HardHat,
  Package,
  Timer,
  ThermometerSun,
  CloudRain,
  Award
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedChart, AnimatedCounter } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface AIInsight {
  id: string
  type: 'maintenance' | 'safety' | 'quality' | 'scheduling' | 'resource' | 'weather'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  action: string
  value?: string
  relatedSites?: string[]
  predictedDate?: Date
  category: string
}

interface EnhancedAIInsightsViewProps {
  realtimeData?: any
  predictions?: any[]
  isProcessing?: boolean
}

export default function EnhancedAIInsightsView({ 
  realtimeData, 
  predictions, 
  isProcessing = false 
}: EnhancedAIInsightsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])

  // Generate construction-specific AI insights
  useEffect(() => {
    const insights: AIInsight[] = [
      {
        id: '1',
        type: 'maintenance',
        title: 'Predictive Equipment Maintenance Alert',
        description: 'Tower Crane #TC-47 at Gulshan site shows vibration patterns indicating bearing wear. Maintenance required within 48 hours.',
        impact: 'high',
        confidence: 92,
        action: 'Schedule maintenance window',
        value: '৳15 Lakh',
        relatedSites: ['Gulshan Tower', 'Uttara Complex'],
        category: 'Equipment Health',
        predictedDate: new Date(Date.now() + 48 * 60 * 60 * 1000)
      },
      {
        id: '2',
        type: 'safety',
        title: 'Safety Risk Pattern Detected',
        description: 'AI vision analysis shows 23% of workers not wearing proper PPE during afternoon shifts. Increased accident risk identified.',
        impact: 'high',
        confidence: 95,
        action: 'Immediate safety briefing required',
        relatedSites: ['Dhanmondi Plaza', 'Mirpur Heights'],
        category: 'Safety Compliance'
      },
      {
        id: '3',
        type: 'quality',
        title: 'Concrete Quality Anomaly',
        description: 'Thermal imaging detected improper curing in Block C foundation. 15% strength reduction predicted if not addressed.',
        impact: 'medium',
        confidence: 88,
        action: 'Apply additional curing compound',
        value: '৳8 Lakh',
        relatedSites: ['Bashundhara City II'],
        category: 'Quality Control'
      },
      {
        id: '4',
        type: 'scheduling',
        title: 'Smart Schedule Optimization',
        description: 'AI suggests resequencing steel work to avoid monsoon delays. Can save 12 days on critical path.',
        impact: 'medium',
        confidence: 84,
        action: 'Review and approve new schedule',
        value: '৳45 Lakh',
        category: 'Project Timeline'
      },
      {
        id: '5',
        type: 'resource',
        title: 'Material Shortage Prediction',
        description: 'Supply chain analysis predicts cement shortage in 2 weeks due to transport strikes. Order now to avoid delays.',
        impact: 'high',
        confidence: 91,
        action: 'Place advance order',
        value: '৳2.3 Cr',
        relatedSites: ['All Active Sites'],
        category: 'Supply Chain'
      },
      {
        id: '6',
        type: 'weather',
        title: 'Weather Impact Analysis',
        description: 'Heavy rainfall predicted next week. AI recommends accelerating roof work on 3 sites to prevent water damage.',
        impact: 'medium',
        confidence: 87,
        action: 'Adjust work schedules',
        predictedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        category: 'Environmental'
      }
    ]
    setAiInsights(insights)
  }, [])

  // Filter insights by category
  const filteredInsights = useMemo(() => {
    if (selectedCategory === 'all') return aiInsights
    return aiInsights.filter(insight => insight.type === selectedCategory)
  }, [aiInsights, selectedCategory])

  // AI performance metrics
  const aiMetrics = [
    { label: 'Predictions Made', value: 2847, displayValue: '2,847', trend: '+15%', icon: Brain },
    { label: 'Accuracy Rate', value: 94.8, displayValue: '94.8%', trend: '+2.3%', icon: Target },
    { label: 'Issues Prevented', value: 156, displayValue: '156', trend: '+28%', icon: Shield },
    { label: 'Cost Saved', value: 8.4, displayValue: '৳8.4 Cr', trend: '+34%', icon: TrendingUp }
  ]

  // Insight categories
  const categories = [
    { id: 'all', label: 'All Insights', icon: Brain, count: aiInsights.length },
    { id: 'maintenance', label: 'Equipment', icon: Wrench, count: 2 },
    { id: 'safety', label: 'Safety', icon: Shield, count: 3 },
    { id: 'quality', label: 'Quality', icon: Award, count: 2 },
    { id: 'scheduling', label: 'Schedule', icon: Calendar, count: 1 },
    { id: 'resource', label: 'Resources', icon: Package, count: 2 },
    { id: 'weather', label: 'Weather', icon: CloudRain, count: 1 }
  ]

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'high': return '#EF4444'
      case 'medium': return '#F59E0B'
      case 'low': return '#10B981'
      default: return '#6B7280'
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'maintenance': return Wrench
      case 'safety': return Shield
      case 'quality': return Award
      case 'scheduling': return Calendar
      case 'resource': return Package
      case 'weather': return CloudRain
      default: return Brain
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Brain className="w-8 h-8 text-purple-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Construction AI Intelligence
            </h1>
            <p className="text-white/60 mt-1">
              AI-powered insights for construction excellence
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <AnimatedButton
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Configure
          </AnimatedButton>
          <AnimatedButton
            variant="primary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate Report
          </AnimatedButton>
        </div>
      </motion.div>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {aiMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/60">{metric.label}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <div className="text-2xl font-bold text-white">
                      {metric.displayValue}
                    </div>
                    <span className="text-sm text-green-400">{metric.trend}</span>
                  </div>
                </div>
                <metric.icon className="w-5 h-5 text-white/40" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {categories.map((category) => (
          <AnimatedButton
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <category.icon className="w-4 h-4" />
            {category.label}
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
              {category.count}
            </span>
          </AnimatedButton>
        ))}
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredInsights.map((insight, index) => {
            const TypeIcon = getTypeIcon(insight.type)
            
            return (
              <motion.div
                key={insight.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
              >
                <GlassCard 
                  className="p-5 cursor-pointer"
                  onClick={() => setShowDetails(showDetails === insight.id ? null : insight.id)}
                >
                  {/* Insight Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ 
                          backgroundColor: `${getImpactColor(insight.impact)}20`,
                          border: `1px solid ${getImpactColor(insight.impact)}40`
                        }}
                      >
                        <TypeIcon className="w-5 h-5" style={{ color: getImpactColor(insight.impact) }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{insight.title}</h3>
                        <p className="text-sm text-white/60 mt-1">{insight.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">
                          {insight.confidence}%
                        </div>
                        <div className="text-xs text-white/60">Confidence</div>
                      </div>
                    </div>
                  </div>

                  {/* Insight Description */}
                  <p className="text-sm text-white/80 mb-3">{insight.description}</p>

                  {/* Impact and Value */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getImpactColor(insight.impact) }}
                        />
                        <span className="text-xs text-white/60 capitalize">
                          {insight.impact} Impact
                        </span>
                      </div>
                      {insight.value && (
                        <div className="text-sm font-medium text-cyan-400">
                          Potential Savings: {insight.value}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <AnimatedButton
                    variant="primary"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    {insight.action}
                  </AnimatedButton>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {showDetails === insight.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
                      >
                        {insight.relatedSites && (
                          <div className="mb-3">
                            <p className="text-xs text-white/60 mb-2">Affected Sites:</p>
                            <div className="flex flex-wrap gap-2">
                              {insight.relatedSites.map(site => (
                                <span 
                                  key={site}
                                  className="px-2 py-1 rounded-lg bg-white/5 text-xs text-white/80"
                                >
                                  {site}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {insight.predictedDate && (
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Timer className="w-4 h-4" />
                            <span>
                              Predicted: {insight.predictedDate.toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Real-time Processing Indicator */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <GlassCard className="px-4 py-2 flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/80">AI analyzing construction data...</span>
          </GlassCard>
        </motion.div>
      )}
    </div>
  )
}