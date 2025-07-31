'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Sparkles, Activity, AlertTriangle } from 'lucide-react'
import dynamic from 'next/dynamic'
import GlassCard from './ui/GlassCard'

// Dynamically import AI components
const AnomalyDetector = dynamic(() => import('../ai/AnomalyDetector'), { ssr: false })
const SmartAlerts = dynamic(() => import('../ai/SmartAlerts'), { ssr: false })
const AutoInsights = dynamic(() => import('../ai/AutoInsights'), { ssr: false })
const AdaptiveLayout = dynamic(() => import('../ai/AdaptiveLayout'), { ssr: false })

interface AIDashboardProps {
  realtimeData: any
  predictions: any[]
  isProcessing?: boolean
}

export default function AIDashboard({ realtimeData, predictions, isProcessing }: AIDashboardProps) {
  const [anomalies, setAnomalies] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'anomalies' | 'alerts' | 'insights' | 'adaptive'>('insights')

  const handleAnomalyDetected = (anomaly: any) => {
    setAnomalies(prev => [anomaly, ...prev].slice(0, 5))
  }

  const handleAlertAction = (alertId: string, action: string) => {
    console.log('Alert action:', alertId, action)
  }

  const handleInsightAction = (insightId: string, action: string) => {
    console.log('Insight action:', insightId, action)
  }

  const tabs = [
    { id: 'insights', label: 'Auto Insights', icon: Brain, color: '#8B5CF6' },
    { id: 'alerts', label: 'Smart Alerts', icon: AlertTriangle, color: '#F59E0B' },
    { id: 'anomalies', label: 'Anomaly Detection', icon: Activity, color: '#EF4444' },
    { id: 'adaptive', label: 'Adaptive Layout', icon: Sparkles, color: '#10B981' }
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <Brain className="w-8 h-8 text-indigo-600" />
            <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Intelligence Center</h2>
            <p className="text-sm text-gray-500">ML-powered insights and automation</p>
          </div>
        </div>

        {isProcessing && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-sm text-indigo-600"
          >
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            AI Processing...
          </motion.div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-white text-gray-900 shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon 
                className="w-4 h-4" 
                style={{ color: isActive ? tab.color : 'currentColor' }}
              />
              <span className="hidden sm:inline">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: tab.color }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[500px]"
      >
        {activeTab === 'anomalies' && (
          <GlassCard className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Real-time Anomaly Detection</h3>
              <p className="text-sm text-gray-600">
                ML algorithms continuously monitor your data for unusual patterns
              </p>
            </div>
            <AnomalyDetector 
              data={realtimeData} 
              onAnomalyDetected={handleAnomalyDetected}
            />
            
            {/* Anomaly Summary */}
            {anomalies.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-2">
                  Recent Anomalies ({anomalies.length})
                </h4>
                <div className="space-y-1">
                  {anomalies.slice(0, 3).map((anomaly, index) => (
                    <p key={index} className="text-sm text-red-700">
                      • {anomaly.metric}: {anomaly.message}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        )}

        {activeTab === 'alerts' && (
          <SmartAlerts onAlertAction={handleAlertAction} />
        )}

        {activeTab === 'insights' && (
          <GlassCard className="p-6">
            <AutoInsights 
              data={realtimeData} 
              onInsightAction={handleInsightAction}
            />
          </GlassCard>
        )}

        {activeTab === 'adaptive' && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI-Powered Adaptive Layout</h3>
              <p className="text-sm text-gray-600">
                The dashboard learns from your usage patterns and adapts accordingly
              </p>
            </div>
            
            {/* Demo widgets for adaptive layout */}
            <AdaptiveLayout
              widgets={[
                <GlassCard key="w1" className="p-4 h-full">
                  <h4 className="font-medium mb-2">Project Overview</h4>
                  <p className="text-2xl font-bold text-indigo-600">23 Active</p>
                </GlassCard>,
                <GlassCard key="w2" className="p-4 h-full">
                  <h4 className="font-medium mb-2">Total Revenue</h4>
                  <p className="text-2xl font-bold text-green-600">৳458.3 Cr</p>
                </GlassCard>,
                <GlassCard key="w3" className="p-4 h-full">
                  <h4 className="font-medium mb-2">Efficiency Score</h4>
                  <p className="text-2xl font-bold text-amber-600">87.5%</p>
                </GlassCard>,
                <GlassCard key="w4" className="p-4 h-full">
                  <h4 className="font-medium mb-2">Worker Safety</h4>
                  <p className="text-2xl font-bold text-purple-600">98.2%</p>
                </GlassCard>,
                <GlassCard key="w5" className="p-4 h-full">
                  <h4 className="font-medium mb-2">Equipment Usage</h4>
                  <p className="text-2xl font-bold text-blue-600">76.8%</p>
                </GlassCard>,
                <GlassCard key="w6" className="p-4 h-full">
                  <h4 className="font-medium mb-2">On-Time Delivery</h4>
                  <p className="text-2xl font-bold text-teal-600">91.3%</p>
                </GlassCard>
              ]}
              widgetIds={['w1', 'w2', 'w3', 'w4', 'w5', 'w6']}
            />
          </div>
        )}
      </motion.div>

      {/* AI Status Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-700">AI Systems Active</span>
            </div>
            <div className="text-sm text-gray-600">
              Processing {predictions?.length || 0} predictions
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </motion.div>
    </div>
  )
}