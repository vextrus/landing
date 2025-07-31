'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Truck,
  Package,
  DollarSign,
  BarChart,
  Zap
} from 'lucide-react'
import { useLiquidGlassDark } from '../../theme/liquidGlassDark'
import { GlassCard, GlowText, GradientText } from '../ui/GlassMorphism'
import { StatusIndicator, ActivityItem } from '../ui/GlassWidgets'

// Real-time data types
interface RealtimeMetric {
  id: string
  label: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  changeRate: number
  icon: any
  color: string
}

interface LiveActivity {
  id: string
  type: 'worker' | 'material' | 'equipment' | 'progress' | 'alert'
  title: string
  description: string
  timestamp: Date
  site: string
  priority: 'high' | 'medium' | 'low'
}

interface RealtimeStatus {
  isConnected: boolean
  latency: number
  lastUpdate: Date
  dataPoints: number
}

// Live Data Stream Component
export function LiveDataStream() {
  const theme = useLiquidGlassDark()
  const [status, setStatus] = useState<RealtimeStatus>({
    isConnected: true,
    latency: 45,
    lastUpdate: new Date(),
    dataPoints: 0
  })

  // Simulate connection status
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        isConnected: Math.random() > 0.05, // 95% uptime
        latency: Math.floor(Math.random() * 50) + 20,
        lastUpdate: new Date(),
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 10) + 5
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <GlassCard intensity="medium" className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: status.isConnected ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: status.isConnected ? Infinity : 0,
              repeatDelay: 2,
            }}
          >
            {status.isConnected ? (
              <Wifi className="w-5 h-5 text-[#00FF88]" />
            ) : (
              <WifiOff className="w-5 h-5 text-[#FF3366]" />
            )}
          </motion.div>
          <div>
            <p className="text-sm font-medium text-white">
              Real-time Data Stream
            </p>
            <p className="text-xs text-white/60">
              {status.isConnected ? `${status.latency}ms latency` : 'Reconnecting...'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold">
            <GlowText color="cyan">{status.dataPoints.toLocaleString()}</GlowText>
          </p>
          <p className="text-xs text-white/40">data points/min</p>
        </div>
      </div>
      
      {/* Connection quality indicator */}
      <div className="mt-3 flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((bar) => (
          <motion.div
            key={bar}
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: status.latency < bar * 20 ? '#00FF88' : '#FFB800',
              }}
              animate={{
                width: status.isConnected && status.latency < bar * 20 ? '100%' : '0%',
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

// Real-time Metrics Dashboard
export function RealtimeMetricsDashboard() {
  const [metrics, setMetrics] = useState<RealtimeMetric[]>([
    {
      id: '1',
      label: 'Active Workers',
      value: 2847,
      unit: '',
      trend: 'up',
      changeRate: 2.5,
      icon: Users,
      color: '#00D9FF'
    },
    {
      id: '2',
      label: 'Equipment Utilization',
      value: 87.5,
      unit: '%',
      trend: 'stable',
      changeRate: 0.2,
      icon: Truck,
      color: '#FF00EA'
    },
    {
      id: '3',
      label: 'Materials In Transit',
      value: 34,
      unit: 'trucks',
      trend: 'up',
      changeRate: 5.2,
      icon: Package,
      color: '#FFB800'
    },
    {
      id: '4',
      label: 'Daily Spend',
      value: 45.2,
      unit: 'Lakh',
      trend: 'down',
      changeRate: -3.1,
      icon: DollarSign,
      color: '#00FF88'
    }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const change = (Math.random() - 0.5) * 10
        const newValue = metric.value + (metric.value * change / 100)
        const trend = change > 1 ? 'up' : change < -1 ? 'down' : 'stable'
        
        return {
          ...metric,
          value: Math.max(0, newValue),
          trend,
          changeRate: change
        }
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const isPositiveTrend = metric.trend === 'up' && 
          (metric.id === '1' || metric.id === '2') // Positive for workers and utilization
        const isNegativeTrend = metric.trend === 'down' && 
          metric.id === '4' // Negative for spending
        
        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard intensity="light" className="p-4" hover shimmer>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background: `${metric.color}20`,
                    border: `1px solid ${metric.color}40`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
                {metric.trend !== 'stable' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1"
                  >
                    {metric.trend === 'up' ? (
                      <TrendingUp className={`w-4 h-4 ${isPositiveTrend ? 'text-[#00FF88]' : 'text-[#FF3366]'}`} />
                    ) : (
                      <TrendingDown className={`w-4 h-4 ${isNegativeTrend ? 'text-[#00FF88]' : 'text-[#FF3366]'}`} />
                    )}
                    <span className={`text-xs font-medium ${
                      (isPositiveTrend || isNegativeTrend) ? 'text-[#00FF88]' : 'text-[#FF3366]'
                    }`}>
                      {Math.abs(metric.changeRate).toFixed(1)}%
                    </span>
                  </motion.div>
                )}
              </div>
              
              <div>
                <p className="text-xs text-white/60 mb-1">{metric.label}</p>
                <motion.p
                  className="text-2xl font-bold text-white"
                  key={metric.value}
                  initial={{ scale: 1.1, color: metric.color }}
                  animate={{ scale: 1, color: '#FFFFFF' }}
                  transition={{ duration: 0.3 }}
                >
                  {metric.value.toFixed(metric.unit === '%' ? 1 : 0)}
                  <span className="text-sm font-normal text-white/60 ml-1">
                    {metric.unit}
                  </span>
                </motion.p>
              </div>
            </GlassCard>
          </motion.div>
        )
      })}
    </div>
  )
}

// Live Activity Feed
export function LiveActivityFeed() {
  const [activities, setActivities] = useState<LiveActivity[]>([])
  const [filter, setFilter] = useState<'all' | LiveActivity['type']>('all')

  // Generate random activities
  const generateActivity = useCallback((): LiveActivity => {
    const types: LiveActivity['type'][] = ['worker', 'material', 'equipment', 'progress', 'alert']
    const type = types[Math.floor(Math.random() * types.length)]
    
    const activityTemplates = {
      worker: [
        { title: 'Shift Started', description: '125 workers checked in' },
        { title: 'Safety Training', description: 'Completed for 45 workers' },
        { title: 'Overtime Approved', description: 'For foundation team' }
      ],
      material: [
        { title: 'Cement Delivered', description: '200 bags received' },
        { title: 'Steel Order Placed', description: '50 tons for next week' },
        { title: 'Low Inventory Alert', description: 'Bricks below threshold' }
      ],
      equipment: [
        { title: 'Crane Deployed', description: 'Tower crane #3 operational' },
        { title: 'Maintenance Complete', description: 'Excavator #7 serviced' },
        { title: 'Equipment Request', description: 'Additional mixer needed' }
      ],
      progress: [
        { title: 'Milestone Reached', description: 'Floor 15 concrete pour complete' },
        { title: 'Task Completed', description: 'Foundation inspection passed' },
        { title: 'Schedule Update', description: 'Roofing delayed by 2 days' }
      ],
      alert: [
        { title: 'Weather Warning', description: 'Heavy rain expected' },
        { title: 'Safety Violation', description: 'PPE compliance issue' },
        { title: 'Quality Check Failed', description: 'Concrete mix ratio incorrect' }
      ]
    }
    
    const template = activityTemplates[type][Math.floor(Math.random() * 3)]
    const sites = ['Bashundhara A1', 'Jolshiri B2', 'Gulshan Tower', 'Dhanmondi Plaza']
    
    return {
      id: Date.now().toString() + Math.random(),
      type,
      ...template,
      timestamp: new Date(),
      site: sites[Math.floor(Math.random() * sites.length)],
      priority: type === 'alert' ? 'high' : Math.random() > 0.7 ? 'medium' : 'low'
    }
  }, [])

  // Add new activities periodically
  useEffect(() => {
    // Initial activities
    setActivities(Array.from({ length: 5 }, generateActivity))
    
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivity = generateActivity()
        return [newActivity, ...prev.slice(0, 9)] // Keep last 10
      })
    }, 8000)
    
    return () => clearInterval(interval)
  }, [generateActivity])

  const getActivityIcon = (type: LiveActivity['type']) => {
    const icons = {
      worker: Users,
      material: Package,
      equipment: Truck,
      progress: BarChart,
      alert: AlertCircle
    }
    return icons[type]
  }

  const getActivityColor = (type: LiveActivity['type']) => {
    const colors = {
      worker: 'cyan',
      material: 'gold',
      equipment: 'magenta',
      progress: 'purple',
      alert: 'gold'
    }
    return colors[type] as 'cyan' | 'magenta' | 'gold' | 'purple'
  }

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter)

  return (
    <GlassCard intensity="strong" className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#00D9FF]" />
          <h3 className="text-lg font-semibold">
            <GradientText gradient="aurora">Live Activity Feed</GradientText>
          </h3>
        </div>
        <StatusIndicator status="online" label="Live" pulse />
      </div>
      
      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'worker', 'material', 'equipment', 'progress', 'alert'].map((type) => (
          <motion.button
            key={type}
            className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
            style={{
              background: filter === type ? 'rgba(0, 217, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${filter === type ? 'rgba(0, 217, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
              color: filter === type ? '#00D9FF' : 'rgba(255, 255, 255, 0.6)',
            }}
            onClick={() => setFilter(type as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>
      
      {/* Activity list */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type)
            const color = getActivityColor(activity.type)
            const timeDiff = Math.floor((Date.now() - activity.timestamp.getTime()) / 1000)
            const timeString = timeDiff < 60 ? 'just now' : 
                              timeDiff < 3600 ? `${Math.floor(timeDiff / 60)}m ago` :
                              `${Math.floor(timeDiff / 3600)}h ago`
            
            return (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.05 
                }}
              >
                <ActivityItem
                  icon={<Icon className="w-4 h-4" />}
                  title={activity.title}
                  description={`${activity.site} • ${activity.description}`}
                  time={timeString}
                  color={color}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </GlassCard>
  )
}

// Real-time Performance Monitor
export function RealtimePerformanceMonitor() {
  const [performance, setPerformance] = useState({
    cpu: 45,
    memory: 62,
    network: 78,
    storage: 34
  })

  // Simulate performance metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance({
        cpu: Math.max(20, Math.min(90, performance.cpu + (Math.random() - 0.5) * 20)),
        memory: Math.max(30, Math.min(85, performance.memory + (Math.random() - 0.5) * 15)),
        network: Math.max(50, Math.min(95, performance.network + (Math.random() - 0.5) * 25)),
        storage: Math.max(20, Math.min(80, performance.storage + (Math.random() - 0.5) * 5))
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [performance])

  const metrics = [
    { label: 'System Load', value: performance.cpu, color: '#00D9FF', icon: Zap },
    { label: 'Data Processing', value: performance.memory, color: '#FF00EA', icon: Activity },
    { label: 'Network Traffic', value: performance.network, color: '#00FF88', icon: Wifi },
    { label: 'Storage Usage', value: performance.storage, color: '#FFB800', icon: Package }
  ]

  return (
    <GlassCard intensity="medium" className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart className="w-5 h-5 text-[#00D9FF]" />
        <h4 className="text-sm font-semibold text-white">System Performance</h4>
      </div>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-3 h-3" style={{ color: metric.color }} />
                  <span className="text-xs text-white/60">{metric.label}</span>
                </div>
                <span className="text-xs font-medium text-white">{metric.value.toFixed(0)}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${metric.color} 0%, ${metric.color}AA 100%)`,
                    boxShadow: `0 0 10px ${metric.color}50`,
                  }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}