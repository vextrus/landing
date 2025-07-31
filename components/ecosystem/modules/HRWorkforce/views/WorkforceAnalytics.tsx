'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users,
  TrendingUp,
  Clock,
  Activity,
  Award,
  AlertTriangle,
  MapPin,
  BarChart3,
  Zap,
  Brain,
  UserCheck,
  UserX,
  HardHat,
  Wrench,
  Shield,
  Target
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter, AnimatedChart } from '../../../shared/ui'

interface SiteMetrics {
  site: string
  totalWorkers: number
  present: number
  onLeave: number
  productivity: number
  safetyScore: number
  overtimeHours: number
}

interface WorkerCategory {
  category: string
  count: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
  icon: any
}

interface ProductivityMetric {
  name: string
  value: number
  target: number
  unit: string
}

export default function WorkforceAnalytics() {
  const [totalProductivity, setTotalProductivity] = useState(87.5)
  const [selectedSite, setSelectedSite] = useState<string>('all')

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalProductivity(prev => {
        const change = (Math.random() - 0.5) * 2
        return Math.max(80, Math.min(95, prev + change))
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const overallStats = {
    totalWorkers: 2847,
    activeToday: 2693,
    onLeave: 154,
    avgProductivity: 87.5,
    safetyIncidents: 0,
    overtimeWorkers: 234
  }

  const siteMetrics: SiteMetrics[] = [
    {
      site: 'Gulshan Heights',
      totalWorkers: 892,
      present: 847,
      onLeave: 45,
      productivity: 89.2,
      safetyScore: 98,
      overtimeHours: 234
    },
    {
      site: 'Dhanmondi Complex',
      totalWorkers: 654,
      present: 621,
      onLeave: 33,
      productivity: 86.5,
      safetyScore: 96,
      overtimeHours: 156
    },
    {
      site: 'Bashundhara Tower',
      totalWorkers: 765,
      present: 728,
      onLeave: 37,
      productivity: 91.3,
      safetyScore: 99,
      overtimeHours: 189
    },
    {
      site: 'Mirpur Project',
      totalWorkers: 536,
      present: 497,
      onLeave: 39,
      productivity: 84.7,
      safetyScore: 95,
      overtimeHours: 123
    }
  ]

  const workerCategories: WorkerCategory[] = [
    { category: 'Engineers', count: 234, percentage: 8.2, trend: 'up', icon: HardHat },
    { category: 'Masons', count: 567, percentage: 19.9, trend: 'stable', icon: Wrench },
    { category: 'Electricians', count: 189, percentage: 6.6, trend: 'up', icon: Zap },
    { category: 'Laborers', count: 1523, percentage: 53.5, trend: 'down', icon: Users },
    { category: 'Supervisors', count: 156, percentage: 5.5, trend: 'up', icon: Shield },
    { category: 'Others', count: 178, percentage: 6.3, trend: 'stable', icon: UserCheck }
  ]

  const productivityMetrics: ProductivityMetric[] = [
    { name: 'Tasks Completed', value: 423, target: 450, unit: 'tasks/day' },
    { name: 'Efficiency Rate', value: 87.5, target: 90, unit: '%' },
    { name: 'Quality Score', value: 94.2, target: 95, unit: '%' },
    { name: 'Time Utilization', value: 82.3, target: 85, unit: '%' }
  ]

  const attendanceTrend = [
    { name: 'Mon', attendance: 92, productivity: 88 },
    { name: 'Tue', attendance: 94, productivity: 87 },
    { name: 'Wed', attendance: 93, productivity: 89 },
    { name: 'Thu', attendance: 95, productivity: 90 },
    { name: 'Fri', attendance: 94, productivity: 88 },
    { name: 'Sat', attendance: 91, productivity: 86 }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Workforce Analytics Dashboard</h2>
          <p className="text-gray-400">Real-time insights on {overallStats.totalWorkers} workers across all sites</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white focus:outline-none focus:border-white/20"
          >
            <option value="all">All Sites</option>
            {siteMetrics.map(site => (
              <option key={site.site} value={site.site}>{site.site}</option>
            ))}
          </select>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600">
            <BarChart3 className="w-4 h-4" />
            <span>Export Report</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {[
          {
            icon: Users,
            label: 'Total Workforce',
            value: overallStats.totalWorkers,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: UserCheck,
            label: 'Present Today',
            value: overallStats.activeToday,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: UserX,
            label: 'On Leave',
            value: overallStats.onLeave,
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          },
          {
            icon: Activity,
            label: 'Productivity',
            value: `${overallStats.avgProductivity}%`,
            format: 'string',
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          },
          {
            icon: Shield,
            label: 'Safety Today',
            value: `${overallStats.safetyIncidents} incidents`,
            format: 'string',
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: Clock,
            label: 'Overtime',
            value: overallStats.overtimeWorkers,
            color: 'from-red-400 to-rose-600',
            bgColor: 'from-red-500/20 to-rose-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.format === 'string' ? metric.value : <AnimatedCounter value={metric.value as number} />}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* AI Insights */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Workforce Insights</h3>
            <p className="text-gray-300">
              Productivity is <span className="font-semibold text-green-400">trending upward by 3.2%</span> this week. 
              AI predicts <span className="font-semibold text-amber-400">15% higher absenteeism</span> on Monday due to 
              weather forecast. Recommend <span className="font-semibold text-blue-400">scheduling 20 additional workers</span> for 
              Gulshan Heights to maintain productivity targets. Overtime costs can be reduced by <span className="font-semibold text-purple-400">
              ৳12 Lakh</span> through optimized shift planning.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance & Productivity Trend */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Attendance & Productivity</h3>
            <AnimatedChart
              data={attendanceTrend}
              dataKey="attendance"
              type="area"
              height={250}
              color="#8B5CF6"
              gradient={true}
            />
          </GlassCard>
        </div>

        {/* Worker Distribution */}
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Worker Distribution</h3>
          <div className="space-y-3">
            {workerCategories.map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <category.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{category.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white">{category.count}</span>
                    {category.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-400" />}
                    {category.trend === 'down' && <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />}
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-purple-400 to-indigo-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Site Performance */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Site Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {siteMetrics.map((site, index) => (
            <motion.div
              key={site.site}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6" variant="accent" hover>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">{site.site}</h4>
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Attendance</span>
                      <span className="text-white">{((site.present / site.totalWorkers) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(site.present / site.totalWorkers) * 100}%` }}
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Productivity</span>
                      <span className="text-white">{site.productivity}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${site.productivity}%` }}
                        className={`h-full bg-gradient-to-r ${
                          site.productivity >= 90 ? 'from-green-400 to-emerald-600' :
                          site.productivity >= 80 ? 'from-amber-400 to-orange-600' :
                          'from-red-400 to-rose-600'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-gray-400">Workers</p>
                      <p className="text-white font-medium">{site.totalWorkers}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400">Safety</p>
                      <p className="text-green-400 font-medium">{site.safetyScore}%</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Productivity Metrics */}
      <GlassCard className="p-6" variant="accent">
        <h3 className="text-lg font-semibold text-white mb-4">Real-time Productivity Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {productivityMetrics.map((metric) => (
            <div key={metric.name}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">{metric.name}</p>
                <Target className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="text-sm text-gray-400">{metric.unit}</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(metric.value / metric.target) * 100}%` }}
                  className={`h-full bg-gradient-to-r ${
                    metric.value >= metric.target ? 'from-green-400 to-emerald-600' :
                    metric.value >= metric.target * 0.9 ? 'from-amber-400 to-orange-600' :
                    'from-red-400 to-rose-600'
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Target: {metric.target} {metric.unit}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}