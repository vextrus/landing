'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera,
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  Zap,
  Eye,
  Download,
  BarChart3,
  Target,
  Activity,
  Image as ImageIcon,
  Maximize2,
  Filter,
  Clock,
  TrendingUp
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'
import { formatPercentage } from '../../../utils/bdCurrency'

interface Defect {
  id: string
  image: string
  type: string
  severity: 'critical' | 'major' | 'minor'
  confidence: number
  location: { x: number; y: number; width: number; height: number }
  description: string
  detectedAt: string
  site: string
  element: string
  action: string
  estimatedCost?: number
}

interface DefectType {
  type: string
  count: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
  avgSeverity: number
}

export default function DefectDetection() {
  const [selectedDefect, setSelectedDefect] = useState<string | null>(null)
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'major' | 'minor'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const detectionStats = {
    totalScanned: 15847,
    defectsFound: 342,
    accuracy: 98.2,
    processingTime: 0.8
  }

  const defects: Defect[] = [
    {
      id: '1',
      image: '🏗️',
      type: 'Concrete Crack',
      severity: 'critical',
      confidence: 96.5,
      location: { x: 120, y: 80, width: 200, height: 150 },
      description: 'Structural crack detected in load-bearing column B-12',
      detectedAt: '10 mins ago',
      site: 'Gulshan Heights - Floor 12',
      element: 'Column B-12',
      action: 'Immediate structural assessment required',
      estimatedCost: 450000
    },
    {
      id: '2',
      image: '🔧',
      type: 'Rebar Misalignment',
      severity: 'major',
      confidence: 92.3,
      location: { x: 200, y: 150, width: 180, height: 120 },
      description: 'Reinforcement bars not aligned per structural drawings',
      detectedAt: '25 mins ago',
      site: 'Dhanmondi Complex - Floor 8',
      element: 'Slab Section C4',
      action: 'Realign before concrete pour',
      estimatedCost: 125000
    },
    {
      id: '3',
      image: '🧱',
      type: 'Surface Defect',
      severity: 'minor',
      confidence: 88.7,
      location: { x: 50, y: 200, width: 100, height: 80 },
      description: 'Minor surface irregularity in finishing work',
      detectedAt: '1 hour ago',
      site: 'Bashundhara Tower - Floor 5',
      element: 'Wall Panel W-23',
      action: 'Surface treatment recommended',
      estimatedCost: 35000
    },
    {
      id: '4',
      image: '💧',
      type: 'Water Seepage',
      severity: 'major',
      confidence: 94.1,
      location: { x: 300, y: 100, width: 150, height: 200 },
      description: 'Moisture detected in basement wall, potential waterproofing failure',
      detectedAt: '2 hours ago',
      site: 'Gulshan Heights - Basement',
      element: 'Wall B-1',
      action: 'Apply waterproofing treatment',
      estimatedCost: 280000
    }
  ]

  const defectTypes: DefectType[] = [
    { type: 'Concrete Cracks', count: 89, percentage: 26, trend: 'down', avgSeverity: 7.2 },
    { type: 'Rebar Issues', count: 67, percentage: 20, trend: 'up', avgSeverity: 8.1 },
    { type: 'Surface Defects', count: 112, percentage: 33, trend: 'stable', avgSeverity: 4.5 },
    { type: 'Water Damage', count: 74, percentage: 21, trend: 'down', avgSeverity: 6.8 }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-400 to-rose-600'
      case 'major': return 'from-amber-400 to-orange-600'
      case 'minor': return 'from-yellow-400 to-amber-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const filteredDefects = defects.filter(defect => 
    filterSeverity === 'all' || defect.severity === filterSeverity
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Defect Detection</h2>
          <p className="text-gray-400">Computer vision-powered quality inspection with 98% accuracy</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <Upload className="w-4 h-4" />
            <span>Upload Images</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600">
            <Camera className="w-4 h-4" />
            <span>Live Scan</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Detection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Camera,
            label: 'Images Scanned',
            value: detectionStats.totalScanned,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: AlertTriangle,
            label: 'Defects Found',
            value: detectionStats.defectsFound,
            color: 'from-red-400 to-rose-600',
            bgColor: 'from-red-500/20 to-rose-500/20'
          },
          {
            icon: Target,
            label: 'AI Accuracy',
            value: `${detectionStats.accuracy}%`,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: Zap,
            label: 'Avg Processing',
            value: `${detectionStats.processingTime}s`,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {typeof metric.value === 'number' ? <AnimatedCounter value={metric.value} /> : metric.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* AI Analysis Summary */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Quality Analysis</h3>
            <p className="text-gray-300">
              Critical defects <span className="font-semibold text-red-400">decreased by 35%</span> this week. 
              Most common issue: <span className="font-semibold text-amber-400">surface irregularities (33%)</span>. 
              AI recommends <span className="font-semibold text-blue-400">increased inspection frequency</span> for 
              basement waterproofing based on recent seepage patterns.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Defect Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Defect Distribution</h3>
          <div className="space-y-3">
            {defectTypes.map((type) => (
              <div key={type.type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">{type.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white">{type.count} ({type.percentage}%)</span>
                    {type.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-400" />}
                    {type.trend === 'down' && <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />}
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${type.percentage}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Detection Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span className="text-sm text-gray-300">Model Version</span>
              <span className="text-sm text-white font-medium">VXTRS-QC v3.2</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span className="text-sm text-gray-300">Last Training</span>
              <span className="text-sm text-white font-medium">2 days ago</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span className="text-sm text-gray-300">False Positive Rate</span>
              <span className="text-sm text-green-400 font-medium">1.8%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span className="text-sm text-gray-300">Dataset Size</span>
              <span className="text-sm text-white font-medium">2.3M images</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Filters and View Mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Filter by severity:</span>
          {(['all', 'critical', 'major', 'minor'] as const).map((severity) => (
            <AnimatedButton
              key={severity}
              variant={filterSeverity === severity ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterSeverity(severity)}
              className={filterSeverity === severity ? 'bg-gradient-to-r from-amber-600 to-orange-600' : ''}
            >
              {severity === 'all' ? 'All Defects' : severity.charAt(0).toUpperCase() + severity.slice(1)}
            </AnimatedButton>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <AnimatedButton
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-gradient-to-r from-amber-600 to-orange-600' : ''}
          >
            <ImageIcon className="w-4 h-4" />
          </AnimatedButton>
          <AnimatedButton
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-gradient-to-r from-amber-600 to-orange-600' : ''}
          >
            <BarChart3 className="w-4 h-4" />
          </AnimatedButton>
        </div>
      </div>

      {/* Defect Cards */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
        {filteredDefects.map((defect, index) => (
          <motion.div
            key={defect.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6" 
              variant="accent" 
              hover
              onClick={() => setSelectedDefect(defect.id === selectedDefect ? null : defect.id)}
            >
              <div className="flex items-start gap-4">
                {/* Defect Image/Icon */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-4xl">
                    {defect.image}
                  </div>
                  <div className={`absolute -bottom-2 -right-2 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getSeverityColor(defect.severity)} text-white`}>
                    {defect.severity}
                  </div>
                </div>

                {/* Defect Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{defect.type}</h4>
                      <p className="text-sm text-gray-400">{defect.site} • {defect.element}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Confidence</p>
                      <p className="text-lg font-bold text-white">{defect.confidence}%</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-3">{defect.description}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{defect.detectedAt}</span>
                    </div>
                    {defect.estimatedCost && (
                      <div className="flex items-center gap-1">
                        <span>Est. Cost: ৳{(defect.estimatedCost / 1000).toFixed(0)}k</span>
                      </div>
                    )}
                  </div>

                  {/* AI Recommendation */}
                  <div className="mt-3 p-2 rounded-lg bg-gradient-to-r from-red-500/10 to-rose-500/10 backdrop-blur-md border border-red-500/20">
                    <p className="text-xs text-red-400 font-medium">Action Required</p>
                    <p className="text-xs text-gray-300">{defect.action}</p>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedDefect === defect.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">Detection Model</p>
                      <p className="text-sm text-white">YOLOv8-Construction</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Processing Time</p>
                      <p className="text-sm text-white">0.73 seconds</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      className="bg-gradient-to-r from-red-600 to-rose-600"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Create Work Order
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                      View Full Image
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                      Export Report
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}