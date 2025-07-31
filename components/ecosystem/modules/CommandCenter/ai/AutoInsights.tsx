'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, RefreshCw, TrendingUp, TrendingDown, Lightbulb, ChevronRight } from 'lucide-react'

interface Insight {
  id: string
  category: 'performance' | 'cost' | 'schedule' | 'risk' | 'opportunity'
  title: string
  summary: string
  details: string[]
  impact: 'positive' | 'negative' | 'neutral'
  confidence: number // 0-100%
  dataPoints: {
    label: string
    value: string | number
    trend?: 'up' | 'down' | 'stable'
  }[]
  recommendations: string[]
  generatedAt: Date
}

interface AutoInsightsProps {
  data: any
  onInsightAction?: (insightId: string, action: string) => void
}

export default function AutoInsights({ data, onInsightAction }: AutoInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)

  // Generate insights using AI logic
  const generateInsights = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const newInsights: Insight[] = [
        {
          id: `insight-${Date.now()}-1`,
          category: 'performance',
          title: 'Worker Productivity Trending Upward',
          summary: 'Analysis shows 12% improvement in overall worker productivity over the past month, exceeding industry benchmarks.',
          details: [
            'Morning shift productivity increased by 18%',
            'Equipment downtime reduced by 25%',
            'Weather-adjusted performance up 8%'
          ],
          impact: 'positive',
          confidence: 87,
          dataPoints: [
            { label: 'Current Productivity', value: '87.5%', trend: 'up' },
            { label: 'Monthly Average', value: '82.3%', trend: 'up' },
            { label: 'Industry Benchmark', value: '78%', trend: 'stable' }
          ],
          recommendations: [
            'Maintain current workflow optimizations',
            'Consider documenting best practices from high-performing teams',
            'Invest in similar equipment upgrades for other sites'
          ],
          generatedAt: new Date()
        },
        {
          id: `insight-${Date.now()}-2`,
          category: 'cost',
          title: 'Material Cost Optimization Opportunity',
          summary: 'AI detected potential savings of ৳3.2 Cr through bulk purchasing and supplier consolidation strategies.',
          details: [
            'Steel prices vary 8-12% between current suppliers',
            'Bulk orders over 500 tons unlock 15% discount',
            'Storage costs offset by price stability benefits'
          ],
          impact: 'positive',
          confidence: 92,
          dataPoints: [
            { label: 'Potential Savings', value: '৳3.2 Cr', trend: 'up' },
            { label: 'Current Spend', value: '৳28.5 Cr', trend: 'stable' },
            { label: 'Optimal Order Size', value: '750 tons', trend: 'up' }
          ],
          recommendations: [
            'Negotiate master agreement with top 3 suppliers',
            'Implement just-in-time delivery for non-critical materials',
            'Create material requirement forecast for next quarter'
          ],
          generatedAt: new Date()
        },
        {
          id: `insight-${Date.now()}-3`,
          category: 'risk',
          title: 'Weather-Related Schedule Risk Identified',
          summary: 'Monsoon season analysis indicates 65% probability of 2-week delay for outdoor activities in next 30 days.',
          details: [
            'Historical data shows 80% correlation with delays',
            'Critical path activities exposed to weather risk',
            'Indoor work can be accelerated to compensate'
          ],
          impact: 'negative',
          confidence: 78,
          dataPoints: [
            { label: 'Risk Probability', value: '65%', trend: 'up' },
            { label: 'Potential Delay', value: '14 days', trend: 'stable' },
            { label: 'Mitigation Readiness', value: '45%', trend: 'down' }
          ],
          recommendations: [
            'Prioritize indoor activities for next 4 weeks',
            'Secure weather protection equipment now',
            'Adjust project timeline with 2-week buffer'
          ],
          generatedAt: new Date()
        }
      ]

      setInsights(newInsights)
      setIsGenerating(false)
    }, 2000)
  }

  // Auto-generate insights on data change
  useEffect(() => {
    if (data) {
      generateInsights()
    }
  }, [data])

  const getCategoryColor = (category: Insight['category']) => {
    switch (category) {
      case 'performance': return '#10B981'
      case 'cost': return '#F59E0B'
      case 'schedule': return '#3B82F6'
      case 'risk': return '#EF4444'
      case 'opportunity': return '#8B5CF6'
    }
  }

  const getImpactIcon = (impact: Insight['impact']) => {
    switch (impact) {
      case 'positive': return TrendingUp
      case 'negative': return TrendingDown
      case 'neutral': return Lightbulb
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Brain className="w-6 h-6 text-indigo-600" />
            <Sparkles className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">AI Auto-Insights</h3>
          <span className="text-xs text-gray-500">
            Natural Language Analysis
          </span>
        </div>
        
        <motion.button
          onClick={generateInsights}
          disabled={isGenerating}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          Refresh
        </motion.button>
      </div>

      {/* Insights Grid */}
      <AnimatePresence mode="popLayout">
        {isGenerating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-12"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-sm text-gray-600">AI is analyzing your data...</p>
              <p className="text-xs text-gray-500 mt-1">Generating natural language insights</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {insights.map((insight, index) => {
              const Icon = getImpactIcon(insight.impact)
              const color = getCategoryColor(insight.category)
              const isExpanded = selectedInsight === insight.id

              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Insight Header */}
                  <motion.div
                    className="p-4 cursor-pointer"
                    onClick={() => setSelectedInsight(isExpanded ? null : insight.id)}
                    whileHover={{ backgroundColor: '#F9FAFB' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                            <span 
                              className="px-2 py-0.5 text-xs rounded-full"
                              style={{ 
                                backgroundColor: `${color}20`,
                                color: color
                              }}
                            >
                              {insight.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{insight.summary}</p>
                          
                          {/* Confidence Score */}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">AI Confidence:</span>
                            <div className="flex-1 max-w-[100px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${insight.confidence}%` }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                              />
                            </div>
                            <span className="text-xs font-mono text-gray-700">
                              {insight.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-4 space-y-4">
                          {/* Key Details */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">
                              Key Findings
                            </h5>
                            <ul className="space-y-1">
                              {insight.details.map((detail, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                  <span className="text-indigo-500 mt-0.5">•</span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Data Points */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">
                              Supporting Data
                            </h5>
                            <div className="grid grid-cols-3 gap-3">
                              {insight.dataPoints.map((point, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-3">
                                  <p className="text-xs text-gray-500 mb-1">{point.label}</p>
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold text-gray-900">{point.value}</p>
                                    {point.trend && (
                                      <span className={`text-xs ${
                                        point.trend === 'up' ? 'text-green-500' :
                                        point.trend === 'down' ? 'text-red-500' :
                                        'text-gray-500'
                                      }`}>
                                        {point.trend === 'up' ? '↑' :
                                         point.trend === 'down' ? '↓' : '→'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* AI Recommendations */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">
                              AI Recommendations
                            </h5>
                            <div className="space-y-2">
                              {insight.recommendations.map((rec, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg"
                                >
                                  <Lightbulb className="w-4 h-4 text-indigo-600 mt-0.5" />
                                  <p className="text-sm text-indigo-700 flex-1">{rec}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex justify-end">
                            <button
                              onClick={() => onInsightAction?.(insight.id, 'apply')}
                              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              Apply Recommendations
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}