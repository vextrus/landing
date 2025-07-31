'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, CheckCircle, AlertTriangle, Package, Users, Truck, Shield } from 'lucide-react'
import StaggeredList from '../ui/StaggeredList'
import WaveButton from '../ui/WaveButton'

interface ActivityFeedProps {}

interface ActivityItem {
  id: string
  timestamp: Date
  type: 'success' | 'warning' | 'info' | 'alert'
  icon: any
  message: string
  location?: string
}

const generateActivity = (idCounter: number): ActivityItem => {
  const activities = [
    {
      type: 'success' as const,
      icon: CheckCircle,
      messages: [
        'Concrete pour completed at Tower B, Floor 18',
        'Foundation inspection passed at Plaza site',
        'MEP installation completed in Section A'
      ]
    },
    {
      type: 'warning' as const,
      icon: AlertTriangle,
      messages: [
        'Quality issue detected at Tower A - rebar spacing',
        'Weather alert: Heavy rain expected tomorrow',
        'Equipment maintenance overdue - Crane #3'
      ]
    },
    {
      type: 'info' as const,
      icon: Package,
      messages: [
        'Material delivery arrived: 500 tons steel',
        'New equipment deployed: 2 excavators',
        'Cement shipment scheduled for tomorrow'
      ]
    },
    {
      type: 'alert' as const,
      icon: Users,
      messages: [
        'Worker safety incident reported - minor injury',
        'Overtime alert: Team B exceeded limits',
        'New workers onboarded: 15 skilled laborers'
      ]
    }
  ]

  const randomActivity = activities[Math.floor(Math.random() * activities.length)]
  const randomMessage = randomActivity.messages[Math.floor(Math.random() * randomActivity.messages.length)]
  const locations = ['Bashundhara', 'Jolshiri', 'Plaza Site', 'Tower A', 'Tower B']

  return {
    id: `activity-${idCounter}`,
    timestamp: new Date(),
    type: randomActivity.type,
    icon: randomActivity.icon,
    message: randomMessage,
    location: locations[Math.floor(Math.random() * locations.length)]
  }
}

const ActivityFeed = React.memo(function ActivityFeed({}: ActivityFeedProps) {
  const activityIdCounter = useRef(0)
  
  const [activities, setActivities] = useState<ActivityItem[]>([
    generateActivity(activityIdCounter.current++),
    generateActivity(activityIdCounter.current++),
    generateActivity(activityIdCounter.current++),
    generateActivity(activityIdCounter.current++),
    generateActivity(activityIdCounter.current++)
  ])

  // Simulate real-time activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivity = generateActivity(activityIdCounter.current++)
        return [newActivity, ...prev.slice(0, 9)] // Keep last 10 activities
      })
    }, 5000) // Add new activity every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'success': return '#10B981'
      case 'warning': return '#F59E0B'
      case 'alert': return '#EF4444'
      default: return '#06B6D4'
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <motion.div 
      className="glass-light rounded-2xl overflow-hidden backdrop-blur-xl border border-gray-200/50 neo-shadow-light group"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-emerald-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Activity className="w-5 h-5 text-gray-900 z-10" />
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <h3 className="font-semibold text-gray-900">Live Activity</h3>
          </div>
          <div className="flex items-center gap-2">
            <motion.div className="relative">
              <motion.div 
                className="w-2 h-2 bg-[#10B981] rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute inset-0 w-2 h-2 bg-[#10B981] rounded-full"
                animate={{ scale: [1, 2, 2], opacity: [0.8, 0, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xs text-gray-500">Real-time</span>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            const color = getActivityColor(activity.type)

            return (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ 
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: index === 0 ? 0 : undefined
                }}
                className="relative group/item"
              >
                <motion.div 
                  className="flex items-start gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-200 border border-transparent hover:border-gray-200/50"
                  whileHover={{ x: 4 }}
                >
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <motion.div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center glass-icon"
                      style={{ 
                        backgroundColor: `${color}20`,
                        borderColor: `${color}50`
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </motion.div>
                    {index === 0 && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundColor: `${color}40` }}
                        animate={{
                          scale: [1, 1.2, 1.2],
                          opacity: [0.5, 0, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 mb-1 font-medium">{activity.message}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-mono">{formatTime(activity.timestamp)}</span>
                      {activity.location && (
                        <>
                          <span className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span className="font-medium">{activity.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute -inset-1 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${color}10, transparent)`,
                      filter: 'blur(8px)'
                    }}
                  />
                </motion.div>

                {/* Connection Line */}
                {index < activities.length - 1 && (
                  <div className="absolute left-[19px] top-[44px] bottom-[-12px] w-[2px] bg-gradient-to-b from-gray-300 via-gray-200 to-transparent" />
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  )
})

export default ActivityFeed