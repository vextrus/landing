'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Zap,
  Activity,
  BarChart3,
  Lightbulb,
  Target,
  MessageSquare
} from 'lucide-react'
import { useLiquidGlassDark } from '../../theme/liquidGlassDark'
import { GlassCard, GlowText, GradientText } from '../ui/GlassMorphism'
import { MetricCard, DataCard, StatusIndicator, ProgressBar } from '../ui/GlassWidgets'

// AI Prediction Types
interface AIPrediction {
  id: string
  type: 'warning' | 'opportunity' | 'recommendation'
  confidence: number
  title: string
  description: string
  impact: string
  actions: string[]
  timestamp: Date
  priority: 'high' | 'medium' | 'low'
}

// AI Insight Types
interface AIInsight {
  id: string
  category: 'performance' | 'risk' | 'efficiency' | 'growth'
  metric: string
  trend: 'up' | 'down' | 'stable'
  percentage: number
  insight: string
  recommendation: string
}

// AI Brain Component - Central Intelligence Hub
export function AIBrain() {
  const theme = useLiquidGlassDark()
  const [neuralActivity, setNeuralActivity] = useState(85)
  const [processing, setProcessing] = useState(false)

  // Simulate neural activity
  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity(prev => {
        const change = (Math.random() - 0.5) * 10
        return Math.max(70, Math.min(100, prev + change))
      })
      setProcessing(Math.random() > 0.7)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <GlassCard intensity="ultra" className="p-6 relative overflow-hidden">
      {/* Neural network background animation */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {[...Array(9)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={50 + (i % 3 - 1) * 30}
                  cy={50 + (Math.floor(i / 3) - 1) * 30}
                  r="3"
                  fill={theme.colors.accent.primary}
                  animate={{
                    r: [3, 5, 3],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {/* Neural connections */}
              <motion.path
                d="M20,20 L50,50 L80,20 M20,50 L50,50 L80,50 M20,80 L50,50 L80,80"
                stroke={theme.colors.accent.primary}
                strokeWidth="0.5"
                fill="none"
                animate={{
                  strokeOpacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="relative"
              animate={{
                scale: processing ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: processing ? Infinity : 0,
              }}
            >
              <Brain className="w-8 h-8 text-[#00D9FF]" />
              {processing && (
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.5, 0, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  <Brain className="w-8 h-8 text-[#00D9FF]" />
                </motion.div>
              )}
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold">
                <GradientText gradient="aurora">AI Neural Core</GradientText>
              </h3>
              <p className="text-sm text-white/60">
                {processing ? 'Processing insights...' : 'Real-time analysis active'}
              </p>
            </div>
          </div>
          <StatusIndicator 
            status={processing ? 'processing' : 'online'} 
            pulse={true}
          />
        </div>

        {/* Neural activity meter */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Neural Activity</span>
            <span className="text-sm font-medium">
              <GlowText color="cyan">{neuralActivity.toFixed(1)}%</GlowText>
            </span>
          </div>
          <ProgressBar 
            value={neuralActivity} 
            max={100} 
            color="cyan" 
            animated={true}
          />
          
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                <GlowText color="cyan">1,247</GlowText>
              </div>
              <p className="text-xs text-white/60">Decisions/Hour</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                <GlowText color="magenta">98.5%</GlowText>
              </div>
              <p className="text-xs text-white/60">Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                <GlowText color="gold">152</GlowText>
              </div>
              <p className="text-xs text-white/60">Active Models</p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

// AI Predictions Component
export function AIPredictions() {
  const [predictions] = useState<AIPrediction[]>([
    {
      id: '1',
      type: 'warning',
      confidence: 92,
      title: 'Material Shortage Risk',
      description: 'Predicted cement shortage in 7 days based on consumption patterns',
      impact: 'Could delay 3 active projects',
      actions: ['Order additional cement (500 bags)', 'Contact alternative suppliers'],
      timestamp: new Date(),
      priority: 'high'
    },
    {
      id: '2',
      type: 'opportunity',
      confidence: 87,
      title: 'Cost Optimization Detected',
      description: 'Bulk purchasing opportunity for steel reinforcement',
      impact: 'Save ৳15 Lakh on material costs',
      actions: ['Negotiate bulk discount', 'Coordinate with procurement team'],
      timestamp: new Date(),
      priority: 'medium'
    },
    {
      id: '3',
      type: 'recommendation',
      confidence: 95,
      title: 'Workforce Reallocation',
      description: 'Optimize worker distribution across sites for 15% efficiency gain',
      impact: 'Complete projects 2 weeks earlier',
      actions: ['Move 50 workers from Site A to Site C', 'Adjust shift schedules'],
      timestamp: new Date(),
      priority: 'medium'
    }
  ])

  const getTypeIcon = (type: AIPrediction['type']) => {
    switch(type) {
      case 'warning': return AlertTriangle
      case 'opportunity': return TrendingUp
      case 'recommendation': return Lightbulb
    }
  }

  const getTypeColor = (type: AIPrediction['type']) => {
    switch(type) {
      case 'warning': return '#FF3366'
      case 'opportunity': return '#00FF88'
      case 'recommendation': return '#FFB800'
    }
  }

  return (
    <DataCard
      title="AI Predictions"
      subtitle="Proactive insights powered by machine learning"
      fullHeight
      actions={
        <motion.button
          className="p-2 rounded-lg backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-4 h-4 text-[#00D9FF]" />
        </motion.button>
      }
    >
      <div className="space-y-3">
        {predictions.map((prediction, index) => {
          const Icon = getTypeIcon(prediction.type)
          const color = getTypeColor(prediction.type)
          
          return (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl backdrop-blur-sm transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-white">{prediction.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40">Confidence</span>
                      <span className="text-xs font-medium" style={{ color }}>
                        {prediction.confidence}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mb-2">{prediction.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-white/40">Impact:</span>
                    <span className="text-white/80">{prediction.impact}</span>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-3 space-y-1">
                    {prediction.actions.map((action, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                      >
                        <Target className="w-3 h-3 text-white/40" />
                        <span className="text-white/70">{action}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </DataCard>
  )
}

// AI Insights Dashboard
export function AIInsightsDashboard() {
  const [insights] = useState<AIInsight[]>([
    {
      id: '1',
      category: 'performance',
      metric: 'Project Completion Rate',
      trend: 'up',
      percentage: 12.5,
      insight: 'Projects completing 2 weeks faster on average',
      recommendation: 'Maintain current resource allocation strategy'
    },
    {
      id: '2',
      category: 'risk',
      metric: 'Safety Incidents',
      trend: 'down',
      percentage: -35,
      insight: '35% reduction in safety incidents this quarter',
      recommendation: 'Continue enhanced safety training programs'
    },
    {
      id: '3',
      category: 'efficiency',
      metric: 'Worker Productivity',
      trend: 'up',
      percentage: 18,
      insight: 'Productivity increased due to AI task optimization',
      recommendation: 'Deploy AI scheduling to remaining 3 sites'
    },
    {
      id: '4',
      category: 'growth',
      metric: 'Cost Efficiency',
      trend: 'up',
      percentage: 22,
      insight: '৳2.3 Cr saved through predictive procurement',
      recommendation: 'Expand predictive models to equipment maintenance'
    }
  ])

  const getCategoryIcon = (category: AIInsight['category']) => {
    switch(category) {
      case 'performance': return Activity
      case 'risk': return Shield
      case 'efficiency': return Zap
      case 'growth': return TrendingUp
    }
  }

  const getCategoryColor = (category: AIInsight['category']) => {
    switch(category) {
      case 'performance': return 'cyan'
      case 'risk': return 'magenta'
      case 'efficiency': return 'gold'
      case 'growth': return 'purple'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight, index) => {
        const Icon = getCategoryIcon(insight.category)
        const color = getCategoryColor(insight.category)
        
        return (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard
              title={insight.metric}
              value={`${insight.trend === 'up' ? '+' : ''}${insight.percentage}%`}
              change={insight.trend === 'up' ? {
                value: Math.abs(insight.percentage),
                type: 'increase'
              } : insight.trend === 'down' ? {
                value: Math.abs(insight.percentage),
                type: 'decrease'
              } : undefined}
              icon={<Icon className="w-6 h-6" />}
              color={color}
              shimmer={true}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

// AI Command Interface
export function AICommandInterface() {
  const [query, setQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [suggestions] = useState([
    'Show construction delays across all sites',
    'Predict material requirements for next month',
    'Analyze worker productivity trends',
    'Identify cost optimization opportunities'
  ])

  return (
    <GlassCard intensity="strong" className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="w-6 h-6 text-[#00D9FF]" />
        <h3 className="text-lg font-semibold">
          <GradientText gradient="aurora">AI Command Interface</GradientText>
        </h3>
      </div>
      
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI anything about your projects..."
          className="w-full px-4 py-3 pr-12 rounded-lg text-white placeholder-white/40 backdrop-blur-md transition-all"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: query ? '0 0 20px rgba(0, 217, 255, 0.2)' : 'none',
          }}
        />
        <motion.button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg"
          style={{
            background: isListening ? 'rgba(0, 217, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${isListening ? 'rgba(0, 217, 255, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
          }}
          onClick={() => setIsListening(!isListening)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Sparkles className={`w-4 h-4 ${isListening ? 'text-[#00D9FF]' : 'text-white/60'}`} />
        </motion.button>
      </div>
      
      {/* AI Suggestions */}
      <div className="space-y-2">
        <p className="text-xs text-white/50 uppercase tracking-wider">Suggested Queries</p>
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
            onClick={() => setQuery(suggestion)}
            whileHover={{
              background: 'rgba(255, 255, 255, 0.05)',
              x: 4,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <BarChart3 className="inline-block w-3 h-3 mr-2 text-[#00D9FF]" />
            {suggestion}
          </motion.button>
        ))}
      </div>
    </GlassCard>
  )
}