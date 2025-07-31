'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity,
  BarChart3,
  Building2,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Package,
  Truck,
  Shield,
  Zap
} from 'lucide-react'
import { formatBDT, formatPercentage } from '@/components/ecosystem/utils/bdCurrency'

interface ControlLayerProps {
  activeView: string
  onViewChange: (view: string) => void
}

interface MetricCard {
  id: string
  title: string
  value: string | number
  subtitle: string
  icon: any
  color: string
  gradient: string
  trend?: {
    value: number
    isPositive: boolean
  }
  sparklineData?: number[]
}

const metrics: MetricCard[] = [
  {
    id: 'portfolio',
    title: 'Portfolio Value',
    value: formatBDT(2054000000000), // 2054 Cr
    subtitle: 'Total project value',
    icon: Building2,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-violet-600',
    trend: { value: 12.5, isPositive: true },
    sparklineData: [30, 45, 42, 65, 78, 82, 95]
  },
  {
    id: 'active-sites',
    title: 'Active Sites',
    value: 23,
    subtitle: '5 in Bashundhara, 4 in Jolshiri',
    icon: Activity,
    color: '#14B8A6',
    gradient: 'from-teal-500 to-cyan-600',
    trend: { value: 2, isPositive: true }
  },
  {
    id: 'workers',
    title: 'Active Workers',
    value: '8,456',
    subtitle: '92% attendance rate',
    icon: Users,
    color: '#22C55E',
    gradient: 'from-green-500 to-emerald-600',
    trend: { value: 5.2, isPositive: true }
  },
  {
    id: 'completion',
    title: 'On-Time Rate',
    value: formatPercentage(94.7),
    subtitle: 'vs 65% industry avg',
    icon: Clock,
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600',
    trend: { value: 3.1, isPositive: true }
  },
  {
    id: 'monthly-spend',
    title: 'Monthly Burn',
    value: formatBDT(45600000000), // 45.6 Cr
    subtitle: '8% under budget',
    icon: DollarSign,
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-600',
    trend: { value: -8, isPositive: true }
  },
  {
    id: 'equipment',
    title: 'Equipment Fleet',
    value: 342,
    subtitle: '96% operational',
    icon: Truck,
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-600',
    sparklineData: [88, 90, 92, 89, 94, 95, 96]
  }
]

const realtimeActivities = [
  {
    id: 1,
    time: '2 min ago',
    event: 'Concrete pour completed at Bashundhara Tower B, Floor 18',
    type: 'success',
    icon: CheckCircle
  },
  {
    id: 2,
    time: '5 min ago',
    event: 'Quality inspection failed at Jolshiri Site A - rebar spacing issue',
    type: 'alert',
    icon: AlertTriangle
  },
  {
    id: 3,
    time: '12 min ago',
    event: 'Material delivery arrived: 500 tons steel at Bashundhara depot',
    type: 'info',
    icon: Package
  },
  {
    id: 4,
    time: '18 min ago',
    event: 'AI detected potential delay risk due to upcoming weather',
    type: 'warning',
    icon: Zap
  },
  {
    id: 5,
    time: '25 min ago',
    event: 'RAJUK inspection completed successfully at Jolshiri Tower 2',
    type: 'success',
    icon: Shield
  }
]

export default function ControlLayer({ activeView, onViewChange }: ControlLayerProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [showDetailedView, setShowDetailedView] = useState(false)

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500'
      case 'alert': return 'text-red-500'
      case 'warning': return 'text-yellow-500'
      default: return 'text-blue-500'
    }
  }

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      {/* Command Center Overview */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Command & Control Center</h2>
        <p className="text-gray-400">Real-time operational intelligence for all construction sites</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const isSelected = selectedMetric === metric.id

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMetric(isSelected ? null : metric.id)}
              className="relative cursor-pointer"
            >
              <motion.div
                className={`relative bg-white backdrop-blur-sm rounded-xl border overflow-hidden ${
                  isSelected ? 'border-white/50' : 'border-gray-300/50'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: isSelected
                    ? `0 20px 40px -10px ${metric.color}40`
                    : '0 10px 30px -10px rgba(0,0,0,0.5)'
                }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-10`} />

                {/* Content */}
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient}`}>
                      <Icon className="w-6 h-6 text-gray-900" />
                    </div>
                    
                    {metric.trend && (
                      <div className={`flex items-center gap-1 text-sm ${
                        metric.trend.isPositive ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <TrendingUp className={`w-4 h-4 ${!metric.trend.isPositive && 'rotate-180'}`} />
                        <span>{Math.abs(metric.trend.value)}%</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                  <p className="text-sm font-medium text-gray-300">{metric.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>

                  {/* Sparkline */}
                  {metric.sparklineData && (
                    <div className="mt-4 h-12">
                      <svg className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke={metric.color}
                          strokeWidth="2"
                          points={metric.sparklineData?.map((value, i) => 
                            `${(i / (metric.sparklineData!.length - 1)) * 100},${48 - (value / 100) * 48}`
                          ).join(' ') || ''}
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${metric.color}40, transparent)`,
                    backgroundSize: '200% 100%'
                  }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Live Activity Feed */}
      <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-300/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            Live Activity Stream
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Real-time</span>
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {realtimeActivities.map((activity, index) => {
              const Icon = activity.icon
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg"
                >
                  <Icon className={`w-5 h-5 mt-0.5 ${getActivityColor(activity.type)}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-200">{activity.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <button className="w-full mt-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-sm font-medium transition-all">
          View All Activities
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Generate Report', icon: BarChart3, color: 'purple' },
          { label: 'Schedule Inspection', icon: Shield, color: 'green' },
          { label: 'Alert Teams', icon: AlertTriangle, color: 'yellow' },
          { label: 'Resource Request', icon: Package, color: 'blue' }
        ].map((action, index) => {
          const Icon = action.icon
          
          return (
            <motion.button
              key={action.label}
              className={`p-4 bg-gray-100 hover:bg-gray-700/50 rounded-lg flex flex-col items-center gap-2 transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Icon className={`w-6 h-6 text-${action.color}-400`} />
              <span className="text-sm text-gray-300">{action.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}