'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'

interface PerformanceChartProps {
  realtimeData: any
}

// Generate static initial data for SSR
const generateInitialChartData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map(day => ({
    day,
    productivity: 82.5,
    workers: 900,
    equipment: 90,
    safety: 94
  }))
}

// Generate random data for client-side
const generateRandomChartData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map(day => ({
    day,
    productivity: 75 + Math.random() * 20,
    workers: 800 + Math.floor(Math.random() * 200),
    equipment: 85 + Math.random() * 10,
    safety: 90 + Math.random() * 8
  }))
}

export default function PerformanceChart({ realtimeData }: PerformanceChartProps) {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area')
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week')
  const [data, setData] = useState(generateInitialChartData())

  // Generate random data only on client side
  useEffect(() => {
    setData(generateRandomChartData())
  }, [])

  const gridColor = '#E5E7EB'
  const axisColor = '#6B7280'

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-popup rounded-xl p-4 shadow-2xl border border-gray-200/50"
        >
          <p className="font-semibold text-sm mb-3 text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6 text-xs p-2 bg-white/50 rounded-lg mb-1">
              <span className="text-gray-600 font-medium">{entry.name}:</span>
              <span style={{ color: entry.color }} className="font-mono font-bold">
                {entry.name === 'Workers' ? entry.value : `${entry.value.toFixed(1)}%`}
              </span>
            </div>
          ))}
        </motion.div>
      )
    }
    return null
  }

  const chartConfig = {
    margin: { top: 5, right: 5, left: 5, bottom: 5 },
    style: {
      fontSize: 12,
      fontFamily: 'Inter, sans-serif'
    }
  }

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data} {...chartConfig}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="day" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="productivity" 
              stroke="#6366F1" 
              strokeWidth={2}
              dot={{ fill: '#6366F1', r: 4 }}
              activeDot={{ r: 6 }}
              name="Productivity"
            />
            <Line 
              type="monotone" 
              dataKey="equipment" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 4 }}
              activeDot={{ r: 6 }}
              name="Equipment"
            />
            <Line 
              type="monotone" 
              dataKey="safety" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={{ fill: '#F59E0B', r: 4 }}
              activeDot={{ r: 6 }}
              name="Safety"
            />
          </LineChart>
        )
      
      case 'bar':
        return (
          <BarChart data={data} {...chartConfig}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="day" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="productivity" fill="#6366F1" name="Productivity" radius={[4, 4, 0, 0]} />
            <Bar dataKey="equipment" fill="#10B981" name="Equipment" radius={[4, 4, 0, 0]} />
            <Bar dataKey="safety" fill="#F59E0B" name="Safety" radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      
      default: // area
        return (
          <AreaChart data={data} {...chartConfig}>
            <defs>
              <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEquipment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSafety" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="day" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="productivity" 
              stroke="#6366F1" 
              fillOpacity={1} 
              fill="url(#colorProductivity)"
              strokeWidth={2}
              name="Productivity"
            />
            <Area 
              type="monotone" 
              dataKey="equipment" 
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#colorEquipment)"
              strokeWidth={2}
              name="Equipment"
            />
            <Area 
              type="monotone" 
              dataKey="safety" 
              stroke="#F59E0B" 
              fillOpacity={1} 
              fill="url(#colorSafety)"
              strokeWidth={2}
              name="Safety"
            />
          </AreaChart>
        )
    }
  }

  return (
    <motion.div 
      className="glass-light rounded-2xl overflow-hidden backdrop-blur-xl border border-gray-200/50 neo-shadow-light group hover-lift"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: -20, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <BarChart3 className="w-5 h-5 text-gray-900" />
            </motion.div>
            <h3 className="font-semibold text-gray-900">Performance Overview</h3>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Time Range */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 shadow-inner">
              {(['week', 'month', 'quarter'] as const).map((range) => (
                <motion.button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Chart Type */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 shadow-inner">
              {(['area', 'line', 'bar'] as const).map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    chartType === type
                      ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <motion.div
          key={`${chartType}-${timeRange}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Avg Productivity', value: '82.5%', change: '+3.2%', color: '#6366F1' },
            { label: 'Equipment Uptime', value: '89.3%', change: '+1.5%', color: '#10B981' },
            { label: 'Safety Score', value: '94.7%', change: '+0.8%', color: '#F59E0B' },
            { label: 'Worker Efficiency', value: '78.9%', change: '-2.1%', color: '#EF4444' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/30 hover:shadow-lg transition-all hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-xs text-gray-600 mb-2 font-medium">{stat.label}</p>
              <div className="flex items-end justify-between">
                <motion.span 
                  className="text-xl font-bold" 
                  style={{ color: stat.color }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.span>
                <motion.span 
                  className={`text-xs font-medium ${
                    stat.change.startsWith('+') ? 'text-[#10B981]' : 'text-[#EF4444]'
                  } bg-white/50 px-2 py-1 rounded-lg`}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.change}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}