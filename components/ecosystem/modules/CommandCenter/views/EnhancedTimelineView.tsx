'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
  Building,
  TrendingUp,
  Zap,
  BarChart3,
  Activity,
  Target,
  Sparkles,
  Brain,
  Layers,
  GitBranch,
  Shield,
  Timer,
  Milestone
} from 'lucide-react'
import { bangladeshSites } from '../services/bangladeshSitesData'
import { formatBDT } from '../../../utils/bdCurrency'
import { useLiquidGlassDark } from '../theme/liquidGlassDark'
import { GlassCard, GlassButton, GlowText, GradientText, GlassInput } from '../components/ui/GlassMorphism'
import { MetricCard, DataCard, StatusIndicator, ActivityItem, ProgressBar } from '../components/ui/GlassWidgets'
import { AICommandInterface } from '../components/ai/AIIntelligenceLayer'
import { LiveActivityFeed, RealtimePerformanceMonitor } from '../components/realtime/RealtimeDataLayer'

// Get all projects with timeline data
const allProjects = bangladeshSites.map(site => ({
  id: site.id,
  name: site.name,
  location: site.location,
  type: site.type,
  status: site.status,
  progress: site.progress,
  startDate: site.startDate,
  endDate: site.completionDate,
  budget: site.budget,
  spent: site.spent,
  workers: site.workers,
  floors: site.floors,
  developer: site.developer,
  contractor: site.contractor,
  milestones: site.details.milestones,
  phase: site.details.phase,
  safety: site.details.safety,
  productivity: site.details.productivity,
  issues: site.details.issues
}))

// Calculate timeline metrics
const getProjectMetrics = (project: typeof allProjects[0]) => {
  const start = new Date(project.startDate)
  const end = new Date(project.endDate)
  const today = new Date()
  
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  const elapsedDays = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  const remainingDays = Math.max(0, Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
  const expectedProgress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100))
  
  return {
    totalDays,
    elapsedDays,
    remainingDays,
    expectedProgress: Math.round(expectedProgress),
    isDelayed: project.progress < expectedProgress - 10,
    isAhead: project.progress > expectedProgress + 10,
    variance: project.progress - expectedProgress
  }
}

// Enhanced Gantt Bar Component with Glass Morphism
interface GanttBarProps {
  project: typeof allProjects[0]
  startX: number
  width: number
  onHover: (projectId: string | null) => void
  onClick: (projectId: string) => void
  isSelected: boolean
  metrics: ReturnType<typeof getProjectMetrics>
}

function GanttBar({ project, startX, width, onHover, onClick, isSelected, metrics }: GanttBarProps) {
  const theme = useLiquidGlassDark()
  const [isHovered, setIsHovered] = useState(false)
  
  // Status colors for dark theme
  const statusColors = {
    planning: '#6B7280',
    foundation: '#FFB800',
    structure: '#00D9FF',
    finishing: '#00FF88',
    completed: '#00FF88'
  }
  
  const color = statusColors[project.status as keyof typeof statusColors] || '#00D9FF'
  const progressWidth = (project.progress / 100) * width
  
  return (
    <motion.g
      onMouseEnter={() => {
        setIsHovered(true)
        onHover(project.id)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHover(null)
      }}
      onClick={() => onClick(project.id)}
      style={{ cursor: 'pointer' }}
    >
      {/* Background bar with glass effect */}
      <motion.rect
        x={startX}
        y={0}
        width={width}
        height={40}
        rx={8}
        fill={theme.colors.glass.light.background}
        stroke={isSelected ? color : theme.colors.glass.light.border}
        strokeWidth={isSelected ? 2 : 1}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ 
          opacity: 1, 
          scaleX: 1,
          filter: isHovered ? `drop-shadow(0 0 20px ${color}50)` : 'none'
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: `${startX}px 20px` }}
      />
      
      {/* Progress bar with gradient */}
      <defs>
        <linearGradient id={`progress-${project.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
        <filter id={`glow-${project.id}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <motion.rect
        x={startX}
        y={0}
        width={progressWidth}
        height={40}
        rx={8}
        fill={`url(#progress-${project.id})`}
        filter={`url(#glow-${project.id})`}
        initial={{ width: 0 }}
        animate={{ 
          width: progressWidth,
          opacity: isHovered ? 1 : 0.9
        }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
      
      {/* Animated shimmer effect */}
      <motion.rect
        x={startX}
        y={0}
        width={30}
        height={40}
        rx={8}
        fill={`linear-gradient(90deg, transparent 0%, ${color}40 50%, transparent 100%)`}
        initial={{ x: startX }}
        animate={{ x: startX + width }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2
        }}
        style={{ mixBlendMode: 'overlay' }}
      />
      
      {/* Project name */}
      <text
        x={startX + 12}
        y={25}
        fill="white"
        fontSize="13"
        fontWeight="500"
        style={{ userSelect: 'none' }}
      >
        {project.name}
      </text>
      
      {/* Progress percentage */}
      <text
        x={startX + width - 12}
        y={25}
        fill="white"
        fontSize="12"
        fontWeight="bold"
        textAnchor="end"
        style={{ userSelect: 'none' }}
      >
        {project.progress}%
      </text>
      
      {/* Status indicators */}
      {metrics.isDelayed && (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <circle
            cx={startX + width + 20}
            cy={20}
            r={12}
            fill="#FF3366"
            filter="drop-shadow(0 0 8px #FF336650)"
          />
          <AlertTriangle
            x={startX + width + 14}
            y={14}
            width={12}
            height={12}
            fill="white"
          />
        </motion.g>
      )}
      
      {metrics.isAhead && (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <circle
            cx={startX + width + 20}
            cy={20}
            r={12}
            fill="#00FF88"
            filter="drop-shadow(0 0 8px #00FF8850)"
          />
          <TrendingUp
            x={startX + width + 14}
            y={14}
            width={12}
            height={12}
            fill="white"
          />
        </motion.g>
      )}
    </motion.g>
  )
}

// AI Timeline Insights Component
function AITimelineInsights({ projects }: { projects: typeof allProjects }) {
  const insights = [
    {
      type: 'critical',
      title: 'Critical Path Alert',
      description: 'Bashundhara A1 foundation delay impacts 3 dependent projects',
      impact: '12 days delay',
      color: '#FF3366'
    },
    {
      type: 'optimization',
      title: 'Resource Optimization',
      description: 'Reallocate 50 workers from Gulshan Tower to accelerate timeline',
      impact: '5 days saved',
      color: '#00FF88'
    },
    {
      type: 'prediction',
      title: 'Schedule Prediction',
      description: 'ML models predict all Q2 milestones will complete on time',
      impact: '95% confidence',
      color: '#00D9FF'
    }
  ]
  
  return (
    <DataCard
      title="AI Timeline Analysis"
      subtitle="Critical path optimization and predictions"
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
              icon={
                insight.type === 'critical' ? <AlertTriangle className="w-4 h-4" /> :
                insight.type === 'optimization' ? <Target className="w-4 h-4" /> :
                <Sparkles className="w-4 h-4" />
              }
              title={insight.title}
              description={insight.description}
              time={insight.impact}
              color={
                insight.type === 'critical' ? 'magenta' :
                insight.type === 'optimization' ? 'purple' :
                'cyan'
              }
            />
          </motion.div>
        ))}
      </div>
    </DataCard>
  )
}

// Resource Allocation Chart
function ResourceAllocationChart({ projects }: { projects: typeof allProjects }) {
  const theme = useLiquidGlassDark()
  const totalWorkers = projects.reduce((sum, p) => sum + p.workers, 0)
  
  return (
    <GlassCard intensity="medium" className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white">Resource Allocation</h4>
        <Users className="w-4 h-4 text-[#00D9FF]" />
      </div>
      
      <div className="space-y-3">
        {projects.slice(0, 5).map((project, index) => {
          const percentage = (project.workers / totalWorkers) * 100
          const colors = ['#00D9FF', '#FF00EA', '#00FF88', '#FFB800', '#FF3366']
          const color = colors[index % colors.length]
          
          return (
            <div key={project.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/60">{project.name}</span>
                <span className="text-xs font-medium text-white">{project.workers}</span>
              </div>
              <ProgressBar
                value={percentage}
                max={100}
                color={color === '#00D9FF' ? 'cyan' : color === '#FF00EA' ? 'magenta' : 'gold'}
                animated
              />
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Total Workforce</span>
          <span className="text-lg font-bold">
            <GlowText color="cyan">{totalWorkers.toLocaleString()}</GlowText>
          </span>
        </div>
      </div>
    </GlassCard>
  )
}

export default function EnhancedTimelineView() {
  const theme = useLiquidGlassDark()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'gantt' | 'calendar' | 'resource'>('gantt')
  const [timeScale, setTimeScale] = useState<'days' | 'weeks' | 'months'>('months')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Filter projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      if (filterStatus === 'all') return true
      return project.status === filterStatus
    })
  }, [filterStatus])
  
  // Get timeline bounds
  const getTimelineBounds = useCallback(() => {
    const dates = filteredProjects.flatMap(p => [new Date(p.startDate), new Date(p.endDate)])
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))
    
    // Add padding
    minDate.setMonth(minDate.getMonth() - 1)
    maxDate.setMonth(maxDate.getMonth() + 1)
    
    return { minDate, maxDate }
  }, [filteredProjects])
  
  const { minDate, maxDate } = getTimelineBounds()
  const totalMonths = (maxDate.getFullYear() - minDate.getFullYear()) * 12 + maxDate.getMonth() - minDate.getMonth()
  
  // Calculate positions for Gantt chart
  const calculateGanttPosition = useCallback((project: typeof allProjects[0]) => {
    const projectStart = new Date(project.startDate)
    const projectEnd = new Date(project.endDate)
    
    const startOffset = (projectStart.getFullYear() - minDate.getFullYear()) * 12 + 
                       projectStart.getMonth() - minDate.getMonth()
    const duration = (projectEnd.getFullYear() - projectStart.getFullYear()) * 12 + 
                    projectEnd.getMonth() - projectStart.getMonth()
    
    const chartWidth = 1200
    const monthWidth = chartWidth / totalMonths
    
    return {
      x: startOffset * monthWidth,
      width: duration * monthWidth
    }
  }, [minDate, totalMonths])
  
  // Get selected project details
  const selectedProjectDetails = useMemo(() => {
    return selectedProject ? allProjects.find(p => p.id === selectedProject) : null
  }, [selectedProject])
  
  // Generate timeline months
  const timelineMonths = useMemo(() => {
    const months = []
    const current = new Date(minDate)
    
    while (current <= maxDate) {
      months.push({
        date: new Date(current),
        label: current.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      })
      current.setMonth(current.getMonth() + 1)
    }
    
    return months
  }, [minDate, maxDate])
  
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
                background: `linear-gradient(135deg, ${theme.colors.accent.secondary} 0%, ${theme.colors.accent.primary} 100%)`,
                boxShadow: `0 10px 30px ${theme.colors.accent.secondary}40`
              }}
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Calendar className="w-7 h-7 text-white" />
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${theme.colors.accent.secondary}40 100%)`,
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
                <GradientText gradient="aurora">Project Timeline</GradientText>
              </h1>
              <p className="text-white/60 mt-1">
                AI-powered schedule optimization and critical path analysis
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg p-1" style={{
              background: theme.colors.glass.light.background,
              border: `1px solid ${theme.colors.glass.light.border}`,
            }}>
              {[
                { mode: 'gantt', icon: GitBranch, label: 'Gantt' },
                { mode: 'calendar', icon: Calendar, label: 'Calendar' },
                { mode: 'resource', icon: Users, label: 'Resources' }
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === mode
                      ? 'text-white shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                  style={{
                    background: viewMode === mode ? theme.colors.glass.medium.background : 'transparent',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            
            <GlassButton
              variant="primary"
              size="md"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Milestone
            </GlassButton>
          </div>
        </div>
        
        {/* Timeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Active Projects"
            value={filteredProjects.length.toString()}
            icon={<Building className="w-5 h-5" />}
            color="cyan"
            change={{ value: 3, type: 'increase' }}
          />
          <MetricCard
            title="On Schedule"
            value={`${filteredProjects.filter(p => !getProjectMetrics(p).isDelayed).length}`}
            icon={<CheckCircle className="w-5 h-5" />}
            color="purple"
          />
          <MetricCard
            title="Delayed"
            value={`${filteredProjects.filter(p => getProjectMetrics(p).isDelayed).length}`}
            icon={<AlertTriangle className="w-5 h-5" />}
            color="magenta"
          />
          <MetricCard
            title="Ahead of Schedule"
            value={`${filteredProjects.filter(p => getProjectMetrics(p).isAhead).length}`}
            icon={<TrendingUp className="w-5 h-5" />}
            color="gold"
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg text-white backdrop-blur-md transition-all"
              style={{
                background: theme.colors.glass.light.background,
                border: `1px solid ${theme.colors.glass.light.border}`,
              }}
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="foundation">Foundation</option>
              <option value="structure">Structure</option>
              <option value="finishing">Finishing</option>
              <option value="completed">Completed</option>
            </select>
            
            {/* Time Scale */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">Scale:</span>
              <div className="flex items-center rounded-lg p-1" style={{
                background: theme.colors.glass.light.background,
                border: `1px solid ${theme.colors.glass.light.border}`,
              }}>
                {['days', 'weeks', 'months'].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setTimeScale(scale as any)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      timeScale === scale
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                    style={{
                      background: timeScale === scale ? theme.colors.glass.medium.background : 'transparent',
                    }}
                  >
                    {scale.charAt(0).toUpperCase() + scale.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <GlassButton variant="secondary" size="sm">
              <Download className="w-4 h-4" />
            </GlassButton>
            <GlassButton variant="secondary" size="sm">
              <Filter className="w-4 h-4" />
            </GlassButton>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 overflow-hidden relative z-10">
        {/* Left Panel - Timeline/Calendar/Resource View */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {viewMode === 'gantt' && (
              <motion.div
                key="gantt"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <GlassCard intensity="medium" className="h-full p-6 overflow-hidden">
                  {/* Timeline Header */}
                  <div className="mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Gantt Chart</h3>
                      <StatusIndicator status="online" label="Real-time sync" pulse />
                    </div>
                  </div>
                  
                  {/* Gantt Chart SVG */}
                  <div 
                    ref={scrollContainerRef}
                    className="overflow-auto custom-scrollbar"
                    style={{ height: 'calc(100% - 80px)' }}
                  >
                    <svg width="1200" height={filteredProjects.length * 60 + 100}>
                      {/* Timeline Grid */}
                      <g>
                        {/* Month markers */}
                        {timelineMonths.map((month, index) => {
                          const x = (index / totalMonths) * 1200
                          return (
                            <g key={index}>
                              <line
                                x1={x}
                                y1={40}
                                x2={x}
                                y2={filteredProjects.length * 60 + 40}
                                stroke={theme.colors.glass.light.border}
                                strokeWidth="1"
                                opacity="0.3"
                              />
                              <text
                                x={x + 5}
                                y={25}
                                fill="white"
                                fontSize="11"
                                opacity="0.6"
                              >
                                {month.label}
                              </text>
                            </g>
                          )
                        })}
                        
                        {/* Today marker */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <line
                            x1={((new Date().getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * 1200}
                            y1={40}
                            x2={((new Date().getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * 1200}
                            y2={filteredProjects.length * 60 + 40}
                            stroke="#FF3366"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                          <text
                            x={((new Date().getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * 1200 + 5}
                            y={35}
                            fill="#FF3366"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            Today
                          </text>
                        </motion.g>
                      </g>
                      
                      {/* Project Bars */}
                      <g transform="translate(0, 50)">
                        {filteredProjects.map((project, index) => {
                          const position = calculateGanttPosition(project)
                          const metrics = getProjectMetrics(project)
                          
                          return (
                            <g key={project.id} transform={`translate(0, ${index * 60})`}>
                              <GanttBar
                                project={project}
                                startX={position.x}
                                width={position.width}
                                onHover={setHoveredProject}
                                onClick={setSelectedProject}
                                isSelected={selectedProject === project.id}
                                metrics={metrics}
                              />
                            </g>
                          )
                        })}
                      </g>
                      
                      {/* Critical Path Overlay */}
                      <g transform="translate(0, 50)" opacity="0.3">
                        <motion.path
                          d="M 100 20 Q 300 60 500 40 T 900 80"
                          stroke="#FF3366"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="10,5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </g>
                    </svg>
                  </div>
                </GlassCard>
              </motion.div>
            )}
            
            {viewMode === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <GlassCard intensity="medium" className="h-full p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Calendar View</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {/* Calendar implementation would go here */}
                    <div className="col-span-7 text-center text-white/60 py-20">
                      Calendar view with milestones and deadlines
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
            
            {viewMode === 'resource' && (
              <motion.div
                key="resource"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <GlassCard intensity="medium" className="h-full p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Resource Timeline</h3>
                  <div className="space-y-4">
                    {/* Resource allocation timeline would go here */}
                    <div className="text-center text-white/60 py-20">
                      Resource allocation across timeline
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Right Panel - AI Insights & Details */}
        <div className="w-96 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {/* AI Timeline Insights */}
          <AITimelineInsights projects={filteredProjects} />
          
          {/* Resource Allocation */}
          <ResourceAllocationChart projects={filteredProjects} />
          
          {/* Real-time Performance */}
          <RealtimePerformanceMonitor />
          
          {/* Selected Project Details */}
          <AnimatePresence>
            {selectedProjectDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <DataCard
                  title={selectedProjectDetails.name}
                  subtitle={selectedProjectDetails.location}
                  fullHeight
                >
                  <div className="space-y-4">
                    {/* Progress Overview */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/60">Overall Progress</span>
                        <span className="text-sm font-medium text-white">
                          {selectedProjectDetails.progress}%
                        </span>
                      </div>
                      <ProgressBar
                        value={selectedProjectDetails.progress}
                        max={100}
                        color={selectedProjectDetails.progress >= 80 ? 'purple' : 'cyan'}
                        animated
                      />
                    </div>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg" style={{
                        background: theme.colors.glass.light.background,
                        border: `1px solid ${theme.colors.glass.light.border}`
                      }}>
                        <Users className="w-4 h-4 text-[#00D9FF] mb-1" />
                        <p className="text-xs text-white/60">Workers</p>
                        <p className="text-lg font-bold text-white">
                          {selectedProjectDetails.workers}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg" style={{
                        background: theme.colors.glass.light.background,
                        border: `1px solid ${theme.colors.glass.light.border}`
                      }}>
                        <Shield className="w-4 h-4 text-[#00FF88] mb-1" />
                        <p className="text-xs text-white/60">Safety</p>
                        <p className="text-lg font-bold text-white">
                          {selectedProjectDetails.safety}%
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Metrics */}
                    {(() => {
                      const metrics = getProjectMetrics(selectedProjectDetails)
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/60">Days Remaining</span>
                            <span className="text-sm font-medium text-white">
                              {metrics.remainingDays} days
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/60">Schedule Variance</span>
                            <span className={`text-sm font-medium ${
                              metrics.variance > 0 ? 'text-[#00FF88]' : 'text-[#FF3366]'
                            }`}>
                              {metrics.variance > 0 ? '+' : ''}{metrics.variance.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </DataCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
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