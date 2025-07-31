'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  DollarSign,
  Target,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  Settings,
  Info,
  Sparkles,
  Brain,
  Eye,
  Layers,
  Zap,
  Binary,
  ChartBar,
  ChartLine,
  ChartPie
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  ComposedChart,
  Line,
  Scatter
} from 'recharts'
import { formatBDT } from '../../../utils/bdCurrency'
import { useLiquidGlassDark } from '../theme/liquidGlassDark'
import { GlassCard, GlassButton, GlowText, GradientText, GlassInput } from '../components/ui/GlassMorphism'
import { MetricCard, DataCard, StatusIndicator, ActivityItem, ProgressBar } from '../components/ui/GlassWidgets'
import { LiveDataStream, RealtimePerformanceMonitor } from '../components/realtime/RealtimeDataLayer'

// Glass Morphism Chart Container
function GlassChartContainer({ 
  children, 
  title, 
  subtitle, 
  icon,
  actions 
}: { 
  children: React.ReactNode
  title: string
  subtitle?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
}) {
  const theme = useLiquidGlassDark()
  
  return (
    <GlassCard intensity="medium" className="p-6 h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-[#00D9FF]">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold">
              <GradientText gradient="aurora">{title}</GradientText>
            </h3>
            {subtitle && <p className="text-xs text-white/60">{subtitle}</p>}
          </div>
        </div>
        {actions}
      </div>
      <div className="h-[calc(100%-60px)]">
        {children}
      </div>
    </GlassCard>
  )
}

// Custom Glass Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  const theme = useLiquidGlassDark()
  
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-3 rounded-lg backdrop-blur-md"
        style={{
          background: theme.colors.glass.strong.background,
          border: `1px solid ${theme.colors.glass.strong.border}`,
          boxShadow: theme.colors.glass.strong.shadow,
        }}
      >
        <p className="text-sm font-medium text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white/60">{entry.name}:</span>
            <span className="text-white font-medium">{entry.value}</span>
          </div>
        ))}
      </motion.div>
    )
  }
  return null
}

// Enhanced Revenue Trend Chart with AI Predictions
function RevenueAnalysisChart() {
  const theme = useLiquidGlassDark()
  const [showPrediction, setShowPrediction] = useState(true)
  
  const data = [
    { month: 'Jan', revenue: 180, target: 150, lastYear: 120, prediction: null },
    { month: 'Feb', revenue: 220, target: 200, lastYear: 140, prediction: null },
    { month: 'Mar', revenue: 280, target: 250, lastYear: 160, prediction: null },
    { month: 'Apr', revenue: 320, target: 300, lastYear: 180, prediction: null },
    { month: 'May', revenue: 380, target: 350, lastYear: 200, prediction: null },
    { month: 'Jun', revenue: 420, target: 400, lastYear: 220, prediction: null },
    { month: 'Jul', revenue: null, target: 450, lastYear: 240, prediction: 480 },
    { month: 'Aug', revenue: null, target: 500, lastYear: 260, prediction: 540 },
    { month: 'Sep', revenue: null, target: 550, lastYear: 280, prediction: 620 },
  ]
  
  return (
    <GlassChartContainer
      title="Revenue Analysis & Predictions"
      subtitle="AI-powered revenue forecasting"
      icon={<TrendingUp className="w-6 h-6" />}
      actions={
        <GlassButton
          variant="secondary"
          size="sm"
          onClick={() => setShowPrediction(!showPrediction)}
          className="flex items-center gap-2"
        >
          <Brain className="w-4 h-4" />
          {showPrediction ? 'Hide' : 'Show'} AI Predictions
        </GlassButton>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00D9FF" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF00EA" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FF00EA" stopOpacity={0.1}/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.colors.glass.light.border}
            opacity={0.3}
          />
          <XAxis 
            dataKey="month" 
            stroke="white"
            opacity={0.6}
            style={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="white"
            opacity={0.6}
            style={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: 'white', fontSize: 12 }}
            iconType="circle"
          />
          
          {/* Last Year Line */}
          <Line
            type="monotone"
            dataKey="lastYear"
            stroke="#6B7280"
            strokeWidth={2}
            dot={false}
            name="Last Year"
            strokeDasharray="5 5"
          />
          
          {/* Target Line */}
          <Line
            type="monotone"
            dataKey="target"
            stroke="#FFB800"
            strokeWidth={2}
            dot={{ fill: '#FFB800', r: 4 }}
            name="Target"
            filter="url(#glow)"
          />
          
          {/* Actual Revenue Area */}
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#00D9FF"
            strokeWidth={3}
            fill="url(#revenueGradient)"
            name="Revenue"
            filter="url(#glow)"
          />
          
          {/* AI Predictions */}
          {showPrediction && (
            <Area
              type="monotone"
              dataKey="prediction"
              stroke="#FF00EA"
              strokeWidth={3}
              fill="url(#predictionGradient)"
              name="AI Prediction"
              strokeDasharray="8 4"
              filter="url(#glow)"
            />
          )}
          
          {/* Scatter for emphasis */}
          <Scatter
            dataKey="revenue"
            fill="#00D9FF"
            name=""
            legendType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </GlassChartContainer>
  )
}

// 3D Project Status Distribution
function ProjectStatusDistribution() {
  const theme = useLiquidGlassDark()
  const [activeIndex, setActiveIndex] = useState(0)
  
  const data = [
    { name: 'Planning', value: 15, color: '#6B7280' },
    { name: 'Foundation', value: 25, color: '#FFB800' },
    { name: 'Structure', value: 35, color: '#00D9FF' },
    { name: 'Finishing', value: 20, color: '#00FF88' },
    { name: 'Completed', value: 5, color: '#FF00EA' }
  ]
  
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  
  return (
    <GlassChartContainer
      title="Project Status Distribution"
      subtitle="Current phase breakdown"
      icon={<PieChart className="w-6 h-6" />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <defs>
            {data.map((entry, index) => (
              <radialGradient key={index} id={`gradient-${index}`}>
                <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0.3} />
              </radialGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#gradient-${index})`}
                stroke={entry.color}
                strokeWidth={index === activeIndex ? 3 : 1}
                style={{
                  filter: index === activeIndex ? `drop-shadow(0 0 20px ${entry.color})` : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RePieChart>
      </ResponsiveContainer>
      
      {/* Legend with Glass Cards */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-lg text-center cursor-pointer"
            style={{
              background: theme.colors.glass.light.background,
              border: `1px solid ${index === activeIndex ? item.color : theme.colors.glass.light.border}`,
              boxShadow: index === activeIndex ? `0 0 0 1px ${item.color}` : 'none'
            }}
            onClick={() => setActiveIndex(index)}
          >
            <div 
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-xs text-white/80">{item.name}</p>
            <p className="text-xs font-bold text-white">{item.value}%</p>
          </motion.div>
        ))}
      </div>
    </GlassChartContainer>
  )
}

// Enhanced KPI Radar Chart
function KPIRadarChart() {
  const theme = useLiquidGlassDark()
  
  const data = [
    { subject: 'Quality', current: 92, target: 95, aiProjected: 94 },
    { subject: 'Safety', current: 88, target: 90, aiProjected: 91 },
    { subject: 'Speed', current: 85, target: 85, aiProjected: 88 },
    { subject: 'Cost', current: 90, target: 88, aiProjected: 87 },
    { subject: 'Client Satisfaction', current: 94, target: 92, aiProjected: 96 }
  ]
  
  return (
    <GlassChartContainer
      title="Key Performance Indicators"
      subtitle="Multi-dimensional performance analysis"
      icon={<Activity className="w-6 h-6" />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <defs>
            <radialGradient id="currentGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity={0.2} />
            </radialGradient>
            <radialGradient id="targetGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFB800" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#FFB800" stopOpacity={0.1} />
            </radialGradient>
            <radialGradient id="aiGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF00EA" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#FF00EA" stopOpacity={0.1} />
            </radialGradient>
          </defs>
          
          <PolarGrid 
            stroke={theme.colors.glass.light.border}
            radialLines={false}
          />
          <PolarAngleAxis 
            dataKey="subject" 
            stroke="white"
            opacity={0.8}
            style={{ fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            stroke="white"
            opacity={0.5}
            style={{ fontSize: 10 }}
          />
          
          {/* Target Area */}
          <Radar
            name="Target"
            dataKey="target"
            stroke="#FFB800"
            fill="url(#targetGradient)"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          
          {/* AI Projected */}
          <Radar
            name="AI Projected"
            dataKey="aiProjected"
            stroke="#FF00EA"
            fill="url(#aiGradient)"
            fillOpacity={0.3}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          
          {/* Current Performance */}
          <Radar
            name="Current"
            dataKey="current"
            stroke="#00D9FF"
            fill="url(#currentGradient)"
            fillOpacity={0.4}
            strokeWidth={3}
            filter="url(#glow)"
          />
          
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: 'white', fontSize: 12 }}
            iconType="circle"
          />
        </RadarChart>
      </ResponsiveContainer>
    </GlassChartContainer>
  )
}

// Cost Breakdown with Animated Progress
function CostAnalysisBreakdown() {
  const theme = useLiquidGlassDark()
  
  const costData = [
    { category: 'Materials', amount: 1250000000, percentage: 45, trend: 'up', color: '#00D9FF' },
    { category: 'Labor', amount: 830000000, percentage: 30, trend: 'stable', color: '#FF00EA' },
    { category: 'Equipment', amount: 415000000, percentage: 15, trend: 'down', color: '#FFB800' },
    { category: 'Permits', amount: 138000000, percentage: 5, trend: 'stable', color: '#00FF88' },
    { category: 'Utilities', amount: 83000000, percentage: 3, trend: 'up', color: '#FF3366' },
    { category: 'Other', amount: 55000000, percentage: 2, trend: 'down', color: '#6B7280' }
  ]
  
  const totalCost = costData.reduce((sum, item) => sum + item.amount, 0)
  
  return (
    <GlassCard intensity="strong" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-[#FFB800]" />
          <h3 className="text-lg font-semibold">
            <GradientText gradient="gold">Cost Analysis Breakdown</GradientText>
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/60">Total Cost</p>
          <p className="text-xl font-bold">
            <GlowText color="gold">{formatBDT(totalCost)}</GlowText>
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {costData.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-white">{item.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/80">{formatBDT(item.amount)}</span>
                <div className={`flex items-center gap-1 text-xs ${
                  item.trend === 'up' ? 'text-[#FF3366]' :
                  item.trend === 'down' ? 'text-[#00FF88]' :
                  'text-[#00D9FF]'
                }`}>
                  {item.trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
                   item.trend === 'down' ? <TrendingDown className="w-3 h-3" /> :
                   <Activity className="w-3 h-3" />}
                  <span>{item.percentage}%</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{
                  background: theme.colors.glass.light.background,
                  border: `1px solid ${theme.colors.glass.light.border}`
                }}
              >
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}CC 100%)`,
                    boxShadow: `0 0 10px ${item.color}50`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                >
                  {/* Animated shimmer */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${item.color}40 50%, transparent 100%)`,
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

// Enhanced Productivity Comparison
function ProductivityComparison() {
  const theme = useLiquidGlassDark()
  
  const data = [
    { week: 'Week 1', bashundhara: 85, jolshiri: 78, average: 82 },
    { week: 'Week 2', bashundhara: 92, jolshiri: 85, average: 88 },
    { week: 'Week 3', bashundhara: 88, jolshiri: 90, average: 89 },
    { week: 'Week 4', bashundhara: 95, jolshiri: 92, average: 93 }
  ]
  
  return (
    <GlassChartContainer
      title="Weekly Productivity Analysis"
      subtitle="Comparative performance metrics"
      icon={<BarChart3 className="w-6 h-6" />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="bashundharaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00D9FF" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="jolshiriGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF00EA" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FF00EA" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="averageGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FF88" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00FF88" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.colors.glass.light.border}
            opacity={0.3}
          />
          <XAxis 
            dataKey="week" 
            stroke="white"
            opacity={0.6}
            style={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="white"
            opacity={0.6}
            style={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: 'white', fontSize: 12 }}
            iconType="circle"
          />
          
          <Bar 
            dataKey="bashundhara" 
            fill="url(#bashundharaGradient)"
            name="Bashundhara"
            radius={[8, 8, 0, 0]}
            filter="url(#glow)"
          />
          <Bar 
            dataKey="jolshiri" 
            fill="url(#jolshiriGradient)"
            name="Jolshiri"
            radius={[8, 8, 0, 0]}
            filter="url(#glow)"
          />
          <Bar 
            dataKey="average" 
            fill="url(#averageGradient)"
            name="Average"
            radius={[8, 8, 0, 0]}
            filter="url(#glow)"
          />
        </BarChart>
      </ResponsiveContainer>
    </GlassChartContainer>
  )
}

// AI Analytics Insights Panel
function AIAnalyticsInsights() {
  const insights = [
    {
      type: 'trend',
      title: 'Revenue Growth Accelerating',
      description: 'Q3 revenue projected to exceed target by 12%',
      confidence: 93,
      impact: '+৳5.4 Cr',
      color: '#00FF88'
    },
    {
      type: 'anomaly',
      title: 'Cost Anomaly Detected',
      description: 'Equipment costs 18% higher than historical average',
      confidence: 89,
      impact: '৳1.2 Cr',
      color: '#FF3366'
    },
    {
      type: 'optimization',
      title: 'Productivity Optimization',
      description: 'AI suggests resource reallocation for 15% gain',
      confidence: 91,
      impact: '2 weeks saved',
      color: '#00D9FF'
    }
  ]
  
  return (
    <DataCard
      title="AI Analytics Insights"
      subtitle="Real-time ML-powered analysis"
    >
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ActivityItem
              icon={<Sparkles className="w-4 h-4" />}
              title={insight.title}
              description={insight.description}
              time={`${insight.confidence}% confidence`}
              color={
                insight.type === 'trend' ? 'purple' :
                insight.type === 'anomaly' ? 'magenta' :
                'cyan'
              }
            />
          </motion.div>
        ))}
      </div>
    </DataCard>
  )
}

export default function EnhancedAnalyticsView() {
  const theme = useLiquidGlassDark()
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month')
  const [refreshing, setRefreshing] = useState(false)
  
  // Key metrics
  const metrics = [
    {
      title: 'Revenue YTD',
      value: '৳328 Cr',
      progress: 82,
      change: { value: 15.2, type: 'increase' as const },
      icon: DollarSign,
      color: 'cyan'
    },
    {
      title: 'Project Efficiency',
      value: '92.5%',
      progress: 92.5,
      change: { value: 3.8, type: 'increase' as const },
      icon: Activity,
      color: 'magenta'
    },
    {
      title: 'Cost Savings',
      value: '৳45.2 Cr',
      progress: 75,
      change: { value: 28, type: 'increase' as const },
      icon: Target,
      color: 'green'
    },
    {
      title: 'ROI',
      value: '187%',
      progress: 94,
      change: { value: 12, type: 'increase' as const },
      icon: TrendingUp,
      color: 'gold'
    }
  ]
  
  return (
    <div className="h-full flex flex-col space-y-6 relative">
      
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 relative z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl relative"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent.tertiary} 0%, ${theme.colors.accent.primary} 100%)`,
                boxShadow: `0 10px 30px ${theme.colors.accent.tertiary}40`
              }}
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <BarChart3 className="w-7 h-7 text-white" />
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${theme.colors.accent.tertiary}40 100%)`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold">
                <GradientText gradient="aurora">Analytics Dashboard</GradientText>
              </h1>
              <p className="text-white/60 mt-1">
                Real-time business intelligence with AI-powered insights
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Time Range Selector */}
            <div className="flex items-center rounded-lg p-1" style={{
              background: theme.colors.glass.light.background,
              border: `1px solid ${theme.colors.glass.light.border}`,
            }}>
              {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                    timeRange === range
                      ? 'text-white shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                  style={{
                    background: timeRange === range ? theme.colors.glass.medium.background : 'transparent',
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <GlassButton
              variant="secondary"
              size="md"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </GlassButton>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MetricCard
                title={metric.title}
                value={metric.value}
                icon={<metric.icon className="w-6 h-6" />}
                color={metric.color as any}
                change={metric.change}
                shimmer
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden relative z-10">
        {/* Row 1 */}
        <div className="col-span-8 h-80">
          <RevenueAnalysisChart />
        </div>
        <div className="col-span-4 h-80">
          <ProjectStatusDistribution />
        </div>
        
        {/* Row 2 */}
        <div className="col-span-4 h-80">
          <CostAnalysisBreakdown />
        </div>
        <div className="col-span-4 h-80">
          <ProductivityComparison />
        </div>
        <div className="col-span-4 h-80">
          <KPIRadarChart />
        </div>
        
        {/* Row 3 */}
        <div className="col-span-4 space-y-4">
          <AIAnalyticsInsights />
          <LiveDataStream />
        </div>
        <div className="col-span-8">
          <RealtimePerformanceMonitor />
        </div>
      </div>
      
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 217, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 217, 255, 0.5);
        }
      `}</style>
    </div>
  )
}