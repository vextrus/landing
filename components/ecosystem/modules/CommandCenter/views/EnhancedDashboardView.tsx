'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  DollarSign,
  Users,
  Building,
  Package,
  Shield,
  ChartBar,
  Sparkles,
  Zap,
  Eye,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Grid3x3,
  Map,
  Calendar,
  Settings,
  Command,
  Cpu,
  Network,
  Database,
  Cloud,
  Lock,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Layers,
  Binary,
  HardDrive,
  Workflow,
  GitBranch,
  Radio,
  Waves
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { formatBDT } from '../../../utils/bdCurrency'
import { useLiquidGlassDark } from '../theme/liquidGlassDark'
import { GlassCard, GlassButton, GlowText, GradientText, GlassInput } from '../components/ui/GlassMorphism'
import { MetricCard, DataCard, StatusIndicator, ActivityItem, ProgressBar } from '../components/ui/GlassWidgets'

import { LiveDataStream, RealtimePerformanceMonitor } from '../components/realtime/RealtimeDataLayer'

// Dynamic imports for AI components
const AnomalyDetector = dynamic(() => import('../ai/AnomalyDetector'), { ssr: false })
const SmartAlerts = dynamic(() => import('../ai/SmartAlerts'), { ssr: false })
const AutoInsights = dynamic(() => import('../ai/AutoInsights'), { ssr: false })

// ERP Module Status Type
interface ModuleStatus {
  id: string
  name: string
  icon: React.ElementType
  status: 'online' | 'warning' | 'error' | 'offline'
  metrics: {
    primary: { label: string; value: string; change?: number }
    secondary: { label: string; value: string }
  }
  color: string
  glowColor: string
  lastSync: Date
}

// Executive Metric Type
interface ExecutiveMetric {
  id: string
  title: string
  value: string
  change: number
  trend: 'up' | 'down' | 'stable'
  subtitle: string
  color: string
  icon: React.ElementType
  sparklineData: number[]
}

// AI Brain Visualization Component
function AIBrainVisualization({ isProcessing }: { isProcessing: boolean }) {
  const theme = useLiquidGlassDark()
  const [neuralActivity, setNeuralActivity] = useState(Array(12).fill(0))
  
  useEffect(() => {
    // Set static neural activity pattern to prevent flickering
    setNeuralActivity([45, 78, 23, 89, 34, 67, 91, 12, 56, 77, 38, 85])
  }, [])
  
  return (
    <div className="relative h-full flex items-center justify-center">
      {/* Central Brain Core */}
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360]
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      >
        {/* Core Circle */}
        <div className="w-32 h-32 rounded-full relative">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${theme.colors.accent.tertiary} 0%, transparent 70%)`,
              filter: 'blur(20px)',
              opacity: 0.6
            }}
          />
          <div 
            className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{
              background: theme.colors.glass.strong.background,
              border: `2px solid ${theme.colors.accent.tertiary}`,
              boxShadow: `0 0 30px ${theme.colors.accent.tertiary}40`
            }}
          >
            <Brain className="w-12 h-12 text-[#FF00EA]" />
          </div>
        </div>
        
        {/* Neural Connections */}
        <svg className="absolute -inset-16 w-64 h-64">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * Math.PI / 180
            const x1 = 128 + 40 * Math.cos(angle)
            const y1 = 128 + 40 * Math.sin(angle)
            const x2 = 128 + 100 * Math.cos(angle)
            const y2 = 128 + 100 * Math.sin(angle)
            
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={theme.colors.accent.primary}
                  strokeWidth="2"
                  opacity={neuralActivity[i] / 100}
                />
                <circle
                  cx={x2}
                  cy={y2}
                  r="4"
                  fill={theme.colors.accent.secondary}
                  opacity={neuralActivity[i] / 100}
                >
                  <animate
                    attributeName="r"
                    values="4;8;4"
                    dur="2s"
                    begin={`${i * 0.25}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )
          })}
        </svg>
      </motion.div>
      
      {/* Status Text */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-white/60">Neural Network Activity</p>
        <motion.div className="flex items-center justify-center gap-2 mt-1">
          <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-[#00FF88]' : 'bg-[#00D9FF]'} animate-pulse`} />
          <span className="text-sm text-white/80">
            {isProcessing ? 'Processing Data' : 'System Active'}
          </span>
        </motion.div>
      </div>
    </div>
  )
}

// ERP Module Card Component
function ModuleStatusCard({ module }: { module: ModuleStatus }) {
  const theme = useLiquidGlassDark()
  const Icon = module.icon
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <GlassCard 
        intensity="medium" 
        className="p-4 cursor-pointer relative overflow-hidden h-full"
        hover
        glow
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${module.color} 0%, transparent 50%)`,
          }}
        />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${module.color}20 0%, ${module.color}10 100%)`,
                border: `1px solid ${module.color}30`
              }}
            >
              <Icon className="w-5 h-5" style={{ color: module.color }} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">{module.name}</h4>
              <StatusIndicator 
                status={module.status === 'error' ? 'warning' : module.status} 
              />
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40" />
        </div>
        
        {/* Metrics */}
        <div className="space-y-2 relative z-10">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-white/60">{module.metrics.primary.label}</p>
              {module.metrics.primary.change !== undefined && (
                <div className={`flex items-center gap-1 text-xs ${
                  module.metrics.primary.change > 0 ? 'text-[#00FF88]' : 'text-[#FF3366]'
                }`}>
                  {module.metrics.primary.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{Math.abs(module.metrics.primary.change)}%</span>
                </div>
              )}
            </div>
            <p className="text-lg font-bold text-white">{module.metrics.primary.value}</p>
          </div>
          <div>
            <p className="text-xs text-white/60">{module.metrics.secondary.label}</p>
            <p className="text-sm font-medium text-white/80">{module.metrics.secondary.value}</p>
          </div>
        </div>
        
        {/* Last Sync */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-white/40">Last sync</p>
          <p className="text-xs text-white/60">
            {new Date(module.lastSync).toLocaleTimeString()}
          </p>
        </div>
        
        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, transparent 0%, ${module.color}10 100%)`,
            }}
          />
        </motion.div>
      </GlassCard>
    </motion.div>
  )
}

// Executive Metric Card Component
function ExecutiveMetricCard({ metric }: { metric: ExecutiveMetric }) {
  const theme = useLiquidGlassDark()
  const Icon = metric.icon
  const isPositive = metric.change > 0
  
  return (
    <GlassCard intensity="strong" className="p-5 relative overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at top right, ${metric.color} 0%, transparent 70%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" style={{ color: metric.color }} />
            <p className="text-sm text-white/80">{metric.title}</p>
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-[#00FF88]' : 'text-[#FF3366]'
          }`}>
            {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span>{Math.abs(metric.change)}%</span>
          </div>
        </div>
        
        <div className="mb-3">
          <h3 className="text-2xl font-bold">
            <GlowText color={metric.color === '#00D9FF' ? 'cyan' : 
                             metric.color === '#FF00EA' ? 'magenta' :
                             metric.color === '#00FF88' ? 'purple' : 'gold'}>
              {metric.value}
            </GlowText>
          </h3>
          <p className="text-xs text-white/60 mt-1">{metric.subtitle}</p>
        </div>
        
        {/* Mini Sparkline */}
        <div className="h-8">
          <svg className="w-full h-full" viewBox="0 0 100 32">
            <polyline
              fill="none"
              stroke={metric.color}
              strokeWidth="2"
              points={metric.sparklineData.map((value, i) => 
                `${(i / (metric.sparklineData.length - 1)) * 100},${32 - (value / 100) * 32}`
              ).join(' ')}
              opacity="0.6"
            />
            <polyline
              fill="url(#sparkline-gradient)"
              fillOpacity="0.2"
              stroke="none"
              points={`0,32 ${metric.sparklineData.map((value, i) => 
                `${(i / (metric.sparklineData.length - 1)) * 100},${32 - (value / 100) * 32}`
              ).join(' ')} 100,32`}
            />
            <defs>
              <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={metric.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={metric.color} stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </GlassCard>
  )
}

// Critical Alert Card Component  
function CriticalAlertCard({ alert }: { 
  alert: { 
    id: string
    type: 'error' | 'warning' | 'info'
    title: string
    description: string
    module: string
    time: Date
    action?: string
  } 
}) {
  const theme = useLiquidGlassDark()
  const colors = {
    error: '#FF3366',
    warning: '#FFB800',
    info: '#00D9FF'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
    >
      <div 
        className="p-4 rounded-lg relative overflow-hidden"
        style={{
          background: theme.colors.glass.light.background,
          border: `1px solid ${colors[alert.type]}30`,
          borderLeft: `3px solid ${colors[alert.type]}`
        }}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle 
            className="w-5 h-5 mt-0.5 flex-shrink-0" 
            style={{ color: colors[alert.type] }}
          />
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-white mb-1">{alert.title}</h5>
            <p className="text-xs text-white/60 mb-2">{alert.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-white/40">
                <span>{alert.module}</span>
                <span>•</span>
                <span>{new Date(alert.time).toLocaleTimeString()}</span>
              </div>
              {alert.action && (
                <GlassButton variant="secondary" size="sm">
                  {alert.action}
                </GlassButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function EnhancedDashboardView() {
  const theme = useLiquidGlassDark()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h')
  
  // Simulate processing
  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(prev => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  
  // Executive Metrics
  const executiveMetrics: ExecutiveMetric[] = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '৳2,328 Cr',
      change: 15.2,
      trend: 'up',
      subtitle: 'YTD Performance',
      color: '#00D9FF',
      icon: DollarSign,
      sparklineData: [65, 72, 68, 75, 82, 88, 92, 95, 91, 98]
    },
    {
      id: 'efficiency',
      title: 'System Efficiency',
      value: '94.7%',
      change: 3.8,
      trend: 'up',
      subtitle: 'AI-Optimized Operations',
      color: '#FF00EA',
      icon: Zap,
      sparklineData: [88, 90, 89, 91, 92, 90, 93, 94, 93, 95]
    },
    {
      id: 'projects',
      title: 'Active Projects',
      value: '147',
      change: -2.1,
      trend: 'down',
      subtitle: '23 Critical Path',
      color: '#00FF88',
      icon: Building,
      sparklineData: [150, 148, 149, 151, 150, 148, 147, 149, 148, 147]
    },
    {
      id: 'roi',
      title: 'ROI',
      value: '287%',
      change: 28.5,
      trend: 'up',
      subtitle: 'ML-Driven Growth',
      color: '#FFB800',
      icon: Target,
      sparklineData: [220, 235, 240, 255, 260, 265, 270, 275, 280, 287]
    }
  ]
  
  // ERP Module Status
  const moduleStatus: ModuleStatus[] = [
    {
      id: 'command-center',
      name: 'Command Center',
      icon: Command,
      status: 'online',
      metrics: {
        primary: { label: 'Active Users', value: '247', change: 12 },
        secondary: { label: 'Response Time', value: '45ms' }
      },
      color: '#00D9FF',
      glowColor: 'cyan',
      lastSync: new Date()
    },
    {
      id: 'financial',
      name: 'Financial Suite',
      icon: DollarSign,
      status: 'online',
      metrics: {
        primary: { label: 'Transactions', value: '৳458 Cr', change: 8 },
        secondary: { label: 'Pending', value: '12 items' }
      },
      color: '#FF00EA',
      glowColor: 'magenta',
      lastSync: new Date(Date.now() - 120000)
    },
    {
      id: 'sales-crm',
      name: 'Sales CRM',
      icon: Users,
      status: 'warning',
      metrics: {
        primary: { label: 'Leads', value: '1,847', change: -3 },
        secondary: { label: 'Conversion', value: '24.5%' }
      },
      color: '#00FF88',
      glowColor: 'green',
      lastSync: new Date(Date.now() - 300000)
    },
    {
      id: 'procurement',
      name: 'Procurement',
      icon: Package,
      status: 'online',
      metrics: {
        primary: { label: 'Orders', value: '342', change: 15 },
        secondary: { label: 'Suppliers', value: '89 active' }
      },
      color: '#FFB800',
      glowColor: 'gold',
      lastSync: new Date()
    },
    {
      id: 'quality',
      name: 'Quality Control',
      icon: Shield,
      status: 'online',
      metrics: {
        primary: { label: 'Inspections', value: '98.2%', change: 2 },
        secondary: { label: 'Defects', value: '0.8% rate' }
      },
      color: '#9333EA',
      glowColor: 'purple',
      lastSync: new Date(Date.now() - 60000)
    },
    {
      id: 'hr-workforce',
      name: 'HR & Workforce',
      icon: Users,
      status: 'online',
      metrics: {
        primary: { label: 'Workers', value: '8,456', change: 5 },
        secondary: { label: 'Attendance', value: '92.3%' }
      },
      color: '#06B6D4',
      glowColor: 'cyan',
      lastSync: new Date()
    },
    {
      id: 'analytics',
      name: 'Analytics BI',
      icon: ChartBar,
      status: 'online',
      metrics: {
        primary: { label: 'Reports', value: '2.4K', change: 18 },
        secondary: { label: 'Insights', value: '147 new' }
      },
      color: '#F59E0B',
      glowColor: 'amber',
      lastSync: new Date()
    }
  ]
  
  // Critical Alerts
  const criticalAlerts = [
    {
      id: '1',
      type: 'error' as const,
      title: 'Equipment Failure Detected',
      description: 'Tower Crane #3 at Bashundhara site showing critical wear indicators',
      module: 'Quality Control',
      time: new Date(Date.now() - 300000),
      action: 'View Details'
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Budget Variance Alert',
      description: 'Jolshiri Phase 2 exceeding budget by 12% due to material costs',
      module: 'Financial Suite',
      time: new Date(Date.now() - 900000),
      action: 'Analyze'
    },
    {
      id: '3',
      type: 'info' as const,
      title: 'AI Model Update Available',
      description: 'New predictive model shows 15% improvement in accuracy',
      module: 'Analytics BI',
      time: new Date(Date.now() - 1800000),
      action: 'Update'
    }
  ]
  
  return (
    <div className="h-full flex flex-col space-y-6 relative">

      
      {/* Executive Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 relative z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl relative"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent.primary} 0%, ${theme.colors.accent.tertiary} 100%)`,
                boxShadow: `0 20px 40px ${theme.colors.accent.primary}40`
              }}
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Brain className="w-8 h-8 text-white" />
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
                <GradientText gradient="aurora">Vextrus Executive Dashboard</GradientText>
              </h1>
              <p className="text-white/60 mt-1">
                AI-Powered Command & Control Center • Real-time ERP Intelligence
              </p>
            </div>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg p-1" style={{
              background: theme.colors.glass.light.background,
              border: `1px solid ${theme.colors.glass.light.border}`,
            }}>
              {(['1h', '24h', '7d', '30d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedTimeRange === range
                      ? 'text-white shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                  style={{
                    background: selectedTimeRange === range ? theme.colors.glass.medium.background : 'transparent',
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <GlassButton variant="primary" size="md" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configure
            </GlassButton>
          </div>
        </div>
        
        {/* Executive Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {executiveMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ExecutiveMetricCard metric={metric} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden relative z-10">
        {/* AI Brain Center - Left Column */}
        <motion.div 
          className="col-span-3 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* AI Brain Visualization */}
          <GlassCard intensity="ultra" className="p-6 h-64">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                <GradientText gradient="aurora">AI Brain Center</GradientText>
              </h3>
              <StatusIndicator status="online" />
            </div>
            <AIBrainVisualization isProcessing={isProcessing} />
          </GlassCard>
          
          {/* System Health */}
          <DataCard
            title="System Health"
            subtitle="Infrastructure status"
          >
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/60">CPU Usage</span>
                  <span className="text-xs font-medium text-white">42%</span>
                </div>
                <ProgressBar value={42} color="cyan" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/60">Memory</span>
                  <span className="text-xs font-medium text-white">68%</span>
                </div>
                <ProgressBar value={68} color="cyan" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/60">Storage</span>
                  <span className="text-xs font-medium text-white">81%</span>
                </div>
                <ProgressBar value={81} color="magenta" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/60">Network</span>
                  <span className="text-xs font-medium text-white">24ms</span>
                </div>
                <ProgressBar value={95} color="gold" />
              </div>
            </div>
          </DataCard>
        </motion.div>
        
        {/* ERP Modules Grid - Center */}
        <motion.div 
          className="col-span-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              <GradientText gradient="aurora">ERP Module Status</GradientText>
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
                <span className="text-xs text-white/60">{moduleStatus.filter(m => m.status === 'online').length} Online</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FFB800]" />
                <span className="text-xs text-white/60">{moduleStatus.filter(m => m.status === 'warning').length} Warning</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)] overflow-y-auto custom-scrollbar">
            {moduleStatus.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <ModuleStatusCard module={module} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Right Column - Alerts & Activity */}
        <motion.div 
          className="col-span-3 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Critical Alerts */}
          <DataCard
            title="Critical Alerts"
            subtitle={`${criticalAlerts.length} active alerts`}
            actions={
              <GlassButton variant="secondary" size="sm">
                View All
              </GlassButton>
            }
          >
            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              {criticalAlerts.map((alert) => (
                <CriticalAlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </DataCard>
          
          {/* Live Activity Feed */}
          <LiveDataStream />
        </motion.div>
      </div>
      
      {/* Bottom Row - AI Insights */}
      <motion.div 
        className="flex-shrink-0 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard intensity="strong" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              <GradientText gradient="aurora">AI-Powered Insights & Recommendations</GradientText>
            </h3>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF00EA]" />
              <span className="text-sm text-white/60">Powered by Vextrus AI</span>
            </div>
          </div>
          
          <div className="h-80">
            <div className="space-y-4">
              {/* Static AI Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-green-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm font-medium text-green-400">Safety Optimization</span>
                  </div>
                  <p className="text-sm text-white/80">AI detected 15% reduction in safety incidents after implementing predictive maintenance schedules.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-blue-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-sm font-medium text-blue-400">Cost Efficiency</span>
                  </div>
                  <p className="text-sm text-white/80">Material procurement optimization saved ৳2.3 Cr this quarter through smart supply chain analysis.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-purple-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="text-sm font-medium text-purple-400">Timeline Prediction</span>
                  </div>
                  <p className="text-sm text-white/80">Project completion forecasted 8 days ahead of schedule based on current productivity patterns.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-yellow-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-sm font-medium text-yellow-400">Quality Control</span>
                  </div>
                  <p className="text-sm text-white/80">Computer vision systems identified 23 quality issues before they became critical defects.</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-400">Next AI Recommendation</span>
                </div>
                <p className="text-sm text-white/70 mt-1">Optimize concrete pouring schedule for Gulshan site to avoid monsoon delays. Potential time savings: 5-7 days.</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
      
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