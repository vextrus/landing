'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Gauge,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Clock,
  MapPin,
  Bell,
  Filter,
  BarChart3,
  Zap,
  Shield
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter, AnimatedChart } from '../../../shared/ui'

interface QualityMetric {
  id: string
  name: string
  value: number
  unit: string
  status: 'good' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
  threshold: { min: number; max: number }
  lastUpdated: string
  site: string
}

interface EnvironmentalData {
  temperature: number
  humidity: number
  windSpeed: number
  uvIndex: number
}

interface Alert {
  id: string
  type: 'quality' | 'environmental' | 'equipment' | 'safety'
  severity: 'high' | 'medium' | 'low'
  message: string
  site: string
  timestamp: string
  acknowledged: boolean
}

export default function RealTimeMonitoring() {
  const [selectedSite, setSelectedSite] = useState<string>('all')
  const [activeAlerts, setActiveAlerts] = useState(12)
  const [qualityScore, setQualityScore] = useState(96.8)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQualityScore(prev => {
        const change = (Math.random() - 0.5) * 0.5
        return Math.max(90, Math.min(100, prev + change))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const sites = [
    { id: 'all', name: 'All Sites' },
    { id: 'gulshan', name: 'Gulshan Heights' },
    { id: 'dhanmondi', name: 'Dhanmondi Complex' },
    { id: 'bashundhara', name: 'Bashundhara Tower' }
  ]

  const qualityMetrics: QualityMetric[] = [
    {
      id: '1',
      name: 'Concrete Strength',
      value: 32.5,
      unit: 'MPa',
      status: 'good',
      trend: 'up',
      threshold: { min: 30, max: 35 },
      lastUpdated: '2 mins ago',
      site: 'Gulshan Heights'
    },
    {
      id: '2',
      name: 'Slump Test',
      value: 110,
      unit: 'mm',
      status: 'good',
      trend: 'stable',
      threshold: { min: 100, max: 120 },
      lastUpdated: '5 mins ago',
      site: 'Dhanmondi Complex'
    },
    {
      id: '3',
      name: 'Steel Tensile',
      value: 485,
      unit: 'MPa',
      status: 'warning',
      trend: 'down',
      threshold: { min: 500, max: 600 },
      lastUpdated: '8 mins ago',
      site: 'Bashundhara Tower'
    },
    {
      id: '4',
      name: 'Surface Finish',
      value: 94,
      unit: '%',
      status: 'good',
      trend: 'up',
      threshold: { min: 90, max: 100 },
      lastUpdated: '12 mins ago',
      site: 'Gulshan Heights'
    }
  ]

  const environmentalData: EnvironmentalData = {
    temperature: 28.5,
    humidity: 65,
    windSpeed: 12,
    uvIndex: 7
  }

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'quality',
      severity: 'high',
      message: 'Concrete strength below threshold in Block C',
      site: 'Gulshan Heights',
      timestamp: '5 mins ago',
      acknowledged: false
    },
    {
      id: '2',
      type: 'environmental',
      severity: 'medium',
      message: 'High temperature affecting concrete curing',
      site: 'All Sites',
      timestamp: '15 mins ago',
      acknowledged: false
    },
    {
      id: '3',
      type: 'equipment',
      severity: 'low',
      message: 'Vibrator maintenance due in 2 days',
      site: 'Dhanmondi Complex',
      timestamp: '1 hour ago',
      acknowledged: true
    }
  ]

  const qualityTrendData = [
    { name: '00:00', score: 95.2 },
    { name: '04:00', score: 95.8 },
    { name: '08:00', score: 96.2 },
    { name: '12:00', score: 96.5 },
    { name: '16:00', score: 96.8 },
    { name: '20:00', score: 96.7 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'from-green-400 to-emerald-600'
      case 'warning': return 'from-amber-400 to-orange-600'
      case 'critical': return 'from-red-400 to-rose-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Real-Time Quality Monitoring</h2>
          <p className="text-gray-400">Live quality metrics and environmental conditions</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white focus:outline-none focus:border-white/20"
          >
            {sites.map(site => (
              <option key={site.id} value={site.id}>{site.name}</option>
            ))}
          </select>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600 relative">
            <Bell className="w-4 h-4" />
            <span>Alerts</span>
            {activeAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeAlerts}
              </span>
            )}
          </AnimatedButton>
        </div>
      </div>

      {/* Overall Quality Score */}
      <GlassCard className="p-8" variant="accent">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Overall Quality Score</h3>
            <div className="flex items-baseline gap-3">
              <motion.p 
                className="text-6xl font-bold text-white"
                key={qualityScore}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {qualityScore.toFixed(1)}%
              </motion.p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-green-400 text-sm">+2.3% today</span>
              </div>
            </div>
            <p className="text-gray-400 mt-2">Exceeding industry standards by 12%</p>
          </div>
          
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 352" }}
                animate={{ strokeDasharray: `${(qualityScore / 100) * 352} 352` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-12 h-12 text-green-400" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Quality Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {qualityMetrics.map((metric) => (
          <GlassCard key={metric.id} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">{metric.name}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-sm text-gray-400">{metric.unit}</p>
                </div>
              </div>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getStatusColor(metric.status)} bg-opacity-20`}>
                {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-white" />}
                {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-white" />}
                {metric.trend === 'stable' && <Activity className="w-4 h-4 text-white" />}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((metric.value - metric.threshold.min) / (metric.threshold.max - metric.threshold.min)) * 100}%` 
                  }}
                  className={`h-full bg-gradient-to-r ${getStatusColor(metric.status)}`}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">{metric.threshold.min}</span>
                <span className="text-xs text-gray-500">{metric.threshold.max}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{metric.site}</span>
              <span>{metric.lastUpdated}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Environmental Conditions & Quality Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Environmental Conditions */}
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Environmental Conditions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-orange-400" />
                <span className="text-gray-300">Temperature</span>
              </div>
              <span className="text-white font-medium">{environmentalData.temperature}°C</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Humidity</span>
              </div>
              <span className="text-white font-medium">{environmentalData.humidity}%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <Wind className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Wind Speed</span>
              </div>
              <span className="text-white font-medium">{environmentalData.windSpeed} km/h</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">UV Index</span>
              </div>
              <span className="text-white font-medium">{environmentalData.uvIndex}</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-md border border-amber-500/20">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Weather Advisory</span>
            </div>
            <p className="text-xs text-gray-300">High temperature may affect concrete curing time</p>
          </div>
        </GlassCard>

        {/* Quality Trend Chart */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">24-Hour Quality Trend</h3>
            <AnimatedChart
              data={qualityTrendData}
              dataKey="score"
              type="area"
              height={200}
              color="#F59E0B"
              gradient={true}
            />
          </GlassCard>
        </div>
      </div>

      {/* Active Alerts */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Active Quality Alerts</h3>
          <AnimatedButton variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </AnimatedButton>
        </div>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} backdrop-blur-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    {alert.type === 'quality' && <Shield className="w-4 h-4" />}
                    {alert.type === 'environmental' && <Thermometer className="w-4 h-4" />}
                    {alert.type === 'equipment' && <Gauge className="w-4 h-4" />}
                    {alert.type === 'safety' && <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-white">{alert.message}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>{alert.site}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                {!alert.acknowledged && (
                  <AnimatedButton variant="ghost" size="sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Acknowledge</span>
                  </AnimatedButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* AI Insights */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Zap className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Quality Insights</h3>
            <p className="text-gray-300">
              Quality scores are <span className="font-semibold text-green-400">trending upward</span> across all sites. 
              Predictive analysis suggests <span className="font-semibold text-amber-400">potential concrete strength issues</span> in 
              next 48 hours if temperature remains above 30°C. Recommend <span className="font-semibold text-blue-400">increasing 
              curing compound application</span> by 15%.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}