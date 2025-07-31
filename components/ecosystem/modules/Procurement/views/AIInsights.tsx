'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain,
  FileText,
  TrendingUp,
  Package,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Sparkles,
  Target,
  Clock,
  DollarSign,
  Zap,
  Shield,
  Info,
  ChevronRight,
  Activity,
  Cpu
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter, AnimatedChart } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface DemandForecast {
  material: string
  category: string
  currentStock: number
  predictedDemand30d: number
  predictedDemand60d: number
  recommendedOrder: number
  confidence: number
  trend: 'increasing' | 'stable' | 'decreasing'
  seasonalFactor: string
  leadTime: number
}

interface SmartContract {
  id: string
  name: string
  type: 'purchase' | 'delivery' | 'quality' | 'payment'
  status: 'active' | 'pending' | 'completed' | 'triggered'
  value: number
  conditions: string[]
  automationLevel: number
  executionsToday: number
  savedTime: number
  nextTrigger?: string
}

interface AIAlert {
  id: string
  type: 'urgent' | 'warning' | 'info'
  title: string
  description: string
  action: string
  impact: string
  timestamp: string
}

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState<'demand' | 'contracts' | 'alerts'>('demand')

  const aiStats = {
    predictionsAccuracy: 94,
    contractsAutomated: 87,
    timeSaved: 312,
    costReduction: 23
  }

  const demandForecasts: DemandForecast[] = [
    {
      material: 'Portland Cement',
      category: 'cement',
      currentStock: 3500,
      predictedDemand30d: 5200,
      predictedDemand60d: 8900,
      recommendedOrder: 6000,
      confidence: 92,
      trend: 'increasing',
      seasonalFactor: 'Monsoon preparation',
      leadTime: 7
    },
    {
      material: 'MS Rod 60 Grade',
      category: 'steel',
      currentStock: 120,
      predictedDemand30d: 180,
      predictedDemand60d: 250,
      recommendedOrder: 200,
      confidence: 88,
      trend: 'increasing',
      seasonalFactor: 'Q2 construction peak',
      leadTime: 14
    },
    {
      material: 'Vitrified Tiles',
      category: 'tiles',
      currentStock: 45000,
      predictedDemand30d: 38000,
      predictedDemand60d: 42000,
      recommendedOrder: 0,
      confidence: 95,
      trend: 'stable',
      seasonalFactor: 'Normal demand',
      leadTime: 21
    },
    {
      material: 'Electrical Cables',
      category: 'electrical',
      currentStock: 250,
      predictedDemand30d: 320,
      predictedDemand60d: 450,
      recommendedOrder: 300,
      confidence: 91,
      trend: 'increasing',
      seasonalFactor: 'New project phase',
      leadTime: 10
    }
  ]

  const smartContracts: SmartContract[] = [
    {
      id: 'SC-001',
      name: 'Auto-Purchase Cement',
      type: 'purchase',
      status: 'active',
      value: 2400000,
      conditions: [
        'Stock < 2000 bags',
        'Price < ৳500/bag',
        'Supplier rating > 4.5'
      ],
      automationLevel: 95,
      executionsToday: 3,
      savedTime: 4.5,
      nextTrigger: 'In 3 days'
    },
    {
      id: 'SC-002',
      name: 'Quality Verification',
      type: 'quality',
      status: 'triggered',
      value: 47500000,
      conditions: [
        'Material delivered',
        'QC test passed',
        'Documentation complete'
      ],
      automationLevel: 100,
      executionsToday: 1,
      savedTime: 2.0,
      nextTrigger: 'Processing...'
    },
    {
      id: 'SC-003',
      name: 'Payment Release',
      type: 'payment',
      status: 'active',
      value: 8500000,
      conditions: [
        'Delivery confirmed',
        'Quality approved',
        'Invoice verified'
      ],
      automationLevel: 90,
      executionsToday: 5,
      savedTime: 6.0
    },
    {
      id: 'SC-004',
      name: 'Delivery Tracking',
      type: 'delivery',
      status: 'pending',
      value: 3200000,
      conditions: [
        'GPS location match',
        'Time window valid',
        'Receiver confirmed'
      ],
      automationLevel: 85,
      executionsToday: 0,
      savedTime: 0
    }
  ]

  const aiAlerts: AIAlert[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Steel shortage predicted',
      description: 'AI predicts 30% shortage in MS Rod supply in next 20 days due to factory maintenance',
      action: 'Place advance order now',
      impact: 'Could delay 3 projects',
      timestamp: '5 mins ago'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Price spike alert',
      description: 'Cement prices expected to increase 15% after budget announcement',
      action: 'Consider bulk purchase',
      impact: '৳45 Lakh additional cost',
      timestamp: '2 hours ago'
    },
    {
      id: '3',
      type: 'info',
      title: 'New supplier match',
      description: '3 new suppliers match your quality criteria with 20% better pricing',
      action: 'Review suppliers',
      impact: 'Potential ৳2.3 Cr savings',
      timestamp: '1 day ago'
    }
  ]

  const monthlyDemandData = [
    { name: 'Jan', cement: 4200, steel: 150, tiles: 35000 },
    { name: 'Feb', cement: 4500, steel: 165, tiles: 38000 },
    { name: 'Mar', cement: 4800, steel: 175, tiles: 40000 },
    { name: 'Apr', cement: 5200, steel: 180, tiles: 38000 },
    { name: 'May', cement: 5500, steel: 195, tiles: 42000 },
    { name: 'Jun', cement: 5800, steel: 210, tiles: 45000 }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Procurement Analytics</h2>
          <p className="text-gray-400">Smart contracts and demand forecasting powered by ML</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <Activity className="w-4 h-4" />
            <span>Live Feed</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Cpu className="w-4 h-4" />
            <span>AI Settings</span>
          </AnimatedButton>
        </div>
      </div>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Target,
            label: 'Prediction Accuracy',
            value: `${aiStats.predictionsAccuracy}%`,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: FileText,
            label: 'Contracts Automated',
            value: `${aiStats.contractsAutomated}%`,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: Clock,
            label: 'Hours Saved/Month',
            value: aiStats.timeSaved,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          },
          {
            icon: DollarSign,
            label: 'Cost Reduction',
            value: `${aiStats.costReduction}%`,
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {typeof metric.value === 'string' ? metric.value : <AnimatedCounter value={metric.value} />}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* AI Executive Summary */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Procurement Intelligence</h3>
            <p className="text-gray-300">
              Based on project timelines and historical data, AI recommends <span className="font-semibold text-green-400">
              immediate cement procurement</span> to avoid 15% price increase. <span className="font-semibold text-blue-400">
              3 smart contracts</span> will auto-execute this week, saving ৳2.8 Lakh in processing costs. 
              <span className="font-semibold text-amber-400"> Steel demand spike</span> expected in 30 days - 
              consider forward contracts.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2">
        {[
          { id: 'demand', label: 'Demand Forecast', icon: TrendingUp },
          { id: 'contracts', label: 'Smart Contracts', icon: FileText },
          { id: 'alerts', label: 'AI Alerts', icon: AlertTriangle }
        ].map((tab) => (
          <AnimatedButton
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab.id as any)}
            className={activeTab === tab.id ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </AnimatedButton>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'demand' && (
        <div className="space-y-6">
          {/* Demand Chart */}
          <GlassCard className="p-6" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">6-Month Demand Trend</h3>
            <AnimatedChart
              data={monthlyDemandData}
              dataKey="cement"
              type="area"
              height={250}
              color="#14B8A6"
              gradient={true}
            />
          </GlassCard>

          {/* Material Forecasts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demandForecasts.map((forecast) => (
              <GlassCard key={forecast.material} className="p-6" variant="accent" hover>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{forecast.material}</h4>
                    <p className="text-sm text-gray-400">Lead time: {forecast.leadTime} days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">AI Confidence</p>
                    <p className="text-lg font-bold text-white">{forecast.confidence}%</p>
                  </div>
                </div>

                {/* Stock Levels */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Current Stock</span>
                      <span className="text-sm text-white">{forecast.currentStock} units</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        className="h-full bg-gradient-to-r from-blue-400 to-indigo-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">30-Day Demand</span>
                      <span className="text-sm text-white">{forecast.predictedDemand30d} units</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(forecast.predictedDemand30d / (forecast.predictedDemand60d * 1.2)) * 100}%` }}
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Trend & Recommendation */}
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-400">AI Recommendation</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      forecast.trend === 'increasing' ? 'bg-red-500/20 text-red-400' :
                      forecast.trend === 'decreasing' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {forecast.trend}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    Order <span className="font-semibold text-white">{forecast.recommendedOrder} units</span> now. 
                    {forecast.seasonalFactor}.
                  </p>
                  <AnimatedButton
                    variant="primary"
                    size="sm"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    Create Purchase Order
                    <ChevronRight className="w-4 h-4" />
                  </AnimatedButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'contracts' && (
        <div className="space-y-4">
          {smartContracts.map((contract) => (
            <GlassCard key={contract.id} className="p-6" variant="accent" hover>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{contract.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contract.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      contract.status === 'triggered' ? 'bg-amber-500/20 text-amber-400 animate-pulse' :
                      contract.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {contract.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">Contract Value</p>
                      <p className="text-sm font-medium text-white">{formatBDT(contract.value)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Automation</p>
                      <p className="text-sm font-medium text-white">{contract.automationLevel}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Executions Today</p>
                      <p className="text-sm font-medium text-white">{contract.executionsToday}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Time Saved</p>
                      <p className="text-sm font-medium text-white">{contract.savedTime}h</p>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 mb-2">Trigger Conditions:</p>
                    {contract.conditions.map((condition, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-gray-300">{condition}</span>
                      </div>
                    ))}
                  </div>

                  {contract.nextTrigger && (
                    <p className="text-xs text-gray-500 mt-3">
                      Next trigger: <span className="text-gray-400">{contract.nextTrigger}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <AnimatedButton variant="ghost" size="sm">
                    <Shield className="w-4 h-4" />
                    View
                  </AnimatedButton>
                  {contract.status === 'triggered' && (
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      className="bg-gradient-to-r from-amber-600 to-orange-600 animate-pulse"
                    >
                      Processing
                    </AnimatedButton>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {aiAlerts.map((alert) => (
            <GlassCard 
              key={alert.id} 
              className={`p-6 ${
                alert.type === 'urgent' ? 'border-red-500/50' :
                alert.type === 'warning' ? 'border-amber-500/50' :
                'border-blue-500/50'
              }`} 
              variant="accent" 
              hover
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  alert.type === 'urgent' ? 'bg-gradient-to-br from-red-500/20 to-rose-500/20' :
                  alert.type === 'warning' ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20' :
                  'bg-gradient-to-br from-blue-500/20 to-indigo-500/20'
                }`}>
                  {alert.type === 'urgent' ? <AlertTriangle className="w-6 h-6 text-red-400" /> :
                   alert.type === 'warning' ? <Zap className="w-6 h-6 text-amber-400" /> :
                   <Info className="w-6 h-6 text-blue-400" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">{alert.title}</h4>
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">{alert.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-400">Recommended Action</p>
                        <p className="text-sm font-medium text-white">{alert.action}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Impact</p>
                        <p className="text-sm font-medium text-white">{alert.impact}</p>
                      </div>
                    </div>
                    
                    <AnimatedButton
                      variant={alert.type === 'urgent' ? 'primary' : 'ghost'}
                      size="sm"
                      className={alert.type === 'urgent' ? 'bg-gradient-to-r from-red-600 to-rose-600' : ''}
                    >
                      Take Action
                      <ChevronRight className="w-4 h-4" />
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}