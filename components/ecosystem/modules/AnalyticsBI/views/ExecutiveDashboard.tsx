'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Activity,
  Brain,
  MessageSquare,
  PieChart,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter, AnimatedChart } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface KPIMetric {
  label: string
  value: number | string
  change: number
  trend: 'up' | 'down' | 'stable'
  format?: 'currency' | 'percentage' | 'number' | 'string'
  target?: number
}

interface BusinessInsight {
  id: string
  category: 'revenue' | 'operations' | 'risk' | 'opportunity'
  title: string
  description: string
  impact: string
  confidence: number
  actionable: boolean
}

interface DepartmentPerformance {
  department: string
  score: number
  revenue: number
  efficiency: number
  trend: 'up' | 'down' | 'stable'
}

export default function ExecutiveDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month')
  const [aiThinking, setAiThinking] = useState(false)

  // Simulate AI generating insights
  useEffect(() => {
    setAiThinking(true)
    const timer = setTimeout(() => setAiThinking(false), 2000)
    return () => clearTimeout(timer)
  }, [selectedTimeframe])

  const kpiMetrics: KPIMetric[] = [
    {
      label: 'Total Revenue',
      value: 2328000000,
      change: 12.5,
      trend: 'up',
      format: 'currency',
      target: 2500000000
    },
    {
      label: 'Active Projects',
      value: 47,
      change: 8.5,
      trend: 'up',
      format: 'number',
      target: 50
    },
    {
      label: 'Profit Margin',
      value: 23.4,
      change: 2.1,
      trend: 'up',
      format: 'percentage',
      target: 25
    },
    {
      label: 'Client Satisfaction',
      value: 92.5,
      change: 3.2,
      trend: 'up',
      format: 'percentage',
      target: 95
    },
    {
      label: 'On-time Delivery',
      value: 87.3,
      change: -1.5,
      trend: 'down',
      format: 'percentage',
      target: 90
    },
    {
      label: 'Cash Flow',
      value: 'Positive',
      change: 18.5,
      trend: 'up',
      format: 'string'
    }
  ]

  const aiInsights: BusinessInsight[] = [
    {
      id: '1',
      category: 'revenue',
      title: 'Revenue Growth Opportunity in Dhanmondi',
      description: 'AI analysis shows 78% probability of securing 3 new luxury projects in Dhanmondi area based on market trends and competitor gaps.',
      impact: '৳45 Crore potential revenue',
      confidence: 78,
      actionable: true
    },
    {
      id: '2',
      category: 'risk',
      title: 'Material Cost Surge Alert',
      description: 'Predictive model indicates 15% increase in steel prices within 30 days. Current inventory covers only 60% of upcoming needs.',
      impact: '৳12 Crore cost increase',
      confidence: 85,
      actionable: true
    },
    {
      id: '3',
      category: 'operations',
      title: 'Productivity Pattern Detected',
      description: 'NLP analysis of site reports shows 23% higher productivity on Thursdays. Recommend adjusting critical task scheduling.',
      impact: '18% efficiency gain possible',
      confidence: 92,
      actionable: true
    },
    {
      id: '4',
      category: 'opportunity',
      title: 'Government Contract Opportunity',
      description: 'Upcoming tender for Purbachal smart city project aligns with our capabilities. Success probability: 67%.',
      impact: '৳230 Crore contract value',
      confidence: 67,
      actionable: true
    }
  ]

  const departmentPerformance: DepartmentPerformance[] = [
    { department: 'Construction', score: 89, revenue: 1234000000, efficiency: 92, trend: 'up' },
    { department: 'Sales', score: 94, revenue: 567000000, efficiency: 88, trend: 'up' },
    { department: 'Procurement', score: 82, revenue: 0, efficiency: 85, trend: 'stable' },
    { department: 'Quality', score: 91, revenue: 0, efficiency: 94, trend: 'up' },
    { department: 'Finance', score: 88, revenue: 89000000, efficiency: 90, trend: 'down' }
  ]

  const revenueData = [
    { name: 'Jan', actual: 180, target: 170, prediction: 0 },
    { name: 'Feb', actual: 195, target: 185, prediction: 0 },
    { name: 'Mar', actual: 210, target: 200, prediction: 0 },
    { name: 'Apr', actual: 225, target: 215, prediction: 0 },
    { name: 'May', actual: 238, target: 230, prediction: 0 },
    { name: 'Jun', actual: 245, target: 245, prediction: 0 },
    { name: 'Jul', actual: 0, target: 260, prediction: 268 },
    { name: 'Aug', actual: 0, target: 275, prediction: 285 },
    { name: 'Sep', actual: 0, target: 290, prediction: 302 }
  ]

  const projectStatus = [
    { status: 'On Track', count: 28, percentage: 60 },
    { status: 'At Risk', count: 12, percentage: 25 },
    { status: 'Delayed', count: 5, percentage: 11 },
    { status: 'Completed', count: 2, percentage: 4 }
  ]

  const getInsightIcon = (category: string) => {
    switch (category) {
      case 'revenue': return DollarSign
      case 'operations': return Activity
      case 'risk': return AlertTriangle
      case 'opportunity': return Target
      default: return Brain
    }
  }

  const getInsightColor = (category: string) => {
    switch (category) {
      case 'revenue': return 'from-green-400 to-emerald-600'
      case 'operations': return 'from-blue-400 to-indigo-600'
      case 'risk': return 'from-red-400 to-rose-600'
      case 'opportunity': return 'from-purple-400 to-pink-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Executive Dashboard</h2>
          <p className="text-gray-400">AI-powered insights for strategic decision making</p>
        </div>
        
        <div className="flex items-center gap-2">
          {(['week', 'month', 'quarter', 'year'] as const).map((timeframe) => (
            <AnimatedButton
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
              className={selectedTimeframe === timeframe ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </AnimatedButton>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiMetrics.map((metric) => (
          <GlassCard key={metric.label} className="p-4" variant="accent" hover>
            <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-white">
                  {metric.format === 'currency' && typeof metric.value === 'number' ? 
                    formatBDT(metric.value).split(' ')[0] : 
                    metric.format === 'percentage' ? `${metric.value}%` :
                    metric.format === 'string' ? metric.value :
                    <AnimatedCounter value={metric.value as number} />}
                </p>
                {metric.format === 'currency' && (
                  <p className="text-xs text-gray-400">
                    {formatBDT(metric.value as number).split(' ')[1]}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-400' : 
                  metric.trend === 'down' ? 'text-red-400' : 
                  'text-gray-400'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : 
                   metric.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : null}
                  {Math.abs(metric.change)}%
                </div>
                {metric.target && typeof metric.value === 'number' && (
                  <div className="mt-2 w-full">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                        className="h-full bg-gradient-to-r from-indigo-400 to-purple-600"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* AI Insights Section */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">AI Business Insights</h3>
          </div>
          {aiThinking && (
            <div className="flex items-center gap-2 text-sm text-purple-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Analyzing data...</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights.map((insight, index) => {
            const Icon = getInsightIcon(insight.category)
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getInsightColor(insight.category)} bg-opacity-20`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-300 mb-2">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-indigo-400">{insight.impact}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${insight.confidence}%` }}
                              className="h-full bg-gradient-to-r from-indigo-400 to-purple-600"
                            />
                          </div>
                          <span className="text-xs text-gray-400">{insight.confidence}%</span>
                        </div>
                        {insight.actionable && (
                          <AnimatedButton variant="ghost" size="sm">
                            <ChevronRight className="w-4 h-4" />
                          </AnimatedButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-md border border-indigo-500/20">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-400">Ask AI: </span>
            <span className="text-sm text-gray-300">"What's the biggest risk to our Q3 revenue targets?"</span>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Prediction Chart */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Analysis & Prediction</h3>
            <AnimatedChart
              data={revenueData}
              dataKey="actual"
              type="line"
              height={300}
              color="#10B981"
              gradient={false}
            />
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-gray-400">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-gray-400">Target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-400" />
                <span className="text-gray-400">AI Prediction</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Project Status */}
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Project Status</h3>
          <div className="space-y-3">
            {projectStatus.map((status) => {
              const statusColor = 
                status.status === 'On Track' ? 'from-green-400 to-emerald-600' :
                status.status === 'At Risk' ? 'from-amber-400 to-orange-600' :
                status.status === 'Delayed' ? 'from-red-400 to-rose-600' :
                'from-blue-400 to-indigo-600'
              
              return (
                <div key={status.status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{status.status}</span>
                    <span className="text-sm text-white">{status.count} ({status.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${status.percentage}%` }}
                      className={`h-full bg-gradient-to-r ${statusColor}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Total Projects</span>
              <span className="text-xl font-bold text-white">47</span>
            </div>
            <AnimatedButton variant="ghost" size="sm" className="w-full mt-3">
              View All Projects
              <ChevronRight className="w-4 h-4" />
            </AnimatedButton>
          </div>
        </GlassCard>
      </div>

      {/* Department Performance */}
      <GlassCard className="p-6" variant="accent">
        <h3 className="text-lg font-semibold text-white mb-4">Department Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-white/10">
                <th className="pb-3">Department</th>
                <th className="pb-3">Performance Score</th>
                <th className="pb-3">Revenue Contribution</th>
                <th className="pb-3">Efficiency</th>
                <th className="pb-3">Trend</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {departmentPerformance.map((dept) => (
                <tr key={dept.department} className="border-b border-white/5">
                  <td className="py-3">
                    <span className="font-medium text-white">{dept.department}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${dept.score}%` }}
                          className={`h-full bg-gradient-to-r ${
                            dept.score >= 90 ? 'from-green-400 to-emerald-600' :
                            dept.score >= 80 ? 'from-blue-400 to-indigo-600' :
                            'from-amber-400 to-orange-600'
                          }`}
                        />
                      </div>
                      <span className="text-gray-300">{dept.score}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-300">
                    {dept.revenue > 0 ? formatBDT(dept.revenue) : '-'}
                  </td>
                  <td className="py-3">
                    <span className={`${
                      dept.efficiency >= 90 ? 'text-green-400' :
                      dept.efficiency >= 80 ? 'text-blue-400' :
                      'text-amber-400'
                    }`}>
                      {dept.efficiency}%
                    </span>
                  </td>
                  <td className="py-3">
                    {dept.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {dept.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                    {dept.trend === 'stable' && <Activity className="w-4 h-4 text-gray-400" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}