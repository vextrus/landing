'use client'

import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

interface ChartVisualizationsProps {
  data: {
    costComparison: Array<{ category: string; before: number; after: number }>
    roiTimeline: Array<{ month: string; investment: number; returns: number; cumulative: number }>
    savingsBreakdown: Array<{ name: string; value: number; color: string }>
  }
}

export default function ChartVisualizations({ data }: ChartVisualizationsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatShortCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value}`
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Visual Analysis</h3>
      
      {/* Cost Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-4">Cost Comparison: Before vs After Vextrus</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.costComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatShortCurrency} tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend />
            <Bar 
              dataKey="before" 
              fill="#EF4444" 
              name="Before Vextrus" 
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="after" 
              fill="#22C55E" 
              name="After Vextrus" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      
      {/* ROI Timeline Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-4">ROI Timeline: Investment vs Returns</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.roiTimeline}>
            <defs>
              <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatShortCurrency} tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#8B5CF6"
              fillOpacity={1}
              fill="url(#colorCumulative)"
              name="Cumulative Savings"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="investment"
              stroke="#EF4444"
              name="Investment"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
      
      {/* Savings Breakdown Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-4">Savings Breakdown by Category</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.savingsBreakdown}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name: string; percent?: number }) => 
                percent ? `${name}: ${(percent * 100).toFixed(0)}%` : name
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.savingsBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.savingsBreakdown.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}