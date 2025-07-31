'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Eye, 
  Bell, 
  MessageSquare, 
  TrendingUp,
  AlertTriangle,
  Activity,
  Users,
  Building2,
  Map as MapIcon,
  Settings
} from 'lucide-react'
import { formatBDT, formatPercentage } from '../../utils/bdCurrency'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import ProjectTimeline from '../../visualizations/ProjectTimeline'
import AIInsights from '../../visualizations/AIInsights'
import VoiceCommand from '../../interactive/VoiceCommand'

export default function CommandCenter2() {
  const [activeView, setActiveView] = useState<'overview' | 'timeline' | 'insights' | 'voice'>('overview')
  const [selectedSite, setSelectedSite] = useState<string | null>(null)

  const liveMetrics = {
    activeProjects: 152,
    delayedProjects: 8,
    onTimeRate: 94.7,
    dailyDecisions: 1247,
    activeUsers: 3421,
    criticalAlerts: 3,
    totalValue: 854000000000, // 854 Cr
    monthlyBurn: 23500000000, // 23.5 Cr
  }

  const sites = [
    { id: 's1', name: 'Gulshan Heights', lat: 23.7925, lng: 90.4078, status: 'on-track', progress: 65 },
    { id: 's2', name: 'Dhanmondi Square', lat: 23.7465, lng: 90.3755, status: 'delayed', progress: 45 },
    { id: 's3', name: 'Uttara Business Park', lat: 23.8759, lng: 90.3795, status: 'at-risk', progress: 30 },
    { id: 's4', name: 'Mirpur Complex', lat: 23.8223, lng: 90.3654, status: 'on-track', progress: 80 },
    { id: 's5', name: 'Bashundhara City II', lat: 23.8103, lng: 90.4125, status: 'on-track', progress: 55 }
  ]

  const viewComponents = {
    overview: <OverviewDashboard metrics={liveMetrics} sites={sites} onSiteClick={setSelectedSite} />,
    timeline: <ProjectTimeline />,
    insights: <AIInsights />,
    voice: <VoiceCommand onCommand={(cmd, result) => console.log('Voice command:', cmd, result)} />
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="text-center">
        <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Command Center
        </h3>
        <p className="text-gray-600">Your AI-Powered Construction War Room</p>
      </motion.div>

      {/* View Selector */}
      <motion.div variants={fadeInUp} className="flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'timeline', label: 'Timeline', icon: Activity },
            { id: 'insights', label: 'AI Insights', icon: Brain },
            { id: 'voice', label: 'Voice Control', icon: MessageSquare }
          ].map(view => {
            const Icon = view.icon
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeView === view.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {view.label}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Active View */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {viewComponents[activeView]}
      </motion.div>
    </motion.div>
  )
}

// Overview Dashboard Component
function OverviewDashboard({ metrics, sites, onSiteClick }: any) {
  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Portfolio Value"
          value={formatBDT(metrics.totalValue)}
          subtitle="Total project value"
          color="purple"
          icon={Building2}
        />
        <MetricCard
          title="Monthly Burn"
          value={formatBDT(metrics.monthlyBurn)}
          subtitle="Average spend"
          color="blue"
          icon={TrendingUp}
        />
        <MetricCard
          title="On-Time Rate"
          value={formatPercentage(metrics.onTimeRate)}
          subtitle="vs 65% industry avg"
          color="green"
          icon={Activity}
        />
        <MetricCard
          title="Active Sites"
          value={sites.length}
          subtitle={`${metrics.activeUsers} workers`}
          color="orange"
          icon={Users}
        />
      </div>

      {/* Live Map View */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapIcon className="w-5 h-5 text-primary" />
          Live Site Status - Dhaka Metropolitan
        </h4>
        
        {/* Simulated Map */}
        <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50" />
          
          {/* Plot sites on map */}
          {sites.map((site: any) => {
            const x = ((site.lng - 90.35) / 0.1) * 100
            const y = ((23.9 - site.lat) / 0.15) * 100
            
            return (
              <motion.button
                key={site.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => onSiteClick(site.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`relative w-12 h-12 rounded-full ${
                  site.status === 'on-track' ? 'bg-green-500' :
                  site.status === 'delayed' ? 'bg-red-500' :
                  'bg-yellow-500'
                } shadow-lg flex items-center justify-center`}>
                  <Building2 className="w-6 h-6 text-white" />
                  
                  {/* Pulse animation */}
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {site.name} - {site.progress}%
                  </div>
                </div>
              </motion.button>
            )
          })}
          
          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
            <p className="text-xs font-semibold mb-2">Site Status</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-xs">On Track</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-xs">At Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-xs">Delayed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Real-time Activity Feed
        </h4>
        
        <div className="space-y-3">
          {[
            { time: '2 min ago', event: 'Concrete pour completed at Tower B, Floor 15', type: 'success' },
            { time: '8 min ago', event: 'Quality inspection failed at Dhanmondi Site - Block C', type: 'alert' },
            { time: '15 min ago', event: 'Material delivery arrived at Uttara Business Park', type: 'info' },
            { time: '23 min ago', event: 'Worker overtime approved for Gulshan Heights', type: 'warning' },
            { time: '45 min ago', event: 'RAJUK inspection scheduled for tomorrow at Mirpur Complex', type: 'info' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className={`w-2 h-2 rounded-full mt-1.5 ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'alert' ? 'bg-red-500' :
                activity.type === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{activity.event}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Metric Card Component
function MetricCard({ title, value, subtitle, color, icon: Icon }: any) {
  const colorClasses = {
    purple: 'bg-purple-50 text-purple-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600'
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <Settings className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </motion.div>
  )
}