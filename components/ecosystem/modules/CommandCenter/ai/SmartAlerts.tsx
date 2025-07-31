'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, AlertCircle, CheckCircle, Info, X, Clock, Brain } from 'lucide-react'

interface Alert {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  priority: number // 0-100, ML-calculated
  source: string
  timestamp: Date
  isRead: boolean
  actionRequired: boolean
  suggestedAction?: string
  relatedAlerts?: string[]
  impactScore: number // 0-10
  confidenceScore: number // 0-100%
}

interface SmartAlertsProps {
  onAlertAction?: (alertId: string, action: string) => void
}

export default function SmartAlerts({ onAlertAction }: SmartAlertsProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'priority'>('all')
  const [isProcessing, setIsProcessing] = useState(false)

  // Simulate ML-based alert generation
  useEffect(() => {
    const generateSmartAlerts = () => {
      const newAlerts: Alert[] = [
        {
          id: `alert-${Date.now()}-1`,
          title: 'Weather Impact Alert',
          message: 'Heavy rain predicted for next 3 days. May affect concrete curing at Bashundhara site.',
          type: 'warning',
          priority: 85,
          source: 'Weather AI',
          timestamp: new Date(),
          isRead: false,
          actionRequired: true,
          suggestedAction: 'Reschedule concrete pouring or arrange protective covering',
          impactScore: 7.5,
          confidenceScore: 92
        },
        {
          id: `alert-${Date.now()}-2`,
          title: 'Supply Chain Optimization',
          message: 'Steel prices expected to increase by 12% next month based on market analysis.',
          type: 'info',
          priority: 72,
          source: 'Market Analysis AI',
          timestamp: new Date(Date.now() - 3600000),
          isRead: false,
          actionRequired: true,
          suggestedAction: 'Consider bulk purchasing now to save ৳2.5 Cr',
          impactScore: 8.2,
          confidenceScore: 78
        },
        {
          id: `alert-${Date.now()}-3`,
          title: 'Safety Milestone Achieved',
          message: '100 days without accidents at Jolshiri site. Worker morale increased by 15%.',
          type: 'success',
          priority: 45,
          source: 'Safety Monitor',
          timestamp: new Date(Date.now() - 7200000),
          isRead: true,
          actionRequired: false,
          impactScore: 6.0,
          confidenceScore: 100
        }
      ]

      setAlerts(prev => [...newAlerts, ...prev].slice(0, 10)) // Keep only 10 most recent
    }

    generateSmartAlerts()
    const interval = setInterval(generateSmartAlerts, 30000) // Generate new alerts every 30s

    return () => clearInterval(interval)
  }, [])

  // ML Priority Calculation
  const calculateMLPriority = (alert: Alert): number => {
    let priority = 50 // Base priority

    // Factor in impact score
    priority += alert.impactScore * 3

    // Factor in confidence
    priority += (alert.confidenceScore / 100) * 10

    // Type-based adjustment
    switch (alert.type) {
      case 'error': priority += 20; break
      case 'warning': priority += 10; break
      case 'success': priority -= 10; break
    }

    // Action required boost
    if (alert.actionRequired) priority += 15

    // Time decay (older alerts get lower priority)
    const ageHours = (Date.now() - alert.timestamp.getTime()) / (1000 * 60 * 60)
    priority -= Math.min(ageHours * 2, 20)

    return Math.max(0, Math.min(100, priority))
  }

  const filteredAlerts = useMemo(() => {
    let filtered = [...alerts]

    switch (filter) {
      case 'unread':
        filtered = filtered.filter(a => !a.isRead)
        break
      case 'priority':
        filtered = filtered.filter(a => calculateMLPriority(a) > 70)
        break
    }

    // Sort by ML-calculated priority
    return filtered.sort((a, b) => calculateMLPriority(b) - calculateMLPriority(a))
  }, [alerts, filter])

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error': return AlertCircle
      case 'warning': return Bell
      case 'success': return CheckCircle
      case 'info': return Info
    }
  }

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'error': return '#EF4444'
      case 'warning': return '#F59E0B'
      case 'success': return '#10B981'
      case 'info': return '#3B82F6'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Smart Alerts</h3>
            <span className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">
              ML-Powered
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {alerts.filter(a => !a.isRead).length} unread
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['all', 'unread', 'priority'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                filter === tab
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'priority' && ' 🔥'}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.map(alert => {
            const Icon = getAlertIcon(alert.type)
            const color = getAlertColor(alert.type)
            const priority = calculateMLPriority(alert)

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors ${
                  !alert.isRead ? 'bg-blue-50/30' : ''
                }`}
                onClick={() => markAsRead(alert.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Icon with Priority Indicator */}
                  <div className="relative">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    {priority > 80 && (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-gray-900">
                        {alert.title}
                        {!alert.isRead && (
                          <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          dismissAlert(alert.id)
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                      <span>{alert.source}</span>
                      <div className="flex items-center gap-2">
                        <span>Priority:</span>
                        <div className="flex-1 w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${priority}%` }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: priority > 70 ? color : '#6B7280' }}
                          />
                        </div>
                        <span className="font-mono">{priority}</span>
                      </div>
                    </div>

                    {/* AI Suggestion */}
                    {alert.suggestedAction && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Brain className="w-3 h-3 text-indigo-600" />
                          <p className="text-xs font-medium text-indigo-700">
                            AI Suggestion (Confidence: {alert.confidenceScore}%)
                          </p>
                        </div>
                        <p className="text-xs text-indigo-600">{alert.suggestedAction}</p>
                        {alert.actionRequired && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onAlertAction?.(alert.id, 'accept')
                            }}
                            className="mt-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            Take Action
                          </button>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 text-center"
        >
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No alerts to display</p>
          <p className="text-xs text-gray-400 mt-1">AI is monitoring all systems</p>
        </motion.div>
      )}
    </div>
  )
}