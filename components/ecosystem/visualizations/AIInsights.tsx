'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, AlertTriangle, TrendingUp, DollarSign, Clock, Zap, MessageSquare, CheckCircle } from 'lucide-react'
import { formatBDT } from '../utils/bdCurrency'

interface Insight {
  id: string
  type: 'warning' | 'opportunity' | 'alert' | 'success'
  category: 'cost' | 'schedule' | 'quality' | 'resource'
  title: string
  description: string
  impact: string
  confidence: number
  actions: Action[]
  timestamp: Date
  priority: 'high' | 'medium' | 'low'
}

interface Action {
  id: string
  label: string
  type: 'primary' | 'secondary'
  impact: string
}

const sampleInsights: Insight[] = [
  {
    id: '1',
    type: 'warning',
    category: 'schedule',
    title: 'Monsoon Impact Detected',
    description: 'Weather forecast shows 85% probability of heavy rain next week. This will affect concrete work at Tower B and foundation work at Uttara site.',
    impact: '12-15 days delay if not addressed',
    confidence: 87,
    actions: [
      { id: 'a1', label: 'Reschedule concrete pours', type: 'primary', impact: 'Save 12 days' },
      { id: 'a2', label: 'Deploy weather protection', type: 'secondary', impact: 'Reduce risk by 60%' }
    ],
    timestamp: new Date(),
    priority: 'high'
  },
  {
    id: '2',
    type: 'opportunity',
    category: 'cost',
    title: 'Bulk Purchase Opportunity',
    description: 'Steel prices are predicted to drop by 8% in the next 10 days based on market analysis. Optimal time to purchase for 3 upcoming projects.',
    impact: formatBDT(5000000) + ' potential savings',
    confidence: 92,
    actions: [
      { id: 'a3', label: 'Create bulk purchase order', type: 'primary', impact: 'Save ' + formatBDT(5000000) },
      { id: 'a4', label: 'Lock in supplier quotes', type: 'secondary', impact: 'Guarantee pricing' }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    priority: 'high'
  },
  {
    id: '3',
    type: 'alert',
    category: 'quality',
    title: 'Unusual Material Consumption',
    description: 'Cement consumption at Block A is 23% higher than similar projects. Pattern analysis suggests potential wastage or theft.',
    impact: formatBDT(1500000) + ' at risk',
    confidence: 78,
    actions: [
      { id: 'a5', label: 'Conduct immediate audit', type: 'primary', impact: 'Prevent further loss' },
      { id: 'a6', label: 'Install CCTV monitoring', type: 'secondary', impact: 'Long-term prevention' }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    priority: 'high'
  },
  {
    id: '4',
    type: 'success',
    category: 'resource',
    title: 'Optimal Resource Allocation Found',
    description: 'AI has identified that moving 15 workers from Gulshan Tower A to Dhanmondi Complex can accelerate both projects.',
    impact: '8 days saved across projects',
    confidence: 94,
    actions: [
      { id: 'a7', label: 'Implement reallocation', type: 'primary', impact: 'Save 8 days' },
      { id: 'a8', label: 'View detailed plan', type: 'secondary', impact: 'See breakdown' }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    priority: 'medium'
  }
]

export default function AIInsights() {
  const [insights, setInsights] = useState(sampleInsights)
  const [filter, setFilter] = useState<'all' | 'warning' | 'opportunity' | 'alert' | 'success'>('all')
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)
  const [processingAction, setProcessingAction] = useState<string | null>(null)
  const insightIdCounter = useRef(100) // Start at 100 to avoid conflicts
  const actionIdCounter = useRef(1000) // Start at 1000 for action IDs

  // Simulate new insights coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const randomInsight = generateRandomInsight()
      setInsights(prev => [randomInsight, ...prev].slice(0, 10))
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const generateRandomInsight = (): Insight => {
    const types: Insight['type'][] = ['warning', 'opportunity', 'alert', 'success']
    const categories: Insight['category'][] = ['cost', 'schedule', 'quality', 'resource']
    
    const templates = [
      {
        title: 'Equipment Optimization',
        description: 'Crane at Uttara site will be idle for 3 days. Can be utilized at Gulshan site.',
        impact: formatBDT(200000) + ' savings'
      },
      {
        title: 'Supplier Price Alert',
        description: 'Your regular brick supplier has increased prices by 12%. Alternative suppliers available.',
        impact: formatBDT(800000) + ' additional cost'
      },
      {
        title: 'Worker Productivity Insight',
        description: 'Thursday productivity is 30% lower across all sites. Pattern suggests extended prayer time impact.',
        impact: '2 days per month lost'
      }
    ]

    const template = templates[Math.floor(Math.random() * templates.length)]
    
    return {
      id: `insight-${insightIdCounter.current++}`,
      type: types[Math.floor(Math.random() * types.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      title: template.title,
      description: template.description,
      impact: template.impact,
      confidence: 75 + Math.floor(Math.random() * 20),
      actions: [
        { id: `action-${actionIdCounter.current++}`, label: 'Take Action', type: 'primary', impact: 'Immediate' },
        { id: `action-${actionIdCounter.current++}`, label: 'Learn More', type: 'secondary', impact: 'Details' }
      ],
      timestamp: new Date(),
      priority: Math.random() > 0.5 ? 'high' : 'medium'
    }
  }

  const filteredInsights = filter === 'all' 
    ? insights 
    : insights.filter(i => i.type === filter)

  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'warning': return AlertTriangle
      case 'opportunity': return TrendingUp
      case 'alert': return Zap
      case 'success': return CheckCircle
    }
  }

  const getColor = (type: Insight['type']) => {
    switch (type) {
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'opportunity': return 'text-green-600 bg-green-100'
      case 'alert': return 'text-red-600 bg-red-100'
      case 'success': return 'text-blue-600 bg-blue-100'
    }
  }

  const getCategoryIcon = (category: Insight['category']) => {
    switch (category) {
      case 'cost': return DollarSign
      case 'schedule': return Clock
      case 'quality': return CheckCircle
      case 'resource': return Brain
    }
  }

  const handleAction = async (insightId: string, actionId: string) => {
    setProcessingAction(actionId)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Remove the insight after action
    setInsights(prev => prev.filter(i => i.id !== insightId))
    setProcessingAction(null)
    setSelectedInsight(null)
  }

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="w-full">
      {/* Header and Filters */}
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          AI-Powered Insights
          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
            {filteredInsights.length} active
          </span>
        </h4>
        
        <div className="flex gap-2">
          {(['all', 'warning', 'opportunity', 'alert', 'success'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                filter === type 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        <AnimatePresence>
          {filteredInsights.map((insight, index) => {
            const Icon = getIcon(insight.type)
            const CategoryIcon = getCategoryIcon(insight.category)
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                  insight.priority === 'high' ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getColor(insight.type)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                            {insight.title}
                            <CategoryIcon className="w-4 h-4 text-gray-400" />
                          </h5>
                          <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm font-medium text-gray-700">
                              Impact: <span className="text-purple-600">{insight.impact}</span>
                            </span>
                            <span className="text-sm text-gray-500">
                              Confidence: {insight.confidence}%
                            </span>
                            <span className="text-xs text-gray-400">
                              {getTimeAgo(insight.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2 mt-3">
                        {insight.actions.map(action => (
                          <motion.button
                            key={action.id}
                            onClick={() => handleAction(insight.id, action.id)}
                            disabled={processingAction === action.id}
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                              action.type === 'primary'
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            } ${processingAction === action.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {processingAction === action.id ? (
                              <span className="flex items-center gap-2">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                                />
                                Processing...
                              </span>
                            ) : (
                              action.label
                            )}
                          </motion.button>
                        ))}
                      </div>
                      
                      {/* Confidence Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <motion.div
                            className="bg-purple-600 h-1.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${insight.confidence}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* AI Assistant Chat */}
      <motion.div
        className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Ask AI Assistant</p>
            <input
              type="text"
              placeholder="Why are Thursday productivity levels lower?"
              className="mt-1 w-full px-3 py-2 bg-white rounded-lg text-sm border border-purple-200 focus:outline-none focus:border-purple-400"
            />
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
            Ask
          </button>
        </div>
      </motion.div>
    </div>
  )
}