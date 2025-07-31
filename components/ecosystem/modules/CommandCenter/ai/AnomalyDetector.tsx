'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react'

interface Anomaly {
  id: string
  type: 'spike' | 'drop' | 'pattern' | 'threshold'
  metric: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  value: number
  expected: number
  deviation: number
  timestamp: Date
  message: string
  recommendation: string
}

interface AnomalyDetectorProps {
  data: any
  onAnomalyDetected: (anomaly: Anomaly) => void
}

export default function AnomalyDetector({ data, onAnomalyDetected }: AnomalyDetectorProps) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [isScanning, setIsScanning] = useState(false)

  // ML-based anomaly detection simulation
  useEffect(() => {
    if (!data) return

    const detectAnomalies = () => {
      setIsScanning(true)
      const newAnomalies: Anomaly[] = []

      // Cost spike detection
      if (data.costs?.current > data.costs?.average * 1.3) {
        newAnomalies.push({
          id: `anomaly-${Date.now()}-1`,
          type: 'spike',
          metric: 'Project Costs',
          severity: 'high',
          value: data.costs.current,
          expected: data.costs.average,
          deviation: ((data.costs.current - data.costs.average) / data.costs.average) * 100,
          timestamp: new Date(),
          message: 'Unusual cost increase detected',
          recommendation: 'Review recent material purchases and labor overtime'
        })
      }

      // Productivity drop detection
      if (data.productivity?.current < 75) {
        newAnomalies.push({
          id: `anomaly-${Date.now()}-2`,
          type: 'drop',
          metric: 'Worker Productivity',
          severity: data.productivity?.current < 60 ? 'critical' : 'medium',
          value: data.productivity.current,
          expected: 85,
          deviation: ((85 - data.productivity.current) / 85) * 100,
          timestamp: new Date(),
          message: 'Productivity below threshold',
          recommendation: 'Check weather conditions and equipment availability'
        })
      }

      // Equipment usage pattern
      if (data.equipment?.utilizationRate < 0.6) {
        newAnomalies.push({
          id: `anomaly-${Date.now()}-3`,
          type: 'pattern',
          metric: 'Equipment Utilization',
          severity: 'low',
          value: data.equipment.utilizationRate * 100,
          expected: 80,
          deviation: 20,
          timestamp: new Date(),
          message: 'Suboptimal equipment usage detected',
          recommendation: 'Consider redistributing equipment across sites'
        })
      }

      setAnomalies(newAnomalies)
      newAnomalies.forEach(anomaly => onAnomalyDetected(anomaly))
      
      setTimeout(() => setIsScanning(false), 1500)
    }

    const interval = setInterval(detectAnomalies, 10000) // Check every 10 seconds
    detectAnomalies() // Initial check

    return () => clearInterval(interval)
  }, [data, onAnomalyDetected])

  const getSeverityColor = (severity: Anomaly['severity']) => {
    switch (severity) {
      case 'critical': return '#EF4444'
      case 'high': return '#F59E0B'
      case 'medium': return '#3B82F6'
      case 'low': return '#10B981'
    }
  }

  const getAnomalyIcon = (type: Anomaly['type']) => {
    switch (type) {
      case 'spike': return TrendingUp
      case 'drop': return TrendingDown
      case 'pattern': return Activity
      case 'threshold': return AlertTriangle
    }
  }

  return (
    <div className="relative">
      {/* Scanning Indicator */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-2 -right-2 z-20"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
              />
              <Zap className="w-4 h-4 text-indigo-500 absolute inset-0 m-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Anomaly Cards */}
      <AnimatePresence mode="popLayout">
        {anomalies.map((anomaly) => {
          const Icon = getAnomalyIcon(anomaly.type)
          const color = getSeverityColor(anomaly.severity)

          return (
            <motion.div
              key={anomaly.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-3"
            >
              <motion.div
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg"
                whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      {anomaly.severity === 'critical' && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute -inset-1 rounded-lg opacity-30"
                          style={{ backgroundColor: color }}
                        />
                      )}
                    </motion.div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900">{anomaly.metric}</h4>
                      <p className="text-xs text-gray-500">
                        {new Date(anomaly.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <span 
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{ 
                      backgroundColor: `${color}20`,
                      color: color
                    }}
                  >
                    {anomaly.severity.toUpperCase()}
                  </span>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-700 mb-2">{anomaly.message}</p>

                {/* Metrics */}
                <div className="flex items-center gap-4 mb-3 p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="font-mono font-semibold" style={{ color }}>
                      {anomaly.value.toFixed(1)}
                    </p>
                  </div>
                  <div className="text-gray-300">→</div>
                  <div>
                    <p className="text-xs text-gray-500">Expected</p>
                    <p className="font-mono text-gray-700">{anomaly.expected.toFixed(1)}</p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-xs text-gray-500">Deviation</p>
                    <p className="font-mono font-semibold" style={{ color }}>
                      {anomaly.deviation > 0 ? '+' : ''}{anomaly.deviation.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* AI Recommendation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-3 bg-indigo-50 rounded-lg border border-indigo-100"
                >
                  <p className="text-xs font-medium text-indigo-700 mb-1">
                    🤖 AI Recommendation
                  </p>
                  <p className="text-xs text-indigo-600">{anomaly.recommendation}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* No Anomalies State */}
      {anomalies.length === 0 && !isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">All metrics within normal range</p>
          <p className="text-xs text-gray-400 mt-1">AI monitoring active</p>
        </motion.div>
      )}
    </div>
  )
}