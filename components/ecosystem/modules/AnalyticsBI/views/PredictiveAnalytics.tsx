'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  Brain,
  Activity,
  Target,
  AlertCircle,
  Calendar,
  Cpu,
  BarChart3,
  LineChart,
  DollarSign,
  Users,
  Building2,
  Clock,
  Zap,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Gauge
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter, AnimatedChart } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface PredictionModel {
  id: string
  name: string
  category: string
  accuracy: number
  lastTrained: string
  predictions: number
  status: 'active' | 'training' | 'inactive'
}

interface Forecast {
  metric: string
  currentValue: number
  predictedValue: number
  confidence: number
  timeframe: string
  trend: 'increase' | 'decrease' | 'stable'
  factors: string[]
}

interface RiskFactor {
  factor: string
  probability: number
  impact: 'high' | 'medium' | 'low'
  timeline: string
  mitigation: string
}

export default function PredictiveAnalytics() {
  const [selectedModel, setSelectedModel] = useState<string>('revenue')
  const [timeHorizon, setTimeHorizon] = useState<'1m' | '3m' | '6m' | '1y'>('3m')

  const predictionModels: PredictionModel[] = [
    {
      id: 'revenue',
      name: 'Revenue Forecasting',
      category: 'Financial',
      accuracy: 94.5,
      lastTrained: '2 hours ago',
      predictions: 1234,
      status: 'active'
    },
    {
      id: 'demand',
      name: 'Demand Prediction',
      category: 'Market',
      accuracy: 91.2,
      lastTrained: '1 day ago',
      predictions: 892,
      status: 'active'
    },
    {
      id: 'completion',
      name: 'Project Completion',
      category: 'Operations',
      accuracy: 88.7,
      lastTrained: '3 hours ago',
      predictions: 567,
      status: 'active'
    },
    {
      id: 'cost',
      name: 'Cost Optimization',
      category: 'Financial',
      accuracy: 92.3,
      lastTrained: '5 hours ago',
      predictions: 445,
      status: 'training'
    }
  ]

  const forecasts: Forecast[] = [
    {
      metric: 'Q3 Revenue',
      currentValue: 780000000,
      predictedValue: 892000000,
      confidence: 87,
      timeframe: '3 months',
      trend: 'increase',
      factors: ['Seasonal demand', 'New projects', 'Market growth']
    },
    {
      metric: 'Material Costs',
      currentValue: 234000000,
      predictedValue: 267000000,
      confidence: 82,
      timeframe: '3 months',
      trend: 'increase',
      factors: ['Steel prices', 'Import duties', 'Supply chain']
    },
    {
      metric: 'Project Pipeline',
      currentValue: 47,
      predictedValue: 58,
      confidence: 79,
      timeframe: '3 months',
      trend: 'increase',
      factors: ['Market demand', 'Competition', 'Economic growth']
    },
    {
      metric: 'Workforce Needs',
      currentValue: 2847,
      predictedValue: 3125,
      confidence: 91,
      timeframe: '3 months',
      trend: 'increase',
      factors: ['Project scale', 'Skill requirements', 'Turnover rate']
    }
  ]

  const riskFactors: RiskFactor[] = [
    {
      factor: 'Steel Price Volatility',
      probability: 78,
      impact: 'high',
      timeline: '30-45 days',
      mitigation: 'Lock in prices with 3-month contracts'
    },
    {
      factor: 'Monsoon Delays',
      probability: 65,
      impact: 'medium',
      timeline: '60-90 days',
      mitigation: 'Adjust project schedules, indoor work priority'
    },
    {
      factor: 'Skilled Labor Shortage',
      probability: 45,
      impact: 'high',
      timeline: '90-120 days',
      mitigation: 'Implement training programs, retention bonuses'
    },
    {
      factor: 'Regulatory Changes',
      probability: 32,
      impact: 'medium',
      timeline: '180 days',
      mitigation: 'Monitor policy updates, maintain compliance buffer'
    }
  ]

  const scenarioAnalysis = [
    { scenario: 'Best Case', revenue: 945, profit: 28.5, probability: 25 },
    { scenario: 'Expected', revenue: 892, profit: 23.4, probability: 60 },
    { scenario: 'Worst Case', revenue: 756, profit: 15.2, probability: 15 }
  ]

  const monthlyPrediction = [
    { month: 'Jul', actual: 245, predicted: 268, lower: 255, upper: 280 },
    { month: 'Aug', actual: 0, predicted: 285, lower: 270, upper: 300 },
    { month: 'Sep', actual: 0, predicted: 302, lower: 285, upper: 320 },
    { month: 'Oct', actual: 0, predicted: 318, lower: 300, upper: 335 },
    { month: 'Nov', actual: 0, predicted: 335, lower: 315, upper: 355 },
    { month: 'Dec', actual: 0, predicted: 358, lower: 335, upper: 380 }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'from-red-400 to-rose-600'
      case 'medium': return 'from-amber-400 to-orange-600'
      case 'low': return 'from-blue-400 to-indigo-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getModelIcon = (category: string) => {
    switch (category) {
      case 'Financial': return DollarSign
      case 'Market': return TrendingUp
      case 'Operations': return Activity
      default: return Brain
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Predictive Analytics</h2>
          <p className="text-gray-400">ML-powered forecasting and scenario planning</p>
        </div>
        
        <div className="flex items-center gap-2">
          {(['1m', '3m', '6m', '1y'] as const).map((horizon) => (
            <AnimatedButton
              key={horizon}
              variant={timeHorizon === horizon ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeHorizon(horizon)}
              className={timeHorizon === horizon ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
            >
              {horizon}
            </AnimatedButton>
          ))}
        </div>
      </div>

      {/* AI Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {predictionModels.map((model) => {
          const Icon = getModelIcon(model.category)
          return (
            <GlassCard 
              key={model.id}
              className="p-4" 
              variant="accent" 
              hover
              onClick={() => setSelectedModel(model.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{model.name}</h4>
                    <p className="text-xs text-gray-400">{model.category}</p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  model.status === 'active' ? 'bg-green-400' :
                  model.status === 'training' ? 'bg-amber-400 animate-pulse' :
                  'bg-gray-400'
                }`} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Accuracy</span>
                  <span className="text-sm font-medium text-white">{model.accuracy}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${model.accuracy}%` }}
                    className="h-full bg-gradient-to-r from-indigo-400 to-purple-600"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{model.predictions} predictions</span>
                  <span className="text-gray-500">{model.lastTrained}</span>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Key Forecasts */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Key Business Forecasts</h3>
          <AnimatedButton variant="ghost" size="sm">
            <Cpu className="w-4 h-4" />
            <span>Retrain Models</span>
          </AnimatedButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forecasts.map((forecast, index) => (
            <motion.div
              key={forecast.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-white">{forecast.metric}</h4>
                  <p className="text-sm text-gray-400">Next {forecast.timeframe}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  forecast.trend === 'increase' ? 'text-green-400' :
                  forecast.trend === 'decrease' ? 'text-red-400' :
                  'text-gray-400'
                }`}>
                  {forecast.trend === 'increase' ? <TrendingUp className="w-4 h-4" /> :
                   forecast.trend === 'decrease' ? <TrendingUp className="w-4 h-4 rotate-180" /> :
                   <Activity className="w-4 h-4" />}
                  {((forecast.predictedValue - forecast.currentValue) / forecast.currentValue * 100).toFixed(1)}%
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Current</span>
                  <span className="text-sm text-white">
                    {forecast.metric.includes('Revenue') || forecast.metric.includes('Costs') ? 
                      formatBDT(forecast.currentValue) : 
                      forecast.currentValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Predicted</span>
                  <span className="text-lg font-bold text-indigo-400">
                    {forecast.metric.includes('Revenue') || forecast.metric.includes('Costs') ? 
                      formatBDT(forecast.predictedValue) : 
                      forecast.predictedValue.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${forecast.confidence}%` }}
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-600"
                      />
                    </div>
                    <span className="text-xs text-gray-400">{forecast.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-gray-500 mb-1">Key factors:</p>
                <div className="flex flex-wrap gap-1">
                  {forecast.factors.map((factor) => (
                    <span key={factor} className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-300">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prediction Chart */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Prediction Model</h3>
            <AnimatedChart
              data={monthlyPrediction}
              dataKey="predicted"
              type="area"
              height={300}
              color="#6366F1"
              gradient={true}
            />
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-md border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-400">AI Insight</span>
              </div>
              <p className="text-sm text-gray-300">
                Model predicts 46% revenue growth over next 6 months with 87% confidence. 
                Key driver: Government infrastructure projects in Purbachal and Uttara.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Scenario Analysis */}
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Scenario Analysis</h3>
          <div className="space-y-4">
            {scenarioAnalysis.map((scenario) => {
              const scenarioColor = 
                scenario.scenario === 'Best Case' ? 'from-green-400 to-emerald-600' :
                scenario.scenario === 'Expected' ? 'from-blue-400 to-indigo-600' :
                'from-red-400 to-rose-600'
              
              return (
                <div key={scenario.scenario} className="p-3 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{scenario.scenario}</h4>
                    <span className="text-sm text-gray-400">{scenario.probability}% likely</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Revenue</span>
                      <span className="text-white">৳{scenario.revenue} Cr</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Profit Margin</span>
                      <span className={`font-medium bg-gradient-to-r ${scenarioColor} bg-clip-text text-transparent`}>
                        {scenario.profit}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scenario.probability}%` }}
                      className={`h-full bg-gradient-to-r ${scenarioColor}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>

      {/* Risk Analysis */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Predictive Risk Analysis</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <AlertTriangle className="w-4 h-4" />
            <span>4 risks identified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskFactors.map((risk, index) => (
            <motion.div
              key={risk.factor}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-white">{risk.factor}</h4>
                  <p className="text-sm text-gray-400 mt-1">Timeline: {risk.timeline}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getImpactColor(risk.impact)} bg-opacity-20`}>
                  {risk.impact.toUpperCase()}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Probability</span>
                  <span className="text-xs text-white">{risk.probability}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${risk.probability}%` }}
                    className={`h-full bg-gradient-to-r ${
                      risk.probability >= 70 ? 'from-red-400 to-rose-600' :
                      risk.probability >= 50 ? 'from-amber-400 to-orange-600' :
                      'from-blue-400 to-indigo-600'
                    }`}
                  />
                </div>
              </div>

              <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                <p className="text-xs text-green-400 font-medium mb-1">Mitigation:</p>
                <p className="text-xs text-gray-300">{risk.mitigation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}