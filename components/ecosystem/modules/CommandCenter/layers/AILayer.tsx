'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb,
  MessageSquare,
  BarChart3,
  Target,
  Zap,
  Shield,
  DollarSign,
  Clock,
  Users,
  CloudRain,
  ThermometerSun,
  Package,
  Cpu
} from 'lucide-react'
import { formatBDT } from '@/components/ecosystem/utils/bdCurrency'
import HolographicCard from '../components/HolographicCard'

interface AILayerProps {
  predictions: any[]
  realtimeData: any
}

interface AIInsight {
  id: string
  type: 'warning' | 'opportunity' | 'recommendation'
  category: 'cost' | 'schedule' | 'quality' | 'resource' | 'weather' | 'safety'
  title: string
  description: string
  impact: string
  confidence: number
  urgency: 'high' | 'medium' | 'low'
  actions: string[]
  relatedData?: any
  timestamp: Date
}

const generateInsights = (): AIInsight[] => [
  {
    id: 'ai-1',
    type: 'warning',
    category: 'weather',
    title: 'Monsoon Impact Alert',
    description: 'Heavy rainfall predicted for next 5 days will impact concrete curing at Bashundhara Heights and foundation work at Jolshiri Towers. AI analysis shows 87% probability of delays.',
    impact: '15-18 days cumulative delay across projects',
    confidence: 87,
    urgency: 'high',
    actions: [
      'Reschedule concrete pours to morning hours',
      'Deploy weather protection systems',
      'Reallocate workers to indoor tasks'
    ],
    timestamp: new Date()
  },
  {
    id: 'ai-2',
    type: 'opportunity',
    category: 'cost',
    title: 'Bulk Material Purchase Window',
    description: 'ML models predict 12% steel price drop in next 10 days based on market trends and import data. Optimal purchase window identified.',
    impact: formatBDT(8500000) + ' potential savings',
    confidence: 92,
    urgency: 'high',
    actions: [
      'Lock supplier quotes by Monday',
      'Purchase 3-month steel inventory',
      'Negotiate long-term contracts'
    ],
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: 'ai-3',
    type: 'recommendation',
    category: 'resource',
    title: 'Workforce Optimization',
    description: 'AI detected inefficient resource allocation. Moving 25 workers from Jolshiri to Bashundhara can accelerate both projects by optimizing skill match.',
    impact: '8 days saved, ' + formatBDT(3200000) + ' cost reduction',
    confidence: 89,
    urgency: 'medium',
    actions: [
      'Transfer specialized masons to Tower A',
      'Implement cross-training program',
      'Update resource allocation matrix'
    ],
    timestamp: new Date(Date.now() - 7200000)
  },
  {
    id: 'ai-4',
    type: 'warning',
    category: 'quality',
    title: 'Concrete Mix Anomaly',
    description: 'Computer vision detected inconsistent concrete texture in Tower B Level 15. Pattern suggests improper water-cement ratio.',
    impact: 'Structural integrity risk, ' + formatBDT(12000000) + ' rework cost',
    confidence: 78,
    urgency: 'high',
    actions: [
      'Immediate quality inspection',
      'Core sample testing required',
      'Review batching plant logs'
    ],
    timestamp: new Date(Date.now() - 10800000)
  }
]

export default function AILayer({ predictions, realtimeData }: AILayerProps) {
  const [insights, setInsights] = useState<AIInsight[]>(generateInsights())
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | AIInsight['category']>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [naturalLanguageMode, setNaturalLanguageMode] = useState(false)
  const insightIdCounter = useRef(100) // Start at 100 to avoid conflicts with static insights

  // Simulate new insights
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newInsight = generateNewInsight()
        setInsights(prev => [newInsight, ...prev].slice(0, 20))
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const generateNewInsight = (): AIInsight => {
    const types: AIInsight['type'][] = ['warning', 'opportunity', 'recommendation']
    const categories: AIInsight['category'][] = ['cost', 'schedule', 'quality', 'resource', 'weather', 'safety']
    
    const templates = [
      {
        title: 'Equipment Maintenance Alert',
        description: 'Predictive maintenance AI detected unusual vibration patterns in Tower Crane #3.',
        impact: 'Prevent 3-day downtime',
        category: 'resource' as const
      },
      {
        title: 'Labor Productivity Pattern',
        description: 'Thursday afternoon productivity drops 35% across all sites. Cultural pattern detected.',
        impact: '2 hours/week productivity loss',
        category: 'resource' as const
      },
      {
        title: 'Material Theft Risk',
        description: 'Anomaly detection identified unusual material movement patterns at night.',
        impact: formatBDT(500000) + ' potential loss prevention',
        category: 'safety' as const
      }
    ]

    const template = templates[Math.floor(Math.random() * templates.length)]
    
    return {
      id: `ai-${insightIdCounter.current++}`,
      type: types[Math.floor(Math.random() * types.length)],
      category: template.category,
      title: template.title,
      description: template.description,
      impact: template.impact,
      confidence: 70 + Math.floor(Math.random() * 25),
      urgency: Math.random() > 0.5 ? 'high' : 'medium',
      actions: ['Investigate immediately', 'Generate detailed report', 'Schedule team meeting'],
      timestamp: new Date()
    }
  }

  const handleNaturalLanguageQuery = async (query: string) => {
    setIsProcessing(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate response based on query
    const response = {
      query,
      answer: `Based on my analysis of ${query}, here are the key findings...`,
      relatedInsights: insights.slice(0, 3),
      confidence: 85 + Math.floor(Math.random() * 10)
    }
    
    setIsProcessing(false)
    return response
  }

  const filteredInsights = insights.filter(insight => {
    if (filter !== 'all' && insight.category !== filter) return false
    if (searchQuery && !insight.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getCategoryIcon = (category: AIInsight['category']) => {
    const icons = {
      cost: DollarSign,
      schedule: Clock,
      quality: Shield,
      resource: Users,
      weather: CloudRain,
      safety: AlertTriangle
    }
    return icons[category]
  }

  const getCategoryColor = (category: AIInsight['category']) => {
    const colors = {
      cost: '#06B6D4',
      schedule: '#F59E0B',
      quality: '#8B5CF6',
      resource: '#22C55E',
      weather: '#3B82F6',
      safety: '#EF4444'
    }
    return colors[category]
  }

  return (
    <div className="w-full h-full flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            AI Intelligence Center
          </h3>
          <p className="text-gray-400">Real-time insights powered by machine learning</p>
        </div>

        {/* Natural Language Interface */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && naturalLanguageMode) {
                  handleNaturalLanguageQuery(searchQuery)
                }
              }}
              placeholder={naturalLanguageMode ? "Ask AI anything about your projects..." : "Search insights..."}
              className="w-full px-4 py-3 pl-12 bg-gray-100 backdrop-blur-sm rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            
            <button
              onClick={() => setNaturalLanguageMode(!naturalLanguageMode)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                naturalLanguageMode
                  ? 'bg-purple-600 text-gray-900'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              <Cpu className="w-4 h-4 inline mr-1" />
              AI Mode
            </button>
          </div>
          
          {isProcessing && (
            <div className="mt-2 text-sm text-purple-400 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              AI is analyzing your query...
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-gray-900'
                : 'bg-gray-800 text-gray-400 hover:text-gray-900'
            }`}
          >
            All Insights
          </button>
          {(['cost', 'schedule', 'quality', 'resource', 'weather', 'safety'] as const).map(category => {
            const Icon = getCategoryIcon(category)
            return (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  filter === category
                    ? 'text-gray-900'
                    : 'bg-gray-800 text-gray-400 hover:text-gray-900'
                }`}
                style={{
                  backgroundColor: filter === category ? getCategoryColor(category) : undefined
                }}
              >
                <Icon className="w-4 h-4" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          })}
        </div>

        {/* Insights Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4">
            <AnimatePresence>
              {filteredInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedInsight(insight.id)}
                  className="cursor-pointer"
                >
                  <HolographicCard
                    type={insight.type}
                    title={insight.title}
                    confidence={insight.confidence}
                    impact={insight.impact}
                    actions={insight.actions}
                    onDismiss={() => setInsights(prev => prev.filter(i => i.id !== insight.id))}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Sidebar - AI Metrics */}
      <div className="w-80 bg-white backdrop-blur-sm p-6 border-l border-gray-300">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Performance</h4>
        
        {/* Accuracy Metrics */}
        <div className="space-y-4 mb-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Prediction Accuracy</span>
              <span className="text-sm font-medium text-gray-900">94.2%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '94.2%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Insights Generated</span>
              <span className="text-sm font-medium text-gray-900">1,247</span>
            </div>
            <p className="text-xs text-gray-500">Last 24 hours</p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Actions Taken</span>
              <span className="text-sm font-medium text-gray-900">89%</span>
            </div>
            <p className="text-xs text-gray-500">User adoption rate</p>
          </div>
        </div>

        {/* Live Processing */}
        <div className="mb-6">
          <h5 className="text-sm font-medium text-gray-400 mb-3">Real-time Analysis</h5>
          <div className="space-y-2">
            {['Weather patterns', 'Market prices', 'Worker productivity', 'Equipment status'].map((item, index) => (
              <div key={item} className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.5,
                    repeat: Infinity
                  }}
                />
                <span className="text-xs text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Model Status */}
        <div>
          <h5 className="text-sm font-medium text-gray-400 mb-3">AI Models</h5>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300">Cost Predictor v3.2</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300">Weather Impact ML</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300">Resource Optimizer</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300">Quality Inspector CV</span>
              <span className="text-yellow-400">Training</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}