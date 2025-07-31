'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  TrendingUp,
  Calendar,
  Gauge,
  Zap,
  Brain,
  BarChart3,
  Settings,
  Cpu,
  Battery,
  Thermometer,
  ChevronRight
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter, AnimatedChart } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface Equipment {
  id: string
  name: string
  type: string
  model: string
  location: string
  status: 'operational' | 'warning' | 'critical' | 'maintenance'
  health: number
  nextMaintenance: string
  failureProbability: number
  runtime: number
  efficiency: number
  lastMaintenance: string
  maintenanceCost: number
  sensors: {
    temperature: number
    vibration: number
    pressure: number
    current: number
  }
  predictions: {
    component: string
    failureDate: string
    confidence: number
    impact: 'high' | 'medium' | 'low'
  }[]
}

interface MaintenanceTask {
  id: string
  equipment: string
  task: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  dueDate: string
  estimatedTime: number
  estimatedCost: number
  assignedTo?: string
}

export default function PredictiveMaintenance() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'equipment' | 'schedule' | 'analytics'>('equipment')

  const maintenanceStats = {
    equipmentMonitored: 87,
    uptimeRate: 94.5,
    predictedFailures: 12,
    costSaved: 4500000
  }

  const equipment: Equipment[] = [
    {
      id: '1',
      name: 'Tower Crane TC-01',
      type: 'Tower Crane',
      model: 'Liebherr 280 EC-H',
      location: 'Gulshan Heights',
      status: 'operational',
      health: 85,
      nextMaintenance: '7 days',
      failureProbability: 12,
      runtime: 2847,
      efficiency: 92,
      lastMaintenance: '45 days ago',
      maintenanceCost: 125000,
      sensors: {
        temperature: 72,
        vibration: 0.8,
        pressure: 180,
        current: 245
      },
      predictions: [
        {
          component: 'Hoist Motor Bearing',
          failureDate: '15 days',
          confidence: 78,
          impact: 'high'
        },
        {
          component: 'Wire Rope',
          failureDate: '30 days',
          confidence: 65,
          impact: 'medium'
        }
      ]
    },
    {
      id: '2',
      name: 'Concrete Pump CP-03',
      type: 'Concrete Pump',
      model: 'Schwing S 43 SX',
      location: 'Dhanmondi Complex',
      status: 'warning',
      health: 68,
      nextMaintenance: '2 days',
      failureProbability: 35,
      runtime: 1234,
      efficiency: 78,
      lastMaintenance: '30 days ago',
      maintenanceCost: 85000,
      sensors: {
        temperature: 95,
        vibration: 2.1,
        pressure: 220,
        current: 310
      },
      predictions: [
        {
          component: 'Hydraulic Pump',
          failureDate: '5 days',
          confidence: 92,
          impact: 'high'
        }
      ]
    },
    {
      id: '3',
      name: 'Generator DG-02',
      type: 'Diesel Generator',
      model: 'Cummins C1100D5',
      location: 'Bashundhara Tower',
      status: 'operational',
      health: 92,
      nextMaintenance: '14 days',
      failureProbability: 8,
      runtime: 567,
      efficiency: 95,
      lastMaintenance: '21 days ago',
      maintenanceCost: 45000,
      sensors: {
        temperature: 85,
        vibration: 0.5,
        pressure: 160,
        current: 850
      },
      predictions: []
    },
    {
      id: '4',
      name: 'Excavator EX-04',
      type: 'Excavator',
      model: 'CAT 336F L',
      location: 'Gulshan Heights',
      status: 'critical',
      health: 45,
      nextMaintenance: 'Immediate',
      failureProbability: 78,
      runtime: 4567,
      efficiency: 52,
      lastMaintenance: '90 days ago',
      maintenanceCost: 280000,
      sensors: {
        temperature: 105,
        vibration: 3.5,
        pressure: 280,
        current: 180
      },
      predictions: [
        {
          component: 'Engine Cooling System',
          failureDate: '1 day',
          confidence: 95,
          impact: 'high'
        },
        {
          component: 'Hydraulic Cylinder',
          failureDate: '3 days',
          confidence: 87,
          impact: 'high'
        }
      ]
    }
  ]

  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: '1',
      equipment: 'Excavator EX-04',
      task: 'Emergency cooling system repair',
      priority: 'urgent',
      dueDate: 'Today',
      estimatedTime: 4,
      estimatedCost: 125000,
      assignedTo: 'Team A'
    },
    {
      id: '2',
      equipment: 'Concrete Pump CP-03',
      task: 'Hydraulic pump replacement',
      priority: 'high',
      dueDate: '2 days',
      estimatedTime: 6,
      estimatedCost: 85000
    },
    {
      id: '3',
      equipment: 'Tower Crane TC-01',
      task: 'Bearing inspection and lubrication',
      priority: 'medium',
      dueDate: '7 days',
      estimatedTime: 3,
      estimatedCost: 35000,
      assignedTo: 'Team B'
    }
  ]

  const equipmentHealthData = [
    { name: 'Week 1', health: 88 },
    { name: 'Week 2', health: 86 },
    { name: 'Week 3', health: 84 },
    { name: 'Week 4', health: 82 },
    { name: 'Week 5', health: 79 },
    { name: 'Week 6', health: 77 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'from-green-400 to-emerald-600'
      case 'warning': return 'from-amber-400 to-orange-600'
      case 'critical': return 'from-red-400 to-rose-600'
      case 'maintenance': return 'from-blue-400 to-indigo-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-400'
    if (health >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
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
          <h2 className="text-2xl font-bold text-white mb-2">Predictive Maintenance</h2>
          <p className="text-gray-400">AI-powered equipment failure prediction and optimization</p>
        </div>
        
        <div className="flex items-center gap-2">
          {(['equipment', 'schedule', 'analytics'] as const).map((mode) => (
            <AnimatedButton
              key={mode}
              variant={viewMode === mode ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode(mode)}
              className={viewMode === mode ? 'bg-gradient-to-r from-amber-600 to-orange-600' : ''}
            >
              {mode === 'equipment' && <Gauge className="w-4 h-4" />}
              {mode === 'schedule' && <Calendar className="w-4 h-4" />}
              {mode === 'analytics' && <BarChart3 className="w-4 h-4" />}
              <span className="capitalize">{mode}</span>
            </AnimatedButton>
          ))}
        </div>
      </div>

      {/* Maintenance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Settings,
            label: 'Equipment Monitored',
            value: maintenanceStats.equipmentMonitored,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: Activity,
            label: 'Uptime Rate',
            value: `${maintenanceStats.uptimeRate}%`,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: AlertTriangle,
            label: 'Predicted Failures',
            value: maintenanceStats.predictedFailures,
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          },
          {
            icon: TrendingUp,
            label: 'Cost Saved',
            value: formatBDT(maintenanceStats.costSaved),
            format: 'string',
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.format === 'string' ? metric.value :
                   typeof metric.value === 'number' ? <AnimatedCounter value={metric.value} /> : metric.value}
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
            <h3 className="text-lg font-semibold text-white mb-2">AI Maintenance Intelligence</h3>
            <p className="text-gray-300">
              Critical alert: <span className="font-semibold text-red-400">Excavator EX-04 requires immediate attention</span>. 
              Predictive models show <span className="font-semibold text-amber-400">3 equipment failures</span> likely within 
              7 days. Scheduling preventive maintenance now can save <span className="font-semibold text-green-400">৳8.5 Lakh</span> in 
              emergency repair costs and prevent 48 hours of downtime.
            </p>
          </div>
        </div>
      </GlassCard>

      {viewMode === 'equipment' && (
        <div className="space-y-4">
          {equipment.map((equip, index) => (
            <motion.div
              key={equip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard 
                className="p-6" 
                variant="accent" 
                hover
                onClick={() => setSelectedEquipment(equip.id === selectedEquipment ? null : equip.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-lg font-semibold text-white">{equip.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(equip.status)} bg-opacity-20`}>
                        {equip.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Type</p>
                        <p className="text-white">{equip.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Location</p>
                        <p className="text-white">{equip.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Runtime</p>
                        <p className="text-white">{equip.runtime}h</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Efficiency</p>
                        <p className={`${getHealthColor(equip.efficiency)}`}>{equip.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Next Service</p>
                        <p className="text-white">{equip.nextMaintenance}</p>
                      </div>
                    </div>

                    {/* Sensor Data */}
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      <div className="p-2 rounded-lg bg-white/5 text-center">
                        <Thermometer className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Temp</p>
                        <p className="text-sm text-white">{equip.sensors.temperature}°C</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 text-center">
                        <Activity className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Vibration</p>
                        <p className="text-sm text-white">{equip.sensors.vibration}mm/s</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 text-center">
                        <Gauge className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Pressure</p>
                        <p className="text-sm text-white">{equip.sensors.pressure}psi</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 text-center">
                        <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Current</p>
                        <p className="text-sm text-white">{equip.sensors.current}A</p>
                      </div>
                    </div>

                    {/* Predictions */}
                    {equip.predictions.length > 0 && (
                      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-red-500/10 to-rose-500/10 backdrop-blur-md border border-red-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-sm font-medium text-red-400">Failure Predictions</span>
                        </div>
                        {equip.predictions.map((pred, idx) => (
                          <div key={idx} className="text-sm text-gray-300 mb-1">
                            <span className="font-medium">{pred.component}</span> - 
                            <span className="text-red-400"> {pred.failureDate}</span> 
                            <span className="text-gray-500"> ({pred.confidence}% confidence)</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Health Score */}
                  <div className="text-center ml-6">
                    <div className="relative">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke={equip.health >= 80 ? '#10B981' : equip.health >= 60 ? '#F59E0B' : '#EF4444'}
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "0 251" }}
                          animate={{ strokeDasharray: `${(equip.health / 100) * 251} 251` }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-2xl font-bold ${getHealthColor(equip.health)}`}>{equip.health}%</span>
                        <span className="text-xs text-gray-400">Health</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs text-gray-400">Failure Risk</p>
                      <p className={`text-lg font-bold ${
                        equip.failureProbability < 20 ? 'text-green-400' :
                        equip.failureProbability < 50 ? 'text-amber-400' :
                        'text-red-400'
                      }`}>
                        {equip.failureProbability}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedEquipment === equip.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-white/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Equipment Details</p>
                        <p className="text-white">Model: {equip.model}</p>
                        <p className="text-gray-300 text-sm">Last Service: {equip.lastMaintenance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Maintenance Cost</p>
                        <p className="text-white font-medium">{formatBDT(equip.maintenanceCost)}/year</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">AI Recommendation</p>
                        <p className="text-sm text-gray-300">
                          {equip.status === 'critical' ? 'Immediate maintenance required' :
                           equip.status === 'warning' ? 'Schedule maintenance soon' :
                           'Continue monitoring'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <AnimatedButton
                        variant="primary"
                        size="sm"
                        className={`bg-gradient-to-r ${
                          equip.status === 'critical' ? 'from-red-600 to-rose-600' :
                          'from-amber-600 to-orange-600'
                        }`}
                      >
                        <Wrench className="w-4 h-4" />
                        Schedule Maintenance
                      </AnimatedButton>
                      <AnimatedButton variant="ghost" size="sm">
                        <Activity className="w-4 h-4" />
                        View History
                      </AnimatedButton>
                      <AnimatedButton variant="ghost" size="sm">
                        <BarChart3 className="w-4 h-4" />
                        Detailed Analytics
                      </AnimatedButton>
                    </div>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {viewMode === 'schedule' && (
        <div className="space-y-4">
          <GlassCard className="p-6" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">Maintenance Schedule</h3>
            <div className="space-y-3">
              {maintenanceTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border ${getPriorityColor(task.priority)} backdrop-blur-md`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{task.task}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{task.equipment}</span>
                        <span>•</span>
                        <span>{task.dueDate}</span>
                        <span>•</span>
                        <span>{task.estimatedTime}h</span>
                        <span>•</span>
                        <span>{formatBDT(task.estimatedCost)}</span>
                      </div>
                    </div>
                    {task.assignedTo ? (
                      <span className="text-sm text-gray-300">{task.assignedTo}</span>
                    ) : (
                      <AnimatedButton variant="ghost" size="sm">
                        Assign
                        <ChevronRight className="w-4 h-4" />
                      </AnimatedButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {viewMode === 'analytics' && (
        <div className="space-y-6">
          <GlassCard className="p-6" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">Equipment Health Trend</h3>
            <AnimatedChart
              data={equipmentHealthData}
              dataKey="health"
              type="line"
              height={250}
              color="#F59E0B"
              gradient={false}
            />
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6" variant="accent">
              <h3 className="text-lg font-semibold text-white mb-4">Failure Categories</h3>
              <div className="space-y-3">
                {[
                  { category: 'Mechanical', percentage: 35, count: 12 },
                  { category: 'Electrical', percentage: 28, count: 10 },
                  { category: 'Hydraulic', percentage: 22, count: 8 },
                  { category: 'Other', percentage: 15, count: 5 }
                ].map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300">{cat.category}</span>
                      <span className="text-sm text-white">{cat.count} ({cat.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.percentage}%` }}
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6" variant="accent">
              <h3 className="text-lg font-semibold text-white mb-4">Maintenance ROI</h3>
              <div className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-white mb-2">{formatBDT(maintenanceStats.costSaved)}</p>
                  <p className="text-gray-400">Saved in last 6 months</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <span className="text-sm text-gray-300">Prevented Failures</span>
                    <span className="text-sm text-white font-medium">23</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <span className="text-sm text-gray-300">Downtime Avoided</span>
                    <span className="text-sm text-white font-medium">124 hours</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <span className="text-sm text-gray-300">Efficiency Gain</span>
                    <span className="text-sm text-green-400 font-medium">+18%</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  )
}