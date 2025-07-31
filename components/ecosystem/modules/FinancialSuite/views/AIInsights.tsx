'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Target,
  Zap,
  ArrowRight,
  Activity,
  DollarSign,
  Calendar,
  Users,
  Shield,
  Sparkles,
  BarChart3,
  ChevronRight
} from 'lucide-react'
import { GlassCard, AnimatedButton } from '../../../shared/ui'
import { formatBDT, formatPercentage } from '../../../utils/bdCurrency'

interface Insight {
  id: string
  type: 'opportunity' | 'warning' | 'recommendation' | 'anomaly'
  title: string
  description: string
  impact: string
  confidence: number
  priority: 'high' | 'medium' | 'low'
  category: string
  actions: string[]
  metrics?: {
    label: string
    value: string
    trend?: string
  }[]
}

export default function AIInsights() {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('7d')

  const insights: Insight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'Cash Flow Optimization Opportunity',
      description: 'AI detected a pattern where 68% of payments arrive between 10th-15th of each month. Restructuring payment schedules could improve cash flow by ৳3.2 Cr monthly.',
      impact: '+৳3.2 Cr/month',
      confidence: 94,
      priority: 'high',
      category: 'Cash Flow',
      actions: [
        'Negotiate with top 5 clients for bi-weekly payments',
        'Offer 2% early payment discount for payments before 10th',
        'Adjust supplier payment schedule to 16th-20th'
      ],
      metrics: [
        { label: 'Affected Clients', value: '23', trend: 'stable' },
        { label: 'Implementation Time', value: '2 weeks' },
        { label: 'ROI', value: '320%', trend: 'up' }
      ]
    },
    {
      id: '2',
      type: 'warning',
      title: 'Unusual Expense Pattern Detected',
      description: 'Material costs from supplier "BuildMax Ltd" increased by 23% over last 30 days, significantly above market rate of 8%.',
      impact: '-৳1.5 Cr excess',
      confidence: 89,
      priority: 'high',
      category: 'Procurement',
      actions: [
        'Request detailed invoice breakdown from BuildMax Ltd',
        'Compare prices with alternative suppliers',
        'Investigate potential billing errors or fraud'
      ],
      metrics: [
        { label: 'Overpayment', value: '৳1.5 Cr', trend: 'up' },
        { label: 'Market Rate', value: '+8%' },
        { label: 'Supplier Rate', value: '+23%', trend: 'up' }
      ]
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Invoice Processing Automation',
      description: 'Based on analysis of 3,421 invoices, implementing OCR + AI processing could save 120 hours/month and reduce errors by 95%.',
      impact: '৳2.8 Lakh/month savings',
      confidence: 96,
      priority: 'medium',
      category: 'Operations',
      actions: [
        'Implement OCR for invoice scanning',
        'Set up AI validation rules',
        'Train staff on new system'
      ],
      metrics: [
        { label: 'Time Saved', value: '120 hrs/mo' },
        { label: 'Error Reduction', value: '95%', trend: 'down' },
        { label: 'Payback Period', value: '3 months' }
      ]
    },
    {
      id: '4',
      type: 'anomaly',
      title: 'Payment Velocity Anomaly',
      description: 'Collection rate from Dhanmondi Plaza project dropped from 92% to 61% in last 14 days. Historical pattern suggests potential default risk.',
      impact: '৳4.5 Cr at risk',
      confidence: 87,
      priority: 'high',
      category: 'Collections',
      actions: [
        'Schedule urgent meeting with project stakeholders',
        'Review contract terms and penalties',
        'Prepare contingency collection plan'
      ],
      metrics: [
        { label: 'Amount at Risk', value: '৳4.5 Cr', trend: 'up' },
        { label: 'Collection Rate', value: '61%', trend: 'down' },
        { label: 'Days Overdue', value: '14' }
      ]
    },
    {
      id: '5',
      type: 'opportunity',
      title: 'Tax Optimization Strategy',
      description: 'AI analysis of financial structure suggests potential VAT optimization through input credit adjustments, saving ৳82 Lakh annually.',
      impact: '+৳82 Lakh/year',
      confidence: 91,
      priority: 'medium',
      category: 'Tax & Compliance',
      actions: [
        'Review input VAT credit claims',
        'Restructure procurement timing',
        'Consult with tax advisor for implementation'
      ],
      metrics: [
        { label: 'Annual Savings', value: '৳82 Lakh' },
        { label: 'Compliance Risk', value: 'Low' },
        { label: 'Implementation', value: '1 month' }
      ]
    }
  ]

  const categories = [
    { name: 'Cash Flow', count: 3, icon: Activity, color: 'from-blue-400 to-cyan-600' },
    { name: 'Collections', count: 2, icon: DollarSign, color: 'from-green-400 to-emerald-600' },
    { name: 'Procurement', count: 2, icon: Users, color: 'from-purple-400 to-pink-600' },
    { name: 'Operations', count: 1, icon: BarChart3, color: 'from-amber-400 to-orange-600' }
  ]

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity': return <Lightbulb className="w-5 h-5" />
      case 'warning': return <AlertTriangle className="w-5 h-5" />
      case 'recommendation': return <Target className="w-5 h-5" />
      case 'anomaly': return <Zap className="w-5 h-5" />
    }
  }

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity': return 'from-green-400 to-emerald-600'
      case 'warning': return 'from-red-400 to-rose-600'
      case 'recommendation': return 'from-blue-400 to-cyan-600'
      case 'anomaly': return 'from-amber-400 to-orange-600'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Financial Insights</h2>
          <p className="text-gray-400">Intelligent analysis and recommendations powered by machine learning</p>
        </div>
        <div className="flex items-center gap-2">
          {(['24h', '7d', '30d', '90d'] as const).map((period) => (
            <AnimatedButton
              key={period}
              variant={timeframe === period ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeframe(period)}
              className={timeframe === period ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
            >
              {period}
            </AnimatedButton>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Executive Summary</h3>
            <p className="text-gray-300 mb-4">
              Based on analysis of <span className="font-semibold text-white">2.3M data points</span> over the last {timeframe}, 
              the AI has identified <span className="font-semibold text-green-400">৳8.7 Cr</span> in optimization opportunities 
              and <span className="font-semibold text-amber-400">3 critical warnings</span> requiring immediate attention. 
              Overall financial health score: <span className="font-semibold text-emerald-400">87/100</span>.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-400">ML Confidence: 92%</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-400">Updated 2 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Category Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-4" variant="accent" hover>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color.replace('from-', 'from-').replace('to-', 'to-').replace('400', '500/20').replace('600', '500/20')}`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{category.name}</h4>
                  <p className="text-sm text-gray-400">{category.count} insights</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6 h-full cursor-pointer group" 
              variant="accent" 
              hover
              onClick={() => setSelectedInsight(insight.id === selectedInsight ? null : insight.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getInsightColor(insight.type).replace('from-', 'from-').replace('to-', 'to-').replace('400', '500/20').replace('600', '500/20')}`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">{insight.category}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  insight.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  insight.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {insight.priority}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-4">{insight.description}</p>

              {/* Impact & Confidence */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400">Impact</p>
                  <p className={`text-lg font-bold ${
                    insight.impact.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {insight.impact}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">AI Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${getInsightColor(insight.type)}`}
                      />
                    </div>
                    <span className="text-sm font-medium text-white">{insight.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {selectedInsight === insight.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 pt-4 mt-4 space-y-4"
                >
                  {/* Metrics */}
                  {insight.metrics && (
                    <div className="grid grid-cols-3 gap-3">
                      {insight.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <p className="text-xs text-gray-400">{metric.label}</p>
                          <p className="text-sm font-semibold text-white">{metric.value}</p>
                          {metric.trend && (
                            <p className={`text-xs ${
                              metric.trend === 'up' ? 'text-green-400' :
                              metric.trend === 'down' ? 'text-red-400' :
                              'text-gray-400'
                            }`}>
                              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Recommended Actions</h5>
                    <div className="space-y-2">
                      {insight.actions.map((action, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-gray-500 mt-0.5" />
                          <p className="text-sm text-gray-300">{action}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <AnimatedButton
                    variant="primary"
                    size="sm"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    Take Action
                    <ArrowRight className="w-4 h-4" />
                  </AnimatedButton>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* AI Learning Progress */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">AI Learning Progress</h3>
          <Shield className="w-5 h-5 text-green-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Pattern Recognition</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '94%' }}
                transition={{ duration: 1, delay: 1 }}
                className="h-full bg-gradient-to-r from-purple-400 to-pink-600"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">2.3M patterns analyzed</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Prediction Accuracy</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '89%' }}
                transition={{ duration: 1, delay: 1.2 }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">89% accurate over 90 days</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Anomaly Detection</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '96%' }}
                transition={{ duration: 1, delay: 1.4 }}
                className="h-full bg-gradient-to-r from-amber-400 to-orange-600"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">312 anomalies caught</p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}