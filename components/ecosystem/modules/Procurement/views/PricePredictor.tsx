'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  BarChart3,
  Brain,
  Zap,
  Info,
  ChevronUp,
  ChevronDown,
  Clock,
  Target,
  Package,
  Sparkles
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter, AnimatedChart } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface MaterialPrice {
  id: string
  name: string
  category: string
  unit: string
  currentPrice: number
  previousPrice: number
  predictedPrice30d: number
  predictedPrice60d: number
  predictedPrice90d: number
  volatility: 'low' | 'medium' | 'high'
  trend: 'up' | 'down' | 'stable'
  changePercent: number
  confidence: number
  factors: string[]
  historicalData: { date: string; price: number }[]
}

export default function PricePredictor() {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<'30d' | '60d' | '90d'>('30d')

  const predictionStats = {
    accuracy: 92,
    materialsTracked: 127,
    avgSavings: 18,
    alertsActive: 23
  }

  const materials: MaterialPrice[] = [
    {
      id: '1',
      name: 'Portland Cement (Shah)',
      category: 'cement',
      unit: '50kg bag',
      currentPrice: 480,
      previousPrice: 465,
      predictedPrice30d: 455,
      predictedPrice60d: 445,
      predictedPrice90d: 460,
      volatility: 'medium',
      trend: 'down',
      changePercent: 3.2,
      confidence: 94,
      factors: ['Import duty reduction', 'New factory opening', 'Lower coal prices'],
      historicalData: [
        { date: 'Jan', price: 450 },
        { date: 'Feb', price: 458 },
        { date: 'Mar', price: 465 },
        { date: 'Apr', price: 472 },
        { date: 'May', price: 480 },
        { date: 'Jun', price: 475 }
      ]
    },
    {
      id: '2',
      name: 'MS Rod 60 Grade (BSRM)',
      category: 'steel',
      unit: 'per ton',
      currentPrice: 95000,
      previousPrice: 88000,
      predictedPrice30d: 92000,
      predictedPrice60d: 89000,
      predictedPrice90d: 87000,
      volatility: 'high',
      trend: 'down',
      changePercent: 8.0,
      confidence: 88,
      factors: ['Global steel surplus', 'Currency appreciation', 'Lower scrap prices'],
      historicalData: [
        { date: 'Jan', price: 82000 },
        { date: 'Feb', price: 85000 },
        { date: 'Mar', price: 88000 },
        { date: 'Apr', price: 92000 },
        { date: 'May', price: 95000 },
        { date: 'Jun', price: 93000 }
      ]
    },
    {
      id: '3',
      name: 'Vitrified Tiles (RAK)',
      category: 'tiles',
      unit: 'per sqft',
      currentPrice: 65,
      previousPrice: 62,
      predictedPrice30d: 68,
      predictedPrice60d: 70,
      predictedPrice90d: 72,
      volatility: 'low',
      trend: 'up',
      changePercent: 4.8,
      confidence: 91,
      factors: ['Gas price increase', 'Higher demand', 'Import restrictions'],
      historicalData: [
        { date: 'Jan', price: 58 },
        { date: 'Feb', price: 60 },
        { date: 'Mar', price: 62 },
        { date: 'Apr', price: 63 },
        { date: 'May', price: 65 },
        { date: 'Jun', price: 66 }
      ]
    },
    {
      id: '4',
      name: 'PVC Cable 2.5mm',
      category: 'electrical',
      unit: '100m coil',
      currentPrice: 4200,
      previousPrice: 4100,
      predictedPrice30d: 4150,
      predictedPrice60d: 4100,
      predictedPrice90d: 4050,
      volatility: 'low',
      trend: 'stable',
      changePercent: 2.4,
      confidence: 96,
      factors: ['Stable copper prices', 'Local production increase', 'Seasonal demand'],
      historicalData: [
        { date: 'Jan', price: 4000 },
        { date: 'Feb', price: 4050 },
        { date: 'Mar', price: 4100 },
        { date: 'Apr', price: 4150 },
        { date: 'May', price: 4200 },
        { date: 'Jun', price: 4180 }
      ]
    }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-400" />
      case 'down': return <TrendingDown className="w-4 h-4 text-green-400" />
      default: return <BarChart3 className="w-4 h-4 text-gray-400" />
    }
  }

  const getVolatilityColor = (volatility: string) => {
    switch (volatility) {
      case 'low': return 'from-green-400 to-emerald-600'
      case 'medium': return 'from-amber-400 to-orange-600'
      case 'high': return 'from-red-400 to-rose-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getPredictedPrice = (material: MaterialPrice) => {
    switch (timeframe) {
      case '30d': return material.predictedPrice30d
      case '60d': return material.predictedPrice60d
      case '90d': return material.predictedPrice90d
    }
  }

  const getPriceChange = (material: MaterialPrice) => {
    const predicted = getPredictedPrice(material)
    return ((predicted - material.currentPrice) / material.currentPrice) * 100
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Price Forecasting</h2>
          <p className="text-gray-400">ML-powered material price predictions with 92% accuracy</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Price Alerts</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Brain className="w-4 h-4" />
            <span>Train Model</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Prediction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Target,
            label: 'Prediction Accuracy',
            value: `${predictionStats.accuracy}%`,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: Package,
            label: 'Materials Tracked',
            value: predictionStats.materialsTracked,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: TrendingDown,
            label: 'Avg Savings',
            value: `${predictionStats.avgSavings}%`,
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          },
          {
            icon: AlertTriangle,
            label: 'Active Alerts',
            value: predictionStats.alertsActive,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
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

      {/* Market Intelligence */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Market Intelligence Summary</h3>
            <p className="text-gray-300">
              AI predicts <span className="font-semibold text-green-400">steel prices will drop 8%</span> in next 45 days due to 
              global oversupply. <span className="font-semibold text-amber-400">Cement shortage expected</span> in monsoon season - 
              recommend stockpiling. <span className="font-semibold text-blue-400">New import policy</span> may affect tile prices 
              by 12% starting next quarter.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Timeframe Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Forecast Period:</span>
        {(['30d', '60d', '90d'] as const).map((tf) => (
          <AnimatedButton
            key={tf}
            variant={timeframe === tf ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setTimeframe(tf)}
            className={timeframe === tf ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            {tf === '30d' && '30 Days'}
            {tf === '60d' && '60 Days'}
            {tf === '90d' && '90 Days'}
          </AnimatedButton>
        ))}
      </div>

      {/* Material Price Cards */}
      <div className="space-y-6">
        {materials.map((material, index) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6" 
              variant="accent" 
              hover
              onClick={() => setSelectedMaterial(material.id === selectedMaterial ? null : material.id)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Material Info */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{material.name}</h4>
                      <p className="text-sm text-gray-400">{material.unit}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getVolatilityColor(material.volatility)} bg-opacity-20`}>
                      {material.volatility} volatility
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Current Price</span>
                      <span className="text-xl font-bold text-white">৳{material.currentPrice}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Predicted ({timeframe})</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">৳{getPredictedPrice(material)}</span>
                        {getTrendIcon(material.trend)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Change</span>
                      <span className={`text-sm font-medium ${
                        getPriceChange(material) < 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {getPriceChange(material) > 0 && '+'}
                        {getPriceChange(material).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">AI Confidence</span>
                      <span className="text-xs text-white">{material.confidence}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${material.confidence}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Chart */}
                <div className="lg:col-span-2">
                  <AnimatedChart
                    data={material.historicalData.map(d => ({ name: d.date, price: d.price }))}
                    dataKey="price"
                    type="line"
                    height={150}
                    color="#14B8A6"
                    gradient={false}
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {selectedMaterial === material.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  {/* Price Predictions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="p-4 rounded-lg bg-white/5 backdrop-blur-md">
                      <h5 className="text-sm font-medium text-white mb-2">30 Day Forecast</h5>
                      <p className="text-2xl font-bold text-white">৳{material.predictedPrice30d}</p>
                      <p className={`text-sm ${
                        material.predictedPrice30d < material.currentPrice ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {material.predictedPrice30d < material.currentPrice ? '↓' : '↑'} 
                        {Math.abs(((material.predictedPrice30d - material.currentPrice) / material.currentPrice) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 backdrop-blur-md">
                      <h5 className="text-sm font-medium text-white mb-2">60 Day Forecast</h5>
                      <p className="text-2xl font-bold text-white">৳{material.predictedPrice60d}</p>
                      <p className={`text-sm ${
                        material.predictedPrice60d < material.currentPrice ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {material.predictedPrice60d < material.currentPrice ? '↓' : '↑'} 
                        {Math.abs(((material.predictedPrice60d - material.currentPrice) / material.currentPrice) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 backdrop-blur-md">
                      <h5 className="text-sm font-medium text-white mb-2">90 Day Forecast</h5>
                      <p className="text-2xl font-bold text-white">৳{material.predictedPrice90d}</p>
                      <p className={`text-sm ${
                        material.predictedPrice90d < material.currentPrice ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {material.predictedPrice90d < material.currentPrice ? '↓' : '↑'} 
                        {Math.abs(((material.predictedPrice90d - material.currentPrice) / material.currentPrice) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Price Factors */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" />
                      Key Price Factors
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {material.factors.map((factor) => (
                        <span key={factor} className="px-3 py-1 rounded-full bg-blue-500/20 text-xs text-blue-400">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-6">
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-emerald-600"
                    >
                      <Clock className="w-4 h-4" />
                      Set Price Alert
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <Package className="w-4 h-4" />
                      Buy Now
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <Calendar className="w-4 h-4" />
                      Schedule Purchase
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Market Recommendations */}
      <GlassCard className="p-6" variant="accent">
        <h3 className="text-lg font-semibold text-white mb-4">AI Procurement Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-green-400" />
              <span className="font-medium text-green-400">Buy Now</span>
            </div>
            <p className="text-sm text-gray-300">
              Steel prices at 3-month low. Recommend purchasing 2-3 month supply to save ৳45 Lakh.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-md border border-amber-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-amber-400">Wait 30 Days</span>
            </div>
            <p className="text-sm text-gray-300">
              Cement prices expected to drop 5% after new factory commissioning.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}